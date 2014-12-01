/*global define */
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
define(["dojo/dom", "dojo/_base/fx", "dojo/dom-geometry", "dojo/dom-class"], function (
    dom,
    coreFx,
    domGeometry,
    domClass
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
        }
    }
});