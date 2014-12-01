/*global define,document,location,require,alert,console,dojo,$,setTimeout,moment,dojoConfig*/
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
define(["dojo/_base/declare",
    "dojo/_base/lang",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/webmap-list.html",
    "dojo/dom-construct",
    "dojo/DeferredList",
    "esri/arcgis/utils",
    "dojo/text!./templates/webmap-item.html",
    "dojo/text!./templates/operational-layer.html",
    "dojo/_base/event",
    "dojo/string",
    "dojo/dom-attr",
    "dojo/on",
    "esri/layers/FeatureLayer",
    "dojo/dom",
    "dojo/dom-class",
    "dijit/_WidgetsInTemplateMixin"
    ], function (
    declare,
    lang,
    _WidgetBase,
    _TemplatedMixin,
    dijitTemplate,
    domConstruct,
    DeferredList,
    arcgisUtils,
    webMapItemTemplate,
    operationalLayerTemplate,
    event,
    string,
    domAttr,
    on,
    FeatureLayer,
    dom,
    domClass,
    _WidgetsInTemplateMixin
) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: dijitTemplate,
        filteredWebMapResponseArr: [],
        lastWebMapSelected: "", // used to store last web map that is selected
        map: null,
        options: {},
        configData: {},
        mapDivID: "webMapListMapDiv",
        webMapDescriptionFields: {},
        lastSelectedWebMapExtent: null,

        /**
        * This function is called when widget is constructed.
        * @param{object} options to be mixed
        * @param{object} source reference node
        * @memberOf widgets/webmap-list/webmap-list
        */
        constructor: function (options, srcRefNode) {
            lang.mixin(this, options);
        },

        /**
        * This function is called on startup of widget.
        * @memberOf widgets/webmap-list/webmap-list
        */
        startup: function () {
            try {
                this._createFilteredWebMapArr();
            } catch (err) {
                dojo.applicationUtils.showError(err.message);
            }
        },

        /**
        * This function is used to create web map item info array.
        * @memberOf widgets/webmap-list/webmap-list
        */
        _createFilteredWebMapArr: function () {
            try {
                var i, itemInfo, requestArray = [],
                    dl, results = this.configData.groupItems.results;
                for (i = 0; i < results.length; i++) {
                    itemInfo = results[i];
                    // Set the itemInfo config option. This can be used when calling createMap instead of the webmap id
                    if (itemInfo.type === "Web Map") {
                        requestArray.push(this._createMap(itemInfo.id, "webMapListMapDiv"));
                    }
                }
                dl = new DeferredList(requestArray);
                dl.then(lang.hitch(this, function (response) {
                    this._validateWebMap(response);
                    if (this.filteredWebMapResponseArr.length > 0) {
                        this._createMap(this.filteredWebMapResponseArr[0][1].itemInfo.item.id, this.mapDivID).then(lang.hitch(this, function (response) {
                            this.lastSelectedWebMapExtent = response.map.extent;
                            this._createWebMapListUI();
                        }));
                    } else {
                        this.noMapsFound();
                    }
                }));
            } catch (err) {
                dojo.applicationUtils.showError(err.message);
            }
        },

        /**
        * This function is used when there is no web map to display
        * @memberOf widgets/webmap-list/webmap-list
        */
        noMapsFound: function () {
            return true;
        },

        /**
        * This function is used to create map
        * @param{string} web-map ID
        * @param{string} map container ID
        * @memberOf widgets/webmap-list/webmap-list
        */
        _createMap: function (webMapID, mapDivID) {
            try {
                domConstruct.empty(mapDivID);
                var webMapInstance = arcgisUtils.createMap(webMapID, mapDivID, {
                    ignorePopups: true,
                    editable: this.configData.editable,
                    bingMapsKey: this.configData.bingKey
                });
                webMapInstance.then(lang.hitch(this, function (response) {
                    this.map = response.map;
                }));
                return webMapInstance;
            } catch (err) {
                dojo.applicationUtils.showError(err.message);
            }
        },

        /**
        * This function is used to validate web map.
        * @param{object} response of web-map created
        * @memberOf widgets/webmap-list/webmap-list
        */
        _validateWebMap: function (response) {
            try {
                var i, editableOperationalLayerCount, j;
                for (i = 0; i < response.length; i++) {
                    if (response[i][0] && response[i][1].itemInfo.itemData.operationalLayers.length > 0) {
                        editableOperationalLayerCount = 0;
                        for (j = 0; j < response[i][1].itemInfo.itemData.operationalLayers.length; j++) {
                            if (response[i][1].itemInfo.itemData.operationalLayers[j].resourceInfo) {
                                if (this._validateLayerCapabilities(response[i][1].itemInfo.itemData.operationalLayers[j].resourceInfo.capabilities)) {
                                    editableOperationalLayerCount++;
                                }
                            }
                        }
                        if (editableOperationalLayerCount > 0) {
                            this.filteredWebMapResponseArr.push(response[i]);
                        }
                    }
                }
            } catch (err) {
                dojo.applicationUtils.showError(err.message);
            }
        },

        /**
        * This function is used to create description info.
        * @param{object} web map item
        * @memberOf widgets/webmap-list/webmap-list
        */
        _createWebMapDescription: function (webMapItem) {
            var descriptionInfo = "",
                field,
                value = "";
            for (field in this.webMapDescriptionFields) {
                if (this.webMapDescriptionFields.hasOwnProperty(field)) {
                    if (this.webMapDescriptionFields[field]) {
                        if (field === "created" || field === "modified") {
                            value = webMapItem.itemInfo.item[field] ? (moment(webMapItem.itemInfo.item[field])).format('MM-DD-YYYY') : this.configData.showNullValueAs;
                        } else {
                            value = webMapItem.itemInfo.item[field] || "";
                        }
                        descriptionInfo += "<b>" + this.configData.i18n.webMapList[field] + "</b> <br>" + value + "<br>";
                    }
                }
            }
            return descriptionInfo;
        },

        /**
        * This function is used to highlight selected web map
        * @param{string} selected web map ID
        * @memberOf widgets/webmap-list/webmap-list
        */
        _selectWebMapItem: function (selectedWebMapID) {
            if ($('div[webMapID="' + this.lastWebMapSelected + '"]').length > 0) {
                dojo.replaceClass($('div[webMapID="' + this.lastWebMapSelected + '"]')[0], "esriCTWebMapBorder", "esriCTBorder");
            }
            if ($('div[webMapID="' + selectedWebMapID + '"]').length > 0) {
                dojo.replaceClass($('div[webMapID="' + selectedWebMapID + '"]')[0], "esriCTBorder", "esriCTWebMapBorder");
            }
            this.lastWebMapSelected = selectedWebMapID;
        },

        /**
        * This function is used to create UI for web map list.
        * @memberOf widgets/webmap-list/webmap-list
        */
        _createWebMapListUI: function () {
            try {
                var parentDiv, i, templateString, thumbnailSrc = "",
                    tokenString,
                    infoDescription = "",
                    editCapabilityLayerCount;
                for (i = 0; i < this.filteredWebMapResponseArr.length; i++) {
                    editCapabilityLayerCount = this._fetchEditableLayerCount(this.filteredWebMapResponseArr[i][1]);
                    //set token for private groups to fetch thumbnail
                    if (this.filteredWebMapResponseArr[i][1].itemInfo.item.thumbnail) {
                        tokenString = "";
                        if (this.configData.logInDetails.token) {
                            tokenString = "?token=" + this.configData.logInDetails.token;
                        }
                        thumbnailSrc = this.configData.sharinghost + "/sharing/rest/content/items/" + this.filteredWebMapResponseArr[i][1].itemInfo.item.id + "/info/" + this.filteredWebMapResponseArr[i][1].itemInfo.item.thumbnail + tokenString;
                    } else {
                        if (this.configData.noThumbnailIcon && lang.trim(this.configData.noThumbnailIcon).length !== 0) {
                            if (this.configData.noThumbnailIcon.indexOf("http") === 0) {
                                thumbnailSrc = this.configData.noThumbnailIcon;
                            } else {
                                if (this.configData.noThumbnailIcon.indexOf("/") === 0) {
                                    thumbnailSrc = dojoConfig.baseURL + this.configData.noThumbnailIcon;
                                } else {
                                    thumbnailSrc = dojoConfig.baseURL + "/" + this.configData.noThumbnailIcon;
                                }
                            }
                        } else {
                            thumbnailSrc = dojoConfig.baseURL + "/images/no-thumbnail.png";
                        }
                    }
                    infoDescription = this._createWebMapDescription(this.filteredWebMapResponseArr[i][1]);
                    templateString = string.substitute(webMapItemTemplate, {
                        WebmapThumbnail: thumbnailSrc,
                        WebmapTitle: this.filteredWebMapResponseArr[i][1].itemInfo.item.title,
                        InfoDescription: infoDescription
                    });

                    if (i % 2 !== 0) {
                        parentDiv = domConstruct.toDom(templateString).childNodes[2];
                    } else {
                        parentDiv = domConstruct.toDom(templateString).childNodes[0];
                    }
                    $(parentDiv).addClass("esriCTDisplayWebMapTemplate esriCTWebMapBorder");
                    domAttr.set(parentDiv, "webMapID", this.filteredWebMapResponseArr[i][1].itemInfo.item.id);
                    if ((this.filteredWebMapResponseArr[i][1].itemInfo.itemData.operationalLayers.length > 1) && (editCapabilityLayerCount > 1)) {
                        domAttr.set(parentDiv, "displayOperationalLayerList", true);
                        this._handleWebMapClick(parentDiv, null);
                    } else {
                        domAttr.set(parentDiv, "displayOperationalLayerList", false);
                        domAttr.set(parentDiv, "operationalLayerID", this.filteredWebMapResponseArr[i][1].itemInfo.itemData.operationalLayers[0].id);
                        this._handleWebMapClick(parentDiv, this.filteredWebMapResponseArr[i][1].itemInfo.itemData.operationalLayers[0]);
                    }
                    this.esriCTWebMapListParentDiv.appendChild(parentDiv);
                    this._attachInformationClick(infoDescription, parentDiv);
                    if ((this.filteredWebMapResponseArr[i][1].itemInfo.itemData.operationalLayers.length > 1) && (editCapabilityLayerCount > 1)) {
                        this._sortOperationalLayer(i);
                        this._createOperationalLayerList(dojo.query('.esriCTLayerList', parentDiv)[0], this.filteredWebMapResponseArr[i][1], i);
                    }
                }
                //by default load first webmap and its first layer
                if (this.filteredWebMapResponseArr.length > 0) {
                    this._displaySelectedOperationalLayer(this.filteredWebMapResponseArr[0][1].itemInfo.item.id, this.filteredWebMapResponseArr[0][1].itemInfo.itemData.operationalLayers[0].id, this.filteredWebMapResponseArr[0][1].itemInfo.itemData.operationalLayers[0]);
                    //by default select first webmap in list
                    this._selectWebMapItem(this.filteredWebMapResponseArr[0][1].itemInfo.item.id);
                }
            } catch (err) {
                dojo.applicationUtils.showError(err.message);
            }
        },

        /**
        * This function is used to get count of layer having edit capabilities
        * @param{object} web-map
        * @memberOf widgets/webmap-list/webmap-list
        */
        _fetchEditableLayerCount: function (webMap) {
            try {
                var count = 0,
                    i;
                for (i = 0; i < webMap.itemInfo.itemData.operationalLayers.length; i++) {
                    if (this._validateLayerCapabilities(webMap.itemInfo.itemData.operationalLayers[i].resourceInfo.capabilities)) {
                        count++;
                    }
                }
                return count;
            } catch (err) {
                dojo.applicationUtils.showError(err.message);
            }
        },

        /**
        * This function is used to hide layer
        * @param{string} web-map ID
        * @param{string} operational layer ID
        * @param{object} operational layer details
        * @memberOf widgets/webmap-list/webmap-list
        */
        _displaySelectedOperationalLayer: function (webMapID, layerID, layerDetails) {
            try {
                var layer, featureLayer;
                if (this.map) {
                    for (layer in this.map._layers) {
                        if (this.map._layers.hasOwnProperty(layer)) {
                            if (this.map._layers[layer].type) {
                                if (this.map._layers[layer].type === "Feature Layer") {
                                    if (this.map._layers[layer].id !== layerID) {
                                        this.map._layers[layer].hide();
                                    } else {
                                        this.map._layers[layer].show();
                                        featureLayer = new FeatureLayer(this.map._layers[layer].url);
                                        this._onFeatureLayerLoad(featureLayer, webMapID, layerID, layerDetails);
                                    }
                                }
                            }
                        }
                    }
                } else {
                    dojo.applicationUtils.hideLoadingIndicator();
                }
            } catch (err) {
                dojo.applicationUtils.showError(err.message);
            }
        },

        /**
        * This function is used to process execution on load of feature layer
        * @param{object} feature layer to attach on-load event
        * @param{string} web map ID
        * @param{string} operational layer ID
        * @param{object} operational layer details
        * @memberOf widgets/webmap-list/webmap-list
        */
        _onFeatureLayerLoad: function (featureLayer, webMapID, layerID, layerDetails) {
            try {
                on(featureLayer, "load", lang.hitch(this, function () {
                    setTimeout(lang.hitch(this, function () {
                        this.OnOperationalLayerSelected({
                            "map": this.map,
                            "webMapId": webMapID,
                            "operationalLayerId": layerID,
                            "operationalLayerDetails": layerDetails
                        });
                        dojo.applicationUtils.hideLoadingIndicator();
                    }), 500);
                }));
                on(featureLayer, "error", lang.hitch(this, function (evt) {
                    dojo.applicationUtils.showError(evt.error.message);
                }));
            } catch (err) {
                dojo.applicationUtils.showError(err.message);
            }
        },

        /**
        * This function is used to handle web map click
        * @param{object} parent div container in which web-map list will be added
        * @param{object} details of operational layer
        * @memberOf widgets/webmap-list/webmap-list
        */
        _handleWebMapClick: function (parentDiv, operationalLayerDetails) {
            try {
                dojo.applicationUtils.showLoadingIndicator();
                var webMapId, selectedWebMapList, operationalLayerId, descriptionDiv;
                on(parentDiv, "click", lang.hitch(this, function (evt) {
                    dojo.applicationUtils.showLoadingIndicator();
                    webMapId = domAttr.get(evt.currentTarget, "webMapID");
                    if (domAttr.get(evt.currentTarget, "displayOperationalLayerList") === true) {
                        selectedWebMapList = dom.byId(webMapId);
                        if (domClass.contains(selectedWebMapList, "esriCTDisplayList")) {
                            dojo.replaceClass(selectedWebMapList, "esriCTHidden", "esriCTDisplayList");
                        } else {
                            descriptionDiv = dojo.query('.esriCTDescription', selectedWebMapList.parentElement.parentElement)[0];
                            if (descriptionDiv) {
                                dojo.replaceClass(descriptionDiv, "esriCTHidden", "esriCTDisplayList");
                            }
                            dojo.replaceClass(selectedWebMapList, "esriCTDisplayList", "esriCTHidden");
                        }
                        dojo.applicationUtils.hideLoadingIndicator();
                    } else {
                        if (this.lastWebMapSelected !== webMapId) {
                            this._selectWebMapItem(webMapId);
                            operationalLayerId = domAttr.get(evt.currentTarget, "operationalLayerID");
                            this._createMap(webMapId, this.mapDivID).then(lang.hitch(this, function () {
                                this._displaySelectedOperationalLayer(webMapId, operationalLayerId, operationalLayerDetails);
                            }));
                        } else {
                            dojo.applicationUtils.hideLoadingIndicator();
                        }
                    }
                }));
            } catch (err) {
                dojo.applicationUtils.showError(err.message);
            }
        },

        /**
        * This function is used to sort operational layer according to name
        * @param{int} index where concerned operational layer resides
        * @memberOf widgets/webmap-list/webmap-list
        */
        _sortOperationalLayer: function (index) {
            try {
                this.filteredWebMapResponseArr[index][1].itemInfo.itemData.operationalLayers.sort(function (a, b) {
                    var titleA = a.title.toLowerCase(),
                        titleB = b.title.toLowerCase();
                    if (titleA < titleB) {
                        return -1;
                    }
                    if (titleA > titleB) {
                        return 1;
                    }
                    return 0;
                });
            } catch (err) {
                dojo.applicationUtils.showError(err.message);
            }
        },

        /**
        * This function is used to add operational layer in list
        * @param{object} parent container in which operational layer list will be added
        * @param{object} details of web map
        * @memberOf widgets/webmap-list/webmap-list
        */
        _createOperationalLayerList: function (parentContainer, webMap, index) {
            try {
                var i, parentListNode, childListNode, operationalLayerString;
                parentListNode = domConstruct.create("div", {
                    "class": "esriCTHidden",
                    "id": webMap.itemInfo.item.id
                });
                for (i = 0; i < webMap.itemInfo.itemData.operationalLayers.length; i++) {
                    if (this._validateLayerCapabilities(webMap.itemInfo.itemData.operationalLayers[i].resourceInfo.capabilities)) {
                        operationalLayerString = string.substitute(operationalLayerTemplate, {
                            OperationalLayerTitle: webMap.itemInfo.itemData.operationalLayers[i].title
                        });
                        childListNode = domConstruct.toDom(operationalLayerString);
                        domAttr.set(childListNode, "webMapID", webMap.itemInfo.item.id);
                        domAttr.set(childListNode, "operationalLayerID", webMap.itemInfo.itemData.operationalLayers[i].id);
                        this._handleOperationalLayerClick(childListNode, webMap.itemInfo.itemData.operationalLayers[i]);
                        parentListNode.appendChild(childListNode);
                    }
                }
                on(parentListNode, "click", lang.hitch(this, function (evt) {
                    event.stop(evt);
                }));
                parentContainer.appendChild(parentListNode);
            } catch (err) {
                dojo.applicationUtils.showError(err.message);
            }
        },

        /**
        * This function is used to handle operational layer click.
        * @param{object} operational layer node
        * @param{object} operational layer details
        * @memberOf widgets/webmap-list/webmap-list
        */
        _handleOperationalLayerClick: function (childListNode, operationalLayerDetails) {
            try {
                var operationalLayerId;
                on(childListNode, "click", lang.hitch(this, function (evt) {
                    event.stop(evt);
                    dojo.applicationUtils.showLoadingIndicator();
                    var webMapId = domAttr.get(evt.currentTarget, "webMapID");
                    operationalLayerId = domAttr.get(evt.currentTarget, "operationalLayerID");
                    if (this.lastWebMapSelected !== webMapId) {

                        this._selectWebMapItem(webMapId);
                        this._createMap(webMapId, this.mapDivID).then(lang.hitch(this, function (response) {
                            this._displaySelectedOperationalLayer(webMapId, operationalLayerId, operationalLayerDetails);
                            this.lastSelectedWebMapExtent = response.map.extent;
                        }));
                    } else {
                        this._displaySelectedOperationalLayer(webMapId, operationalLayerId, operationalLayerDetails);
                        this.map.setExtent(this.lastSelectedWebMapExtent);
                    }
                }));
            } catch (err) {
                dojo.applicationUtils.showError(err.message);
            }
        },

        /**
        * This function is used to handle information click
        * @param{object} information of web map
        * @param{object} web-map item div container
        * @memberOf widgets/webmap-list/webmap-list
        */
        _attachInformationClick: function (information, parentDiv) {
            var infoIcon, descriptionDiv, webMapId, layerList;
            infoIcon = dojo.query('.esriCTInfoImg', parentDiv)[0];
            if (lang.trim(information).length !== 0 && infoIcon) {
                on(infoIcon, "click", function (evt) {
                    event.stop(evt);
                    descriptionDiv = dojo.query('.esriCTDescription', this.parentElement.parentElement)[0];
                    on(descriptionDiv, "click", function (e) {
                        event.stop(e);
                    });
                    webMapId = domAttr.get(this.parentElement.parentElement, "webMapID");
                    layerList = dom.byId(webMapId);
                    if (domClass.contains(descriptionDiv, "esriCTHidden")) {
                        dojo.replaceClass(descriptionDiv, "esriCTDisplayList", "esriCTHidden");
                        if (layerList) {
                            dojo.replaceClass(layerList, "esriCTHidden", "esriCTDisplayList");
                        }
                    } else {
                        dojo.replaceClass(descriptionDiv, "esriCTHidden", "esriCTDisplayList");
                    }
                });
            } else {
                if (infoIcon) {
                    dojo.replaceClass(infoIcon, "esriCTHidden");
                }
            }
        },

        /**
        * This function is used to validate the capabalites of the layer
        * @param{object} capabilities of layer
        * @memberOf widgets/webmap-list/webmap-list
        */
        _validateLayerCapabilities: function (layerCapabilities) {
            if (layerCapabilities && layerCapabilities.indexOf("Create") > -1 && layerCapabilities.indexOf("Update") > -1) {
                return true;
            }
            if (layerCapabilities && layerCapabilities.indexOf("Create") > -1 && layerCapabilities.indexOf("Editing") > -1) {
                return true;
            }
            return false;
        },

        /**
        * This function is used to return selected operational layer
        * @param{object} details of operational layer selected
        * @memberOf widgets/webmap-list/webmap-list
        */
        OnOperationalLayerSelected: function (details) {
            return details;
        }
    });
});