/*global define,dojo,alert,moment,$ */
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
    "dojo/dom-construct",
    "dojo/text!./templates/help.html",
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
        templateString: template,

        postCreate: function () {
            $("#myModal", this.domNode).addClass("esriCT" + this.dialog);
            //Check if show buttons flag is set to true and button text exist
            if (this.showButtons && this.okButtonText && this.cancelButtonText) {
                $('#myModal', this.domNode).find('.modal-footer').removeClass("esriCTHidden");
                $('#myModal', this.domNode).find('.esriCTOkButton')[0].innerHTML = this.okButtonText;
                $('#myModal', this.domNode).find('.esriCTCancelButton')[0].innerHTML = this.cancelButtonText;
                $('#myModal', this.domNode).find('.modal-dialog').addClass("esriCTModelDialogWithButton");
            }
            $('#myModal', this.domNode).find('.modal-title').html(this.title);
            $('#myModal', this.domNode).find('.esriCTModelBody').html(this.content);
            $("#myModal", this.domNode).attr('panel', this.dialog);
            domConstruct.place(this.domNode, document.body, 'last');
            $('#myModal', this.domNode).find('.esriCTOkButton').click(lang.hitch(this, function () {
                this.okButtonClicked();
            }));
            $('#myModal', this.domNode).find('.esriCTCancelButton').click(lang.hitch(this, function () {
                this.cancelButtonClicked();
            }));
        },

        startup: function () {
            this.inherited(arguments);
        },

        /**
        * Shows modal dialog
        * @memberOf widgets/help/help
        */
        showDialog: function (panel) {
            $("[panel=" + panel + "]").modal("show");
            //Set modal templates scroll position to 0
            setTimeout(function () {
                $("[panel=" + panel + "]").find('.modal-body')[0].scrollTop = 0;
            }, 200);
        },

        hideDialog: function (panel) {
            $("[panel=" + panel + "]").modal("hide");
        },

        /**
        * Listener for ok button click
        * @memberOf widgets/help/help
        */
        okButtonClicked: function () {
            return;
        },

        /**
        * Listener for cancel button click
        * @memberOf widgets/help/help
        */
        cancelButtonClicked: function () {
            return;
        }
    });
});
