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
    "dojo/on",
    "dojo/string",
    "dojo/query",
    "dojo/text!./templates/issue-wall.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "esri/graphic",
    "esri/layers/FeatureLayer",
    "esri/tasks/query",
    "widgets/item-list/item-list",
    "dojo/_base/event"
], function (declare, dom, domConstruct, domStyle, domAttr, domClass, lang, on, string, query, template, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Graphic, FeatureLayer, Query, ItemList, event) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        extentChangeHandler: null,
        _hasCommentsTable: false,
        _commentsTable: null,
        _layerClickHandler: null,
        itemsList: null,
        selectedLayer: null,

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
            // Items list
            this.itemsList = new ItemList({
                "appConfig": this.appConfig,
                "linkToMapView": true
            }).placeAt(this.listContainer); // placeAt triggers a startup call to _itemsList

            this.itemsList.summaryClick = lang.hitch(this, function (self, feat, evt) {
                this.onItemSelected(feat);
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
                this.onSubmit(evt);
            })));

            var submitButtonColor = (this.appConfig && this.appConfig.submitReportButtonColor) ? this.appConfig.submitReportButtonColor : "#35ac46";
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


        /**
        * Initialize Issue wall
        * This method is public, it can be used to reInit the Issue wall.
        * @memberOf widgets/issue-wall/issue-wall
        */
        initIssueWall: function (config) {
            if (config) {
                lang.mixin(this, config);
            }
            this.selectedLayer = this.map.getLayer(this.operationalLayerId);
            this.itemsList.clearSelection();
            //Set the Comments table flag to false
            this._hasCommentsTable = false;
            this._getRelatedTableInfo();
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
            if (this.appConfig.commentField && this.selectedLayer.relationships.length > 0) {
                // Construct the related table URL form operational layer URL and the related table id
                // We are considering only first related table although the layer has many related table.
                // Hence, we are fetching relatedTableId from relationships[0] ie:"operationalLayer.relationships[0].relatedTableId"
                relatedTableURL = this.selectedLayer.url.substr(0, this.selectedLayer.url.lastIndexOf('/') + 1) + this.selectedLayer.relationships[0].relatedTableId;
                this._commentsTable = new FeatureLayer(relatedTableURL);
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
            var k;
            // if the related table contains comment field set commentIconFlag to true
            for (k = 0; k < this._commentsTable.fields.length; k++) {
                if (this._commentsTable.fields[k].name === this.appConfig.commentField) {
                    this._hasCommentsTable = true;
                    break;
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
            this._loadFeatureLayer(this.selectedLayer, extentChangeFlag);
            if (this.extentChangeHandler) {
                this.extentChangeHandler.remove();
            }
            this.extentChangeHandler = this.map.on("extent-change", lang.hitch(this, function () {
                extentChangeFlag = true;
                this._loadFeatureLayer(this.selectedLayer, extentChangeFlag);
            }));
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
            if (operationalLayer.visibleAtMapScale) {
                this._fetchIssueDetails(operationalLayer, extentChangeFlag);
            } else {
                domConstruct.empty(this.listContainer);
                domConstruct.create("div", {
                    "innerHTML": this.appConfig.i18n.issueWall.noResultsFound,
                    "class": "esriCTNoIssuesDiv"
                }, this.listContainer);
                domClass.toggle(this.listLoadingIndicator, "esriCTHidden");
                if (!extentChangeFlag) {
                    domConstruct.empty(this.listDetailedContainer);
                    domClass.add(this.listDetailedContainer, "esriCTHidden");
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
            var graphicsInExtent = [], j, x, featureArray = [], likeFlag = false, fields, fieldValue, objectIdFieldValue, flagObject = {};
            for (j = 0; j < operationalLayer.graphics.length; j++) {
                // fetch only the features present in current map extent
                if (this.map.extent.intersects(operationalLayer.graphics[j].geometry)) {
                    for (fields in operationalLayer.graphics[j].attributes) {
                        if (operationalLayer.graphics[j].attributes.hasOwnProperty(fields)) {
                            if (operationalLayer.graphics[j].attributes[fields] === null || operationalLayer.graphics[j].attributes[fields] === "") {
                                operationalLayer.graphics[j].attributes[fields] = this.appConfig.showNullValueAs;
                            }
                        }
                    }
                    for (x = 0; x < operationalLayer.fields.length; x++) {
                        // get object id field from the layer
                        objectIdFieldValue = operationalLayer.graphics[j].attributes[operationalLayer.objectIdField];
                        // if like field is present in the config file and the layer contains like field, set the flag to true
                        if (this.appConfig.likeField && (operationalLayer.fields[x].name === this.appConfig.likeField)) {
                            likeFlag = true;
                        }
                    }

                    // perform sorting based on object id field
                    if (objectIdFieldValue) {
                        fieldValue = objectIdFieldValue;
                    }
                    featureArray.push({
                        "graphic": operationalLayer.graphics[j],
                        "sortValue": fieldValue
                    });
                    graphicsInExtent.push(operationalLayer.graphics[j]);
                }
            }
            // Sort feature array
            featureArray.sort(this._sortFeatureArray);
            flagObject.like = likeFlag;
            flagObject.comment = this._hasCommentsTable;
            flagObject.extentChange = extentChangeFlag;
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
                domConstruct.empty(this.listDetailedContainer);
                domClass.add(this.listDetailedContainer, "esriCTHidden");
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
                this.itemsList.show();
            } else {
                domClass.remove(this.noIssuesMessage, "esriCTHidden");
            }
            domClass.toggle(this.listLoadingIndicator, "esriCTHidden");
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
            this._layerClickHandler = on(this.selectedLayer, "click", lang.hitch(this, function (evt) {
                this.featureSelectedOnMapClick(evt.graphic);
            }));
        },

        /**
        * Show issue details on click of feature on map
        * @memberOf widgets/issue-wall/issue-wall
        */
        featureSelectedOnMapClick: function () {
            return;
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

        /*
        Event to be generated on issue Updated
        */
        onIssueUpdated: function (updatedFeature) {
            return updatedFeature;
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
        }
    });
});