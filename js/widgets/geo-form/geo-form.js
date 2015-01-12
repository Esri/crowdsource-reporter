/*global define,require,alert,dojo,$,window,moment*/
/*jslint browser:true,sloppy:true,nomen:true,unparam:true,plusplus:true,indent:4 */
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
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/on",
    "dojo/dom-attr",
    "dojo/_base/array",
    "dojo/dom",
    "dojo/dom-style",
    "dojo/query",
    "dojo/text!./templates/geo-form.html",
    "dojo/string",
    "dojo/date/locale",
    "esri/layers/GraphicsLayer",
    "esri/graphic",
    "esri/dijit/LocateButton",
    "esri/toolbars/draw",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/geometry/Polygon",
    "esri/arcgis/utils",
    "widgets/locator/locator",
    "widgets/bootstrapmap/bootstrapmap"
], function (declare, lang, _WidgetBase, _TemplatedMixin, domConstruct, domClass, on, domAttr, array, dom, domStyle, query, dijitTemplate, string, locale, GraphicsLayer, Graphic, LocateButton, Draw, SimpleLineSymbol, SimpleFillSymbol, SimpleMarkerSymbol, Polygon, arcgisUtils, Locator, BootstrapMap) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: dijitTemplate,
        lastWebMapSelected: "",
        sortedFields: [],
        toolbar: null,
        rangeHelpText: null,
        layerTitle: null,
        currentLocation: null,
        defaultValueArray: [],
        fileAttachmentList: null,
        _fileInputIcon: null,
        _fileAttachmentCounter: 1,
        _layerHasReportedByField: false,

        /**
        * This function is called when widget is constructed.
        * @param{object} options to be mixed
        * @param{object} source reference node
        * @memberOf widgets/geo-form/geo-form
        */
        constructor: function (options, srcRefNode) {
            lang.mixin(this, options);
        },

        /**
        * This function is called on startup of widget.
        * @memberOf widgets/geo-form/geo-form
        */
        startup: function () {
            try {
                // Show loading indicator
                dojo.applicationUtils.showLoadingIndicator();
                // Clear previous attachments
                this._clearAttachements();
                this.sortedFields = [];
                // Initialize geo form
                this._init();
            } catch (err) {
                // Show error message
                dojo.applicationUtils.showError(err.message);
            }
        },

        /**
        * Create map instance, activate draw tool and initialize locator widget
        * @memberOf widgets/geo-form/geo-form
        */
        _init: function () {
            // Create WebMap using selected webmap id and on loading webmap initiate geoform
            BootstrapMap.createWebMap(this.webMapID, "gf-mapDiv", {
                ignorePopups: true,
                scrollWheelZoom: true,
                editable: true
            }).then(lang.hitch(this, function (response) {
                // Once the map is created we get access to the response which provides map, operational layers, popup info.
                this.map = response.map;
                // store default map extent
                this.defaultExtent = this.map.extent;
                // show only selected layer and remove other layer from Webmap
                this._filterOperationalLayers(response.itemInfo.itemData.operationalLayers);
                // Filters selected layer fields according to Popup info, Data Types and fields not to be shown in GeoForm
                this._filterLayerFields(response);
                // Creates Geoform UI According to Filtered data
                this._createGeoFormUI();
                // Create graphics layer to draw graphics
                this._graphicsLayer = new GraphicsLayer();
                this.map.addLayer(this._graphicsLayer);
                // create geoLocation Button
                this._createGeoLocationButton();
                // Create instance of Draw tool to draw the graphics on graphics layer
                this.toolbar = new Draw(this.map);
                // activate draw tool
                this._activateDrawTool();
                // Handle draw-end event which will be fired on selecting location
                on(this.toolbar, "draw-end", lang.hitch(this, function (evt) {
                    // remove select location error message as location is selected now.
                    this._removeErrorNode(this.select_location.nextSibling);
                    // add drawn graphic on the graphics layer
                    this._addToGraphicsLayer(evt);
                    // resize map
                    this._resizeMap();
                }));
                // Handle click of Submit button
                on(this.submitButton, "click", lang.hitch(this, this._submitForm));
                // Handle click of close button
                on(this.closeButton, "click", lang.hitch(this, this._closeForm));
                // Initialize locator widget
                this.locator = new Locator({ "map": this.map, "itemInfo": response.itemInfo.itemData, "layerId": this.layerId });
                // function call on selection of search result
                this.locator.onLocationCompleted = lang.hitch(this, this._locateSelectedAddress);
                // function call on map resize
                on(window, 'resize', lang.hitch(this, function () {
                    this._resizeMap(true);
                }));
                // As map is in scrollable container if you scroll the container, map's position gets changed and map click will not give you proper screen point.
                // So to fix this, handle container's onscroll event and resize map so that map click will work properly.
                on(dom.byId('geoFormBody'), 'scroll', lang.hitch(this, this._resizeMap));
                //hide geoFormLoader div
                domClass.add(this.geoFormLoader, "esriCTHidden");
            }));
        },

        /**
        * Locate address on map. If the layer is a point layer, a graphic will be added on map else it will zoom to the selected geometry
        * @param{object} geometry of located point on the map
        * @memberOf widgets/geo-form/geo-form
        */
        _locateSelectedAddress: function (geometry) {
            //check if the layer is a point layer
            if (this.layer.geometryType === "esriGeometryPoint") {
                this._addToGraphicsLayer(geometry);
            }
            // zoom to current location
            this._zoomToSelectedFeature(geometry);
        },

        /**
        * Filter operational layers. Display only selected layer on map and remove remaining layers from map
        * @param{array} opLayers, selected layer details for geo form
        * @memberOf widgets/geo-form/geo-form
        */
        _filterOperationalLayers: function (opLayers) {
            var i;
            for (i = 0; i < opLayers.length; i++) {
                // if layerId matches store it in this.layer
                // else remove that layer form map, so that only selected layer is visible on map.
                if (opLayers[i].id === this.layerId) {
                    this.layer = this.map.getLayer(opLayers[i].id);
                } else {
                    this.map.removeLayer(this.map.getLayer(opLayers[i].id));
                }
            }
        },

        /**
        * Create geolocation button on the map
        * @memberOf widgets/geo-form/geo-form
        */
        _createGeoLocationButton: function () {
            var createLocationDiv, basemapExtent;
            // create geo location div
            createLocationDiv = domConstruct.create("div", { "class": "esriCTBGColor esriCTLocationButton" });
            domConstruct.place(createLocationDiv, query(".esriSimpleSliderDecrementButton", dom.byId("gf-mapDiv"))[0], "after");
            // initialize object of locate button
            this.currentLocation = new LocateButton({
                map: this.map,
                highlightLocation: false,
                setScale: false
            }, domConstruct.create('div'));
            this.currentLocation.startup();
            // get basemap extent for the layer
            basemapExtent = this.map.getLayer(this.basemapId).fullExtent;
            // set location on the map
            // handle click event of geolocate button
            on(createLocationDiv, 'click', lang.hitch(this, function (evt) {
                this.currentExtent = this.map.extent;
                // widget locate
                this.currentLocation.locate();
            }));
            // event on locate
            on(this.currentLocation, "locate", lang.hitch(this, function (evt) {
                // if error found on locating point show error message, else check located point match the extent of layer then locate feature else show error massage
                if (evt.error) {
                    dojo.applicationUtils.showError(dojo.configData.i18n.geoform.geoLocationError);
                } else if (basemapExtent.contains(evt.graphic.geometry)) {
                    this._locateSelectedAddress(evt.graphic.geometry);
                } else {
                    // set map extent
                    this.map.setExtent(this.currentExtent);
                    // show error
                    dojo.applicationUtils.showError(dojo.configData.i18n.geoform.geoLocationOutOfExtent);
                }
            }));
        },

        /**
        * Select fields from info popup
        * @param{object} Map response
        * @memberOf widgets/geo-form/geo-form
        */
        _filterLayerFields: function (response) {
            var layerFields = [], excludeDataTypes = [], layerField;
            // DataTypes to be excluded from Geoform
            excludeDataTypes = ["esriFieldTypeOID", "esriFieldTypeBlob", "esriFieldTypeRaster", "esriFieldTypeGUID", "esriFieldTypeGlobalID", "esriFieldTypeXML"];
            if (response.itemInfo.itemData.operationalLayers) {
                array.some(response.itemInfo.itemData.operationalLayers, lang.hitch(this, function (operationalLayer, index) {
                    // if layerId matches create filtered data array
                    if (operationalLayer.id === this.layerId) {
                        //To maintain the order of the fields form popup configuration first get all fields info in layerFields array
                        //then iterate through popupInfo and create fields to be shown in geoform.

                        // Create layerFields Key value pair according to fieldName
                        array.forEach(this.layer.fields, lang.hitch(this, function (layerField) {
                            layerFields[layerField.name] = layerField;
                        }));
                        // Iterate through all the fields in popup info,Merge field info from layer details and popup details and create sortedFields array.
                        array.forEach(response.itemInfo.itemData.operationalLayers[index].popupInfo.fieldInfos, lang.hitch(this, function (popupField) {
                            // If 'ReportedBy' field is present in the layer, set _layerHasReportedByField flag
                            if (popupField.fieldName === this.config.reportedByField) {
                                this._layerHasReportedByField = true;
                            }
                            layerField = layerFields[popupField.fieldName];
                            // check if layer is editable
                            if (popupField.isEditable && $.inArray(layerField.type, excludeDataTypes) === -1) {
                                layerField.alias = popupField.label;
                                layerField.editable = popupField.isEditable;
                                layerField.tooltip = popupField.tooltip;
                                layerField.stringFieldOption = popupField.stringFieldOption;
                                // if field has format
                                if (popupField.format) {
                                    layerField.format = popupField.format;
                                }
                                // if layer has type field set subTypes else set typeField as false
                                if (layerField.name === this.layer.typeIdField) {
                                    layerField.subTypes = this.layer.types;
                                    layerField.typeField = true;
                                } else {
                                    layerField.typeField = false;
                                }
                                this.sortedFields.push(layerField);
                            }
                        }));
                        return true;
                    }
                }));
            }
        },

        /**
        * Create UI for GeoForm
        * @memberOf widgets/geo-form/geo-form
        */
        _createGeoFormUI: function () {
            domConstruct.empty(this.layerTitleDiv);
            // Set innerHTML for geo form header sections
            domAttr.set(this.layerTitleDiv, "innerHTML", this.layerTitle);
            domAttr.set(this.enter_Information, "innerHTML", dojo.configData.i18n.geoform.enterInformation);
            domAttr.set(this.select_location, "innerHTML", dojo.configData.i18n.geoform.enterLocation);
            domConstruct.create("small", { "class": "esriCTRequireFieldStyle esriCTselectLocationText", "innerHTML": dojo.configData.i18n.geoform.selectLocationTitleText }, this.select_location);
            domAttr.set(this.complete_Form, "innerHTML", dojo.configData.i18n.geoform.completeForm);
            domAttr.set(this.submitButton, "innerHTML", dojo.configData.i18n.geoform.reportItButton);
            // If sorted field array length is zero
            if (this.sortedFields.length === 0) {
                this._showErrorMessageDiv(dojo.configData.i18n.geoform.noLayerConfiguredMessage, this.headerMessageDiv);
            }
            // Sort fields array by type
            this._sortedTypeFormElement();
            // Create attachments container, if layer supports attachments
            this._createAttachments();
        },

        /**
        * Sort form elements by type
        * @memberOf widgets/geo-form/geo-form
        */
        _sortedTypeFormElement: function () {
            var hasDomainValue, hasDefaultValue;
            array.forEach(this.sortedFields, lang.hitch(this, function (currentField, index) {
                // Set true/false value to property 'isTypeDependent' of the field.
                currentField.isTypeDependent = false;
                array.forEach(this.layer.types, function (currentType) {
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
        * Destroy geo-form instance
        * @memberOf widgets/geo-form/geo-form
        */
        destroyInstance: function () {
            // check if map object is present, destroy map object and assign null value
            if (this.map) {
                this.map.destroy();
                this.map = null;
            }
            this.destroy();
        },

        /**
        * Clear previous attachment count and hide the message
        * @memberOf widgets/geo-form/geo-form
        */
        _clearAttachements: function () {
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
        * Create attachments container
        * @memberOf widgets/geo-form/geo-form
        */
        _createAttachments: function () {
            var fileInput, formContent, userFormNode, fileChange, fileAttachmentContainer, fileContainer;
            // If layer has hasAttachments true
            if (this.layer.hasAttachments) {
                userFormNode = this.userForm;
                // Create container for hasAttachment
                formContent = domConstruct.create("div", {
                    "class": "form-group hasAttachment geoFormQuestionare esriCTGeoFormAttachmentLabel"
                }, userFormNode);
                // Select attachment label
                domConstruct.create("label", {
                    "innerHTML": dojo.configData.i18n.geoform.selectAttachments,
                    "id": "geoFormAttachmentTitileLabel"
                }, formContent);
                domConstruct.create("br", {}, formContent);
                // Create div for Attachment button
                fileContainer = domConstruct.create("div", { "class": "esriCTFileButtonContainer" }, formContent);
                this._fileInputIcon = domConstruct.create("button", {
                    "type": "button",
                    "innerHTML": dojo.configData.i18n.geoform.selectFileText,
                    "class": "fileInputButton btn  btn-primary esriCTBGColor esriCTPointerCursor esriCTGeoFormButton"
                }, fileContainer);
                // Show photo selected count
                domConstruct.create("div", {
                    "id": "attachmentSelectedCount",
                    "class": "esriCTHidden esriCTAttachmentSelectedCount"
                }, formContent);
                fileAttachmentContainer = domConstruct.create("div", {
                    "class": "container esriCTAttachmentContainer"
                }, formContent);
                this.fileAttachmentList = domConstruct.create("div", {
                    "class": "row esriCTFileAttachMentList"
                }, fileAttachmentContainer);
                // Create input container for attachments
                fileInput = domConstruct.create("input", {
                    "type": "file",
                    "id": "geoFormAttachment" + this._fileAttachmentCounter++,
                    "accept": "image/*",
                    "name": "attachment",
                    "class": "esriCTHideFileInputUI",
                    "style": { "height": dojo.coords(this._fileInputIcon).h + "px", "width": dojo.coords(this._fileInputIcon).w + "px" }
                }, fileContainer);
                // Handle change event for file control
                fileChange = on(fileInput, "change", lang.hitch(this, function (evt) {
                    fileChange.remove();
                    this._onFileSelected(evt);
                }));
            }
        },

        /**
        * Show selected file on geoform and create new fileControl so that multiple files can be selected.
        * @param{object} evt - Event object which will be generated on file input change event.
        * @memberOf widgets/geo-form/geo-form
        */
        _onFileSelected: function (evt) {
            var fileInput, fileName, fileChange, alertHtml;
            if (evt.currentTarget && evt.currentTarget.value) {
                fileName = evt.currentTarget.value;
                fileName = fileName.split("\\")[fileName.split("\\").length - 1];
            } else {
                fileName = "";
            }
            //once file is selected change class so that the selected file will be added as attachment
            domClass.replace(evt.currentTarget, "esriCTFileToSubmit", "esriCTHideFileInputUI");
            domStyle.set(evt.currentTarget, "display", "none");

            //Add dismiss-able alert for each file, and show file name and file size in it.

            alertHtml = "<div id=" + evt.currentTarget.id + "_Close" + " class=\"esriCTFileAlert alert alert-dismissable alert-success\">";
            alertHtml += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\">" + "X" + "</button>";
            alertHtml += "<span>" + fileName + "</span>";
            alertHtml += "</div>";
            alertHtml = domConstruct.place(alertHtml, this.fileAttachmentList, "last");
            //if file is removed then
            //replace the class from esriCTFileToSubmit to esriCTHideFileInputUI and update the file selected count
            $('#' + evt.currentTarget.id + "_Close").bind('closed.bs.alert', lang.hitch(this, function (evt) {
                domClass.replace(dom.byId(evt.target.id.split("_")[0]), "esriCTHideFileInputUI", "esriCTFileToSubmit");
                this._updateAttachmentCount();
            }));

            //once filename is shown, update file attachments count
            this._updateAttachmentCount();

            //create new file input control so that multiple files can be attached
            fileInput = domConstruct.create("input", {
                "type": "file",
                "id": "geoFormAttachment" + this._fileAttachmentCounter++,
                "accept": "image/*",
                "name": "attachment",
                "class": "esriCTHideFileInputUI",
                "style": { "height": dojo.coords(this._fileInputIcon).h + "px", "width": dojo.coords(this._fileInputIcon).w + "px" }
            }, null);
            //update for attribute for file-input icon so that same icon can be used to select file for new file-input control.
            domAttr.set(this._fileInputIcon, "for", fileInput.id);
            //place the newly created file-input control after file selection icon
            domConstruct.place(fileInput, this._fileInputIcon, "after");
            //handle change event for file control if file size is
            fileChange = on(fileInput, "change", lang.hitch(this, function (evt) {
                fileChange.remove();
                this._onFileSelected(evt);
            }));
        },

        /**
        * This function will update attachment countand based on count will show/hide message in GeoForm.
        * @memberOf widgets/geo-form/geo-form
        */
        _updateAttachmentCount: function () {
            var photoSelectedDiv = dom.byId("attachmentSelectedCount"), selectedAttachmentsCount;
            if (photoSelectedDiv) {
                domClass.remove(photoSelectedDiv, "esriCTHidden");
                selectedAttachmentsCount = query(".alert-dismissable", this.fileAttachmentList).length;
                domAttr.set(photoSelectedDiv, "innerHTML", selectedAttachmentsCount + " " + dojo.configData.i18n.geoform.attachmentSelectedMsg);
                if (selectedAttachmentsCount > 0) {
                    domClass.remove(photoSelectedDiv, "esriCTHidden");
                } else {
                    domClass.add(photoSelectedDiv, "esriCTHidden");
                }
            }
        },

        /**
        * Create form elements
        * @param{object} currentField, object of current field in the info pop
        * @param{int} index, index of current field in the array
        * @param{object} referenceNode, Parent Node for dependent field
        * @memberOf widgets/geo-form/geo-form
        */
        _createFormElement: function (currentField, index, referenceNode) {
            var fieldname, labelContent, fieldAttribute, fieldLabelText, formContent, requireField, userFormNode;
            userFormNode = this.userForm;
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
            // If fields are not nullable set to mandatory fields
            if (!currentField.nullable || currentField.typeField) {
                domClass.add(formContent, "form-group geoFormQuestionare mandatory");
                requireField = domConstruct.create("small", {
                    className: 'esriCTRequireFieldStyle',
                    innerHTML: dojo.configData.i18n.geoform.requiredField
                }, formContent);
            } else {
                domClass.add(formContent, "form-group geoFormQuestionare");
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
            if (this.layer.templates[0] && !currentField.defaultValue) {
                for (fieldAttribute in this.layer.templates[0].prototype.attributes) {
                    if (this.layer.templates[0].prototype.attributes.hasOwnProperty(fieldAttribute)) {
                        if (fieldAttribute.toLowerCase() === fieldname.toLowerCase()) {
                            currentField.defaultValue = this.layer.templates[0].prototype.attributes[fieldAttribute];
                        }
                    }
                }
            }
            // If field has coded domain value and typeField set to true then create form elements for domain fields
            // else create form elements for non domain fields
            if (currentField.domain || currentField.typeField) {
                this._createDomainValueFormElements(currentField, formContent, fieldname);
            } else {
                this._createInputFormElements(currentField, formContent, fieldname, fieldLabelText);
            }
            // Set hint text for range domain Value
            this._createRangeText(currentField, formContent, fieldname);
            //hide Loading Indicator
            dojo.applicationUtils.hideLoadingIndicator();
            // Resize Map
            this._resizeMap();
        },

        /**
        * Create range help text for elements.
        * @param{object} currentField, object of current field in the info pop
        * @param{object} formContent, Parent Node of the field inside geo form
        * @param{string} fieldname, name of the field
        * @memberOf widgets/geo-form/geo-form
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
        * @memberOf widgets/geo-form/geo-form
        */
        _createDomainValueFormElements: function (currentField, formContent, fieldname) {
            var date, inputRangeDateGroupContainer, rangeDefaultDate;
            if ((currentField.domain && (currentField.domain.type === 'undefined' || currentField.domain.type === 'codedValue')) || currentField.typeField) {
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
                        this.defaultValueArray.push({ defaultValue: rangeDefaultDate, id: this.inputContent.id });
                    }
                    // Assign value to the range help text
                    this.rangeHelpText = string.substitute(dojo.configData.i18n.geoform.dateRangeHintMessage, {
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
        * @memberOf widgets/geo-form/geo-form
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
                innerHTML: dojo.configData.i18n.geoform.selectDefaultText,
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
        * @memberOf widgets/geo-form/geo-form
        */
        _codedValueOnChange: function (currentField) {
            // event on change
            on(this.inputContent, "change", lang.hitch(this, function (evt) {
                // function call to take appropriate actions on selection of a subtype
                if (currentField.typeField) {
                    this._validateTypeFields(evt.currentTarget, currentField);
                }
                // To apply has-success class on selection of a valid option
                // else remove has-success class
                if (evt.target.value !== "") {
                    if (query(".errorMessage", evt.currentTarget.parentNode).length !== 0) {
                        domConstruct.destroy(query(".errorMessage", evt.currentTarget.parentNode)[0]);
                        domClass.remove(evt.target.parentNode, "has-error");
                    }
                    domClass.add($(evt.target.parentNode)[0], "has-success");
                } else {
                    domClass.remove($(evt.target.parentNode)[0], "has-success");
                }
            }));
        },

        /**
        * Create input elements of form.
        * @param{object} currentField, object of current field in the info pop
        * @param{object} formContent, Parent Node of the field inside geo form
        * @param{string} fieldname, name of the field
        * @param{string} fieldLabelText, Field's Label text
        * @memberOf widgets/geo-form/geo-form
        */
        _createInputFormElements: function (currentField, formContent, fieldname, fieldLabelText) {
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
        * Add default values to the fields
        * @param{object} currentField, object of current field in the info pop
        * @param{object} formContent, Parent Node of the field inside geo form
        * @param{object} inputDateGroupContainer, container for the date time picker
        * @memberOf widgets/geo-form/geo-form
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
                    this.defaultValueArray.push({ defaultValue: defaultDate, id: this.inputContent.id });
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
                    this.defaultValueArray.push({ defaultValue: defaultDate, id: this.inputContent.id });
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
        * Validate date range field
        * @param{object} currentField, object of current field in the info pop
        * @param{object} formContent, Parent Node of the field inside geo form
        * @param{string} fieldname, name of the field
        * @memberOf widgets/geo-form/geo-form
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
                this.defaultValueArray.push({ defaultValue: setDefault, id: this.inputContent.id });
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
            rangeHelpText = string.substitute(dojo.configData.i18n.geoform.textRangeHintMessage, {
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
        * @memberOf widgets/geo-form/geo-form
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
                domClass.add(evt.currentTarget.parentNode.parentNode, "has-success");
            }));
            // if not nullable field
            if (!currentField.nullable) {
                this.inputContent.setAttribute("aria-required", true);
                this.inputContent.setAttribute("required", "");
            }
        },

        /**
        * Validate fields defined within subtypes
        * @param{object} currentTarget, on change event current target field
        * @param{object} currentField, object of current field in the info pop
        * @memberOf widgets/geo-form/geo-form
        */
        _validateTypeFields: function (currentTarget, currentField) {
            var selectedType, defaultValue, referenceNode;
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
                    //resize map
                    this._resizeMap();
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
                                    defaultValue = selectedType.templates[0].prototype.attributes[fieldAttribute];
                                    field.defaultValue = defaultValue;
                                    break;
                                }
                            }
                        }
                    }
                    // validate dependent values
                    this._validateTypeFieldsValue(selectedType, field, referenceNode, index);
                }));
                // resize map
                this._resizeMap();
            }
        },

        /**
        * Populate domain properties for current field in form elements
        * @param{string} selectedType, current selected type
        * @param{array} field, an array of field details
        * @param{object} referenceNode, parent node for dependent field
        * @param{int} index , field index
        * @memberOf widgets/geo-form/geo-form
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
        * Validate form field
        * @param{object} currentNode, apply validation on current node
        * @param{object} currentField, object of current field in the info pop
        * @param{Boolean} iskeyPress, set Boolean value true or false
        * @memberOf widgets/geo-form/geo-form
        */
        _validateField: function (currentNode, currentField, iskeyPress) {
            var inputType, inputValue,
                node, typeCastedInputValue, decimal = /^[-+]?[0-9]+$/,
                float = /^[-+]?[0-9]+\.[0-9]+$/,
                error;
            // trim current value
            inputValue = lang.trim(currentNode.currentTarget.value);
            // get value of data-input-type
            inputType = domAttr.get(currentNode.currentTarget, "data-input-type");
            // check for the target node and assign the parent node value
            if ($(currentNode.target)) {
                node = $(currentNode.target.parentNode)[0];
            } else {
                node = $(currentNode.srcElement.parentNode)[0];
            }
            // Set validation on the field by their types
            switch (inputType) {
            case "String":
                if (inputValue.length !== 0) {
                    this._validateUserInput(false, node, inputValue, iskeyPress);
                } else {
                    error = string.substitute(dojo.configData.i18n.geoform.invalidString, {
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
                    error = string.substitute(dojo.configData.i18n.geoform.invalidSmallNumber, {
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
                    error = string.substitute(dojo.configData.i18n.geoform.invalidNumber, {
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
                if (((inputValue.match(decimal) || inputValue.match(float)) && typeCastedInputValue >= -3.4 * Math.pow(10, 38) && typeCastedInputValue <= 1.2 * Math.pow(10, 38)) && inputValue.length !== 0) {
                    this._validateUserInput(false, node, inputValue, iskeyPress);
                    this._setFormatToValue(currentField, typeCastedInputValue, currentNode.target);
                } else {
                    error = string.substitute(dojo.configData.i18n.geoform.invalidFloat, {
                        openStrong: "<strong>",
                        closeStrong: "</strong>"
                    });
                    this._validateUserInput(error, node, inputValue, iskeyPress);
                }
                break;
            case "Double":
                typeCastedInputValue = parseFloat(inputValue);
                if (((inputValue.match(decimal) || inputValue.match(float)) && typeCastedInputValue >= -2.2 * Math.pow(10, 308) && typeCastedInputValue <= 1.8 * Math.pow(10, 38)) && inputValue.length !== 0) {
                    this._validateUserInput(false, node, inputValue, iskeyPress);
                    this._setFormatToValue(currentField, typeCastedInputValue, currentNode.target);
                } else {
                    error = string.substitute(dojo.configData.i18n.geoform.invalidDouble, {
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
        * Clear form fields, reset the form and assign default value if it exists
        * @memberOf widgets/geo-form/geo-form
        */
        _clearFormFields: function () {
            var attachNode, node, index, currentFileInputID, fileChange;
            // remove error and success messages for each form field
            array.forEach(query(".form-control"), function (currentInput) {
                node = currentInput.parentElement;
                // Clear form fields
                if (!domClass.contains(currentInput, "selectDomain")) {
                    domAttr.set(currentInput, "value", "");
                    domClass.remove(node, "has-error");
                    domClass.remove(node, "has-success");
                } else {
                    currentInput.options[0].selected = true;
                    domClass.remove(node, "has-success");
                }
            });
            // clear error and success messages
            array.forEach(query(".geoFormQuestionare .input-group"), function (currentInput) {
                domClass.remove(currentInput.parentElement, "has-error");
                domClass.remove(currentInput.parentElement, "has-success");
            });
            // clear attachments
            currentFileInputID = this._fileAttachmentCounter - 1;
            currentFileInputID = "geoFormAttachment" + currentFileInputID;
            attachNode = dom.byId(currentFileInputID);
            if (attachNode && attachNode.value) {
                // We are adding attachNode.value= "" again to clear the attachment text in Firefox
                domAttr.set(attachNode, "value", "");
                // Below line works in all the browsers except Firefox
                // Since attachNode.value= "" was not working in IE8, we added this code to clear the attachment text
                $(dom.byId(currentFileInputID)).replaceWith($(dom.byId(currentFileInputID)).clone(true));
                // again attach the change event as the node is cloned, so previous callback was not getting executed.
                fileChange = on(dom.byId(currentFileInputID), "change", lang.hitch(this, function (evt) {
                    fileChange.remove();
                    this._onFileSelected(evt);
                }));
            }
            // clear attachments
            this._clearAttachements();
            // Reset Form
            this.userForm.reset();
            // Set default Values and success to the controls
            array.forEach(query(".form-control"), lang.hitch(this, function (currentInput) {
                for (index = 0; index < this.defaultValueArray.length; index++) {
                    if (this.defaultValueArray[index].id === currentInput.id) {
                        if (!domClass.contains(currentInput, "selectDomain")) {
                            domAttr.set(currentInput, "value", this.defaultValueArray[index].defaultValue);
                        }
                        domClass.add(currentInput.parentElement, "has-success");
                    }
                }
            }));
            domConstruct.empty(query(".esriCTResultContainer")[0]);
            domClass.add(query(".esriCTResultContainer")[0], "esriCTHidden");
        },

        /**
        * Add calendar notation icon
        * @param{object} formContent, Parent Node to attached field
        * @param{string} imageIconClass,default class of image icon calendar
        * @memberOf widgets/geo-form/geo-form
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
        * Reset subtype fields
        * @param{object} currentInput, parent node to destroy dependent field
        * @memberOf widgets/geo-form/geo-form
        */
        _resetSubTypeFields: function (currentInput) {
            if (currentInput.type === "esriFieldTypeDate" || ((currentInput.type === "esriFieldTypeSmallFloat" || currentInput.type === "esriFieldTypeSmallInteger" || currentInput.type === "esriFieldTypeDouble" || currentInput.type === "esriFieldTypeInteger") && (currentInput.domain && currentInput.domain.type && currentInput.domain.type === "range"))) {
                domConstruct.destroy(dom.byId(currentInput.name).parentNode.parentNode);
            } else {
                domConstruct.destroy(dom.byId(currentInput.name).parentNode);
            }
        },

        /**
        * Create datetime picker
        * @param{object} parentNode, parent node to attached date time picker
        * @param{Boolean} isRangeField, set flag true or false depends on range
        * @param{string} fieldname, name of the field
        * @param{object} currentField, object of Current Field Details
        * @memberOf widgets/geo-form/geo-form
        */
        _createDateField: function (parentNode, isRangeField, fieldname, currentField) {
            var dateInputField, picker, selectedDate, setDateFormat;
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
                setDateFormat = dojo.applicationUtils.getDateFormat(currentField.format.dateFormat);
            }
            // on focus
            on(dateInputField, "focus", function () {
                $(this.parentElement).data("DateTimePicker").show();
            });
            // on blur
            on(dateInputField, "blur", function () {
                $(this.parentElement).data("DateTimePicker").hide();
            });
            // Attach datetime picker to the container
            $(parentNode).datetimepicker({
                useSeconds: false,
                useStrict: false,
                format: setDateFormat
            }).on('dp.show', function () {
                // on Datetime picker show event
                picker = $(this).data('DateTimePicker');
                selectedDate = picker.getDate();
                if (selectedDate === null) {
                    query("input", this)[0].value = "";
                }
                domClass.add(parentNode, "has-success");
                if (query("input", this)[0].value === "") {
                    domClass.remove(parentNode, "has-success");
                    domClass.remove(parentNode, "has-error");
                }
            }).on('dp.error', function (evt) {
                // on error
                evt.target.value = '';
                domClass.remove(parentNode, "has-success");
                domClass.add(parentNode, "has-error");
            }).on("dp.hide", function (evt) {
                // on Datetime picker hide event
                if (query("input", this)[0].value === "") {
                    domClass.remove(parentNode, "has-success");
                    domClass.remove(parentNode, "has-error");
                }
            }).on('dp.change', function (evt) {
                // on change
                domClass.add(parentNode, "has-success");
                domClass.remove(parentNode, "has-error");
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
        * Validate form input
        * @param{string} error, error found in the node
        * @param{object} node, parent node to add and remove classes based on validation
        * @param{string} inputValue , input value
        * @param{string} iskeyPress, check for flag
        * @memberOf widgets/geo-form/geo-form
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
        * Resize map
        * @memberOf widgets/geo-form/geo-form
        */
        _resizeMap: function () {
            // If geoform is visible
            if (this.map && !domClass.contains(dom.byId('geoformContainerDiv'), "esriCTHidden")) {
                // re position the map
                this.map.reposition();
                // re size the map
                this.map.resize();
            }
        },

        /**
        * Clear graphics
        * @memberOf widgets/geo-form/geo-form
        */
        _clearSubmissionGraphic: function () {
            // set geometry to the null
            this.addressGeometry = null;
            //clear graphics
            this._graphicsLayer.clear();
        },

        /**
        * Executed on submitting a form
        * @memberOf widgets/geo-form/geo-form
        */
        _submitForm: function () {
            var erroneousFields = [], errorMessage;
            // for all the fields in geo form
            array.forEach(query(".geoFormQuestionare"), lang.hitch(this, function (currentField) {
                // to check for errors in form before submitting.
                if ((query(".form-control", currentField)[0])) {
                    // condition to check if the entered values are erroneous.
                    if (domClass.contains(currentField, "has-error") && query("select", currentField).length === 0) {
                        erroneousFields.push(currentField);
                    }
                    // condition to check if mandatory fields are kept empty.
                    if ((query(".form-control", currentField)[0].value === "" && domClass.contains(currentField, "mandatory"))) {
                        this._validateUserInput(dojo.configData.i18n.geoform.requiredFields, currentField, query(".form-control", currentField)[0].value, true);
                        erroneousFields.push(currentField);
                    } else if (domClass.contains(currentField, "mandatory")) {
                        this._validateUserInput(false, currentField, query(".form-control", currentField)[0].value, true);
                    }
                }
            }));
            // this statement will remove the error message div at first and then will be applied if a valid location is not selected
            this._removeErrorNode(this.select_location.nextSibling);
            // If any error found
            if (erroneousFields.length !== 0) {
                // Scroll to the erroneous field node
                $('#geoFormBody').animate({
                    scrollTop: erroneousFields[0].offsetTop
                }, 1000);
                if (!this.addressGeometry) {
                    // error message
                    errorMessage = dojo.configData.i18n.geoform.selectLocation;
                    this._showErrorMessageDiv(errorMessage, this.select_location);
                }
            } else {
                // If geometry is selected on the map
                if (this.addressGeometry) {
                    // Add feature to the layer
                    this._addFeatureToLayer();
                } else {
                    // error message
                    errorMessage = dojo.configData.i18n.geoform.selectLocation;
                    this._showErrorMessageDiv(errorMessage, this.select_location);
                    // Scroll to the selected location
                    $('#geoFormBody').animate({
                        scrollTop: this.select_location.offsetTop
                    }, 1000);
                }
            }
        },

        /**
        * Add feature to layer
        * @memberOf widgets/geo-form/geo-form
        */
        _addFeatureToLayer: function () {
            var userFormNode = this.userForm, featureData, key, value, datePicker, picker, fileList, formElement, i;
            // show loading indicator
            dojo.applicationUtils.showLoadingIndicator();
            // Create instance of graphic
            featureData = new Graphic();
            // create an empty array object
            featureData.attributes = {};
            // for all the fields
            array.forEach(query(".geoFormQuestionare .form-control"), function (currentField) {
                if (currentField.value !== "") {
                    // get id of the field
                    key = domAttr.get(currentField, "id");
                    // check for datetime picker and assign value
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
                }
            });
            // If layer has ReportedBy Field then Add logged in username in it
            if (this._layerHasReportedByField) {
                featureData.attributes[this.config.reportedByField] = this.config.logInDetails.userName;
            }
            featureData.geometry = {};
            // Assign feature geometry
            featureData.geometry = this.addressGeometry;
            // Add feature to the layer
            this.layer.applyEdits([featureData], null, null, lang.hitch(this, function (addResults) {
                // Add attachment on success
                if (addResults[0].success) {
                    //if layer has attachments then add those attachments
                    if (this.layer.hasAttachments && query(".esriCTFileToSubmit", userFormNode).length > 0) {
                        //get all the attachments and append it in form element
                        fileList = query(".esriCTFileToSubmit", userFormNode);
                        //reset fileAttached counter to length of files
                        this._fileAttachedCounter = fileList.length;
                        for (i = 0; i < fileList.length; i++) {
                            formElement = domConstruct.create("form", {}, null);
                            formElement.appendChild(fileList[i]);
                            //handle success and error callback for add attachments
                            this.layer.addAttachment(addResults[0].objectId, formElement, lang.hitch(this, this._onAttachmentUploadComplete), lang.hitch(this, this._onAttachmentUploadFailed));
                        }
                    } else {
                        //hide loading indicator started in _addFeatureToLayer method
                        dojo.applicationUtils.hideLoadingIndicator();
                    }
                    // remove graphic
                    this._clearSubmissionGraphic();
                    // reset form
                    this._clearFormFields();
                    //reset to default extent
                    if (this.defaultExtent) {
                        this.map.setExtent(this.defaultExtent);
                    }
                    // Show Thank you message on Success
                    this._showHeaderMessageDiv(this.config.submitMessage, false);
                    // Successfully feature is added on the layer
                    this.geoformSubmitted(true);
                } else {
                    domConstruct.destroy(query(".errorMessage")[0]);
                    // Show Error message on Failure
                    this._showHeaderMessageDiv(dojo.configData.i18n.geoform.errorsInApplyEdits, true);
                    //hide loading indicator started in _addFeatureToLayer method
                    dojo.applicationUtils.hideLoadingIndicator();
                }
            }), lang.hitch(this, function () {
                // remove error
                domConstruct.destroy(query(".errorMessage")[0]);
                // Show error message on Failure
                this._showHeaderMessageDiv(dojo.configData.i18n.geoform.errorsInApplyEdits, true);
                //hide loading indicator started in _addFeatureToLayer method
                dojo.applicationUtils.hideLoadingIndicator();
            }));
        },

        /**
        * Callback hander for attachment upload Complete event
        * @memberOf widgets/geo-form/geo-form
        */
        _onAttachmentUploadComplte: function () {
            this._updateFileAttachedCounter();
        },

        /**
        * Callback hander for attachment upload failed event
        * @memberOf widgets/geo-form/geo-form
        */
        _onAttachmentUploadFailed: function () {
            this._updateFileAttachedCounter();
        },

        /**
        * On attachment upload
        * @memberOf widgets/geo-form/geo-form
        */
        _updateFileAttachedCounter: function () {
            this._fileAttachedCounter--;
            if (this._fileAttachedCounter === 0) {
                //hide loading indicator started in _addFeatureToLayer method
                dojo.applicationUtils.hideLoadingIndicator();
            }
        },

        /**
        * Create error message container
        * @param{string} errorMessage, error massage which need to show on error
        * @param{object} errorMessageNode, node to bind error massage
        * @memberOf widgets/geo-form/geo-form
        */
        _showErrorMessageDiv: function (errorMessage, errorMessageNode) {
            var errorNode, place = "after";
            if (errorMessageNode) {
                //this statement will remove the error message div at first and then will be applied if a valid location is not selected
                this._removeErrorNode(errorMessageNode.nextSibling);
            }
            // create error handler container
            errorNode = domConstruct.create("div", {
                className: "alert alert-danger errorMessage",
                id: "errorMessage",
                innerHTML: errorMessage
            }, null);
            domConstruct.place(errorNode, errorMessageNode, place);
            // if success message is visible hide it
            if (domClass.contains(this.headerMessageDiv, "esriCTVisible")) {
                domClass.replace(this.headerMessageDiv, "esriCTHidden", "esriCTVisible");
            }
            // resize map
            this._resizeMap();
            // hide Loading Indicator
            dojo.applicationUtils.hideLoadingIndicator();
        },

        /**
        * Remove the error message container.
        * @param{object} node, node to bind error massage
        * @memberOf widgets/geo-form/geo-form
        */
        _removeErrorNode: function (node) {
            if (domClass.contains(node, "errorMessage")) {
                // destroy parent node
                domConstruct.destroy(node);
            }
        },

        /**
        * Display message on header of form
        * @param{string} innerText, massage which needs to show
        * @param{string} isError, set flag for error
        * @memberOf widgets/geo-form/geo-form
        */
        _showHeaderMessageDiv: function (innerText, isError) {
            // assign success or error handler class to the container
            if (isError) {
                domClass.replace(this.headerMessageType, "alert-danger", "alert-success");
            } else {
                domClass.replace(this.headerMessageType, "alert-success", "alert-danger");
            }
            // replace node
            domClass.replace(this.headerMessageDiv, "esriCTVisible", "esriCTHidden");
            // set innerHTML
            domAttr.set(this.headerMessageContent, "innerHTML", innerText);
            // handle close button click of message
            on(this.headerMessageButton, "click", lang.hitch(this, function () {
                if (domClass.contains(this.headerMessageDiv, "esriCTVisible")) {
                    domClass.replace(this.headerMessageDiv, "esriCTHidden", "esriCTVisible");
                }
            }));
            // Scroll geoform to top
            $('#geoFormBody').animate({
                scrollTop: 0
            }, 1000);
            // resize map
            this._resizeMap();
        },

        /**
        * This function is used to close form
        * @memberOf widgets/geo-form/geo-form
        */
        _closeForm: function () {
            domClass.replace(dom.byId('geoformContainerDiv'), "esriCTHidden", "esriCTVisible");
        },

        /**
        * Active draw tool
        * @memberOf widgets/geo-form/geo-form
        */
        _activateDrawTool: function () {
            var tool, type;
            // Select layer type
            type = this._selectLayerType();
            tool = type.toUpperCase();
            // active draw tool
            this.toolbar.activate(Draw[tool]);
        },

        /**
        * Get geometry type of the selected layer
        * @memberOf widgets/geo-form/geo-form
        */
        _selectLayerType: function () {
            var type;
            //set type for selected geometry type of the layer
            switch (this.layer.geometryType) {
            case "esriGeometryPoint":
                type = "point";
                break;
            case "esriGeometryPolyline":
                type = "polyline";
                break;
            case "esriGeometryPolygon":
                type = "polygon";
                break;
            }
            // return Value
            return type;
        },

        /**
        * Add graphic on the map
        * @param{object} evt, draw tool bar event
        * @memberOf widgets/geo-form/geo-form
        */
        _addToGraphicsLayer: function (evt) {
            var symbol, graphic, graphicGeometry;
            // clear graphics on the map
            this._clearSubmissionGraphic();
            // get geometry
            if (evt.geometry) {
                graphicGeometry = evt.geometry.type === "extent" ? this._createPolygonFromExtent(evt.geometry) : evt.geometry;
            } else {
                graphicGeometry = evt;
            }
            // assign geometry to the variable
            this.addressGeometry = graphicGeometry;
            symbol = this._createFeatureSymbol(graphicGeometry.type);
            // create new graphic
            graphic = new Graphic(graphicGeometry, symbol);
            // add graphics
            this._graphicsLayer.add(graphic);
        },

        /**
        * Zoom to the selected feature
        * @param{object} geometry, geometry of the graphics plotted on the map
        * @memberOf widgets/geo-form/geo-form
        */
        _zoomToSelectedFeature: function (geometry) {
            var centerPoint;
            // check for geometry type of different layer
            if (geometry.type === "point") {
                this.map.centerAt(geometry);
                this.map.setLevel(dojo.configData.zoomLevel);
            } else if (geometry.type === "polyline") {
                this.map.setLevel(dojo.configData.zoomLevel);
                centerPoint = geometry.getExtent();
                this.map.setExtent(centerPoint);
                // if geometry is of type polygon, add border to the polygon
            } else if (geometry.type === "polygon") {
                this.map.setLevel(dojo.configData.zoomLevel);
                centerPoint = geometry.getExtent();
                this.map.setExtent(centerPoint);
            }
        },
        /**
        * Convert extent type of geometry to polygon geometry
        * @param{object} geometry, geometry of the graphics plotted on the map
        * @memberOf widgets/geo-form/geo-form
        */
        _createPolygonFromExtent: function (geometry) {
            var polygon = new Polygon(geometry.spatialReference);
            // set geometry ring to the polygon layer
            polygon.addRing([
                [geometry.xmin, geometry.ymin],
                [geometry.xmin, geometry.ymax],
                [geometry.xmax, geometry.ymax],
                [geometry.xmax, geometry.ymin],
                [geometry.xmin, geometry.ymin]
            ]);
            // return polygon geometry
            return polygon;
        },

        /**
        * Create symbol for draw tool geometries in draw tab
        * @param{string} geometryType, type of geometry
        * @memberOf widgets/geo-form/geo-form
        */
        _createFeatureSymbol: function (geometryType) {
            var symbol;
            //set symbol for selected geometry type of the layer
            switch (geometryType) {
            case "point":
                symbol = new SimpleMarkerSymbol();
                break;
            case "polyline":
                symbol = new SimpleLineSymbol();
                break;
            case "polygon":
                symbol = new SimpleFillSymbol();
                break;
            }
            //return symbol
            return symbol;
        },

        /**
        * Executed when feature is added successfully on the layer
        * @param{string} isSubmitted, set flag for submitted form
        * @memberOf widgets/geo-form/geo-form
        */
        geoformSubmitted: function (isSubmitted) {
            // return value
            return isSubmitted;
        }
    });
});