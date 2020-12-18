/*global define,$,document,setTimeout */
/*jslint sloppy:true */
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
    "dojo/dom-construct",
    "dojo/text!./templates/warning.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/_base/lang",
    "dojo/domReady!"
], function (
    declare,
    domConstruct,
    template,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    lang

) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,  //  a string representing the HTML of the template

        /**
        * This function is called when widget is constructed.
        * @param{object} parameters of widget
        * @memberOf widgets/warning/warning
        */
        constructor: function (options) {
            lang.mixin(this, options);
        },

        /**
        * This method is designed to handle processing after any DOM fragments have been actually added to the document.
        * @memberOf widgets/warning/warning
        */
        startup: function () {
            this._setHelpWindowTitle();
            this._setHelpWindowContent();
            this._showHelpDialog();
        },

        /**
        * This function is used to set title of help dialog
        * @memberOf widgets/warning/warning
        */
        _setHelpWindowTitle: function () {
            domConstruct.place(template, document.body, 'last');
            $('#helpModalWrapperContainer').find('.modal-title').html(this.appConfig.helpDialogTitle);
        },

        /**
        * This function is used to set content of help dialog
        * @memberOf widgets/warning/warning
        */
        _setHelpWindowContent: function () {
            $('#helpModalWrapperContainer').find('.modal-body').html(this.appConfig.helpDialogContent);
        },

        /**
        * This function is used to show help dialog
        * @memberOf widgets/warning/warning
        */
        _showHelpDialog: function () {
            $("#helpModalWrapperContainer").modal("show");
            // set modal templates scroll position to 0
            setTimeout(function () {
                $('#helpModalWrapperContainer').find('.modal-body')[0].scrollTop = 0;
            }, 200);
        }
    });
});
