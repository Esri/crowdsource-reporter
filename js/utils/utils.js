/*global define,dojo,alert,document, esriConfig */
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
    "dojo/dom",
    "dojo/_base/fx",
    "dojo/_base/lang",
    "dojo/_base/array",
    "dojo/dom-construct",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/dom-style",
    "widgets/help/help",
    "dojo/on",
    "dojo/has",
    "dojo/query",
    "dijit/_WidgetBase",
    "esri/dijit/LocateButton",
    "esri/dijit/HomeButton",
    "esri/tasks/locator",
    "esri/geometry/webMercatorUtils",
    "dojo/Deferred",
    "dojo/_base/Color",
    "dojo/colors",
    "dojox/color"

], function (
    declare,
    dom,
    coreFx,
    lang,
    array,
    domConstruct,
    domGeometry,
    domClass,
    domAttr,
    domStyle,
    Help,
    on,
    has,
    query,
    _WidgetBase,
    LocateButton,
    HomeButton,
    Locator,
    webMercatorUtils,
    Deferred,
    Color,
    Colors,
    dojoxColor

) {
    return declare([_WidgetBase], {
        reportingPeriodDialog : null,
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
            domClass.remove(dom.byId("noWebMapParentDiv"), "esriCTHidden");
            domAttr.set(dom.byId("noWebMapChildDiv"), "innerHTML", message);
            dom.byId("noWebMapChildDiv").focus();
        },

        /**
        * This function is used to convert ArcGIS date format constants to readable date formats
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
                obj.dateFormat = "MMMM DD, YYYY";
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
                obj.dateFormat = "MM/DD/YYYY h:mm a";
                obj.showTime = true;
                return obj;
            case "shortDateLEShortTime":
                obj.dateFormat = "DD/MM/YYYY h:mm a";
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
                obj.dateFormat = "MMMM DD, YYYY";
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
        },

        /**
        * Create geolocation button on the map
        * @memberOf utils/utils
        */
        createGeoLocationButton: function (basemapLayers, map, parentNode, addGraphic) {
            var currentLocation, createLocationDiv;
            // create geolocation div
            createLocationDiv = domConstruct.create("div", {}, parentNode);
            domAttr.set(createLocationDiv, "title", this.config.i18n.map.geolocationTooltip);
            // initialize object of locate button
            currentLocation = new LocateButton({
                map: map,
                highlightLocation: false,
                setScale: false,
                centerAt: false
            }, createLocationDiv);
            currentLocation.startup();
            domStyle.set(parentNode, 'display', currentLocation.domNode.style["display"]);

            // event on locate
            on(currentLocation, "locate", lang.hitch(this, function (evt) {
                this.onGeolocationComplete(evt, addGraphic);
            }));
        },

        /**
        * Create homebutton button on the map
        * @memberOf utils/utils
        */
        createHomeButton: function (map, parentNode) {
            var homeButton, createHomeButtonDiv;
            createHomeButtonDiv = domConstruct.create("div", { "class": "esriCTHomeButton" }, parentNode);
            homeButton = new HomeButton({
                map: map,
                "class": "esriCTHomeButton"
            }, createHomeButtonDiv);
            homeButton.startup();
        },

        /**
        * Create basemap gallery button on the map
        * @memberOf utils/utils
        */
        createBasemapGalleryButton: function (parentNode) {
            domConstruct.create("div", {
                title: this.config.i18n.main.basemapGalleryText
            }, parentNode);
        },

        /**
        * Create basemap gallery button on the map
        * @memberOf utils/utils
        */
        createLegendButton: function (parentNode) {
            domConstruct.create("div", {
                title: this.config.i18n.main.legendText
            }, parentNode);
        },

        /**
        * Fetch the basemap extent
        * @memberOf utils/utils
        */
        getBasemapExtent: function (baseMapLayers) {
            var basemapExtent, i;
            /* If map contains a single basemap layer, consider full extent of that basemap
            If map contains multiple basemap layers, union the full extent of all the basemaps */
            for (i = 0; i < baseMapLayers.length; i++) {
                if (i === 0) {
                    basemapExtent = baseMapLayers[i].layerObject.fullExtent;
                } else {
                    basemapExtent = basemapExtent.union(baseMapLayers[i].layerObject.fullExtent);
                }
            }
            return basemapExtent;
        },

        /**
        * Invoked when geolocation is complete
        * @memberOf utils/utils
        */
        onGeolocationComplete: function (event, addGraphic) {
            return event;
        },

        /* This function is used to display place holder text in search bar
        * @memberOf utils/utils
        */
        displayPlaceHolderText: function (node, itemInfo, nls) {
            if (has("ie") === 9) {
                if (lang.trim(node.value) === "" && itemInfo.itemData.applicationProperties.viewing.search && itemInfo.itemData.applicationProperties.viewing.search.hintText) {
                    node.value = itemInfo.itemData.applicationProperties.viewing.search.hintText;
                    domClass.add(node, "esriCTPlaceholder");
                } else {
                    node.value = nls.locator.locatorPlaceholder;
                    domClass.add(node, "esriCTPlaceholder");
                }
            }
        },

        /**
        * This function is used to remove place holder text in search bar
        * @memberOf widgets/utils/utils
        */
        removePlaceHolderText: function (node) {
            if (domClass.contains(node, "esriCTPlaceholder")) {
                node.value = "";
                domClass.remove(node, "esriCTPlaceholder");
            }
        },

        /**
        * @memberOf utils/utils
        */
        isAndroid: function () {
            var ua = navigator.userAgent.toLowerCase();
            return ua.indexOf("android") > -1;
        },

        /**
        * This function is used create geocoder object based on the portal settings
        * @memberOf widgets/utils/utils
        */
        createGeocoderInstance: function () {
            //Default geocoder url
            var geocodeURL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";
            if (this.config.helperServices && this.config.helperServices.geocode && this.config.helperServices.geocode[0] && this.config.helperServices.geocode[0].url) {
                geocodeURL = this.config.helperServices.geocode[0].url;
            }
            //create the locator instance to reverse geocode the address
            this.locatorInstance = new Locator(geocodeURL);
            //Listen for location to address complete event
            this.locatorInstance.on("location-to-address-complete", lang.hitch(this, function (result) {
                this.onLocationToAddressComplete(result);
            }));
            //Listen for error in locator
            this.locatorInstance.onError = lang.hitch(this, function (err) {
                this.onLocationToAddressFailed(err);
            });
        },

        /**
        * This function is used to refresh the supporting label layers
        * @memberOf widgets/utils/utils
        */
        refreshLabelLayers: function (operationalLayers) {
            array.forEach(operationalLayers, lang.hitch(this, function (currentLayer) {
                if (currentLayer.layerObject && currentLayer.layerObject.showLabels && currentLayer.layerObject.labelingInfo) {
                    currentLayer.layerObject.refresh();
                }
            }));
        },

        /**
        * This function is used to get the calculated color from the configured color in org json
        * @returns {bool}
        * @memberOf utils/utils
        */
        getCalculatedColor: function (configuredColor, luminosityDifference, luminosity) {
            var calculatedColor, calculatedHexColor, configuredColorObject, configuredColorHSLObject;
            configuredColorObject = new Colors(configuredColor);
            configuredColorHSLObject = configuredColorObject.toHsl();
            if (configuredColorHSLObject.l < luminosityDifference) {
                calculatedColor = dojoxColor.fromHsl(configuredColorHSLObject.h,
                    configuredColorHSLObject.s, configuredColorHSLObject.l + luminosity);
            } else {
                calculatedColor = dojoxColor.fromHsl(configuredColorHSLObject.h,
                    configuredColorHSLObject.s, configuredColorHSLObject.l - luminosity);
            }
            calculatedHexColor = calculatedColor.toHex();
            return calculatedHexColor;
        },

        /**
        * This function define the color for overlay container based on theme color
        * @memberOf utils/utils
        */
        getOverlayBackgroundColor: function (configuredColor) {
            var configuredColorObject, configuredColorHSLObject, overlayBackground;
            configuredColorObject = new Colors(configuredColor);
            configuredColorHSLObject = configuredColorObject.toHsl();
            if (configuredColorHSLObject.l <= 40) {
                overlayBackground = "rgba(0, 0 , 0 , 0.30)";
            } else {
                overlayBackground = "rgba(255, 255, 255, 0.30)";
            }
            return overlayBackground;
        },

        /**
        * create the configured reporting period closed message.
        */
        createReportingPeriodDialog: function () {
            //Initialize splash screen
            this.reportingPeriodDialog = new Help({
                "config": this.config,
                "title": this.config.reportingPeriodDialogTitle,
                "dialog": "reporting",
                "content": this.config.reportingPeriodDialogContent,
                "appUtils": this
            });
        },

        /**
        * Validate the event
        */
        validateEvent: function (event, isMenu) {
            if (!event || !event.type) {
                return true;
            }
            if ((event.type === "focusin" || event.type === "focusout") && isMenu) {
                return true;
            }
            if (event.type === 'click') {
                return true;
            }
            if (event.type === 'keypress') {
                var code = event.charCode || event.keyCode;
                if ((code === 32) || (code === 13)) {
                    return true;
                }
            }
            else {
                return false;
            }
        },

        /**
        * This function is used to check certain conditions,
        * whether to submit comment or validate its date range before submitting it.
        */
        isCommentDateInRange: function () {
            // Property is not available - Submit comment
            if (this.config.hasOwnProperty("commentStartDate") &&
                this.config.hasOwnProperty("commentStartTime") &&
                this.config.hasOwnProperty("commentEndDate") &&
                this.config.hasOwnProperty("commentEndTime")) {
                // All the properties are blank - Submit comment
                if ((this.config.commentStartDate === null || this.config.commentStartDate === "") &&
                    (this.config.commentStartTime === null || this.config.commentStartTime === "") &&
                    (this.config.commentEndDate === null || this.config.commentEndDate === "") &&
                    (this.config.commentEndTime === null || this.config.commentEndTime === "")) {
                    return null; // follow open flag
                } else {
                    var validStartDate, validEndDate, validStartTime, validEndTime;
                    // valid start date
                    if (this.config.commentStartDate !== null && this.config.commentStartDate !== "") {
                        validStartDate = true;
                    }
                    // valid start time
                    if (this.config.commentStartTime !== null && this.config.commentStartTime !== "") {
                        validStartTime = true;
                    }
                    // valid end date
                    if (this.config.commentEndDate !== null && this.config.commentEndDate !== "") {
                        validEndDate = true;
                    }
                    // valid end time
                    if (this.config.commentEndTime !== null && this.config.commentEndTime !== "") {
                        validEndTime = true;
                    }
                    if (validStartDate) {
                        if (validStartTime) {
                            if (validEndDate) {
                                if (validEndTime) {
                                    return this._checkCommentDateRange(true, true, true, true); //10,11
                                } else {
                                    return this._checkCommentDateRange(true, true, true, false); //23,32
                                }
                            } else {
                                return this._checkCommentDateRange(true, true, false, false); //12,13,24,33
                            }
                        } else {
                            if (validEndDate) {
                                if (validEndTime) {
                                    return this._checkCommentDateRange(true, false, true, true); //19,28
                                } else {
                                    return this._checkCommentDateRange(true, false, true, false); //16,25
                                }
                            } else {
                                return this._checkCommentDateRange(true, false, false, false); //21,22,30,31
                            }
                        }
                    } else {
                        if (validStartTime) {
                            if (validEndDate) {
                                if (validEndTime) {
                                    return this._checkCommentDateRange(false, false, true, true); //20,29
                                } else {
                                    return this._checkCommentDateRange(false, false, true, false); //17, 26
                                }
                            } else {
                                return null; //2,3,6,7 follow open flag
                            }
                        } else {
                            if (validEndDate) {
                                if (validEndTime) {
                                    return this._checkCommentDateRange(false, false, true, true); //14, 15
                                } else {
                                    return this._checkCommentDateRange(false, false, true, false); //18, 27
                                }
                            } else {
                                return null; //4,5,8,9 follow open flag
                            }
                        }
                    }
                }
            } else {
                return null; // follow open flag
            }
        },

        /**
         * This function is used to check whether current date while submitting comments,
         * lie between configured start datetime & end datetime.
         * Comments would only get submitted if it lies within the range.
         */
        _checkCommentDateRange: function (validStartDate, validStartTime, validEndDate, validEndTime) {
            var configuredStartDateObj, configuredStartTimeObj, configuredEndDateObj, configuredEndTimeObj,
                configuredStartDateLocal, configuredStartTimeLocal, configuredEndDateLocal, configuredEndTimeLocal,
                combinedConfiguredStartDateAndTime, combinedConfiguredEndDateAndTime, currentDate;
            if (validStartDate) {
                configuredStartDateObj = new Date(this.config.commentStartDate);
                configuredStartDateLocal = configuredStartDateObj.toLocaleDateString();
            }
            if (validEndDate) {
                configuredEndDateObj = new Date(this.config.commentEndDate);
                configuredEndDateLocal = configuredEndDateObj.toLocaleDateString();
            }
            if (validStartTime) {
                configuredStartTimeObj = new Date(this.config.commentStartTime);
                configuredStartTimeLocal = configuredStartTimeObj.toLocaleTimeString();
            }
            if (validEndTime) {
                configuredEndTimeObj = new Date(this.config.commentEndTime);
                configuredEndTimeLocal = configuredEndTimeObj.toLocaleTimeString();
            }
            if (validStartDate) {
                if (validStartTime) {
                    combinedConfiguredStartDateAndTime = new Date(configuredStartDateLocal + " " + configuredStartTimeLocal);
                } else {
                    combinedConfiguredStartDateAndTime = new Date(configuredStartDateLocal);
                }
            }
            if (validEndDate) {
                if (validEndTime) {
                    combinedConfiguredEndDateAndTime = new Date(configuredEndDateLocal + " " + configuredEndTimeLocal);
                } else {
                    combinedConfiguredEndDateAndTime = new Date(configuredEndDateLocal);
                }
            }
            currentDate = new Date();
            //If check time range flag is false. Remove time from current date
            if ((!validStartTime) || (!validEndTime)) {
                currentDate.setHours(0);
                currentDate.setMinutes(0);
                currentDate.setSeconds(0);
                currentDate.setMilliseconds(0);
            }
            if (validStartDate && validEndDate) {
                if (currentDate >= combinedConfiguredStartDateAndTime && currentDate <= combinedConfiguredEndDateAndTime) {
                    return true;
                } else {
                    return false;
                }
            } else if (validStartDate && (!validEndDate)) {
                if (currentDate >= combinedConfiguredStartDateAndTime) {
                    return true;
                } else {
                    return false;
                }
            } else if ((!validStartDate) && validEndDate) {
                if (currentDate <= combinedConfiguredEndDateAndTime) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    });
});