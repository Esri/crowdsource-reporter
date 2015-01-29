/*global define,dojo,alert,dojoConfig,console,$, gapi*/
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
    "esri/IdentityManager",
    "widgets/sign-in/facebook-helper",
    "widgets/sign-in/twitter-helper",
    "dojo/query"

], function (templateConfig, MainTemplate, Main, ApplicationUtils, declare, domConstruct, domStyle, domAttr, domClass, lang, on, Deferred, all, esriPortal, template, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, IdentityManager, FBHelper, TWHelper, query) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        _config: null,
        userDetails: { fullName: null, firstName: null, lastName: null, uniqueID: null, emailID: null, socialMediaType: null },
        isUserLoggedIn: false,
        fbHelperObject: null,
        twHelperObject: null,
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

        onLogIn: function (loggedInUser) {
            var myTemplate, myApp;
            myTemplate = new MainTemplate(templateConfig);
            dojo.boilerPlateTemplate = myTemplate;
            myApp = new Main();
            myTemplate.startup().then(lang.hitch(this, function (newConfig) {
                if (this.portal) {
                    newConfig.portalObject = this.portal;
                }
                // In case of social media login set the token and hide the landing page,
                // as in case of AGOL login landing page is closed as soon as identity manager is shown.
                if (!loggedInUser.credential) {
                    loggedInUser.credential = { "token": "" };
                    this.hideSignInDialog();
                }
                myApp.startup(newConfig, loggedInUser);
            }), function (error) {
                dojo.applicationUtils.showError(error);
            });
        },

        /**
        * This function is executed when user clicks on ESRI button
        * @memberOf widgets/sign-in/sign-in
        */
        _esriButtonClicked: function () {
            this.hideSignInDialog();
            this.portal = new esriPortal.Portal(this._config.sharinghost);
            this.portal.on("load", lang.hitch(this, function () {
                this.portal.signIn().then(lang.hitch(this, this.processUserDetails), function (e) {
                    if (e.message !== "ABORTED") {
                        dojo.applicationUtils.showError(e.message);
                    }
                });
            }));
        },

        /**
        * Process the login action using user login credentials
        * @param{object} userDetails to be used
        * @memberOf widgets/sign-in/sign-in
        */
        processUserDetails: function (userDetails) {
            //if user already not logged in and user information's not exist
            if (!this.isUserLoggedIn) {
                //Check if it is AGOL Login or Social Media Login
                //In Case of AGOL Login construct uniqueId with OrgID + UserID
                if (!userDetails.credential) {
                    userDetails.processedUserName = userDetails.socialMediaType + "$" + userDetails.uniqueID + "$" + userDetails.fullName;
                } else {
                    userDetails.processedUserName = "AGOL" + "$" + userDetails.orgId + userDetails.credential.userId + "$" + userDetails.fullName;
                }
                this.onLogIn(userDetails);
                this.isUserLoggedIn = true;
            }
        },

        /**
        * This function is executed when user clicks on facebook button
        * @memberOf widgets/sign-in/sign-in
        */
        _fbButtonClicked: function () {
            var facebookConfig;
            // if facebook login occurred first time/login instance not created
            if (!this.fbHelperObject) {
                facebookConfig = { "facebookAppId": this._config.facebookAppId };
                this.fbHelperObject = new FBHelper(facebookConfig);
                this.fbHelperObject.onFaceBookLogIn = lang.hitch(this, this.processUserDetails);
            } else {
                this.fbHelperObject.FBLoggedIn = false;
                this.fbHelperObject.facebookLoginHandler();
            }
        },

        /**
        * This function is executed when user clicks on twitter button
        * @memberOf widgets/sign-in/sign-in
        */
        _twitterButtonClicked: function () {
            var twitterConfig;
            // if twitter login occurred first time/login instance not created
            if (!this.twHelperObject) {
                twitterConfig = {
                    "twitterSigninUrl": this._config.twitterSigninUrl,
                    "twitterUserUrl": this._config.twitterUserUrl,
                    "twitterCallbackUrl": this._config.twitterCallbackUrl
                };
                this.twHelperObject = new TWHelper(twitterConfig);
                this.twHelperObject.onTwitterLogIn = lang.hitch(this, this.processUserDetails);
            } else {
                this.twHelperObject.twitterLoginHandler();
            }
        },

        /**
        * This function is executed when user clicks on google plus button
        * @memberOf widgets/sign-in/sign-in
        */
        _gpButtonClicked: function () {
            var googleplusConfig;
            // if google api sdk is loaded
            if (gapi && gapi.auth) {
                googleplusConfig = {
                    "clientid": this._config.googleplusClientId,
                    "scope": this._config.googleplusScope,
                    "callback": lang.hitch(this, this._gpsigninCallback)
                };
                gapi.auth.signIn(googleplusConfig);
            }
        },

        /**
        * Callback function when user logged In
        * @param{object} authResult to be used
        * @memberOf widgets/sign-in/sign-in
        */
        _gpsigninCallback: function (authResult) {
            // if api authentication is true and user is signed in
            if (authResult && authResult.status.signed_in) {
                // if user is already logged in google plus and trying to logn via googleplus in our app
                //  then only on "PROMPT" method invoke let him login to our app
                if (authResult.status.method === 'PROMPT') {
                    gapi.client.load('plus', 'v1', lang.hitch(this, function () {
                        var request = gapi.client.plus.people.get({
                            'userId': 'me'
                        });
                        request.execute(lang.hitch(this, function (resp) {
                            // if emails exist in response object
                            if (resp.emails) {
                                this.userDetails.fullName = resp.displayName;
                                this.userDetails.firstName = resp.name.givenName;
                                this.userDetails.lastName = resp.name.familyName;
                                this.userDetails.emailID = resp.emails[0].value;
                                this.userDetails.uniqueID = resp.id;
                                this.userDetails.socialMediaType = "Googleplus";
                                this.processUserDetails(this.userDetails);
                            }
                        }));
                    }));
                } else {
                    console.log(authResult.status.method);
                }
            }
        },

        /**
        * This function is executed when user clicks on guest user button
        * @memberOf widgets/sign-in/sign-in
        */
        _guestButtonClicked: function () {
            if (!this.isUserLoggedIn) {
                this.hideSignInDialog();
                this.loadApplication(this._config);
                this.isUserLoggedIn = true;
            }
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