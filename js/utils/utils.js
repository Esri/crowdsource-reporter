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
        * This function deifne the color for overlay container based on theme color
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
                "dialog":"reporting",
                "content": this.config.reportingPeriodDialogContent
            });
        }
    });
});