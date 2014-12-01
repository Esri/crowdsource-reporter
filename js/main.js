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
define(["dojo/_base/declare", "dojo/_base/lang", "esri/arcgis/utils", "dojo/dom", "dojo/dom-class", "dojo/on", "dojo/domReady!"], function (
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
    ApplicationHeader,
    WebMapList,
    IssueWall,
    ApplicationUtils,
    TemplateConfig
) {
    return declare(null, {
        config: {},
        _groupItems: [],
        _isSliderOpen: true,
        _isWebMapListLoaded: false,
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
                if (loggedInUser) {
                    this.config.logInDetails = {
                        "userName": loggedInUser.username,
                        "token": loggedInUser.credential.token
                    };
                    this._menusList.signOut = true;
                    this._menusList.signIn = false;
                } else {
                    this.config.logInDetails = {
                        "userName": this.config.i18n.main.anonymousUserName,
                        "token": ""
                    };
                    this._menusList.signIn = true;
                    this._menusList.signOut = false;
                }

                //enable queryForGroupItems in templateconfig
                dojo.BoilerPlateTemplate.templateConfig.queryForGroupItems = true;

                //construct the query params if found in group info
                if (config.groupInfo.results && config.groupInfo.results.length > 0) {
                    lang.mixin(queryParams, dojo.BoilerPlateTemplate.templateConfig.groupParams);
                    if (config.groupInfo.results[0].sortField) {
                        queryParams.sortField = config.groupInfo.results[0].sortField;
                    }
                    if (config.groupInfo.results[0].sortOrder) {
                        queryParams.sortOrder = config.groupInfo.results[0].sortOrder;
                    }
                }
                //Pass the newly constructed queryparams from groupinfo.
                //If query params not available in groupinfo or proup is private items will be sorted according to modified date.
                this._loadGroupItems(queryParams);
            } else {
                error = new Error("Main:: Config is not defined");
                dojo.applicationUtils.showError(error);
            }
        },

        _loadGroupItems: function (queryParams) {
            dojo.BoilerPlateTemplate.queryGroupItems(queryParams).then(lang.hitch(this, this._groupItemsLoaded));
        },

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
        * Loads All application widgets.
        * @memberOf main
        */
        _loadApplication: function () {
            dojo.configData = this.config;
            if (!dojo.configData.showNullValueAs) {
                dojo.configData.showNullValueAs = "N/A";
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

            if (this.config.groupItems.results.length > 0) {
                this._createWebMapList();
                //remove hidden class from sliderbutton
                domClass.remove(dom.byId("SliderButton"), "esriCTHidden");
            } else {
                this._handleNoWebMapToDsiplay();
            }
        },

        /**
        * Handle scenario when there is no web map
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
            this._resizeMap();
        },

        /**
        * Load application theme
        * @memberOf main
        */
        _loadApplicationTheme: function () {
            var cssString;
            if (dojo.configData.theme) {
                cssString = string.substitute(ThemeCss, {
                    SelectedThemeColor: dojo.configData.theme
                });
                domConstruct.create("style", {
                    "type": "text/css",
                    "innerHTML": cssString
                }, dojo.query("head")[0]);
            }
        },

        /**
        * Instantiate app-header widget
        * @memberOf main
        */
        _createApplicationHeader: function () {
            this.appHeader = new ApplicationHeader(this._menusList, domConstruct.create("div", {}, dom.byId('headerContainer')));
        },

        /**
        * Instantiate webmap-list widget
        * @memberOf main
        */
        _createWebMapList: function () {
            try {
                var webMapDescriptionFields, webMapListConfigData;
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

                webMapListConfigData = {
                    "webMapDescriptionFields": webMapDescriptionFields,
                    "configData": this.config,
                    "mapDivID": "mapDiv"
                };

                this._webMapListWidget = new WebMapList(webMapListConfigData, domConstruct.create("div", {}, dom.byId('LeftContainer')));

                this._webMapListWidget.mapUpdated = lang.hitch(this, function (mapObject) {
                    this.map = mapObject;
                });

                this._webMapListWidget.OnOperationalLayerSelected = lang.hitch(this, function (details) {
                    this.map = details.map;
                    //create or update issuelist
                    this._createIssueWall(details);
                    //show listview on webmap selected in mobile view
                    if (this._isWebMapListLoaded && dojowindow.getBox().w < 768) {
                        this.appHeader.mobileMenu.showListView();
                    }

                    /*by default _isWebMapListLoaded will be false and will be set to true once OnOperationalLayerSelected
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
            if (!this._issueWallWidget) {
                this._issueWallWidget = new IssueWall(data, domConstruct.create("div", {}, dom.byId('SlideContainer')));
            } else {
                this._issueWallWidget.CreateIssueList(data);
            }
        },

        /**
        * Resize map on window resize
        * @memberOf main
        */
        _resizeMap: function () {
            try {
                if (this.map && domStyle.get(dom.byId("CenterContainer"), "display") === "block") {
                    var mapCenter = this.map.extent.getCenter();
                    domStyle.set(dom.byId("mapDiv"), "height", "100%");
                    domStyle.set(dom.byId("mapDiv"), "width", "100%");
                }
                setTimeout(lang.hitch(this, function () {
                    if (this.map && domStyle.get(dom.byId("CenterContainer"), "display") === "block") {
                        this.map.resize();
                        this.map.reposition();
                        this.map.centerAt(mapCenter);
                    }
                }), 500);
            } catch (err) {
                dojo.applicationUtils.showError(err.message);
            }
        }

    });
});
