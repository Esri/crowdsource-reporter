/*global define,dojo,alert,moment,$,dojoConfig */
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
    "esri/arcgis/utils",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/dom-class",
    "dojo/dom-attr",
    "dojo/on",
    "dojo/topic",
    "dojo/string",
    "dojo/window",
    "dojo/text!css/theme-template.css",
    "esri/layers/GraphicsLayer",
    "application/utils/utils",
    "dojo/query",
    "widgets/locator/locator",
    "dijit/_WidgetBase",
    "esri/graphic",
    "esri/symbols/PictureMarkerSymbol",
    "dojo/domReady!"
], function (
    declare,
    lang,
    arcgisUtils,
    dom,
    domConstruct,
    domStyle,
    domClass,
    domAttr,
    on,
    topic,
    string,
    dojowindow,
    ThemeCss,
    GraphicsLayer,
    ApplicationUtils,
    query,
    Locator,
    _WidgetBase,
    Graphic,
    PictureMarkerSymbol

) {
    return declare([_WidgetBase], {
        startup: function () {
            this.inherited(arguments);
        },

        /**
        * Create search button on the map
        * @param{object} response
        * @param{object} map
        * @param{string} mapId
        * @param{boolean} addGraphic
        * @param{object} details
        * @memberOf widgets/map-search/map-search
        */
        createSearchButton: function (response, map, mapId, addGraphic, details) {
            var createSearchDiv, inputGroupButton, searchIconDiv, textSearch;
            if (query(".search")[0]) {
                domConstruct.empty(query(".search")[0]);
            }
            // create search div
            createSearchDiv = domConstruct.create("div", { "class": "search", "id": "search" });
            domConstruct.place(createSearchDiv, query(".esriCTMapGeoLocationContainer", mapId)[0], "after");
            // Initialize map serach widget
            this.locatorSearch = new Locator({ "map": map, "config": this.config, "itemInfo": response.itemInfo.itemData, "layerId": details.operationalLayerId, "locatorContainer": dom.byId("search"), "handleFeatureSearch": this.handleFeatureSearch });

            // function call on selection of search result
            this.basemapExtent = this.appUtils.getBasemapExtent(details.itemInfo.itemData.baseMap.baseMapLayers);
            this.newMap = map;
            this.countyLayer = new GraphicsLayer();
            this.newMap.addLayer(this.countyLayer);
            this.locatorSearch.onFeatureSearchCompleted = lang.hitch(this, function (feature) {
                this.onFeatureFound(feature);
                if (query(".esriCTMapSearchContainer .input-group-btn")[0]) {
                    this._collapseSerach(query(".esriCTMapSearchContainer .input-group-btn")[0]);
                }
            });
            this.locatorSearch.onLocationCompleted = lang.hitch(this, this._validateAddress);
            inputGroupButton = query(".esriCTMapSearchContainer .input-group-btn")[0];
            searchIconDiv = query(".esriCTMapSearchContainer .esriCTLocatorSearchButton ")[0];
            on(searchIconDiv, "click", lang.hitch(this, function () {
                this._expandSerach(inputGroupButton);
            }));

            on(this.newMap, "click", lang.hitch(this, function () {
                this._collapseSerach(inputGroupButton);
                this.locatorSearch._hideText();
            }));
            textSearch = this.locatorSearch.txtSearch;
            on(textSearch, "blur", lang.hitch(this, function (evt) {
                if (domClass.contains(this.locatorSearch.divResultContainer, "esriCTHidden")) {
                    this._collapseSerach(inputGroupButton);
                    this.locatorSearch._hideText();
                }
            }));

            on(document, "click", lang.hitch(this, function (evt) {
                if ((this.locatorSearch.txtSearch.onfocusout || this.locatorSearch.txtSearch.onblur) && (this.locatorSearch.txtSearch.value !== "" || this.locatorSearch.txtSearch.value !== null)) {
                    this._collapseSerach(inputGroupButton);
                    this.locatorSearch._hideText();
                }
            }));
        },

        /**
        * Binds the collapse animation effect for the map search on map
        * @memberOf widgets/map-search/map-search
        */
        _collapseSerach: function (inputGroupButton) {
            var textSearch, serachClose;
            serachClose = this.locatorSearch.clearhide;
            textSearch = this.locatorSearch.txtSearch;
            if (inputGroupButton) {
                domStyle.set(inputGroupButton, "right", "-5px");
            }
            $(textSearch).animate({ width: '0', paddingLeft: '0', paddingRight: '0', opacity: '0' }, 200);
            $(serachClose).hide();
            $(textSearch).hide();
            $(textSearch).blur();
            domClass.add(this.locatorSearch.divResultContainer, "esriCTHidden");
        },

        /**
        * Binds the expands animation effect for the map search on map
        * @memberOf widgets/map-search/map-search
        */
        _expandSerach: function (inputGroupButton) {
            var textSearch, serachClose;
            serachClose = this.locatorSearch.clearhide;
            textSearch = this.locatorSearch.txtSearch;
            if (inputGroupButton) {
                domStyle.set(inputGroupButton, "right", "-3px");
            }
            $(textSearch).animate({ width: '265px', paddingLeft: '6px', paddingRight: '67px', opacity: '1' }, 200);
            $(textSearch).show();
            $(serachClose).show();
            $(textSearch).focus();
            setTimeout(lang.hitch(this, function () {
                this.locatorSearch.txtSearch.focus();
            }), 300);
        },

        /**
        * check if located address is in basemap extent
        * @param{object} geometry of located point on the map
        * @memberOf widgets/map-search/map-search
        */
        _validateAddress: function (geometry) {
            var inputGroupButton;
            if (this.basemapExtent.contains(geometry)) {
                this._zoomToSelectedFeature(geometry);
                this._highlightSelectedLocation({ "feature": new Graphic(geometry) });
            } else {
                this.appUtils.showError(this.config.i18n.locator.locationOutOfExtent);
            }
            inputGroupButton = query(".esriCTMapSearchContainer .input-group-btn")[0];
            this._collapseSerach(inputGroupButton);
            this.onAddressClicked(geometry);
        },

        /**
        * set the selected feature from results
        * @param{evt} geometry object
        * @memberOf widgets/map-search/map-search
        **/
        _getSelectedFeatureFromResult: function (evt) {
            var selectedFeature;
            if (evt) {
                if (evt.feature) {
                    selectedFeature = evt.feature;
                } else if (evt.result && evt.result.feature) {
                    selectedFeature = evt.result.feature;
                }
            }
            return selectedFeature;
        },

        /**
        * Function to highlight searched Address on Map
        * @param{evt} geometry object
        * @memberOf widgets/map-search/map-search
        **/
        _highlightSelectedLocation: function (evt) {
            var symbol, selectedFeature;
            //get selected feature*/
            selectedFeature = this._getSelectedFeatureFromResult(evt);
            if (selectedFeature && selectedFeature.geometry && selectedFeature.geometry.type === "point") {
                this.countyLayer.clear();
                // set the graphic symbol for selected point and highlight on map
                symbol = new PictureMarkerSymbol(dojoConfig.baseURL + this.config.searchedAddressPushpinImage, 32, 32);
                this.countyLayer.add(new Graphic(selectedFeature.geometry, symbol));
            }
        },

        /**
        * Zoom to the selected feature
        * @param{object} geometry, geometry of the graphics plotted on the map
        * @memberOf widgets/map-search/map-search
        */
        _zoomToSelectedFeature: function (geometry) {
            var centerPoint;
            // check for geometry type of different layer
            if (geometry.type === "point") {
                this.newMap.setLevel(this.config.zoomLevel);
                this.newMap.centerAt(geometry);
            } else if (geometry.type === "polyline") {
                this.newMap.setLevel(this.config.zoomLevel);
                centerPoint = geometry.getExtent();
                this.newMap.setExtent(centerPoint);
                // if geometry is of type polygon, add border to the polygon
            } else if (geometry.type === "polygon") {
                this.newMap.setLevel(this.config.zoomLevel);
                centerPoint = geometry.getExtent();
                this.newMap.setExtent(centerPoint);
            }
        },

        onFeatureFound: function (feature) {
            return feature;
        }
    });
});
