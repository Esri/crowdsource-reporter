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
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/dom-geometry",
    "dojo/window",
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

], function (declare, domConstruct, domGeom, win, domStyle, domAttr, domClass, dom, lang, topic, on, Deferred, all, esriPortal, template, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        _lastSelectedView: null,
        config: {
            "help": false,
            "signIn": false,
            "signOut": false
        },
        i18n: {
            myReport: "My Reports",
            signIn: "Sign in",
            signOut: "Sign out",
            signInTooltip: "Sign In",
            signOutTooltip: "Sign Out",
            myReportTooltip: "My Reports"
        },

        /**
        * This function is called when widget is constructed.
        * @param{object} configData to be mixed
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        constructor: function (configData) {
            // check if configData is present, then merge it with config object
            if (configData) {
                lang.mixin(this, configData);
            }
            // check if configurable text is present in nls for app-header widget, then merge it with local nls object
            if (this.appConfig.i18n.appHeader) {
                lang.mixin(this.i18n, this.appConfig.i18n.appHeader);
            }
        },

        /**
        * This function is called when widget is initialized.
        * @param{object} configData to be mixed
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        postCreate: function () {
            this._showHideMenus();
            //Handle Window Resize
            on(window, "resize", lang.hitch(this, function () {
                this._setMenuContainerHeight();
            }));
            on(window, "orientationchange", lang.hitch(this, function () {
                this._setMenuContainerHeight();
            }));
            domAttr.set(this.help, "innerHTML", this.appConfig.helpLinkText);
            domAttr.set(this.help, "title", this.appConfig.helpLinkText);
        },

        /**
        * Updates menu list based on the
        * @param{object} menuList to be updated
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        updateMenuList: function (menuList) {
            // mix-in the new menu list and show hide menus based on new config
            if (menuList) {
                lang.mixin(this.config, menuList);
            }
            this._showHideMenus();
        },

        /**
        * Show or hide menu in the menu list depending on the configuration
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _showHideMenus: function () {
            // check if signIn is to be shown in list and accordingly set it's display and handle it's click
            if (this.config.signIn) {
                domClass.remove(this.signIn, "esriCTHidden");
                this.own(on(this.signIn, "click", lang.hitch(this, this._signInClicked)));
            } else {
                domClass.add(this.signIn, "esriCTHidden");
            }

            // check if signout is to be shown in list and accordingly set it's display and handle it's click
            // if signout is to be shown then also show the myIssues in list and handel its click,
            // since signout will be shown only ones user is logged in with any of the logins provided.
            if (this.config.signOut) {
                //show signout option and handle its click event
                domClass.remove(this.signOut, "esriCTHidden");
                this.own(on(this.signOut, "click", lang.hitch(this, this._signOutClicked)));

                //show my issues and handle it's click event
                domClass.remove(this.myReport, "esriCTHidden");
                this.own(on(this.myReport, "click", lang.hitch(this, this._myIssuesClicked)));

                //set logged in user name
                domAttr.set(this.loggedinUserNameDiv, "innerHTML", this.appConfig.logInDetails.userName);

                //show Mobile Header consisting logged in user name
                domClass.remove(this.mobileMenuHeader, "esriCTHidden");

                this._setMenuContainerHeight();
            } else {
                domClass.add(this.signOut, "esriCTHidden");
                domStyle.set(this.mainMenuContainer, "height", "100%");
            }
            if (this.appConfig.enableHelp) {
                // check if help is to be shown in list and accordingly set it's display and handle it's click
                domClass.remove(this.help, "esriCTHidden");
            }
            this.own(on(this.help, "click", lang.hitch(this, this._helpClicked)));
        },

        /**
        * Set MenuContainer Height according to window height
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _setMenuContainerHeight: function () {
            // check if logged in details are shown then only reset the height subtracting height of login-details from window.
            if (!domClass.contains(this.loggedinUserNameDiv, "esriCTHidden")) {
                var menuContainerHeight;
                menuContainerHeight = (win.getBox().h - 125) + "px";
                domStyle.set(this.mainMenuContainer, "height", menuContainerHeight);
            }
        },

        /**
        * Executed when user clicks on My issues option
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _myIssuesClicked: function (evt) {
            this.onMyIssuesClicked(evt);
        },

        /**
        * Executed when user clicks on Sign in option
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _signInClicked: function () {
            this.onSignInClicked();
        },

        /**
        * Executed when user clicks on Sign out option
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _signOutClicked: function (evt) {
            this.onSignOutClicked(evt);
        },

        /**
        * Executed when user clicks on Sign out option
        * @memberOf widgets/mobile-menu/mobile-menu
        */
        _helpClicked: function (evt) {
            this.onHelpClicked(evt);
        },

        //Events generated form mobile menu
        onSignInClicked: function (evt) {
            return evt;
        },

        onSignOutClicked: function (evt) {
            return evt;
        },

        onHelpClicked: function (evt) {
            return evt;
        },

        onMyIssuesClicked: function (evt) {
            return evt;
        }
    });
});
