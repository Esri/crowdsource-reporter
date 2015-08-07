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
    "config/template-config",
    "application/template",
    "application/main",
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom",
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

], function (templateConfig, MainTemplate, Main, declare, domConstruct, domStyle, domAttr, domClass, lang, on, dom, Deferred, all, esriPortal, template, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, IdentityManager, FBHelper, TWHelper, query) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        _config: null,
        _boilerPlateTemplate: null,
        isUserLoggedIn: false,
        fbHelperObject: null,
        twHelperObject: null,

        /**
        * This function is called on startup of widget.
        * @param{object} config to be used
        * @memberOf widgets/sign-in/sign-in
        */
        startup: function (boilerPlateTemplateObject, appUtils) {
            var loadGPApi;
            this._boilerPlateTemplate = boilerPlateTemplateObject;
            this._config = boilerPlateTemplateObject.config;
            this.appUtils = appUtils;
            this.inherited(arguments);
            this._createLoginScreenUI();
            if (this._config.enableGoogleplus) {
                loadGPApi = $.getScript("https://apis.google.com/js/client:platform.js?onload=render");
            }
            if (loadGPApi && loadGPApi.readyState) {
                this._handleEvents();
            } else {
                this._handleEvents();
            }
        },

        /**
        * Function to create the login screen UI elements.
        * It also helps in showing Configurable and localized text on login screen.
        * @memberOf widgets/sign-in/sign-in
        */
        _createLoginScreenUI: function () {
            var applicationName;
            this.domNode = domConstruct.create("div", {}, dojo.body());
            this.domNode.appendChild(this.signinOuterContainer);
            if (this._config.applicationName && lang.trim(this._config.applicationName).length !== 0) {
                applicationName = this._config.applicationName;
            } else if (this._config.groupInfo.results.length > 0 && this._config.groupInfo.results[0].title) {
                applicationName = this._config.groupInfo.results[0].title;
            } else {
                applicationName = this._config.i18n.signin.noGroupNameText;
            }
            document.title = applicationName;
            domAttr.set(this.signinContainerName, "innerHTML", applicationName);
            if (this._config.signInSubtitle) {
                domAttr.set(this.signinContainerText, "innerHTML", this._config.signInSubtitle);
            } else {
                domClass.add(this.signinContainerText, "esriCTHidden");
                domClass.add(this.signinCaptionSeparator, "esriCTHidden");
            }
            domAttr.set(this.signinGuestUser, "innerHTML", this._config.i18n.signin.guestSigninText);
            domAttr.set(this.signinOptions, "innerHTML", this._config.i18n.signin.signinOptionsText);
            if (this._config.signInBackgroundImage.indexOf("http") === 0) {
                domStyle.set(this.signinBgImage, "backgroundImage", 'url(' + this._config.signInBackgroundImage + ')');
            } else {
                domStyle.set(this.signinBgImage, "backgroundImage", 'url(' + dojoConfig.baseURL + this._config.signInBackgroundImage + ')');
            }

            domAttr.set(this.signinOrText, "innerHTML", this._config.i18n.signin.signInOrText);
            domAttr.set(this.signinOrText, "title", this._config.i18n.signin.signInOrText);
            domAttr.set(this.signinGuestButton, "title", this._config.i18n.signin.guestLoginTooltip);
            domAttr.set(this.signinFBButton, "title", this._config.i18n.signin.facebookLoginTooltip);
            domAttr.set(this.signinTwitterButton, "title", this._config.i18n.signin.twitterLoginTooltip);
            domAttr.set(this.signinGPlusButton, "title", this._config.i18n.signin.googlePlusLoginTooltip);
            domAttr.set(this.signinEsriButton, "title", this._config.i18n.signin.agolLoginTooltip);
            this._enableDisableSocialMedia();
        },

        /**
        * Function to attach click events to the UI elements on login screen.
        * @memberOf widgets/sign-in/sign-in handle
        */
        _handleEvents: function () {
            //handle all clicks on login screen
            this.own(on(this.signinGuestButton, "click", lang.hitch(this, this._guestButtonClicked)));
            this.own(on(this.signinEsriButton, "click", lang.hitch(this, this._esriButtonClicked)));
            this.own(on(this.signinFBButton, "click", lang.hitch(this, this._fbButtonClicked)));
            this.own(on(this.signinTwitterButton, "click", lang.hitch(this, this._twitterButtonClicked)));
            this.own(on(this.signinGPlusButton, "click", lang.hitch(this, this._gpButtonClicked)));

            //handle identity manager cancel clicked event
            on(IdentityManager, "dialog-cancel", lang.hitch(this, function () {
                window.location.reload();
            }));
        },

        /**
        * Function to show or hide the social media icons on login screen, based on the configuration.
        * @memberOf widgets/sign-in/sign-in
        */
        _enableDisableSocialMedia: function () {
            if (!this._config.enableFacebook) {
                domClass.add(this.signinFBButton, "esriCTHidden");
            }
            if (!this._config.enableTwitter) {
                domClass.add(this.signinTwitterButton, "esriCTHidden");
            }
            if (!this._config.enableGoogleplus) {
                domClass.add(this.signinGPlusButton, "esriCTHidden");
            }
            if (!this._config.enablePortalLogin) {
                domClass.add(this.signinEsriButton, "esriCTHidden");
            }

            if (!this._config.enablePortalLogin && !this._config.enableGoogleplus && !this._config.enableTwitter && !this._config.enableFacebook) {
                domClass.add(this.signinOptions, "esriCTHidden");
                domClass.add(this.signinOrDiv, "esriCTHidden");
            }
        },

        /**
        * Shows the login screen
        * @memberOf widgets/sign-in/sign-in
        */
        showSignInDialog: function () {
            domStyle.set(this.domNode, "display", "block");
        },

        /**
        * Hides the login screen
        * @memberOf widgets/sign-in/sign-in
        */
        hideSignInDialog: function () {
            domStyle.set(this.domNode, "display", "none");
        },

        /**
        * Loads main application
        * @memberOf widgets/sign-in/sign-in
        */
        loadApplication: function (loggedInUserDetails) {
            var mainApp = new Main();
            mainApp.startup(this._boilerPlateTemplate, loggedInUserDetails);
        },

        /**
        * This function is executed when user gets login with any of the social media provider or AGLO
        * @memberOf widgets/sign-in/sign-in
        */
        onLogIn: function (loggedInUserDetails) {
            // In case of social media login set the token and hide the landing page,
            // as in case of AGOL login landing page is closed as soon as identity manager is shown.
            if (!loggedInUserDetails.credential) {
                loggedInUserDetails.credential = { "token": "" };
                this.hideSignInDialog();
            }
            this.loadApplication(loggedInUserDetails);
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
                    userDetails.processedUserName = userDetails.uniqueID;
                } else {
                    userDetails.processedUserName =userDetails.credential.userId;
                }
                this.isUserLoggedIn = true;
                this.onLogIn(userDetails);
            }
        },


        /**
        * This function is executed when user clicks on guest user button
        * @memberOf widgets/sign-in/sign-in
        */
        _guestButtonClicked: function () {
            if (!this.isUserLoggedIn) {
                this.hideSignInDialog();
                //as user is logging in as guest pass loggedInUserDetails as null
                this.loadApplication(null);
                //set this flag so that if someone clicks on guest icon and again click on Social media login, user should login as guest only
                this.isUserLoggedIn = true;
            }
        },

        /**
        * This function is executed when user clicks on ESRI (AGOL login) button
        * @memberOf widgets/sign-in/sign-in
        */
        _esriButtonClicked: function () {
            this.hideSignInDialog();
            this.portal = new esriPortal.Portal(this._config.sharinghost);
            this.portal.on("load", lang.hitch(this, function () {
                this.portal.signIn().then(lang.hitch(this, function (loggedInUser) {
                    //As current version of boilerplate not handling the private Groups
                    //once user is logged in query for the group info.
                    this._boilerPlateTemplate.queryGroupInfo().then(lang.hitch(this, function (response) {
                        //Proceed to load the app  if we get the group info, else show error.
                        if (response.groupInfo.results.length > 0) {
                            //Update the group info in config file
                            this._boilerPlateTemplate.config.groupInfo = response.groupInfo;
                            //As user is logged in with AGOL pass portal object, for feature reference
                            this._boilerPlateTemplate.config.portalObject = this.portal;
                            //Now process the user details of logged in user
                            this.processUserDetails(loggedInUser);
                        } else {
                            //Show error message when Group is Empty or no group is configured
                            this.domNode.style.display = "none";
                            this.appUtils.hideLoadingIndicator();
                            domClass.remove(dom.byId("noWebMapParentDiv"), "esriCTHidden");
                            domAttr.set(dom.byId("noWebMapChildDiv"), "innerHTML", this._boilerPlateTemplate.config.i18n.webMapList.noWebMapInGroup);
                        }
                    }));

                }), function (e) {
                    if (e.message !== "ABORTED") {
                        this.appUtils.showError(e.message);
                    }
                });
            }));
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
        * Callback function when user logged In using Googleplus
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
                            var userDetails = { fullName: null, firstName: null, lastName: null, uniqueID: null, socialMediaType: null };
                            // if emails exist in response object
                            if (resp.emails) {
                                userDetails.fullName = resp.displayName || "";
                                userDetails.firstName = resp.name.givenName;
                                userDetails.lastName = resp.name.familyName;
                                userDetails.uniqueID = resp.id;
                                userDetails.socialMediaType = "googleplus";
                                this.processUserDetails(userDetails);
                            }
                        }));
                    }));
                } else {
                    console.log(authResult.status.method);
                }
            }
        }
    });
});