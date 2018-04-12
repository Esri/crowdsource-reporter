/*global define,require,alert,dojo,$,window,moment*/
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
    "dojo/_base/kernel",
    "dojo/_base/lang",
    "dojo/date/locale",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/dom-construct",
    "dojo/dom-class",
    "dojo/on",
    "dojo/has",
    "dojo/dom-attr",
    "dojo/_base/array",
    "dojo/dom",
    "dojo/touch",
    "dojo/dom-style",
    "dojo/query",
    "dojo/window",
    "dojo/text!./templates/geo-form.html",
    "dojo/string",
    "dojo/date/locale",
    "esri/layers/GraphicsLayer",
    "esri/graphic",
    "esri/toolbars/draw",
    "esri/geometry/webMercatorUtils",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/geometry/Polygon",
    "widgets/locator/locator",
    "widgets/bootstrapmap/bootstrapmap"
], function (declare, kernel, lang, dateLocale, _WidgetBase, _TemplatedMixin, domConstruct, domClass, on, has, domAttr, array, dom, touch, domStyle, query, dojowindow, dijitTemplate, string, locale, GraphicsLayer, Graphic, Draw, webMercatorUtils, SimpleLineSymbol, SimpleFillSymbol, SimpleMarkerSymbol, Polygon, Locator, BootstrapMap) {
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
        _totalFileAttachedCounter: 0,
        _fileAttachedCounter: 0,
        _fileFailedCounter: 0,
        tooltipHandler: null,
        hasLocationField: false,
        firstMapClickPoint: null,
        _webmapResponse: null,
        newLocationFieldValue: null,
        locationFieldLength: null,
        _existingPopupAttachmentsArray: [],
        _deletedAttachmentsPopupArr: [], // to store deleted attachments
        currentGeoformNode: null, // Refers to node for geoform(add/edit)
        componentOrder: [],
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
                this.defaultValueArray = [];
                // Show loading indicator
                this.appUtils.showLoadingIndicator();
                //Reorder form components  as per configuration
                this._reorderFormComponents();
                // Clear previous attachments
                this._clearAttachements();
                this.sortedFields = [];
                //Change ui and configuration based on add/edit feature
                if (this.isEdit) {
                    domConstruct.empty(this.userForm);
                    this._changeGeoformStyles();
                    this._deletedAttachmentsPopupArr = [];
                    this.currentGeoformNode = $('.esriCTItemDetailsContainer');
                } else {
                    this.currentGeoformNode = $('#geoFormBody');
                    //Check if app is running in desktop/tablet mode and hide the map
                    this.setGeoformMapVisibility();
                }
                if (this.isMapRequired) {
                    // Initialize geo form
                    this._init();
                } else {
                    // show only selected layer and remove other layer from Webmap
                    this._filterOperationalLayers(this._webmapResponse.itemInfo.itemData.operationalLayers);
                    // Filters selected layer fields according to Popup info, Data Types and fields not to be shown in GeoForm
                    this._filterLayerFields(this._webmapResponse);
                    // Creates Geoform UI According to Filtered data
                    this._createGeoFormUI();
                }
            } catch (err) {
                // Show error message
                this.appUtils.showError(err.message);
            }
        },

        /**
        * This function will be used to check the current order and arrange them
        * @memberOf widgets/geo-form/geo-form
        */
        _reorderFormComponents: function () {
            var configuredOrderObj = {
                "details": this.config.details,
                "attachments": this.config.attachments,
                "location": this.config.location
            };
            this.componentOrder = [];
            this._checkComponentOrder(configuredOrderObj, "Top");
            this._checkComponentOrder(configuredOrderObj, "Middle");
            this._checkComponentOrder(configuredOrderObj, "Bottom");
            this._setComponentOrder();
        },

        /**
        * Check components current configured order and push it in array
        * @memberOf widgets/geo-form/geo-form
        */
        _checkComponentOrder: function (configuredOrderObj, position) {
            var key;
            for (key in configuredOrderObj) {
                if (configuredOrderObj[key] === position) {
                    this.componentOrder.push(key);
                }
            }
        },

        /**
        * Get dom node with the help of section key
        * @memberOf widgets/geo-form/geo-form
        */
        _getNodeFromKey: function (key) {
            var section;
            switch (key) {
            case "details":
                section = this.detailSection;
                break;
            case "attachments":
                section = this.attachmentSection;
                break;
            case "location":
                section = this.locationSection;
                break;
            }
            return section;
        },

        /**
        * This function will be used to set order of components as configured
        * @memberOf widgets/geo-form/geo-form
        */
        _setComponentOrder: function () {
            var node, prevNode;
            array.forEach(this.componentOrder, lang.hitch(this, function (currentNode, index) {
                node = this._getNodeFromKey(currentNode);
                //add component to the first position if index is 0
                if (index === 0) {
                    domConstruct.place(node, this.componentSection, "first");
                    prevNode = node;
                } else {
                    domConstruct.place(node, prevNode, "after");
                    prevNode = node;
                }
            }));
        },

        /**
        * Set geoform map visibility based on device dimensions
        * @memberOf widgets/geo-form/geo-form
        */
        setGeoformMapVisibility: function () {
            if (dojowindow.getBox().w > 768) {
                domStyle.set(this.map_container, "display", "none");
                if (domClass.contains(this.select_location.nextSibling, "errorMessage")) {
                    this._removeErrorNode(this.select_location.nextSibling);
                }
            } else {
                domStyle.set(this.map_container, "display", "block");
                this._resizeMap();
            }
        },

        /**
        * Change geoform styles based on add/edit feature mode
        * @memberOf widgets/geo-form/geo-form
        */
        _changeGeoformStyles: function () {
            domStyle.set(this.formHeader, "display", "none");
            domStyle.set(this.locationSection, "display", "none");
            domStyle.set(this.map_container, "display", "none");
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
                editable: false
            }).then(lang.hitch(this, function (response) {
                var zoomInBtn, zoomOutBtn;
                // Scroll geoform to top
                this.currentGeoformNode.animate({
                    scrollTop: 0
                }, 1000);
                // Once the map is created we get access to the response which provides map, operational layers, popup info.
                this._webmapResponse = response;
                this.map = response.map;
                this.map.on("click", lang.hitch(this, function (evt) {
                    if (!this.firstMapClickPoint) {
                        this.firstMapClickPoint = evt.mapPoint;
                    }
                    this._clearSubmissionGraphic();
                }));
                // tooltip for zoom in and zoom out button
                zoomInBtn = query('.esriSimpleSliderIncrementButton', dom.byId(this.map.id))[0];
                zoomOutBtn = query('.esriSimpleSliderDecrementButton', dom.byId(this.map.id))[0];
                if (zoomInBtn) {
                    domAttr.set(zoomInBtn, "title", this.appConfig.i18n.map.zoomInTooltip);
                }
                if (zoomOutBtn) {
                    domAttr.set(zoomOutBtn, "title", this.appConfig.i18n.map.zoomOutTooltip);
                }
                domAttr.set(this.closeButton, "title", this.appConfig.i18n.geoform.geoformBackButtonTooltip);
                domAttr.set(this.submitButton, "title", this.appConfig.i18n.geoform.submitButtonTooltip);
                domAttr.set(this.cancelButton, "title", this.appConfig.i18n.geoform.cancelButtonTooltip);
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
                this.basemapExtent = this.appUtils.getBasemapExtent(response.itemInfo.itemData.baseMap.baseMapLayers);
                // Create instance of Draw tool to draw the graphics on graphics layer
                this.toolbar = new Draw(this.map);
                // activate draw tool
                this._activateDrawTool();
                // Handle draw_activateDrawTool-end event which will be fired on selecting location
                on(this.toolbar, "draw-complete", lang.hitch(this, function (evt) {
                    // remove select location error message as location is selected now.
                    this._removeErrorNode(this.select_location.nextSibling);
                    // add drawn graphic on the graphics layer
                    this._addToGraphicsLayer(evt);
                    // resize map
                    this._resizeMap();
                    // Listen to draw complete event
                    this.onDrawComplete(evt);
                    if (evt.geometry.type === "point") {
                        this.appUtils.locatorInstance.locationToAddress(webMercatorUtils.webMercatorToGeographic(evt.geometry), 100);
                    } else {
                        this.appUtils.locatorInstance.locationToAddress(webMercatorUtils.webMercatorToGeographic(lang.clone(this.firstMapClickPoint)), 100);
                    }
                    this.firstMapClickPoint = null;
                }));
                // Handle click of Submit button
                on(this.submitButton, "click", lang.hitch(this, this._submitForm));
                // Handle click of close button
                on(this.closeButton, "click", lang.hitch(this, this.closeForm));
                // Handle click of cancel button
                on(this.cancelButton, "click", lang.hitch(this, this._onCancelClick));
                // Initialize locator widget
                this.locator = new Locator({ "isGeoformLocator": true, "map": this.map, "config": this.config, "appUtils": this.appUtils, "itemInfo": response.itemInfo.itemData, "layerId": this.layerId, "locatorContainer": this.geoformLocator, "handleFeatureSearch": false });
                // function call on selection of search result
                this.locator.onLocationCompleted = lang.hitch(this, this._validateAddress);
                //Listen for address list open/close event
                this.locator.onAddressListToggle = lang.hitch(this, function () {
                    //After list is populated with all the valid locations, resize the map because map changes its position
                    if (this.map) {
                        this.map.resize();
                    }
                });
                //Set placeholder text on load, if application is running in IE9
                if (has("ie") === 9) {
                    this.appUtils.displayPlaceHolderText(this.locator.txtSearch, response.itemInfo, this.config.i18n);
                }
                on(this.locator.txtSearch, "blur", lang.hitch(this, function () {
                    if (has("ie") === 9) {
                        this.appUtils.displayPlaceHolderText(this.locator.txtSearch, response.itemInfo, this.config.i18n);
                    }
                }));
                on(this.locator.txtSearch, "focus", lang.hitch(this, function () {
                    if (has("ie") === 9) {
                        this.appUtils.removePlaceHolderText(this.locator.txtSearch);
                    }
                }));
                on(this.locator.close, "click", lang.hitch(this, function () {
                    //Resize the map
                    this.map.resize();
                    if (has("ie") === 9) {
                        this.appUtils.displayPlaceHolderText(this.locator.txtSearch, response.itemInfo, this.config.i18n);
                    }
                }));
                // create geoLocation Button
                this.appUtils.createGeoLocationButton(response.itemInfo.itemData.baseMap.baseMapLayers, this.map, this.geoLocationButton, true);

                // function call on map resize
                on(window, 'resize', lang.hitch(this, function () {
                    this._resizeMap(true);
                }));
                // As map is in scrollable container if you scroll the container, map's position gets changed and map click will not give you proper screen point.
                // So to fix this, handle container's onscroll event and resize map so that map click will work properly.
                //Also hide the popups on scroll as geoform is in a container with absolute position so on scrolling geoform pop-ups will stick not stick to the input container
                on(dom.byId('geoFormBody'), 'scroll', lang.hitch(this, this._onGeoformScroll));

                on(window, "orientationchange", function () {
                    $(".selectDomain").blur();
                });

                //hide geoFormLoader div
                domClass.add(this.geoFormLoader, "esriCTHidden");

                // if changed extent not null
                if (this.changedExtent) {
                    this.map.setExtent(this.changedExtent);
                }

                //Populate location field after successfully fetching the address
                this.appUtils.onLocationToAddressComplete = lang.hitch(this, function (result) {
                    var addressString = "", key;
                    if (result.address && result.address.address &&
                            result.address.address.Match_addr) {
                        addressString = result.address.address.Match_addr;
                    } else {
                        addressString = "";
                        for (key in result.address.address) {
                        //Check if key exist and it is not equal to "Loc_name"
                            if (result.address.address.hasOwnProperty(key) && key !== "Loc_name") {
                                addressString += result.address.address[key] + " ";
                            }
                        }
                        addressString = lang.trim(addressString);
                    }
                    if (this.config.locationField !== "") {
                        this._populateLocationField(addressString);
                    }
                });

                //Reset the field in case of error
                this.appUtils.onLocationToAddressFailed = lang.hitch(this, function () {
                    if (this.config.locationField !== "") {
                        this._resetLocationField();
                    }
                });

                //Check if valid location field is configured
                if (this.config.locationField) {
                    this._findLocationField();
                }
            }));
        },

        _onCancelClick: function () {
            if (domClass.contains(this.headerMessageDiv, "esriCTVisible")) {
                domClass.replace(this.headerMessageDiv, "esriCTHidden", "esriCTVisible");
            }
            this.toolbar.deactivate();
            this._clearSubmissionGraphic();
            setTimeout(lang.hitch(this, function () {
                this.closeForm();
                this._clearFormFields();
            }), 500);
        },

        /**
        * This function is called on Scroll.
        * @memberOf widgets/geo-form/geo-form
        */
        _onGeoformScroll: function () {
            //close the datePicker pop-ups
            $(".hasDatetimepicker").blur();
            $(".bootstrap-datetimepicker-widget").datetimepicker().hide();
            $(".popover.top.fade.in").each(function () {
                domClass.remove(this, "in");
            });
            //resize the map
            this._resizeMap();
        },

        /**
        * check if located address is in basemap extent
        * @param{object} geometry of located point on the map
        * @memberOf widgets/geo-form/geo-form
        */
        _validateAddress: function (geometry) {
            if (this.basemapExtent.contains(geometry)) {
                this._locateSelectedAddress(geometry);
                if (this.layer.geometryType === "esriGeometryPoint" &&
                        this.config.locationField !== "") {
                    this._populateLocationField(this.locator.txtSearch.value);
                }
                this.onLocationSelected(geometry);
            } else {
                this.appUtils.showError(this.appConfig.i18n.locator.locationOutOfExtent);
            }
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
                // Listen to draw complete event
                this.onDrawComplete(geometry);
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
                    this.setLocationPanelHint();
                    //Make sure we are not showing labels on geoform feature layer to make it consistent with main map
                    if (this.layer.showLabels) {
                        this.layer.showLabels = false;
                    }
                    if (this.isEdit && this.layer.hasAttachments) {
                        this._fetchExistingAttachment();
                    }
                } else {
                    if (this.appConfig.showNonEditableLayers) {
                        if (this.map.getLayer(opLayers[i].id)) {
                            if (opLayers[i].resourceInfo && opLayers[i].resourceInfo.capabilities) {
                                // condition to check if feature layer is non-editable and it is visible in TOC
                                if ((opLayers[i].resourceInfo.capabilities.indexOf("Create") === -1) &&
                                        ((opLayers[i].resourceInfo.capabilities.indexOf("Update") === -1) ||
                                        (opLayers[i].resourceInfo.capabilities.indexOf("Editing") === -1)) &&
                                        opLayers[i].visibility) {
                                    opLayers[i].layerObject.show(); // display non-editable layer
                                    // condition to check feature layer with create, edit, delete permissions and popup enabled, but all fields marked display only
                                } else if ((opLayers[i].resourceInfo.capabilities.indexOf("Create") !== -1) &&
                                        (opLayers[i].resourceInfo.capabilities.indexOf("Editing") !== -1) &&
                                        (opLayers[i].resourceInfo.capabilities.indexOf("Update") !== -1) &&
                                        (opLayers[i].popupInfo) &&
                                        this._checkDisplayPropertyOfFields(opLayers[i].popupInfo, opLayers[i].layerObject.fields) &&
                                        this.layerId !== opLayers[i].id) {
                                    opLayers[i].layerObject.show(); // display non-editable layer
                                    // condition to check feature layer with create, edit, delete permissions, but disabled on the layer in the map TOC
                                } else {
                                    opLayers[i].layerObject.hide();
                                }
                            }
                        }
                    } else {
                        if (opLayers[i].layerObject) {
                            opLayers[i].layerObject.hide();
                        } else if (opLayers[i].featureCollection) {
                            //Handle feature collection layers and show them on the map as non-editable layer
                            array.forEach(opLayers[i].featureCollection.layers, lang.hitch(this, function (featureCollectionLayer) {
                                if (featureCollectionLayer.layerObject && (featureCollectionLayer.layerObject.capabilities.indexOf("Create") === -1) &&
                                        ((featureCollectionLayer.layerObject.capabilities.indexOf("Editing") === -1) ||
                                        (featureCollectionLayer.layerObject.capabilities.indexOf("Update") === -1)) && opLayers[i].visibility) {
                                    featureCollectionLayer.layerObject.hide();
                                }
                            }));
                        }
                    }
                }
            }
        },

        /**
        * This function is used to check whether all fields are marked display or not
        * @memberOf widgets/webmap-list/webmap-list
        */
        _checkDisplayPropertyOfFields: function (popupInfo, fields) {
            var i, j;
            if (!popupInfo) {
                return false;
            }
            for (i = 0; i < popupInfo.fieldInfos.length; i++) {
                if (popupInfo.fieldInfos[i].isEditable) {
                    return false;
                }
            }
            // check if popup-info is available if not then return false
            if (popupInfo) {
                for (i = 0; i < popupInfo.fieldInfos.length; i++) {
                    for (j = 0; j < fields.length; j++) {
                        if (popupInfo.fieldInfos[i].fieldName === fields[j].name) {
                            // check if field is Editable
                            if (popupInfo.fieldInfos[i].visible) {
                                return true;
                            }
                        }
                    }
                }
            }
            return false;
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
            var geoformDetailsSectionLabel, geoformLocationSectionLabel, submitButtonText;
            domConstruct.empty(this.layerTitleDiv);
            // Set innerHTML for geo form header sections
            domAttr.set(this.layerTitleDiv, "innerHTML", this.layerTitle);
            //Show popup on click/hover of layer title div
            if (window.hasOwnProperty("ontouchstart") || window.ontouchstart !== undefined) {
                this._createTooltip(this.layerTitleDiv, this.layerTitle);
            }
            //Check for configurable parameter and accordingly set the section titles
            if (this.appConfig.geoformDetailsSectionLabel) {
                if (this.appConfig.geoformDetailsSectionLabel === "Details") {
                    geoformDetailsSectionLabel = this.appConfig.i18n.geoform.enterInformation;
                } else {
                    geoformDetailsSectionLabel = this.appConfig.geoformDetailsSectionLabel;
                }
            } else {
                geoformDetailsSectionLabel = this.appConfig.i18n.geoform.enterInformation;
            }

            if (this.appConfig.geoformLocationSectionLabel) {
                if (this.appConfig.geoformLocationSectionLabel === "Location") {
                    geoformLocationSectionLabel = this.appConfig.i18n.geoform.enterLocation;
                } else {
                    geoformLocationSectionLabel = this.appConfig.geoformLocationSectionLabel;
                }
            } else {
                geoformLocationSectionLabel = this.appConfig.i18n.geoform.enterLocation;
            }

            domAttr.set(this.enter_Information, "innerHTML", geoformDetailsSectionLabel);
            domAttr.set(this.select_location, "innerHTML", geoformLocationSectionLabel);
            if (this.isEdit) {
                submitButtonText = this.appConfig.i18n.geoform.editReportButton;
            } else {
                submitButtonText = this.appConfig.i18n.geoform.reportItButton;
            }
            domAttr.set(this.submitButton, "innerHTML", submitButtonText);
            domAttr.set(this.cancelButton, "innerHTML", this.appConfig.i18n.geoform.cancelButton);
            // If sorted field array length is zero
            if (this.sortedFields.length === 0) {
                this._showErrorMessageDiv(this.appConfig.i18n.geoform.noFieldsConfiguredMessage, this.headerMessageDiv);
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
            var fileInput, formContent, userFormNode, fileChange, fileAttachmentContainer, fileContainer, geoformAttachmentSectionLabel;
            // If layer has hasAttachments true
            if (this.layer.hasAttachments) {
                domConstruct.empty(this.attachmentSection);
                userFormNode = this.userForm;
                // Create container for hasAttachment
                formContent = domConstruct.create("div", {
                    "class": "form-group hasAttachment geoFormQuestionare esriCTGeoFormAttachmentLabel"
                }, this.attachmentSection);

                if (this.appConfig.geoformAttachmentSectionLabel) {
                    if (this.appConfig.geoformAttachmentSectionLabel === "Attachments") {
                        geoformAttachmentSectionLabel = this.appConfig.i18n.geoform.selectAttachments;
                    } else {
                        geoformAttachmentSectionLabel = this.appConfig.geoformAttachmentSectionLabel;
                    }
                } else {
                    geoformAttachmentSectionLabel = this.appConfig.i18n.geoform.selectAttachments;
                }
                // Select attachment label
                domConstruct.create("label", {
                    "innerHTML": geoformAttachmentSectionLabel,
                    "id": "geoFormAttachmentTitileLabel",
                    "class": "esriCTGeoFormTitles"
                }, formContent);
                domConstruct.create("br", {}, formContent);
                // Create div for Attachment button
                fileContainer = domConstruct.create("div", { "class": "esriCTFileButtonContainer", "title": this.appConfig.i18n.geoform.selectFileText }, formContent);
                this._fileInputIcon = domConstruct.create("button", {
                    "type": "button",
                    "innerHTML": this.appConfig.i18n.geoform.selectFileText,
                    "class": "fileInputButton btn  btn-default esriCTPointerCursor esriCTGeoFormButton esriCTApplicationColor esriCTButtonTextColor esriCTButtonBackgroundColor"
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
                    "class": "row esriCTFileAttachMentList"
                }, fileAttachmentContainer);
                // Create input container for attachments
                fileInput = domConstruct.create("input", {
                    "type": "file",
                    "accept": "image/*",
                    "name": "attachment",
                    "style": { "height": dojo.coords(this._fileInputIcon).h + "px", "width": dojo.coords(this._fileInputIcon).w + "px" }
                }, domConstruct.create("form", { "id": "geoFormAttachment" + this._fileAttachmentCounter++, "class": "esriCTHideFileInputUI" }, fileContainer));
                domClass.add(fileInput, "esriCTPointerCursor");

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
                newFormControl = domConstruct.create("form", { "id": "geoFormAttachment" + this._fileAttachmentCounter++, "class": "esriCTHideFileInputUI" }, $(".hasAttachment")[0]);
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
        * This function will update attachment countand based on count will show/hide message in GeoForm.
        * @memberOf widgets/geo-form/geo-form
        */
        _updateAttachmentCount: function () {
            var photoSelectedDiv = dom.byId("attachmentSelectedCount"), selectedAttachmentsCount;
            if (photoSelectedDiv) {
                selectedAttachmentsCount = query(".alert-dismissable", this.fileAttachmentList).length;
                if (selectedAttachmentsCount > 0) {
                    domAttr.set(photoSelectedDiv, "innerHTML", selectedAttachmentsCount + " " + this.appConfig.i18n.geoform.attachmentSelectedMsg);
                } else {
                    domAttr.set(photoSelectedDiv, "innerHTML", "");
                }
            }
            this._resizeMap();
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
                    innerHTML: this.appConfig.i18n.geoform.requiredField
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
                            if (this.layer.templates[0].prototype.attributes[fieldAttribute] !== null && lang.trim(this.layer.templates[0].prototype.attributes[fieldAttribute].toString()) !== "") {
                                currentField.defaultValue = this.layer.templates[0].prototype.attributes[fieldAttribute];
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
            //hide Loading Indicator
            this.appUtils.hideLoadingIndicator();
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
        * @memberOf widgets/geo-form/geo-form
        */
        _createDomainValueFormElements: function (currentField, formContent, fieldname) {
            var date, inputRangeDateGroupContainer, rangeDefaultDate, currentSelectedDate, formatedDate;
            if (this.isEdit) {
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
                        if (!this.isEdit) {
                            // set default value and id to the array
                            this.defaultValueArray.push({ defaultValue: currentField.defaultValue, id: this.inputContent.id, type: currentField.type });
                        }
                    } else {
                        ////Check if todays date falls between minimum and maximum date
                        if (currentField.domain.maxValue > Date.now() && currentField.domain.minValue < Date.now()) {
                            currentSelectedDate = Date.now();
                            $(inputRangeDateGroupContainer).data("DateTimePicker").setDate(moment(Date.now()).format($(inputRangeDateGroupContainer).data("DateTimePicker").format));
                        } else {
                            currentSelectedDate = currentField.domain.minValue;
                        }
                        formatedDate = moment(new Date(currentSelectedDate)).format($(inputRangeDateGroupContainer).data("DateTimePicker").format);
                        $(inputRangeDateGroupContainer).data("DateTimePicker").setDate(formatedDate);
                        if (!this.isEdit) {
                            this.defaultValueArray.push({ defaultValue: currentSelectedDate, id: this.inputContent.id, type: currentField.type });
                        }
                    }
                    // Assign value to the range help text
                    this.rangeHelpText = string.substitute(this.appConfig.i18n.geoform.dateRangeHintMessage, {
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
                innerHTML: this.appConfig.i18n.geoform.selectDefaultText,
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
                        if (!this.isEdit) {
                            // set default value and id into the array
                            this.defaultValueArray.push({ defaultValue: currentField.defaultValue, id: this.inputContent.id });
                        }
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
        * @memberOf widgets/geo-form/geo-form
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
        * Create input elements of form.
        * @param{object} currentField, object of current field in the info pop
        * @param{object} formContent, Parent Node of the field inside geo form
        * @param{string} fieldname, name of the field
        * @memberOf widgets/geo-form/geo-form
        */
        _createInputFormElements: function (currentField, formContent, fieldname) {
            var inputDateGroupContainer;
            // Create field controls on basis of their type
            switch (currentField.type) {
            case "esriFieldTypeString":
                if (currentField.stringFieldOption === "textarea") {
                    this.inputContent = domConstruct.create("textarea", {
                        className: "form-control",
                        "data-input-type": "String",
                        "rows": 4,
                        "maxLength": currentField.length,
                        "id": fieldname
                    }, formContent);
                } else {
                    this.inputContent = domConstruct.create("input", {
                        type: "text",
                        className: "form-control",
                        "data-input-type": "String",
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
            if (this.isEdit) {
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
                    if (!this.isEdit) {
                        this.defaultValueArray.push({ defaultValue: currentField.defaultValue, id: this.inputContent.id, type: currentField.type });
                    }
                } else {
                    domAttr.set(this.inputContent, "value", currentField.defaultValue);
                    domClass.add(formContent, "has-success");
                    if (!this.isEdit) {
                        this.defaultValueArray.push({ defaultValue: currentField.defaultValue, id: this.inputContent.id });
                    }
                }
            } else {
                // else assign current date to the date time picker
                if (currentField.type === "esriFieldTypeDate") {
                    // set current date to date field
                    $(inputDateGroupContainer).data("DateTimePicker").setDate(new Date());
                    // set format to the current date
                    defaultDate = moment(new Date()).format($(inputDateGroupContainer).data("DateTimePicker").format);
                    if (!this.isEdit) {
                        this.defaultValueArray.push({ defaultValue: new Date(), id: this.inputContent.id, type: currentField.type });
                    }
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
                if (!this.isEdit) {
                    this.defaultValueArray.push({ defaultValue: setDefault, id: this.inputContent.id, type: "range" });
                }
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
            rangeHelpText = string.substitute(this.appConfig.i18n.geoform.numericRangeHintMessage, {
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
        * Validate fields defined within subtypes
        * @param{object} currentTarget, on change event current target field
        * @param{object} currentField, object of current field in the info pop
        * @memberOf widgets/geo-form/geo-form
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
                    var field = null, fieldAttribute, hasDomainValue, hasDefaultValue;
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
                    error = string.substitute(this.appConfig.i18n.geoform.invalidInputValue, {
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
                    error = string.substitute(this.appConfig.i18n.geoform.invalidSmallNumber, {
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
                    error = string.substitute(this.appConfig.i18n.geoform.invalidNumber, {
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
                    error = string.substitute(this.appConfig.i18n.geoform.invalidFloat, {
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
                    error = string.substitute(this.appConfig.i18n.geoform.invalidDouble, {
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
                if (domClass.contains(this.select_location.nextSibling, "errorMessage")) {
                    this._removeErrorNode(this.select_location.nextSibling);
                }
                this.locator._hideText();
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
        * Create datetime picker
        * @param{object} parentNode, parent node to attached date time picker
        * @param{Boolean} isRangeField, set flag true or false depends on range
        * @param{string} fieldname, name of the field
        * @param{object} currentField, object of Current Field Details
        * @memberOf widgets/geo-form/geo-form
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
                if (query(".errorMessage", query(evt.target).parents(".geoFormQuestionare")[0])[0]) {
                    domConstruct.destroy(query(".errorMessage", query(evt.target).parents(".geoFormQuestionare")[0])[0]);
                }
                domClass.remove(query(evt.target).parents(".geoFormQuestionare")[0], "has-error");
                domClass.add(query(evt.target).parents(".geoFormQuestionare")[0], "has-success");
                if (query("input", this)[0].value === "") {
                    domClass.remove(query(evt.target).parents(".geoFormQuestionare")[0], "has-success");
                    domClass.remove(query(evt.target).parents(".geoFormQuestionare")[0], "has-error");
                }
            }).on('dp.error', function (evt) {
                // on error
                evt.target.value = '';
                domClass.remove(query(evt.target).parents(".geoFormQuestionare")[0], "has-success");
                domClass.add(query(evt.target).parents(".geoFormQuestionare")[0], "has-error");
            }).on("dp.hide", function (evt) {
                // on Datetime picker hide event
                if (query("input", this)[0].value === "") {
                    domClass.remove(query(evt.target).parents(".geoFormQuestionare")[0], "has-success");
                    domClass.remove(query(evt.target).parents(".geoFormQuestionare")[0], "has-error");
                }
            }).on('dp.change', function (evt) {
                // on change
                domClass.add(query(evt.target).parents(".geoFormQuestionare")[0], "has-success");
                domClass.remove(query(evt.target).parents(".geoFormQuestionare")[0], "has-error");
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
            if (this.map && !domClass.contains(dom.byId('geoformContainer'), "esriCTHidden")) {
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
            array.forEach(query(".geoFormQuestionare", this.domNode), lang.hitch(this, function (currentField) {
                // to check for errors in form before submitting.
                if ((query(".form-control", currentField)[0])) {
                    // condition to check if the entered values are erroneous.
                    if (domClass.contains(currentField, "has-error") && query("select", currentField).length === 0) {
                        erroneousFields.push(currentField);
                    }
                    // condition to check if mandatory fields are kept empty.
                    if ((query(".form-control", currentField)[0].value === "" && domClass.contains(currentField, "mandatory"))) {
                        this._validateUserInput(this.appConfig.i18n.geoform.requiredFields, currentField, query(".form-control", currentField)[0].value, true);
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
                this.currentGeoformNode.animate({
                    scrollTop: erroneousFields[0].offsetTop
                }, 1000);
                if (!this.addressGeometry && !this.isEdit) {
                    // error message
                    errorMessage = this.appConfig.i18n.geoform.selectLocation;
                    this._showErrorMessageDiv(errorMessage, this.select_location);
                }
            } else {
                // If geometry is selected on the map
                if (this.addressGeometry) {
                    // Add feature to the layer
                    this._addFeatureToLayer();
                } else {
                    if (this.isEdit) {
                        this.updateFeatureToLayer();
                    } else {
                        // error message
                        errorMessage = this.appConfig.i18n.geoform.selectLocation;
                        this._showErrorMessageDiv(errorMessage, this.select_location);
                        // Scroll to the selected location
                        this.currentGeoformNode.animate({
                            scrollTop: this.select_location.offsetTop
                        }, 1000);
                    }
                }
            }
        },

        /**
        * Add feature to layer
        * @memberOf widgets/geo-form/geo-form
        */
        _addFeatureToLayer: function () {
            var featureData, key, value, datePicker, picker, fileList, i, type, editedFields = [];
            // show loading indicator
            this.appUtils.showLoadingIndicator();
            // Create instance of graphic
            featureData = new Graphic();
            // create an empty array object
            featureData.attributes = {};
            // for all the fields
            //Limit scope the current domNode to avoid the conflicts
            array.forEach(query(".geoFormQuestionare .form-control", this.domNode), function (currentField) {
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
                    editedFields.push(key);
                }
            });

            // If layer has ReportedBy Field then Add logged in username in it
            // Add ReportedBy field to editedFields array so that it will not get the default value from template
            if (this._layerHasReportedByField) {
                featureData.attributes[this.config.reportedByField] = this.config.logInDetails.processedUserName;
                editedFields.push(key);
            }
            //Check if layer has typeID field, then add the default values for the field from selected typeID field template
            if (this.layer.typeIdField && this.layer.typeIdField !== "") {
                for (type in this.layer.types) {
                    if (this.layer.types.hasOwnProperty(type)) {
                        if (this.layer.types[type].id === featureData.attributes[this.layer.typeIdField]) {
                            this._addValuesFromTemplate(this.layer.types[type].templates[0], editedFields, featureData);
                        }
                    }
                }
            }
            //Check if layer has template, then add the Default values from template of the layer, for the fields which are not editable(not available in geoform to edit)
            if (this.layer.templates && this.layer.templates.length > 0) {
                this._addValuesFromTemplate(this.layer.templates[0], editedFields, featureData);
            }

            featureData.geometry = {};
            // Assign feature geometry
            featureData.geometry = this.addressGeometry;
            //Check if location field is not visible in popup but still it is editable
            if (this.newLocationFieldValue) {
                featureData.attributes[this.config.locationField] = this.newLocationFieldValue;
            }
            // Add feature to the layer
            this.layer.applyEdits([featureData], null, null, lang.hitch(this, function (addResults) {
                // Add attachment on success
                if (addResults[0].success) {
                    //if layer has attachments then add those attachments
                    if (this.layer.hasAttachments && query(".esriCTFileToSubmit", this.attachmentSection).length > 0) {
                        //get all the attachments and append it in form element
                        fileList = query(".esriCTFileToSubmit", this.attachmentSection);
                        //reset fileAttached and failed counter
                        this._fileAttachedCounter = 0;
                        this._fileFailedCounter = 0;
                        //set total file attached counter
                        this._totalFileAttachedCounter = fileList.length;
                        for (i = 0; i < fileList.length; i++) {
                            //handle success and error callback for add attachments
                            this.layer.addAttachment(addResults[0].objectId, fileList[i], lang.hitch(this, this._onAttachmentUploadComplete), lang.hitch(this, this._onAttachmentUploadFailed));
                        }
                    } else {
                        //hide loading indicator started in _addFeatureToLayer method
                        this.appUtils.hideLoadingIndicator();
                        // reset form
                        this._clearFormFields();
                    }
                    // remove graphic
                    this._clearSubmissionGraphic();
                    if (this.changedExtent) {
                        this.map.setExtent(this.changedExtent);
                    } else {
                        //reset to default extent
                        if (this.defaultExtent) {
                            this.map.setExtent(this.defaultExtent);
                        }
                    }
                    // Show Thank you message on Success
                    this._showHeaderMessageDiv(this.config.submitMessage, "success");
                    if (this.appConfig.showNonEditableLayers) {
                        //Refresh label layers to fetch label of updated feature
                        this.appUtils.refreshLabelLayers(this._webmapResponse.itemInfo.itemData.operationalLayers);
                    }
                    // Successfully feature is added on the layer
                    this.geoformSubmitted(addResults[0].objectId);
                    //Refresh the layer on geoform map
                    this.updateLayerOnMap();
                } else {
                    domConstruct.destroy(query(".errorMessage")[0]);
                    // Show Error message on Failure
                    this._showHeaderMessageDiv(this.appConfig.i18n.geoform.errorsInApplyEdits, "error");
                    //hide loading indicator started in _addFeatureToLayer method
                    this.appUtils.hideLoadingIndicator();
                }
            }), lang.hitch(this, function () {
                // remove error
                domConstruct.destroy(query(".errorMessage")[0]);
                // Show error message on Failure
                this._showHeaderMessageDiv(this.appConfig.i18n.geoform.errorsInApplyEdits, "error");
                //hide loading indicator started in _addFeatureToLayer method
                this.appUtils.hideLoadingIndicator();
            }));
        },

        /**
        * Updated feature in layer
        * @memberOf widgets/geo-form/geo-form
        */
        updateFeatureToLayer: function () {
            var featureData, key, value, datePicker, picker, editedFields = [], i, fileList;
            // show loading indicator
            this.appUtils.showLoadingIndicator();
            // Create instance of graphic
            featureData = new Graphic();
            // create an empty array object
            featureData.attributes = {};
            // for all the fields
            //Limit scope the current domNode to avoid the conflicts
            array.forEach(query(".geoFormQuestionare .form-control", this.domNode), lang.hitch(this, function (currentField) {
                // get id of the field
                key = domAttr.get(currentField, "id");
                if (currentField.value !== "") {
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
                    editedFields.push(key);
                } else if (this.isEdit) {
                    // Assign value to the attributes
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
            //add object id to featureData targetNode
            featureData.attributes[this.layer.objectIdField] = this.item.attributes[this.layer.objectIdField];
            // Add feature to the layer
            this.layer.applyEdits(null, [featureData], null, lang.hitch(this, function (addResults, updateResults, deleteResults) {
                // Add attachment on success
                if (updateResults[0].success) {
                    //get all the attachments and append it in form element
                    fileList = query(".esriCTFileToSubmit", this.attachmentSection);
                    //if layer has attachments then add those attachments
                    if (this.layer.hasAttachments && (fileList.length > 0 || this._deletedAttachmentsPopupArr.length > 0)) {
                        if (fileList.length > 0) {
                            //reset fileAttached and failed counter
                            this._fileAttachedCounter = 0;
                            this._fileFailedCounter = 0;
                            //set total file attached counter
                            this._totalFileAttachedCounter = fileList.length;
                            for (i = 0; i < fileList.length; i++) {
                                //handle success and error callback for add attachments
                                this.layer.addAttachment(updateResults[0].objectId, fileList[i], lang.hitch(this, this._onAttachmentUploadComplete), lang.hitch(this, this._onAttachmentUploadFailed));
                            }
                        } else {
                            this._deleteAttachments();
                        }
                    } else {
                        //hide loading indicator started in _addFeatureToLayer method
                        this.appUtils.hideLoadingIndicator();
                        // reset form
                        this._clearFormFields();
                    }
                    //Change the selected item's attributes
                    lang.mixin(this.item.attributes, featureData.attributes);
                    //mixin makesure's all te other required atrributes are not overrriden
                    // Successfully feature is added on the layer
                    this.geoformFeatureUpdated(this.item);
                } else {
                    domConstruct.destroy(query(".errorMessage")[0]);
                    // Show Error message on Failure
                    this._showHeaderMessageDiv(this.appConfig.i18n.geoform.errorsInApplyEdits, "error");
                    //hide loading indicator
                    this.appUtils.hideLoadingIndicator();
                }
            }), lang.hitch(this, function () {
                // remove error
                domConstruct.destroy(query(".errorMessage")[0]);
                // Show error message on Failure
                this._showHeaderMessageDiv(this.appConfig.i18n.geoform.errorsInApplyEdits, "error");
                //hide loading indicator
                this.appUtils.hideLoadingIndicator();
            }));
        },

        /**
        * Add fields and values to feature data to be submitted, from template
        * @param{object} template object returned from layer info
        * @param{array} editedFields, fields which are edited and needs to be skipped for considering their default values
        * @param{object} featureData,Feature object to be submitted
        * @memberOf widgets/geo-form/geo-form
        */
        _addValuesFromTemplate: function (template, editedFields, featureData) {
            var fieldAttribute;
            //loop through all the fields in Templates and if the field has some value add that field to feature
            for (fieldAttribute in template.prototype.attributes) {
                if (template.prototype.attributes.hasOwnProperty(fieldAttribute)) {
                    //skip the fields which are edited using geoform
                    if ($.inArray(fieldAttribute, editedFields) === -1) {
                        //check if their is valid value for the field in template and add that value in feature-data to be submitted
                        //also add that field in edited array since same field can have default values in template for layer and template for typeIdFielf
                        if (template.prototype.attributes[fieldAttribute]) {
                            featureData.attributes[fieldAttribute] = template.prototype.attributes[fieldAttribute];
                            editedFields.push(fieldAttribute);
                        }
                    }
                }
            }
        },

        /**
        * Callback hander for attachment upload Complete event
        * @memberOf widgets/geo-form/geo-form
        */
        _onAttachmentUploadComplete: function () {
            this._fileAttachedCounter++;
            this._updateFileAttachedCounter();
        },

        /**
        * Callback hander for attachment upload failed event
        * @memberOf widgets/geo-form/geo-form
        */
        _onAttachmentUploadFailed: function () {
            this._fileFailedCounter++;
            this._updateFileAttachedCounter();
        },

        /**
        * On attachment upload
        * @memberOf widgets/geo-form/geo-form
        */
        _updateFileAttachedCounter: function () {
            if (this._totalFileAttachedCounter === (this._fileAttachedCounter + this._fileFailedCounter)) {
                if (this._deletedAttachmentsPopupArr.length > 0) {
                    this._deleteAttachments();
                } else {
                    this._onUpdateOperationComplete();
                }
                this._clearFormFields();
            }
        },

        /**
        * This function is executed when all applicable comment operations like add, update or delete is completed
        * @memberOf widgets/geo-form/geo-form
        */
        _onUpdateOperationComplete: function () {
            var attachmentFailedMsg;
            this._clearAttachements();
            if (this._fileFailedCounter > 0) {
                attachmentFailedMsg = string.substitute(this.config.i18n.geoform.attachmentUploadStatus, {
                    "failed": this._fileFailedCounter,
                    "total": this._totalFileAttachedCounter
                });
                // Show Thank you message on Success
                this._showHeaderMessageDiv(attachmentFailedMsg);
                // Successfully feature is added on the layer
                this.geoformFeatureUpdated(this.item);
            } else {
                // Successfully feature is added on the layer
                this.geoformFeatureUpdated(this.item);
            }
            this.appUtils.hideLoadingIndicator();
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
            this.appUtils.hideLoadingIndicator();
        },

        /**
        * Remove the error message container.
        * @param{object} node, node to bind error message
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
            if (isError === "success") {
                domClass.replace(this.headerMessageType, "alert-success", "alert-danger alert-warning");
            } else if (isError === "warning") {
                domClass.replace(this.headerMessageType, "alert-warning", "alert-danger alert-success");
            } else {
                domClass.replace(this.headerMessageType, "alert-danger", "alert-warning alert-success");
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
            this.currentGeoformNode.animate({
                scrollTop: 0
            }, 1000);
            // resize map
            this._resizeMap();
        },

        /**
        * This function is used to close form
        * @memberOf widgets/geo-form/geo-form
        */
        closeForm: function () {
            dom.byId("geoFormBody").scrollTop = 0;
            this.toolbar.deactivate();
            domClass.replace(dom.byId('geoformContainer'), "esriCTHidden", "esriCTVisible");
            //Hide header message div if it exist
            if (domClass.contains(this.headerMessageDiv, "esriCTVisible")) {
                domClass.replace(this.headerMessageDiv, "esriCTHidden", "esriCTVisible");
            }

            array.forEach(query('.errorMessage'), lang.hitch(this, function (node) {
                this._removeErrorNode(node);
            }));

            array.forEach(query('.geoFormQuestionare'), lang.hitch(this, function (currentNode) {
                if (domClass.contains(currentNode, "has-error")) {
                    domClass.remove(currentNode, "has-error");
                }
            }));
            this.onFormClose();
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
            // clear graphics on the map
            this._clearSubmissionGraphic();
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
        _addToGraphicsLayer: function (evt, isReverseGeocodeRequired) {
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
            if (isReverseGeocodeRequired) {
                if (evt.geometry.type === "point") {
                    this.appUtils.locatorInstance.locationToAddress(webMercatorUtils.webMercatorToGeographic(evt.geometry), 100);
                }
            }
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
                this.map.setLevel(this.appConfig.zoomLevel);
                this.map.centerAt(geometry);
            } else if (geometry.type === "polyline") {
                this.map.setLevel(this.appConfig.zoomLevel);
                centerPoint = geometry.getExtent();
                this.map.setExtent(centerPoint);
                // if geometry is of type polygon, add border to the polygon
            } else if (geometry.type === "polygon") {
                this.map.setLevel(this.appConfig.zoomLevel);
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
        },

        /**
        * Executed when feature is updated successfully on the layer
        * @param{string} isEdited, set flag for edited form
        * @memberOf widgets/geo-form/geo-form
        */
        geoformFeatureUpdated: function (isEdited) {
            // return value
            return isEdited;
        },

        /**
        * Set extent of main map to geoform map
        * @memberOf widgets/geo-form/geo-form
        */
        setMapExtent: function (extent) {
            this.changedExtent = extent;
        },

        /**
        * Invoked when touch occurs on respective title
        * @memberOf geo-form/geo-form
        */
        _createTooltip: function (node, title) {
            domAttr.set(node, "data-original-title", title);
            //Remove previous handle
            if (this.tooltipHandler) {
                this.tooltipHandler.remove();
                if ($(node)) {
                    $(node).tooltip("hide");
                }
            }
            this.tooltipHandler = on(node, touch.press, lang.hitch(this, function (e) {
                $(node).tooltip("toggle");
                e.preventDefault();
            }));
            on(document, "click", lang.hitch(this, function () {
                $(node).tooltip("hide");
            }));

            on(window, "resize", lang.hitch(this, function () {
                $(node).tooltip("hide");
            }));
        },

        /**
        * This function is used to check if valid location field is set in configuration
        * @memberOf geo-form/geo-form
        */
        _findLocationField: function () {
            array.some(this.layer.fields, lang.hitch(this, function (currentField) {
                if (this.config.locationField === currentField.name && currentField.type === "esriFieldTypeString" && !currentField.domain && !currentField.typeField && currentField.editable) {
                    this.hasLocationField = true;
                    this.locationFieldLength = currentField.length;
                    return true;
                }
            }));
        },

        /**
        * This function is used to set selected address to location field
        * @memberOf widgets/geo-form/geo-form
        */
        _populateLocationField: function (selectedAddress) {
            var locationFieldTextBox = $("#geoformContainer").find("#" + this.config.locationField)[0];
            if (locationFieldTextBox && this.hasLocationField && this.config.locationField) {
                if (selectedAddress) {
                    locationFieldTextBox.value = selectedAddress;
                    domClass.add(locationFieldTextBox.parentElement, "has-success");
                }
                this.locator.txtSearch.value = selectedAddress;
            } else if (this.hasLocationField && this.config.locationField) {
                //Check if address fits in given field length
                if (selectedAddress.length <= this.locationFieldLength) {
                    this.newLocationFieldValue = selectedAddress;
                } else {
                    //If address is longer than the configured field length, trim the address till the field length
                    this.newLocationFieldValue = selectedAddress.substring(0, this.locationFieldLength);
                }
                this.locator.txtSearch.value = selectedAddress;
            }
        },

        /**
        * This function is used to reset location field
        * @memberOf widgets/geo-form/geo-form
        */
        _resetLocationField: function () {
            var locationFieldTextBox = $("#geoformContainer").find("#" + this.config.locationField)[0];
            if (locationFieldTextBox && this.hasLocationField && this.config.locationField) {
                locationFieldTextBox.value = "";
                domClass.remove(locationFieldTextBox.parentElement, "has-success");
            }
            this.newLocationFieldValue = null;
            this.locator.txtSearch.value = "";
        },

        /* Section for fetching and showing existing attachments */

        /**
        * This function is used to fetch existing comment Attachments
        * @memberOf widgets/geo-form/geo-form
        */
        _fetchExistingAttachment: function () {
            var existingAttachmentObject;
            this._existingPopupAttachmentsArray = [];
            this.layer.queryAttachmentInfos(this.item.attributes[this.layer.objectIdField], lang.hitch(this, function (infos) {
                array.forEach(infos, lang.hitch(this, function (currentAttachment) {
                    existingAttachmentObject = {};
                    existingAttachmentObject.attachmentFileName = currentAttachment.name;
                    existingAttachmentObject.attachmentObjectID = currentAttachment.id;
                    this._existingPopupAttachmentsArray.push(existingAttachmentObject);
                    this._createExistingAttachment(existingAttachmentObject);
                    this._updateAttachmentCount();
                }));
            }));
        },

        /**
        * This function is used to create existing attachments
        * @param{object} existingAttachment - existing attachment whose UI needs to be created
        * @memberOf widgets/geo-form/geo-form
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
        * @memberOf widgets/geo-form/geo-form
        */
        _onExistingAttachmentCloseButtonClick: function (existingAttachmentCloseButton) {
            on(existingAttachmentCloseButton, "click", lang.hitch(this, function (evt) {
                setTimeout(lang.hitch(this, function () {
                    var attachmentObjectID;
                    attachmentObjectID = domAttr.get(evt.target, "attachmentObjectID");
                    attachmentObjectID = parseInt(attachmentObjectID, 10);
                    this._deletedAttachmentsPopupArr.push(attachmentObjectID);
                    this._updateAttachmentCount();
                }), 1);
            }));
        },

        /**
        * This function is used to delete the attachments
        * @memberOf widgets/geo-form/geo-form
        */
        _deleteAttachments: function () {
            this.layer.deleteAttachments(this.item.attributes[this.layer.objectIdField],
                this._deletedAttachmentsPopupArr,
                lang.hitch(this, this._onAttachmentDeleteComplete),
                lang.hitch(this, this._onAttachmentDeleteFailed));
        },

        /**
        * This function is called when attachments are deleted successfully
        * @memberOf widgets/geo-form/geo-form
        */
        _onAttachmentDeleteComplete: function (response) {
            this._onUpdateOperationComplete();
        },

        /**
        * This function is called when delete attachments operation is failed
        * @memberOf widgets/geo-form/geo-form
        */
        _onAttachmentDeleteFailed: function (err) {
            this._onUpdateOperationComplete();
        },

        /**
        * Update layer in the geoform map once a featue is deleted from main map
        * @memberOf widgets/geo-form/geo-form
        */
        updateLayerOnMap: function () {
            if (this.map && this.map._layers[this.layer.id]) {
                this.map._layers[this.layer.id].refresh();
            }
        },

        /**
        * Set location panel hint based on device dimensions
        * @memberOf widgets/geo-form/geo-form
        */
        setLocationPanelHint: function () {
            var pointLayerHintText, polygonLayerHintText;
            if (dojowindow.getBox().w < 768) {
                pointLayerHintText = this.appConfig.i18n.geoform.locationSelectionHintForPointLayer;
                polygonLayerHintText = this.appConfig.i18n.geoform.locationSelectionHintForPolygonLayer;
            } else {
                pointLayerHintText = this.appConfig.i18n.geoform.locationSelectionHintForPointLayerDesktop;
                polygonLayerHintText = this.appConfig.i18n.geoform.locationSelectionHintForPolygonLayerDesktop;
            }
            if (this.layer.geometryType === "esriGeometryPoint") {
                domAttr.set(this.locationHintTextNode, "innerHTML", pointLayerHintText);
            } else {
                domAttr.set(this.locationHintTextNode, "innerHTML", polygonLayerHintText);
            }
        },

        onLocationSelected: function (geometry) {
            return geometry;
        }
    });
});