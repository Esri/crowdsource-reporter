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
    "dojo/_base/lang",
    "dojo/dom-construct",
    "dojo/dom-attr",
    "dojo/text!./templates/help.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/on",
    "dojo/domReady!"
], function (
    declare,
    lang,
    domConstruct,
    domAttr,
    template,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin,
    on

) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,

        postCreate: function () {
            var myModal;
            //fetch the current modal by class
            myModal = $(".modal", this.domNode);
            $(myModal).addClass("esriCT" + this.dialog);
            //Check if show buttons flag is set to true and button text exist
            if (this.showButtons && this.okButtonText && this.cancelButtonText) {
                $(myModal, this.domNode).find('.modal-footer').removeClass("esriCTHidden");
                $(myModal, this.domNode).find('.esriCTOkButton')[0].innerHTML = this.okButtonText;
                domAttr.set($(myModal, this.domNode).find('.esriCTOkButton')[0],
                    "aria-label", this.okButtonText);
                $(myModal, this.domNode).find('.esriCTCancelButton')[0].innerHTML = this.cancelButtonText;
                domAttr.set($(myModal, this.domNode).find('.esriCTCancelButton')[0],
                    "aria-label", this.cancelButtonText);
                $(myModal, this.domNode).find('.modal-dialog').addClass("esriCTModelDialogWithButton");
            }
            $(myModal, this.domNode).find('.modal-title').html(this.title);
            domAttr.set($(myModal, this.domNode).find('.modal-title')[0],
                "aria-label", this.title);
            $(myModal, this.domNode).find('.esriCTModelBody').html(this.content);
            $(myModal, this.domNode).attr('panel', this.dialog);
            domConstruct.place(this.domNode, document.body, 'last');
            $(myModal, this.domNode).find('.esriCTOkButton').click(lang.hitch(this, function () {
                this.okButtonClicked();
            }));
            $(myModal, this.domNode).find('.esriCTCancelButton').click(lang.hitch(this, function () {
                this.cancelButtonClicked();
            }));

            //Listen for close button clicked event
            on($(myModal, this.domNode).find('.esriCTClose'), "keypress",
                lang.hitch(this, function (evt) {
                    if (!this.appUtils.validateEvent(evt)) {
                        return;
                    }
                    $(myModal, this.domNode).modal("toggle");
                }));

            //Listen for dialog open event
            $("[panel=" + this.dialog + "]").on('shown.bs.modal', lang.hitch(this, function () {
                setTimeout(lang.hitch(this, function () {
                    $("[panel=" + this.dialog + "]").find('.modal-title')[0].focus();
                }, 200));
            }));
            //Listen for dialog close event
            $("[panel=" + this.dialog + "]").on('hidden.bs.modal', lang.hitch(this, function () {
                this.onDialogClosed();
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

        /**
        * Hides modal dialog
        * @memberOf widgets/help/help
        */
        hideDialog: function (panel) {
            $("[panel=" + panel + "]").modal("hide");
        },

        /**
        * Listener for dialog close
        * @memberOf widgets/help/help
        */
        onDialogClosed: function () {
            return;
        },

        /**
        * Listener for dialog close
        * @memberOf widgets/help/help
        */
        okButtonClicked: function () {
            return;
        },

        /**
        * Listener for dialog close
        * @memberOf widgets/help/help
        */
        cancelButtonClicked: function () {
            return;
        }
    });
});
