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
    "dojo/_base/lang",
    "dojo/text!css/theme-template.css",
    "dojo/string",
    "dojo/query",
    "esri/Color"
], function (
    declare,
    TemplateConfig,
    Template,
    ApplicationSignIn,
    ApplicationUtils,
    domConstruct,
    lang,
    ThemeCss,
    string,
    query,
    Color
) {
    return declare(null, {
        boilerPlateTemplateObject: null,
        appUtils: null,

        /**
        * This function is called when user needs to start operation of widget
        * @memberOf js/bootstrapper
        */
        startup: function () {
            var link;
            // create the template. This will take care of all the logic required for template applications
            this.boilerPlateTemplateObject = new Template(TemplateConfig);
            this.appUtils = new ApplicationUtils({
                "config": this.boilerPlateTemplateObject
            });
            this.boilerPlateTemplateObject.startup().then(lang.hitch(this, function (config) {
                // Set shortcut icon
                this._setApplicationShortcutIcon(config);
                config.portalObject = this.boilerPlateTemplateObject.portal;
                //By default geolocation will be set to false
                config.geolocation = false;
                //Check whether browser supports geolocation
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
                //If application is loaded in RTL mode, change styles of required nodes
                if (config.i18n.direction === "rtl") {
                    link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    link.href = "./css/rtl.css";
                    document.getElementsByTagName('head')[0].appendChild(link);
                }
                this.config = config;
                // Load app theme
                this._loadApplicationTheme();
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
            this._loadIcons("apple-touch-icon-precomposed", favIcon);
            this._loadIcons("apple-touch-icon", favIcon);
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
        },

        //--------------- Theme Section Starts ------------------//

        /**
        * Load application theme
        * @memberOf js/bootstrapper
        */
        _loadApplicationTheme: function () {
            var cssString, head, style;
            //if theme is configured
            if (this.config.theme) {
                //set the orgtheme for application
                this._setOrgTheme();
                //substitute color values in theme template
                cssString = string.substitute(ThemeCss, {
                    SelectedThemeColor: this.config.theme,
                    // Configured/Org colors for app theme
                    BodyBackgroundColor: this.config.appTheme.body.background,
                    BodyTextColor: this.config.appTheme.body.text,
                    HeaderBackgroundColor: this.config.appTheme.header.background,
                    HeaderTextColor: this.config.theme,
                    ButtonBackgroundColor: this.config.appTheme.button.background,
                    ButtonTextColor: this.config.appTheme.button.text,
                    // Calculated colors
                    CalculatedBodyBackgroundColor: this.config.appTheme.body.calculatedBackground,
                    CalculatedBodyTextColor: this.config.appTheme.body.calculatedText,
                    CalculatedHeaderBackgroundColor: this.config.appTheme.header.calculatedBackground,
                    CalculatedHeaderTextColor: this.config.appTheme.header.calculatedText,
                    OverlayBackgroundColor:
                        this.appUtils.getOverlayBackgroundColor(this.config.appTheme.header.text)
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
        * Set's the org theme properties for the app theme
        * This function will create dafault app theme if appTheme is not available in config
        * @memberOf js/bootstrapper
        */
        _setOrgTheme: function () {
            //Set the app theme as per configuration
            this.config.appTheme = {
                "header": {
                    "background": this.config.headerBackgroundColor,
                    "text": this.config.theme
                },
                "body": {
                    "background": this.config.bodyBackgroundColor,
                    "text": this.config.bodyTextColor
                },
                "button": {
                    "background": this.config.buttonBackgroundColor,
                    "text": this.config.buttonTextColor
                }
            };
            //if logo is not configured by user and in org properties we have valid logo then only use the logo from org
            if (!this.config.applicationIcon && this.config.appTheme.logo && this.config.appTheme.logo.small) {
                this.config.applicationIcon = this.config.appTheme.logo.small;
            }
            //Calculate the colors based on configuration
            this.config.appTheme.body.calculatedBackground =
                this.appUtils.getCalculatedColor(this.config.appTheme.body.background, 50, 6);
            this.config.appTheme.body.calculatedText =
                this.appUtils.getCalculatedColor(this.config.appTheme.body.text, 50, 21);
            this.config.appTheme.header.calculatedBackground =
                this.appUtils.getCalculatedColor(this.config.appTheme.header.background, 70, 18);
            this.config.appTheme.header.calculatedText =
                this.appUtils.getCalculatedColor(this.config.theme, 50, 27);
        }
        //--------------- Theme Section Ends ------------------//
    });
});
