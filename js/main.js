/*global define,dojo,alert,moment,console,dojoConfig,$ */
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
    "dojo/_base/array",
    "esri/arcgis/utils",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/on",
    "dojo/topic",
    "dojo/string",
    "dojo/touch",
    "dojo/window",
    "dojo/aspect",
    "dojo/Deferred",
    "dojo/text!css/theme-template.css",
    "esri/layers/GraphicsLayer",
    "esri/layers/FeatureLayer",
    "esri/geometry/Circle",
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
    "esri/symbols/PictureMarkerSymbol",
    "esri/tasks/QueryTask",
    "esri/geometry/geometryEngine",
    "esri/geometry/webMercatorUtils",
    "esri/dijit/PopupTemplate",
    "widgets/app-header/app-header",
    "widgets/webmap-list/webmap-list",
    "widgets/issue-wall/issue-wall",
    "widgets/geo-form/geo-form",
    "widgets/my-issues/my-issues",
    "application/utils/utils",
    "dojo/query",
    "widgets/sidebar-content-controller/sidebar-content-controller",
    "widgets/item-details/item-details-controller",
    "widgets/map-search/map-search",
    "dojo/domReady!"
], function (
    declare,
    lang,
    array,
    arcgisUtils,
    dom,
    domConstruct,
    domStyle,
    domClass,
    domAttr,
    on,
    topic,
    string,
    touch,
    dojowindow,
    aspect,
    Deferred,
    ThemeCss,
    GraphicsLayer,
    FeatureLayer,
    Circle,
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
    PictureMarkerSymbol,
    QueryTask,
    geometryEngine,
    webMercatorUtils,
    PopupTemplate,
    ApplicationHeader,
    WebMapList,
    IssueWall,
    GeoForm,
    MyIssues,
    ApplicationUtils,
    query,
    SidebarContentController,
    ItemDetails,
    MapSearch
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
        _isMyIssues: false,
        _sidebarCnt: null,
        tooltipHandler: null,
        bufferPageNumber: 0,
        previousBufferGeometry: null,
        bufferFeatureCount: 0,
        bufferRadius: 0,
        sortedBufferArray: [],
        filteredBufferIds: [],
        sortedFeaturesArray: [],
        layerGraphicsArray: [],
        featuresInCurrentBuffer: [],
        displaygraphicsLayer: null,
        geoLocationPoint: null,
        newlyAddedFeatures: [],
        basemapExtent: null,
        maxBufferLimit: 0,
        geolocationgGraphicsLayer: null,
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
                // Initializes the map-search widget
                this.mapSearch = new MapSearch({ "config": this.config, "appUtils": this.appUtils, "handleFeatureSearch": true });
                //Listen for feature found event from locator and add it on the map and list, if it is not present in the graphics layer
                this.mapSearch.onFeatureFound = lang.hitch(this, function (feature) {
                    this._addNewFeature(feature.attributes[this.selectedLayer.objectIdField], this.selectedLayer, "search");
                });
                //Check if pusphin is aleady present on map, if it exsist clear the same
                aspect.before(this.mapSearch, "_validateAddress", lang.hitch(this, function () {
                    if (this.geolocationgGraphicsLayer) {
                        this.geolocationgGraphicsLayer.clear();
                    }
                }));

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

                //construct the query params if found in group info
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
                //Check if application is running on android devices and item details panel is open then show/hide the details panel
                //This resolves the jumbling of content in details panel on android devices
                if (this._itemDetails && !this._itemDetails.isCommentFormOpen) {
                    if (this.appUtils.isAndroid() && this._sidebarCnt && this._sidebarCnt._currentPanelName === "itemDetails") {
                        this._itemDetails.toggleDetailsPanel();
                    }
                }
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

                // Item details
                this._itemDetails = new ItemDetails({
                    "appConfig": this.config,
                    "appUtils": this.appUtils
                }).placeAt("sidebarContent"); // placeAt triggers a startup call to _itemDetails
                this._itemDetails.hide();
                this._sidebarCnt.addPanel("itemDetails", this._itemDetails);

                this._itemDetails.onCancel = lang.hitch(this, function (item) {
                    if (this._isMyIssues) {
                        this._sidebarCnt.showPanel("myIssues");
                        //refresh the myIssues list on showing the myIssues wall
                        if (this._myIssuesWidget && this._myIssuesWidget.itemsList) {
                            this._myIssuesWidget.itemsList.refreshList(item);
                        }
                    } else {
                        this._sidebarCnt.showPanel("issueWall");
                        //refresh the issue list on showing the issue wall
                        if (this._issueWallWidget && this._issueWallWidget.itemsList) {
                            this._issueWallWidget.itemsList.refreshList(item);
                        }
                    }
                });

                domAttr.set(dom.byId("submitFromMapText"), "innerHTML", this.config.i18n.main.submitReportButtonText);
                var submitButtonColor = (this.config && this.config.submitReportButtonColor) ? this.config.submitReportButtonColor : "#35ac46";
                domStyle.set(dom.byId("submitFromMap"), "background-color", submitButtonColor);

                on(dom.byId("submitFromMap"), "click", lang.hitch(this, function (evt) {
                    this._createGeoForm();
                }));
                on(dom.byId("mapBackButton"), "click", lang.hitch(this, function (evt) {
                    this._toggleListView();
                }));
                on(dom.byId("toggleListViewButton"), "click", lang.hitch(this, function (evt) {
                    //Change myissues widget flag to false and refresh the list
                    if (this._myIssuesWidget) {
                        this._myIssuesWidget.itemsList.clearSelection();
                        this._myIssuesWidget.itemsList.refreshList();
                    }
                    this._isMyIssues = false;
                    this._toggleListView();
                    this._sidebarCnt.showPanel("webMapList");
                }));
                domAttr.set(dom.byId("toggleListViewButton"), "title", this.config.i18n.main.gotoListViewTooltip);
                this._createWebMapList();
            } else {
                this._handleNoWebMapToDisplay();
            }
        },

        /**
        * Handle scenario when there is no web maps
        * @memberOf main
        */
        _handleNoWebMapToDisplay: function () {
            try {
                //Remove all menus except sign in/sign out
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
            var cssString, head, style, link;
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

                //If application is loaded in RTL mode, change styles of required nodes
                if (this.config.i18n.direction === "rtl") {
                    link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    link.href = "./css/rtl.css";
                    document.getElementsByTagName('head')[0].appendChild(link);
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

                // if map view is open in mobile view then hide it to show the my reports
                if (dom.byId("mapParentContainer") && domStyle.get(dom.byId("mapParentContainer"), "display") === "block") {
                    domStyle.set(dom.byId("mapParentContainer"), "display", "none");
                }

                //Close GeoForm If it is open
                if (this.geoformInstance) {
                    this.geoformInstance.closeForm();
                }

                //set the flag which indicated that user is entering in myissues workflow
                this._isMyIssues = true;

                //display my issue container if exists else create it
                if (this._myIssuesWidget) {
                    this._sidebarCnt.showPanel("myIssues");
                } else {
                    this._createMyIssuesList(this._selectedMapDetails);
                }
                domClass.toggle(this.appHeader.esriCTLoginOptionsDiv, "esriCTHidden");
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
        * instantiate My issue widget
        * @memberOf main
        */
        _createMyIssuesList: function (data) {
            if (!this._myIssuesWidget) {
                data.appConfig = this.config;
                data.appUtils = this.appUtils;
                data.selectedLayer = this.selectedLayer;
                this._myIssuesWidget = new MyIssues(data, domConstruct.create("div", {}, dom.byId('sidebarContent')));
                this._sidebarCnt.addPanel("myIssues", this._myIssuesWidget);
                this._sidebarCnt.showPanel("myIssues");

                this._myIssuesWidget.onListCancel = lang.hitch(this, function (selectedFeature) {
                    this._myIssuesWidget.itemsList.clearSelection();
                    this._myIssuesWidget.itemsList.refreshList();
                    this._isMyIssues = false;
                    this._sidebarCnt.showPanel("webMapList");
                });
                this._myIssuesWidget.onItemSelected = lang.hitch(this, function (selectedFeature) {
                    this.appUtils.showLoadingIndicator();
                    this._isMyIssues = true;
                    if (selectedFeature.webMapId !== this._selectedMapDetails.webMapId) {
                        //create web-map if selected feature does not belongs to selected map
                        this._webMapListWidget._createMap(selectedFeature.webMapId, this._webMapListWidget.mapDivID).then(lang.hitch(this, function (response) {
                            this._webMapListWidget.lastSelectedWebMapExtent = response.map.extent;
                            this._webMapListWidget.lastSelectedWebMapItemInfo = response.itemInfo;
                            data.itemInfo = response.itemInfo;
                            data.webMapId = selectedFeature.webMapId;
                            data.operationalLayerDetails = selectedFeature.layerDetails;
                            data.operationalLayerId = selectedFeature.layerId;
                            this._addFeatureLayerOnMap(data);
                        }));
                    } else if (selectedFeature.layerId !== this._selectedMapDetails.operationalLayerDetails.id) {
                        data.operationalLayerDetails = selectedFeature.layerDetails;
                        data.operationalLayerId = selectedFeature.layerId;
                        //add layer to map if feature does not belongs to selected layer of selected map
                        this._addFeatureLayerOnMap(data);
                    } else {
                        this.appUtils.hideLoadingIndicator();
                        this._itemSelected(selectedFeature, false);
                    }
                });
            }
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
            //set current graphics layer
            this._myIssuesWidget.selectedGraphicsDisplayLayer = this.displaygraphicsLayer;
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
                var webMapDescriptionFields, webMapListConfigData, zoomInBtn, zoomOutBtn;
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

                //clear extent handler of current layer before removing it from map
                this._webMapListWidget.beforeOperationalLayerSelected = lang.hitch(this, function () {
                    if (this._issueWallWidget && this._issueWallWidget.extentChangeHandler) {
                        this._issueWallWidget.extentChangeHandler.remove();
                    }
                });

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
                    //show listview(issueWAll) on selecting web-map
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
                    //Reset all properties required for fetching features in chunks
                    this.firstTimeLayerLoad = true;
                    this.bufferPageNumber = 0;
                    this.bufferRadius = this.config.bufferRadius;
                    this.sortedBufferArray = [];
                    this.previousBufferGeometry = null;
                    this.previousBufferIds = null;
                    this.currentBufferIds = null;
                    this.layerGraphicsArray = [];
                    this.sortedFeaturesArray = [];
                    this.filteredBufferIds = [];
                    this.maxBufferLimit = 0;
                    this.map = details.map;
                    this.newlyAddedFeatures = [];
                    this._selectedMapDetails = details;
                    this._initializeLayer(details);
                    this._initializeApp(details);
                    //If graphics layer object exsist, clear it and remove the instance
                    if (this.geolocationgGraphicsLayer) {
                        this.geolocationgGraphicsLayer.clear();
                        this.geolocationgGraphicsLayer = null;
                    }
                    // storing changed instance on extent change
                    this.map.on("extent-change", lang.hitch(this, function (extent) {
                        this.changedExtent = extent.extent;
                        if (this.geoformInstance) {
                            this.geoformInstance.setMapExtent(this.changedExtent);
                        }
                    }));
                    //Set the comments form Instance to null if it exsist
                    if (this._itemDetails && this._itemDetails.commentformInstance) {
                        this._itemDetails.commentformInstance = null;
                    }
                    //Set the selects features id value to null
                    if (this._issueWallWidget) {
                        this._issueWallWidget.itemsList.clearSelection();
                    }
                });

                this.appUtils.onGeolocationComplete = lang.hitch(this, function (evt, addGraphic) {
                    var symbol;
                    if (!this.geolocationgGraphicsLayer) {
                        this.geolocationgGraphicsLayer = new GraphicsLayer();
                        this.map.addLayer(this.geolocationgGraphicsLayer);
                    }
                    //Check if pusphin is aleady present on map, if it exsist clear the same
                    if (this.mapSearch && this.mapSearch.countyLayer) {
                        this.mapSearch.countyLayer.clear();
                    }
                    // if error found on locating point show error message, else check if located point falls within the basemap extent then locate feature on map else show error message
                    if (evt.error) {
                        // show error
                        this.appUtils.showError(this.config.i18n.geoform.geoLocationError);
                    } else if (this.basemapExtent.contains(evt.graphic.geometry)) {
                        // add graphics on map if geolocation is called from geoform widget
                        if (addGraphic) {
                            this.geoformInstance._locateSelectedAddress(evt.graphic.geometry);
                        } else {
                            // zoom the map to configured zoom level
                            this._selectedMapDetails.map.setLevel(this.config.zoomLevel);
                            // center the map at geolocation point
                            this._selectedMapDetails.map.centerAt(evt.graphic.geometry);
                            this.geolocationgGraphicsLayer.clear();
                            // set the graphic symbol for selected point and highlight on map
                            symbol = new PictureMarkerSymbol(dojoConfig.baseURL + this.config.searchedAddressPushpinImage, 32, 32);
                            this.geolocationgGraphicsLayer.add(new Graphic(evt.graphic.geometry, symbol));
                        }
                    } else {
                        // show error
                        this.appUtils.showError(this.config.i18n.geoform.geoLocationOutOfExtent);
                    }
                });

                this._webMapListWidget.noMapsFound = lang.hitch(this, function () {
                    this._handleNoWebMapToDisplay();
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
                data.appUtils = this.appUtils;
                data.featureLayerCount = this.featureLayerCount;
                data.layerGraphicsArray = this.layerGraphicsArray;
                if (this.geoLocationPoint) {
                    data.geoLocationPoint = this.geoLocationPoint;
                }
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
                this._issueWallWidget.onLoadMoreClick = lang.hitch(this, function (evt) {
                    //Clear previously selected feature
                    if (this._selectedMapDetails.map.getLayer("selectionGraphicsLayer")) {
                        this._selectedMapDetails.map.getLayer("selectionGraphicsLayer").clear();
                    }
                    this.appUtils.showLoadingIndicator();
                    this.bufferPageNumber++;
                    if (this.config.geolocation) {
                        if (this.sortedBufferArray.length <= this.bufferPageNumber) {
                            this.bufferRadius += 1;
                            this._createBufferParameters(this._issueWallWidget.selectedLayer, this._selectedMapDetails, true);
                        } else {
                            //If buffer has more features than maxRecordCount, then get more features without incrementing buffer
                            this._selectFeaturesInBuffer(this._issueWallWidget.selectedLayer, this._selectedMapDetails);
                        }
                    } else {
                        var j, index;
                        //Filter the features which are already added to layer via search or my issues
                        for (j = this.newlyAddedFeatures.length; j >= 0; j--) {
                            if (this.sortedBufferArray[this.bufferPageNumber].indexOf(this.newlyAddedFeatures[j]) !== -1) {
                                index = this.sortedBufferArray[this.bufferPageNumber].indexOf(this.newlyAddedFeatures[j]);
                                this.sortedBufferArray[this.bufferPageNumber].splice(index, 1);
                            }
                        }
                        //If browser doesnt support geolocation, then directly fetch next batch of features
                        this._selectFeaturesInBuffer(this._issueWallWidget.selectedLayer, this._selectedMapDetails);
                    }
                });
                this._itemDetails.onFeatureUpdated = lang.hitch(this, function (feature) {
                    if (this._myIssuesWidget) {
                        this._myIssuesWidget.updateIssueList(this._selectedMapDetails, feature);
                    }
                    if (this._issueWallWidget) {
                        setTimeout(lang.hitch(this, function () {
                            this._issueWallWidget.selectedLayer.refresh();
                            this._issueWallWidget.selectedLayer.redraw();
                        }), 500);
                    }
                });

                this._issueWallWidget.featureSelectedOnMapClick = lang.hitch(this, function (selectedFeature) {
                    //user can select feature from map once he enters to map from issueDetails of my-issue
                    //so set the myissue flag to false it indicates that user is going to start new workflow
                    this._isMyIssues = false;
                    if (!selectedFeature.webMapId) {
                        selectedFeature.webMapId = this._selectedMapDetails.webMapId;
                    }
                    this._itemSelected(selectedFeature, true);
                });
                this._sidebarCnt.addPanel("issueWall", this._issueWallWidget);
            } else {
                data.featureLayerCount = this.featureLayerCount;
                data.layerGraphicsArray = this.layerGraphicsArray;
                this._issueWallWidget.initIssueWall(data);
                //Show issuewall in pannel if my issues are not open
                //else set the selected item from myissues
                if (!this._isMyIssues) {
                    this._sidebarCnt.showPanel("issueWall");
                } else if (this._myIssuesWidget && this._myIssuesWidget.selectedFeature) {
                    setTimeout(lang.hitch(this, function () {
                        this._itemSelected(this._myIssuesWidget.selectedFeature, false);
                    }), 500);

                }
            }

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
                            this.geoformInstance._resizeMap();
                        }
                        this.geoformInstance._activateDrawTool();
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
                    this.geoformInstance.geoformSubmitted = lang.hitch(this, function (objectId) {
                        try {
                            //refresh main map so that newly created issue will be shown on it.
                            var layer = this._selectedMapDetails.map.getLayer(this._selectedMapDetails.operationalLayerId);
                            layer.refresh();
                            this._addNewFeature(objectId, layer, "geoform").then(lang.hitch(this, function () {
                                //update my issue list when new issue is added
                                if (this._myIssuesWidget) {
                                    this._myIssuesWidget.updateIssueList(this._selectedMapDetails, null, true);
                                }
                            }));
                        } catch (ex) {
                            this.appUtils.showError(ex.message);
                        }
                    });
                    this.geoformInstance.startup();
                }
            }
        },

        /**
        * Add new feature to graphics layer
        * @param{string} objectId
        * @param{object} new feature
        * @param{object} operational layer
        * @memberOf main
        */
        _addNewFeature: function (objectId, layer, addedFrom) {
            var queryFeature, queryTask, featureDef = new Deferred();
            queryFeature = new Query();
            queryTask = new QueryTask(layer.url);
            queryFeature.objectIds = [objectId];
            queryFeature.outFields = ["*"];
            queryFeature.outSpatialReference = layer.spatialReference;
            queryFeature.returnGeometry = true;
            queryTask.execute(queryFeature, lang.hitch(this, function (result) {
                this._createFeature(result.features[0], layer, addedFrom);
                featureDef.resolve();
            }), function (error) {
                featureDef.reject();
                console.log("Error :" + error);
            });
            return featureDef.promise;
        },

        /**
        * Create feature
        * @param{object} new feature
        * @memberOf main
        */
        _createFeature: function (newFeature, layer, addedFrom) {
            var newGraphic, featureExsist = false;
            newGraphic = this._createFeatureAttributes(newFeature, layer);
            //check if newfeature is already present in graphics layer and set featureExsist flag to true
            array.some(this.displaygraphicsLayer.graphics, lang.hitch(this, function (currentFeature) {
                if (currentFeature.attributes[layer.objectIdField] === newGraphic.graphic.attributes[layer.objectIdField]) {
                    featureExsist = true;
                    return true;
                }
            }));
            //If feature is found through search widget, we need to set my issues flag to false if it is true
            if (addedFrom === "search") {
                this._isMyIssues = false;
            }
            if (!featureExsist) {
                //If feature is added through geoform which is outside the buffer, append it to layer graphics array
                this.newlyAddedFeatures.push(newFeature.attributes[layer.objectIdField]);
                this.layerGraphicsArray.push(this._createFeatureAttributes(newFeature, layer));
                this.layerGraphicsArray.sort(this._sortFeatureArray);
                if (this.config.geolocation) {
                    this.layerGraphicsArray.reverse();
                }
                this.displaygraphicsLayer.add(newGraphic.graphic);
                //create or update issue-list
                if (addedFrom === "geoform") {
                    //Increment layer count by 1 since we have successfully added a graphic
                    this.featureLayerCount++;
                }
                this._createIssueWall(this._selectedMapDetails);
            }
            //If feature is found through search widget then we need to display item details for the selected feature
            if (addedFrom === "search") {
                this._itemSelected(newGraphic.graphic, true);
                this._isMyIssues = false;
            }

            //Since we added one feature now, we need to clear the no features found message
            if (this.displaygraphicsLayer.graphics && this.displaygraphicsLayer.graphics.length > 0) {
                if (!domClass.contains(this._issueWallWidget.noIssuesMessage, "esriCTHidden")) {
                    domClass.add(this._issueWallWidget.noIssuesMessage, "esriCTHidden");
                }
            }
        },

        /**s
        * Create feature object
        * @param{object} New feature
        * @param{object} Distance of feature from current location
        * @param{object} Selected operational layer
        * @memberOf main
        */
        _createFeatureAttributes: function (newFeature, layer) {
            var newGraphic1, fieldValue;
            newGraphic1 = new Graphic();
            newGraphic1.attributes = newFeature.attributes;
            newGraphic1.geometry = newFeature.geometry;
            newGraphic1.infoTemplate = layer.infoTemplate;
            newGraphic1.webMapId = this._selectedMapDetails.webMapId;
            if (this.config.geolocation) {
                fieldValue = this._getDistanceFromCurrentLocation(newGraphic1);
            } else {
                fieldValue = newGraphic1.attributes[layer.objectIdField];
            }
            return {
                "graphic": newGraphic1,
                "sortValue": fieldValue
            };
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
            //added layer ID to selected item's object id to avoid duplicate value of object id across multiple layer
            if (this._isMyIssues) {
                this._createFeature(item, operationalLayer, "myissues");
                this._myIssuesWidget.itemsList.setSelection(item.attributes[operationalLayer.objectIdField] + "_" + item.webMapId + "_" + operationalLayer.id);
            } else {
                if (!item.webMapId) {
                    item.webMapId = this._selectedMapDetails.webMapId;
                }
                this._issueWallWidget.itemsList.setSelection(item.attributes[operationalLayer.objectIdField] + "_" + this._selectedMapDetails.webMapId + "_" + operationalLayer.id);
            }
            //Change the map extent and set it to features extent
            this._gotoSelectedFeature(item);
            this._itemDetails.clearComments();
            if (this._isMyIssues) {
                this.actionVisibilities = {};
                this.actionVisibilities = this._myIssuesWidget.setActionVisibilities(item);
                this._itemDetails.setActionsVisibility(this.actionVisibilities, this.actionVisibilities.commentTable, this.response.itemInfo, this.actionVisibilities.commentPopupTable);
            } else {
                this._itemDetails.setActionsVisibility(this._issueWallWidget.actionVisibilities, this._issueWallWidget._commentsTable, this.response.itemInfo, this._issueWallWidget._commentPopupTable);
            }
            this._itemDetails.setItemFields(this.config.likeField, this._issueWallWidget.selectedLayer);
            this._itemDetails.setItem(item);
            this._sidebarCnt.showPanel("itemDetails");
            //if item is selected from map and user is in mobile view navigate screen to details view
            if (isMapClicked) {
                //Close geoform in desktop view if featuer is clicked to show the details panel
                if (this.geoformInstance) {
                    this.geoformInstance.closeForm();
                }
                if (dojowindow.getBox().w < 768) {
                    this._toggleListView();
                }
            }
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
            if (selectedGraphicsLayer) {
                // clear graphics layer
                selectedGraphicsLayer.clear();
            }
            esriQuery = new Query();
            esriQuery.objectIds = [parseInt(objectId, 10)];
            esriQuery.returnGeometry = true;
            layer.queryFeatures(esriQuery, lang.hitch(this, function (featureSet) {
                // Check if feature is valid and have valid geometry, if not prompt with no geometry message
                if (featureSet && featureSet.features && featureSet.features.length > 0 && featureSet.features[0] && featureSet.features[0].geometry) {
                    highlightSymbol = this.getHighLightSymbol(featureSet.features[0], layer);
                    //add symbol to graphics layer if highlight symbol is created
                    if (highlightSymbol) {
                        selectedGraphicsLayer.add(highlightSymbol);
                    }
                } else {
                    this.appUtils.showError(this.config.i18n.main.noFeatureGeomtery);
                }
            }));
        },

        /**
        * Get symbol used for highlighting feature
        * @param{object} selected feature which needs to be highlighted
        * @param{object} details of selected layer
        */
        getHighLightSymbol: function (graphic, layer) {
            // If feature geometry is of type point, add a crosshair symbol
            // If feature geometry is of type polyline, highlight the line
            // If feature geometry is of type polygon, highlight the boundary of the polygon
            switch (graphic.geometry.type) {
            case "point":
                return this._getPointSymbol(graphic, layer);
            case "polyline":
                return this._getPolyLineSymbol(graphic, layer);
            case "polygon":
                return this._getPolygonSymbol(graphic, layer);
            }
        },

        /**
        * This function is used to get symbol for point geometry
        * @param{object} selected feature which needs to be highlighted
        * @param{object} details of selected layer
        */
        _getPointSymbol: function (graphic, layer) {
            var symbol, isSymbolFound, graphics, point, graphicInfoValue, layerInfoValue, i, itemFromLayer, symbolShape;
            isSymbolFound = false;
            symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, null, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255, 1]), 3));
            symbol.setColor(null);
            symbol.size = 30; //set default Symbol size which will be used in case symbol not found.
            //check if layer is valid and have valid renderer object then only check for other symbol properties
            if (layer && layer.renderer) {
                if (layer.renderer.symbol) {
                    isSymbolFound = true;
                    symbol = this._updatePointSymbolProperties(symbol, layer.renderer.symbol);
                } else if (layer.renderer.infos && (layer.renderer.infos.length > 0)) {
                    for (i = 0; i < layer.renderer.infos.length; i++) {
                        if (layer.typeIdField) {
                            graphicInfoValue = graphic.attributes[layer.typeIdField];
                        } else if (layer.renderer.attributeField) {
                            graphicInfoValue = graphic.attributes[layer.renderer.attributeField];
                        }
                        layerInfoValue = layer.renderer.infos[i].value;
                        // To get properties of symbol when infos contains other than class break renderer.
                        if (graphicInfoValue !== undefined && graphicInfoValue !== null && graphicInfoValue !== "" && layerInfoValue !== undefined && layerInfoValue !== null && layerInfoValue !== "") {
                            if (graphicInfoValue.toString() === layerInfoValue.toString()) {
                                isSymbolFound = true;
                                symbol = this._updatePointSymbolProperties(symbol, layer.renderer.infos[i].symbol);
                            }
                        }
                    }
                    if (!isSymbolFound) {
                        if (layer.renderer.defaultSymbol) {
                            isSymbolFound = true;
                            symbol = this._updatePointSymbolProperties(symbol, layer.renderer.defaultSymbol);
                        }
                    }
                }
            }
            layer = this.mapInstance.getLayer(layer.id);
            if (!isSymbolFound && layer && layer.graphics && layer.graphics.length > 0) {
                array.some(layer.graphics, function (item) {
                    if (item.attributes[graphic._layer.objectIdField] === graphic.attributes[graphic._layer.objectIdField]) {
                        itemFromLayer = item;
                        return item;
                    }
                });
                if (itemFromLayer.getShape) {
                    symbolShape = itemFromLayer.getShape();
                    if (symbolShape && symbolShape.shape) {
                        if (symbolShape.shape.hasOwnProperty("r")) {
                            isSymbolFound = true;
                            symbol.size = (symbolShape.shape.r * 2) + 10;
                        } else if (symbolShape.shape.hasOwnProperty("width")) {
                            isSymbolFound = true;
                            //get offsets in case of smartmapping symbols from the renderer info if available
                            if (layer.renderer && layer.renderer.infos && layer.renderer.infos.length > 0) {
                                symbol = this._updatePointSymbolProperties(symbol, layer.renderer.infos[0].symbol);
                            }
                            symbol.size = symbolShape.shape.width + 10;
                        }
                    }
                }
            }
            point = new Point(graphic.geometry.x, graphic.geometry.y, new SpatialReference({
                wkid: graphic.geometry.spatialReference.wkid
            }));
            graphics = new Graphic(point, symbol, graphic.attributes);
            return graphics;
        },

        /**
        * This function is used to get different data of symbol from infos properties of renderer object.
        * @param{object} symbol that needs to be assigned to selected/activated feature
        * @param{object} renderer layer Symbol
        */
        _updatePointSymbolProperties: function (symbol, layerSymbol) {
            var height, width, size;
            if (layerSymbol.hasOwnProperty("height") && layerSymbol.hasOwnProperty("width")) {
                height = layerSymbol.height;
                width = layerSymbol.width;
                // To display cross hair properly around feature its size needs to be calculated
                size = (height > width) ? height : width;
                size = size + 10;
                symbol.size = size;
            }
            if (layerSymbol.hasOwnProperty("size")) {
                if (!size || size < layerSymbol.size) {
                    symbol.size = layerSymbol.size + 10;
                }
            }
            if (layerSymbol.hasOwnProperty("xoffset")) {
                symbol.xoffset = layerSymbol.xoffset;
            }
            if (layerSymbol.hasOwnProperty("yoffset")) {
                symbol.yoffset = layerSymbol.yoffset;
            }
            return symbol;
        },

        /**
        * This function is used to get symbol for polyline geometry
        * @param{object} selected feature which needs to be highlighted
        * @param{object} details of selected layer
        */
        _getPolyLineSymbol: function (graphic, layer) {
            var symbol, graphics, polyline, symbolWidth, graphicInfoValue, layerInfoValue, i;
            symbolWidth = 5; // default line width
            //check if layer is valid and have valid renderer object then only check for other  symbol properties
            if (layer && layer.renderer) {
                if (layer.renderer.symbol && layer.renderer.symbol.hasOwnProperty("width")) {
                    symbolWidth = layer.renderer.symbol.width;
                } else if ((layer.renderer.infos) && (layer.renderer.infos.length > 0)) {
                    for (i = 0; i < layer.renderer.infos.length; i++) {
                        if (layer.typeIdField) {
                            graphicInfoValue = graphic.attributes[layer.typeIdField];
                        } else if (layer.renderer.attributeField) {
                            graphicInfoValue = graphic.attributes[layer.renderer.attributeField];
                        }
                        layerInfoValue = layer.renderer.infos[i].value;
                        // To get properties of symbol when infos contains other than class break renderer.
                        if (graphicInfoValue !== undefined && graphicInfoValue !== null && graphicInfoValue !== "" && layerInfoValue !== undefined && layerInfoValue !== null && layerInfoValue !== "") {
                            if (graphicInfoValue.toString() === layerInfoValue.toString() && layer.renderer.infos[i].symbol.hasOwnProperty("width")) {
                                symbolWidth = layer.renderer.infos[i].symbol.width;
                            }
                        }
                    }
                } else if (layer.renderer.defaultSymbol && layer.renderer.defaultSymbol.hasOwnProperty("width")) {
                    symbolWidth = layer.renderer.defaultSymbol.width;
                }
            }
            symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255, 1]), symbolWidth);
            polyline = new Polyline(new SpatialReference({
                wkid: graphic.geometry.spatialReference.wkid
            }));
            if (graphic.geometry.paths && graphic.geometry.paths.length > 0) {
                polyline.addPath(graphic.geometry.paths[0]);
            }
            graphics = new Graphic(polyline, symbol, graphic.attributes);
            return graphics;
        },

        /**
        * This function is used to get symbol for polygon geometry
        * @param{object} selected feature which needs to be highlighted
        * @param{object} details of selected layer
        */
        _getPolygonSymbol: function (graphic, layer) {
            var symbol, graphics, polygon;
            symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255, 1]), 4), new Color([0, 0, 0, 0]));
            polygon = new Polygon(new SpatialReference({
                wkid: graphic.geometry.spatialReference.wkid
            }));
            if (graphic.geometry.rings) {
                polygon.rings = lang.clone(graphic.geometry.rings);
            }
            graphics = new Graphic(polygon, symbol, graphic.attributes);
            return graphics;
        },

        /**
        * Show the feature on the center of map in case of "My Reports"
        * @item{object} selected feature
        * @memberOf main
        */
        _gotoSelectedFeature: function (item) {
            if (item.geometry.type === "point") {
                this._selectedMapDetails.map.centerAt(item.geometry);
            } else {
                this._selectedMapDetails.map.setExtent(item.geometry.getExtent(), true);
            }
        },

        /* Invoked when touch occurs on respective title
        * @memberOf widgets/item-details-controller/item-details-controller
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

        /*-------  Begining of section for Geographical Filtering  -------*/

        /**
        * This function is used to clone all the properties of selected feature layer and assign it to newly created graphics layer
        * @param{object} details selected operational layer
        * @memberOf @memberOf main
        */
        _initializeLayer: function (details) {
            var selectedOperationalLayer, layerUrl, layerID, cloneRenderer, cloneInfoTemplate, layerOpacity;
            selectedOperationalLayer = this.map.getLayer(details.operationalLayerDetails.id);
            this.selectedLayer = selectedOperationalLayer;
            //If layer is changed through my issues widget, we need to update the layer instance in my issues widget
            if (this._myIssuesWidget) {
                this._myIssuesWidget.updateLayer(this.selectedLayer);
            }
            this.changedExtent = details.map.extent;
            layerOpacity = selectedOperationalLayer.opacity;
            layerUrl = selectedOperationalLayer.url;
            layerID = details.operationalLayerDetails.id;
            cloneRenderer = lang.clone(selectedOperationalLayer.renderer);
            cloneInfoTemplate = lang.clone(selectedOperationalLayer.infoTemplate);
            //Fetch defination expression of selected feature layer
            this._getExistingDefinitionExpression(details.itemInfo, selectedOperationalLayer);
            selectedOperationalLayer.hide();
            //Check if graphics layer already exsists
            if (this.displaygraphicsLayer) {
                this.map.removeLayer(this.displaygraphicsLayer);
            }
            this.displaygraphicsLayer = new GraphicsLayer(layerUrl, { id: "Graphics" + layerID });
            this.displaygraphicsLayer.setRenderer(cloneRenderer);
            this.displaygraphicsLayer.setInfoTemplate(cloneInfoTemplate);
            this.displaygraphicsLayer.setOpacity(layerOpacity);
            this.map.addLayer(this.displaygraphicsLayer);
            this._getFeatureLayerCount(details, selectedOperationalLayer);
        },

        /**
        * This function is used to set existing definition expression.
        * @param{object} item info of selected operational layer
        * @param{object} selected operational layer
        * @memberOf main
        */
        _getExistingDefinitionExpression: function (itemInfo, selectedOperationalLayer) {
            var j;
            // Initially, if a layer has some definition expression than store it
            for (j = 0; j < itemInfo.itemData.operationalLayers.length; j++) {
                if (selectedOperationalLayer.id === itemInfo.itemData.operationalLayers[j].id) {
                    if (itemInfo.itemData.operationalLayers[j].layerDefinition && itemInfo.itemData.operationalLayers[j].layerDefinition.definitionExpression) {
                        this._existingDefinitionExpression = itemInfo.itemData.operationalLayers[j].layerDefinition.definitionExpression;
                    } else {
                        this._existingDefinitionExpression = null;
                    }
                    break;
                }
            }
        },

        /**
        * This function is get the total count of graphics of selected feature layer
        * @param{object} details of selected operational layer
        * @param{object} selected operational layer
        * @memberOf main
        */
        _getFeatureLayerCount: function (details, featureLayer) {
            var countQuery, queryTask;
            countQuery = new Query();
            queryTask = new QueryTask(featureLayer.url);
            if (this._existingDefinitionExpression) {
                countQuery.where = this._existingDefinitionExpression;
            } else {
                countQuery.where = "1=1";
            }
            queryTask.executeForIds(countQuery, lang.hitch(this, function (results) {
                this.featureLayerCount = results.length;
                //If geolocation exsists create configurable buffer and fetch the features
                if (this.config.geolocation) {
                    this._createBufferParameters(featureLayer, details, false);
                } else {
                    //Sort obtained object ids in descending order
                    results.sort(function (a, b) {
                        return b - a;
                    });
                    //If geolocation does not exsists create feature batches
                    this._createFeatureBatches(featureLayer, results, details);
                }
            }), function (error) {
                console.log(error);
            });
        },

        /**
        * This function is used to create buffer paramters based on geomtery and radius
        * @param{object} selected operational layer
        * @param{object} details of selected operational layer
        * @memberOf main
        */
        _createBufferParameters: function (featureLayer, details, isLoadMoreClick) {
            var circleSymb, bufferedGeometries, circleBoundary, newGeometry;
            //Create new point from the geolocation coordinates
            this.geoLocationPoint = webMercatorUtils.geographicToWebMercator(new Point(this.config.geolocation.coords.longitude, this.config.geolocation.coords.latitude));
            //Create symbol which will indicate the buffer
            circleSymb = new SimpleFillSymbol(SimpleFillSymbol.STYLE_NULL, new SimpleLineSymbol(SimpleLineSymbol.STYLE_NULL, new Color([105, 105, 105]), 2),
                new Color([255, 255, 0, 0.25]));
            //Get the actual buffer geomtery based on geolocation point and configurable buffer radius
            bufferedGeometries = geometryEngine.geodesicBuffer(this.geoLocationPoint, [this.bufferRadius], this.config.bufferUnit, false);
            //clear the previously drawn graphics and hide the infowindow if it is open
            this.map.graphics.clear();
            this.map.infoWindow.hide();
            circleBoundary = new Graphic(bufferedGeometries, circleSymb);
            this.map.graphics.add(circleBoundary);
            //If previous geometry exsists, create new graphics which shows the cut geometry to query for next set of graphics
            if (this.previousBufferGeometry) {
                newGeometry = geometryEngine.difference(bufferedGeometries, this.previousBufferGeometry);
                this.map.graphics.add(new Graphic(bufferedGeometries, circleSymb));
            } else {
                newGeometry = bufferedGeometries;
            }
            this.map.setExtent(bufferedGeometries.getExtent().expand(1.5));
            //store previous geometry, we will use this to get cut geomtery next time
            this.previousBufferGeometry = bufferedGeometries;
            this._createBuffer(featureLayer, newGeometry, details, bufferedGeometries, isLoadMoreClick);
        },

        /**
        * This function is used to create buffer paramters based on geomtery and radius
        * @param{object} selected operational layer
        * @param{object} new geometry
        * @param{object} details of selected operational layer
        * @param{object} buffer geomteries
        * @memberOf main
        */
        _createBuffer: function (featureLayer, newGeometry, details, bufferedGeometries, isLoadMoreClick) {
            var bufferQuery, queryTask, i, j, chunk;
            bufferQuery = new Query();
            queryTask = new QueryTask(featureLayer.url);
            this.previousBufferIds = lang.clone(this.currentBufferIds);
            //Take geometry in a global variable which will be used to fetch the data in current buffer geometry
            this.circle = bufferedGeometries;
            if (this._existingDefinitionExpression) {
                bufferQuery.where = this._existingDefinitionExpression;
            } else {
                bufferQuery.where = "1=1";
            }
            bufferQuery.returnIdsOnly = true;
            bufferQuery.returnGeometry = false;
            bufferQuery.geometry = newGeometry;
            queryTask.executeForIds(bufferQuery).then(lang.hitch(this, function (response) {
                if (response && response.length > 0) {
                    this.bufferFeatureCount = response.length;
                    this.currentBufferIds = response;
                    this._filterResult();
                    //Reset max buffer count to 0, if features are found in current buffer
                    this.maxBufferLimit = 0;
                    //If new features are added in the current buffer from outside the application, make sure the feature layer count is in sync with it
                    if (this.filteredBufferIds.length + this.layerGraphicsArray.length > this.featureLayerCount) {
                        this.featureLayerCount = this.filteredBufferIds.length + this.layerGraphicsArray.length;
                    }
                    //Divide the obtained faetures into batches based on maxRecordCount(server limit)
                    this.numberOfChunk = Math.floor(this.filteredBufferIds.length / (featureLayer.maxRecordCount || 999));
                    chunk = (featureLayer.maxRecordCount || 999);
                    if (chunk > response.length) {
                        chunk = response.length;
                    }
                    //If this is not user initiated action, we need to increment the buffer page number to keep track of each page
                    if (!this.firstTimeLayerLoad && !isLoadMoreClick) {
                        this.bufferPageNumber++;
                    }
                    //check if the filtered array contains object ids to fetch the features
                    if (this.filteredBufferIds.length > 0) {
                        for (i = 0, j = this.filteredBufferIds.length; i < j; i += chunk) {
                            this.sortedBufferArray.push(this.filteredBufferIds.slice(i, i + chunk));
                        }
                        this._selectFeaturesInBuffer(featureLayer, details, bufferedGeometries);
                    } else {
                        //Add empty array to sortedBufferArray to maintain the page numbering
                        this.sortedBufferArray.push([]);
                        if (this.featureLayerCount > this.layerGraphicsArray.length) {
                            this.bufferRadius += 1;
                            this._createBufferParameters(featureLayer, details, false);
                        }
                    }
                } else {
                    //If no features are found in current buffer and layer still has features, increment the buffer and continue the process
                    if (this.featureLayerCount > this.layerGraphicsArray.length) {
                        //If no features are present in the first buffer itself.
                        //Show the appropriate error message which indicates user that he can click on load more to see the features
                        if (this.firstTimeLayerLoad) {
                            //Add empty array to sortedBufferArray to maintain the page numbering
                            this.sortedBufferArray.push([]);
                            this._createIssueWall(details);
                            this.firstTimeLayerLoad = false;
                        } else {
                            this.maxBufferLimit++;
                            //If this is not user initiated action, we need to increment the buffer page number to keep track of each page
                            if (!isLoadMoreClick) {
                                this.bufferPageNumber++;
                            }
                            //If app is getting empty features array in consecutive 10 attempts, stop the process and show "View More" button
                            if (this.maxBufferLimit % 10 === 0) {
                                //Add empty array to sortedBufferArray to maintain the page numbering
                                this.sortedBufferArray.push([]);
                                this.appUtils.hideLoadingIndicator();
                                this.maxBufferLimit = 0;
                            } else {
                                //Add empty array to sortedBufferArray to maintain the page numbering
                                this.sortedBufferArray.push([]);
                                this.bufferRadius += 1;
                                this._createBufferParameters(featureLayer, details, false);
                            }
                        }
                    }
                    if (this.featureLayerCount === 0) {
                        //We still need to show issue wall with no features found message
                        this._createIssueWall(details);
                    }
                }
                //Since the layer is loaded for the first time, change the flag value to false
                this.firstTimeLayerLoad = false;
            }), lang.hitch(this, function (error) {
                this._createIssueWall(details);
                //If layer fails to fetch the features, we need to show appropriate message instead of showing no features found
                aspect.after(this._issueWallWidget, "_displayIssueList", lang.hitch(this, function () {
                    if (!domClass.contains(this._issueWallWidget.noIssuesMessage, "esriCTHidden")) {
                        domAttr.set(this._issueWallWidget.noIssuesMessage, "innerHTML", this.config.i18n.issueWall.unableToFetchFeatureError);
                    }
                }));
                this.firstTimeLayerLoad = false;
            }));
        },

        /**
        * Filter features and modify the filteredBufferIds array
        * @memberOf main
        */
        _filterResult: function () {
            var i, j;
            this.filteredBufferIds = lang.clone(this.currentBufferIds);
            //Check if the feature is already added to map, with the help of previousBufferIds array
            if (this.filteredBufferIds && this.filteredBufferIds.length > 0 && this.previousBufferIds && this.previousBufferIds.length > 0) {
                for (i = this.filteredBufferIds.length; i >= 0; i--) {
                    if (this.filteredBufferIds[i] && this.previousBufferIds && this.previousBufferIds.indexOf(this.filteredBufferIds[i]) !== -1) {
                        this.filteredBufferIds.splice(i, 1);
                    }
                }
            }
            if (this.filteredBufferIds && this.filteredBufferIds.length > 0 && this.newlyAddedFeatures && this.newlyAddedFeatures.length > 0) {
                //Check if the feature is already added to map via geoform, search or my issues with the help of newlyAddedFeatures array
                for (j = this.filteredBufferIds.length; j >= 0; j--) {
                    if (this.filteredBufferIds[j] && this.newlyAddedFeatures && this.newlyAddedFeatures.indexOf(this.filteredBufferIds[j]) !== -1) {
                        this.filteredBufferIds.splice(j, 1);
                    }
                }
            }
        },

        /**
        * This function is used to create buffer paramters based on geomtery and radius
        * @param{object} selected operational layer
        * @param{object} details of selected operational layer
        * @param{object} buffer geomteries
        * @memberOf main
        */
        _selectFeaturesInBuffer: function (featureLayer, details, bufferedGeometries) {
            var queryFeature, queryTask, newGraphic;
            queryFeature = new Query();
            queryTask = new QueryTask(featureLayer.url);
            queryFeature.objectIds = this.sortedBufferArray[this.bufferPageNumber];
            queryFeature.outFields = ["*"];
            queryFeature.returnGeometry = true;
            if (bufferedGeometries) {
                queryFeature.geometry = bufferedGeometries;
            }
            queryTask.execute(queryFeature, lang.hitch(this, function (result) {
                var i, fields;
                if (result.features) {
                    for (i = 0; i < result.features.length; i++) {
                        newGraphic = new Graphic();
                        newGraphic.attributes = result.features[i].attributes;
                        //Loop the attributes and replace empty values with configurable text
                        for (fields in newGraphic.attributes) {
                            if (newGraphic.attributes.hasOwnProperty(fields)) {
                                if (newGraphic.attributes[fields] === null || newGraphic.attributes[fields] === "") {
                                    newGraphic.attributes[fields] = this.config.showNullValueAs;
                                }
                            }
                        }
                        newGraphic.geometry = result.features[i].geometry;
                        //assign infotemplate for features
                        newGraphic.setInfoTemplate(new PopupTemplate(details.operationalLayerDetails.popupInfo));
                        result.features[i].infoTemplate = newGraphic.infoTemplate;
                        newGraphic.webMapId = result.features[i].webMapId = details.webMapId;
                        this.displaygraphicsLayer.add(newGraphic);
                        //add to feature array
                        this.layerGraphicsArray.push(this._createFeatureAttributes(result.features[i], featureLayer));
                    }
                    this.layerGraphicsArray.sort(this._sortFeatureArray);
                    if (this.config.geolocation) {
                        this.layerGraphicsArray.reverse();
                    }

                    //Now, initialize issue list
                    this._createIssueWall(details);
                }
            }), function (err) {
                console.log(err);
            });
        },

        /**
        * Load entire application with obtained settings
        * @param{object} details of selected operational layer
        * @memberOf main
        */
        _initializeApp: function (details) {
            var geoLocationButtonDiv, homeButtonDiv, incrementButton, decrementButton, selectedGraphics;
            //set layer title on map
            domAttr.set(dom.byId("mapContainerTitle"), "innerHTML", details.operationalLayerDetails.title);
            //Show popup on click/hover of layer title div
            if (window.hasOwnProperty("ontouchstart") || window.ontouchstart !== undefined) {
                this._createTooltip(dom.byId("mapContainerTitle"), details.operationalLayerDetails.title);
            }
            this.changedExtent = details.map.extent;
            //Hide GeoForm if it is Open
            if (domClass.contains(dom.byId('geoformContainer'), "esriCTVisible")) {
                domClass.replace(dom.byId('geoformContainer'), "esriCTHidden", "esriCTVisible");
            }
            //destroy previous geoform instance
            this._destroyGeoForm();
            this._selectedMapDetails = details;
            //clears highlighted graghics
            if (this._selectedMapDetails && this._selectedMapDetails.map && this._selectedMapDetails.map.infoWindow) {
                this._selectedMapDetails.map.infoWindow.clearFeatures();
            }
            // this._itemDetails.setActionsVisibility(true, true, details.map._layers[details.operationalLayerId].hasAttachments);
            // Highlight feature when user clicks on locate issue on map icon from issue wall
            // If graphics layer is already added on the map, clear it else add a graphic layer on map
            if (this._selectedMapDetails.map.getLayer("selectionGraphicsLayer")) {
                this._selectedMapDetails.map.getLayer("selectionGraphicsLayer").clear();
            } else {
                selectedGraphics = new GraphicsLayer();
                selectedGraphics.id = "selectionGraphicsLayer";
                this._selectedMapDetails.map.addLayer(selectedGraphics);
            }

            if (query(".esriCTMapGeoLocationContainer")[0]) {
                domConstruct.destroy(query(".esriCTMapGeoLocationContainer")[0]);
            }
            if (query(".esriCTMapHomeButtonContainer")[0]) {
                domConstruct.destroy(query(".esriCTMapHomeButtonContainer")[0]);
            }
            geoLocationButtonDiv = domConstruct.create("div", {
                "class": "esriCTMapGeoLocationContainer"
            });
            homeButtonDiv = domConstruct.create("div", {
                "class": "esriCTMapHomeButtonContainer"
            });
            incrementButton = query(".esriSimpleSliderIncrementButton", dom.byId("mapDiv"));
            domConstruct.empty(incrementButton[0]);
            domClass.add(incrementButton[0], "esriCTIncrementButton esriCTPointerCursor");
            decrementButton = query(".esriSimpleSliderDecrementButton", dom.byId("mapDiv"));
            domConstruct.empty(decrementButton[0]);
            domClass.add(decrementButton[0], "esriCTDecrementButton esriCTPointerCursor");
            domConstruct.place(homeButtonDiv, query(".esriSimpleSliderIncrementButton", dom.byId("mapDiv"))[0], "after");
            domConstruct.place(geoLocationButtonDiv, query(".esriSimpleSliderDecrementButton", dom.byId("mapDiv"))[0], "after");
            this.appUtils.createGeoLocationButton(details.itemInfo.itemData.baseMap.baseMapLayers, this._selectedMapDetails.map, geoLocationButtonDiv, false);
            this.appUtils.createHomeButton(this._selectedMapDetails.map, homeButtonDiv);
            this.mapSearch.createSearchButton(this.response, this.response.map, dom.byId("mapDiv"), false, details);
            this.basemapExtent = this.appUtils.getBasemapExtent(details.itemInfo.itemData.baseMap.baseMapLayers);
            this._selectedMapDetails.webmapList = this._webMapListWidget.filteredWebMapResponseArr;
            //by default _isWebMapListLoaded will be false and will be set to true once onOperationalLayerSelected
            //set this flag to true after the if condition for checking if mobile and _isWebMapListLoaded,
            //since by default in mobile view only home screen should be open*/
            this._isWebMapListLoaded = true;
        },

        /**
        * This function is used to create buffer paramters based on geomtery and radius
        * @param{object} selected operational layer
        * @param{object} batch of features array
        * @param{object} details of selected operational layer
        * @memberOf main
        */
        _createFeatureBatches: function (featureLayer, results, details) {
            var chunk, i, j;
            chunk = featureLayer.maxRecordCount || 999;
            this.numberOfChunk = Math.floor(results.length / chunk);

            if (chunk > results.length) {
                chunk = results.length;
            }
            for (i = 0, j = results.length; i < j; i += chunk) {
                this.sortedBufferArray.push(results.slice(i, i + chunk));
            }
            if (this.sortedBufferArray.length > 0) {
                this._selectFeaturesInBuffer(featureLayer, details);
            } else {
                //We still need to show issue wall with no features found message
                this._createIssueWall(details);
            }

        },

        /**
        * This function is used to create buffer paramters based on geomtery and radius
        * @param{object} selected feature
        * @param{object} distance unit
        * @memberOf main
        */
        _getDistanceFromCurrentLocation: function (currentFeature) {
            return geometryEngine.distance(this.geoLocationPoint, currentFeature.geometry, this.config.bufferUnit);
        },

        /**
        * This function is used to create buffer paramters based on geomtery and radius
        * @param{object} first feature
        * @param{object} second feature
        * @memberOf main
        */
        _sortFeatureArray: function (a, b) {
            if (a.sortValue > b.sortValue) {
                return -1;
            }
            if (a.sortValue < b.sortValue) {
                return 1;
            }
            return 0;
        }
        /*-------  End of section for Geographical Filtering  -------*/
    });
});