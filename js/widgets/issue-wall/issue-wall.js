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
    "esri/tasks/query",
    "widgets/issue-comments/issue-comments"

], function (declare, dom, domConstruct, domStyle, domAttr, domClass, lang, on, string, query, template, issueItemTemplate, issueDetailsTemplate, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Color, Graphic, Point, Polyline, Polygon, FeatureLayer, GraphicsLayer, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Query, IssueComments) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        extentChangeHandler: null,
        _hasCommentsTable: false,
        _commentsTable: null,
        _layerClickHandler: null,

        /**
        * This function is called when widget is constructed.
        * @param{object} config to be mixed
        * @memberOf widgets/issue-wall/issue-wall
        */
        constructor: function (config) {
            lang.mixin({}, this, config);
        },

        /**
        * Will be called on post creation of the widget.
        */
        postCreate: function () {
            if (this.map) {
                this.issueCommentWidget = new IssueComments({ "parentContainer": this.domNode });
                this.initIssueWall();
            }
        },

        /**
        * Initialize Issue wall
        * This method is public, it can be used to reInit the Issue wall.
        * @memberOf widgets/issue-wall/issue-wall
        */
        initIssueWall: function (config) {
            if (config) {
                lang.mixin(this, config);
            }
            //Set the Comments table flag to false
            this._hasCommentsTable = false;
            this._getRelatedTableInfo();
        },

        /**
        * Method will get related table info and check if any relationship exist for comments.
        * If Comments relationship exist as per the configured field then it will get the related table info for further use.
        * Now only  considering for first related table only although the layer has many related table
        * @memberOf widgets/issue-wall/issue-wall
        */
        _getRelatedTableInfo: function () {
            var k, relatedTableURL, operationalLayer;
            operationalLayer = this.map.getLayer(this.operationalLayerId);
            // if comment field is present in config file and the layer contains related table, fetch the first related table URL
            if (dojo.configData.commentField && operationalLayer.relationships.length > 0) {
                //Construct the related table URL form operational layer URL and the related table id
                //We are considering for only first related table only although the layer has many related table.
                //that's why accessing relatedTableId is hard-coded for relationships[0] ie:"operationalLayer.relationships[0].relatedTableId"
                relatedTableURL = operationalLayer.url.substr(0, operationalLayer.url.lastIndexOf('/') + 1) + operationalLayer.relationships[0].relatedTableId;
                this._commentsTable = new FeatureLayer(relatedTableURL);
                on(this._commentsTable, "load", lang.hitch(this, function (evt) {
                    // if the related table contains comment field set commentIconFlag to true
                    for (k = 0; k < this._commentsTable.fields.length; k++) {
                        if (this._commentsTable.fields[k].name === dojo.configData.commentField) {
                            this._hasCommentsTable = true;
                            break;
                        }
                    }
                    if (!this._hasCommentsTable) {
                        this._commentsTable = null;
                    }
                    this._createIssueList();
                }));
            } else {
                this._createIssueList();
            }
        },

        /**
        * Create Issue Wall
        * @memberOf widgets/issue-wall/issue-wall
        */
        _createIssueList: function () {
            var operationalLayer, extentChangeFlag = false;
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
            on(window, "resize", lang.hitch(this, this.resizeIssueWallContainer));
        },

        /*
        * Resizes the container according to screen height
        */
        resizeIssueWallContainer: function () {
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
        },

        /**
        * Load feature layer and fetch the graphics from that layer
        * @param{object} operationalLayer
        * @memberOf widgets/issue-wall/issue-wall
        */
        _loadFeatureLayer: function (operationalLayer, extentChangeFlag) {
            domStyle.set(this.listLoadingIndicator, "display", "block");
            this.featureLayer = new FeatureLayer(operationalLayer.url);
            on(this.featureLayer, "load", lang.hitch(this, function (evt) {
                setTimeout(lang.hitch(this, function () {
                    //If the layer is not visible at map scale the features might be loaded at previous scale,
                    //so check if layer is visible at map scale then only update issue wall or else show no issues found message.
                    if (operationalLayer.visibleAtMapScale) {
                        this._fetchIssueDetails(operationalLayer, extentChangeFlag);
                    } else {
                        domConstruct.empty(this.listContainer);
                        domConstruct.create("div", {
                            "innerHTML": dojo.configData.i18n.issueWall.noResultsFound,
                            "class": "esriCTNoIssuesDiv"
                        }, this.listContainer);
                        domStyle.set(this.listLoadingIndicator, "display", "none");
                    }
                    domAttr.set(this.listContainerTitle, "innerHTML", this.operationalLayerDetails.title);
                }), 1000);
            }));
        },

        /**
        * Show or hide comment icon
        * @param{array} attributes
        * @param{object} object id field from the layer
        * @param{object} parentDiv, container in which the icon would be inserted
        * @param{object} commentIconFlag
        * @memberOf widgets/issue-wall/issue-wall
        */
        _showHideCommentIcon: function (commentParams, issueTitle) {
            var commentIcon, commentIconContent;
            // if the layer contains a related table and the related table has a field for comments, show comment icon else hide the icon
            if (commentParams.commentFlag && commentParams.relatedTable) {
                commentIcon = query('.esriCTCommentsIcon', commentParams.parentNode)[0];
                domAttr.set(commentIcon, "objId", commentParams.attributes[commentParams.objectId]);
                domAttr.set(commentIcon, "globalID", commentParams.attributes[commentParams.layer.globalIdField]);
                this._handleCommentsIconClick(commentIcon, commentParams, issueTitle);
            } else {
                // hide comment icon
                commentIconContent = query('.esriCTCommentsIcon', commentParams.parentNode)[0].parentElement;
                domStyle.set(commentIconContent, "visibility", "hidden");
            }
        },

        _handleCommentsIconClick: function (commentIcon, commentParams, issueTitle) {
            var target;
            on(commentIcon, "click", lang.hitch(this, function (evt) {
                dojo.applicationUtils.showLoadingIndicator();
                if (evt.currentTarget) {
                    target = evt.currentTarget;
                } else {
                    target = evt.srcElement;
                }
                commentParams.objectId = domAttr.get(target, "objId");
                commentParams.issueTitle = issueTitle;
                commentParams.globalIdField = domAttr.get(target, "globalID");
                //highlight Issue on map when comments icon is clicked
                this._highLightFeatureOnClick(commentParams.layer, commentParams.objectId);
                this.issueCommentWidget._fetchComments(commentParams);
            }));
        },

        /**
        * Fetch feature layer graphics and info popup header fields to be displayed in the list
        * @param{object} operationalLayer details
        * @param{object} URL for the comments related table
        * @param{object} key field for the relationship
        * @param{object} flag to determine if comment icon should be displayed or hidden
        * @memberOf widgets/issue-wall/issue-wall
        */
        _fetchIssueDetails: function (operationalLayer, extentChangeFlag) {
            var i, j, k, x, featureArray = [], likeFlag = false, domainValue,
                fields, fieldValue, attributes, objectIdFieldName, objectIdFieldValue, flagObject = {};
            for (j = 0; j < operationalLayer.graphics.length; j++) {
                // fetch only the features present in current map extent
                if (this.map.extent.intersects(operationalLayer.graphics[j].geometry)) {
                    for (fields in operationalLayer.graphics[j].attributes) {
                        if (operationalLayer.graphics[j].attributes.hasOwnProperty(fields)) {
                            if (operationalLayer.graphics[j].attributes[fields] === null || operationalLayer.graphics[j].attributes[fields] === "") {
                                operationalLayer.graphics[j].attributes[fields] = dojo.configData.showNullValueAs;
                            }
                        }
                    }

                    attributes = operationalLayer.graphics[j].attributes;
                    for (x = 0; x < operationalLayer.fields.length; x++) {
                        if (operationalLayer.fields[x].type === "esriFieldTypeDate") {
                            // format editor date field according to the format received from  info popup
                            if (Number(attributes[operationalLayer.fields[x].name])) {
                                for (i = 0; i < this.operationalLayerDetails.popupInfo.fieldInfos.length; i++) {
                                    if (this.operationalLayerDetails.popupInfo.fieldInfos[i].fieldName === operationalLayer.fields[x].name) {
                                        if (this.operationalLayerDetails.popupInfo.fieldInfos[i].format.dateFormat) {
                                            attributes[operationalLayer.fields[x].name] = moment(attributes[operationalLayer.fields[x].name]).format(dojo.applicationUtils.getDateFormat(this.operationalLayerDetails.popupInfo.fieldInfos[i].format.dateFormat).dateFormat);
                                        } else {
                                            attributes[operationalLayer.fields[x].name] = (moment(attributes[operationalLayer.fields[x].name]).toDate()).toLocaleDateString();
                                        }
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

                    for (k = 0; k < this.operationalLayerDetails.layerObject.fields.length; k++) {
                        if (this.operationalLayerDetails.layerObject.fields[k].domain && this.operationalLayerDetails.layerObject.fields[k].domain.codedValues) {
                            fieldValue = attributes[this.operationalLayerDetails.layerObject.fields[k].name];
                            if ((!fieldValue && fieldValue !== 0) || lang.trim(String(fieldValue)) === "") {
                                fieldValue = dojo.configData.showNullValueAs + "<br/>";
                            } else {
                                domainValue = this._domainCodedValues(this.operationalLayerDetails.layerObject.fields[k], null, fieldValue);
                                attributes[this.operationalLayerDetails.layerObject.fields[k].name] = domainValue.domainCodedValue;
                            }
                        }
                    }

                    // if edit date field is not available in the layer, perform sorting based on object id
                    if (objectIdFieldValue) {
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
            flagObject.comment = this._hasCommentsTable;
            flagObject.extentChange = extentChangeFlag;
            this._displayIssueList(featureArray, operationalLayer, objectIdFieldName, flagObject, this._commentsTable);
        },

        /**
        * Display list of issues in right panel
        * @param{array} featureSet
        * @param{object} operationalLayer details
        * @param{object} objectId Field
        * @param{object} flagObject for like icon,comments icon, extent change
        * @memberOf widgets/issue-wall/issue-wall
        */
        _displayIssueList: function (featureSet, operationalLayer, objectIdField, flagObject, relatedTable) {
            var i, commentParams, issueListTemplateString, parentDiv, issueTitleName, statusParamObj = {
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
            // check if details exist in info popup
            if (this.operationalLayerDetails.popupInfo && featureSet.length > 0) {
                // loop through the features to get feature details
                for (i = 0; i < featureSet.length; i++) {
                    // get header title of each issue details
                    issueTitleName = this._getIssueDetailsTitle(featureSet[i].attributes);
                    issueListTemplateString = string.substitute(issueItemTemplate, {
                        IssueTitle: issueTitleName
                    });
                    // As DomNodes are getting constructed differently in IE8
                    // Check if IE Version is less than 9
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
                    commentParams = {
                        "attributes": featureSet[i].attributes,
                        "objectId": objectIdField,
                        "parentNode": parentDiv,
                        "commentFlag": statusParamObj.commentStatus,
                        "layer": operationalLayer,
                        "relatedTable": relatedTable
                    };
                    this._showHideCommentIcon(commentParams, issueTitleName);
                    this._locateIssueOnMap(featureSet[i].attributes, objectIdField, parentDiv, operationalLayer);
                    // show issue details on down arrow click
                    this._handleDownArrowClick(parentDiv, featureSet[i].attributes, statusParamObj, issueTitleName, relatedTable);
                }
                // show issue details on click of feature on map
                this._attachFeatureClickEvent(parentDiv, statusParamObj);
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
            var value, titleField, i, j, popupTitle, headerValue, headerFieldArray, panelHeaderValue, issueDetailsTitleName, titleArray;
            // split info popup header fields
            popupTitle = this.operationalLayerDetails.popupInfo.title.split("{");

            headerFieldArray = [];
            // if header contains more than 1 fields
            if (popupTitle.length > 1) {
                // get strings from header
                titleField = lang.trim(popupTitle[0]) + " ";

                for (i = 0; i < popupTitle.length; i++) {
                    // insert remaining fields in an array
                    titleArray = popupTitle[i].split("}");
                    if (i === 0) {
                        if (featureSet.hasOwnProperty(titleArray[0])) {
                            value = featureSet[titleArray[0]];
                            // concatenate string and first field from the header and insert in an array
                            headerFieldArray.push(value);
                        } else {
                            headerFieldArray.push(titleField);
                        }
                    } else {
                        for (j = 0; j < titleArray.length; j++) {
                            if (featureSet.hasOwnProperty(titleArray[j])) {
                                headerFieldArray.push(featureSet[lang.trim(titleArray[j])]);
                            } else {
                                headerFieldArray.push(titleArray[j]);
                            }
                        }
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
                    panelHeaderValue = featureSet[headerValue];
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
        _handleDownArrowClick: function (parentDiv, featureSet, statusParamObj, issueTitleName, relatedTable) {
            var downArrowIcon, getIssueObj;
            // click event for opening the issue detailed view
            downArrowIcon = query('.esriCTDownArrowIcon', parentDiv)[0];
            // binding event only if the queried node found
            if (downArrowIcon) {
                on(downArrowIcon, "click", lang.hitch(this, function (evt) {
                    getIssueObj = domAttr.get(downArrowIcon, "objId");
                    // if issue object id found
                    if (getIssueObj) {
                        this._getIssueFeatureSet(parentDiv, getIssueObj, statusParamObj, relatedTable);
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
        _getIssueFeatureSet: function (parentDiv, getIssueObj, statusParamObj, relatedTable) {
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
                        if (attr.features[0].attributes[keyfield] === null || attr.features[0].attributes[keyfield] === "") {
                            attr.features[0].attributes[keyfield] = dojo.configData.showNullValueAs;
                        }
                    }
                }
                this._highLightFeatureOnClick(statusParamObj.layerField, getIssueObj);
                issueTitleName = this._getIssueDetailsTitle(attr.features[0].attributes);
                this._showIssueDetails(parentDiv, attr.features[0].attributes, statusParamObj, issueTitleName, this._commentsTable);
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
        _showIssueDetails: function (parentDiv, featureSet, statusParamObj, issueTitleName, relatedTable) {
            var issueDetailsTemplateString, container, detailsData, x, fieldHeader, fieldContent, fieldValue, objectID, upArrowIcon, popupInfoValue,
                detailDivheight, detailHeaderDiv, detailFooterDiv, detailBodyheight, listDetailsData, fieldLabel, commentParams;
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

                        fieldValue = "";

                        if (featureSet[popupInfoValue.fieldName] !== null && featureSet[popupInfoValue.fieldName] !== "") {
                            fieldValue = featureSet[popupInfoValue.fieldName];
                        }

                        // Check if field value is null
                        if (fieldValue && fieldValue !== "" && (popupInfoValue.format)) {
                            // Check whether format for digit separator is required
                            fieldValue = this._numberFormatCorverter(popupInfoValue, fieldValue);
                        }

                        if ((!fieldValue && fieldValue !== 0) || lang.trim(String(fieldValue)) === "") {
                            fieldValue = dojo.configData.showNullValueAs + "<br/>";
                        }

                        domAttr.set(fieldContent, "innerHTML", fieldValue);
                    }
                }
                // Get object id for the feature
                objectID = featureSet[statusParamObj.objField];
                // Check if attachments found and show attachment flag is true
                if (statusParamObj.layerField.hasAttachments && this.operationalLayerDetails.popupInfo.showAttachments) {
                    this._showAttachments(statusParamObj.layerField, parentDiv, objectID);
                }
            } else {
                domConstruct.create("div", {
                    "innerHTML": dojo.configData.i18n.issueWall.noResultsFound,
                    "class": "esriCTNoIssuesDiv"
                }, detailsData);
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
            commentParams = {
                "attributes": featureSet,
                "objectId": statusParamObj.objField,
                "parentNode": parentDiv,
                "commentFlag": this._hasCommentsTable,
                "layer": statusParamObj.layerField,
                "relatedTable": relatedTable
            };
            this._showHideCommentIcon(commentParams, issueTitleName);
            this._locateIssueOnMap(featureSet, statusParamObj.objField, parentDiv, statusParamObj.layerField);
        },

        /**
        * Format number value based on the format received from info popup
        * @param{object} popupInfoValue
        * @param{string} fieldValue
        * @memberOf widgets/issue-wall/issue-wall
        */
        _numberFormatCorverter: function (popupInfoValue, fieldValue) {
            if (popupInfoValue.format && popupInfoValue.format.digitSeparator && popupInfoValue.format.places !== null && popupInfoValue.format.places !== "" && !isNaN(parseFloat(fieldValue))) {
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
            var k, codedValues, domainValueObj;
            domainValueObj = { domainCodedValue: dojo.configData.showNullValueAs };
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

            domainValueObj.domainCodedValue = fieldValue;
            return domainValueObj;
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
                        imagePath = dojoConfig.baseURL + dojo.configData.noAttachmentIcon;
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
                        on(imageDiv[i], "click", lang.hitch(this, this._openAttachments));
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
        _openAttachments: function (evt) {
            window.open(evt.target.alt);
        },

        /**
        * Callback handler for image loaded event.
        * hide the image loader once the image is loaded, and set the image dimensions so that complete image will be shown in thumbnail.
        * @param{object} evt
        * @memberOf widgets/issue-wall/issue-wall
        */
        _onImageLoad: function (evt) {
            // if event target found then only
            if (evt && evt.target && evt.target.parentNode) {
                domClass.remove(evt.target.parentNode, "esriCTImageLoader");
            }

            // if event target found then only
            if (evt && evt.target) {
                this._setImageDimensions(evt.target, true);
            }
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
        _attachFeatureClickEvent: function (parentDiv, statusParamObj) {
            var featureObjId, issueDetailsPanel;
            if (statusParamObj.layerField) {
                //Remove the layer click handler if all-ready exist.
                if (this._layerClickHandler) {
                    this._layerClickHandler.remove();
                }
                this._layerClickHandler = on(statusParamObj.layerField, "click", lang.hitch(this, function (evt) {
                    featureObjId = evt.graphic.attributes[statusParamObj.objField];
                    this._highLightFeatureOnClick(statusParamObj.layerField, featureObjId);
                    issueDetailsPanel = query(".esriCTListDetails", this.listDetailedContainer);
                    if (issueDetailsPanel) {
                        domConstruct.destroy(issueDetailsPanel);
                    }
                    this.featureSelectedOnMapClick();
                    // if the layer has object id and query success for feature
                    if (featureObjId) {
                        this._getIssueFeatureSet(parentDiv, featureObjId, statusParamObj);
                    }
                }));
            }
        },

        /**
        * Show issue details on click of feature on map
        * @memberOf widgets/issue-wall/issue-wall
        */
        featureSelectedOnMapClick: function () {
            return;
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
                        count = (featureSet.features[0].attributes[dojo.configData.likeField] === "" || featureSet.features[0].attributes[dojo.configData.likeField] === null) ? 0 : featureSet.features[0].attributes[dojo.configData.likeField];
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
                                this.onIssueUpdated(featureSet.features[0]);
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
                if (likeCount !== "" || likeCount !== null) {
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
        * Locate issue on map when user clicks on the 'map it' button
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
        _createSVGSymbol: function (path, size, offset) {
            var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([0, 255, 255]), 4),
                markerSymbol;
            markerSymbol = new SimpleMarkerSymbol();
            markerSymbol.setPath(path);
            markerSymbol.setOutline(sls);
            markerSymbol.setSize(size + 20);
            markerSymbol.setColor(null);
            if (offset.hasOwnProperty("xoffset") && offset.hasOwnProperty("yoffset")) {
                markerSymbol.xoffset = offset.xoffset;
                markerSymbol.yoffset = offset.yoffset;
            }
            return markerSymbol;
        },

        /**
        * This function is used to get symbol used for highlighting feature.
        * @param{string} graphic
        * @param{string} layer
        * @memberOf widgets/issue-wall/issue-wall
        */
        _getHighLightSymbol: function (graphic, layer) {
            var i, symbol, path, symbolHeight, symbolWidth, size, symbolSize, polylineSymbol, polygonSymbol, offset = {},
                graphicInfoValue, layerInfoValue;
            switch (graphic.geometry.type) {
            case "point":
                path = "M 1784,238 1805,238 1805,259 1784,259 1784,238 M 1777,248 1784,248 M 1794,231 1794,238 M 1812,248 1805,248 M 1794,266 1794,259";
                if (layer.renderer.symbol) {
                    if (layer.renderer.symbol.hasOwnProperty("height") && layer.renderer.symbol.hasOwnProperty("width")) {
                        symbolHeight = layer.renderer.symbol.height;
                        symbolWidth = layer.renderer.symbol.width;
                        size = (symbolHeight > symbolWidth) ? symbolHeight : symbolWidth;
                        symbolSize = size;
                    }
                    if (layer.renderer.symbol.hasOwnProperty("size")) {
                        if (!symbolSize || symbolSize < layer.renderer.symbol.size) {
                            symbolSize = layer.renderer.symbol.size;
                        }
                    }
                    if (layer.renderer.symbol.hasOwnProperty("xoffset") && layer.renderer.symbol.hasOwnProperty("yoffset")) {
                        offset.xoffset = layer.renderer.symbol.xoffset;
                        offset.yoffset = layer.renderer.symbol.yoffset;
                    }
                } else if ((layer.renderer.infos) && (layer.renderer.infos.length > 1)) {
                    for (i = 0; i < layer.renderer.infos.length; i++) {
                        graphicInfoValue = graphic.attributes[layer.typeIdField];
                        layerInfoValue = layer.renderer.infos[i].value;
                        if (graphicInfoValue.toString() === layerInfoValue.toString()) {
                            if (layer.renderer.infos[i].symbol.hasOwnProperty("height") && layer.renderer.infos[i].symbol.hasOwnProperty("width")) {
                                symbolHeight = layer.renderer.infos[i].symbol.height;
                                symbolWidth = layer.renderer.infos[i].symbol.width;
                                // to display cross-hair symbol properly around feature
                                size = (symbolHeight > symbolWidth) ? symbolHeight : symbolWidth;
                                symbolSize = size;
                            }
                            if (layer.renderer.infos[i].symbol.hasOwnProperty("size")) {
                                if (!symbolSize || symbolSize < layer.renderer.infos[i].symbol.size) {
                                    symbolSize = layer.renderer.infos[i].symbol.size;
                                }
                            }
                            if (layer.renderer.infos[i].symbol.hasOwnProperty("xoffset") && layer.renderer.infos[i].symbol.hasOwnProperty("yoffset")) {
                                offset.xoffset = layer.renderer.infos[i].symbol.xoffset;
                                offset.yoffset = layer.renderer.infos[i].symbol.yoffset;
                            }
                        }
                    }
                }
                symbol = new Graphic(new Point([graphic.geometry.x, graphic.geometry.y], this.map.spatialReference), this._createSVGSymbol(path, symbolSize, offset));
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

        onIssueUpdated: function (updatedFeature) {
            return updatedFeature;
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