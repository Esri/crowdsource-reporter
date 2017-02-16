

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
import declare from 'dojo/_base/declare';
import domConstruct from 'dojo/dom-construct';
import lang from 'dojo/_base/lang';
import dom from 'dojo/dom';
import domAttr from 'dojo/dom-attr';
import domClass from 'dojo/dom-class';
import domStyle from 'dojo/dom-style';
import on from 'dojo/on';
import template from './templates/app-header.html';
import MobileMenu from '../mobile-menu/mobile-menu';
import Help from '../help/help';
import _WidgetBase from 'dijit/_WidgetBase';
import _TemplatedMixin from 'dijit/_TemplatedMixin';
import _WidgetsInTemplateMixin from 'dijit/_WidgetsInTemplateMixin';
export default declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
  templateString: template,
  mobileMenu: null,
  config: {
    'help': false,
    'signIn': false,
    'signOut': false
  },
        //fallback string if missing in nls
  i18n: {
    myReport: 'My Reports',
    signIn: 'Sign in',
    signOut: 'Sign out',
    help: 'Help',
    signInTooltip: 'Sign In',
    signOutTooltip: 'Sign Out',
    myReportTooltip: 'My Reports',
    helpTooltip: 'Help'
  },

        /**
        * Widget is constructed.
        * @param{object} configData to be mixed
        * @memberOf widgets/app-header/app-header
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
        * Widget is initialized.
        * @memberOf widgets/app-header/app-header
        */
  postCreate: function () {
    if (this.appConfig.enableHelp) {
                //create help screen
      this.helpScreen = new Help({ 'config': this.appConfig });
    }
            //set application title
    this._setApplicationTitle();
            //set application logo
    this._setApplicationLogo();

            // if facebook/twitter/googleplus/agol login is enabled in configuration then only
    if (this.appConfig && (this.appConfig.enableFacebook || this.appConfig.enableTwitter || this.appConfig.enableGoogleplus || this.appConfig.enablePortalLogin)) {
                //set header menus based on configuration
                // create mobile menu
      this.mobileMenu = new MobileMenu({ 'config': this.config, 'appConfig': this.appConfig }, domConstruct.create('div', {}, dom.byId('mobileMenuContainer')));
      this.mobileMenu.onMyIssuesClicked = lang.hitch(this, function () { this._animateMenuContainer(); this._showMyIssuesClicked(); });
      this.mobileMenu.onSignInClicked = lang.hitch(this, function () { this._animateMenuContainer(); this._signInClicked(); });
      this.mobileMenu.onSignOutClicked = lang.hitch(this, function () { this._animateMenuContainer(); this._signOutClicked(); });
      this.mobileMenu.onHelpClicked = lang.hitch(this, function () { this._animateMenuContainer(); this._helpClicked(); });


                //handle mobile menu events
      on(this.mobileMenuBurger, 'click', lang.hitch(this, this._animateMenuContainer));
      on(this.myIssueButton, 'click', lang.hitch(this, this._showMyIssuesClicked));
      on(this.signOutButton, 'click', lang.hitch(this, this._signOutClicked));
      this._setAppHeaderMenu();
                // Show the sign in button
      domClass.remove(this.userControlContainer, 'esriCTHidden');

                //handle signin/logged_in_userName clicked
      on(this.esriCTLoginCredentialsDiv, 'click', lang.hitch(this, this._toggleLoginOptionsVisibility));

                //Adding class to hide help icon in mobile view if login is enabled
      domClass.add(this.helpButton, 'esriCTMobileHelpIcon');
    } else {
      if (domClass.contains(this.mobileMenuBurger, 'esriCTMobileIcons')) {
        domClass.replace(this.mobileMenuBurger, 'esriCTHidden', 'esriCTMobileIcons');
      }
    }

    if (this.appConfig.enableHelp) {
      domClass.remove(this.helpButton, 'esriCTHidden');
      domStyle.set(this.esriCTLoginOptionsDiv, 'right', '50px');
    } else {
      domStyle.set(this.esriCTLoginOptionsDiv, 'right', '6px');
    }

    on(this.helpButton, 'click', lang.hitch(this, this._helpClicked));
    domAttr.set(this.helpButton, 'title', this.appConfig.helpLinkText);
  },

        /**
        * This function is used to set the application title
        * First priority is given to name configured in configuration Panel
        * Second priority is given to group name
        * if both of the above cases failed noGroupNameText configured in nls will be shown as Application title.
        * @memberOf widgets/app-header/app-header
        */
  _setApplicationTitle: function () {
    let applicationName = '';
    if (this.appConfig.applicationName && lang.trim(this.appConfig.applicationName).length !== 0) {
      applicationName = this.appConfig.applicationName;
    } else if (this.appConfig.groupInfo.results.length > 0 && this.appConfig.groupInfo.results[0].title) {
      applicationName = this.appConfig.groupInfo.results[0].title;
    } else {
      applicationName = this.appConfig.i18n.signin.noGroupNameText;
    }
    document.title = applicationName;
    domAttr.set(this.applicationHeaderName, 'innerHTML', applicationName);
            //if application name is empty stretch the app icon container to fit in the app titlebar
    if (applicationName === '') {
      domClass.add(this.applicationIconContainer, 'esriCTHomeIconStreched');
    }
  },

        /**
        * This function is used to set the application logo
        * @memberOf widgets/app-header/app-header
        */
  _setApplicationLogo: function () {
    let applicationIcon;
            // if application icon is configured, display the configured icon in application header
            // else if group logo is present, display group logo in application header
            // if both the above mentioned icons are not present, display default icon in application header
    if (this.appConfig.applicationIcon && lang.trim(this.appConfig.applicationIcon).length !== 0) {
      if (this.appConfig.applicationIcon.indexOf('http') === 0) {
        domAttr.set(this.applicationHeaderIcon, 'src', this.appConfig.applicationIcon);
      } else {
        if (this.appConfig.applicationIcon.indexOf('/') === 0) {
          domAttr.set(this.applicationHeaderIcon, 'src', window.dojoConfig.baseURL + this.appConfig.applicationIcon);
        } else {
          domAttr.set(this.applicationHeaderIcon, 'src', `${window.dojoConfig.baseURL}/${this.appConfig.applicationIcon}`);
        }
      }
    } else if (this.appConfig.groupInfo.results.length > 0 && this.appConfig.groupInfo.results[0].thumbnailUrl) {
      domAttr.set(this.applicationHeaderIcon, 'src', this.appConfig.groupInfo.results[0].thumbnailUrl);
    } else {
      domAttr.set(this.applicationHeaderIcon, 'src', `${window.dojoConfig.baseURL}/images/app-icon.png`);
    }
    applicationIcon = domAttr.get(this.applicationHeaderIcon, 'src');

            // On application icon/name click navigate to home screen on mobile devices
    on(this.applicationHeaderIcon, 'click', lang.hitch(this, this._navigateToHome));
    on(this.applicationHeaderName, 'click', lang.hitch(this, this._navigateToHome));

    this._loadIcons('apple-touch-icon-precomposed', applicationIcon);
    this._loadIcons('apple-touch-icon', applicationIcon);
  },


        /**
        * Load icons
        * @memberOf widgets/app-header/app-header
        */
  _loadIcons: function (rel, iconPath) {
    let icon;
    icon = domConstruct.create('link');
    icon.rel = rel;
    icon.type = 'image/x-icon';
    if (iconPath.indexOf('http') === 0) {
      icon.href = iconPath;
    } else {
      icon.href = window.dojoConfig.baseURL + iconPath;
    }
    document.getElementsByTagName('head')[0].appendChild(icon);
  },


        /**
        * This function is used to display option available on click of login options arrow.
        * @memberOf widgets/app-header/app-header
        */
  _setAppHeaderMenu: function () {
    if (this.appConfig && this.appConfig.logInDetails && this.appConfig.logInDetails.userName) {
      domAttr.set(this.esriCTLoginUserNameDiv, 'innerHTML', this.appConfig.logInDetails.userName);
      domAttr.set(this.esriCTLoginUserNameDiv, 'title', '');
      domClass.remove(this.myIssueButton, 'esriCTHidden');
      domClass.remove(this.signOutButton, 'esriCTHidden');
      domClass.remove(this.caretIcon, 'esriCTHidden');
    }
    if (!this.appConfig.enableHelp) {
      domClass.add(this.helpButton, 'esriCTHidden');
    }
  },

        /**
        * This function is used to show/hide login option's list also
        * in case of Proceed as guest, signin will be shown instead of username
        * and clicking on it reload the app so that user can sign in using different options from the landing page.
        * @memberOf widgets/app-header/app-header
        */
  _toggleLoginOptionsVisibility: function () {
            //if user is not signed in and clicked on sign in text load the application again.
    if (this.config.signIn) {
      this._signInClicked();
    } else {
      domClass.toggle(this.esriCTLoginOptionsDiv, 'esriCTHidden');
    }
  },

        /**
        * Navigate the view to home screen.
        * @memberOf widgets/app-header/app-header
        */
  _navigateToHome: function () {
    this.navigateToHome();
  },

        /**
        * This function is used to Sign out of the application
        * @memberOf widgets/app-header/app-header
        */
  _signOutClicked: function () {
            // user is logged in via AGOL portal login
    if (this.config.portalObject) {
      if (this.config.portalObject.getPortalUser()) {
        this.config.portalObject.signOut().then(lang.hitch(this, () => {
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
        * This function is used to load application again on sign in click.
        * @memberOf widgets/app-header/app-header
        */
  _signInClicked: function () {
    window.location.reload();
  },

        /**
        * This function is used to show the configured help text.
        * @memberOf widgets/app-header/app-header
        */
  _helpClicked: function (evt) {
            //show splash screen dialog
    this.helpScreen.showDialog();
    return evt;
  },

        /**
        * Update menu list
        * @memberOf widgets/app-header/app-header
        */
  updateMenuList: function (menuList) {
    if (menuList) {
      lang.mixin(this.config, menuList);
    }
    this._setAppHeaderMenu();
    if (this.mobileMenu) {
      this.mobileMenu.updateMenuList(menuList);
    }
  },


  _showMyIssuesClicked: function (evt) {
    this.showMyIssues(evt);
  },

        /**
        * Show or hide mobile menu container
        * @memberOf widgets/app-header/app-header
        */
  _animateMenuContainer: function () {
    domClass.toggle(this.mobileMenuBurger, 'active');
    domClass.toggle(dom.byId('mobileMenuContainer'), 'esriCTHideMobileMenu');
  },

        //Events Generated from App Header
  showMyIssues: function (evt) {
    return evt;
  },

  navigateToHome: function (evt) {
    return evt;
  }
});
