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
            var obj = {};
            switch (type) {
            case "shortDate":
                obj.dateFormat = "MM/DD/YYYY";
                obj.showTime = false;
                return obj;
            case "shortDateLE":
                obj.dateFormat = "DD/MM/YYYY";
                obj.showTime = false;
                return obj;
            case "longMonthDayYear":
                obj.dateFormat = "MMMM DD,YYYY";
                obj.showTime = false;
                return obj;
            case "dayShortMonthYear":
                obj.dateFormat = "DD MMM YYYY";
                obj.showTime = false;
                return obj;
            case "longDate":
                obj.dateFormat = "dddd, MMMM DD, YYYY";
                obj.showTime = false;
                return obj;
            case "shortDateLongTime":
                obj.dateFormat = "MM/DD/YYYY h:mm:ss a";
                obj.showTime = true;
                return obj;
            case "shortDateLELongTime":
                obj.dateFormat = "DD/MM/YYYY h:mm:ss a";
                obj.showTime = true;
                return obj;
            case "shortDateShortTime":
                obj.dateFormat = "DD/MM/YYYY h:mm a";
                obj.showTime = true;
                return obj;
            case "shortDateLEShortTime":
                obj.dateFormat = "MM/DD/YYYY h:mm a";
                obj.showTime = true;
                return obj;
            case "shortDateShortTime24":
                obj.dateFormat = "MM/DD/YYYY HH:mm";
                obj.showTime = true;
                return obj;
            case "shortDateLEShortTime24":
                obj.dateFormat = "MM/DD/YYYY HH:mm";
                obj.showTime = true;
                return obj;
            case "longMonthYear":
                obj.dateFormat = "MMMM YYYY";
                obj.showTime = false;
                return obj;
            case "shortMonthYear":
                obj.dateFormat = "MMM YYYY";
                obj.showTime = false;
                return obj;
            case "year":
                obj.dateFormat = "YYYY";
                obj.showTime = false;
                return obj;
            default:
                obj.dateFormat = "MMMM DD,YYYY";
                obj.showTime = false;
                return obj;
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