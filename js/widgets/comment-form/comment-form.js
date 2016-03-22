/*global define,require,alert,dojo,$,window,moment,console*/
/*jslint browser:true,sloppy:true,nomen:true,unparam:true,plusplus:true,indent:4*/
/*
| Copyright 2014 Esri
|
| Licensed under the Apache License, Version 2.0 (the "License");
| you may not use this file except in compliance with the License.
| You may obtain a copy of the License at
|
|    http://www.apache.org/licenses/LICENSE-2.0
|
| Unless required by applicable law or agreed to in writing, software
| distributed under the License is distributed on an "AS IS" BASIS,
| WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
| See the License for the specific language governing permissions and
| limitations under the License.
*/
define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/_base/kernel",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/query",
    "dojo/dom",
    "dojo/string",
    "dojo/on",
    'dojo/dom-attr',
    "dojo/date/locale",
    "esri/graphic",
    "esri/tasks/RelationshipQuery",
    "dojo/text!./templates/comment-form.html"
], function (declare, _WidgetBase, _TemplatedMixin, lang, array, kernel, domConstruct, domClass, query, dom, string, on, domAttr, locale, Graphic, RelationshipQuery, commentForm) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: commentForm,
        sortedFields: [],
        defaultValueArray: [],
        i18n: {},
        item: null,
        rangeHelpText: null,
        _layerHasReportedByField: false,
        selectedLayer: null,

        /**
        * This function is called when widget is constructed.
        * @param{object} configData
        * @constructor
        * @memberOf widgets/comment-form/comment-form
        */
        constructor: function (commentData) {
            this.inherited(arguments);
            // check if configData is present, then merge it with config object
            if (commentData) {
                lang.mixin(this, commentData);
            }
            this.i18n = this.config.i18n;
        },

        postCreate: function () {
            this.inherited(arguments);
            this._initializeCommentForm();
            // click event for submit comment form on submit button click
            on(this.postCommentButton, 'click', lang.hitch(this, function () {
                this._submitCommentForm();
            }));
            on(this.cancelCommentButton, 'click', lang.hitch(this, function (evt) {
                this.onCancelButtonClick(evt);
            }));


        },

        startup: function () {
            this.inherited(arguments);
        },

        _initializeCommentForm: function () {
            this._filterLayerFields();
            // Sort fields array by type
            this._sortedTypeFormElement();
        },

        /**
        * Select fields from info pop up
        * @param{object} Map response
        * @memberOf widgets/comment-form/comment-form
        */
        _filterLayerFields: function () {
            var layerFields = [], excludeDataTypes = [], layerField;
            this.sortedFields = [];
            // DataTypes to be excluded from Geo Form
            excludeDataTypes = ["esriFieldTypeOID", "esriFieldTypeBlob", "esriFieldTypeRaster", "esriFieldTypeGUID", "esriFieldTypeGlobalID", "esriFieldTypeXML"];
            if (this.itemInfos && this.itemInfos.itemData) {
                //To maintain the order of the fields form pop up configuration first get all fields info in layerFields array
                //then iterate through popupInfo and create fields to be shown in geo form.
                // Create layerFields Key value pair according to fieldName
                array.forEach(this.commentTable.fields, lang.hitch(this, function (layerField) {
                    layerFields[layerField.name] = layerField;
                }));
                // Iterate through all the fields in popup info,Merge field info from layer details and popup details and create sortedFields array.
                array.forEach(this.commentPopupTable.popupInfo.fieldInfos, lang.hitch(this, function (popupField) {
                    // If 'ReportedBy' field is present in the layer, set _layerHasReportedByField flag
                    if (popupField.fieldName === this.config.reportedByField) {
                        this._layerHasReportedByField = true;
                    }
                    // have to do Check for reported by field in case logged in user
                    layerField = layerFields[popupField.fieldName];
                    // check if layer is editable
                    if (layerField && popupField.isEditable && $.inArray(layerField.type, excludeDataTypes) === -1) {
                        layerField.alias = popupField.label;
                        layerField.editable = popupField.isEditable;
                        layerField.tooltip = popupField.tooltip;
                        layerField.stringFieldOption = popupField.stringFieldOption;
                        // if field has format
                        if (popupField.format) {
                            layerField.format = popupField.format;
                        }
                        // if layer has type field set subTypes else set typeField as false
                        if (layerField.name === this.commentTable.typeIdField) {
                            layerField.subTypes = this.commentTable.types;
                            layerField.typeField = true;
                        } else {
                            layerField.typeField = false;
                        }
                        this.sortedFields.push(layerField);
                    }
                }));
            }
        },


        /**
        * Sort form elements by type
        * @memberOf widgets/comment-form/comment-form
        */
        _sortedTypeFormElement: function () {
            var hasDomainValue, hasDefaultValue;
            array.forEach(this.sortedFields, lang.hitch(this, function (currentField, index) {
                // Set true/false value to property 'isTypeDependent' of the field.
                currentField.isTypeDependent = false;
                array.forEach(this.commentTable.types, function (currentType) {
                    hasDomainValue = null;
                    hasDefaultValue = null;
                    hasDomainValue = currentType.domains[currentField.name];
                    hasDefaultValue = currentType.templates[0].prototype.attributes[currentField.name];
                    // If hasDefaultValue is 0 then we need to set isTypeDependent property to true
                    if (hasDefaultValue === 0) {
                        hasDefaultValue = true;
                    }
                    if ((hasDomainValue && hasDomainValue.type !== "inherited") || (hasDefaultValue && !currentField.typeField)) {
                        currentField.isTypeDependent = true;
                    }
                });
                // If isTypeDependent is true then it will return true
                if (currentField.isTypeDependent) {
                    return true;
                }
                // Create form elements (referenceNode is passed null)
                this._createFormElement(currentField, index, null);
            }));
        },

        /**
        * This function is called when click event occurs on submit buttons click
        * @memberOf widgets/comment-form/comment-form
        */
        _submitCommentForm: function () {
            var featureData, editedFields = [], key, picker, datePicker, value, erroneousFields = [], commentFormDiv;
            erroneousFields = this._checkForFields();
            commentFormDiv = this.commentsForm;
            if (erroneousFields.length !== 0) {
                // Scroll to the erroneous field node
                $(commentFormDiv).animate({
                    scrollTop: erroneousFields[0].offsetTop
                }, 1000);
            } else {
                // Create instance of graphic
                featureData = new Graphic();
                // create an empty array object
                featureData.attributes = {};
                // for all the fields
                array.forEach(query(".commentFormQuestionare .form-control", this.enterCommentContainer), function (currentField) {
                    if (currentField.value !== "") {
                        // get id of the field
                        key = domAttr.get(currentField, "id");
                        // check for date time picker and assign value
                        if (domClass.contains(currentField, "hasDatetimepicker")) {
                            picker = $(currentField.parentNode).data('DateTimePicker');
                            datePicker = picker.getDate();
                            if (datePicker) {
                                // need to get time of date in ms for service
                                value = datePicker.valueOf();
                            }
                        } else {
                            value = lang.trim(currentField.value);
                        }
                        // Assign value to the attributes
                        featureData.attributes[key] = value;
                        editedFields.push(key);
                    }
                });

                // If layer has ReportedBy Field then Add logged in username in it
                // Add ReportedBy field to editedFields array so that it will not get the default value from template
                if (this._layerHasReportedByField) {
                    featureData.attributes[this.config.reportedByField] = this.config.logInDetails.processedUserName;
                    editedFields.push(key);
                }
                //Show loading indicator
                this.appUtils.showLoadingIndicator();

                this._primaryKeyField = this.selectedLayer.relationships[0].keyField;
                this._foreignKeyField = this.commentTable.relationships[0].keyField;
                featureData.attributes[this._foreignKeyField] = this.item.attributes[this._primaryKeyField];
                // Add the comment to the comment table
                this.commentTable.applyEdits([featureData], null, null, lang.hitch(this, function (results) {
                    //Hide loading indicator
                    this.appUtils.hideLoadingIndicator();
                    if (results[0].success) {
                        this._clearFormFields();
                        this.onCommentFormSubmitted(this.item);
                    } else {
                        // Show error message in header
                        this._showHeaderMessageDiv();
                    }
                }), lang.hitch(this, function (err) {
                    //Hide loading indicator
                    this.appUtils.hideLoadingIndicator();
                    // Show error message
                    this.appUtils.showError(err);
                    // Show error message in header
                    this._showHeaderMessageDiv();
                }));
            }
        },

        /**
        * This function is called when click event occurs on submit buttons click
        * to check for errors, all the fields in comment form
        * @memberOf widgets/comment-form/comment-form
        */
        _checkForFields: function () {
            var erroneousFields = [];
            // for all the fields in comment form
            array.forEach(query(".commentFormQuestionare"), lang.hitch(this, function (currentField) {
                // to check for errors in form before submitting.
                if ((query(".form-control", currentField)[0])) {
                    // condition to check if the entered values are erroneous.
                    if (domClass.contains(currentField, "has-error") && query("select", currentField).length === 0) {
                        erroneousFields.push(currentField);
                    }
                    // condition to check if mandatory fields are kept empty.
                    if ((query(".form-control", currentField)[0].value === "" && domClass.contains(currentField, "mandatory"))) {
                        this._validateUserInput(this.config.i18n.geoform.requiredFields, currentField, query(".form-control", currentField)[0].value, true);
                        erroneousFields.push(currentField);
                    } else if (domClass.contains(currentField, "mandatory")) {
                        this._validateUserInput(false, currentField, query(".form-control", currentField)[0].value, true);
                    }
                }
            }));
            return erroneousFields;
        },


        /**
        * Create error message container
        * @param{string} errorMessage, error massage which need to show on error
        * @param{object} errorMessageNode, node to bind error massage
        * @memberOf widgets/comment-form/comment-form
        */
        _showErrorMessageDiv: function (errorMessage, errorMessageNode) {
            var errorNode, place = "after";
            // create error handler container
            errorNode = domConstruct.create("div", {
                className: "alert alert-danger errorMessage",
                id: "errorMessage",
                innerHTML: errorMessage
            }, null);
            domConstruct.place(errorNode, errorMessageNode, place);
        },

        /**
        * Display message on header of form
        * @memberOf widgets/comment-form/comment-form
        */
        _showHeaderMessageDiv: function () {
            on(this.headerMessageButton, "click", lang.hitch(this, function () {
                if (domClass.contains(this.headerMessageDiv, "esriCTVisible")) {
                    domClass.replace(this.headerMessageDiv, "esriCTHidden", "esriCTVisible");
                }
            }));
            if (domClass.contains(this.headerMessageDiv, "esriCTHidden")) {
                domClass.replace(this.headerMessageDiv, "esriCTVisible", "esriCTHidden");
            }
        },

        /**
        * Remove the error message container.
        * @param{object} node, node to bind error massage
        * @memberOf widgets/comment-form/comment-form
        */
        _removeErrorNode: function (node) {
            if (domClass.contains(node, "errorMessage")) {
                // destroy parent node
                domConstruct.destroy(node);
            }
        },

        /**
        * Create form elements
        * @param{object} currentField, object of current field in the info pop
        * @param{int} index, index of current field in the array
        * @param{object} referenceNode, Parent Node for dependent field
        * @memberOf widgets/comment-form/comment-form
        */
        _createFormElement: function (currentField, index, referenceNode) {
            var fieldname, labelContent, fieldLabelText, formContent, requireField, userFormNode, fieldAttribute;
            userFormNode = this.commentForm;
            //code to put asterisk mark for mandatory fields and also to give it a mandatory class.
            formContent = domConstruct.create("div", {}, userFormNode);
            // If dependent field has Reference Node
            if (referenceNode) {
                domConstruct.place(formContent, referenceNode, "after");
                domClass.add(formContent, "fade");
                setTimeout(function () {
                    domClass.add(formContent, "in");
                }, 100);
            }
            // If fields are not null able set to mandatory fields
            if (!currentField.nullable || currentField.typeField) {
                domClass.add(formContent, "form-group commentFormQuestionare mandatory");
                requireField = domConstruct.create("small", {
                    className: 'esriCTRequireFieldStyle',
                    innerHTML: this.config.i18n.geoform.requiredField
                }, formContent);
            } else {
                domClass.add(formContent, "form-group commentFormQuestionare");
            }
            // If field has alias
            // else Set field name
            if (currentField.alias) {
                fieldLabelText = currentField.alias;
            } else {
                fieldLabelText = currentField.name;
            }
            // assign field name
            fieldname = currentField.name;
            // Create Label
            labelContent = domConstruct.create("label", {
                "for": fieldname,
                className: "control-label",
                innerHTML: fieldLabelText,
                id: fieldname + "_label_" + index
            }, formContent);
            // Set required field with label
            if (requireField && labelContent) {
                domConstruct.place(requireField, labelContent, "last");
            }
            // set default Values to the fields
            if (this.commentTable.templates[0] && !currentField.defaultValue) {
                for (fieldAttribute in this.commentTable.templates[0].prototype.attributes) {
                    if (this.commentTable.templates[0].prototype.attributes.hasOwnProperty(fieldAttribute)) {
                        if (fieldAttribute.toLowerCase() === fieldname.toLowerCase()) {
                            if (this.commentTable.templates[0].prototype.attributes[fieldAttribute] !== null && lang.trim(this.commentTable.templates[0].prototype.attributes[fieldAttribute].toString()) !== "") {
                                currentField.defaultValue = this.commentTable.templates[0].prototype.attributes[fieldAttribute];
                            }
                        }
                    }
                }
            }

            // If field has coded domain value and typeField set to true then create form elements for domain fields
            // else create form elements for non domain fields
            if (currentField.domain || currentField.typeField) {
                this._createDomainValueFormElements(currentField, formContent, fieldname);
            } else {
                this._createInputFormElements(currentField, formContent, fieldname);
            }
            // Set hint text for range domain Value
            this._createRangeText(currentField, formContent, fieldname);
        },


        /**
        * Create range help text for elements.
        * @param{object} currentField, object of current field in the info pop
        * @param{object} formContent, Parent Node of the field inside geo form
        * @param{string} fieldname, name of the field
        * @memberOf widgets/comment-form/comment-form
        */
        _createRangeText: function (currentField, formContent, fieldname) {
            var options = {};
            // if field is required and field exists then set required field as a true
            if (!currentField.nullable && this.inputContent) {
                this.inputContent.setAttribute("aria-required", true);
                this.inputContent.setAttribute("required", "");
            }
            // if info pop has tooltip then create info popup hint text
            if (currentField.tooltip) {
                domConstruct.create("p", {
                    className: "help-block",
                    innerHTML: currentField.tooltip
                }, formContent);
            }
            // If field has range domain help text
            if (this.rangeHelpText) {
                options = {
                    trigger: 'focus',
                    placement: 'top',
                    container: 'body',
                    content: this.rangeHelpText,
                    html: true
                };
                $('#' + fieldname).popover(options);
                this.rangeHelpText = null;
            }
        },

        /**
        * Create Domain coded value elements of form.
        * @param{object} currentField, object of current field in the info pop
        * @param{object} formContent, Parent Node of the field inside geo form
        * @param{string} fieldname, name of the field
        * @memberOf widgets/comment-form/comment-form
        */
        _createDomainValueFormElements: function (currentField, formContent, fieldname) {
            var date, inputRangeDateGroupContainer, rangeDefaultDate, currentSelectedDate, formatedDate;
            if ((currentField.domain && (currentField.domain.type === 'undefined' || currentField.domain.type === undefined || currentField.domain.type === 'codedValue')) || currentField.typeField) {
                this._createCodedValueFormElements(currentField, formContent, fieldname);
            } else {
                // if field type is date create date field
                if (currentField.type === "esriFieldTypeDate") {
                    // create notation Icon for date field
                    inputRangeDateGroupContainer = this._addNotationIcon(formContent, "glyphicon-calendar");
                    // create date field
                    this.inputContent = this._createDateField(inputRangeDateGroupContainer, true, fieldname, currentField);
                    if (currentField.defaultValue) {
                        date = new Date(currentField.defaultValue);
                        // set current date to date field
                        $(inputRangeDateGroupContainer).data("DateTimePicker").setDate(date);
                        // set format to the current date
                        rangeDefaultDate = moment(date).format($(inputRangeDateGroupContainer).data("DateTimePicker").format);
                        // set default value and id to the array
                        this.defaultValueArray.push({ defaultValue: currentField.defaultValue, id: this.inputContent.id, type: currentField.type });
                    } else {
                        //Check if todays date falls between minimum and maximum date
                        if (currentField.domain.maxValue > Date.now() && currentField.domain.minValue < Date.now()) {
                            currentSelectedDate = Date.now();
                            $(inputRangeDateGroupContainer).data("DateTimePicker").setDate(moment(Date.now()).format($(inputRangeDateGroupContainer).data("DateTimePicker").format));
                        } else {
                            currentSelectedDate = currentField.domain.minValue;
                        }
                        formatedDate = moment(new Date(currentSelectedDate)).format($(inputRangeDateGroupContainer).data("DateTimePicker").format);
                        $(inputRangeDateGroupContainer).data("DateTimePicker").setDate(formatedDate);
                        this.defaultValueArray.push({ defaultValue: currentSelectedDate, id: this.inputContent.id, type: currentField.type });
                    }
                    // Assign value to the range help text
                    this.rangeHelpText = string.substitute(this.i18n.geoform.dateRangeHintMessage, {
                        minValue: moment(new Date(currentField.domain.minValue)).format($(inputRangeDateGroupContainer).data("DateTimePicker").format),
                        maxValue: moment(new Date(currentField.domain.maxValue)).format($(inputRangeDateGroupContainer).data("DateTimePicker").format),
                        openStrong: "<strong>",
                        closeStrong: "</strong>"
                    });
                } else {
                    // if field type is integer
                    this.rangeHelpText = this._setRangeForm(currentField, formContent, fieldname);
                }
            }
        },


        /**
        * Create coded value elements of form
        * @param{object} currentField, object of current field in the info pop
        * @param{object} formContent, Parent Node of the field inside geo form
        * @param{string} fieldname, name of the field
        * @memberOf widgets/comment-form/comment-form
        */
        _createCodedValueFormElements: function (currentField, formContent, fieldname) {
            var selectOptions;
            // check for fieldType: if not present create dropdown
            // If present check for fieldType value and accordingly populate the control
            // create controls for select
            this.inputContent = domConstruct.create("select", {
                className: "form-control selectDomain",
                "id": fieldname
            }, formContent);
            selectOptions = domConstruct.create("option", {
                innerHTML: this.config.i18n.geoform.selectDefaultText,
                value: ""
            }, this.inputContent);
            // check for domain value and create control for drop down list
            if (currentField.domain && !currentField.typeField) {
                array.forEach(currentField.domain.codedValues, lang.hitch(this, function (currentOption) {
                    selectOptions = domConstruct.create("option", {
                        innerHTML: currentOption.name,
                        value: currentOption.code
                    }, this.inputContent);
                    // if field contain default value, make that option selected
                    if (currentField.defaultValue === currentOption.code) {
                        // set selected is true
                        domAttr.set(selectOptions, "selected", true);
                        domAttr.set(selectOptions, "defaultSelected", true);
                        domClass.add(this.inputContent.parentNode, "has-success");
                        // set default value and id into the array
                        this.defaultValueArray.push({ defaultValue: currentField.defaultValue, id: this.inputContent.id });
                    }
                }));
            } else {
                // default values for subtypes(if any) has to be handled here
                array.forEach(currentField.subTypes, lang.hitch(this, function (currentOption) {
                    selectOptions = domConstruct.create("option", {}, this.inputContent);
                    selectOptions.text = currentOption.name;
                    selectOptions.value = currentOption.id;
                }));
            }
            // On selection Change
            this._codedValueOnChange(currentField);
        },

        /**
        * Take appropriate actions on selection of a subtype
        * @param{object} currentField, object of current field in the info pop
        * @memberOf widgets/comment-form/comment-form
        */
        _codedValueOnChange: function (currentField) {
            // event on change
            on(this.inputContent, "change", lang.hitch(this, function (evt) {
                // function call to take appropriate actions on selection of a subtype
                if (currentField.typeField) {
                    this._validateTypeFields(evt, currentField);
                }
                // To apply has-success class on selection of a valid option
                // else remove has-success class
                if (evt.target.value !== "") {
                    var targetNode = evt.currentTarget || evt.srcElement;
                    if (query(".errorMessage", targetNode.parentNode).length !== 0) {
                        domConstruct.destroy(query(".errorMessage", targetNode.parentNode)[0]);
                        domClass.remove(evt.target.parentNode, "has-error");
                    }
                    domClass.add($(evt.target.parentNode)[0], "has-success");
                } else {
                    domClass.remove($(evt.target.parentNode)[0], "has-success");
                }
            }));
        },

        /**
        * Validate fields defined within subtypes
        * @param{object} currentTarget, on change event current target field
        * @param{object} currentField, object of current field in the info pop
        * @memberOf widgets/comment-form/comment-form
        */
        _validateTypeFields: function (evt, currentField) {
            var selectedType, defaultValue, referenceNode, currentTarget = evt.currentTarget || evt.srcElement;
            // Validation for empty field
            // if field value is empty reset subtypes field
            if (currentTarget.value === "") {
                // if no type is selected, remove type dependent fields
                array.forEach(this.sortedFields, lang.hitch(this, function (currentInput) {
                    if (!currentInput.isTypeDependent) {
                        return true;
                    }
                    // rest form field and show dependent field in the form
                    this._resetSubTypeFields(currentInput);
                }));
            } else {
                // get all the domains and default values of the selected subtype
                array.some(currentField.subTypes, function (currentSelection) {
                    if (currentTarget.value === currentSelection.id.toString()) {
                        selectedType = currentSelection;
                        return true;
                    }
                });

                // initial point of reference to put elements
                referenceNode = dom.byId(this.layer.typeIdField).parentNode;
                // code to populate type dependent fields
                array.forEach(this.sortedFields, lang.hitch(this, function (currentInput, index) {
                    var field = null, fieldAttribute;
                    // condition to filter out fields independent of subtypes
                    if (!currentInput.isTypeDependent) {
                        return true;
                    }
                    // mixin array of sorted field and info pop field
                    array.some(this.layer.fields, function (layerField) {
                        if (layerField.name === currentInput.name) {
                            field = lang.clone(lang.mixin(layerField, currentInput));
                            return true;
                        }
                    });
                    // fetch the default value of a field for selected subtype.
                    if (selectedType.templates[0]) {
                        for (fieldAttribute in selectedType.templates[0].prototype.attributes) {
                            if (selectedType.templates[0].prototype.attributes.hasOwnProperty(fieldAttribute)) {
                                if (fieldAttribute.toLowerCase() === field.name.toLowerCase()) {
                                    if (selectedType.templates[0].prototype.attributes[fieldAttribute] !== null && lang.trim(selectedType.templates[0].prototype.attributes[fieldAttribute].toString()) !== "") {
                                        defaultValue = selectedType.templates[0].prototype.attributes[fieldAttribute];
                                        field.defaultValue = defaultValue;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    // validate dependent values
                    this._validateTypeFieldsValue(selectedType, field, referenceNode, index);
                }));
            }
        },


        /**
        * Populate domain properties for current field in form elements
        * @param{string} selectedType, current selected type
        * @param{array} field, an array of field details
        * @param{object} referenceNode, parent node for dependent field
        * @param{int} index , field index
        * @memberOf widgets/comment-form/comment-form
        */
        _validateTypeFieldsValue: function (selectedType, field, referenceNode, index) {
            var switchDomainType, i;
            // check for domain values
            for (i in selectedType.domains) {
                if (selectedType.domains.hasOwnProperty(i)) {
                    //condition to find the domain properties for current field
                    if (i === field.name) {
                        switchDomainType = selectedType.domains[i].type || "codedValue";
                        switch (switchDomainType) {
                        case "inherited":
                            break;
                        case "codedValue":
                            if (!field.domain) {
                                field.domain = {};
                            }
                            field.domain.codedValues = selectedType.domains[i].codedValues;
                            break;
                        case "range":
                            // Condition to change the range domain values of field already having domain.
                            if (!field.domain) {
                                field.domain = {};
                            }
                            field.domain.minValue = selectedType.domains[i].minValue;
                            field.domain.maxValue = selectedType.domains[i].maxValue;
                            break;
                        }
                    }
                }
            }
            // executed when the input is already present
            if (dom.byId(field.name)) {
                this._resetSubTypeFields(field);
            }
            // create form elements for dependent values
            this._createFormElement(field, index, referenceNode);
            // assign reference node to the dependent values
            if (field.type === "esriFieldTypeDate" || ((field.type === "esriFieldTypeSingle" || field.type === "esriFieldTypeDouble" || field.type === "esriFieldTypeSmallInteger" || field.type === "esriFieldTypeInteger") && (field.domain && field.domain.type && field.domain.type === "range"))) {
                referenceNode = dom.byId(field.name).parentNode.parentNode;
            } else {
                referenceNode = dom.byId(field.name).parentNode;
            }
        },

        /**
        * Validate date range field
        * @param{object} currentField, object of current field in the info pop
        * @param{object} formContent, Parent Node of the field inside geo form
        * @param{string} fieldname, name of the field
        * @memberOf widgets/comment-form/comment-form
        */
        _setRangeForm: function (currentField, formContent, fieldname) {
            var setStep, setDefault = "",
                stepDivisibility = 'none',
                decimalPoints = 0,
                inputcontentSpinner, rangeHelpText;
            // create container for range text and assign minimum and maximum values
            this.inputContent = domConstruct.create("input", {
                id: fieldname,
                type: "text",
                className: "form-control",
                min: currentField.domain.minValue.toString(),
                max: currentField.domain.maxValue.toString()
            }, formContent);
            domAttr.set(this.inputContent, "data-input-type", currentField.type.replace("esriFieldType", ""));
            // Check if default Value is present
            if (currentField.defaultValue) {
                setDefault = currentField.defaultValue;
                domClass.add(this.inputContent.parentNode, "has-success");
                this.defaultValueArray.push({ defaultValue: setDefault, id: this.inputContent.id, type: "range" });
            }
            // Set minimum and maximum value in range domain
            if (domAttr.get(this.inputContent, "data-input-type") === "Double" || domAttr.get(this.inputContent, "data-input-type") === "Single") {
                decimalPoints = 2;
                if (currentField.domain.minValue - Math.floor(currentField.domain.minValue) === 0.5) {
                    setStep = 0.5;
                } else {
                    setStep = 0.1;
                }
            } else {
                setStep = 1;
                stepDivisibility = 'round';
            }
            // Set Touch Spinner for domain coded numeric values
            inputcontentSpinner = $(this.inputContent).TouchSpin({
                initval: setDefault,
                min: currentField.domain.minValue.toString(),
                max: currentField.domain.maxValue.toString(),
                forcestepdivisibility: stepDivisibility,
                step: setStep,
                boostat: 5,
                decimals: decimalPoints,
                maxboostedstep: 10
            });
            // Touch Spinner on keyup event
            this._inputTouchspinOnKeyup(inputcontentSpinner, currentField);
            // Set minimum and maximum value to the rangeHelpText
            rangeHelpText = string.substitute(this.config.i18n.geoform.numericRangeHintMessage, {
                minValue: currentField.domain.minValue.toString(),
                maxValue: currentField.domain.maxValue.toString(),
                openStrong: "<strong>",
                closeStrong: "</strong>"
            });
            // return value
            return rangeHelpText;
        },


        /**
        * Event to address validations for manual entry in the touch-spinner input
        * @param{object} inputcontentSpinner, container of TouchSpin
        * @param{object} currentField, object of current field in the info pop
        * @memberOf widgets/comment-form/comment-form
        */
        _inputTouchspinOnKeyup: function (inputcontentSpinner, currentField) {
            // Touch Spinner on keyup event
            on(this.inputContent, "keyup", lang.hitch(this, function () {
                // replace classes on key up event
                if (this.inputContent.value === "") {
                    domClass.remove(this.inputContent.parentNode.parentNode, "has-success");
                } else {
                    domClass.add(this.inputContent.parentNode.parentNode, "has-success");
                }
            }));
            // Touch Spinner event
            on(inputcontentSpinner, "touchspin.on.startspin", lang.hitch(this, function (evt) {
                inputcontentSpinner.trigger("touchspin.updatesettings", {});
                var targetNode = evt.currentTarget || evt.srcElement;
                domClass.add(targetNode.parentNode.parentNode, "has-success");
            }));
            // if not nullable field
            if (!currentField.nullable) {
                this.inputContent.setAttribute("aria-required", true);
                this.inputContent.setAttribute("required", "");
            }
        },
        /**
        * Create input elements of form.
        * @param{object} currentField, object of current field in the info pop
        * @param{object} formContent, Parent Node of the field inside geo form
        * @param{string} fieldname, name of the field
        * @memberOf widgets/comment-form/comment-form
        */
        _createInputFormElements: function (currentField, formContent, fieldname) {
            var inputDateGroupContainer;
            // Create field controls on basis of their type
            switch (currentField.type) {
            case "esriFieldTypeString":
                if (currentField.stringFieldOption === "textbox") {
                    this.inputContent = domConstruct.create("input", {
                        type: "text",
                        className: "form-control",
                        "data-input-type": "String",
                        "maxLength": currentField.length,
                        "id": fieldname
                    }, formContent);
                } else {
                    this.inputContent = domConstruct.create("textarea", {
                        className: "form-control",
                        "data-input-type": "String",
                        "rows": 4,
                        "maxLength": currentField.length,
                        "id": fieldname
                    }, formContent);
                }
                break;
            case "esriFieldTypeSmallInteger":
                this.inputContent = domConstruct.create("input", {
                    type: "text",
                    className: "form-control",
                    "data-input-type": "SmallInteger",
                    "id": fieldname,
                    "pattern": "[0-9]*"
                }, formContent);
                break;
            case "esriFieldTypeInteger":
                this.inputContent = domConstruct.create("input", {
                    type: "text",
                    className: "form-control",
                    "data-input-type": "Integer",
                    "id": fieldname,
                    "pattern": "[0-9]*"
                }, formContent);
                break;
            case "esriFieldTypeSingle":
                this.inputContent = domConstruct.create("input", {
                    type: "text",
                    className: "form-control",
                    "data-input-type": "Single",
                    "id": fieldname
                }, formContent);
                break;
            case "esriFieldTypeDouble":
                this.inputContent = domConstruct.create("input", {
                    type: "text",
                    className: "form-control",
                    "data-input-type": "Double",
                    "id": fieldname,
                    step: ".1"
                }, formContent);
                break;
            case "esriFieldTypeDate":
                // add notation icon for calendar
                inputDateGroupContainer = this._addNotationIcon(formContent, "glyphicon-calendar");
                this.inputContent = this._createDateField(inputDateGroupContainer, false, fieldname, currentField);
                break;
            }
            // add default values to the fields
            this._addInputElementsValue(currentField, formContent, inputDateGroupContainer);
        },

        /**
        * Clear form fields, reset the form and assign default value if it exists
        * @memberOf widgets/comment-form/comment-form
        */
        _clearFormFields: function () {
            var node, index;
            // remove error and success messages for each form field
            array.forEach(query(".form-control", this.domNode), lang.hitch(this, function (currentInput) {
                node = currentInput.parentElement;
                //Remove error message div
                //This logic is required for resetting geoform when user enters something wrong and clicks on Cancel button
                array.some(node.children, lang.hitch(this, function (currentNode) {
                    if (domClass.contains(currentNode, "errorMessage")) {
                        this._removeErrorNode(currentNode);
                        return true;
                    }
                }));

                // Clear form fields
                if (!domClass.contains(currentInput, "selectDomain")) {
                    domAttr.set(currentInput, "value", "");
                    domClass.remove(node, "has-error");
                    domClass.remove(node, "has-success");
                } else {
                    currentInput.options[0].selected = true;
                    domClass.remove(node, "has-success");
                    domClass.remove(node, "has-error");
                }
            }));
            array.forEach(this.sortedFields, lang.hitch(this, function (currentInput) {
                if (!currentInput.isTypeDependent) {
                    return true;
                }
                // rest form field and show dependent field in the form
                this._resetSubTypeFields(currentInput);
            }));
            // clear error and success messages
            array.forEach(query(".commentFormQuestionare .input-group"), function (currentInput) {
                domClass.remove(currentInput.parentElement, "has-error");
                domClass.remove(currentInput.parentElement, "has-success");
            });

            // Reset Form
            this.commentForm.reset();
            // Set default Values and success to the controls
            array.forEach(query(".form-control", this.domNode), lang.hitch(this, function (currentInput) {
                for (index = 0; index < this.defaultValueArray.length; index++) {
                    if (this.defaultValueArray[index].id === currentInput.id) {
                        if (this.defaultValueArray[index].type === "esriFieldTypeDate" || this.defaultValueArray[index].type === "range") {
                            domClass.add(currentInput.parentElement.parentElement, "has-success");
                        } else {
                            domClass.add(currentInput.parentElement, "has-success");
                        }
                        if (!domClass.contains(currentInput, "selectDomain")) {
                            domAttr.set(currentInput, "value", this.defaultValueArray[index].defaultValue);
                        }
                        if (this.defaultValueArray[index].type === "esriFieldTypeDate") {
                            var date = new Date(this.defaultValueArray[index].defaultValue);
                            // set current date to date field
                            $(currentInput.parentElement).data('DateTimePicker').setDate(date);
                        }
                    }
                }
            }));

            domConstruct.empty(query(".esriCTResultContainer")[0]);
            domClass.add(query(".esriCTResultContainer")[0], "esriCTHidden");
            this.clearHeaderMessage();
        },

        /**
        * Clear header message
        * @memberOf widgets/comment-form/comment-form
        */
        clearHeaderMessage: function () {
            //Hide error message div, if it is visible
            if (domClass.contains(this.headerMessageDiv, "esriCTVisible")) {
                domClass.replace(this.headerMessageDiv, "esriCTHidden", "esriCTVisible");
            }
        },

        /**
        * Add default values to the fields
        * @param{object} currentField, object of current field in the info pop
        * @param{object} formContent, Parent Node of the field inside geo form
        * @param{object} inputDateGroupContainer, container for the date time picker
        * @memberOf widgets/comment-form/comment-form
        */
        _addInputElementsValue: function (currentField, formContent, inputDateGroupContainer) {
            var defaultDate, date;
            // If default values is present assign it to the field
            if (currentField.defaultValue) {
                // If field type is date assign date to date time picker
                // else assign default value to the input controls
                if (currentField.type === "esriFieldTypeDate") {
                    date = new Date(currentField.defaultValue);
                    // set current date to date field
                    $(inputDateGroupContainer).data("DateTimePicker").setDate(date);
                    // set format to the current date
                    defaultDate = moment(date).format($(inputDateGroupContainer).data("DateTimePicker").format);
                    this.defaultValueArray.push({ defaultValue: currentField.defaultValue, id: this.inputContent.id, type: currentField.type });
                } else {
                    domAttr.set(this.inputContent, "value", currentField.defaultValue);
                    domClass.add(formContent, "has-success");
                    this.defaultValueArray.push({ defaultValue: currentField.defaultValue, id: this.inputContent.id });
                }
            } else {
                // else assign current date to the date time picker
                if (currentField.type === "esriFieldTypeDate") {
                    // set current date to date field
                    $(inputDateGroupContainer).data("DateTimePicker").setDate(new Date());
                    // set format to the current date
                    defaultDate = moment(new Date()).format($(inputDateGroupContainer).data("DateTimePicker").format);
                    this.defaultValueArray.push({ defaultValue: new Date(), id: this.inputContent.id, type: currentField.type });
                }
            }
            // If field type is not date, validate fields on focus out
            if (currentField.type !== "esriFieldTypeDate") {
                // Set Validation for the field on focus out
                on(this.inputContent, "focusout", lang.hitch(this, function (evt) {
                    this._validateField(evt, currentField, true);
                }));
            }
        },


        /**
        * Validate form field
        * @param{object} currentNode, apply validation on current node
        * @param{object} currentField, object of current field in the info pop
        * @param{Boolean} iskeyPress, set Boolean value true or false
        * @memberOf widgets/comment-form/comment-form
        */
        _validateField: function (currentNode, currentField, iskeyPress) {
            var inputType, inputValue, node, typeCastedInputValue, error, floatVal = /^[-+]?[0-9]+\.[0-9]+$/,
                targetNode = currentNode.currentTarget || currentNode.srcElement, decimal = /^[-+]?[0-9]+$/;
            // trim current value
            inputValue = lang.trim(targetNode.value);
            // get value of data-input-type
            inputType = domAttr.get(targetNode, "data-input-type");
            // check for the target node and assign the parent node value
            if ($(currentNode.target)) {
                node = $(currentNode.target.parentNode)[0];
            } else {
                node = $(targetNode.parentNode)[0];
            }
            // Set validation on the field by their types
            switch (inputType) {
            case "String":
                if (inputValue.length !== 0) {
                    this._validateUserInput(false, node, inputValue, iskeyPress);
                } else {
                    error = string.substitute(this.config.i18n.geoform.invalidInputValue, {
                        openStrong: "<strong>",
                        closeStrong: "</strong>"
                    });
                    this._validateUserInput(error, node, inputValue, iskeyPress);
                }
                break;
            case "SmallInteger":
                typeCastedInputValue = parseInt(inputValue, 10);
                if ((inputValue.match(decimal) && typeCastedInputValue >= -32768 && typeCastedInputValue <= 32767) && inputValue.length !== 0) {
                    this._validateUserInput(false, node, inputValue);
                    this._setFormatToValue(currentField, typeCastedInputValue, currentNode.target);
                } else {
                    error = string.substitute(this.config.i18n.geoform.invalidSmallNumber, {
                        openStrong: "<strong>",
                        closeStrong: "</strong>"
                    });
                    this._validateUserInput(error, node, inputValue, iskeyPress);
                }
                break;
            case "Integer":
                typeCastedInputValue = parseInt(inputValue, 10);
                if ((inputValue.match(decimal) && typeCastedInputValue >= -2147483648 && typeCastedInputValue <= 2147483647) && inputValue.length !== 0) {
                    this._validateUserInput(false, node, inputValue, iskeyPress);
                    this._setFormatToValue(currentField, typeCastedInputValue, currentNode.target);
                } else {
                    error = string.substitute(this.config.i18n.geoform.invalidNumber, {
                        openStrong: "<strong>",
                        closeStrong: "</strong>"
                    });
                    this._validateUserInput(error, node, inputValue, iskeyPress);
                }
                break;
            case "Single":
                // zero or more occurrence of (+-) at the start of expression
                // at least one occurrence of digits between o-9
                // occurrence of .
                // at least one occurrence of digits between o-9 in the end
                typeCastedInputValue = parseFloat(inputValue);
                if (((inputValue.match(decimal) || inputValue.match(floatVal)) && typeCastedInputValue >= -3.4 * Math.pow(10, 38) && typeCastedInputValue <= 1.2 * Math.pow(10, 38)) && inputValue.length !== 0) {
                    this._validateUserInput(false, node, inputValue, iskeyPress);
                    this._setFormatToValue(currentField, typeCastedInputValue, currentNode.target);
                } else {
                    error = string.substitute(this.config.i18n.geoform.invalidFloat, {
                        openStrong: "<strong>",
                        closeStrong: "</strong>"
                    });
                    this._validateUserInput(error, node, inputValue, iskeyPress);
                }
                break;
            case "Double":
                typeCastedInputValue = parseFloat(inputValue);
                if (((inputValue.match(decimal) || inputValue.match(floatVal)) && typeCastedInputValue >= -2.2 * Math.pow(10, 308) && typeCastedInputValue <= 1.8 * Math.pow(10, 38)) && inputValue.length !== 0) {
                    this._validateUserInput(false, node, inputValue, iskeyPress);
                    this._setFormatToValue(currentField, typeCastedInputValue, currentNode.target);
                } else {
                    error = string.substitute(this.config.i18n.geoform.invalidDouble, {
                        openStrong: "<strong>",
                        closeStrong: "</strong>"
                    });
                    this._validateUserInput(error, node, inputValue, iskeyPress);
                }
                break;
            }
        },

        /**
        * Format input values
        * @param{object} currentField, current targeted field
        * @param{int} typeCastedInputValue , input integer value of field
        * @memberOf widgets/geo-form/geo-form
        */
        _setFormatToValue: function (currentField, typeCastedInputValue, node) {
            var toFixedValue;
            // check if field has format and digitSeparator is true
            if (currentField.format && currentField.format.digitSeparator) {
                // set format to the field and set toFixed value on focus out
                toFixedValue = typeCastedInputValue.toFixed(currentField.format.places);
                domAttr.set(node, "value", toFixedValue);
            }
        },


        /**
        * Validate form input
        * @param{string} error, error found in the node
        * @param{object} node, parent node to add and remove classes based on validation
        * @param{string} inputValue , input value
        * @param{string} iskeyPress, check for flag
        * @memberOf widgets/comment-form/comment-form
        */
        _validateUserInput: function (error, node, inputValue, iskeyPress) {
            if (query(".errorMessage", node)[0]) {
                domConstruct.destroy(query(".errorMessage", node)[0]);
            }
            if (!error || (inputValue.length === 0 && !domClass.contains(node, "mandatory"))) {
                domClass.add(node, "has-success");
                domClass.remove(node, "has-error");
            } else {
                // On Error show error massage
                // Change the class of node
                this._showErrorMessageDiv(error, node.children[0]);
                domClass.add(node, "has-error");
                domClass.remove(node, "has-success");
            }
            if (iskeyPress && inputValue.length === 0 && !domClass.contains(node, "mandatory")) {
                domClass.remove(node, "has-error");
                domClass.remove(node, "has-success");
            }
        },

        /**
        * Add calendar notation icon
        * @param{object} formContent, Parent Node to attached field
        * @param{string} imageIconClass,default class of image icon calendar
        * @memberOf widgets/comment-form/comment-form
        */
        _addNotationIcon: function (formContent, imageIconClass) {
            var inputIconGroupContainer, inputIconGroupAddOn;
            // create container for calendar for date time picker
            inputIconGroupContainer = domConstruct.create("div", {
                className: "input-group"
            }, formContent);
            inputIconGroupAddOn = domConstruct.create("span", {
                className: "input-group-addon"
            }, inputIconGroupContainer);
            domConstruct.create("span", {
                className: "glyphicon " + imageIconClass
            }, inputIconGroupAddOn);
            // return Value
            return inputIconGroupContainer;
        },

        /**
        * Create date time picker
        * @param{object} parentNode, parent node to attached date time picker
        * @param{Boolean} isRangeField, set flag true or false depends on range
        * @param{string} fieldname, name of the field
        * @param{object} currentField, object of Current Field Details
        * @memberOf widgets/comment-form/comment-form
        */
        _createDateField: function (parentNode, isRangeField, fieldname, currentField) {
            var dateInputField, picker, selectedDate, setDateFormat, minVlaue, maxValue, value;
            domClass.add(parentNode, "date");
            // create input container for DateTimePicker
            dateInputField = domConstruct.create("input", {
                type: "text",
                value: "",
                className: "form-control hasDatetimepicker",
                "data-input-type": "Date",
                "id": fieldname
            }, parentNode);
            // get date format
            if (currentField.format.dateFormat) {
                setDateFormat = this.appUtils.getDateFormat(currentField.format.dateFormat);
            }
            // on focus
            on(dateInputField, "focus", function () {
                if (!isRangeField) {
                    $(this.parentElement).data("DateTimePicker").show();
                }
            });
            // on blur
            on(dateInputField, "blur", function () {
                $(this.parentElement).data("DateTimePicker").hide();
            });
            // Attach datetime picker to the container
            $(parentNode).datetimepicker({
                useSeconds: false,
                useStrict: false,
                format: setDateFormat.dateFormat,
                pickTime: setDateFormat.showTime,
                language: kernel.locale
            }).on('dp.show', function (evt) {
                if (isRangeField) {
                    value = new Date(query("input", this)[0].value);
                    minVlaue = new Date(currentField.domain.minValue);
                    maxValue = new Date(currentField.domain.maxValue);
                    if ((value > minVlaue && value > maxValue) || (value < minVlaue && value < maxValue)) {
                        query("input", this)[0].value = "";
                    }
                }
                // on Datetime picker show event
                picker = $(this).data('DateTimePicker');
                selectedDate = picker.getDate();
                if (selectedDate === null) {
                    query("input", this)[0].value = "";
                }
                if (query(".errorMessage", query(evt.target).parents(".commentFormQuestionare")[0])[0]) {
                    domConstruct.destroy(query(".errorMessage", query(evt.target).parents(".commentFormQuestionare")[0])[0]);
                }
                domClass.remove(query(evt.target).parents(".commentFormQuestionare")[0], "has-error");
                domClass.add(query(evt.target).parents(".commentFormQuestionare")[0], "has-success");
                if (query("input", this)[0].value === "") {
                    domClass.remove(query(evt.target).parents(".commentFormQuestionare")[0], "has-success");
                    domClass.remove(query(evt.target).parents(".commentFormQuestionare")[0], "has-error");
                }
            }).on('dp.error', function (evt) {
                // on error
                evt.target.value = '';
                domClass.remove(query(evt.target).parents(".commentFormQuestionare")[0], "has-success");
                domClass.add(query(evt.target).parents(".commentFormQuestionare")[0], "has-error");
            }).on("dp.hide", function (evt) {
                // on Datetime picker hide event
                if (query("input", this)[0].value === "") {
                    domClass.remove(query(evt.target).parents(".commentFormQuestionare")[0], "has-success");
                    domClass.remove(query(evt.target).parents(".commentFormQuestionare")[0], "has-error");
                }
            }).on('dp.change', function (evt) {
                // on change
                domClass.add(query(evt.target).parents(".commentFormQuestionare")[0], "has-success");
                domClass.remove(query(evt.target).parents(".commentFormQuestionare")[0], "has-error");
            });
            // if isRangeField is set to true for range Domain value then assign maximum and minimum value to the date time picker
            if (isRangeField) {
                $(parentNode).data("DateTimePicker").setMaxDate(locale.format(new Date(currentField.domain.maxValue), {
                    fullYear: true
                }));
                $(parentNode).data("DateTimePicker").setMinDate(locale.format(new Date(currentField.domain.minValue), {
                    fullYear: true
                }));
            }
            // return Value
            return dateInputField;
        },

        /**
        * Callback after comment form is submmited
        * @param{item} selected item
        * @memberOf widgets/comment-form/comment-form
        */
        onCommentFormSubmitted: function (item) {
            return item;
        },

        /**
        * Callback after clicking cancel button of comment form
        * @memberOf widgets/comment-form/comment-form
        */
        onCancelButtonClick: function (evt) {
            return evt;
        },

        /**
        * set current item
        * @param{item} selected item
        * @memberOf widgets/comment-form/comment-form
        */
        setItem: function (item, selectedLayer) {
            this.item = item;
            this.selectedLayer = selectedLayer;
        }
    });
});