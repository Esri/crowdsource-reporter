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
    "dojo/dom-style",
    "dojo/query",
    "dojo/dom",
    "dojo/string",
    "dojo/on",
    'dojo/dom-attr',
    "dojo/date/locale",
    "esri/graphic",
    "esri/tasks/RelationshipQuery",
    "dojo/text!./templates/comment-form.html"
], function (
    declare,
    _WidgetBase,
    _TemplatedMixin,
    lang,
    array,
    kernel,
    domConstruct,
    domClass,
    domStyle,
    query,
    dom,
    string,
    on,
    domAttr,
    locale,
    Graphic,
    RelationshipQuery,
    commentForm
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: commentForm,
        sortedFields: [],
        i18n: {},
        item: null,
        rangeHelpText: null,
        _layerHasReportedByField: false,
        selectedLayer: null,
        fileAttachmentList: null, // list of files that is been attached
        _fileInputIcon: null, // browse button to attach files
        _fileAttachmentCounter: 1, // to display number of attachments that is been added or removed
        _totalFileAttachedCounter: 0, // to store total number of file that is been attached
        _fileAttachedCounter: 0, // to store number of files that is been attached
        _fileFailedCounter: 0, // to store number of files that is been failed to attached
        _deletedAttachmentsArr: [], // to store deleted attachments

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
            var submitCommentText;
            this.inherited(arguments);
            this._initializeCommentForm();
            if (this.addComments) {
                submitCommentText = this.config.i18n.comment.commentsFormSubmitButton;
            } else {
                submitCommentText = this.config.i18n.comment.commentsFormEditButton;
            }
            domAttr.set(this.postCommentButton, "innerHTML", submitCommentText);
            // click event for submit comment form on submit button click
            on(this.postCommentButton, "click", lang.hitch(this, function () {
                this.appUtils.showLoadingIndicator();
                this._submitCommentForm();
            }));
            on(this.cancelCommentButton, "click", lang.hitch(this, function (evt) {
                this.appUtils.showLoadingIndicator();
                this.onCancelButtonClick(evt);
                this.appUtils.hideLoadingIndicator();
            }));
        },

        startup: function () {
            this.inherited(arguments);
        },

        _initializeCommentForm: function () {
            this._deletedAttachmentsArr = [];
            this._filterLayerFields();
            // Sort fields array by type
            this._sortedTypeFormElement();
            //Clear previous attachments
            this._clearAttachments();
            // create attachment button if comment table has attachments
            this._createAttachments();
            this._addExistingAttachments();
        },

        /**
        * This function is used to display the existing attachments
        * @memberOf widgets/comment-form/comment-form
        */
        _addExistingAttachments: function () {
            var i;
            if (this.existingAttachmentsObjectsArr && this.existingAttachmentsObjectsArr.length > 0) {
                for (i = 0; i < this.existingAttachmentsObjectsArr.length; i++) {
                    this._createExistingAttachment(this.existingAttachmentsObjectsArr[i], i);
                    this._updateAttachmentCount();
                }
            }
        },

        /**
        * This function is used to create existing attachments
        * @param{object} existingAttachment - existing attachment whose UI needs to be created
        * @memberOf widgets/comment-form/comment-form
        */
        _createExistingAttachment: function (existingAttachment) {
            var alertHtml, existingAttachmentNode;
            alertHtml = "<div class=\"esriCTFileAlert alert alert-dismissable alert-success\">";
            alertHtml += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">" + "X" + "</button>";
            alertHtml += "<span>" + existingAttachment.attachmentFileName + "</span>";
            alertHtml += "</div>";
            existingAttachmentNode = domConstruct.toDom(alertHtml);
            domAttr.set(existingAttachmentNode.children[0], "attachmentObjectID", existingAttachment.attachmentObjectID);
            this._onExistingAttachmentCloseButtonClick(existingAttachmentNode.children[0]);
            domConstruct.place(existingAttachmentNode, this.fileAttachmentList, "last");
        },

        /**
        * This function is used to update the attachment count when clicked on existing attachment close button
        * @param{object} existingAttachmentCloseButton - close button to which click event needs to be attached
        * @memberOf widgets/comment-form/comment-form
        */
        _onExistingAttachmentCloseButtonClick: function (existingAttachmentCloseButton) {
            on(existingAttachmentCloseButton, "click", lang.hitch(this, function (evt) {
                setTimeout(lang.hitch(this, function () {
                    var attachmentObjectID;
                    attachmentObjectID = domAttr.get(evt.target, "attachmentObjectID");
                    attachmentObjectID = parseInt(attachmentObjectID, 10);
                    this._deletedAttachmentsArr.push(attachmentObjectID);
                    this._updateAttachmentCount();
                }), 1);
            }));
        },

        /**
        * Create attachment button while adding comments
        * @memberOf widgets/comment-form/comment-form
        */
        _createAttachments: function () {
            var fileInput, formContent, fileChange, fileAttachmentContainer, fileContainer, commentFormAttachmentSectionLabel, userFormNode;
            // If layer has hasAttachments true
            if (this.commentTable.hasAttachments) {
                userFormNode = dom.byId("addCommentAttachmentsWrapperContainer");
                // Create container for hasAttachment
                formContent = domConstruct.create("div", {
                    "class": "form-group hasAttachment esriCTCommentsFormAttachmentLabel"
                }, userFormNode);
                if (this.config.commentFormAttachmentSectionLabel) {
                    if (this.config.commentFormAttachmentSectionLabel === "Attachments") {
                        commentFormAttachmentSectionLabel = this.config.i18n.comment.selectAttachments;
                    } else {
                        commentFormAttachmentSectionLabel = this.config.commentFormAttachmentSectionLabel;
                    }
                } else {
                    commentFormAttachmentSectionLabel = this.config.i18n.comment.selectAttachments;
                }
                // Select attachment label
                domConstruct.create("label", {
                    "innerHTML": commentFormAttachmentSectionLabel,
                    "id": "commentFormAttachmentTitleLabel",
                    "class": "esriCTCommentFormTitles"
                }, formContent);
                domConstruct.create("br", {}, formContent);
                // Create div for Attachment button
                fileContainer = domConstruct.create("div", { "class": "esriCTFileButtonContainer", "title": this.config.i18n.comment.selectFileText }, formContent);
                this._fileInputIcon = domConstruct.create("button", {
                    "type": "button",
                    "innerHTML": this.config.i18n.comment.selectFileText,
                    "class": "btn btn-default esriCTAddCommentAttachmentsButton esriCTEllipsis esriCTApplicationColor esriCTButtonTextColor esriCTButtonBackgroundColor"
                }, fileContainer);
                // Show photo selected count
                domConstruct.create("div", {
                    "id": "attachmentSelectedCount",
                    "class": "esriCTAttachmentSelectedCount"
                }, formContent);
                fileAttachmentContainer = domConstruct.create("div", {
                    "class": "container esriCTAttachmentContainer"
                }, formContent);
                this.fileAttachmentList = domConstruct.create("div", {
                    "class": "row esriCTFileAttachMenuList"
                }, fileAttachmentContainer);
                // Create input container for attachments
                fileInput = domConstruct.create("input", {
                    "type": "file",
                    "accept": "image/*",
                    "name": "attachment",
                    "style": {
                        "height": "38px",
                        "width": "80px"
                    },
                    "class": "esriCTPointerCursor"
                }, domConstruct.create("form", {
                    "id": "commentFormAttachment" + this._fileAttachmentCounter++,
                    "class": "esriCTHideFileInputUI"
                }, fileContainer));
                // domClass.add(fileInput, "esriCTPointerCursor");
                // Handle change event for file control
                fileChange = on(fileInput, "change", lang.hitch(this, function (evt) {
                    fileChange.remove();
                    this._onFileSelected(evt);
                }));
            }
        },

        /**
        * This function will update attachment count based on count will show/hide message in comments form
        * @memberOf widgets/comment-form/comment-form
        */
        _updateAttachmentCount: function () {
            var photoSelectedDiv = dom.byId("attachmentSelectedCount"), selectedAttachmentsCount;
            if (photoSelectedDiv) {
                selectedAttachmentsCount = query(".alert-dismissable", this.fileAttachmentList).length;
                if (selectedAttachmentsCount > 0) {
                    domAttr.set(photoSelectedDiv, "innerHTML", selectedAttachmentsCount + " " + this.config.i18n.comment.attachmentSelectedMsg);
                } else {
                    domAttr.set(photoSelectedDiv, "innerHTML", "");
                }
            }
        },

        /**
        * Show selected file on comment form and create new fileControl so that multiple files can be selected.
        * @param{object} evt - Event object which will be generated on file input change event.
        * @memberOf widgets/comment-form/comment-form
        */
        _onFileSelected: function (evt) {
            var newFormControl, fileInput, fileName, fileChange, alertHtml, target = evt.currentTarget || evt.srcElement;
            if (target && target.value) {
                fileName = target.value;
                fileName = fileName.split("\\")[fileName.split("\\").length - 1];
            } else {
                fileName = "";
            }
            //once file is selected change class so that the selected file will be added as attachment
            domClass.replace(target.parentNode, "esriCTFileToSubmit", "esriCTHideFileInputUI");
            domStyle.set(target.parentNode, "display", "none");
            //Add dismiss-able alert for each file, and show file name and file size in it.
            alertHtml = "<div id=" + target.parentNode.id + "_Close" + " class=\"esriCTFileAlert alert alert-dismissable alert-success\">";
            alertHtml += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">" + "X" + "</button>";
            alertHtml += "<span>" + fileName + "</span>";
            alertHtml += "</div>";
            alertHtml = domConstruct.place(alertHtml, this.fileAttachmentList, "last");
            //if file is removed then
            //replace the class from esriCTFileToSubmit to esriCTHideFileInputUI and update the file selected count
            $('#' + target.parentNode.id + "_Close").bind('closed.bs.alert', lang.hitch(this, function (evt) {
                domClass.replace(dom.byId(evt.target.id.split("_")[0]), "esriCTHideFileInputUI", "esriCTFileToSubmit");
                this._updateAttachmentCount();
            }));
            //once filename is shown, update file attachments count
            this._updateAttachmentCount();
            //Check if file input container is present
            if ($(".hasAttachment")[0]) {
                newFormControl = domConstruct.create("form", { "id": "commentFormAttachment" + this._fileAttachmentCounter++, "class": "esriCTHideFileInputUI" }, $(".hasAttachment")[0]);
                //create new file input control so that multiple files can be attached
                fileInput = domConstruct.create("input", {
                    "type": "file",
                    "accept": "image/*",
                    "name": "attachment",
                    "style": { "height": dojo.coords(this._fileInputIcon).h + "px", "width": dojo.coords(this._fileInputIcon).w + "px" }
                }, newFormControl);
                //place the newly created file-input control after file selection icon
                domConstruct.place(newFormControl, this._fileInputIcon, "after");
                //handle change event for file control if file size is
                fileChange = on(fileInput, "change", lang.hitch(this, function (evt) {
                    fileChange.remove();
                    this._onFileSelected(evt);
                }));
            }
        },

        /**
        * Clear previous attachment count and hide the message
        * @memberOf widgets/comment-form/comment-form
        */
        _clearAttachments: function () {
            var fileList, i;
            // Check for the file attachment container
            if (this.fileAttachmentList) {
                fileList = query(".alert-dismissable", this.fileAttachmentList);
                for (i = 0; i < fileList.length; i++) {
                    // Check for attachments file and replace the class
                    if (dom.byId(fileList[i].id.split("_")[0])) {
                        domClass.replace(dom.byId(fileList[i].id.split("_")[0]), "esriCTHideFileInputUI", "esriCTFileToSubmit");
                    }
                    // Destroy node by Id
                    if (dom.byId(fileList[i].id)) {
                        domConstruct.destroy(fileList[i].id);
                    }
                }
                // Update count of attachment
                this._updateAttachmentCount();
            }
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
                    if ((hasDomainValue && hasDomainValue.type !== "inherited") || (hasDefaultValue && !currentField.typeField) || (hasDefaultValue === 0 && !currentField.typeField)) {
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
            var featureData, editedFields = [], key, picker, datePicker, value, erroneousFields = [], commentFormDiv,
                typeField;
            erroneousFields = this._checkForFields();
            commentFormDiv = query(".esriCTItemDetailsContainer")[0];
            if (erroneousFields.length !== 0) {
                // Scroll to the erroneous field node
                $(commentFormDiv).animate({
                    scrollTop: erroneousFields[0].offsetTop - 50 // deduct heigt of panel to calculate exact offset
                }, 1000);
                this.appUtils.hideLoadingIndicator();
            } else {
                // Create instance of graphic
                featureData = new Graphic();
                // create an empty array object
                featureData.attributes = {};
                // for all the fields
                array.forEach(query(".commentFormQuestionare .form-control", this.enterCommentContainer), lang.hitch(this, function (currentField) {
                    // get id of the field
                    key = domAttr.get(currentField, "id");
                    if (currentField.value !== "") {
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
                    } else if (!this.addComments) {
                        featureData.attributes[key] = null;
                        editedFields.push(key);
                    }
                }));

                // If layer has ReportedBy Field then Add logged in username in it
                // Add ReportedBy field to editedFields array so that it will not get the default value from template
                if (this._layerHasReportedByField) {
                    featureData.attributes[this.config.reportedByField] = this.config.logInDetails.processedUserName;
                    editedFields.push(key);
                }

                //Check if layer has typeID field, then add the default values for the field from selected typeID field template
                if (this.commentTable.typeIdField && this.commentTable.typeIdField !== "") {
                    for (typeField in this.commentTable.types) {
                        if (this.commentTable.types.hasOwnProperty(typeField)) {
                            if (this.commentTable.types[typeField].id === featureData.attributes[this.commentTable.typeIdField]) {
                                this._addValuesFromTemplate(this.commentTable.types[typeField].templates[0], editedFields, featureData);
                            }
                        }
                    }
                }
                //Check if layer has template, then add the Default values from template of the layer, for the fields which are not editable(not available in commentform to edit)
                if (this.commentTable.templates && this.commentTable.templates.length > 0) {
                    this._addValuesFromTemplate(this.commentTable.templates[0], editedFields, featureData);
                }

                if (this.addComments) {
                    this._primaryKeyField = this.selectedLayer.relationships[0].keyField;
                    this._foreignKeyField = this.commentTable.relationships[0].keyField;
                    if (this.item.attributes[this._primaryKeyField]) {
                        featureData.attributes[this._foreignKeyField] = this.item.attributes[this._primaryKeyField];
                    }
                    this._addNewComments(featureData);
                } else {
                    this._updateComments(featureData);
                }
            }
        },

        /**
        * Add fields and values to feature data to be submitted, from template
        * @param{object} template object returned from layer info
        * @param{array} editedFields, fields which are edited and needs to be skipped for considering their default values
        * @param{object} featureData,Feature object to be submitted
        * @memberOf widgets/comment-form/comment-form
        */
        _addValuesFromTemplate: function (template, editedFields, featureData) {
            var fieldAttribute;
            //loop through all the fields in Templates and if the field has some value add that field to feature
            for (fieldAttribute in template.prototype.attributes) {
                if (template.prototype.attributes.hasOwnProperty(fieldAttribute)) {
                    //skip the fields which are edited using commentform
                    if ($.inArray(fieldAttribute, editedFields) === -1) {
                        //check if their is valid value for the field in template and add that value in feature-data to be submitted
                        //also add that field in edited array since same field can have default values in template for layer and template for typeIdField
                        if (template.prototype.attributes[fieldAttribute]) {
                            featureData.attributes[fieldAttribute] = template.prototype.attributes[fieldAttribute];
                            editedFields.push(fieldAttribute);
                        }
                    }
                }
            }
        },

        /**
        * This function is used to add new comments
        * @memberOf widgets/comment-form/comment-form
        */
        _addNewComments: function (featureData) {
            // Add the comment to the comment table
            this.commentTable.applyEdits([featureData], null, null, lang.hitch(this, function (results) {
                if (results[0].success) {
                    var fileList, i, userFormNode;
                    userFormNode = dom.byId("addCommentAttachmentsWrapperContainer");
                    // if layer has attachments then add those attachments
                    if (this.commentTable.hasAttachments && query(".esriCTFileToSubmit", userFormNode).length > 0) {
                        // get all the attachments
                        fileList = query(".esriCTFileToSubmit", userFormNode);
                        // reset fileAttached and failed counter
                        this._fileAttachedCounter = 0;
                        this._fileFailedCounter = 0;
                        // set total file attached counter
                        this._totalFileAttachedCounter = fileList.length;
                        for (i = 0; i < fileList.length; i++) {
                            // handle success and error callback for add attachments
                            this.commentTable.addAttachment(results[0].objectId, fileList[i],
                                lang.hitch(this, this._onAttachmentUploadComplete),
                                lang.hitch(this, this._onAttachmentUploadFailed));
                        }
                    } else {
                        this._clearFormFields();
                        this.onCommentFormSubmitted(this.item, true);
                    }
                } else {
                    this.appUtils.hideLoadingIndicator();
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
        },

        /**
        * This function is used to update comments
        * @memberOf widgets/comment-form/comment-form
        */
        _updateComments: function (featureData) {
            //as we are updating feature we need object Id field inside for successful updation
            featureData.attributes[this.selectedLayer.objectIdField] = this.item.attributes[this.selectedLayer.objectIdField];
            // Update the comment to the comment table
            this.commentTable.applyEdits(null, [featureData], null, lang.hitch(this, function (addResult, updateResult, deleteResult) { //ignore jslint
                var fileList, i, userFormNode;
                //for update we only need updateResult parameter
                if (updateResult && updateResult.length > 0 && updateResult[0].success) {
                    userFormNode = dom.byId("addCommentAttachmentsWrapperContainer");
                    // if layer has attachments then add those attachments
                    // get all the attachments
                    fileList = query(".esriCTFileToSubmit", userFormNode);
                    if (this.commentTable.hasAttachments && (fileList.length > 0 || this._deletedAttachmentsArr.length > 0)) {
                        if (fileList.length > 0) {
                            // reset fileAttached and failed counter
                            this._fileAttachedCounter = 0;
                            this._fileFailedCounter = 0;
                            // set total file attached counter
                            this._totalFileAttachedCounter = fileList.length;
                            for (i = 0; i < fileList.length; i++) {
                                // handle success and error callback for add attachments
                                this.commentTable.addAttachment(updateResult[0].objectId, fileList[i],
                                    lang.hitch(this, this._onAttachmentUploadComplete),
                                    lang.hitch(this, this._onAttachmentUploadFailed));
                            }
                        } else {
                            this._deleteAttachments();
                        }
                    } else {
                        this._clearFormFields();
                        this.onCommentFormSubmitted(this.item, true);
                    }
                } else {
                    this.appUtils.hideLoadingIndicator();
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
        },

        /**
        * This function is used to delete the attachments
        * @memberOf widgets/comment-form/comment-form
        */
        _deleteAttachments: function () {
            this.commentTable.deleteAttachments(this.item.attributes[this.commentTable.objectIdField],
                this._deletedAttachmentsArr,
                lang.hitch(this, this._onAttachmentDeleteComplete),
                lang.hitch(this, this._onAttachmentDeleteFailed));
        },

        /**
        * Callback handler for attachment upload Complete event
        * @memberOf widgets/comment-form/comment-form
        */
        _onAttachmentUploadComplete: function () {
            this._fileAttachedCounter++;
            this._updateFileAttachedCounter();
        },

        /**
        * Callback handler for attachment upload failed event
        * @memberOf widgets/comment-form/comment-form
        */
        _onAttachmentUploadFailed: function () {
            this._fileFailedCounter++;
            this._updateFileAttachedCounter();
        },

        /**
        * This function is called when attachments are deleted successfully
        * @memberOf widgets/comment-form/comment-form
        */
        _onAttachmentDeleteComplete: function (response) {
            this._commentOperationComplete();
        },

        /**
        * This function is called when delete attachments operation is failed
        * @memberOf widgets/comment-form/comment-form
        */
        _onAttachmentDeleteFailed: function (err) {
            this._commentOperationComplete();
        },

        /**
        * On attachment upload
        * @memberOf widgets/comment-form/comment-form
        */
        _updateFileAttachedCounter: function () {
            if (this._totalFileAttachedCounter === (this._fileAttachedCounter + this._fileFailedCounter)) {
                if (this._deletedAttachmentsArr.length > 0) {
                    this._deleteAttachments();
                } else {
                    this._commentOperationComplete();
                }
            }
        },

        /**
        * This function is executed when all applicable comment operations like add, update or delete is completed
        * @memberOf widgets/comment-form/comment-form
        */
        _commentOperationComplete: function () {
            var attachmentFailedMsg;
            this._clearAttachments();
            if (this._fileFailedCounter > 0) {
                attachmentFailedMsg = string.substitute(this.config.i18n.geoform.attachmentUploadStatus, {
                    "failed": this._fileFailedCounter,
                    "total": this._totalFileAttachedCounter
                });
                // Show Thank you message on Success
                this._showHeaderMessageDiv(attachmentFailedMsg);
                this.onCommentFormSubmitted(this.item, false);
            } else {
                this.onCommentFormSubmitted(this.item, true);
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
        _showHeaderMessageDiv: function (isAttachmentFailed) {
            if (isAttachmentFailed) {
                var commentDiv = query(".esriCTItemDetailsContainer")[0];
                domClass.replace(this.headerMessageType, "alert-warning", "alert-danger");
                domAttr.set(this.headerMessageContent, "innerHTML", isAttachmentFailed);
                // Scroll commentform to top
                $(commentDiv).animate({
                    scrollTop: this.headerMessageType.offsetTop - 80
                }, 1000);
            }
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
            currentField.defaultValue = null;
            // set default Values to the fields
            if (this.commentTable.templates[0] && !currentField.defaultValue && this.addComments) {
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

            // Set hint text for range domain Value
            this._createRangeText(currentField, formContent, fieldname);
            // If field has coded domain value and typeField set to true then create form elements for domain fields
            // else create form elements for non domain fields
            if (currentField.domain || currentField.typeField) {
                this._createDomainValueFormElements(currentField, formContent, fieldname);
            } else {
                this._createInputFormElements(currentField, formContent, fieldname);
            }
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
                    className: "help-block esriCTHintStyle",
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
            if (!this.addComments) {
                //get field value
                currentField.defaultValue = this.item.attributes[fieldname];
            }
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
            // On selection Change
            this._codedValueOnChange(currentField);
            // check for domain value and create control for drop down list
            if (currentField.domain && !currentField.typeField) {
                array.forEach(currentField.domain.codedValues, lang.hitch(this, function (currentOption) {
                    selectOptions = domConstruct.create("option", {
                        innerHTML: currentOption.name,
                        value: currentOption.code
                    }, this.inputContent);
                    // if field contain default value, make that option selected
                    if (currentField.defaultValue !== undefined && currentField.defaultValue !== null && currentField.defaultValue !== "" && currentField.defaultValue.toString() === currentOption.code.toString()) {
                        // set selected is true
                        domAttr.set(selectOptions, "selected", true);
                        domAttr.set(selectOptions, "defaultSelected", true);
                        domClass.add(this.inputContent.parentNode, "has-success");
                    }
                }));
            } else {
                // default values for subtypes(if any) has to be handled here
                array.forEach(currentField.subTypes, lang.hitch(this, function (currentOption) {
                    selectOptions = domConstruct.create("option", {}, this.inputContent);
                    selectOptions.text = currentOption.name;
                    selectOptions.value = currentOption.id;
                    // if field contain default value, make that option selected
                    if (this.item && this.item.attributes[fieldname] !== undefined && this.item.attributes[fieldname] !== null && this.item.attributes[fieldname] !== "" && this.item.attributes[fieldname].toString() === currentOption.id.toString()) {
                        domAttr.set(this.inputContent, "value", currentOption.id);
                        domClass.add(this.inputContent.parentNode, "has-success");
                    }
                }));
                if (currentField.typeField) {
                    this._validateTypeFields({ 'currentTarget': this.inputContent }, currentField);
                }
            }
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
            var selectedType, defaultValue, referenceNode, currentTarget = evt.currentTarget || evt.srcElement, hasDomainValue, hasDefaultValue;
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
                referenceNode = dom.byId(this.commentTable.typeIdField).parentNode;
                // code to populate type dependent fields
                array.forEach(this.sortedFields, lang.hitch(this, function (currentInput, index) {
                    var field = null, fieldAttribute;
                    hasDomainValue = selectedType.domains[currentInput.name];
                    hasDefaultValue = selectedType.templates[0].prototype.attributes[currentInput.name];
                    if ((hasDomainValue && hasDomainValue.type !== "inherited") || (hasDefaultValue && !currentInput.typeField) || (hasDefaultValue === 0 && !currentInput.typeField)) {
                        currentInput.isTypeDependent = true;
                    }
                    // condition to filter out fields independent of subtypes
                    if (!currentInput.isTypeDependent) {
                        return true;
                    }
                    // mixin array of sorted field and info pop field
                    array.some(this.commentTable.fields, function (layerField) {
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
            var node;
            // remove error and success messages for each form field
            array.forEach(query(".form-control", this.domNode), lang.hitch(this, function (currentInput) {
                node = currentInput.parentElement;
                //Remove error message div
                //This logic is required for resetting commentform when user enters something wrong and clicks on Cancel button
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
            domConstruct.empty(query(".esriCTResultContainer")[0]);
            domClass.add(query(".esriCTResultContainer")[0], "esriCTHidden");
            if (this._fileFailedCounter <= 0) {
                this.clearHeaderMessage();
            }
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
            if (!this.addComments) {
                //get default field value if t is not exist in feature attributes
                currentField.defaultValue = this.item.attributes[this.inputContent.id];
            }
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
                } else {
                    domAttr.set(this.inputContent, "value", currentField.defaultValue);
                    domClass.add(formContent, "has-success");
                }
            } else {
                // else assign current date to the date time picker
                if (currentField.type === "esriFieldTypeDate") {
                    // set current date to date field
                    $(inputDateGroupContainer).data("DateTimePicker").setDate(new Date());
                    // set format to the current date
                    defaultDate = moment(new Date()).format($(inputDateGroupContainer).data("DateTimePicker").format);
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
        * Reset subtype fields
        * @param{object} currentInput, parent node to destroy dependent field
        * @memberOf widgets/comment-form/comment-form
        */
        _resetSubTypeFields: function (currentInput) {
            if (currentInput.type === "esriFieldTypeDate" || ((currentInput.type === "esriFieldTypeSmallFloat" || currentInput.type === "esriFieldTypeSmallInteger" || currentInput.type === "esriFieldTypeDouble" || currentInput.type === "esriFieldTypeInteger") && (currentInput.domain && currentInput.domain.type && currentInput.domain.type === "range"))) {
                if (dom.byId(currentInput.name)) {
                    domConstruct.destroy(dom.byId(currentInput.name).parentNode.parentNode);
                }
            } else {
                if (dom.byId(currentInput.name)) {
                    domConstruct.destroy(dom.byId(currentInput.name).parentNode);
                }
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
            if (currentField.format && currentField.format.dateFormat) {
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
                format: setDateFormat && setDateFormat.dateFormat ? setDateFormat.dateFormat : null,
                pickTime: setDateFormat && setDateFormat.showTime ? setDateFormat.showTime : true,
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