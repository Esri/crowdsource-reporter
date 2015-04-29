/*global define,dojo,alert,moment,$ */
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
    "esri/arcgis/utils",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/on",
    "dojo/topic",
    "dojo/string",
    "dojo/window",
    "dojo/text!css/theme-template.css",
    "esri/layers/GraphicsLayer",
    "esri/tasks/query",
    "esri/Color",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
    "esri/SpatialReference",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "widgets/app-header/app-header",
    "widgets/webmap-list/webmap-list",
    "widgets/issue-wall/issue-wall",
    "widgets/geo-form/geo-form",
    "application/utils/utils",
    "dojo/query",
    "widgets/sidebar-content-controller/sidebar-content-controller",
    "dojo/domReady!"
], function (
    declare,
    lang,
    arcgisUtils,
    dom,
    domConstruct,
    domStyle,
    domClass,
    domAttr,
    on,
    topic,
    string,
    dojowindow,
    ThemeCss,
    GraphicsLayer,
    Query,
    Color,
    Graphic,
    Point,
    Polyline,
    Polygon,
    SpatialReference,
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    SimpleFillSymbol,
    ApplicationHeader,
    WebMapList,
    IssueWall,
    GeoForm,
    ApplicationUtils,
    query,
    SidebarContentController
) {
    return declare(null, {
        config: {},
        appUtils: null,
        boilerPlateTemplate: null,
        _groupItems: [],
        _isSliderOpen: true,
        _isWebMapListLoaded: false,
        _selectedMapDetails: {},
        _menusList: {
            "signOut": false,
            "signIn": true,
            "help": false
        },
        _sidebarCnt: null,
        startup: function (boilerPlateTemplateObject, loggedInUser) {
            // config will contain application and user defined info for the template such as i18n strings, the web map id
            // and application id
            // any url parameters and any application specific configuration information.
            var queryParams = {};
            if (boilerPlateTemplateObject) {
                this.boilerPlateTemplate = boilerPlateTemplateObject;
                this.config = boilerPlateTemplateObject.config;
                this.appUtils = new ApplicationUtils({
                    "config": this.config
                });
                //if login details are not available set it to anonymousUserName
                //based on login info if user is logged in set menu's for signin and signout
                if (loggedInUser) {
                    this.config.logInDetails = {
                        "userName": loggedInUser.fullName,
                        "token": loggedInUser.credential.token,
                        "processedUserName": loggedInUser.processedUserName
                    };
                    this._menusList.signOut = true;
                    this._menusList.signIn = false;
                } else {
                    this.config.logInDetails = {
                        "userName": "",
                        "token": "",
                        "processedUserName": ""
                    };
                    this._menusList.signIn = true;
                    this._menusList.signOut = false;
                }
                //By default we have disabled queryForGroupItems
                //since it was getting group items for the group configured in default.js only,
                //and not honoring group-id configured in appconfig.
                //Enable queryForGroupItems in templateconfig
                this.boilerPlateTemplate.templateConfig.queryForGroupItems = true;

                //construct the queryparams if found in group info
                if (this.config.groupInfo.results && this.config.groupInfo.results.length > 0) {
                    lang.mixin(queryParams, this.boilerPlateTemplate.templateConfig.groupParams);
                    if (this.config.groupInfo.results[0].sortField) {
                        queryParams.sortField = this.config.groupInfo.results[0].sortField;
                    }
                    if (this.config.groupInfo.results[0].sortOrder) {
                        queryParams.sortOrder = this.config.groupInfo.results[0].sortOrder;
                    }
                }
                if (loggedInUser) {
                    queryParams.token = loggedInUser.credential.token;
                }
                //Pass the newly constructed queryparams from group info.
                //If query params not available in group info or group is private, items will be sorted according to modified date.
                this._loadGroupItems(queryParams);
            } else {
                this.appUtils.showError("Main:: Config is not defined");
            }
        },

        /**
         * Loads group items using BoilerPlateTemplate for specified queryParams.
         * @param{object} query Parameters
         * @memberOf main
         */
        _loadGroupItems: function (queryParams) {
            this.boilerPlateTemplate.queryGroupItems(queryParams).then(lang.hitch(this, this._groupItemsLoaded));
        },

        /**
         * Callback handler called on group items loaded, which will have group items as response.
         * @param{object} response
         * @memberOf main
         */
        _groupItemsLoaded: function (response) {
            this._groupItems.push.apply(this._groupItems, response.groupItems.results);
            if (response.groupItems.nextQueryParams.start < 0) {
                if (!this.config.groupItems) {
                    this.config.groupItems = {};
                }
                this.config.groupItems.results = this._groupItems;
                this._loadApplication();
            } else {
                this._loadGroupItems(response.groupItems.nextQueryParams);
            }
        },

        /**
         * Loads all application widgets.
         * 1) Loads Theme
         * 2) Loads Application Header and attach events to header tools.
         * 3) Attach application level events
         * 4) Create Web Map list
         * @memberOf main
         */
        _loadApplication: function () {
            if (!this.config.showNullValueAs) {
                this.config.showNullValueAs = "";
            }

            //Set Application Theme
            this._loadApplicationTheme();

            //Set Application header
            this._createApplicationHeader();

            //Handle Window Resize
            on(window, "resize", lang.hitch(this, function () {
                this._resizeMap();
            }));

            topic.subscribe("resizeMap", lang.hitch(this, function () {
                this._resizeMap();
            }));

            //if group items are present create Sidebar controller and web map list
            //else show no web map message
            if (this.config.groupItems.results.length > 0) {
                // Sidebar content controller
                this._sidebarCnt = new SidebarContentController({
                    "appConfig": this.config
                }).placeAt("sidebarContent"); // placeAt triggers a startup call to _sidebarCntent

                domAttr.set(dom.byId("submitFromMapText"), "innerHTML", this.config.i18n.main.submitReportButtonText);
                on(dom.byId("submitFromMap"), "click", lang.hitch(this, function (evt) {
                    this._createGeoForm();
                }));
                on(dom.byId("mapBackButton"), "click", lang.hitch(this, function (evt) {
                    this._toggleListView();
                    this._sidebarCnt.showPanel("webMapList");
                }));
                on(dom.byId("toggleListViewButton"), "click", lang.hitch(this, function (evt) {
                    this._toggleListView();
                }));
                domAttr.set(dom.byId("toggleListViewButton"), "title", this.config.i18n.main.gotoListViewTooltip);
                this._createWebMapList();
            } else {
                this._handleNoWebMapToDsiplay();
            }
        },

        /**
         * Handle scenario when there is no web maps
         * @memberOf main
         */
        _handleNoWebMapToDsiplay: function () {
            try {
                //Remove all menus except signin/signout
                this._menusList.homeMenu = false;
                this._menusList.mapView = false;
                this._menusList.reportIt = false;
                this._menusList.listView = false;
                this.appHeader.updateMenuList(this._menusList);
                domClass.add(dom.byId("layoutContainer"), "esriCTHidden");
                this.appUtils.hideLoadingIndicator();
                domClass.remove(dom.byId("noWebMapParentDiv"), "esriCTHidden");
                domAttr.set(dom.byId("noWebMapChildDiv"), "innerHTML", this.config.i18n.webMapList.noWebMapInGroup);
            } catch (err) {
                this.appUtils.showError(err.message);
            }
        },

        /**
         * Load application theme
         * @memberOf main
         */
        _loadApplicationTheme: function () {
            var cssString, head, style;
            //if theme is configured
            if (this.config.theme) {
                //substitute theme color values in theme template
                cssString = string.substitute(ThemeCss, {
                    SelectedThemeColor: this.config.theme
                });
                //Create Style using theme template and append it to head
                //On Lower versions of IE10 Style tag is read only so create theme using styleSheet.cssText
                if (dojo.isIE < 10) {
                    head = document.getElementsByTagName('head')[0];
                    style = document.createElement('style');
                    style.type = 'text/css';
                    style.styleSheet.cssText = cssString;
                    head.appendChild(style);
                } else {
                    domConstruct.create("style", {
                        "type": "text/css",
                        "innerHTML": cssString
                    }, query("head")[0]);
                }
            }
        },

        /**
         * Instantiate app-header widget
         * @memberOf main
         */
        _createApplicationHeader: function () {
            this._menusList.portalObject = this.config.portalObject;
            this.appHeader = new ApplicationHeader({
                "config": this._menusList,
                "appConfig": this.config
            }, domConstruct.create("div", {}, dom.byId('headerContainer')));

            //on my issue button clicked display my issues list
            this.appHeader.showMyIssues = lang.hitch(this, function () {
                alert("Coming soon...");
            });

            //on appicon clicked navigate to home(webmaplist) only in mobile view
            this.appHeader.navigateToHome = lang.hitch(this, function () {
                //Check if application is in mobile view then navigate user to home
                if (dojowindow.getBox().w < 768) {
                    //close geoform
                    if (this.geoformInstance) {
                        this.geoformInstance.closeForm();
                    }
                    this._toggleListView();
                    this._sidebarCnt.showPanel("webMapList");
                }
            });
        },

        /**
         * add layer to map when an issue is selected from my issues panel to locate on map
         * @memberOf main
         */
        _addFeatureLayerOnMap: function (data) {
            var webmapTemplateNode;
            this._webMapListWidget._displaySelectedOperationalLayer(data);
            //highlight selected webmap template item in webmap list
            this._webMapListWidget._selectWebMapItem(data.webMapId);
            webmapTemplateNode = this._getSeletedWebmapTemplate(data.webMapId);
            if (webmapTemplateNode) {
                //display layer list of selected map
                if (dom.byId(data.webMapId) && domStyle.get(dom.byId(data.webMapId), "display") === "none") {
                    this._webMapListWidget._handleWebmapToggling(webmapTemplateNode, data.operationalLayerDetails);
                }
            }

        },

        /**
         * get all webmap template item
         * @memberOf main
         */
        _getSeletedWebmapTemplate: function (webMapId) {
            var nodeWebmapId, i, webmapTempNodeArr = $('.esriCTDisplayWebMapTemplate');
            for (i = 0; i < webmapTempNodeArr.length; i++) {
                nodeWebmapId = domAttr.get(webmapTempNodeArr[i], "webMapId");
                if (nodeWebmapId === webMapId) {
                    break;
                }
            }
            return webmapTempNodeArr[i];
        },

        /**
         * Instantiate webmap-list widget and attach all the events
         * @memberOf main
         */
        _createWebMapList: function () {
            try {
                var webMapDescriptionFields, webMapListConfigData, isCreateGeoLocation, zoomInBtn, zoomOutBtn, basemapExtent, geoLocationButtonDiv;
                //construct json data for the fields to be shown in descriptions, based on the configuration
                webMapDescriptionFields = {
                    "description": this.config.webMapInfoDescription,
                    "snippet": this.config.webMapInfoSnippet,
                    "owner": this.config.webMapInfoOwner,
                    "created": this.config.webMapInfoCreated,
                    "modified": this.config.webMapInfoModified,
                    "licenseInfo": this.config.webMapInfoLicenseInfo,
                    "accessInformation": this.config.webMapInfoAccessInformation,
                    "tags": this.config.webMapInfoTags,
                    "numViews": this.config.webMapInfoNumViews,
                    "avgRating": this.config.webMapInfoAvgRating
                };
                //create data required for the web map list widget
                webMapListConfigData = {
                    "webMapDescriptionFields": webMapDescriptionFields,
                    "appConfig": this.config,
                    "mapDivID": "mapDiv",
                    "changeExtentOnLayerChange": true,
                    "autoResize": true,
                    "appUtils": this.appUtils
                };
                //create instance of web map list widget
                this._webMapListWidget = new WebMapList(webMapListConfigData, domConstruct.create("div"));

                //handel on map updated event
                this._webMapListWidget.mapUpdated = lang.hitch(this, function (mapObject) {
                    this._selectedMapDetails.map = mapObject;
                });
                this._webMapListWidget.onMapLoaded = lang.hitch(this, function (webmap) {
                    this.response = webmap;
                    // tooltip for zoom in and zoom out button
                    zoomInBtn = query('.esriSimpleSliderIncrementButton', dom.byId(webmap.id))[0];
                    zoomOutBtn = query('.esriSimpleSliderDecrementButton', dom.byId(webmap.id))[0];
                    if (zoomInBtn) {
                        domAttr.set(zoomInBtn, "title", this.config.i18n.map.zoomInTooltip);
                    }
                    if (zoomOutBtn) {
                        domAttr.set(zoomOutBtn, "title", this.config.i18n.map.zoomOutTooltip);
                    }
                });
                this._webMapListWidget.onSelectedWebMapClicked = lang.hitch(this, function () {
                    //show listview(issueWAll) on selecting webmap
                    if (this._isWebMapListLoaded) {
                        this._sidebarCnt.showPanel("issueWall");
                    }
                });
                //handle operational layer selected event in web map list
                //Update _selectedMapDetails
                //Close the geoform if it is open
                //Create/Clear Selection graphics layer used for highlighting in issue wall
                //Update Issue wall
                this._webMapListWidget.onOperationalLayerSelected = lang.hitch(this, function (details) {
                    //set layer title on map
                    domAttr.set(dom.byId("mapContainerTitle"), "innerHTML", details.operationalLayerDetails.title);

                    //Hide GeoForm if it is Open
                    if (domClass.contains(dom.byId('geoformContainer'), "esriCTVisible")) {
                        domClass.replace(dom.byId('geoformContainer'), "esriCTHidden", "esriCTVisible");
                    }
                    //destroy previous geoform instance
                    this._destroyGeoForm();
                    isCreateGeoLocation = false;
                    //create geo-location when new map is selected
                    if (!this._selectedMapDetails || (details.webMapId !== this._selectedMapDetails.webMapId)) {
                        isCreateGeoLocation = true;
                    }
                    this._selectedMapDetails = details;
                    // Highlight feature when user clicks on locate issue on map icon from issue wall
                    // If graphics layer is already added on the map, clear it else add a graphic layer on map
                    if (this._selectedMapDetails.map.getLayer("selectionGraphicsLayer")) {
                        this._selectedMapDetails.map.getLayer("selectionGraphicsLayer").clear();
                    } else {
                        var selectedGraphics = new GraphicsLayer();
                        selectedGraphics.id = "selectionGraphicsLayer";
                        this._selectedMapDetails.map.addLayer(selectedGraphics);
                    }
                    /**/
                    //create or update issue list
                    this._createIssueWall(details);
                    if (isCreateGeoLocation) {
                        geoLocationButtonDiv = domConstruct.create("div", {
                            "class": "esriCTMapGeoLocationContainer"
                        });
                        domConstruct.place(geoLocationButtonDiv, query(".esriSimpleSliderDecrementButton", dom.byId("mapDiv"))[0], "after");
                        this.appUtils.createGeoLocationButton(details.itemInfo.itemData.baseMap.baseMapLayers, this._selectedMapDetails.map, geoLocationButtonDiv, false);
                        basemapExtent = this.appUtils.getBasemapExtent(details.itemInfo.itemData.baseMap.baseMapLayers);
                    }
                    this._selectedMapDetails.webmapList = this._webMapListWidget.filteredWebMapResponseArr;
                    //by default _isWebMapListLoaded will be false and will be set to true once onOperationalLayerSelected
                    //set this flag to true after the if condition for checking if mobile and _isWebMapListLoaded,
                    //since by default in mobile view only home screen should be open*/
                    this._isWebMapListLoaded = true;
                });

                this.appUtils.onGeolocationComplete = lang.hitch(this, function (evt, addGraphic) {
                    // if error found on locating point show error message, else check if located point falls within the basemap extent then locate feature on map else show error message
                    if (evt.error) {
                        // show error
                        this.appUtils.showError(this.config.i18n.geoform.geoLocationError);
                    } else if (basemapExtent.contains(evt.graphic.geometry)) {
                        // add graphics on map if geolocation is called from geoform widget
                        if (addGraphic) {
                            this.geoformInstance._locateSelectedAddress(evt.graphic.geometry);
                        } else {
                            // zoom the map to configured zoom level
                            this._selectedMapDetails.map.setLevel(this.config.zoomLevel);
                            // center the map at geolocation point
                            this._selectedMapDetails.map.centerAt(evt.graphic.geometry);
                        }
                    } else {
                        // show error
                        this.appUtils.showError(this.config.i18n.geoform.geoLocationOutOfExtent);
                    }
                });

                this._webMapListWidget.noMapsFound = lang.hitch(this, function () {
                    this._handleNoWebMapToDsiplay();
                });

                this._webMapListWidget.placeAt("sidebarContent");
                this._sidebarCnt.addPanel("webMapList", this._webMapListWidget);
                this._sidebarCnt.showPanel("webMapList");
            } catch (err) {
                this.appUtils.showError(err.message);
            }
        },

        /**
         * Instantiate issue-wall widget
         * @memberOf main
         */
        _createIssueWall: function (data) {
            //Create IssueWall widget if not present
            if (!this._issueWallWidget) {
                data.appConfig = this.config;
                this._issueWallWidget = new IssueWall(data, domConstruct.create("div", {}, dom.byId('sidebarContent')));
                this._issueWallWidget.onItemSelected = lang.hitch(this, function (selectedFeature) {
                    this._itemSelected(selectedFeature, false);
                });
                this._issueWallWidget.onListCancel = lang.hitch(this, function (selectedFeature) {
                    this._sidebarCnt.showPanel("webMapList");
                });
                this._issueWallWidget.onMapButtonClick = lang.hitch(this, function (evt) {
                    this._toggleMapView();
                });
                this._issueWallWidget.onSubmit = lang.hitch(this, function (evt) {
                    this._createGeoForm();
                });
                this._issueWallWidget.featureSelectedOnMapClick = lang.hitch(this, function (selectedFeature) {
                    this._itemSelected(selectedFeature, true);
                });
                this._sidebarCnt.addPanel("issueWall", this._issueWallWidget);
            } else {
                this._issueWallWidget.initIssueWall(data);
                this._sidebarCnt.showPanel("issueWall");
            }

            // storing changed instance on extent change
            this._issueWallWidget.map.on("extent-change", lang.hitch(this, function (extent) {
                this.changedExtent = extent.extent;
            }));
            //In mobile view when user selects locate in issue wall user should be navigated to map view.
            //so handle showMapViewOnLocate and check is user is in mobile view then show mapview.
            this._issueWallWidget.showMapViewOnLocate = lang.hitch(this, function () {
                if (dojowindow.getBox().w < 768) {
                    this.appHeader.mobileMenu.showMapView();
                }
            });
        },

        /**
         * Instantiate geo-form widget
         * @memberOf main
         */
        _createGeoForm: function () {
            //if geo-from is not visible then
            if (domClass.contains(dom.byId('geoformContainer'), "esriCTHidden")) {
                if (this._selectedMapDetails && this._selectedMapDetails.operationalLayerId) {
                    //Show Geoform
                    domClass.replace(dom.byId('geoformContainer'), "esriCTVisible", "esriCTHidden");
                    //if last shown geoform is for same the layer then don't do anything.
                    if (this.geoformInstance && this._selectedMapDetails.operationalLayerId === this.geoformInstance.layerId) {
                        if (this.changedExtent) {
                            this.geoformInstance.map.setExtent(this.changedExtent);
                        }
                        return;
                    }
                    //if last geoform instance exist then destroy it.
                    this._destroyGeoForm();
                    //Create new instance of geoForm
                    this.geoformInstance = new GeoForm({
                        config: this.config,
                        webMapID: this._webMapListWidget.lastWebMapSelected,
                        layerId: this._selectedMapDetails.operationalLayerId,
                        layerTitle: this._selectedMapDetails.operationalLayerDetails.title,
                        basemapId: this._selectedMapDetails.itemInfo.itemData.baseMap.baseMapLayers[0].id,
                        changedExtent: this.changedExtent,
                        appConfig: this.config,
                        appUtils: this.appUtils

                    }, domConstruct.create("div", {}, dom.byId("geoformContainer")));
                    //on submitting issues in geoform update issue wall and main map to show newly updated issue.
                    this.geoformInstance.geoformSubmitted = lang.hitch(this, function () {
                        try {
                            //refresh main map so that new; created issue will be shown on it.
                            this._selectedMapDetails.map.getLayer(this._selectedMapDetails.operationalLayerId).refresh();
                            //create or update issue-list
                            this._createIssueWall(this._selectedMapDetails);
                        } catch (ex) {
                            this.appUtils.showError(ex.message);
                        }
                    });
                    this.geoformInstance.startup();
                }
            }
        },

        /**
         * Destroy geo-form widget
         * @memberOf main
         */
        _destroyGeoForm: function () {
            //if last geoform instance exist then destroy it.
            if (this.geoformInstance) {
                this.geoformInstance.destroyInstance();
                domConstruct.empty(dom.byId("geoformContainer"));
                this.geoformInstance = null;
            }
        },

        /**
         * Close the Comments pannel if it is open and clear the comment text box
         * @memberOf main
         */
        _closeComments: function () {
            //Close the Comments container if it is open
            if (query(".esriCTCommentsPanel")[0]) {
                if (domStyle.get(query(".esriCTCommentsPanel")[0], "display") === "block") {
                    domClass.replace(query(".esriCTCommentsPanel")[0], "esriCTHidden", "esriCTVisible");
                }
                // Clear the text area of comment widget
                if (query(".textAreaContent")[0]) {
                    query(".textAreaContent")[0].value = "";
                }
            }
        },

        /**
         * Resize map and sets center of the map
         * @memberOf main
         */
        _resizeMap: function () {
            try {
                //Map widget will not work properly if map is resized when the container holding map is having display none
                //so check if map instance is present and map container's display is block
                //get the current center of the map, and set the mapdiv's height width to 100% so that it display's completely in its container.
                if (this._selectedMapDetails.map && domStyle.get(dom.byId("mapParentContainer"), "display") === "block") {
                    domStyle.set(dom.byId("mapDiv"), "height", "100%");
                    domStyle.set(dom.byId("mapDiv"), "width", "100%");
                }
            } catch (err) {
                this.appUtils.showError(err.message);
            }
        },

        _itemSelected: function (item, isMapClicked) {
            var operationalLayer;
            //Highlight Feature on map
            operationalLayer = this._selectedMapDetails.operationalLayerDetails.layerObject;
            if (operationalLayer && operationalLayer.objectIdField && this._selectedMapDetails.map) {
                this.highLightFeatureOnClick(operationalLayer, item.attributes[operationalLayer.objectIdField], this._selectedMapDetails.map.getLayer("selectionGraphicsLayer"), this._selectedMapDetails.map);
            }
            //set selection in item-list to maintain the highlight in list
            this._issueWallWidget.itemsList.setSelection(item.attributes[operationalLayer.objectIdField]);
            this._issueWallWidget.itemsList.refreshList();
            alert("Coming soon...");

        },

        _toggleListView: function () {
            dom.byId("sideContainer").style.display = "block";
            dom.byId("mapParentContainer").style.display = "none";
        },

        _toggleMapView: function () {
            dom.byId("sideContainer").style.display = "none";
            dom.byId("mapParentContainer").style.display = "block";
            this._resizeMap();
        },

        /**
         * Highlight feature on map
         * @param{object} layer
         * @param{string} objectId
         * @param{object} selectedGraphicsLayer
         * @param{object} map
         */
        highLightFeatureOnClick: function (layer, objectId, selectedGraphicsLayer, map) {
            var esriQuery, highlightSymbol;
            this.mapInstance = map;
            // clear graphics layer
            selectedGraphicsLayer.clear();
            esriQuery = new Query();
            esriQuery.objectIds = [parseInt(objectId, 10)];
            esriQuery.returnGeometry = true;
            layer.queryFeatures(esriQuery, lang.hitch(this, function (featureSet) {
                if (featureSet.features[0]) {
                    highlightSymbol = this.getHighLightSymbol(featureSet.features[0], layer);
                    selectedGraphicsLayer.add(highlightSymbol);
                }
            }), function (err) {
                this.appUtils.showError(err.message);
            });
        },

        /**
         * Get symbol used for highlighting feature
         * @param{string} graphic - graphic of the selected feature
         * @param{string} layer - layer details
         */
        getHighLightSymbol: function (graphic, layer) {
            var i, symbol, point, graphics, symbolWidth, symbolFillColor, height, width, size, isSymbolFound, graphicInfoValue, layerInfoValue;
            isSymbolFound = false;
            // If feature geometry is of type point, add a crosshair symbol
            // If feature geometry is of type polyline, highlight the line
            // If feature geometry is of type polygon, highlight the boundary of the polygon
            switch (graphic.geometry.type) {
            case "point":
                symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, null, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255, 1]), 4));
                symbol.setColor(null);
                symbol.size = 50; //set default Symbol size which will be used in case symbol not found.
                if (layer.renderer.symbol) {
                    isSymbolFound = true;
                    if (layer.renderer.symbol.hasOwnProperty("height") && layer.renderer.symbol.hasOwnProperty("width")) {
                        height = layer.renderer.symbol.height;
                        width = layer.renderer.symbol.width;
                        // To display cross hair properly around feature its size needs to be calculated
                        size = (height > width) ? height : width;
                        size = size + 10;
                        symbol.size = size;
                    }
                    if (layer.renderer.symbol.hasOwnProperty("size")) {
                        if (!size || size < layer.renderer.symbol.size) {
                            symbol.size = layer.renderer.symbol.size + 10;
                        }
                    }
                    if (layer.renderer.symbol.hasOwnProperty("xoffset") && layer.renderer.symbol.hasOwnProperty("yoffset")) {
                        symbol.xoffset = layer.renderer.symbol.xoffset;
                        symbol.yoffset = layer.renderer.symbol.yoffset;
                    }
                } else if ((layer.renderer.infos) && (layer.renderer.infos.length > 0)) {
                    for (i = 0; i < layer.renderer.infos.length; i++) {
                        if (layer.typeIdField) {
                            graphicInfoValue = graphic.attributes[layer.typeIdField];
                        } else if (layer.renderer.attributeField) {
                            graphicInfoValue = graphic.attributes[layer.renderer.attributeField];
                        }
                        layerInfoValue = layer.renderer.infos[i].value;
                        if (graphicInfoValue !== null && graphicInfoValue !== "") {
                            if (graphicInfoValue.toString() === layerInfoValue.toString()) {
                                isSymbolFound = true;
                                if (layer.renderer.infos[i].symbol.hasOwnProperty("height") && layer.renderer.infos[i].symbol.hasOwnProperty("width")) {
                                    height = layer.renderer.infos[i].symbol.height;
                                    width = layer.renderer.infos[i].symbol.width;
                                    // To display cross hair properly around feature its size needs to be calculated
                                    size = (height > width) ? height : width;
                                    size = size + 10;
                                    symbol.size = size;
                                }
                                if (layer.renderer.infos[i].symbol.hasOwnProperty("size")) {
                                    if (!size || size < layer.renderer.infos[i].symbol.size) {
                                        symbol.size = layer.renderer.infos[i].symbol.size + 10;
                                    }
                                }
                                if (layer.renderer.infos[i].symbol.hasOwnProperty("xoffset") && layer.renderer.infos[i].symbol.hasOwnProperty("yoffset")) {
                                    symbol.xoffset = layer.renderer.infos[i].symbol.xoffset;
                                    symbol.yoffset = layer.renderer.infos[i].symbol.yoffset;
                                }
                            }
                        }
                    }
                    if (!isSymbolFound) {
                        if (layer.renderer.defaultSymbol) {
                            isSymbolFound = true;
                            if (layer.renderer.defaultSymbol.hasOwnProperty("height") && layer.renderer.defaultSymbol.hasOwnProperty("width")) {
                                height = layer.renderer.defaultSymbol.height;
                                width = layer.renderer.defaultSymbol.width;
                                // To display cross hair properly around feature its size needs to be calculated
                                size = (height > width) ? height : width;
                                size = size + 10;
                                symbol.size = size;
                            }
                            if (layer.renderer.defaultSymbol.hasOwnProperty("size")) {
                                if (!size || size < layer.renderer.defaultSymbol.size) {
                                    symbol.size = layer.renderer.defaultSymbol.size + 10;
                                }
                            }
                            if (layer.renderer.defaultSymbol.hasOwnProperty("xoffset") && layer.renderer.defaultSymbol.hasOwnProperty("yoffset")) {
                                symbol.xoffset = layer.renderer.defaultSymbol.xoffset;
                                symbol.yoffset = layer.renderer.defaultSymbol.yoffset;
                            }
                        }
                    }
                }
                point = new Point(graphic.geometry.x, graphic.geometry.y, new SpatialReference({
                    wkid: graphic.geometry.spatialReference.wkid
                }));
                graphics = new Graphic(point, symbol, graphic.attributes);
                return graphics;

            case "polyline":
                if (layer.renderer.symbol) {
                    symbolWidth = layer.renderer.symbol.width;
                } else if ((layer.renderer.infos) && (layer.renderer.infos.length > 1)) {
                    for (i = 0; i < layer.renderer.infos.length; i++) {
                        if (graphic.attributes[layer.typeIdField] === parseInt(layer.renderer.infos[i].value, 10)) {
                            symbolWidth = layer.renderer.infos[i].symbol.width;
                        }
                    }
                }
                symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255, 1]), symbolWidth);
                graphics = new Graphic(new Polyline(graphic.geometry), symbol);
                return graphics;

            case "polygon":
                if (layer.renderer.symbol) {
                    symbolFillColor = layer.renderer.symbol.color;
                } else if ((layer.renderer.infos) && (layer.renderer.infos.length > 1)) {
                    for (i = 0; i < layer.renderer.infos.length; i++) {
                        if (graphic.attributes[layer.typeIdField] === parseInt(layer.renderer.infos[i].value, 10)) {
                            symbolFillColor = layer.renderer.infos[i].symbol.color;
                        }
                    }
                }
                symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255, 1]), 4), symbolFillColor);
                graphics = new Graphic(new Polygon(graphic.geometry), symbol);
                return graphics;
            }
        }

    });
});
