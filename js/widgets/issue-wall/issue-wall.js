/*global define,dojo,dojoConfig,alert,moment,$ */
/*jslint browser:true,sloppy:true,nomen:true,unparam:true,plusplus:true,indent:4 */
/** @license
 | Copyright 2013 Esri
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
//============================================================================================================================//
define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/on",
    "dojo/touch",
    "dojo/string",
    "dojo/query",
    "dojo/text!./templates/issue-wall.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "esri/graphic",
    "esri/layers/FeatureLayer",
    "esri/tasks/query",
    "esri/dijit/PopupTemplate",
    "widgets/item-list/item-list",
    "dojo/_base/event"
], function (declare, dom, domConstruct, domStyle, domAttr, domClass, lang, array, on, touch, string, query, template, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Graphic, FeatureLayer, Query, PopupTemplate, ItemList, event) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        _hasCommentsTable: false,
        _commentsTable: null,
        _commentPopupTable: null,
        _layerClickHandler: null,
        tooltipHandler: null,
        itemsList: null,
        selectedLayer: null,
        _hasLikes: false,

        /**
        * This function is called when widget is constructed.
        * @param{object} config to be mixed
        * @memberOf widgets/issue-wall/issue-wall
        */
        constructor: function (config) {
            lang.mixin({}, this, config);
        },

        /**
        * Will be called on post creation of the widget.
        */
        postCreate: function () {
            var submitButtonText, submitButtonColor;
            // Items list
            this.itemsList = new ItemList({
                "appConfig": this.appConfig,
                "appUtils": this.appUtils,
                "linkToMapView": true
            }).placeAt(this.listContainer); // placeAt triggers a startup call to _itemsList

            //If webmap list is not required, we need to hide the back button
            if (!this.appUtils.isWebmapListRequired) {
                domStyle.set(this.listBackButton, "display", "none");
            }

            this.itemsList.summaryClick = lang.hitch(this, function (self, feat, evt) {
                this.onItemSelected(feat);
            });

            this.itemsList.onLoadMoreClick = lang.hitch(this, function (evt) {
                this.onLoadMoreClick(evt);
            });

            this.itemsList.setLikeField(this.appConfig.likeField);

            if (this.map) {
                this.initIssueWall();
            }

            this.own(on(this.listBackButton, "click", lang.hitch(this, function (evt) {
                this.onListCancel(evt);
            })));

            this.own(on(this.listMapItButton, "click", lang.hitch(this, function (evt) {
                this.onMapButtonClick(evt);
            })));

            this.own(on(this.listLoadingIndicator, "click", lang.hitch(this, function (evt) {
                //Stop event propagation
                event.stop(evt);
            })));
            this.own(on(this.submitReport, "click", lang.hitch(this, function (evt) {
                if (this.appConfig.reportingPeriod === "Closed") {
                    this.appUtils.reportingPeriodDialog.showDialog("reporting");
                    return;
                }
                if (this.appConfig.logInDetails.canEditFeatures) {
                    this.onSubmit(evt);
                } else {
                    this.appUtils.showMessage(this.appConfig.i18n.main.noEditingPermissionsMessage);
                }
            })));

            if (this.appConfig && lang.trim(this.appConfig.submitReportButtonText) === "") {
                submitButtonText = this.appConfig.i18n.main.submitReportButtonText;
            } else {
                submitButtonText = this.appConfig.submitReportButtonText;
            }
            domAttr.set(this.submitReportButton, "innerHTML", submitButtonText);
            submitButtonColor = (this.appConfig && this.appConfig.submitReportButtonColor) ? this.appConfig.submitReportButtonColor : "#35ac46";
            domStyle.set(this.submitReport, "background-color", submitButtonColor);
            domAttr.set(this.noIssuesMessage, "innerHTML", this.appConfig.i18n.issueWall.noResultsFound);
            domAttr.set(this.listBackButton, "title", this.appConfig.i18n.issueWall.gotoWebmapListTooltip);
            domAttr.set(this.listMapItButton, "title", this.appConfig.i18n.issueWall.gotoMapViewTooltip);
            //on load hide the issue list
            this.hide();
        },

        /**
        * Shows the widget with a simple display: ''
        */
        show: function () {
            domStyle.set(this.domNode, 'display', '');
        },

        /**
        * Hides the widget with a simple display: 'none'
        */
        hide: function () {
            domStyle.set(this.domNode, 'display', 'none');
        },

        onItemSelected: function (feature) {
            return feature;
        },

        onListCancel: function (evt) {
            return evt;
        },

        onMapButtonClick: function (evt) {
            return evt;

        },

        onSubmit: function (evt) {
            return evt;
        },

        onLoadMoreClick: function (evt) {
            return evt;
        },

        /**
        * Initialize Issue wall
        * This method is public, it can be used to reInit the Issue wall.
        * @memberOf widgets/issue-wall/issue-wall
        */
        initIssueWall: function (config) {
            var x;
            if (config) {
                lang.mixin(this, config);
            }
            this.itemsList.featureLayerCount = this.featureLayerCount;
            this.selectedLayer = this.map.getLayer(this.operationalLayerId);
            this.itemsList.selectedLayer = this.selectedLayer;
            this.selectedGraphicsDisplayLayer = this.map.getLayer("Graphics" + this.operationalLayerId);
            //Clear list and selection before creating new issue list
            this.itemsList.clearList();
            //Set the Comments table flag to false
            this._hasCommentsTable = false;
            //Set the Likes flag to false
            this._hasLikes = false;
            this._getRelatedTableInfo();
            //Hide no issues warning message before fetching features from newly selected layer
            if (!domClass.contains(this.noIssuesMessage, "esriCTHidden")) {
                domClass.add(this.noIssuesMessage, "esriCTHidden");
            }
            for (x = 0; x < this.selectedLayer.fields.length; x++) {
                // if like field is present in the config file and the layer contains like field, set the flag to true
                if (this.appConfig.likeField && (this.selectedLayer.fields[x].name === this.appConfig.likeField)) {
                    this._hasLikes = true;
                }
            }
        },

        /**
        * Method will get related table info and check if any relationship exist for comments.
        * If Comments relationship exist as per the configured field then it will get the related table info for further use
        * Considering only the first related table although the layer has many related table
        * @memberOf widgets/issue-wall/issue-wall
        */
        _getRelatedTableInfo: function () {
            var relatedTableURL;
            // if comment field is present in config file and the layer contains related table, fetch the first related table URL
            if (this.selectedLayer.relationships && this.selectedLayer.relationships.length > 0) {
                // Construct the related table URL form operational layer URL and the related table id
                // We are considering only first related table although the layer has many related table.
                // Hence, we are fetching relatedTableId from relationships[0] ie:"operationalLayer.relationships[0].relatedTableId"
                relatedTableURL = this.selectedLayer.url.substr(0, this.selectedLayer.url.lastIndexOf('/') + 1) + this.selectedLayer.relationships[0].relatedTableId;
                this._commentsTable = new FeatureLayer(relatedTableURL);
                this.itemInfos = this.itemInfo;
                if (!this._commentsTable.loaded) {
                    on(this._commentsTable, "load", lang.hitch(this, function (evt) {
                        this._commentsTableLoaded();
                    }));
                } else {
                    this._commentsTableLoaded();
                }
            } else {
                this._createIssueList();
            }
        },

        _commentsTableLoaded: function () {
            var k, popupInfo = {};
            this._commentPopupTable = null;
            if (this.itemInfos && this.itemInfos.itemData.tables) {
                //fetch comment popup table which will be used in creating comment form
                array.some(this.itemInfos.itemData.tables, lang.hitch(this, function (currentTable) {
                    if (this._commentsTable && this._commentsTable.url) {
                        if (currentTable.url === this._commentsTable.url && currentTable.popupInfo) {
                            this._commentPopupTable = currentTable;
                            if (currentTable.layerDefinition && currentTable.layerDefinition.definitionExpression) {
                                this._commentsTable.setDefinitionExpression(currentTable.layerDefinition.definitionExpression);
                            }
                        }
                    }
                }));
            }

            //Check for the comment form configuration parameter and availability of commentField
            if (this._commentPopupTable) {
                if (!this.appConfig.usePopupConfigurationForComment) {
                    popupInfo = {};
                    popupInfo.fieldInfos = [];
                    popupInfo.mediaInfos = [];
                    popupInfo.showAttachments = false;
                    popupInfo.title = "";
                    for (k = 0; k < this._commentsTable.fields.length; k++) {
                        if (this._commentsTable.fields[k].name === this.appConfig.commentField && this._commentsTable.fields[k].editable && this._commentsTable.fields[k].type === "esriFieldTypeString") {
                            popupInfo.fieldInfos.push({
                                fieldName: this._commentsTable.fields[k].name,
                                format: null,
                                isEditable: this._commentsTable.fields[k].editable,
                                label: this._commentsTable.fields[k].alias,
                                stringFieldOption: "textarea",
                                tooltip: "",
                                visible: true
                            });
                            popupInfo.description = "{" + this.appConfig.commentField + "}" + "\n <div class='commentRow'></div>";
                            this._hasCommentsTable = true;
                            break;
                        }
                    }
                    this._commentPopupTable.popupInfo = popupInfo;
                } else {
                    if (this._commentPopupTable && this._commentPopupTable.popupInfo) {
                        // if popup information of related table has atleast one editable field comment flag will be set to true
                        for (k = 0; k < this._commentPopupTable.popupInfo.fieldInfos.length; k++) {
                            if (this._commentPopupTable.popupInfo.fieldInfos[k].isEditable) {
                                this._hasCommentsTable = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (!this._hasCommentsTable) {
                this._commentsTable = null;
            }
            this._createIssueList();
        },

        /**
        * Create Issue Wall
        * @memberOf widgets/issue-wall/issue-wall
        */
        _createIssueList: function () {
            var extentChangeFlag = false;
            this.selectedGraphicsLayer = this.map.getLayer("selectionGraphicsLayer");
            //set Layer Title in header
            domAttr.set(this.listContainerTitle, "innerHTML", this.operationalLayerDetails.title);
            domAttr.set(this.listContainerTitle, "title", this.operationalLayerDetails.title);
            //Show popup on click/hover of layer title div
            if (window.hasOwnProperty("ontouchstart") || window.ontouchstart !== undefined) {
                this._createTooltip(this.listContainerTitle, this.operationalLayerDetails.title);
            }
            this._loadFeatureLayer(this.selectedLayer, extentChangeFlag);
        },

        /**
        * Load feature layer and fetch the graphics from that layer
        * @param{object} operationalLayer
        * @memberOf widgets/issue-wall/issue-wall
        */
        _loadFeatureLayer: function (operationalLayer, extentChangeFlag) {
            domClass.toggle(this.listLoadingIndicator, "esriCTHidden");
            this.featureLayer = new FeatureLayer(operationalLayer.url);
            if (!this.featureLayer.loaded) {
                on(this.featureLayer, "load", lang.hitch(this, function (evt) {
                    setTimeout(lang.hitch(this, function () {
                        this._featureLayerLoaded(operationalLayer, extentChangeFlag);
                    }), 1000);
                }));
            } else {
                this._featureLayerLoaded(operationalLayer, extentChangeFlag);
            }
        },

        /**
        * Fetch issue details from the feature layer after the layer is loaded
        * @param{object} operationalLayer
        * @param{boolean} extentChangeFlag
        * @memberOf widgets/issue-wall/issue-wall
        */
        _featureLayerLoaded: function (operationalLayer, extentChangeFlag) {
            //If the layer is not visible at map scale the features might be loaded at previous scale,
            //so check if layer is visible at map scale then only update issue wall or else show no issues found message.
            if (operationalLayer.visibleAtMapScale || this.layerGraphicsArray.length > 0) {
                this._fetchIssueDetails(operationalLayer, extentChangeFlag);
            } else {
                this.itemsList.setItems([]);
                this.itemsList.clearList();
                domClass.remove(this.noIssuesMessage, "esriCTHidden");
                domClass.add(this.listLoadingIndicator, "esriCTHidden");
                if (!extentChangeFlag) {
                    domClass.remove(this.listContainer, "esriCTHidden");
                }
            }
        },

        /**
        * Fetch feature layer graphics and info popup header fields to be displayed in the list
        * @param{object} operationalLayer details
        * @param{object} extentChangeFlag - indicates if map extent has been changed
        * @memberOf widgets/issue-wall/issue-wall
        */
        _fetchIssueDetails: function (operationalLayer, extentChangeFlag) {
            var featureArray = [], flagObject = {};
            featureArray = this.layerGraphicsArray;
            flagObject.like = this._hasLikes;
            flagObject.comment = this._hasCommentsTable;
            flagObject.extentChange = extentChangeFlag;
            if (operationalLayer.hasAttachments && operationalLayer.infoTemplate && operationalLayer.infoTemplate.info && operationalLayer.infoTemplate.info.showAttachments) {
                flagObject.gallery = true;
            } else {
                flagObject.gallery = false;
            }
            this.actionVisibilities = {};
            this.actionVisibilities = flagObject;
            this._displayIssueList(featureArray, operationalLayer, flagObject, this._commentsTable);
        },

        /**
        * Display list of issues in right panel
        * @param{array} featureSet
        * @param{object} operationalLayer details
        * @param{object} flagObject for like icon,comments icon, extent change
        * @param{object} relatedTable - related table data
        * @memberOf widgets/issue-wall/issue-wall
        */
        _displayIssueList: function (featureSet, operationalLayer, flagObject, relatedTable) {
            // if extent change is not fired, clear list container and refresh issue list
            if (!flagObject.extentChange) {
                domClass.remove(this.listContainer, "esriCTHidden");
                flagObject.extentChange = false;
            }
            //  domConstruct.empty(this.listContainer);
            this.itemsList.clearList();
            domClass.add(this.noIssuesMessage, "esriCTHidden");
            // check if details exist in info popup
            if (this.operationalLayerDetails.popupInfo && featureSet.length > 0) {
                this._attachFeatureClickEvent();
                this.itemsList.showLikes = flagObject.like;
                this.itemsList.setItems(featureSet);
            } else {
                if (this.featureLayerCount !== 0) {
                    domAttr.set(this.noIssuesMessage, "innerHTML", this.appConfig.i18n.issueWall.noResultsFoundInCurrentBuffer);
                    this.itemsList.setItems(featureSet);
                } else {
                    domAttr.set(this.noIssuesMessage, "innerHTML", this.appConfig.i18n.issueWall.noResultsFound);
                }
                domClass.remove(this.noIssuesMessage, "esriCTHidden");
            }
            this.itemsList.show();
            domClass.add(this.listLoadingIndicator, "esriCTHidden");
        },

        /**
        * Show issue details on click of feature on map
        * @param{string} parentDiv
        * @param{object} statusParamObj
        * @memberOf widgets/issue-wall/issue-wall
        */
        _attachFeatureClickEvent: function () {
            if (this._layerClickHandler) {
                this._layerClickHandler.remove();
            }
            this._layerClickHandler = on(this.selectedGraphicsDisplayLayer, "click", lang.hitch(this, function (evt) {
                this.featureSelectedOnMapClick(evt.graphic);
            }));
        },

        /**
        * Show issue details on click of feature on map
        * @memberOf widgets/issue-wall/issue-wall
        */
        featureSelectedOnMapClick: function (item) {
            return item;
        },

        /**
        * Sort issue array
        * @param{object} a
        * @param{object} b
        * @memberOf widgets/issue-wall/issue-wall
        */
        _sortFeatureArray: function (a, b) {
            if (a.sortValue > b.sortValue) {
                return -1;
            }
            if (a.sortValue < b.sortValue) {
                return 1;
            }
            return 0;
        },

        /**
        * Show map view when user clicks on go to map icon in mobile view
        * @memberOf widgets/issue-wall/issue-wall
        */
        showMapViewOnLocate: function (evt) {
            return evt;
        },

        /**
        * Destroy instance
        * @memberOf widgets/issue-wall/issue-wall
        */
        destroyInstance: function () {
            this.destroy();
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
        }
    });
});
