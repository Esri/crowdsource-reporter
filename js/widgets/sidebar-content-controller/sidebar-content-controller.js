/*global define,dojo */
/*jslint browser:true,sloppy:true,nomen:true,unparam:true,plusplus:true */
/*
 | Copyright 2015 Esri
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
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/sidebar-content-controller-view.html",
    "dojo/_base/lang",
    "dojo/dom",
    "dojo/dom-style",
    "dojo/on"
], function (
    declare,
    _WidgetBase,
    _TemplatedMixin,
    template,
    lang,
    dom,
    domStyle,
    on
) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        _panels: {},
        _currentPanelName: null,
        _currentPanel: null,

        /**
        * Widget constructor
        * @param {object} initialProps Initialization properties:
        *     appConfig: Application configuration
        * @constructor
        */

        /**
        * Adds a panel to be controlled.
        * @param {string} name Name to identify panel later on
        * @param {object} widget Panel to show or hide
        */
        addPanel: function (name, widget) {
            this._panels[name] = widget;
        },

        /**
        * Switches to the specified panel.
        * @param {string} name Name identifying panel when it was added via addPanel
        */
        showPanel: function (name) {
            if (this._currentPanel) {
                this._currentPanel.hide();
            }
            this._currentPanelName = name;
            this._currentPanel = this._panels[name];
            this._currentPanel.show();
            this._panelSelected(name);
        },

        /**
        * Hide specified panel
        * @param {string} name Name identifying panel that should be closed
        */
        hidePanel: function (name) {
            this._panels[name].hide();
        },

        /**
        * Returns the name of the current panel.
        * @return {string} Name or, if showPanel has not yet been called, null
        */
        getCurrentPanelName: function () {
            return this._currentPanelName;
        },

        /**
        * Sets the display of the controller's busy display.
        * @param {boolean} show Shows the busy display if true
        */
        showBusy: function (show) {
            if (show) {
                domStyle.set(this.detailLoadingIndicator, "display", "block");
            } else {
                domStyle.set(this.detailLoadingIndicator, "display", "none");
            }
        },

        /**
        * Return current open panels name
        * @param {string} panel name
        */
        onPanelShown: function (name) {
            return name;
        },

        /**
        * Return current open panels name
        * @param {string} panel name
        */
        _panelSelected: function (name) {
            this.onPanelShown(name);
        }

    });
});
