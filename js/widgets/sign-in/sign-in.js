/*global define,dojo,alert,dojoConfig,$ */
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
    "application/utils/utils",
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/Deferred",
    "dojo/promise/all",
    "esri/arcgis/Portal",
    "dojo/text!./templates/sign-in.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "esri/IdentityManager"

], function (templateConfig, MainTemplate, Main, ApplicationUtils, declare, domConstruct, domStyle, domAttr, domClass, lang, on, Deferred, all, esriPortal, template, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, IdentityManager) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        _config: null,

        /**
        * This function is called on startup of widget.
        * @param{object} config to be used
        * @memberOf widgets/sign-in/sign-in
        */
        startup: function (config) {
            var applicationName;
            this._config = config;
            dojo.applicationUtils = ApplicationUtils;
            this.inherited(arguments);
            this.domNode = domConstruct.create("div", {}, dojo.body());
            this.domNode.appendChild(this.signinOuterContainer);

            if (this._config.applicationName && lang.trim(this._config.applicationName).length !== 0) {
                applicationName = this._config.applicationName;
            } else if (this._config.groupInfo.results.length > 0 && this._config.groupInfo.results[0].title) {
                applicationName = this._config.groupInfo.results[0].title;
            } else {
                applicationName = this._config.i18n.signin.noGroupNameText;
            }
            domAttr.set(this.signinContainerName, "innerHTML", applicationName);
            if (this._config.signInSubtitle) {
                domAttr.set(this.signinContainerText, "innerHTML", this._config.signInSubtitle);
            } else {
                domClass.add(this.signinContainerText, "esriCTHidden");
                domClass.add(this.signinCaptionSeparator, "esriCTHidden");
            }
            domAttr.set(this.signinGuestUser, "innerHTML", this._config.i18n.signin.guestSigninText);
            domAttr.set(this.signinOptions, "innerHTML", this._config.i18n.signin.signinOptionsText);
            domStyle.set(this.signinBgImage, "backgroundImage", 'url(' + dojoConfig.baseURL + this._config.signInBackgroundImage + ')');
            this.own(on(this.signinGuestButton, "click", lang.hitch(this, this._guestButtonClicked)));
            this.own(on(this.signinEsriButton, "click", lang.hitch(this, this._esriButtonClicked)));

            this.own(on(this.signinFBButton, "click", lang.hitch(this, this._fbButtonClicked)));
            this.own(on(this.signinTwitterButton, "click", lang.hitch(this, this._twitterButtonClicked)));
            this.own(on(this.signinGPlusButton, "click", lang.hitch(this, this._gpButtonClicked)));

            on(IdentityManager, "dialog-cancel", lang.hitch(this, function () {
                window.location.reload();
            }));

            if (!this._config.enableFacebook) {
                domClass.add(this.signinFBButton, "esriCTHidden");
            }
            if (!this._config.enableTwitter) {
                domClass.add(this.signinTwitterButton, "esriCTHidden");
            }
            if (!this._config.enableGoogleplus) {
                domClass.add(this.signinGPlusButton, "esriCTHidden");
            }
        },

        /**
        * This function is executed when user clicks on ESRI button
        * @memberOf widgets/sign-in/sign-in
        */
        _esriButtonClicked: function () {
            this.hideSignInDialog();
            this.portal = new esriPortal.Portal(this._config.sharinghost);
            this.portal.on("load", lang.hitch(this, function () {
                this.portal.signIn().then(lang.hitch(this, function (loggedInUser) {
                    var myTemplate, myApp;
                    myTemplate = new MainTemplate(templateConfig);
                    dojo.boilerPlateTemplate = myTemplate;
                    myApp = new Main();
                    myTemplate.startup().then(lang.hitch(this, function (newConfig) {
                        newConfig.portalObject = this.portal;
                        myApp.startup(newConfig, loggedInUser);
                    }), function (error) {
                        dojo.applicationUtils.showError(error);
                    });
                }), function (e) {
                    if (e.message !== "ABORTED") {
                        dojo.applicationUtils.showError(e.message);
                    }
                });
            }));
        },

        /**
        * This function is executed when user clicks on facebook button
        * @memberOf widgets/sign-in/sign-in
        */
        _fbButtonClicked: function () {
            alert("Coming soon...");
        },

        /**
        * This function is executed when user clicks on twitter button
        * @memberOf widgets/sign-in/sign-in
        */
        _twitterButtonClicked: function () {
            alert("Coming soon...");
        },

        /**
        * This function is executed when user clicks on google plus button
        * @memberOf widgets/sign-in/sign-in
        */
        _gpButtonClicked: function () {
            alert("Coming soon...");
        },

        /**
        * This function is executed when user clicks on guest user button
        * @memberOf widgets/sign-in/sign-in
        */
        _guestButtonClicked: function () {
            this.hideSignInDialog();
            this.loadApplication(this._config);
        },

        showSignInDialog: function () {
            domStyle.set(this.domNode, "display", "block");
        },

        hideSignInDialog: function () {
            domStyle.set(this.domNode, "display", "none");
        },

        /**
        * Load application
        * @memberOf widgets/sign-in/sign-in
        */
        loadApplication: function () {
            var mainApp = new Main();
            mainApp.startup(this._config, null);
        }


    });
});