

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
import declare from 'dojo/_base/declare';
import esriRequest from 'esri/request';
import lang from 'dojo/_base/lang';
export default declare(null, {
  _config: null,
  TWLoggedIn: false,
  userDetails: {
    fullName: null,
    firstName: null,
    lastName: null,
    uniqueID: null,
    socialMediaType: null
  },
        /**
        * This function is called when widget is constructed.
        * @param{object} config to be used
        * @memberOf widgets/sign-in/twitter-helper
        */
  constructor: function (config) {
    this._config = config;
    this.twitterLoginHandler();
  },

        /**
        * Handle the login/logout event
        * @memberOf widgets/sign-in/twitter-helper
        */
  twitterLoginHandler: function () {
            // if user is already logged In
    if (this.TWLoggedIn) {
      this.twitterLoginWindow(this._config.twitterSigninUrl, true);
    } else {
      this.twitterLoginWindow(this._config.twitterSigninUrl);
    }
  },

        /**
        * Show Login window
        * @memberOf widgets/sign-in/twitter-helper
        */
  twitterLoginWindow: function (page, forceLogin) {
    let package_path, redirect_uri, w, h, left, top;
    package_path = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
    redirect_uri = encodeURIComponent(`${location.protocol}//${location.host}${package_path}${this._config.twitterCallbackUrl}`);
    w = screen.width / 2;
    h = screen.height / 1.5;
    left = (screen.width / 2) - (w / 2);
    top = (screen.height / 2) - (h / 2);
            // if url is exist
    if (page) {
      page += '?';
      if (forceLogin) {
        page += 'force_login=true';
      }
      if (forceLogin && redirect_uri) {
        page += '&';
      }
      if (redirect_uri) {
        page += `redirect_uri=${redirect_uri}`;
      }
      window.open(page, 'twoAuth', `scrollbars=yes, resizable=yes, width=${w}, height=${h}, top=${top}, left=${left}`, true);
      window.oAuthCallback = lang.hitch(this, function () {
        this.getTwitterLoginResponse(this._config.twitterUserUrl);
      });
    }
  },

        /**
        * Gets user information's as soon as user is logged In
        * @memberOf widgets/sign-in/twitter-helper
        */
  getTwitterLoginResponse: function (url) {
    let Query;
    Query = {
      include_entities: true,
      skip_status: true
    };
    esriRequest({
      url,
      handleAs: 'json',
      timeout: 10000,
      content: Query,
      callbackParamName: 'callback'
    }).then(lang.hitch(this, function (response) {
      if (!response.hasOwnProperty('signedIn') && !response.signedIn) {
        this.TWLoggedIn = true;
      }
      if (this.TWLoggedIn) {
        this.userDetails = {
          fullName: response.name || '',
          firstName: null,
          lastName: null,
          uniqueID: response.id_str,
          socialMediaType: 'Twitter'
        };
        this.onTwitterLogIn(this.userDetails);
      }
    }), function (err) {
                // handle an error condition
      this.TWLoggedIn = false;
      this.userDetails = {
        fullName: null,
        firstName: null,
        lastName: null,
        uniqueID: null,
        socialMediaType: null
      };
      this.onTwitterLogIn(this.userDetails);
      console.error(JSON.stringify(err));
    });
  },

        /**
        * Returns users information to sign-in widget
        * @memberOf widgets/sign-in/twitter-helper
        */
  onTwitterLogIn: function (userDetails) {
    return userDetails;
  }
});
