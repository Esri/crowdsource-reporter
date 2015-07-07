/*global define,dojo,alert,document,FB */
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
    "dojo/on",
    "dojo/_base/lang",
    "dojo/query",
    "dojo/dom-class"
], function (declare, on, lang, query, domClass) {
    return declare(null, {
        _config: null,
        FBLoggedIn: false,
        userDetails: { fullName: null, firstName: null, lastName: null, uniqueID: null, socialMediaType: null },
        /**
        * This function is called when widget is constructed.
        * @param{object} config to be used
        * @memberOf widgets/sign-in/facebook-helper
        */
        constructor: function (config) {
            this._config = config;
            window.fbAsyncInit = lang.hitch(this, this.fbAsyncInit);
            // Load the SDK asynchronously
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, "script", "facebook-jssdk"));
        },

        /**
        * Provide a startup function for when the SDK finishes loading
        * @memberOf widgets/sign-in/facebook-helper
        */
        fbAsyncInit: function () {
            FB.Event.subscribe("auth.login", lang.hitch(this, this.getFbloginResponse));
            FB.Event.subscribe("auth.statusChange", lang.hitch(this, this.getFbloginResponse));
            FB.Event.subscribe("auth.logout", lang.hitch(this, this.getFbloginResponse));
            FB.init({
                appId: this._config.facebookAppId,
                cookie: true,  // enable cookies to allow the server to access the session
                xfbml: true,   // parse social plugins on this page such as Login
                status: true,  // check login status
                version: "v2.3"
            });
            this.facebookLoginHandler();
        },

        /**
        * Handle the login/logout event
        * @memberOf widgets/sign-in/facebook-helper
        */
        facebookLoginHandler: function () {
            // if user is already logged in
            if (this.FBLoggedIn) {
                FB.logout(lang.hitch(this, this.getFbloginResponse));
            } else {
                FB.login(lang.hitch(this, this.getFbloginResponse));
            }
        },

        /**
        * Update the label of the login/logout and provide logged-in user information
        * @memberOf widgets/sign-in/facebook-helper
        */
        getFbloginResponse: function (response) {
            this.FBLoggedIn = response.status === "connected";
            // If logged in, show some info from the account
            if (this.FBLoggedIn) {
                FB.api("/me?fields=name,first_name,last_name,third_party_id", lang.hitch(this, function (response) {
                    this.userDetails.fullName = response.name || "";
                    this.userDetails.firstName = response.first_name;
                    this.userDetails.lastName = response.last_name;
                    this.userDetails.uniqueID = response.third_party_id;
                    this.userDetails.socialMediaType = "facebook";
                    this.onFaceBookLogIn(this.userDetails);
                }));
            } else {
                // Report not-logged-in state
                this.userDetails = { fullName: null, firstName: null, lastName: null, uniqueID: null, socialMediaType: null };
                this.onFaceBookLogOut(this.userDetails);
            }
        },

        /**
        * Returns users information to sign-in widget
        * @memberOf widgets/sign-in/facebook-helper
        */
        onFaceBookLogIn: function (userDetails) {
            return userDetails;
        },

        onFaceBookLogOut: function (userDetails) {
            return userDetails;
        }
    });
});