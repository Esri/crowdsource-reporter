/*global define,dojo,dojoConfig,alert,moment */
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
    "dojo/Deferred",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/string",
    "dojo/query",
    "dojo/text!./templates/my-issues.html",
    "dojo/promise/all",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "esri/arcgis/utils",
    "esri/graphic",
    "esri/layers/FeatureLayer",
    "esri/tasks/QueryTask",
    "esri/tasks/query",
    "widgets/item-list/item-list"
], function (declare, Deferred, dom, domConstruct, domStyle, domAttr, domClass, array, lang, on, string, query, template, all, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, arcgisUtils, Graphic, FeatureLayer, QueryTask, Query, ItemList) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        opLayersArr: [],
        isNoFeatureFound: null,
        selectedFeature: null,
        relatedTables: [],

        /**
        * Initialize widget
        * @memberOf widgets/my-issues/my-issues
        */
        postCreate: function () {

            // placeAt triggers a startup call to _itemsList
            this.itemsList = new ItemList({
                "appConfig": this.appConfig,
                "linkToMapView": false,
                "appUtils": this.appUtils,
                "isMyIssues": true,
                "selectedLayer": this.selectedLayer
            }).placeAt(this.myIssuesListContainer);

            // Handles Click event on selected myIssues
            this.itemsList.summaryClick = lang.hitch(this, function (self, feat, evt) {
                feat.layerDetails = this.opLayersArr[this._getSelectedLayer(feat.webMapId, feat.layerId, feat.layerTitle)];
                this.selectedFeature = feat;
                this.onItemSelected(feat);
            });

            // Set the Like field name given as in configuration file
            this.itemsList.setLikeField(this.appConfig.likeField);
            domAttr.set(this.noIssuesMessage, "innerHTML", this.appConfig.i18n.myIssues.noResultsFound);
            domAttr.set(this.listBackButton, "title", this.appConfig.i18n.issueWall.gotoWebmapListTooltip);

            // Handles Click event on back button on My Reports Header panel
            this.own(on(this.listBackButton, "click", lang.hitch(this, function (evt) {
                this.onListCancel(evt);
            })));

            // create My Issue features array for creating My Issue list
            this._createMyIssuesLayerList();

            //on load hide the issue list
            this.hide();
        },

        /**
        * event to bind back button on list view
        * @memberOf widgets/my-issues/my-issues
        */
        onListCancel: function (evt) {
            return evt;
        },

        /**
        * Shows the domNode
        * @memberOf widgets/my-issues/my-issues
        */
        show: function () {
            domStyle.set(this.domNode, 'display', '');
        },

        /**
        * hides the domNode
        * @memberOf widgets/my-issues/my-issues
        */
        hide: function () {
            domStyle.set(this.domNode, 'display', 'none');
        },

        /**
        * When Issue is selected
        * @memberOf widgets/my-issues/my-issues
        */
        onItemSelected: function (feature) {
            return feature;
        },

        /**
        * Create My issues list
        * @memberOf widgets/my-issues/my-issues
        */
        _createMyIssuesLayerList: function () {
            var layerResponseDef = [];
            this.isNoFeatureFound = true;
            this.opLayersArr = [];
            this.listContainerTitle.innerHTML = this.appConfig.i18n.myIssues.title;
            domClass.toggle(this.listLoadingIndicator, "esriCTHidden");
            this.selectedGraphicsLayer = this.map.getLayer("selectionGraphicsLayer");
            // get all operational layer from all web maps
            layerResponseDef = this._getOperationalLayers();
            // if layers available in web-maps
            if (layerResponseDef) {
                this._getAllFeatures(layerResponseDef);
            }
        },

        /**
        * creates array of all the layer from all the web-maps
        * @memberOf widgets/my-issues/my-issues
        */
        _getOperationalLayers: function () {
            var webmapOpLayerArr, layerResponseDef = [], i, j, k, index = 0, likeFlag = false;
            this.relatedTables = [];
            // if web-map list found
            if (this.webmapList) {
                // loop to iterate all the web-maps to fetch all the layers from web-maps
                for (i = 0; i < this.webmapList.length; i++) {
                    webmapOpLayerArr = this.webmapList[i][1].itemInfo.itemData.operationalLayers;
                    if (this.webmapList[i][1].itemInfo.itemData.tables) {
                        for (k = 0; k < this.webmapList[i][1].itemInfo.itemData.tables.length; k++) {
                            this.relatedTables.push(this.webmapList[i][1].itemInfo.itemData.tables[k]);
                        }
                    }
                    // loop to iterate layers from web-map and push into layerResponseDef array
                    for (j = webmapOpLayerArr.length - 1; j >= 0; j--) {
                        // add layer to opLayersArr array, if it has configured reported by field to identify creator of issue
                        if (this.isFieldAvailable(webmapOpLayerArr[j].layerObject, this.appConfig.reportedByField)) {
                            webmapOpLayerArr[j].webmapId = this.webmapList[i][1].itemInfo.item.id;
                            // add layer index to identify layer in opLayersArr array
                            webmapOpLayerArr[j].layerIndex = index;
                            webmapOpLayerArr[j].webmapTitle = this.webmapList[i][1].itemInfo.item.title;
                            index++;
                            this.opLayersArr.push(webmapOpLayerArr[j]);
                            // to check if like field exist on layer and same as configured in application
                            // configuration file then set like flag to true
                            if (this.appConfig.likeField && this.isFieldAvailable(webmapOpLayerArr[j].layerObject, this.appConfig.likeField)) {
                                likeFlag = true;
                            }
                            layerResponseDef.push(this._queryOnLayer(webmapOpLayerArr[j], webmapOpLayerArr[j].webmapTitle, likeFlag));
                            likeFlag = false;
                        }
                    }
                }
            }
            return layerResponseDef;
        },

        /**
        * Check if configured field is available in layer
        * @param{object} layerObject is operational layer object
        * @param{object} fieldName is field name
        */
        isFieldAvailable: function (layerObject, fieldName) {
            var i, isFieldAvl = false;
            for (i = 0; i < layerObject.fields.length; i++) {
                if (layerObject.fields[i].name === fieldName) {
                    isFieldAvl = true;
                    break;
                }
            }
            return isFieldAvl;
        },

        /**
        * resolves the deferred object and push all the feature on layer object graphics
        * @memberOf widgets/my-issues/my-issues
        */
        _getAllFeatures: function (layerResponseDef) {
            var i;
            all(layerResponseDef).then(lang.hitch(this, function (featureSet) {
                // loop to assign all the featureSet to the layer graphics
                for (i = 0; i < featureSet.length; i++) {
                    this.opLayersArr[i].layerObject.graphics = featureSet[i];
                }
                this._updateFeaturesList();
                domClass.add(this.listLoadingIndicator, "esriCTHidden");
            }));
        },

        /**
        * Iterate the layerObject graphics loop and
        * push all the features in featureArray
        * @memberOf widgets/my-issues/my-issues
        */
        _updateFeaturesList: function () {
            var featureArray = [];
            // loop all the available layers to get the features list
            array.forEach(this.opLayersArr, lang.hitch(this, function (layer) {
                // loop to assign layers feature into featureArray
                array.forEach(layer.layerObject.graphics, lang.hitch(this, function (currentFeature) {
                    featureArray.push(currentFeature);
                }));
            }));
            // if featureArray length is grater than zero then pass into setItems method to create issue list
            // else show no records found
            if (featureArray.length > 0) {
                //If no issues are found in "My Reports" and user submits issue, add hidden class to no issues div.
                if (!domClass.contains(this.noIssuesMessage, "esriCTHidden")) {
                    domClass.add(this.noIssuesMessage, "esriCTHidden");
                }
                this.itemsList.setItems(featureArray);
            } else {
                domClass.remove(this.noIssuesMessage, "esriCTHidden");
            }
            this.itemsList.show();
        },

        /**
        * Update my issue list when new issue is added
        * @param{object} data contains layer info, on which new issue has reported
        * @param{object} updatedIssue contains details of feature, which has been updated.
        * @memberOf widgets/my-issues/my-issues
        */
        updateIssueList: function (data, updatedIssue) {
            var layerIndex, layerObject, likeFlag = false;
            if (data) {
                layerIndex = this._getSelectedLayer(data.webMapId, data.operationalLayerId, data.operationalLayerDetails.title);
                // layer index is not less than zero which means issue belongs to the logged in user
                if (layerIndex >= 0) {
                    layerObject = this.opLayersArr[layerIndex].layerObject;
                }
            }

            if (layerObject) {
                //if features is updated ie.like count is incremented from issue-details
                if (updatedIssue) {
                    // check if updated issue is reported by logged in user then only update the votes
                    if (updatedIssue.attributes[this.appConfig.reportedByField] === this.appConfig.logInDetails.processedUserName) {
                        //loop through all the features of selected layer and update the votes count for the selected feature
                        array.forEach(layerObject.graphics, lang.hitch(this, function (currentFeature) {
                            //update feature attributes of selected feature in my issues list
                            if (currentFeature.attributes[layerObject.objectIdField] === updatedIssue.attributes[layerObject.objectIdField]) {
                                currentFeature.attributes = updatedIssue.attributes;
                            }
                            this._updateFeaturesList();
                        }));
                    }
                } else if (this.isFieldAvailable(layerObject, this.appConfig.reportedByField)) {
                    // if feature is added from geoform, if layer has configured reported by field
                    if (this.appConfig.likeField && this.isFieldAvailable(layerObject, this.appConfig.likeField)) {
                        likeFlag = true;
                    }
                    this._queryOnLayer(data.operationalLayerDetails, this.opLayersArr[layerIndex].webmapTitle, likeFlag).then(lang.hitch(this, function (result) {
                        if (result) {
                            // update graphics array
                            layerObject.graphics = result;
                        }
                        this._updateFeaturesList();
                    }));
                }
            }
        },

        /**
        * Get instance of layer
        * @param{object} webmapId is the id of selected web-map for reported issue
        * @param{object} layerId is the id of layer on which issue has reported
        * @param{object} layerTitle is the title of layer on which issue has reported
        * @memberOf widgets/my-issues/my-issues
        */
        _getSelectedLayer: function (webmapId, layerId, layerTitle) {
            var opLayerIndex, i;
            opLayerIndex = -1;
            // loop to get the index number of my reports issues in respective layer and webmap
            for (i = 0; i < this.opLayersArr.length; i++) {
                if (this.opLayersArr[i].webmapId === webmapId && this.opLayersArr[i].layerObject.id === layerId && this.opLayersArr[i].title === layerTitle) {
                    opLayerIndex = this.opLayersArr[i].layerIndex;
                    break;
                }
            }
            return opLayerIndex;
        },

        /**
        * Query layer to get updated issue list
        * @param{object} layerObject is operational layer object
        * @memberOf widgets/my-issues/my-issues
        */
        _queryOnLayer: function (opLayer, webmaptitle, likeFlag) {
            var queryTask, deferred, parameters, queryString, dateobj = new Date().getTime().toString();
            deferred = new Deferred();
            parameters = new Query();
            // query with configured reported by field to get list of issues reported by logged in user
            queryString = this.appConfig.reportedByField + "='" + this.appConfig.logInDetails.processedUserName + "' AND " + dateobj + "=" + dateobj;

            // add layer definition in query parameters if it is available in layer object
            if (opLayer.layerObject.defaultDefinitionExpression) {
                queryString += " AND " + opLayer.layerObject.defaultDefinitionExpression;
            }

            parameters.where = queryString;
            parameters.outFields = ["*"];
            parameters.returnGeometry = true;
            //initialize query task
            queryTask = new QueryTask(opLayer.url);
            queryTask.execute(parameters, lang.hitch(this, function (response) {
                this.fetchRelatedTableInfo(response.features, webmaptitle, likeFlag, deferred, opLayer);
            }), function (err) {
                deferred.resolve();
            });
            return deferred;
        },

        /**
        * @param{object} features response came from queried layer
        * @param{string} web-map title is operational layer object
        * @param{boolean} likeFlag
        * @param{object} opLayer is operational layer object
        * @memberOf widgets/my-issues/my-issues
        */
        fetchRelatedTableInfo: function (features, webmaptitle, likeFlag, deferred, opLayer) {
            var allFeaturesAray = [], featureDef = new Deferred(), layerId, lastIndex, layer, relatedTableURL, relatedTable;
            // function to sort features order by objectIdField
            function sortByOID(a, b) {
                if (a.attributes[opLayer.layerObject.objectIdField] > b.attributes[opLayer.layerObject.objectIdField]) {
                    return -1;  // order a before b
                }
                if (a.attributes[opLayer.layerObject.objectIdField] < b.attributes[opLayer.layerObject.objectIdField]) {
                    return 1;  // order b before a
                }
                return 0;  // a & b have same date, so relative order doesn't matter
            }
            // Sort by descending OID order
            features.sort(sortByOID);
            // loop to iterate all the feature and push the details of like, comment, gallary flag value
            // also stores the webmap title , layerObject and layer title information in feature
            array.forEach(features, lang.hitch(this, function (currentFeature) {
                currentFeature.webMapTitle = webmaptitle;
                currentFeature.showLikes = likeFlag;
                currentFeature.webMapId = opLayer.webmapId;
                currentFeature.layerId = opLayer.id;
                currentFeature.layerTitle = opLayer.title;
                currentFeature._layer = opLayer.layerObject;
                currentFeature.originalFeature = currentFeature;
                // if attachment flag is true on layer then set gallary flag true
                // in features which will show gallry button in detail view
                if (currentFeature._layer.hasAttachments && currentFeature._layer.infoTemplate && currentFeature._layer.infoTemplate.info && currentFeature._layer.infoTemplate.info.showAttachments) {
                    currentFeature.gallery = true;
                } else {
                    currentFeature.gallery = false;
                }

                // if relationships field exist on layer and in relationships table comment avilable
                // and comment field given in configuration file then it will set comments flag true
                // in feature set
                if (currentFeature && currentFeature._layer.relationships && currentFeature._layer.relationships.length > 0) {
                    layerId = currentFeature._layer.relationships[0].relatedTableId;
                    lastIndex = currentFeature._layer.url.lastIndexOf('/');
                    layer = currentFeature._layer.url.substr(0, lastIndex + 1);
                    relatedTableURL = layer + layerId;
                    relatedTable = new FeatureLayer(relatedTableURL);
                    this.itemInfos = this.itemInfo;
                    if (!relatedTable.loaded) {
                        on(relatedTable, "load", lang.hitch(this, function (evt) {
                            allFeaturesAray.push(this._relatedTableLoaded(evt.layer, currentFeature, featureDef));
                        }));
                    } else {
                        allFeaturesAray.push(this._relatedTableLoaded(relatedTable, currentFeature, featureDef));
                    }
                } else {
                    currentFeature.commentFlag = false;
                    allFeaturesAray.push(featureDef.resolve());
                }
            }));

            all(allFeaturesAray).then(lang.hitch(this, function () {
                deferred.resolve(features);
            }), function (err) {
                deferred.resolve();
            });
            return featureDef;
        },

        /**
        * @param{object} currentFeature response came from queried layer
        * @param{object} relatedTable response came from queried layer
        * @memberOf widgets/my-issues/my-issues
        */
        _relatedTableLoaded: function (relatedTable, currentFeature, featureDef) {
            var commentIconFlag = false, k, popupInfo = {};
            this._commentPopupTable = null;
            if (this.itemInfos && this.relatedTables.length > 0) {
                //fetch comment popup table which will be used in creating comment form
                array.some(this.relatedTables, lang.hitch(this, function (currentTable) {
                    if (relatedTable && relatedTable.url) {
                        if (currentTable.url === relatedTable.url && currentTable.popupInfo) {
                            this._commentPopupTable = currentTable;
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
                    for (k = 0; k < relatedTable.fields.length; k++) {
                        if (relatedTable.fields[k].name === this.appConfig.commentField && relatedTable.fields[k].editable && relatedTable.fields[k].type === "esriFieldTypeString") {
                            popupInfo.fieldInfos.push({
                                fieldName: relatedTable.fields[k].name,
                                format: null,
                                isEditable: relatedTable.fields[k].editable,
                                label: relatedTable.fields[k].alias,
                                stringFieldOption: "textarea",
                                tooltip: "",
                                visible: true
                            });
                            popupInfo.description = "{" + this.appConfig.commentField + "}" + "\n <div class='commentRow'></div>";
                            commentIconFlag = true;
                            break;
                        }
                    }
                    this._commentPopupTable.popupInfo = popupInfo;
                } else {
                    if (this._commentPopupTable.popupInfo) {
                        // if popup information of related table has atleast one editable field comment flag will be set to true
                        for (k = 0; k < this._commentPopupTable.popupInfo.fieldInfos.length; k++) {
                            if (this._commentPopupTable.popupInfo.fieldInfos[k].isEditable) {
                                commentIconFlag = true;
                                break;
                            }
                        }
                    }
                }
            }
            currentFeature.commentFlag = commentIconFlag;
            currentFeature.relatedTable = relatedTable;
            currentFeature.commentPopupTable = this._commentPopupTable;
            featureDef.resolve(currentFeature);
        },

        /**
        * returns the object of likes and comments flag
        * @param{item} item is operational layer object
        * @memberOf widgets/my-issues/my-issues
        */
        setActionVisibilities: function (item) {
            var actionVisibilities = {};
            actionVisibilities.like = item.showLikes;
            actionVisibilities.comment = item.commentFlag;
            actionVisibilities.commentTable = item.relatedTable;
            actionVisibilities.commentPopupTable = item.commentPopupTable;
            actionVisibilities.gallery = item.gallery;
            return actionVisibilities;
        },

        /**
        * update myissues widget and item list with current layer
        * @param{item} operational layer object
        * @memberOf widgets/my-issues/my-issues
        */
        updateLayer: function (selectedLayer) {
            this.selectedLayer = selectedLayer;
            if (this.itemsList) {
                this.itemsList.selectedLayer = selectedLayer;
            }
        },

        /**
        * update myissues widget and item list after feature is deleted
        * @param{feature} deleted feature
        * @param{selectedMapDetails} selected map details
        * @memberOf widgets/my-issues/my-issues
        */
        updateMyIssuesList: function (feature, selectedMapDetails) {
            var layerIndex, objectIdField;
            layerIndex = this._getSelectedLayer(selectedMapDetails.webMapId, selectedMapDetails.operationalLayerId,
                selectedMapDetails.operationalLayerDetails.title);
            objectIdField = selectedMapDetails.operationalLayerDetails.layerObject.objectIdField;
            // layer index is not less than zero which means issue belongs to the logged in user
            if (layerIndex >= 0) {
                array.some(this.opLayersArr[layerIndex].layerObject.graphics, lang.hitch(this, function (currentFeature, index) {
                    if (currentFeature.attributes[objectIdField] === feature.attributes[objectIdField]) {
                        this.opLayersArr[layerIndex].layerObject.graphics.splice(index, 1);
                        this._updateFeaturesList();
                    }
                }));
            }
        }
    });
});