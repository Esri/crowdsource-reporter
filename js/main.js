/*global define,dojo,alert,moment */
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
    "dojo/_base/fx",
    "dojo/window",
    "dojo/text!css/theme-template.css",
    "esri/layers/GraphicsLayer",
    "widgets/app-header/app-header",
    "widgets/webmap-list/webmap-list",
    "widgets/issue-wall/issue-wall",
    "widgets/geo-form/geo-form",
    "application/utils/utils",
    "application/template-options",
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
    coreFx,
    dojowindow,
    ThemeCss,
    GraphicsLayer,
    ApplicationHeader,
    WebMapList,
    IssueWall,
    GeoForm,
    ApplicationUtils,
    TemplateConfig
) {
    return declare(null, {
        config: {},
        _groupItems: [],
        _isSliderOpen: true,
        _isWebMapListLoaded: false,
        _selectedMapDetails: {},
        _menusList: {
            "homeMenu": true,
            "mapView": true,
            "listView": true,
            "reportIt": true
        },

        startup: function (config, loggedInUser) {
            // config will contain application and user defined info for the template such as i18n strings, the web map id
            // and application id
            // any url parameters and any application specific configuration information.
            var error, queryParams = {};
            dojo.applicationUtils = ApplicationUtils;
            if (config) {
                this.config = config;
                //if login details are not available set it to anonymousUserName
                //based on login info if user is logged in set menu's for signin and signout
                if (loggedInUser) {
                    this.config.logInDetails = {
                        "userName": loggedInUser.fullName,
                        "token": loggedInUser.credential.token
                    };
                    this._menusList.signOut = true;
                    this._menusList.signIn = false;
                } else {
                    this.config.logInDetails = {
                        "userName": "",
                        "token": ""
                    };
                    this._menusList.signIn = true;
                    this._menusList.signOut = false;
                }
                //By default we have disabled queryForGroupItems
                //since it was getting group items for the group configured in default.js only,
                //and not honoring group-id configured in appconfig.
                //Enable queryForGroupItems in templateconfig
                dojo.BoilerPlateTemplate.templateConfig.queryForGroupItems = true;

                //construct the queryparams if found in group info
                if (config.groupInfo.results && config.groupInfo.results.length > 0) {
                    lang.mixin(queryParams, dojo.BoilerPlateTemplate.templateConfig.groupParams);
                    if (config.groupInfo.results[0].sortField) {
                        queryParams.sortField = config.groupInfo.results[0].sortField;
                    }
                    if (config.groupInfo.results[0].sortOrder) {
                        queryParams.sortOrder = config.groupInfo.results[0].sortOrder;
                    }
                }
                //Pass the newly constructed queryparams from group info.
                //If query params not available in group info or group is private, items will be sorted according to modified date.
                this._loadGroupItems(queryParams);
            } else {
                error = new Error("Main:: Config is not defined");
                dojo.applicationUtils.showError(error);
            }
        },

        /**
        * Loads group items using BoilerPlateTemplate for specified queryParams.
        * @param{object} query Parameters
        * @memberOf main
        */
        _loadGroupItems: function (queryParams) {
            dojo.BoilerPlateTemplate.queryGroupItems(queryParams).then(lang.hitch(this, this._groupItemsLoaded));
        },

        /**
        * Callback handler called on group items loaded, which will have group items as response.
        * @param{object} response
        * @memberOf main
        */
        _groupItemsLoaded: function (response) {
            this._groupItems.push.apply(this._groupItems, response.results);
            if (response.nextQueryParams.start < 0) {
                this.config.groupItems.results = this._groupItems;
                this._loadApplication();
            } else {
                this._loadGroupItems(response.nextQueryParams);
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
            dojo.configData = this.config;
            if (!dojo.configData.showNullValueAs) {
                dojo.configData.showNullValueAs = "";
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

            on(dom.byId("SliderButton"), "click", lang.hitch(this, this._animateSliderConatainer));

            //if group items are present create web map list
            //else show no web map message
            if (this.config.groupItems.results.length > 0) {
                this._createWebMapList();
                //On Application load SliderButton was hidden, remove hidden class from sliderbutton so that it will be visible
                domClass.remove(dom.byId("SliderButton"), "esriCTHidden");
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
                dojo.applicationUtils.hideLoadingIndicator();
                domClass.remove(dom.byId("esriCTNoWebMapParentDiv"), "esriCTHidden");
                dom.byId("esriCTNoWebMapChildDiv").innerHTML = dojo.configData.i18n.webMapList.noWebMapInGroup;
            } catch (err) {
                dojo.applicationUtils.showError(err.message);
            }
        },

        /**
        * Show or hide slider container/right panel
        * @memberOf main
        */
        _animateSliderConatainer: function () {
            //show/ hide right slider panel and change slider button
            if (this._isSliderOpen) {
                this._isSliderOpen = false;
                dom.byId("SlideContainer").style.display = "none";
                dom.byId("CenterContainer").style.width = "69.6%";
                dom.byId("SlideContainermain").style.width = "0.1%";
                domClass.replace(dom.byId("SliderButton"), "esriCTSlideOutButton", "esriCTSlideInButton");
            } else {
                this._isSliderOpen = true;
                dom.byId("CenterContainer").style.width = "40%";
                dom.byId("SlideContainer").style.display = "block";
                dom.byId("SlideContainermain").style.width = "30%";
                domClass.replace(dom.byId("SliderButton"), "esriCTSlideInButton", "esriCTSlideOutButton");
            }
            //on opening/closing right panel map container size will change, so resize map.
            this._resizeMap();
        },

        /**
        * Load application theme
        * @memberOf main
        */
        _loadApplicationTheme: function () {
            var cssString, head, style;
            //if theme is configured
            if (dojo.configData.theme) {
                //substitute theme color values in theme template
                cssString = string.substitute(ThemeCss, {
                    SelectedThemeColor: dojo.configData.theme
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
                    }, dojo.query("head")[0]);
                }
            }
        },

        /**
        * Instantiate app-header widget
        * @memberOf main
        */
        _createApplicationHeader: function () {
            this._menusList.portalObject = this.config.portalObject;
            this.appHeader = new ApplicationHeader(this._menusList, domConstruct.create("div", {}, dom.byId('headerContainer')));
            //on report issues create geoform
            this.appHeader.reportIssue = lang.hitch(this, function () {
                this._createGeoForm();
            });
        },

        /**
        * Instantiate webmap-list widget and attach all the events
        * @memberOf main
        */
        _createWebMapList: function () {
            try {
                var webMapDescriptionFields, webMapListConfigData;
                //construct json data for the fields to be shown in descriptions, based on the configuration
                webMapDescriptionFields = {
                    "description": dojo.configData.webMapInfoDescription,
                    "snippet": dojo.configData.webMapInfoSnippet,
                    "owner": dojo.configData.webMapInfoOwner,
                    "created": dojo.configData.webMapInfoCreated,
                    "modified": dojo.configData.webMapInfoModified,
                    "licenseInfo": dojo.configData.webMapInfoLicenseInfo,
                    "accessInformation": dojo.configData.webMapInfoAccessInformation,
                    "tags": dojo.configData.webMapInfoTags,
                    "numViews": dojo.configData.webMapInfoNumViews,
                    "avgRating": dojo.configData.webMapInfoAvgRating
                };
                //create data required for the web map list widget
                webMapListConfigData = {
                    "webMapDescriptionFields": webMapDescriptionFields,
                    "configData": this.config,
                    "mapDivID": "mapDiv",
                    "changeExtentOnLayerChange": true
                };
                //create instance of web map list widget
                this._webMapListWidget = new WebMapList(webMapListConfigData, domConstruct.create("div", {}, dom.byId('LeftContainer')));
                //handel on map updated event
                this._webMapListWidget.mapUpdated = lang.hitch(this, function (mapObject) {
                    this._selectedMapDetails.map = mapObject;
                });
                //handle operational layer selected event in web map list
                //Update _selectedMapDetails
                //Close the geoform if it is open
                //Create/Clear Selection graphics layer used for highlighting in issue wall
                //Update Issue wall
                this._webMapListWidget.onOperationalLayerSelected = lang.hitch(this, function (details) {
                    //Hide GeoForm if it is Open
                    if (domClass.contains(dom.byId('geoformContainerDiv'), "esriCTVisible")) {
                        domClass.replace(dom.byId('geoformContainerDiv'), "esriCTHidden", "esriCTVisible");
                    }
                    //destroy previous geoform instance
                    this._destroyGeoForm();
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
                    //create or update issuelist
                    this._createIssueWall(details);
                    //show listview on webmap selected in mobile view
                    if (this._isWebMapListLoaded && dojowindow.getBox().w < 768) {
                        this.appHeader.mobileMenu.showListView();
                    }
                    /*by default _isWebMapListLoaded will be false and will be set to true once onOperationalLayerSelected
                    //set this flag to true after the if condition for checking if mobile and _isWebMapListLoaded,
                    //since by default in mobile view only home screen should be open*/
                    this._isWebMapListLoaded = true;
                });

                this._webMapListWidget.noMapsFound = lang.hitch(this, function () {
                    this._handleNoWebMapToDsiplay();
                });

                this._webMapListWidget.startup();
            } catch (err) {
                dojo.applicationUtils.showError(err.message);
            }
        },

        /**
        * Instantiate issue-wall widget
        * @memberOf main
        */
        _createIssueWall: function (data) {
            //Create IssueWall widget if not present
            if (!this._issueWallWidget) {
                this._issueWallWidget = new IssueWall(data, domConstruct.create("div", {}, dom.byId('SlideContainer')));
            } else {
                this._issueWallWidget.CreateIssueList(data);
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
            if (domClass.contains(dom.byId('geoformContainerDiv'), "esriCTHidden")) {
                if (this._selectedMapDetails && this._selectedMapDetails.operationalLayerId) {
                    //Show Geoform
                    domClass.replace(dom.byId('geoformContainerDiv'), "esriCTVisible", "esriCTHidden");
                    //if last shown geoform is for same the layer then don't do anything.
                    if (this.geoformInstance && this._selectedMapDetails.operationalLayerId === this.geoformInstance.layerId) {
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
                        basemapId: this._selectedMapDetails.itemInfo.itemData.baseMap.baseMapLayers[0].id
                    }, domConstruct.create("div", {}, dojo.byId("geoformContainerDiv")));
                    //on submitting issues in geoform update issue wall and main map to show newly updated issue.
                    this.geoformInstance.geoformSubmitted = lang.hitch(this, function () {
                        try {
                            //refresh main map so that new; created issue will be shown on it.
                            this._selectedMapDetails.map.getLayer(this._selectedMapDetails.operationalLayerId).refresh();
                            //create or update issue-list
                            this._createIssueWall(this._selectedMapDetails);
                        } catch (ex) {
                            dojo.applicationUtils.showError(ex.message);
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
                domConstruct.empty(dom.byId("geoformContainerDiv"));
                this.geoformInstance = null;
            }
        },

        /**
        * Resize map and sets center of the map
        * @memberOf main
        */
        _resizeMap: function () {
            try {
                var mapCenter;
                //Map widget will not work properly if map is resized when the container holding map is having display none
                //so check if map instance is present and map container's display is block
                //get the current center of the map, and set the mapdiv's height width to 100% so that it display's completely in its container.
                if (this._selectedMapDetails.map && domStyle.get(dom.byId("CenterContainer"), "display") === "block") {
                    mapCenter = this._selectedMapDetails.map.extent.getCenter();
                    domStyle.set(dom.byId("mapDiv"), "height", "100%");
                    domStyle.set(dom.byId("mapDiv"), "width", "100%");
                }
                //after timeout again check both the conditions and resize the map and center it to the previous map-center.
                setTimeout(lang.hitch(this, function () {
                    if (this._selectedMapDetails.map && domStyle.get(dom.byId("CenterContainer"), "display") === "block") {
                        this._selectedMapDetails.map.resize();
                        this._selectedMapDetails.map.reposition();
                        this._selectedMapDetails.map.centerAt(mapCenter);
                    }
                }), 500);
            } catch (err) {
                dojo.applicationUtils.showError(err.message);
            }
        }

    });
});
