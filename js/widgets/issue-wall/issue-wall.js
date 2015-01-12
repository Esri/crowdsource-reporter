/*global define,dojo,dojoConfig,alert,moment */
/*jslint browser:true,sloppy:true,nomen:true,unparam:true,plusplus:true,indent:4 */
/** @license
| Copyright 2013 Esri
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
//============================================================================================================================//
define([
    "dojo/_base/declare",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/string",
    "dojo/query",
    "dojo/text!./templates/issue-wall.html",
    "dojo/text!./templates/issue-item-template.html",
    "dojo/text!./templates/issue-details-template.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "esri/Color",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/tasks/query"

], function (declare, dom, domConstruct, domStyle, domAttr, domClass, lang, on, string, query, template, issueItemTemplate, issueDetailsTemplate, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Color, Graphic, Point, Polyline, Polygon, FeatureLayer, GraphicsLayer, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Query) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        extentChangeHandler: null,
        /**
        * This function is called when widget is constructed.
        * @param{object} config to be mixed
        * @memberOf widgets/issue-wall/issue-wall
        */
        constructor: function (config) {
            lang.mixin({}, this, config);
        },

        /**
        * Initialize widget
        * @memberOf widgets/issue-wall/issue-wall
        */
        postCreate: function () {
            if (this.map) {
                this.CreateIssueList();
            }
        },

        /**
        * Create Issue Wall
        * @param{object} config to be mixed
        * @memberOf widgets/issue-wall/issue-wall
        */
        CreateIssueList: function (config) {
            var operationalLayer, extentChangeFlag = false;
            if (config) {
                lang.mixin(this, config);
            }
            operationalLayer = this.map.getLayer(this.operationalLayerId);
            this.selectedGraphicsLayer = this.map.getLayer("selectionGraphicsLayer");
            this._loadFeatureLayer(operationalLayer, extentChangeFlag);
            if (this.extentChangeHandler) {
                this.extentChangeHandler.remove();
            }
            this.extentChangeHandler = this.map.on("extent-change", lang.hitch(this, function () {
                extentChangeFlag = true;
                this._loadFeatureLayer(operationalLayer, extentChangeFlag);
            }));
            //on window resize update the height of issue details based on screen size and headers and footers.
            // As in case of long header title, header height need to be adjusted.
            on(window, "resize", lang.hitch(this, function () {
                var detailDiv, detailHeaderDiv, detailFooterDiv, detailBodyheight, listDetailsData;
                //check if issue details div is open,then adjust the detailed container height
                if (!domClass.contains(this.listDetailedContainer, "esriCTHidden")) {
                    detailDiv = query(".esriCTListDetails", this.listDetailedContainer);
                    detailHeaderDiv = query(".esriCTIssueHeaderHeight", this.listDetailedContainer);
                    detailFooterDiv = query(".esriCTIssueFooterHeight", this.listDetailedContainer);
                    detailBodyheight = parseInt(detailDiv[0].clientHeight - (detailHeaderDiv[0].clientHeight + detailFooterDiv[0].clientHeight + 17), 10);
                    listDetailsData = query(".esriCTDetailsData")[0];
                    if (listDetailsData) {
                        query(listDetailsData).style("height", detailBodyheight + "px");
                        if ((dojo.isIE < 9) && detailBodyheight < 500) {
                            query(listDetailsData).style("min-height", detailBodyheight + "px");
                            query(listDetailsData).style("max-height", detailBodyheight + "px");
                        }
                    }
                }
            }));
        },

        /**
        * Load feature layer and fetch the graphics from that layer
        * @param{object} operationalLayer
        * @memberOf widgets/issue-wall/issue-wall
        */
        _loadFeatureLayer: function (operationalLayer, extentChangeFlag) {
            var featureLayer;
            domStyle.set(this.listLoadingIndicator, "display", "block");
            featureLayer = new FeatureLayer(operationalLayer.url);
            on(featureLayer, "load", lang.hitch(this, function (evt) {
                setTimeout(lang.hitch(this, function () {
                    this._fetchIssueListData(operationalLayer, extentChangeFlag);
                }), 1000);
            }));
        },

        /**
        * Fetch feature layer graphics and info popup header fields to be displayed in the list
        * @param{object} operationalLayer details
        * @memberOf widgets/issue-wall/issue-wall
        */
        _fetchIssueListData: function (operationalLayer, extentChangeFlag) {
            var k, featureLayer, layerId, lastIndex, relatedTableURL, layer, commentIconFlag = false;
            // if comment field is present in config file and the layer contains related table, fetch the first related table URL
            if (dojo.configData.commentField && operationalLayer.relationships.length > 0) {
                layerId = operationalLayer.relationships[0].relatedTableId;
                lastIndex = operationalLayer.url.lastIndexOf('/');
                layer = operationalLayer.url.substr(0, lastIndex + 1);
                relatedTableURL = layer + layerId;
                featureLayer = new FeatureLayer(relatedTableURL);
                on(featureLayer, "load", lang.hitch(this, function (evt) {
                    // if the related table contains comment field set commentIconFlag to true
                    for (k = 0; k < featureLayer.fields.length; k++) {
                        if (featureLayer.fields[k].name === dojo.configData.commentField) {
                            commentIconFlag = true;
                            break;
                        }
                    }
                    this._fetchIssueDetails(operationalLayer, commentIconFlag, extentChangeFlag);
                }));
            } else {
                this._fetchIssueDetails(operationalLayer, commentIconFlag, extentChangeFlag);
            }
        },

        /**
        * Fetch feature layer graphics and info popup header fields to be displayed in the list
        * @param{object} operationalLayer details
        * @param{object} URL for the comments related table
        * @param{object} key field for the relationship
        * @param{object} flag to determine if comment icon should be displayed or hidden
        * @memberOf widgets/issue-wall/issue-wall
        */
        _fetchIssueDetails: function (operationalLayer, commentIconFlag, extentChangeFlag) {
            var i, j, x, featureArray = [],
                fieldName, likeFlag = false,
                fields, fieldValue, attributes, objectIdFieldName, objectIdFieldValue, flagObject = {};
            for (j = 0; j < operationalLayer.graphics.length; j++) {
                // fetch only the features present in current map extent
                if (this.map.extent.intersects(operationalLayer.graphics[j].geometry)) {
                    for (fields in operationalLayer.graphics[j].attributes) {
                        if (operationalLayer.graphics[j].attributes.hasOwnProperty(fields)) {
                            if (!operationalLayer.graphics[j].attributes[fields]) {
                                operationalLayer.graphics[j].attributes[fields] = dojo.configData.showNullValueAs;
                            }
                        }
                    }
                    // check if edit date field is available in the layer for sorting the issue list
                    if (this.operationalLayerDetails.layerObject && this.operationalLayerDetails.layerObject.editFieldsInfo && this.operationalLayerDetails.layerObject.editFieldsInfo.editDateField) {
                        fieldName = this.operationalLayerDetails.layerObject.editFieldsInfo.editDateField;
                        fieldValue = operationalLayer.graphics[j].attributes[fieldName];
                    }
                    attributes = operationalLayer.graphics[j].attributes;
                    for (x = 0; x < operationalLayer.fields.length; x++) {
                        if (operationalLayer.fields[x].type === "esriFieldTypeDate") {
                            // format editor date field according to the format received from  info popup
                            if (Number(attributes[operationalLayer.fields[x].name])) {
                                for (i = 0; i < this.operationalLayerDetails.popupInfo.fieldInfos.length; i++) {
                                    if (this.operationalLayerDetails.popupInfo.fieldInfos[i].fieldName === operationalLayer.fields[x].name) {
                                        attributes[operationalLayer.fields[x].name] = moment(attributes[operationalLayer.fields[x].name]).format(dojo.applicationUtils.getDateFormat(this.operationalLayerDetails.popupInfo.fieldInfos[i].format.dateFormat));
                                    }
                                }
                            }
                        }
                        // get object id field from the layer
                        if (operationalLayer.fields[x].type === "esriFieldTypeOID") {
                            objectIdFieldName = operationalLayer.fields[x].name;
                            objectIdFieldValue = operationalLayer.graphics[j].attributes[objectIdFieldName];
                        }

                        // if like field is present in the config file and the layer contains like field, set the flag to true
                        if (dojo.configData.likeField && (operationalLayer.fields[x].name === dojo.configData.likeField)) {
                            likeFlag = true;
                        }
                    }
                    if (!fieldName) {
                        // if edit date field is not available in the layer, perform sorting based on object id
                        fieldValue = objectIdFieldValue;
                    }
                    featureArray.push({
                        "attributes": attributes,
                        "sortValue": fieldValue
                    });
                }
            }
            // Sort feature array
            featureArray.sort(this._sortFeatureArray);
            flagObject.like = likeFlag;
            flagObject.comment = commentIconFlag;
            flagObject.extentChange = extentChangeFlag;
            this._displayIssueList(featureArray, operationalLayer, objectIdFieldName, flagObject);

        },

        /**
        * Display list of issues in right panel
        * @param{array} featureSet
        * @param{object} operationalLayer details
        * @param{object} objectId Field
        * @param{object} flagObject for like icon,comments icon, extent change
        * @memberOf widgets/issue-wall/issue-wall
        */
        _displayIssueList: function (featureSet, operationalLayer, objectIdField, flagObject) {
            var i, issueListTemplateString, parentDiv, issueTitleName, statusParamObj = {
                likeStatus: flagObject.like,
                commentStatus: flagObject.comment,
                objField: objectIdField,
                layerField: operationalLayer
            }, setIssueObj;
            // if extent change is not fired, clear list container and refresh issue list
            if (!flagObject.extentChange) {
                domConstruct.empty(this.listDetailedContainer);
                domClass.add(this.listDetailedContainer, "esriCTHidden");
                domClass.remove(this.listContainer, "esriCTHidden");
                flagObject.extentChange = false;
            }
            domConstruct.empty(this.listContainer);
            domAttr.set(this.listContainerTitle, "innerHTML", this.operationalLayerDetails.title);
            // check if details exist in info popup
            if (this.operationalLayerDetails.popupInfo && featureSet.length > 0) {
                // loop through the features to get feature details
                for (i = 0; i < featureSet.length; i++) {
                    // get header title of each issue details
                    issueTitleName = this._getIssueDetailsTitle(featureSet[i].attributes);
                    issueListTemplateString = string.substitute(issueItemTemplate, {
                        IssueTitle: issueTitleName
                    });
                    // Checking if IE Version is less than 9
                    if (dojo.isIE < 9) {
                        parentDiv = domConstruct.toDom(issueListTemplateString);
                    } else {
                        parentDiv = domConstruct.toDom(issueListTemplateString).childNodes[0];
                    }
                    setIssueObj = query('.esriCTDownArrowIcon', parentDiv)[0];
                    // if down arrow found for issue detail
                    if (setIssueObj) {
                        domAttr.set(setIssueObj, "objId", featureSet[i].attributes[objectIdField]);
                    }
                    this.listContainer.appendChild(parentDiv);
                    this._showHideLikeIcon(statusParamObj, featureSet[i].attributes, parentDiv);
                    this._showHideCommentIcon(featureSet[i].attributes, objectIdField, parentDiv, statusParamObj.commentStatus);
                    this._locateIssueOnMap(featureSet[i].attributes, objectIdField, parentDiv, operationalLayer);
                    // show issue details on down arrow click
                    this._handleDownArrowClick(parentDiv, featureSet[i].attributes, statusParamObj, issueTitleName);
                }
                // show issue details on click of feature on map
                this._showFeatureIssueDetails(parentDiv, statusParamObj);
            } else {
                domConstruct.create("div", {
                    "innerHTML": dojo.configData.i18n.issueWall.noResultsFound,
                    "class": "esriCTNoIssuesDiv"
                }, this.listContainer);
            }
            domStyle.set(this.listLoadingIndicator, "display", "none");
        },

        /*
        * Sets the info popup header for each issue
        * @param{array} featureSet
        * @memberOf widgets/issue-wall/issue-wall
        */
        _getIssueDetailsTitle: function (featureSet) {
            var titleField, i, j, popupTitle, headerValue, headerFieldArray, panelHeaderValue, issueDetailsTitleName;
            // split info popup header fields
            popupTitle = this.operationalLayerDetails.popupInfo.title.split("{");

            headerFieldArray = [];
            // if header contains more than 1 fields
            if (popupTitle.length > 1) {
                // get strings from header
                titleField = lang.trim(popupTitle[0]) + " ";

                for (i = 1; i < popupTitle.length; i++) {
                    if (i === 1) {
                        // concatenate string and first field from the header and insert in an array
                        headerFieldArray.push(titleField + string.substitute("${" + lang.trim(popupTitle[i]), featureSet));
                    } else {
                        // insert remaining fields in an array
                        headerFieldArray.push(string.substitute("${" + lang.trim(popupTitle[i]), featureSet));
                    }
                }
                headerValue = null;
                // form a string from the headerFieldArray array, to display in header
                for (j = 0; j < headerFieldArray.length; j++) {
                    if (headerValue) {
                        headerValue = headerValue + headerFieldArray[j];
                    } else {
                        headerValue = headerFieldArray[j];
                    }
                }
                issueDetailsTitleName = headerValue;
            } else {
                // if popup title is not empty, display popup field headerValue else display a configurable text
                if (lang.trim(this.operationalLayerDetails.popupInfo.title) !== "") {
                    headerValue = lang.trim(this.operationalLayerDetails.popupInfo.title);
                    panelHeaderValue = string.substitute(headerValue, featureSet);
                } else {
                    panelHeaderValue = dojo.configData.showNullValueAs;
                }
                issueDetailsTitleName = panelHeaderValue;
            }
            return issueDetailsTitleName;
        },

        /**
        * click event for Display selected issue details of right panel
        * @param{array} featureSet
        * @param{object} statusParamObj
        * @param{string} issueTitleName,parentDiv
        * @memberOf widgets/issue-wall/issue-wall
        */
        _handleDownArrowClick: function (parentDiv, featureSet, statusParamObj, issueTitleName) {
            var downArrowIcon, getIssueObj;
            // click event for opening the issue detailed view
            downArrowIcon = query('.esriCTDownArrowIcon', parentDiv)[0];
            // binding event only if the queried node found
            if (downArrowIcon) {
                on(downArrowIcon, "click", lang.hitch(this, function (evt) {
                    getIssueObj = domAttr.get(downArrowIcon, "objId");
                    // if issue object id found
                    if (getIssueObj) {
                        this._getIssueFeatureSet(parentDiv, getIssueObj, statusParamObj);
                    }
                }));
            }
        },

        /**
        * Get feature from layer and Display selected issue details of right panel
        * @param{object} statusParamObj
        * @param{string} parentDiv, getIssueObj
        * @memberOf widgets/issue-wall/issue-wall
        */
        _getIssueFeatureSet: function (parentDiv, getIssueObj, statusParamObj) {
            var issueTitleName, featureLayerQuery;
            featureLayerQuery = new Query();
            featureLayerQuery.outSpatialReference = this.map.spatialReference;
            featureLayerQuery.objectIds = [getIssueObj];
            statusParamObj.layerField.queryFeatures(featureLayerQuery, lang.hitch(this, function (attr) {
                var keyfield;
                // loop for Assigning null ('') for null valued features attributes
                for (keyfield in attr.features[0].attributes) {
                    // Check if features attributes value is null
                    if (attr.features[0].attributes.hasOwnProperty(keyfield)) {
                        if (!attr.features[0].attributes[keyfield]) {
                            attr.features[0].attributes[keyfield] = dojo.configData.showNullValueAs;
                        }
                    }
                }
                this._highLightFeatureOnClick(statusParamObj.layerField, getIssueObj);
                issueTitleName = this._getIssueDetailsTitle(attr.features[0].attributes);
                this._showIssueDetails(parentDiv, attr.features[0].attributes, statusParamObj, issueTitleName);
            }), function (err) {
                dojo.applicationUtils.showError(err.message);
            });
        },
        /**
        * Display selected issue details of right panel
        * @param{array} featureSet
        * @param{object} statusParamObj
        * @param{string} titleName,parentDiv
        * @memberOf widgets/issue-wall/issue-wall
        */
        _showIssueDetails: function (parentDiv, featureSet, statusParamObj, issueTitleName) {
            var issueDetailsTemplateString, container, detailsData, x, j, fieldHeader, fieldContent, fieldValue, objectID, upArrowIcon, popupInfoValue, key,
                detailDivheight, detailHeaderDiv, detailFooterDiv, detailBodyheight, listDetailsData, fieldLabel;
            domClass.add(this.listContainer, "esriCTHidden");
            domClass.remove(this.listDetailedContainer, "esriCTHidden");
            issueDetailsTemplateString = string.substitute(issueDetailsTemplate, {
                IssueTitle: issueTitleName
            });
            domConstruct.empty(this.listDetailedContainer);
            domClass.remove(this.listDetailedContainer, "esriCTHidden");
            // Checking if IE Version is less than 9
            if (dojo.isIE < 9) {
                parentDiv = domConstruct.toDom(issueDetailsTemplateString);
            } else {
                parentDiv = domConstruct.toDom(issueDetailsTemplateString).childNodes[0];
            }
            this.listDetailedContainer.appendChild(parentDiv);
            // click event for closing the issue detail
            upArrowIcon = query('.esriCTUpArrowIcon', parentDiv)[0];
            // binding event if only the queried node found
            if (upArrowIcon) {
                on(upArrowIcon, "click", lang.hitch(this, function (evt) {
                    domConstruct.empty(this.listDetailedContainer);
                    domClass.add(this.listDetailedContainer, "esriCTHidden");
                    domClass.remove(this.listContainer, "esriCTHidden");
                }));
            }

            // issueDetails values start
            detailsData = query('.esriCTDetailsData', parentDiv)[0];
            if (this.operationalLayerDetails.popupInfo && this.operationalLayerDetails.popupInfo.fieldInfos && this.operationalLayerDetails.popupInfo.fieldInfos.length > 0) {
                // loop for field data in info popup
                for (x = 0; x < this.operationalLayerDetails.popupInfo.fieldInfos.length; x++) {
                    if (this.operationalLayerDetails.popupInfo.fieldInfos[x].visible) {
                        container = domConstruct.create("div", {
                            "class": "esriCTDetailsContainer"
                        }, detailsData);
                        fieldHeader = domConstruct.create("div", {
                            "class": "esriCTListItemHeader"
                        }, container);
                        fieldLabel = this.operationalLayerDetails.popupInfo.fieldInfos[x].label;
                        if (lang.trim(fieldLabel) === "") {
                            fieldLabel = this.operationalLayerDetails.popupInfo.fieldInfos[x].fieldName;
                        }
                        domAttr.set(fieldHeader, "innerHTML", fieldLabel);
                        fieldContent = domConstruct.create("div", {
                            "class": "esriCTListData"
                        }, container);
                        popupInfoValue = this.operationalLayerDetails.popupInfo.fieldInfos[x];
                        // loop for Assigning N/A for null valued features attributes
                        for (key in featureSet) {
                            // Check if features attributes value is null
                            if (featureSet.hasOwnProperty(key)) {
                                if (!featureSet[key]) {
                                    featureSet[key] = dojo.configData.showNullValueAs;
                                }
                            }
                        }
                        if (featureSet[popupInfoValue.fieldName]) {
                            fieldValue = string.substitute("${" + popupInfoValue.fieldName + "}", featureSet);
                        }
                        // Check if field value is null
                        if (fieldValue && fieldValue !== dojo.configData.showNullValueAs && (popupInfoValue.format)) {
                            // Check whether format for digit separator is required
                            fieldValue = this._numberFormatCorverter(popupInfoValue, fieldValue);
                        }
                        // Loop for domain codedValues
                        for (j = 0; j < this.operationalLayerDetails.layerObject.fields.length; j++) {
                            // Check if layer fieldname and info popup field name are equal
                            fieldValue = this._domainCodedValues(this.operationalLayerDetails.layerObject.fields[j], popupInfoValue, fieldValue);
                        }
                        if (!fieldValue || lang.trim(fieldValue + "") === "") {
                            fieldValue = "<br/>";
                        }
                        domAttr.set(fieldContent, "innerHTML", fieldValue);
                    }
                }
            } else {
                domConstruct.create("div", {
                    "innerHTML": dojo.configData.i18n.issueWall.noResultsFound,
                    "class": "esriCTNoIssuesDiv"
                }, detailsData);
            }
            // Get object id for the feature
            objectID = featureSet[statusParamObj.objField];
            // Check if attachments found and show attachment flag is true
            if (statusParamObj.layerField.hasAttachments && this.operationalLayerDetails.popupInfo.showAttachments) {
                this._showAttachments(statusParamObj.layerField, parentDiv, objectID);
            }

            detailDivheight = query(".esriCTListDetails", this.listDetailedContainer);
            detailHeaderDiv = query(".esriCTIssueHeaderHeight", this.listDetailedContainer);
            detailFooterDiv = query(".esriCTIssueFooterHeight", this.listDetailedContainer);
            detailBodyheight = parseInt(detailDivheight[0].clientHeight - (detailHeaderDiv[0].clientHeight + detailFooterDiv[0].clientHeight + 17), 10);
            listDetailsData = query(".esriCTDetailsData")[0];
            if (listDetailsData) {
                query(listDetailsData).style("height", detailBodyheight + "px");
                if ((dojo.isIE < 9) && detailBodyheight < 500) {
                    query(listDetailsData).style("min-height", detailBodyheight + "px");
                    query(listDetailsData).style("max-height", detailBodyheight + "px");
                }
            }
            this._showHideLikeIcon(statusParamObj, featureSet, parentDiv);
            this._showHideCommentIcon(featureSet, statusParamObj.objField, parentDiv, statusParamObj.commentStatus);
            this._locateIssueOnMap(featureSet, statusParamObj.objField, parentDiv, statusParamObj.layerField);
        },

        /**
        * Format number value based on the format received from info popup
        * @param{object} popupInfoValue
        * @param{string} fieldValue
        * @memberOf widgets/issue-wall/issue-wall
        */
        _numberFormatCorverter: function (popupInfoValue, fieldValue) {
            if ((popupInfoValue.format) && (popupInfoValue.format.digitSeparator) && (popupInfoValue.format.places)) {
                // Check if digit separator is available
                if (popupInfoValue.format.digitSeparator) {
                    fieldValue = parseFloat(fieldValue).toFixed(popupInfoValue.format.places);
                    fieldValue = dojo.applicationUtils.convertNumberToThousandSeperator(fieldValue);
                } else {
                    fieldValue = fieldValue.toFixed(popupInfoValue.format.places);
                }
            }
            return fieldValue;
        },

        /**
        * @param{object} popupInfoValue, operationalLayerDetails
        * @param{string} fieldValue
        * @memberOf widgets/issue-wall/issue-wall
        */
        _domainCodedValues: function (operationalLayerDetails, popupInfoValue, fieldValue) {
            var k, codedValues;
            if (operationalLayerDetails.name === popupInfoValue.fieldName) {
                // Check if domain value is available
                if (operationalLayerDetails.domain && operationalLayerDetails.domain.codedValues) {
                    codedValues = operationalLayerDetails.domain.codedValues;
                    // Loop for codedValue
                    for (k = 0; k < codedValues.length; k++) {
                        // Check if the value is string or number
                        if (isNaN(codedValues[k].code)) {
                            // Check if the fieldValue and codedValue is equal
                            if (codedValues[k].code === fieldValue) {
                                fieldValue = codedValues[k].name;
                            }
                        } else {
                            if (codedValues[k].code === parseInt(fieldValue, 10)) {
                                fieldValue = codedValues[k].name;
                            }
                        }
                    }
                }
            }
            return fieldValue;
        },

        /**
        * Show attached images in the issue details
        * @param{array} operationalLayer
        * @param{string} objectID, parentDiv
        * @memberOf widgets/issue-wall/issue-wall
        */
        _showAttachments: function (operationalLayer, parentDiv, objectID) {
            var container, detailsData, fieldContent, i, imageContent, imagePath, imageDiv = [];
            detailsData = query('.esriCTDetailsData', parentDiv)[0];
            // Query attachments in layer
            operationalLayer.queryAttachmentInfos(objectID, lang.hitch(this, function (infos) {
                // If attachments found
                if (infos && infos.length > 0) {
                    container = domConstruct.create("div", {
                        "class": "esriCTDetailsContainer"
                    }, detailsData);
                    domConstruct.create("div", {
                        "innerHTML": dojo.configData.i18n.issueWall.photoAttachmentHeader,
                        "class": "esriCTListItemHeader"
                    }, container);
                    fieldContent = domConstruct.create("div", {
                        "class": "container esriCTListData row"
                    }, container);
                    // Display all attached images in thumbnails
                    for (i = 0; i < infos.length; i++) {
                        imagePath = dojoConfig.baseURL + dojo.configData.noImageIcon;
                        if (infos[i].contentType.indexOf("image") > -1) {
                            imagePath = infos[i].url;
                        }
                        imageContent = domConstruct.create("span", {
                            "class": "esriCTIssueImgSpan col"
                        }, fieldContent);
                        domClass.add(imageContent, "esriCTImageLoader");
                        imageDiv[i] = domConstruct.create("img", {
                            "alt": infos[i].url,
                            "class": "esriCTIssueDetailImg esriCTPointerCursor",
                            "src": imagePath
                        }, imageContent);
                        // Hide loader Image after image loaded
                        on(imageDiv[i], "load", lang.hitch(this, this._onImageLoad));
                        // Show image in new tab on click of the image thumbnail
                        on(imageDiv[i], "click", lang.hitch(this, this._showAttachements));
                    }

                }
            }), function (err) {
                dojo.applicationUtils.showError(err.message);
            });
        },

        /**
        * Show attachments in new window when user clicks on the attachment thumbnail
        * @param{object} evt
        * @memberOf widgets/issue-wall/issue-wall
        */
        _showAttachements: function (evt) {
            window.open(evt.target.alt);
        },

        /**
        * Callback handler for image loaded event.
        * hide the image loader once the image is loaded, and set the image dimensions so that complete image will be shown in thumbnail.
        * @param{object} evt
        * @memberOf widgets/issue-wall/issue-wall
        */
        _onImageLoad: function (evt) {
            domClass.remove(evt.target.parentNode, "esriCTImageLoader");
            this._setImageDimensions(evt.target, true);
        },

        /**
        * Set the images dimensions so that the complete image will be shown in thumbnail
        * @param{object} imgModule - Image object
        * @param{Boolean} isOnLoad - set this flag this function is called after image load.
        * @memberOf widgets/issue-wall/issue-wall
        */
        _setImageDimensions: function (imgModule, isOnLoad) {
            var aspectRatio, newWidth, newHeight, imgWidth, imgContainer = imgModule.parentElement;
            if (isOnLoad && imgModule && imgModule.offsetHeight > 0) {
                //set original dimensions of image as it max dimensions.
                domAttr.set(imgModule, "originalWidth", imgModule.offsetWidth);
                domStyle.set(imgModule, "maxHeight", imgModule.offsetHeight + 'px');
                domStyle.set(imgModule, "maxWidth", imgModule.offsetWidth + 'px');
            }
            imgWidth = parseFloat(domAttr.get(imgModule, "originalWidth"));
            if ((imgContainer.offsetWidth > 0) && (imgContainer.offsetWidth < imgModule.offsetWidth || imgWidth > imgContainer.offsetWidth)) {
                //change dimensions of image if it is larger/smaller than its parent container.
                //calculate aspect ratio of image.
                aspectRatio = imgModule.offsetWidth / imgModule.offsetHeight;
                //calculate new dimensions according to aspect ratio of image.
                newWidth = imgContainer.offsetWidth - 2;
                newHeight = Math.floor(newWidth / aspectRatio);
                domClass.remove(imgModule, "esriAutoWidth");
                //set new dimensions to image.
                domStyle.set(imgModule, "width", newWidth + 'px');
                domStyle.set(imgModule, "height", newHeight + 'px');
            }
        },


        /**
        * Show issue details on click of feature on map
        * @param{string} parentDiv
        * @param{object} statusParamObj
        * @memberOf widgets/issue-wall/issue-wall
        */
        _showFeatureIssueDetails: function (parentDiv, statusParamObj) {
            var featureObjId;
            if (statusParamObj.layerField) {
                on(statusParamObj.layerField, "click", lang.hitch(this, function (evt) {
                    //var featureAttributeSet = evt.graphic.attributes;
                    featureObjId = evt.graphic.attributes[statusParamObj.objField];
                    this._highLightFeatureOnClick(statusParamObj.layerField, featureObjId);
                    if (query('.esriCTListDetails')[0]) {
                        domConstruct.destroy(query('.esriCTListDetails')[0]);
                    }
                    // if the layer has object id and query success for feature
                    if (featureObjId) {
                        this._getIssueFeatureSet(parentDiv, featureObjId, statusParamObj);
                    }
                }));
            }
        },

        /**
        * Update votes for issue when user clicks on the like button
        * @param{object} statusParamObj
        * @param{array} featureSet
        * @param{string} parentDiv
        */
        _issueVotesClick: function (statusParamObj, featureSet, parentDiv) {
            var likeIcon, likeCount, count, graphic, attr = {}, getObjVal, i, likeIconDiv;
            likeIcon = query('.esriCTLikeIcon', parentDiv)[0];
            // Like is enabled on popup or not
            if (likeIcon) {
                // on click of like icon
                on(likeIcon, "click", lang.hitch(this, function (evt) {
                    var featureLayerQuery = new Query();
                    featureLayerQuery.outSpatialReference = this.map.spatialReference;
                    featureLayerQuery.objectIds = [parseInt(featureSet[statusParamObj.objField], 10)];
                    featureLayerQuery.returnGeometry = true;
                    statusParamObj.layerField.queryFeatures(featureLayerQuery, lang.hitch(this, function (featureSet) {
                        // if number of votes is zero or not available then initialize the counter
                        count = (featureSet.features[0].attributes[dojo.configData.likeField] === dojo.configData.showNullValueAs) ? 0 : featureSet.features[0].attributes[dojo.configData.likeField];
                        attr[dojo.configData.likeField] = count + 1;
                        attr[statusParamObj.objField] = featureSet.features[0].attributes[statusParamObj.objField];
                        likeCount = attr[dojo.configData.likeField];
                        graphic = new Graphic(featureSet.features[0].geometry, null, attr, null);
                        statusParamObj.layerField.applyEdits(null, [graphic], null, lang.hitch(this, function (adds, updates, deletes) {
                            // if number of votes is updated on layer
                            if (updates[0].success) {
                                domAttr.set(query(".esriCTLikeCount", parentDiv)[0], "innerHTML", likeCount);
                                // Check issue list container
                                if (this.listContainer.children.length) {
                                    // loop for updating issue list votes count
                                    for (i = 0; i < this.listContainer.children.length; i++) {
                                        likeIconDiv = query('.esriCTLikeIcon', this.listContainer.children[i])[0];
                                        if (likeIconDiv) {
                                            getObjVal = domAttr.get(likeIconDiv, "objId");
                                            getObjVal = parseInt(getObjVal, 10);
                                            // if object id of the issue details and issue list is same, update the vote count field
                                            if (getObjVal === attr[statusParamObj.objField]) {
                                                domAttr.set(query(".esriCTLikeCount", this.listContainer.children[i])[0], "innerHTML", likeCount);
                                                break;
                                            }
                                        }
                                    }
                                }
                                statusParamObj.layerField.refresh();
                            } else {
                                dojo.applicationUtils.showError(dojo.configData.i18n.issueWall.votesUpdateFailure);
                            }
                        }), function (err) {
                            dojo.applicationUtils.showError(dojo.configData.i18n.issueWall.votesUpdateFailure);
                        });
                    }), function (err) {
                        dojo.applicationUtils.showError(err.message);
                    });
                }));
            }
        },

        /**
        * Show or hide like icon
        * @param{object} likeFlag
        * @param{array} attributes
        * @param{object} object id field from the layer
        * @param{object} parentDiv, container in which the icon would be inserted
        * @memberOf widgets/issue-wall/issue-wall
        */
        _showHideLikeIcon: function (statusParamObj, attributes, parentDiv) {
            var likeIcon, likeCount, likeIconContent;
            // if like field is present in the layer, show like icon else hide the icon
            if (statusParamObj.likeStatus) {
                likeIcon = query('.esriCTLikeIcon', parentDiv)[0];
                domAttr.set(likeIcon, "objId", attributes[statusParamObj.objField]);
                likeCount = attributes[dojo.configData.likeField];
                // if like count is not 0, display like count, else don't display anything for like count
                if (likeCount !== dojo.configData.showNullValueAs) {
                    domAttr.set(query(".esriCTLikeCount", parentDiv)[0], "innerHTML", likeCount);
                }
                this._issueVotesClick(statusParamObj, attributes, parentDiv);
            } else {
                // hide like icon
                likeIconContent = query('.esriCTLikeIcon', parentDiv)[0].parentElement;
                domStyle.set(likeIconContent, "visibility", "hidden");
            }
        },

        /**
        * Show or hide like icon
        * @param{object} commentIconFlag
        * @param{array} attributes
        * @param{object} object id field from the layer
        * @param{object} parentDiv, container in which the icon would be inserted
        * @memberOf widgets/issue-wall/issue-wall
        */
        _showHideCommentIcon: function (attributes, objectIdField, parentDiv, commentIconFlag) {
            var commentIcon, commentIconContent;
            // if the layer contains a related table and the related table has a field for comments, show comment icon else hide the icon
            if (commentIconFlag) {
                commentIcon = query('.esriCTCommentsIcon', parentDiv)[0];
                domAttr.set(commentIcon, "objId", attributes[objectIdField]);
            } else {
                // hide comment icon
                commentIconContent = query('.esriCTCommentsIcon', parentDiv)[0].parentElement;
                domStyle.set(commentIconContent, "visibility", "hidden");
            }
        },

        /**
        * Show or hide like icon
        * @param{array} attributes
        * @param{object} object id field from the layer
        * @param{object} parentDiv, container in which the icon would be inserted
        * @param{object} operationalLayer
        * @memberOf widgets/issue-wall/issue-wall
        */
        _locateIssueOnMap: function (attributes, objectIdField, parentDiv, operationalLayer) {
            var locateOnMapIcon, target, objectId;
            locateOnMapIcon = query('.esriCTMapIcon', parentDiv)[0];
            domAttr.set(locateOnMapIcon, "objId", attributes[objectIdField]);
            on(locateOnMapIcon, "click", lang.hitch(this, function (evt) {
                // show map view on click of icon in mobile view
                this.showMapViewOnLocate();
                if (evt.currentTarget) {
                    target = evt.currentTarget;
                } else {
                    target = evt.srcElement;
                }
                objectId = domAttr.get(target, "objId");
                this._highLightFeatureOnClick(operationalLayer, objectId);
            }));
        },

        /**
        * This function is used to highlight feature.
        * @param{object} layer
        * @param{object} objectId
        * @memberOf widgets/issue-wall/issue-wall
        */
        _highLightFeatureOnClick: function (layer, objectId) {
            var esriQuery, highlightSymbol;
            // clear graphics layer
            this.selectedGraphicsLayer.clear();
            esriQuery = new Query();
            esriQuery.objectIds = [parseInt(objectId, 10)];
            esriQuery.returnGeometry = true;
            layer.queryFeatures(esriQuery, lang.hitch(this, function (featureSet) {
                highlightSymbol = this._getHighLightSymbol(featureSet.features[0], layer);
                // add highlight symbol to graphics layer
                this.selectedGraphicsLayer.add(highlightSymbol);
            }), function (err) {
                dojo.applicationUtils.showError(err.message);
            });
        },

        /**
        * Create crosshair symbol to highlight point feature
        * @param{object} symbol path
        * @param{object} symbol size
        * @memberOf widgets/issue-wall/issue-wall
        */
        _createSVGSymbol: function (path, size) {
            var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255]), 4),
                markerSymbol;
            markerSymbol = new SimpleMarkerSymbol();
            markerSymbol.setPath(path);
            markerSymbol.setOutline(sls);
            markerSymbol.setSize(size + 20);
            markerSymbol.setColor(null);
            return markerSymbol;
        },

        /**
        * This function is used to get symbol used for highlighting feature.
        * @param{string} graphic
        * @param{string} layer
        * @memberOf widgets/issue-wall/issue-wall
        */
        _getHighLightSymbol: function (graphic, layer) {
            var i, symbol, path, symbolHeight, symbolWidth, size, symbolSize, polylineSymbol, polygonSymbol;
            switch (graphic.geometry.type) {
            case "point":
                path = "M 1784,238 1805,238 1805,259 1784,259 1784,238 M 1777,248 1784,248 M 1794,231 1794,238 M 1812,248 1805,248 M 1794,266 1794,259";
                if (layer.renderer.symbol) {
                    symbolHeight = layer.renderer.symbol.height;
                    symbolWidth = layer.renderer.symbol.width;
                    size = (symbolHeight > symbolWidth) ? symbolHeight : symbolWidth;
                    symbolSize = size;
                } else if ((layer.renderer.infos) && (layer.renderer.infos.length > 1)) {
                    for (i = 0; i < layer.renderer.infos.length; i++) {
                        if (parseInt(graphic.attributes[layer.typeIdField], 10) === parseInt(layer.renderer.infos[i].value, 10)) {
                            symbolHeight = layer.renderer.infos[i].symbol.height;
                            symbolWidth = layer.renderer.infos[i].symbol.width;
                            // to display cross-hair symbol properly around feature
                            size = (symbolHeight > symbolWidth) ? symbolHeight : symbolWidth;
                            symbolSize = size;
                        }
                    }
                }

                symbol = new Graphic(new Point([graphic.geometry.x, graphic.geometry.y], this.map.spatialReference), this._createSVGSymbol(path, symbolSize));
                return symbol;
            case "polyline":
                polylineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255, 1]), 4);
                symbol = new Graphic(new Polyline(graphic.geometry), polylineSymbol);
                return symbol;
            case "polygon":
                polygonSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255, 1]), 4), null);
                symbol = new Graphic(new Polygon(graphic.geometry), polygonSymbol);
                return symbol;
            }
        },

        /**
        * Sort issue array
        * @param{object} a
        * @param{object} b
        * @memberOf widgets/issue-wall/issue-wall
        */
        _sortFeatureArray: function (a, b) {
            if (a.sortValue > b.sortValue) {
                return -1;
            }
            if (a.sortValue < b.sortValue) {
                return 1;
            }
            return 0;
        },

        /**
        * Show map view when user clicks on go to map icon in mobile view
        * @memberOf widgets/issue-wall/issue-wall
        */
        showMapViewOnLocate: function (evt) {
            return evt;
        },

        /**
        * Destroy instance
        * @memberOf widgets/issue-wall/issue-wall
        */
        destroyInstance: function () {
            this.destroy();
        }

    });
});