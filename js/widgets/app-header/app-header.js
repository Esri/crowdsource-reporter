/*global define,dojo,dojoConfig,alert */
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
//============================================================================================================================//
define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/on",
    "dojo/window",
    "dojo/text!./templates/app-header.html",
    "widgets/mobile-menu/mobile-menu",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin"
], function (declare, domConstruct, lang, dom, domAttr, domClass, domStyle, on, dojowindow, template, MobileMenu, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        mobileMenu: null,
        _config: {
            "homeMenu": false,
            "mapView": false,
            "listView": false,
            "reportIt": false,
            "signIn": false,
            "signOut": false
        },

        /**
        * Widget is constructed.
        * @param{object} configData to be mixed
        * @memberOf widgets/app-header/app-header
        */
        constructor: function (configData) {
            if (configData) {
                lang.mixin(this._config, configData);
            }
        },

        /**
        * Widget is initialized.
        * @memberOf widgets/app-header/app-header
        */
        postCreate: function () {
            var applicationName, applicationIcon;
            if (dojo.configData.applicationName && lang.trim(dojo.configData.applicationName).length !== 0) {
                applicationName = dojo.configData.applicationName;
            } else if (dojo.configData.groupInfo.results.length > 0 && dojo.configData.groupInfo.results[0].title) {
                applicationName = dojo.configData.groupInfo.results[0].title;
            } else {
                applicationName = dojo.configData.i18n.signin.noGroupNameText;
            }
            document.title = applicationName;
            domAttr.set(this.applicationHeaderName, "innerHTML", applicationName);

            // if application icon is configured, display the configured icon in application header
            // else if group logo is present, display group logo in application header
            // if both the above mentioned icons are not present, display default icon in application header
            if (dojo.configData.applicationIcon && lang.trim(dojo.configData.applicationIcon).length !== 0) {
                if (dojo.configData.applicationIcon.indexOf("http") === 0) {
                    domAttr.set(this.applicationHeaderIcon, "src", dojo.configData.applicationIcon);
                } else {
                    if (dojo.configData.applicationIcon.indexOf("/") === 0) {
                        domAttr.set(this.applicationHeaderIcon, "src", dojoConfig.baseURL + dojo.configData.applicationIcon);
                    } else {
                        domAttr.set(this.applicationHeaderIcon, "src", dojoConfig.baseURL + "/" + dojo.configData.applicationIcon);
                    }
                }
            } else if (dojo.configData.groupInfo.results.length > 0 && dojo.configData.groupInfo.results[0].thumbnailUrl) {
                domAttr.set(this.applicationHeaderIcon, "src", dojo.configData.groupInfo.results[0].thumbnailUrl);
            } else {
                domAttr.set(this.applicationHeaderIcon, "src", dojoConfig.baseURL + "/images/app-icon.png");
            }
            applicationIcon = domAttr.get(this.applicationHeaderIcon, "src");

            // On application icon/name click navigate to home screen on mobile devices
            on(this.applicationHeaderIcon, "click", lang.hitch(this, this._navigateToHome));
            on(this.applicationHeaderName, "click", lang.hitch(this, this._navigateToHome));

            // load application shortcut icons
            this._loadIcons("apple-touch-icon-precomposed", applicationIcon);
            this._loadIcons("apple-touch-icon", applicationIcon);
            this._setApplicationShortcutIcon();

            // create mobile menu
            this.mobileMenu = new MobileMenu(this._config, domConstruct.create("div", {}, dom.byId("mobilemenu")));
            this.mobileMenu.hideMobileMenu = lang.hitch(this, this._animateMenuContainer);
            this.mobileMenu.reportItClicked = lang.hitch(this, this._reportIssueClicked);
            this.mobileMenu.myIssuesClicked = lang.hitch(this, this._showMyIssuesClicked);
            this.mobileMenu.listViewClicked = lang.hitch(this, this._showIssueListClicked);

            on(this.mobileMenuBurger, "click", lang.hitch(this, this._animateMenuContainer));
            on(this.myIssueButton, "click", lang.hitch(this, this._showMyIssuesClicked));
            on(this.reportIssueButton, "click", lang.hitch(this, this._reportIssueClicked));
            on(this.signOutButton, "click", lang.hitch(this, this._signOutClicked));
            this._showHideMenus();

            domAttr.set(this.myIssueButton, "title", dojo.configData.i18n.myIssues.myIssuesTooltip);
            domAttr.set(this.reportIssueButton, "title", dojo.configData.i18n.geoform.geoformTooltip);
            domAttr.set(this.signInButton, "title", dojo.configData.i18n.signin.signInTooltip);
            domAttr.set(this.signOutButton, "title", dojo.configData.i18n.signin.signOutTooltip);
        },

        /**
        * Navigate the view to home screen.
        * @memberOf widgets/app-header/app-header
        */
        _navigateToHome: function () {
            //Check if application is in mobile view and mobile-menu exist
            if (dojowindow.getBox().w < 768 && this.mobileMenu) {
                this.mobileMenu.homeMenuClicked(false);
            }
        },

        /**
        * Sign out of AGOL
        * @memberOf widgets/app-header/app-header
        */
        _signOutClicked: function () {
            // user is logged in via AGOL portal login
            if (this._config.portalObject) {
                if (this._config.portalObject.getPortalUser()) {
                    this._config.portalObject.signOut().then(lang.hitch(this, function () {
                        location.reload();
                    }));
                } else {
                    location.reload();
                }
            } else {
                location.reload();
            }
        },

        /**
        * Show or hide menu items based on configuration settings
        * @memberOf widgets/app-header/app-header
        */
        _showHideMenus: function () {
            if (this._config.reportIt) {
                domClass.remove(this.reportIssueButton, "esriCTHidden");
            } else {
                domClass.add(this.reportIssueButton, "esriCTHidden");
            }
            if (this._config.signIn) {
                domClass.remove(this.signInButton, "esriCTHidden");
            } else {
                domClass.add(this.signInButton, "esriCTHidden");
            }
            if (this._config.signOut) {
                domClass.remove(this.signOutButton, "esriCTHidden");
                domClass.remove(this.myIssueButton, "esriCTHidden");
            } else {
                domClass.add(this.signOutButton, "esriCTHidden");
            }
        },

        /**
        * Update menu list
        * @memberOf widgets/app-header/app-header
        */
        updateMenuList: function (menuList) {
            if (menuList) {
                lang.mixin(this._config, menuList);
            }
            this._showHideMenus();
            this.mobileMenu.updateMenuList(menuList);
        },

        /**
        * Set application shortcut icon
        * @memberOf widgets/app-header/app-header
        */
        _setApplicationShortcutIcon: function () {
            if (dojo.configData.applicationFavicon && lang.trim(dojo.configData.applicationFavicon).length !== 0) {
                this._loadIcons("shortcut icon", dojo.configData.applicationFavicon);
            }
        },

        /**
        * Load icons
        * @memberOf widgets/app-header/app-header
        */
        _loadIcons: function (rel, iconPath) {
            var icon;
            icon = domConstruct.create("link");
            icon.rel = rel;
            icon.type = "image/x-icon";
            if (iconPath.indexOf("http") === 0) {
                icon.href = iconPath;
            } else {
                icon.href = dojoConfig.baseURL + iconPath;
            }
            document.getElementsByTagName('head')[0].appendChild(icon);
        },

        _reportIssueClicked: function (evt) {
            this.reportIssue(evt);
        },

        reportIssue: function (evt) {
            return evt;
        },

        _showMyIssuesClicked: function (evt) {
            this.showMyIssues(evt);
        },

        showMyIssues: function (evt) {
            return evt;
        },

        _showIssueListClicked: function (evt) {
            this.showIssueList(evt);
        },

        showIssueList: function (evt) {
            return evt;
        },

        /**
        * Show or hide mobile menu container
        * @memberOf widgets/app-header/app-header
        */
        _animateMenuContainer: function () {
            domClass.toggle(this.mobileMenuBurger, "active");
            domClass.toggle(dom.byId('mobileMenuFooter'), "esriCTHidden");
            domClass.toggle(dom.byId('mobilemenu'), "esriCTHideMobileMenu");
        }
    });
});
