/*global define,dojo */
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
    "dojo/dom-style",
    "dojo/dom-attr",
    "dojo/dom-class",
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

], function (templateConfig, mainTemplate, Main, declare, domConstruct, domStyle, domAttr, domClass, lang, topic, on, Deferred, all, esriPortal, template, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin) {
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
            mapView: "Map View",
            listView: "List View",
            reportIt: "Report It",
            signIn: "Sign in",
            signOut: "Sign out"
        },

        loggedInUser: "",

        /**
        * This function is called when widget is constructed.
        * @param{object} configData to be mixed
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        constructor: function (configData) {
            if (dojo.configData.i18n.webMapList) {
                lang.mixin(this.nls, dojo.configData.i18n.mobileMenu);
            }
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
        },

        hideMobileMenu: function (evt) {
            return evt;
        },

        /**
        * Show or hide menu
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _showHideMenus: function () {
            if (this._config.homeMenu) {
                domClass.remove(this.homeMenu, "esriCTHidden");
                this.own(on(this.homeMenu, "click", lang.hitch(this, this._homeMenuClicked)));
            } else {
                domClass.add(this.homeMenu, "esriCTHidden");
            }

            if (this._config.mapView) {
                domClass.remove(this.mapView, "esriCTHidden");
                this.own(on(this.mapView, "click", lang.hitch(this, this._mapViewClicked)));
            } else {
                domClass.add(this.mapView, "esriCTHidden");
            }

            if (this._config.listView) {
                domClass.remove(this.listView, "esriCTHidden");
                this.own(on(this.listView, "click", lang.hitch(this, this._listViewClicked)));
            } else {
                domClass.add(this.listView, "esriCTHidden");
            }

            if (this._config.reportIt) {
                domClass.remove(this.reportIt, "esriCTHidden");
                this.own(on(this.reportIt, "click", lang.hitch(this, this._reportItClicked)));
            } else {
                domClass.add(this.reportIt, "esriCTHidden");
            }

            if (this._config.signIn) {
                domClass.remove(this.signIn, "esriCTHidden");
                this.own(on(this.signIn, "click", lang.hitch(this, this._signInClicked)));
            } else {
                domClass.add(this.signIn, "esriCTHidden");
            }

            if (this._config.signOut) {
                domClass.remove(this.signOut, "esriCTHidden");
                this.own(on(this.signOut, "click", lang.hitch(this, this._signOutClicked)));
            } else {
                domClass.add(this.signOut, "esriCTHidden");
            }
        },

        /**
        * Update menu list
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        updateMenuList: function (menuList) {
            if (menuList) {
                lang.mixin(this._config, menuList);
            }
            this._showHideMenus();
        },

        /**
        * Executed when user clicks on Home option
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _homeMenuClicked: function () {
            this._lastSelectedView.style.display = "none";
            this._lastSelectedView = dojo.byId("LeftContainer");
            dojo.byId("LeftContainer").style.display = "block";
            this.hideMobileMenu();
        },

        /**
        * Executed when user clicks on Map view option
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _mapViewClicked: function () {
            this._lastSelectedView.style.display = "none";
            this._lastSelectedView = dojo.byId("CenterContainer");
            dojo.byId("CenterContainer").style.display = "block";
            this.hideMobileMenu();
            topic.publish("resizeMap");
        },

        /**
        * Executed when user clicks on List view option
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _listViewClicked: function () {
            this.showListView();
            this.hideMobileMenu();
        },

        /**
        * Executed when user clicks on Report it option
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        reportItClicked: function (evt) {
            return evt;
        },

        /**
        * Show list view container
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        showListView: function () {
            this._lastSelectedView.style.display = "none";
            this._lastSelectedView = dojo.byId("SlideContainermain");
            dojo.byId("SlideContainermain").style.display = "block";
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
