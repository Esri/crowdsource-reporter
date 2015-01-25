/*global define,dojo,alert */
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
    "application/template-options",
    "application/template",
    "application/main",
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/dom-geometry",
    "dojo/dom-style",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/dom",
    "dojo/_base/lang",
    "dojo/topic",
    "dojo/on",
    "dojo/Deferred",
    "dojo/promise/all",
    "esri/arcgis/Portal",
    "dojo/text!./templates/mobile-menu.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin"

], function (templateConfig, mainTemplate, Main, declare, domConstruct, domGeom, domStyle, domAttr, domClass, dom, lang, topic, on, Deferred, all, esriPortal, template, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        _lastSelectedView: null,
        _config: {
            "homeMenu": false,
            "mapView": false,
            "listView": false,
            "reportIt": false,
            "signIn": false,
            "signOut": false
        },
        nls: {
            home: "Home",
            myIssuesView: "My Issues",
            mapView: "Map View",
            listView: "List View",
            reportIt: "Report It",
            signIn: "Sign in",
            signOut: "Sign out",
            loggedInAs: "Logged in as"
        },

        /**
        * This function is called when widget is constructed.
        * @param{object} configData to be mixed
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        constructor: function (configData) {
            // check if configurable text is present in nls for webmaplist widget, then merge it with local nls object
            if (dojo.configData.i18n.mobileMenu) {
                lang.mixin(this.nls, dojo.configData.i18n.mobileMenu);
            }
            // check if configData is present, then merge it with _config object
            if (configData) {
                lang.mixin(this._config, configData);
            }
        },

        /**
        * This function is called when widget is initialized.
        * @param{object} configData to be mixed
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        postCreate: function () {
            //by default select home(left container)
            this._lastSelectedView = dojo.byId("LeftContainer");
            this._showHideMenus();
            //Handle Window Resize
            on(window, "resize", lang.hitch(this, function () {
                this._setMenuContainerHeight();
            }));
        },

        /**
        * Show or hide menu in the menu list depending on the configuration
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _showHideMenus: function () {
            // check if homemenu is to be shown in list and accordingly set it's display and handle it's click
            if (this._config.homeMenu) {
                domClass.remove(this.homeMenu, "esriCTHidden");
                this.own(on(this.homeMenu, "click", lang.hitch(this, this._homeMenuClicked)));
            } else {
                domClass.add(this.homeMenu, "esriCTHidden");
            }

            // check if mapView is to be shown in list and accordingly set it's display and handle it's click
            if (this._config.mapView) {
                domClass.remove(this.mapView, "esriCTHidden");
                this.own(on(this.mapView, "click", lang.hitch(this, this._mapViewClicked)));
            } else {
                domClass.add(this.mapView, "esriCTHidden");
            }

            // check if listView is to be shown in list and accordingly set it's display and handle it's click
            if (this._config.listView) {
                domClass.remove(this.listView, "esriCTHidden");
                this.own(on(this.listView, "click", lang.hitch(this, this._listViewClicked)));
            } else {
                domClass.add(this.listView, "esriCTHidden");
            }

            // check if reportIt is to be shown in list and accordingly set it's display and handle it's click
            if (this._config.reportIt) {
                domClass.remove(this.reportIt, "esriCTHidden");
                this.own(on(this.reportIt, "click", lang.hitch(this, this._reportItClicked)));
            } else {
                domClass.add(this.reportIt, "esriCTHidden");
            }

            // check if signIn is to be shown in list and accordingly set it's display and handle it's click
            if (this._config.signIn) {
                domClass.remove(this.signIn, "esriCTHidden");
                this.own(on(this.signIn, "click", lang.hitch(this, this._signInClicked)));
            } else {
                domClass.add(this.signIn, "esriCTHidden");
            }

            // check if signout is to be shown in list and accordingly set it's display and handle it's click
            // if signout is to be shown then also show the myIssues in list and handel its click,
            // since signout will be shown only ones user is logged in with any of the logins provided.
            if (this._config.signOut) {
                domClass.remove(this.signOut, "esriCTHidden");
                this.own(on(this.signOut, "click", lang.hitch(this, this._signOutClicked)));
                domClass.remove(this.myIssuesView, "esriCTHidden");
                this.own(on(this.myIssuesView, "click", lang.hitch(this, this._myIssuesClicked)));
                domAttr.set(this.loggedinUserNameDiv, "innerHTML", dojo.configData.logInDetails.userName);
                domClass.remove(this.loggedinUserNameDiv, "esriCTHidden");
                domClass.remove(this.loggedinAsDiv, "esriCTHidden");
                this._setMenuContainerHeight();
            } else {
                domClass.add(this.signOut, "esriCTHidden");
                domStyle.set(this.mainMenuContainer, "height", "100%");
            }
        },

        /**
        * Set MenuContainer Height according to window height
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _setMenuContainerHeight: function () {
            // check if logged in details are shown then only reset the height subtracting height of login-details from window.
            if (!domClass.contains(this.loggedinUserNameDiv, "esriCTHidden")) {
                var menuContainerHeight;
                menuContainerHeight = (window.innerHeight - 125) + "px";
                domStyle.set(this.mainMenuContainer, "height", menuContainerHeight);
            }
        },

        /**
        * Updates menu list based on the
        * @param{object} menuList to be updated
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        updateMenuList: function (menuList) {
            // mix-in the new menu list and show hide menus based on new config
            if (menuList) {
                lang.mixin(this._config, menuList);
            }
            this._showHideMenus();
        },

        /**
        * Event which will be generated when mobile menu is set to hidden
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        hideMobileMenu: function (evt) {
            return evt;
        },

        /**
        * Event which will be generated when user clicks report-it option
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        reportItClicked: function (evt) {
            return evt;
        },

        /**
        * Event which will be generated when user clicks my-issues option
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        myIssuesClicked: function (evt) {
            return evt;
        },

        /**
        * Shows map-view and hide the previous view, also resizes the map container.
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        showMapView: function () {
            this._lastSelectedView.style.display = "none";
            this._lastSelectedView = dojo.byId("CenterContainer");
            dojo.byId("CenterContainer").style.display = "block";
            topic.publish("resizeMap");
        },

        /**
        * Shows list view container and hide the previous vie.
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        showListView: function () {
            this._lastSelectedView.style.display = "none";
            this._lastSelectedView = dojo.byId("SlideContainermain");
            dojo.byId("SlideContainermain").style.display = "block";
        },

        /**
        * Executed when user clicks on Home option
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _homeMenuClicked: function () {
            domClass.replace(dom.byId('geoformContainerDiv'), "esriCTHidden", "esriCTVisible");
            this._lastSelectedView.style.display = "none";
            this._lastSelectedView = dojo.byId("LeftContainer");
            dojo.byId("LeftContainer").style.display = "block";
            this.hideMobileMenu();
        },

        /**
        * Executed when user clicks on My issues option
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _myIssuesClicked: function (evt) {
            this.showListView();
            this.hideMobileMenu();
            this.myIssuesClicked(evt);
        },

        /**
        * Executed when user clicks on Map view option
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _mapViewClicked: function () {
            domClass.replace(dom.byId('geoformContainerDiv'), "esriCTHidden", "esriCTVisible");
            this.showMapView();
            this.hideMobileMenu();
        },


        /**
        * Executed when user clicks on List view option
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _listViewClicked: function () {
            domClass.replace(dom.byId('geoformContainerDiv'), "esriCTHidden", "esriCTVisible");
            this.showListView();
            this.hideMobileMenu();
            this.listViewClicked();
        },

        /**
        * Show Report it container
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _reportItClicked: function (evt) {
            this.hideMobileMenu();
            this.reportItClicked();
        },

        /**
        * Executed when user clicks on Sign in option
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _signInClicked: function () {
            location.reload();
            this.hideMobileMenu();
        },

        /**
        * Executed when user clicks on Sign out option
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _signOutClicked: function () {
            location.reload();
            this.hideMobileMenu();
        }

    });
});
