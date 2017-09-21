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
    "dojo/_base/array",
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
    "widgets/help/help",
    "dojo/query"

], function (templateConfig, MainTemplate, Main, declare, domConstruct, domStyle, domAttr, domClass, lang, array, on, dom, Deferred, all, esriPortal, template, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, IdentityManager, FBHelper, TWHelper, Help, query) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        _config: null,
        _boilerPlateTemplate: null,
        _helpScreen: null,
        isUserLoggedIn: false,
        fbHelperObject: null,
        twHelperObject: null,

        /**
        * This function is called on startup of widget.
        * @param{object} config to be used
        * @memberOf widgets/sign-in/sign-in
        */
        startup: function (boilerPlateTemplateObject, appUtils) {
            var loadGPApi, dialogTitle, dialogContent;
            this._boilerPlateTemplate = boilerPlateTemplateObject;
            this._config = boilerPlateTemplateObject.config;
            if (this._config.enableHelp) {
                //Check if show different content flag is true pass modified content
                if (this._config.enableDifferentHelpContent &&
                    lang.trim(this._config.loginHelpDialogTitle) !== "" &&
                    lang.trim(this._config.loginHelpDialogContent) !== "") {
                    dialogTitle = this._config.loginHelpDialogTitle;
                    dialogContent = this._config.loginHelpDialogContent;
                } else {
                    dialogTitle = this._config.helpDialogTitle;
                    dialogContent = this._config.helpDialogContent;
                }
                //Initialize splash screen
                this._helpScreen = new Help({
                    "config": this._config,
                    "title": dialogTitle,
                    "content": dialogContent,
                    "dialog": "signin"
                });
            } else {
                //If help is turned off, then hide the help link
                domClass.add(this.signinHelpLink, "esriCTHidden");
            }
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
            this._handleSplashScreenVisibility();
        },

        /**
        * Check if splash is required based on boolean values of all social media sign in options
        * @memberOf widgets/sign-in/sign-in
        */
        _handleSplashScreenVisibility: function () {
            var isSplashScreenRequired = false;
            //Check for all social media sign in options and decide wehter to show splash screen or not
            if (this._config.enableGuestAccess || this._config.enableFacebook ||
                this._config.enableTwitter || this._config.enableGoogleplus
                || this._config.enablePortalLogin) {
                isSplashScreenRequired = true;
            }
            //If all the sign in options are disabled, check if user is already logged in to a portal
            // and accordingly do portal or guest login
            if (!isSplashScreenRequired) {
                //Since all the sign in options are disabled, hide the sign in page
                domStyle.set(this.signinOuterContainer, "display", "none");
                //Check if user is logged in
                IdentityManager.checkSignInStatus(this._config.sharinghost).then(lang.hitch(this,
                    function (userDetails) {
                        //If valid user details are found, do a portal sign in
                        this._esriButtonClicked();
                    }), lang.hitch(this, function () {
                        //If user is not logged in then proceed as a "Guest"
                        this._guestButtonClicked();
                    }));
            }
        },

        /**
        * Function to create the login screen UI elements.
        * It also helps in showing Configurable and localized text on login screen.
        * @memberOf widgets/sign-in/sign-in
        */
        _createLoginScreenUI: function () {
            var applicationName;
            this._setLoginScreenStyles();
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
            domAttr.set(this.signinHelpLink, "innerHTML", this._config.helpLinkText);
            domAttr.set(this.signinHelpLink, "title", this._config.helpLinkText);
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

            //If guest login is disabled from configuration, make sure we are not showing it on login screen
            if (!this._config.enableGuestAccess) {
                domStyle.set(this.signInGuestButtonContainer, "display", "none");
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
        * Function to set icons and color as per configuration
        * @memberOf widgets/sign-in/sign-in handle
        */
        _setLoginScreenStyles: function () {
            var iconColor, loginScreenFontColor;
            //set icon images and color as per configuration
            if (this._config.imageForeGroundColor === "gray") {
                iconColor = "gray-";
            } else {
                iconColor = "";
            }
            loginScreenFontColor = (this._config && this._config.splashScreenTextColor) ? this._config.splashScreenTextColor : "#FFF";
            //Set color to splash screen content as per configuration
            this._setLoginScreenColors(loginScreenFontColor);
            //Set icons as per configuration
            this._setLoginScreenIcons(iconColor);
        },

        /**
        * Set font, background and foreground color of splash screen content
        * @memberOf widgets/sign-in/sign-in handle
        */
        _setLoginScreenColors: function (loginScreenFontColor) {
            var imageForeGroundColor, imageBackgroundColor;
            if (lang.trim(this._config.imageForeGroundColor) === "") {
                imageForeGroundColor = "white";
            } else {
                imageForeGroundColor = this._config.imageForeGroundColor;
            }
            if (lang.trim(this._config.imageBackgroundColor) === "") {
                imageBackgroundColor = "gray";
            } else {
                imageBackgroundColor = this._config.imageBackgroundColor;
            }
            domStyle.set(this.signInMainContainer, "color", loginScreenFontColor);
            domStyle.set(this.signinOrText, "color", loginScreenFontColor);
            domStyle.set(this.signinOrText, "backgroundColor", imageBackgroundColor);
            domStyle.set(this.signinCaptionSeparator, "borderColor", imageForeGroundColor);
            domStyle.set(this.signinOrText, "border", "2px solid " + imageForeGroundColor);
            domStyle.set(this.signinHelpLink, "borderBottom", "1px solid " + loginScreenFontColor);
            //Set image background color
            array.forEach(query(".esriCTIconsBackground", this.domNode), lang.hitch(this, function (currentIcon) {
                domStyle.set(currentIcon, "backgroundColor", imageBackgroundColor);
                domStyle.set(currentIcon, "border", "3px solid " + imageForeGroundColor);
            }));
        },

        /**
        * Set social media icons as per configuration
        * @memberOf widgets/sign-in/sign-in handle
        */
        _setLoginScreenIcons: function (iconColor) {
            var imageBaseURL;
            imageBaseURL = dojoConfig.baseURL + "/images/" + iconColor;
            domStyle.set(this.signinGuestButton, "backgroundImage", 'url(' + imageBaseURL + "guest-user.png" + ')');
            domStyle.set(this.signinFBButton, "backgroundImage", 'url(' + imageBaseURL + "facebook.png" + ')');
            domStyle.set(this.signinTwitterButton, "backgroundImage", 'url(' + imageBaseURL + "twitter.png" + ')');
            domStyle.set(this.signinGPlusButton, "backgroundImage", 'url(' + imageBaseURL + "googleplus.png" + ')');
            domStyle.set(this.signinEsriButton, "backgroundImage", 'url(' + imageBaseURL + "esri.png" + ')');
            domStyle.set(this.signinOrDiv, "backgroundImage", 'url(' + imageBaseURL + "seperator.png" + ')');
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
            this.own(on(this.signinHelpLink, "click", lang.hitch(this, function () {
                this._helpScreen.showDialog("signin");
            })));
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
                domClass.add(this.socialMediaSigninContainer, "esriCTHidden");
            }

            if (domClass.contains(this.signinOptions, "esriCTHidden") && !this._config.enableGuestAccess && this._config.enableHelp) {
                domClass.add(this.signinHelpContainer, "esriCTSigninOptionDisabled");
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
                    userDetails.processedUserName = userDetails.credential.userId;
                }
                //If user is logged in through social media login's by default keep the 'canEditFeatures' to true
                if (!userDetails.hasOwnProperty("canEditFeatures")) {
                    userDetails.canEditFeatures = true;
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
            var noMapMessage;
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
                            //check for editing permissions
                            this._checkUserPrivileges(loggedInUser);
                            //Now process the user details of logged in user
                            this.processUserDetails(loggedInUser);
                        } else {
                            //Show error message when Group is Empty or no group is configured
                            this.domNode.style.display = "none";
                            this.appUtils.hideLoadingIndicator();
                            domClass.remove(dom.byId("noWebMapParentDiv"), "esriCTHidden");
                            if (this._boilerPlateTemplate.config && lang.trim(this._boilerPlateTemplate.config.noWebmapInGroupText) === "") {
                                noMapMessage = this._boilerPlateTemplate.config.i18n.webMapList.noWebMapInGroup;
                            } else {
                                noMapMessage = this._boilerPlateTemplate.config.noWebmapInGroupText;
                            }
                            domAttr.set(dom.byId("noWebMapChildDiv"), "innerHTML", noMapMessage);
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
        * Check for user account and his privileges to show/hide editing buttons
        * @memberOf widgets/sign-in/sign-in
        */
        _checkUserPrivileges: function (loggedInUser) {
            var userActLevel;
            userActLevel = parseInt(loggedInUser.level, 10);
            if (userActLevel > 1 && loggedInUser.privileges.indexOf("features:user:edit") >= 0) {
                loggedInUser.canEditFeatures = true;
            } else {
                loggedInUser.canEditFeatures = false;
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