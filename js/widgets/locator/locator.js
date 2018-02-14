/*global define,dojo,alert,$ */
/*jslint browser:true,sloppy:true,nomen:true,unparam:true,plusplus:true,indent:4 */
define([
    "dojo/_base/declare",
    "dojo/dom-construct",
    "dojo/_base/lang",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/dom-geometry",
    "dojo/dom-style",
    "dojo/_base/array",
    "dojo/dom",
    "dojo/Deferred",
    "dojo/DeferredList",
    "dojo/on",
    "dojo/keys",
    "dojo/query",
    "dojo/text!./templates/locator.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "esri/Color",
    "esri/config",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/geometry/webMercatorUtils",
    "esri/layers/GraphicsLayer",
    "esri/SpatialReference",
    "esri/tasks/GeometryService",
    "esri/tasks/locator",
    "esri/tasks/ProjectParameters",
    "esri/tasks/query",
    "esri/tasks/QueryTask",
    "vendor/usng"
], function (declare, domConstruct, lang, domAttr, domClass, domGeom, domStyle, array, dom, Deferred, DeferredList, on, keys, query, template, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Color, esriConfig, Graphic, Point, webMercatorUtils, GraphicsLayer, SpatialReference, GeometryService, Locator, ProjectParameters, EsriQuery, QueryTask, usng) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        lastSearchString: null,
        stagedSearch: null,
        usngValue: null,
        mgrsValue: null,
        latLongValue: null,
        searchedGroups: [], //will  contain the locator-names/layer-name for which the search is complete.
        isPerformingSearch: false,
        activeLocator: null,
        isEnterClicked: false,
        /**
        * This function is called when widget is constructed.
        * @param{object} config to be mixed
        * @memberOf widgets/locator/locator
        */
        constructor: function (config) {
            lang.mixin(this, config);
        },

        /**
        * Initialize widget
        * @memberOf widgets/locator/locator
        */
        postCreate: function () {
            var graphicsLayer, placeHolderText;
            domConstruct.place(this.divLocateContainer, this.locatorContainer);
            if (this.itemInfo.applicationProperties && this.itemInfo.applicationProperties.viewing.search && this.itemInfo.applicationProperties.viewing.search.hintText) {
                placeHolderText = this.itemInfo.applicationProperties.viewing.search.hintText;
            }
            placeHolderText = placeHolderText || this.config.i18n.locator.locatorPlaceholder;
            // add placeholder in textbox
            domAttr.set(this.txtSearch, "placeholder", placeHolderText);
            // set Tooltip for search button
            domAttr.set(this.searchSubmit, "title", this.config.i18n.locator.searchButtonTooltip);
            //set Tooltip to geocoder clear text button
            domAttr.set(this.close, "title", this.config.i18n.locator.clearButtonTooltip);
            this._attachLocatorEvents();
            // add graphics layer to map
            graphicsLayer = new GraphicsLayer();
            graphicsLayer.id = "locatorGraphicsLayer";
            this.map.addLayer(graphicsLayer);
            //fetch active locator name
            if (this.config.tool_search && this.config.searchConfig &&
                    this.config.searchConfig.sources.length > 0 &&
                    this.config.searchConfig.activeSourceIndex !== "all") {
                this.activeLocator = this.config.searchConfig.sources[this.config.searchConfig.activeSourceIndex].name;
            }
        },

        /**
        * attach locator events
        * @memberOf widgets/locator/locator
        */
        _attachLocatorEvents: function () {
            // perform unified search when user clicks on the locate button
            on(this.searchSubmit, 'click', lang.hitch(this, function () {
                if (lang.trim(this.txtSearch.value) !== '') {
                    this._toggleTexBoxControls(false);
                    //replace the staged search
                    clearTimeout(this.stagedSearch);
                    this._performUnifiedSearch();
                }
            }));
            on(this.txtSearch, "keyup", lang.hitch(this, function (evt) {
                this._submitAddress(evt);
            }));
            on(this.txtSearch, "input", lang.hitch(this, function (evt) {
                this._submitAddress(evt);
            }));
            on(this.txtSearch, "paste", lang.hitch(this, function (evt) {
                this._submitAddress(evt, true);
            }));
            on(this.txtSearch, "cut", lang.hitch(this, function (evt) {
                this._submitAddress(evt, true);
            }));
            on(this.close, "click", lang.hitch(this, function () {
                this._hideText(false);
            }));
        },

        /**
        * Search address on every key press
        * @memberOf widgets/locator/locator
        * @param {object} evt Keyup event
        * @param {} locatorText
        */
        _submitAddress: function (evt, locatorText) {
            if (locatorText) {
                setTimeout(lang.hitch(this, function () {
                    this._performUnifiedSearch();
                }), 100);
                return;
            }
            if (evt) {
                // Perform search when user hits ENTER key
                if (evt.keyCode === keys.ENTER) {
                    if (this.txtSearch.value !== '') {
                        this._toggleTexBoxControls(true);
                        this.isEnterClicked = true;
                        this._performUnifiedSearch();
                        return;
                    }
                }
                // Clear address results container when user hits BACKSPACE key till search box becomes empty
                if (evt.keyCode === keys.BACKSPACE) {
                    if (this.txtSearch.value === '' || this.txtSearch.length === 0 || this.txtSearch.value === null) {
                        this._toggleTexBoxControls(false);
                        domConstruct.empty(this.divResultContainer);
                        domClass.add(this.divResultContainer, "esriCTHidden");
                        return;
                    }
                }

                /**
                * do not perform auto complete search if alphabets,
                * numbers,numpad keys,comma,ctl+v,ctrl +x,delete or
                * backspace is pressed
                */
                if ((!((evt.keyCode >= 46 && evt.keyCode < 58) || (evt.keyCode > 64 && evt.keyCode < 91) || (evt.keyCode > 95 && evt.keyCode < 106) || evt.keyCode === 8 || evt.keyCode === 110 || evt.keyCode === 188)) || (evt.keyCode === 86 && evt.ctrlKey) || (evt.keyCode === 88 && evt.ctrlKey) || evt.keyCode === 229) {
                    evt.cancelBubble = true;
                    if (evt.stopPropagation) {
                        evt.stopPropagation();
                    }
                    this._toggleTexBoxControls(false);
                    return;
                }
                /**
                * call locator service if search text is not empty
                */
                if (lang.trim(this.txtSearch.value) !== '') {
                    if (this.lastSearchString !== lang.trim(this.txtSearch.value)) {
                        this.lastSearchString = lang.trim(this.txtSearch.value);
                        domConstruct.empty(this.divResultContainer);

                        /**
                        * clear any staged search
                        */
                        clearTimeout(this.stagedSearch);
                        if (lang.trim(this.txtSearch.value).length > 0) {

                            /**
                            * stage a new search, which will launch if no new searches show up
                            * before the timeout
                            */
                            this.stagedSearch = setTimeout(lang.hitch(this, function () {
                                this.stagedSearch = this._performUnifiedSearch();
                            }), 500);
                        }
                    } else {
                        this._toggleTexBoxControls(false);
                    }
                } else {
                    this.lastSearchString = lang.trim(this.txtSearch.value);
                    this._toggleTexBoxControls(false);
                    domConstruct.empty(this.divResultContainer);
                    domClass.add(this.divResultContainer, "esriCTHidden");
                }
            }
        },

        /**
        * Perform unified search
        * @method widgets/locator/locator
        */
        _performUnifiedSearch: function () {
            if (this._performSearchTimer) {
                clearTimeout(this._performSearchTimer);
            }
            this._performSearchTimer = setTimeout(lang.hitch(this, function () {
                var deferredArray = [],
                    i,
                    address = {},
                    options,
                    locator,
                    locatorDef,
                    geocoders = [];
                this.usngValue = null;
                this.mgrsValue = null;
                this.latLongValue = null;
                this.resultLength = 0;
                this._toggleTexBoxControls(true);
                this.searchedGroups = [];
                // clear previous result
                domConstruct.empty(this.divResultContainer);
                // show loading indicator in textbox
                this._toggleTexBoxControls(true);
                this.isPerformingSearch = true;
                // fetch the geocode URL from portal organization, and if the URL is unavailable disable address search
                if (this.config.helperServices.geocode.length > 0) {
                    //Check if search tool is enabled in the configuration
                    if (this.config.tool_search) {
                        geocoders = this.config.searchConfig.sources;
                    } else {
                        geocoders = this.config.helperServices.geocode;
                    }
                    for (i = 0; i < geocoders.length; i++) {
                        locator = new Locator(geocoders[i].url);
                        locator.outSpatialReference = this.map.spatialReference;
                        locator.name = (this.config && geocoders[i].name) ? geocoders[i].name : "";
                        if (geocoders[i].singleLineFieldName) {
                            address[geocoders[i].singleLineFieldName] = this.txtSearch.value;
                        } else {
                            address = {
                                SingleLine: this.txtSearch.value
                            };
                        }

                        options = {
                            address: address,
                            outFields: ["*"]
                        };
                        // optionally return the out fields if you need to calculate the extent of the geocoded point
                        locatorDef = locator.addressToLocations(options);
                        this._onAddressToLocateComplete(locator);
                        deferredArray.push(locatorDef);
                    }
                }
                // check if layer search is enabled in the webmap and layer is configured for search
                if (this.itemInfo.applicationProperties && this.itemInfo.applicationProperties.viewing.search && this.itemInfo.applicationProperties.viewing.search.enabled) {
                    for (i = 0; i < this.itemInfo.applicationProperties.viewing.search.layers.length; i++) {
                        if (this.layerId === this.itemInfo.applicationProperties.viewing.search.layers[i].id) {
                            this.searchField = this.itemInfo.applicationProperties.viewing.search.layers[i].field.name;
                            this._layerSearchResults(this.itemInfo.applicationProperties.viewing.search.layers[i], deferredArray);
                        }
                    }
                }
                // check if 'enableUSNGSearch' flag is set to true in config file
                if (this.config.enableUSNGSearch) {
                    this._convertUSNG();
                }
                // check if 'enableMGRSSearch' flag is set to true in config file
                if (this.config.enableMGRSSearch) {
                    this._convertMGRS();
                }
                // check if 'enableLatLongSearch' flag is set to true in config file
                if (this.config.enableLatLongSearch) {
                    this._getLatLongValue();
                }
                // get results for both address and layer search
                this._getAddressResults(deferredArray);
            }), 500);
        },

        /**
        * This function is used when address is located
        * @param {Object} to locate address
        * @memberOf widgets/locator/locator
        */
        _onAddressToLocateComplete: function (locator) {
            locator.on("address-to-locations-complete", lang.hitch(this, function (evt) {
                var locatorName, nameArray = {},
                    deferred;
                deferred = new Deferred();
                deferred.resolve({
                    "addresses": evt.addresses,
                    "target": evt.target
                });
                if (evt.addresses.length > 0 && !nameArray[this.config.i18n.locator.addressText + " " + evt.target.name]) {
                    locatorName = this.config.i18n.locator.addressText + " " + evt.target.name;
                    nameArray[locatorName] = this._addressResult(evt.addresses, locatorName);
                    if (nameArray[locatorName].length > 0) {
                        this._showLocatedAddress(nameArray);
                    }
                }
                return deferred.promise;
            }));
        },

        /**
        * Perform layer search if it is enabled in the webmap
        * @method widgets/locator/locator
        * @param {} layerObject
        * @param {} deferredArray
        */
        _layerSearchResults: function (layerObject, deferredArray) {
            var queryTask, queryLayer, deferred, currentTime, layer;
            layer = this.map.getLayer(layerObject.id);
            this._toggleTexBoxControls(true);
            if (layer) {
                currentTime = new Date().getTime();
                queryTask = new QueryTask(layer.url);
                queryLayer = new EsriQuery();
                // check if layer is configured to perform exact search, else perform 'contains' search
                if (layerObject.field.exactMatch) {
                    queryLayer.where = layerObject.field.name.toUpperCase() + "='" + lang.trim(this.txtSearch.value) + "'" + " AND " + currentTime + "=" + currentTime;
                } else {
                    queryLayer.where = "UPPER(" + layerObject.field.name + ") LIKE UPPER ('%" + lang.trim(this.txtSearch.value) + "%') AND " + currentTime + "=" + currentTime;
                }
                if (layer.getDefinitionExpression()) {
                    queryLayer.where = queryLayer.where + " AND " + layer.getDefinitionExpression();
                }
                queryLayer.outSpatialReference = this.map.spatialReference;
                queryLayer.returnGeometry = true;
                queryLayer.outFields = ["*"];

                deferred = new Deferred();
                queryTask.execute(queryLayer, lang.hitch(this, function (featureSet) {
                    var resultArray, resultObject = {};
                    if (featureSet) {
                        // store search results in an array
                        resultArray = this._displayLayerSearchResults(featureSet);
                        if (resultArray.length > 0) {
                            resultObject[this._getLayerTitle(layerObject.id)] = resultArray;
                            this._showLocatedAddress(resultObject);
                        }
                    }
                    deferred.resolve(featureSet);
                }), function (err) {
                    alert(err.message);
                    deferred.reject();
                });
                deferredArray.push(deferred);
            }
        },

        /**
        * Get layer title according to webmap list
        * @param {} layerID for which layer-title needs to be derived
        * @method widgets/locator/locator
        */
        _getLayerTitle: function (layerID) {
            var i;
            for (i = 0; i < this.itemInfo.operationalLayers.length; i++) {
                if (this.itemInfo.operationalLayers[i].id === layerID) {
                    return this.itemInfo.operationalLayers[i].title;
                }
            }
            return layerID;
        },

        /**
        * Fetch results for both address and layer search
        * @method widgets/locator/locator
        * @param {} deferredArray
        * @param {} layer on which search is performed
        */
        _getAddressResults: function (deferredArray) {
            var deferredListResult, nameArray;
            deferredListResult = new DeferredList(deferredArray);
            deferredListResult.then(lang.hitch(this, function (result) {
                nameArray = {};
                domClass.remove(this.divResultContainer, "esriCTHidden");
                // push USNG value into address array
                if (this.usngValue && this.usngValue.value) {
                    nameArray[this.config.i18n.locator.usngText] = [];
                    nameArray[this.config.i18n.locator.usngText].push(this.usngValue);
                    this.resultLength++;
                }
                // push MGRS value into address array
                if (this.mgrsValue && this.mgrsValue.value) {
                    nameArray[this.config.i18n.locator.mgrsText] = [];
                    nameArray[this.config.i18n.locator.mgrsText].push(this.mgrsValue);
                    this.resultLength++;
                }
                // push lat long value into address array
                if (this.latLongValue && this.latLongValue.value) {
                    nameArray[this.config.i18n.locator.latLongText] = [];
                    nameArray[this.config.i18n.locator.latLongText].push({
                        LatLong: this.latLongValue
                    });
                    this.resultLength++;
                }
                this._showLocatedAddress(nameArray);
                //hide loader started on unified search
                this.isPerformingSearch = false;
                this._toggleTexBoxControls(false);
            }));
        },

        /**
        * Push address search results in address array
        * @param {} candidates
        * @memberOf widgets/locator/locator
        */
        _addressResult: function (candidates) {
            var order, nameArray = [];
            // Loop through the results and store results of type LatLong in an array
            for (order = 0; order < candidates.length; order++) {
                if (candidates[order].attributes.Addr_type !== "LatLong" && (!(isNaN(candidates[order].location.x) && isNaN(candidates[order].location.y)))) {
                    nameArray.push({
                        name: candidates[order].address,
                        attributes: candidates[order]
                    });
                    this.resultLength++;
                }
            }
            return nameArray;
        },

        /**
        * Push layer search results in address array
        * @param {} candidates
        * @memberOf widgets/locator/locator
        */
        _displayLayerSearchResults: function (results) {
            var i, index, resultAttributes, returnArray = [];
            for (i = 0; i < results.features.length; i++) {
                resultAttributes = results.features[i].attributes;
                for (index in resultAttributes) {
                    if (resultAttributes.hasOwnProperty(index)) {
                        if (!resultAttributes[index]) {
                            resultAttributes[index] = this.config.showNullValueAs;
                        }
                    }
                }
                returnArray.push({
                    name: resultAttributes[this.searchField],
                    attributes: resultAttributes,
                    fields: results.fields,
                    geometry: results.features[i].geometry
                });
                this.resultLength++;
            }
            return returnArray;
        },

        /**
        * Group address results according to type
        * @param {} candidates
        * @memberOf widgets/locator/locator
        */
        _showLocatedAddress: function (candidates) {
            var candidateArray, divAddressContainer, candidate, addressListContainer, i, divAddressSearchCell,
                locatorName;
            if (candidates) {
                locatorName = Object.keys(candidates)[0];
                if (locatorName && locatorName.split(this.config.i18n.locator.addressText).length > 1) {
                    locatorName = lang.trim(locatorName.split(this.config.i18n.locator.addressText)[1]);
                }
            }
            // if searched value is empty, clear address container and do not perform search
            if (lang.trim(this.txtSearch.value) === "") {
                this.txtSearch.focus();
                this._toggleTexBoxControls(false);
                domConstruct.empty(this.divResultContainer);
                domClass.add(this.divResultContainer, "esriCTHidden");
                return;
            }
            // display all the located address in the address container
            // 'this.divResultContainer' div dom element contains located addresses, created in widget template
            // if results count is greater than 1, populate it in list else show no result message
            if (this.resultLength > 0) {
                this._toggleTexBoxControls(false);
                domClass.remove(this.divResultContainer, "esriCTHidden");
                for (candidateArray in candidates) {
                    if (candidates.hasOwnProperty(candidateArray)) {
                        if ($.inArray(candidateArray, this.searchedGroups) === -1) {
                            if (candidates[candidateArray].length > 0) {
                                divAddressContainer = domConstruct.create("div", {
                                    "class": "esriCTSearchGroupRow esriCTContentBottomBorder esriCTPointerCursor esriCTHeaderFont"
                                }, this.divResultContainer);
                                divAddressSearchCell = domConstruct.create("div", {
                                    "class": "esriCTSearchGroupCell"
                                }, divAddressContainer);
                                candidate = candidateArray + " (" + candidates[candidateArray].length + ")";
                                domConstruct.create("span", {
                                    "innerHTML": "+",
                                    "class": "esriCTPlusMinus"
                                }, divAddressSearchCell);
                                domConstruct.create("span", {
                                    "innerHTML": candidate,
                                    "class": "esriCTGroupList"
                                }, divAddressSearchCell);
                                this._toggleAddressList(divAddressSearchCell, this.searchedGroups.length);
                                this.searchedGroups.push(candidateArray);
                                addressListContainer = domConstruct.create("div", {
                                    "class": "esriCTAddressListContainer esriCTHideAddressList"
                                }, this.divResultContainer);
                                for (i = 0; i < candidates[candidateArray].length; i++) {
                                    this._displayValidLocations(candidates[candidateArray][i], i, candidates[candidateArray], addressListContainer, locatorName);
                                }
                            }
                        }
                    }
                }
            } else {
                this.mapPoint = null;
                this._locatorErrBack();
            }
            //Listen for event when address list is open
            this.onAddressListToggle();
        },

        /**
        * Display valid locations in address list
        * @param {} candidate
        * @param {} index
        * @param {} candidateArray
        * @param {} addressListContainer
        * @memberOf widgets/locator/locator
        */
        _displayValidLocations: function (candidate, index, candidateArray, addressListContainer, locatorName) {
            var candidateAddress, divAddressRow;
            divAddressRow = domConstruct.create("div", {
                "class": "esriCTCandidateList"
            }, addressListContainer);
            candidateAddress = domConstruct.create("div", {
                "class": "esriCTCandidateField esriCTContentBottomBorder esriCTPointerCursor"
            }, divAddressRow);
            domAttr.set(candidateAddress, "index", index);
            try {
                // show address value in the list
                if (candidate.name) {
                    domAttr.set(candidateAddress, "innerHTML", candidate.name);
                    // show latitude longitude value in the list
                } else if (candidate.LatLong) {
                    domAttr.set(candidateAddress, "innerHTML", candidate.LatLong.coords);
                    // show USNG and MGRS value in the list
                } else if (candidate.value) {
                    domAttr.set(candidateAddress, "innerHTML", candidate.value);
                }
                if (candidate.attributes && candidate.attributes.location) {
                    domAttr.set(candidateAddress, "x", candidate.attributes.location.x);
                    domAttr.set(candidateAddress, "y", candidate.attributes.location.y);
                }
            } catch (err) {
                this.appUtils.showError(err);
            }
            // handle click event when user clicks on a candidate address
            this.handleAddressClick(candidate, candidateAddress, candidateArray);
            //If enter button is clicked and valid result is fetched from default geocoder
            //show it on the map
            if (this.isEnterClicked && index === 0 && this.activeLocator === locatorName) {
                candidateAddress.click();
                if (!this.isGeoformLocator) {
                    this._hideText(true);
                }
                this.isEnterClicked = false;
            }
        },

        /**
        * Expand/ collapse the address list when user clicks on the address header
        * @param {} addressList
        * @param {} idx
        * @memberOf widgets/locator/locator
        */
        _toggleAddressList: function (addressList, idx) {
            on(addressList, "click", lang.hitch(this, function (evt) {
                var addressListContainer, listStatusSymbol;
                addressListContainer = query(".esriCTAddressListContainer", this.divResultContainer)[idx];
                if (domClass.contains(addressListContainer, "esriCTShowAddressList")) {
                    domClass.toggle(addressListContainer, "esriCTShowAddressList");
                    listStatusSymbol = (domAttr.get(query(".esriCTPlusMinus", evt.currentTarget)[0], "innerHTML") === "+") ? "-" : "+";
                    domAttr.set(query(".esriCTPlusMinus", evt.currentTarget)[0], "innerHTML", listStatusSymbol);
                    return;
                }
                domClass.add(addressListContainer, "esriCTShowAddressList");
                domAttr.set(query(".esriCTPlusMinus", evt.currentTarget)[0], "innerHTML", "-");
            }));
        },

        /**
        * display error message if locator service fails or does not return any results
        * @memberOf widgets/locator/locator
        */
        _locatorErrBack: function () {
            domConstruct.empty(this.divResultContainer);
            domClass.remove(this.divResultContainer, "esriCTHidden");
            this._toggleTexBoxControls(false);
            domConstruct.create("div", {
                "class": "esriCTDivNoResultFound",
                "innerHTML": this.config.i18n.locator.invalidSearch
            }, this.divResultContainer);
        },

        /**
        * Convert USNG to lat long
        * @memberOf widgets/locator/locator
        */
        _convertUSNG: function () {
            try {
                var value, converted = [];
                value = this.txtSearch.value;
                converted = [];
                // execute function available in usng.js file, which converts USNG and MGRS values to lat long value
                usng.USNGtoLL(value, converted);
                // if value is valid, store it in an object
                if (converted.length === 2) {
                    this.usngValue = {};
                    if (Number(converted[0]) && Number(converted[1])) {
                        this.usngValue = {
                            value: value,
                            coords: converted.join(",")
                        };
                    }
                }
                return;
            } catch (e) {
                return;
            }
        },

        /**
        * Convert MGRS to lat long
        * @memberOf widgets/locator/locator
        */
        _convertMGRS: function () {
            try {
                var value, converted = [];
                value = this.txtSearch.value;
                converted = [];
                // execute function available in usng.js file, which converts USNG and MGRS values to lat long value
                usng.USNGtoLL(value, converted);
                // if value is valid, store it in an object
                if (converted.length === 2) {
                    this.mgrsValue = {};
                    if (Number(converted[0]) && Number(converted[1])) {
                        this.mgrsValue = {
                            value: value,
                            coords: converted.join(",")
                        };
                    }
                }
                return;
            } catch (e) {
                return;
            }
        },

        /**
        * fetch latitude and longitude value from textbox and format it
        * @memberOf widgets/locator/locator
        */
        _getLatLongValue: function () {
            var splitValue, formattedValue;
            // split the lat long value with space
            splitValue = this.txtSearch.value.split(" ");
            // check if value received after splitting is of length 2 (latitude and longitude)
            if (splitValue.length === 2) {
                // loop through the results to substitute N,E,W,S with + and - accordingly
                array.forEach(splitValue, lang.hitch(this, function (value, index) {
                    formattedValue = value.replace("W", "-");
                    formattedValue = formattedValue.replace("S", "-");
                    formattedValue = formattedValue.replace("N", "");
                    formattedValue = formattedValue.replace("E", "");
                    splitValue[index] = formattedValue;
                }));
                // if value is valid, store it in an object
                if (splitValue[0] >= -90 && splitValue[0] <= 90 && splitValue[1] >= -180 && splitValue[1] <= 180) {
                    this.latLongValue = {
                        value: splitValue,
                        coords: this.txtSearch.value
                    };
                }
            }
        },

        /**
        * handle event when user clicks on search button of textbox
        * @param {} candidate
        * @param {} candidateAddress
        * @param {} candidateArray
        * @memberOf widgets/locator/locator
        */
        handleAddressClick: function (candidate, candidateAddress, candidateArray) {
            on(candidateAddress, "click", lang.hitch(this, function (evt) {
                var candidateSplitValue, mapPoint;
                domAttr.set(this.txtSearch, "defaultAddress", evt.currentTarget.innerHTML);
                this.txtSearch.value = domAttr.get(this.txtSearch, "defaultAddress");
                // selected candidate is address
                if (candidate.attributes && candidate.attributes.location) {
                    mapPoint = new Point(parseFloat(domAttr.get(evt.currentTarget, "x")), parseFloat(domAttr.get(evt.currentTarget, "y")), this.map.spatialReference);
                    this.candidateGeometry = mapPoint;
                    // selected candidate is latitude and longitude value
                } else if (candidate.name) {
                    if (candidate.geometry) {
                        this.candidateGeometry = candidate.geometry;
                    }
                } else if (candidate.LatLong) {
                    this._projectOnMap(candidate.LatLong.value[0], candidate.LatLong.value[1]);
                    // selected candidate is USNG or MGRS
                } else if (candidate.value) {
                    candidateSplitValue = candidate.coords.split(",");
                    this._projectOnMap(candidateSplitValue[0], candidateSplitValue[1]);
                }
                if (this.handleFeatureSearch) {
                    if (candidate.name && candidate.geometry) {
                        this.onFeatureSearchCompleted(candidate);
                    } else {
                        this.onLocationCompleted(this.candidateGeometry);
                    }
                } else {
                    if (candidate.name && candidate.geometry) {
                        this.onFeatureSearchCompleted(candidate);
                    } else {
                        this.onLocationCompleted(this.candidateGeometry);
                    }
                }
                if (this.isGeoformLocator) {
                    this._hideText(true);
                }
            }));
        },

        /**
        * Validate x and y coordinate values, if valid project it on map
        * @param {} x
        * @param {} y
        * @memberOf widgets/locator/locator
        */
        _projectOnMap: function (x, y) {
            if (x >= -90 && x <= 90 && y >= -180 && y <= 180) {
                var mapLocation = new Point(y, x);
                // convert point
                this._projectPoint(mapLocation).then(lang.hitch(this, function (pt) {
                    if (pt) {
                        this.candidateGeometry = pt;
                    }
                }), function (error) {
                    this.appUtils.showError(error.message);
                });
            }
        },

        /**
        * Return the selected address's geometry
        * @param {} geometry
        * @memberOf widgets/locator/locator
        */
        onLocationCompleted: function (geometry) {
            return geometry;
        },

        /**
        * Return the selected address's geometry
        * @param {} geometry
        * @memberOf widgets/locator/locator
        */
        onFeatureSearchCompleted: function (feature) {
            return feature;
        },


        /**
        * Fires when address list is populated
        * @param {} event
        * @memberOf widgets/locator/locator
        */
        onAddressListToggle: function (evt) {
            return evt;
        },

        /**
        * plot x,y point on map in mercator
        * @param {} x
        * @param {} y
        * @memberOf widgets/locator/locator
        */
        _projectPoint: function (geometry) {
            var def, sr, pt, params;
            // this function takes a lat/long (4326) point and converts it to map's spatial reference.
            def = new Deferred();
            // maps spatial ref
            sr = this.map.spatialReference;
            // map and point are both lat/long
            if (sr.wkid === 4326) {
                def.resolve(geometry);
                // map is mercator
            } else if (sr.isWebMercator()) {
                // convert lat long to mercator. No network request.
                pt = webMercatorUtils.geographicToWebMercator(geometry);
                def.resolve(pt);
                // map is something else & has geometry service
            } else if (esriConfig.defaults.geometryService) {
                // project params
                params = new ProjectParameters();
                params.geometries = [geometry];
                params.outSR = this.map.spatialReference;
                // use geometry service to convert lat long to map format (network request)
                esriConfig.defaults.geometryService.project(params).then(function (projectedPoints) {
                    if (projectedPoints && projectedPoints.length) {
                        def.resolve(projectedPoints[0]);
                    } else {
                        def.reject();
                    }
                }, function (error) {
                    def.reject(error);
                });
            } else { // cant do anything, leave lat/long
                def.resolve(geometry);
            }
            return def;
        },

        /**
        * Show/hide close and search loader image
        * @param {} isShow
        * @memberOf widgets/locator/locator
        */
        _toggleTexBoxControls: function (showLoader) {
            if (showLoader) {
                domStyle.set(this.imgSearchLoader, "display", "block");
                domStyle.set(this.close, "display", "none");
            } else {
                if (!this.isPerformingSearch) {
                    domStyle.set(this.imgSearchLoader, "display", "none");
                    domStyle.set(this.close, "display", "block");
                }
            }
        },

        /**
        * Hide text present in textbox, also hide search results container
        * @memberOf widgets/locator/locator
        */
        _hideText: function (isAddressRequired) {
            if (!isAddressRequired) {
                this.txtSearch.value = "";
                this.lastSearchString = lang.trim(this.txtSearch.value);
            }
            domConstruct.empty(this.divResultContainer);
            domClass.add(this.divResultContainer, "esriCTHidden");
            domAttr.set(this.txtSearch, "defaultAddress", this.txtSearch.value);
        }

    });
});