/*global define,dojo,alert,document */
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
    "dojo/dom",
    "dojo/_base/fx",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-attr"
], function (
    dom,
    coreFx,
    domGeometry,
    domClass,
    domAttr
) {
    return {
        showLoadingIndicator: function () {
            domClass.add(document.body, "app-loading");
        },

        hideLoadingIndicator: function () {
            domClass.remove(document.body, "app-loading");
        },

        showError: function (error) {
            alert(error);
        },

        showMessage: function (msg) {
            alert(msg);
        },

        showErrorScreen: function (message) {
            domClass.add(dom.byId("layoutContainer"), "esriCTHidden");
            domClass.remove(dom.byId("esriCTNoWebMapParentDiv"), "esriCTHidden");
            domAttr.set(dom.byId("esriCTNoWebMapChildDiv"), "innerHTML", message);
        },

        /**
        * Get date format based on format received from webmap info popup
        * @memberOf utils/utils
        */
        getDateFormat: function (type) {
            switch (type) {
            case "shortDate":
                return "MM/DD/YYYY";
            case "shortDateLE":
                return "DD/MM/YYYY";
            case "longMonthDayYear":
                return "MMMM DD,YYYY";
            case "dayShortMonthYear":
                return "DD MMM YYYY";
            case "longDate":
                return "dddd, MMMM DD, YYYY";
            case "shortDateLongTime":
                return "MM/DD/YYYY h:mm:ss a";
            case "shortDateLELongTime":
                return "DD/MM/YYYY h:mm:ss a";
            case "shortDateShortTime":
                return "DD/MM/YYYY h:mm a";
            case "shortDateLEShortTime":
                return "MM/DD/YYYY h:mm a";
            case "shortDateShortTime24":
                return "MM/DD/YYYY HH:mm";
            case "shortDateLEShortTime24":
                return "MM/DD/YYYY HH:mm";
            case "longMonthYear":
                return "MMMM YYYY";
            case "shortMonthYear":
                return "MMM YYYY";
            case "year":
                return "YYYY";
            default:
                return "MMMM DD,YYYY";
            }
        },

        /**
        * This function is used to convert number to thousand separator
        * @memberOf utils/utils
        */
        convertNumberToThousandSeperator: function (number) {
            return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }
    };
});