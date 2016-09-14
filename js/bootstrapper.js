/*global define,document,dojo,dojoConfig,window,alert,setTimeout,$ */
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
    "config/template-config",
    "application/template",
    "widgets/sign-in/sign-in",
    "application/utils/utils",
    "dojo/dom-construct",
    "dojo/_base/lang"
], function (
    declare,
    TemplateConfig,
    Template,
    ApplicationSignIn,
    ApplicationUtils,
    domConstruct,
    lang
) {
    return declare(null, {
        boilerPlateTemplateObject: null,
        appUtils: null,

        /**
        * This function is called when user needs to start operation of widget
        * @memberOf js/bootstrapper
        */
        startup: function () {
            // create the template. This will take care of all the logic required for template applications
            this.boilerPlateTemplateObject = new Template(TemplateConfig);
            this.appUtils = new ApplicationUtils({
                "config": this.boilerPlateTemplateObject
            });
            this.boilerPlateTemplateObject.startup().then(lang.hitch(this, function (config) {
                //By default geolocation will be set to false
                config.geolocation = false;
                //Check whether browser supprots geolocation
                navigator.geolocation.getCurrentPosition(lang.hitch(this, function (position) {
                    config.geolocation = {};
                    config.geolocation = position;
                }), function () {
                    config.geolocation = false;
                });
                // The config object contains the following properties: helper services, (optionally)
                // i18n, appid, webmap and any custom values defined by the application.
                // Load Application if valid group-id is configured, if not show error message.
                if (lang.trim(config.group) !== "") {
                    this.initApplication(config);
                } else {
                    this.appUtils.showErrorScreen(this.boilerPlateTemplateObject.config.i18n.main.noGroup);
                    this.appUtils.hideLoadingIndicator();
                }
                // Set shortcut icon
                this._setApplicationShortcutIcon(config);
            }), lang.hitch(this, function (error) {
                var message = error.message;
                // handle error when group is not configured
                if (message.toLowerCase() === "group undefined.") {
                    message = this.boilerPlateTemplateObject.config.i18n.main.noGroup;
                }
                this.appUtils.showErrorScreen(message);
                this.appUtils.hideLoadingIndicator();
            }));
        },

        /**
        * This function is used to initiate the main application
        * @memberOf js/bootstrapper
        */
        initApplication: function () {
            var citizenApp;
            // create citizenApp and pass the boiler plate instance to it
            citizenApp = new ApplicationSignIn();
            citizenApp.startup(this.boilerPlateTemplateObject, this.appUtils);
        },

        /**
        * Set application shortcut icon
        * @memberOf js/bootstrapper
        */
        _setApplicationShortcutIcon: function (config) {
            var favIcon;
            //If fav icon is present use it
            if (config.applicationFavicon && lang.trim(config.applicationFavicon).length !== 0) {
                favIcon = config.applicationFavicon;
            } else if (config.applicationIcon && lang.trim(config.applicationIcon).length !== 0) {
                //If fav icon is not present, use application icon
                favIcon = config.applicationIcon;
            } else if (config.groupInfo.results.length > 0 && config.groupInfo.results[0].thumbnailUrl) {
                //If application icon is not present, use group icon
                favIcon = config.groupInfo.results[0].thumbnailUrl;
            } else {
                //else use default fav icon
                favIcon = "/images/favicon.ico";
            }
            this._loadIcons("shortcut icon", favIcon);
        },

        /**
        * Load icons
        * @memberOf js/bootstrapper
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
        }
    });
});
