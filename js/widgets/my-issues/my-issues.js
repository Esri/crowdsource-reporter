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
    "dojo/Deferred",
    "dojo/dom",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/string",
    "dojo/query",
    "dojo/text!./templates/my-issues.html",
    "dojo/text!./templates/my-issues-item-template.html",
    "dojo/text!./templates/my-issues-details-template.html",
    "dojo/promise/all",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "esri/arcgis/utils",
    "esri/Color",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/tasks/QueryTask",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/tasks/query",
    "widgets/issue-comments/issue-comments"
], function (declare, Deferred, dom, domConstruct, domStyle, domAttr, domClass, lang, on, string, query, template, issueItemTemplate, issueDetailsTemplate, all, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, arcgisUtils, Color, Graphic, Point, Polyline, Polygon, FeatureLayer, GraphicsLayer, QueryTask, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Query, IssueComments) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        opLayersArr: [],
        isNoFeatureFound: null,
        /**
        * Initialize widget
        * @memberOf widgets/my-issues/my-issues
        */
        postCreate: function () {

            //attach event on close button of my issues container.
            on(this.closeButton, "click", lang.hitch(this, function (evt) {
                this.hideMyIssuesContainer(evt);
            }));
            //initialize issue comment widget
            this.issueCommentWidget = new IssueComments({ "parentContainer": this.domNode });
            this.CreateMyIssuesList();
        },

        /**
        * display My issues list container
        * @memberOf widgets/my-issues/my-issues
        */
        showMyIssuesContainer: function () {
            domStyle.set(this.domNode, "display", "block");
            this.resizeContainer();
        },

        /**
        * hide My issues list container
        * @memberOf widgets/my-issues/my-issues
        */
        hideMyIssuesContainer: function (evt) {
            domStyle.set(this.domNode, "display", "none");
            this.onHideMyIssuesContainer();
        },

        onHideMyIssuesContainer: function (evt) {
            return evt;
        },

        /**
        * Create My issues list
        * @param{object} config to be mixed
        * @memberOf widgets/my-issues/my-issues
        */
        CreateMyIssuesList: function () {
            var webmapOpLayerArr, layerResponseDef = [], i, j, index = 0;
            this.isNoFeatureFound = true;
            this.opLayersArr = [];
            this.listContainerTitle.innerHTML = dojo.configData.i18n.myIssues.title;
            domStyle.set(this.listLoadingIndicator, "display", "block");
            domConstruct.empty(this.listContainer);
            this.selectedGraphicsLayer = this.map.getLayer("selectionGraphicsLayer");
            domConstruct.empty(this.listDetailedContainer);
            //get all operational layer from all webmaps
            for (i = 0; i < this.webmapList.length; i++) {
                webmapOpLayerArr = this.webmapList[i][1].itemInfo.itemData.operationalLayers;
                for (j = 0; j < webmapOpLayerArr.length; j++) {
                    //add layer to opLayersArr, if it has configured reported by field to identify creator of issue
                    if (this._isFieldAvailable(webmapOpLayerArr[j].layerObject, dojo.configData.reportedByField)) {
                        webmapOpLayerArr[j].webmapId = this.webmapList[i][1].itemInfo.item.id;
                        //add layer index to identify layer in opLayersArr
                        webmapOpLayerArr[j].layerIndex = index;
                        webmapOpLayerArr[j].webmapTitle = this.webmapList[i][1].itemInfo.item.title;
                        index++;
                        this.opLayersArr.push(webmapOpLayerArr[j]);
                        layerResponseDef.push(this._queryOnLayer(webmapOpLayerArr[j]));
                    }
                }
            }
            //display message if no layer has configured reported by field
            if (!this.opLayersArr.length) {
                domConstruct.create("div", {
                    "innerHTML": dojo.configData.i18n.myIssues.noResultsFound,
                    "class": "esriCTNoIssuesDiv"
                }, this.listContainer);
                domStyle.set(this.listLoadingIndicator, "display", "none");
            }
            all(layerResponseDef).then(lang.hitch(this, function (featureSet) {
                var layerIssuesResponseDef = [];
                for (i = 0; i < featureSet.length; i++) {
                    if (featureSet[i]) {
                        this.opLayersArr[i].layerObject.graphics = featureSet[i];
                        layerIssuesResponseDef.push(this._fetchIssueListData(this.opLayersArr[i]));
                    }
                }
                all(layerIssuesResponseDef).then(lang.hitch(this, function (results) {
                    this._fetchIssueDetailsFromLayers(results);
                }));
            }));
            //on window resize update the height of issue list based on screen size and headers and footers.
            // As in case of long header title, header height need to be adjusted.
            on(window, "resize", lang.hitch(this, this.resizeContainer));
        },

        /**
        * Resizes the Container according to screen height
        * @param{object} config to be mixed
        * @memberOf widgets/my-issues/my-issues
        */
        resizeContainer: function () {
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
        * update my issue list when new issue is added
        * @param{object} data contains layer info, on which new issue has reported
        * @param{object} updatedIssue contains details of feature, which has been updated.
        * @memberOf widgets/my-issues/my-issues
        */
        updateIssueList: function (data, updatedIssue) {
            var layerIndex = this._getSelectedLayer(data.webMapId, data.operationalLayerId, data.operationalLayerDetails.title);
            if (layerIndex || layerIndex === 0) {
                if (updatedIssue) {
                    //check if updated issue is reported b logged in user
                    if (updatedIssue.attributes[dojo.configData.reportedByField] !== dojo.configData.logInDetails.processedUserName) {
                        return;
                    }
                }
                //query on layer to get updated feature array, if layer has configured reported by field
                if (this._isFieldAvailable(this.opLayersArr[layerIndex].layerObject, dojo.configData.reportedByField)) {
                    domStyle.set(this.listLoadingIndicator, "display", "block");
                    domConstruct.empty(this.listContainer);
                    this._queryOnLayer(this.opLayersArr[layerIndex]).then(lang.hitch(this, function (result) {
                        if (result) {
                            //update graphics array
                            this.opLayersArr[layerIndex].layerObject.graphics = result;
                        }
                        this._fetchIssueDetailsFromLayers(this.opLayersArr);
                    }));
                }
            }
        },

        /**
        * check if configured field is available in layer
        * @param{object} layerObject is operational layer object
        * @param{object} fieldName is field name
        * @memberOf widgets/my-issues/my-issues
        */
        _isFieldAvailable: function (layerObject, fieldName) {
            var i, isFieldAvl = false;
            for (i = 0; i < layerObject.fields.length; i++) {
                if (layerObject.fields[i].name === fieldName) {
                    isFieldAvl = true;
                    break;
                }
            }
            return isFieldAvl;
        },

        /**
        * query on layer to get updated issue list
        * @param{object} layerObject is operational layer object
        * @memberOf widgets/my-issues/my-issues
        */
        _queryOnLayer: function (opLayer) {
            var queryTask, deferred, parameters, dateobj = new Date().getTime().toString();
            deferred = new Deferred();
            parameters = new Query();
            //query with configured reported by field to get list of issues reported by logged in user
            parameters.where = dojo.configData.reportedByField + "='" + dojo.configData.logInDetails.processedUserName + "' AND " + dateobj + "=" + dateobj;
            parameters.outFields = ["*"];
            queryTask = new QueryTask(opLayer.url);
            queryTask.execute(parameters, function (response) {
                deferred.resolve(response.features);
            }, function (err) {
                deferred.resolve();
            });
            return deferred;
        },
        /**
        * get instance of layer
        * @param{object} webmapId is the id of selected webmap for reported issue
        * @param{object} layerId is the id of layer on which issue has reported
        * @param{object} layerTitle is the title of layer on which issue has reported
        * @memberOf widgets/my-issues/my-issues
        */
        _getSelectedLayer: function (webmapId, layerId, layerTitle) {
            var opLayerIndex, i;
            for (i = 0; i < this.opLayersArr.length; i++) {
                if (this.opLayersArr[i].webmapId === webmapId && this.opLayersArr[i].layerObject.id === layerId && this.opLayersArr[i].title === layerTitle) {
                    opLayerIndex = this.opLayersArr[i].layerIndex;
                    break;
                }
            }
            return opLayerIndex;
        },
        /**
        * fetch issue details from all layers
        * @param{object} layerObject is operational layer object
        * @memberOf widgets/my-issues/my-issues
        */
        _fetchIssueDetailsFromLayers: function (oplayersArr) {
            var i;
            for (i = 0; i < oplayersArr.length; i++) {
                if (oplayersArr[i]) {
                    this._fetchIssueDetails(oplayersArr[i]);
                }
            }
        },

        /**
        * Load feature layer and fetch the graphics from that layer
        * @param{object} operationalLayer
        * @memberOf widgets/my-issues/my-issues
        */
        _loadFeatureLayer: function (operationalLayer) {
            var featureLayer, deferred = new Deferred();
            featureLayer = new FeatureLayer(operationalLayer.url);
            on(featureLayer, "load", lang.hitch(this, function (evt) {
                setTimeout(lang.hitch(this, function () {
                    deferred.resolve(operationalLayer);
                }), 1000);
            }));
            return deferred;
        },

        /**
        * Fetch feature layer graphics and info popup header fields to be displayed in the list
        * @param{object} operationalLayer details
        * @memberOf widgets/my-issues/my-issues
        */
        _fetchIssueListData: function (operationalLayer) {
            var operationalLayerObj = operationalLayer.layerObject, k, relatedTable, layerId,
                lastIndex, relatedTableURL, layer, commentIconFlag = false, deferred = new Deferred();
            // if comment field is present in config file and the layer contains related table, fetch the first related table URL
            if (dojo.configData.commentField && operationalLayerObj.relationships.length > 0) {
                layerId = operationalLayerObj.relationships[0].relatedTableId;
                lastIndex = operationalLayerObj.url.lastIndexOf('/');
                layer = operationalLayerObj.url.substr(0, lastIndex + 1);
                relatedTableURL = layer + layerId;
                relatedTable = new FeatureLayer(relatedTableURL);
                on(relatedTable, "load", lang.hitch(this, function (evt) {
                    // if the related table contains comment field set commentIconFlag to true
                    for (k = 0; k < relatedTable.fields.length; k++) {
                        if (relatedTable.fields[k].name === dojo.configData.commentField) {
                            commentIconFlag = true;
                            break;
                        }
                    }
                    operationalLayer.commentFlag = commentIconFlag;
                    operationalLayer.relatedTable = relatedTable;
                    deferred.resolve(operationalLayer);
                }));
            } else {
                operationalLayer.commentFlag = commentIconFlag;
                deferred.resolve(operationalLayer);
            }
            return deferred;
        },

        /**
        * Show or hide comment icon
        * @param{array} attributes
        * @param{object} object id field from the layer
        * @param{object} parentDiv, container in which the icon would be inserted
        * @param{object} commentIconFlag
        * @memberOf widgets/my-issues/my-issues
        */
        _showHideCommentIcon: function (commentParams, issueTitle) {
            var commentIcon, commentIconContent;
            // if the layer contains a related table and the related table has a field for comments, show comment icon else hide the icon
            if (commentParams.commentFlag) {
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
            var commentIconTarget;
            on(commentIcon, "click", lang.hitch(this, function (evt) {
                commentIconTarget = evt.currentTarget || evt.srcElement;
                dojo.applicationUtils.showLoadingIndicator();
                commentParams.objectId = domAttr.get(commentIconTarget, "objId");
                commentParams.issueTitle = issueTitle;
                this.issueCommentWidget._fetchComments(commentParams);
                commentParams.globalIdField = domAttr.get(commentIconTarget, "globalID");

            }));
        },
        /**
        * Fetch feature layer graphics and info popup header fields to be displayed in the list
        * @param{object} operationalLayer details
        * @memberOf widgets/my-issues/my-issues
        */
        _fetchIssueDetails: function (operationalLayer) {
            var i, j, x, featureArray = [], operationalLayerObj = operationalLayer.layerObject, fieldName, likeFlag = false,
                fields, fieldValue, attributes, objectIdFieldName, objectIdFieldValue, flagObject = {};
            this.operationalLayerDetails = operationalLayer;
            for (j = operationalLayerObj.graphics.length - 1; j >= 0; j--) {
                if (dojo.configData.logInDetails.processedUserName === operationalLayerObj.graphics[j].attributes[dojo.configData.reportedByField]) {
                    for (fields in operationalLayerObj.graphics[j].attributes) {
                        if (operationalLayerObj.graphics[j].attributes.hasOwnProperty(fields)) {
                            if (operationalLayerObj.graphics[j].attributes[fields] === null || operationalLayerObj.graphics[j].attributes[fields] === "") {
                                operationalLayerObj.graphics[j].attributes[fields] = dojo.configData.showNullValueAs;
                            }
                        }
                    }
                    // check if edit date field is available in the layer for sorting the issue list
                    if (operationalLayerObj && operationalLayerObj.editFieldsInfo && this.operationalLayerDetails.layerObject.editFieldsInfo.editDateField) {
                        fieldName = operationalLayerObj.editFieldsInfo.editDateField;
                        fieldValue = operationalLayerObj.graphics[j].attributes[fieldName];
                    }
                    attributes = operationalLayerObj.graphics[j].attributes;
                    for (x = 0; x < operationalLayerObj.fields.length; x++) {
                        if (operationalLayerObj.fields[x].type === "esriFieldTypeDate") {
                            // format editor date field according to the format received from  info popup
                            if (Number(attributes[operationalLayerObj.fields[x].name])) {
                                for (i = 0; i < operationalLayer.popupInfo.fieldInfos.length; i++) {
                                    if (operationalLayer.popupInfo.fieldInfos[i].fieldName === operationalLayerObj.fields[x].name) {
                                        if (operationalLayer.popupInfo.fieldInfos[i].format.dateFormat) {
                                            attributes[operationalLayerObj.fields[x].name] = moment(attributes[operationalLayerObj.fields[x].name]).format(dojo.applicationUtils.getDateFormat(operationalLayer.popupInfo.fieldInfos[i].format.dateFormat).dateFormat);
                                        } else {
                                            attributes[operationalLayerObj.fields[x].name] = moment(attributes[operationalLayerObj.fields[x].name]).format('MM-DD-YYYY');
                                        }
                                    }
                                }
                            }
                        }
                        // get object id field from the layer
                        if (operationalLayerObj.fields[x].type === "esriFieldTypeOID") {
                            objectIdFieldName = operationalLayerObj.fields[x].name;
                            objectIdFieldValue = operationalLayerObj.graphics[j].attributes[objectIdFieldName];
                        }

                        // if like field is present in the config file and the layer contains like field, set the flag to true
                        if (dojo.configData.likeField && (operationalLayerObj.fields[x].name === dojo.configData.likeField)) {
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
            flagObject.like = likeFlag;
            flagObject.comment = operationalLayer.commentFlag;
            this._displayIssueList(featureArray, operationalLayer, objectIdFieldName, flagObject);
        },

        /**
        * Display list of issues in right panel
        * @param{array} featureSet
        * @param{object} operationalLayer details
        * @param{object} objectId Field
        * @param{object} flagObject for like icon,comments icon, extent change
        * @memberOf widgets/my-issues/my-issues
        */
        _displayIssueList: function (featureSet, operationalLayer, objectIdField, flagObject) {
            var i, statusParamObj = {
                likeStatus: flagObject.like,
                commentStatus: flagObject.comment,
                objField: objectIdField,
                layerField: operationalLayer.layerObject
            };
            // check if details exist in info popup
            if (operationalLayer.popupInfo && featureSet.length > 0) {
                this.isNoFeatureFound = false;
                // loop through the features to get feature details
                for (i = 0; i < featureSet.length; i++) {
                    if (dojo.configData.logInDetails.processedUserName === featureSet[i].attributes[dojo.configData.reportedByField]) {
                        // get header title of each issue details
                        this._createIssueTemplate(featureSet[i], statusParamObj, operationalLayer);
                    }
                }
            } else if (this.isNoFeatureFound && operationalLayer.layerIndex === this.opLayersArr.length - 1) {
                //display message in my issues panel if no layer has any issue reported by logged in user
                domConstruct.create("div", {
                    "innerHTML": dojo.configData.i18n.myIssues.noResultsFound,
                    "class": "esriCTNoIssuesDiv"
                }, this.listContainer);

            }
            domStyle.set(this.listLoadingIndicator, "display", "none");
        },

        /**
        * create feature template in my issue list
        * @param{array} featureSet
        * @param{object} statusParamObj contains votes and comment details
        * @param{object} operationalLayer details
        * @memberOf widgets/my-issues/my-issues
        */
        _createIssueTemplate: function (feature, statusParamObj, operationalLayer) {
            var issueTitleName, issueListTemplateString, parentDiv, setIssueObj, commentParams;
            issueTitleName = this._getIssueDetailsTitle(feature.attributes, operationalLayer);
            issueListTemplateString = string.substitute(issueItemTemplate, {
                IssueTitle: issueTitleName.issueTitle,
                LayerTitle: issueTitleName.layerTitle,
                WebMapTitle: issueTitleName.webMapTitle
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
                domAttr.set(setIssueObj, "objId", feature.attributes[statusParamObj.objField]);
                domAttr.set(setIssueObj, "layerIndex", operationalLayer.layerIndex);
            }
            this.listContainer.appendChild(parentDiv);
            this._showHideLikeIcon(statusParamObj, feature.attributes, parentDiv, operationalLayer.layerIndex);
            commentParams = {
                "attributes": feature.attributes,
                "objectId": statusParamObj.objField,
                "parentNode": parentDiv,
                "commentFlag": statusParamObj.commentStatus,
                "layer": statusParamObj.layerField,
                "relatedTable": operationalLayer.relatedTable
            };
            this._showHideCommentIcon(commentParams, issueTitleName.issueTitle);
            this._locateIssueOnMap(feature.attributes, statusParamObj.objField, parentDiv, operationalLayer);
            // show issue details on down arrow click
            this._handleDownArrowClick(parentDiv, feature.attributes, statusParamObj, operationalLayer.relatedTable);

        },
        /*
        * Sets the info popup header for each issue
        * @param{array} featureSet
        * @memberOf widgets/my-issues/my-issues
        */
        _getIssueDetailsTitle: function (featureSet, operationalLayer) {
            var i, j, titleField, value, popupTitle, titleArray, headerValue, headerFieldArray, panelHeaderValue, issueTemplateHeader, fieldInfo, dateFieldInfo, dateFieldValue;
            // split info popup header fields
            popupTitle = operationalLayer.popupInfo.title.split("{");
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
                                fieldInfo = this._isDateField(titleArray[j], operationalLayer.layerObject);
                                if (fieldInfo) {
                                    dateFieldInfo = this._getDateInfo(titleArray[j], operationalLayer.popupInfo);
                                    if (dateFieldInfo.format && dateFieldInfo.format.dateFormat) {
                                        dateFieldValue = moment(featureSet[titleArray[j]]).format(dojo.applicationUtils.getDateFormat(dateFieldInfo.format.dateFormat).dateFormat);
                                    } else {
                                        dateFieldValue = (moment(featureSet[titleArray[j]]).toDate()).toLocaleDateString();
                                    }
                                    headerFieldArray.push(dateFieldValue);
                                } else {
                                    headerFieldArray.push(featureSet[lang.trim(titleArray[j])]);
                                }
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
                panelHeaderValue = headerValue;
            } else {
                // if popup title is not empty, display popup field headerValue else display a configurable text
                if (lang.trim(operationalLayer.popupInfo.title) !== "") {
                    headerValue = lang.trim(this.operationalLayerDetails.popupInfo.title);
                    panelHeaderValue = featureSet[headerValue];
                    if (panelHeaderValue) {
                        fieldInfo = this._isDateField(headerValue, operationalLayer.layerObject);
                        if (fieldInfo) {
                            dateFieldInfo = this._getDateInfo(titleArray[j], operationalLayer.popupInfo);
                            if (dateFieldInfo.format && dateFieldInfo.format.dateFormat) {
                                dateFieldValue = moment(featureSet[headerValue]).format(dojo.applicationUtils.getDateFormat(dateFieldInfo.format.dateFormat).dateFormat);
                            } else {
                                dateFieldValue = (moment(featureSet[headerValue]).toDate()).toLocaleDateString();
                            }
                            panelHeaderValue = dateFieldValue;
                        }
                    }
                }
                if (panelHeaderValue) {
                    panelHeaderValue = dojo.configData.showNullValueAs;
                }
            }

            issueTemplateHeader = {
                "webMapTitle": operationalLayer.webmapTitle,
                "layerTitle": operationalLayer.title,
                "issueTitle": panelHeaderValue
            };
            return issueTemplateHeader;
        },

        /**
        * click event for Display selected issue details of right panel
        * @param{array} featureSet
        * @param{object} statusParamObj
        * @param{string} issueTitleName,parentDiv
        * @memberOf widgets/my-issues/my-issues
        */
        _handleDownArrowClick: function (parentDiv, featureSet, statusParamObj, relatedTable) {
            var downArrowIcon, getIssueObj, getIssueLayerObj;
            // click event for opening the issue detailed view
            downArrowIcon = query('.esriCTDownArrowIcon', parentDiv)[0];
            // binding event only if the queried node found
            if (downArrowIcon) {
                on(downArrowIcon, "click", lang.hitch(this, function (evt) {
                    getIssueObj = domAttr.get(downArrowIcon, "objId");
                    getIssueLayerObj = domAttr.get(downArrowIcon, "layerIndex");
                    this.operationalLayerDetails = this.opLayersArr[parseInt(getIssueLayerObj, 10)];
                    // if issue object id foundopLayersArr
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
        * @memberOf widgets/my-issues/my-issues
        */
        _getIssueFeatureSet: function (parentDiv, getIssueObj, statusParamObj, relatedTable) {
            var issueTitleName, featureLayerQuery, queryTask;
            featureLayerQuery = new Query();
            featureLayerQuery.objectIds = [getIssueObj];
            featureLayerQuery.outFields = ["*"];

            queryTask = new QueryTask(statusParamObj.layerField.url);
            queryTask.execute(featureLayerQuery, lang.hitch(this, function (response) {
                var keyfield;
                // loop for Assigning null ('') for null valued features attributes
                for (keyfield in response.features[0].attributes) {
                    // Check if features attributes value is null
                    if (response.features[0].attributes.hasOwnProperty(keyfield)) {
                        if (response.features[0].attributes[keyfield] === null || response.features[0].attributes[keyfield] === "") {
                            response.features[0].attributes[keyfield] = dojo.configData.showNullValueAs;
                        }
                    }
                }
                issueTitleName = this._getIssueDetailsTitle(response.features[0].attributes, this.operationalLayerDetails);
                this._showIssueDetails(parentDiv, response.features[0].attributes, statusParamObj, issueTitleName, relatedTable);
            }), function (err) {
                dojo.applicationUtils.showError(err.message);
            });
        },
        /**
        * Display selected issue details of right panel
        * @param{array} featureSet
        * @param{object} statusParamObj
        * @param{string} titleName,parentDiv
        * @memberOf widgets/my-issues/my-issues
        */
        _showIssueDetails: function (parentDiv, featureSet, statusParamObj, issueTitleName, relatedTable) {
            var issueDetailsTemplateString, container, detailsData, x, fieldHeader, fieldContent, fieldValue, objectID, upArrowIcon, popupInfoValue, key,
                detailDivheight, detailHeaderDiv, detailFooterDiv, detailBodyheight, listDetailsData, fieldLabel, domainValue, commentParams, fieldInfo;
            domClass.add(this.listContainer, "esriCTHidden");
            domClass.remove(this.listDetailedContainer, "esriCTHidden");
            issueDetailsTemplateString = string.substitute(issueDetailsTemplate, {
                IssueTitle: issueTitleName.issueTitle
            });
            // domConstruct.empty(this.listDetailedContainer);
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
                                if (featureSet[key] === null || featureSet[key] === "") {
                                    featureSet[key] = dojo.configData.showNullValueAs;
                                }
                            }
                        }
                        fieldValue = dojo.configData.showNullValueAs;

                        if (featureSet.hasOwnProperty(popupInfoValue.fieldName)) {
                            fieldInfo = this._isDateField(popupInfoValue.fieldName, statusParamObj.layerField);
                            if (fieldInfo) {
                                if (popupInfoValue.format && popupInfoValue.format.dateFormat) {
                                    fieldValue = moment(featureSet[fieldInfo.name]).format(dojo.applicationUtils.getDateFormat(popupInfoValue.format.dateFormat).dateFormat);
                                } else {
                                    fieldValue = (moment(featureSet[fieldInfo.name]).toDate()).toLocaleDateString();
                                }
                            } else {
                                fieldValue = featureSet[popupInfoValue.fieldName];
                            }
                        }

                        // Check if field value is null
                        if (fieldValue && fieldValue !== "" && (popupInfoValue.format)) {
                            // Check whether format for digit separator is required
                            fieldValue = this._numberFormatCorverter(popupInfoValue, fieldValue);
                        }

                        if (statusParamObj.layerField.fields[x].domain && statusParamObj.layerField.fields[x].domain.codedValues) {
                            if (fieldValue === null || lang.trim(String(fieldValue)) === "") {
                                fieldValue = "<br/>";
                            } else {
                                domainValue = this._domainCodedValues(statusParamObj.layerField.fields[x], popupInfoValue, fieldValue);
                                fieldValue = domainValue.domainCodedValue;
                            }
                        }

                        if (fieldValue === null || lang.trim(String(fieldValue)) === "") {
                            fieldValue = "<br/>";
                        }

                        domAttr.set(fieldContent, "innerHTML", fieldValue);
                    }
                }
            } else {
                domConstruct.create("div", {
                    "innerHTML": dojo.configData.i18n.myIssues.noResultsFound,
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
            this._showHideLikeIcon(statusParamObj, featureSet, parentDiv, this.operationalLayerDetails.layerIndex);
            commentParams = {
                "attributes": featureSet,
                "objectId": statusParamObj.objField,
                "parentNode": parentDiv,
                "commentFlag": statusParamObj.commentStatus,
                "layer": statusParamObj.layerField,
                "relatedTable": this.operationalLayerDetails.relatedTable
            };
            this._showHideCommentIcon(commentParams, issueTitleName.issueTitle);
            this._locateIssueOnMap(featureSet, statusParamObj.objField, parentDiv, this.operationalLayerDetails);
        },

        /**
        * check if field type is date
        * @param{object} layerObj is layer Object
        * @param{string} fieldName
        * @memberOf widgets/my-issues/my-issues
        */
        _isDateField: function (fieldName, layerObj) {
            var i, isDateField = null;
            for (i = 0; i < layerObj.fields.length; i++) {
                if (layerObj.fields[i].name === fieldName && layerObj.fields[i].type === "esriFieldTypeDate") {
                    isDateField = layerObj.fields[i];
                    break;
                }
            }
            return isDateField;
        },

        /**
        * check if field type is date
        * @param{object} popupInfo is operational layer popupInfo object
        * @param{string} fieldName
        * @memberOf widgets/my-issues/my-issues
        */
        _getDateInfo: function (fieldName, popupInfo) {
            var i, dateInfo;
            for (i = 0; i < popupInfo.fieldInfos.length; i++) {
                if (popupInfo.fieldInfos[i].fieldName === fieldName) {
                    dateInfo = popupInfo.fieldInfos[i];
                    break;
                }
            }
            return dateInfo;
        },

        /**
        * Format number value based on the format received from info popup
        * @param{object} popupInfoValue
        * @param{string} fieldValue
        * @memberOf widgets/my-issues/my-issues
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
        * @memberOf widgets/my-issues/my-issues
        */
        _domainCodedValues: function (operationalLayerDetails, popupInfoValue, fieldValue) {
            var k, codedValues = operationalLayerDetails.domain.codedValues,
                domainValueObj = { domainCodedValue: dojo.configData.showNullValueAs };
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
        * @memberOf widgets/my-issues/my-issues
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
                        "innerHTML": dojo.configData.i18n.myIssues.photoAttachmentHeader,
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
        * @memberOf widgets/my-issues/my-issues
        */
        _showAttachements: function (evt) {
            window.open(evt.target.alt);
        },

        /**
        * Callback handler for image loaded event.
        * hide the image loader once the image is loaded, and set the image dimensions so that complete image will be shown in thumbnail.
        * @param{object} evt
        * @memberOf widgets/my-issues/my-issues
        */
        _onImageLoad: function (evt) {
            domClass.remove(evt.target.parentNode, "esriCTImageLoader");
            this._setImageDimensions(evt.target, true);
        },

        /**
        * Set the images dimensions so that the complete image will be shown in thumbnail
        * @param{object} imgModule - Image object
        * @param{Boolean} isOnLoad - set this flag this function is called after image load.
        * @memberOf widgets/my-issues/my-issues
        */
        _setImageDimensions: function (imgModule, isOnLoad) {
            var aspectRatio, newWidth, newHeight, imgWidth, imgContainer = imgModule.parentElement;
            if (isOnLoad && imgModule && imgModule.offsetHeight > 0) {
                //set original dimensions of image as it's max dimensions.
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
        * Update votes for issue when user clicks on the like button
        * @param{object} statusParamObj
        * @param{array} featureSet
        * @param{string} parentDiv
        */
        _issueVotesClick: function (statusParamObj, featureSet, parentDiv) {
            var likeIcon, likeCount, count, graphic, queryTask, attr = {};
            likeIcon = query('.esriCTLikeIcon', parentDiv)[0];
            // Like is enabled on popup or not
            if (likeIcon) {
                // on click of like icon
                on(likeIcon, "click", lang.hitch(this, function (evt) {
                    var featureLayerQuery = new Query();
                    //   featureLayerQuery.outSpatialReference = this.map.spatialReference;
                    featureLayerQuery.objectIds = [parseInt(featureSet[statusParamObj.objField], 10)];
                    featureLayerQuery.returnGeometry = true;
                    featureLayerQuery.outFields = ["*"];
                    queryTask = new QueryTask(statusParamObj.layerField.url);
                    queryTask.execute(featureLayerQuery, lang.hitch(this, function (featureSet) {
                        // if number of votes is zero or not available then initialize the counter
                        count = (featureSet.features[0].attributes[dojo.configData.likeField] === null || featureSet.features[0].attributes[dojo.configData.likeField] === "") ? 0 : featureSet.features[0].attributes[dojo.configData.likeField];
                        attr[dojo.configData.likeField] = count + 1;
                        attr[statusParamObj.objField] = featureSet.features[0].attributes[statusParamObj.objField];
                        likeCount = attr[dojo.configData.likeField];
                        graphic = new Graphic(featureSet.features[0].geometry, null, attr, null);
                        statusParamObj.layerField.applyEdits(null, [graphic], null, lang.hitch(this, function (adds, updates, deletes) {
                            // if number of votes is updated on layer
                            if (updates[0].success) {
                                this._updateVotesInIssueList(statusParamObj.layerField.id, featureSet.features[0], attr[statusParamObj.objField], likeCount);
                                domAttr.set(query(".esriCTLikeCount", parentDiv)[0], "innerHTML", likeCount);
                                statusParamObj.layerField.refresh();
                            } else {
                                dojo.applicationUtils.showError(dojo.configData.i18n.myIssues.votesUpdateFailure);
                            }
                        }), function (err) {
                            dojo.applicationUtils.showError(dojo.configData.i18n.myIssues.votesUpdateFailure);
                        });
                    }), function (err) {
                        dojo.applicationUtils.showError(err.message);
                    });
                }));
            }
        },

        _updateVotesInIssueList: function (opLayerId, updatedFeature, featureObjId, likeCount) {
            var likeIconDiv, getObjVal, getlayerId, i, opLayerIndex;
            if (this.listContainer.children.length) {
                // loop for updating issue list votes count
                for (i = 0; i < this.listContainer.children.length; i++) {
                    likeIconDiv = query('.esriCTLikeIcon', this.listContainer.children[i])[0];
                    if (likeIconDiv) {
                        getObjVal = domAttr.get(likeIconDiv, "objId");
                        if (getObjVal) {
                            getObjVal = parseInt(getObjVal, 10);
                            getlayerId = domAttr.get(likeIconDiv, "layerId");

                            if ((featureObjId === getObjVal) && (getlayerId === opLayerId)) {
                                opLayerIndex = domAttr.get(likeIconDiv, "layerIndex");
                                opLayerIndex = parseInt(opLayerIndex, 10);
                                domAttr.set(query(".esriCTLikeCount", this.listContainer.children[i])[0], "innerHTML", likeCount);
                                this._updateLayerObject(opLayerIndex);
                            }
                        }
                    }
                }
            }
        },

        /**
        * update graphics array in operational layer object
        * @param{int} opLayerIndex is index of layer in opLayerArr
        * @memberOf widgets/my-issues/my-issues
        */
        _updateLayerObject: function (opLayerIndex) {
            this._queryOnLayer(this.opLayersArr[opLayerIndex]).then(lang.hitch(this, function (response) {
                this.opLayersArr[opLayerIndex].layerObject.graphics = response;
            }));
            this.onIssueUpdated(this.opLayersArr[opLayerIndex]);
        },

        /**
        * Show or hide like icon
        * @param{object} likeFlag
        * @param{array} attributes
        * @param{object} object id field from the layer
        * @param{object} parentDiv, container in which the icon would be inserted
        * @memberOf widgets/my-issues/my-issues
        */
        _showHideLikeIcon: function (statusParamObj, attributes, parentDiv, layerIndex) {
            var likeIcon, likeCount, likeIconContent;
            // if like field is present in the layer, show like icon else hide the icon
            if (statusParamObj.likeStatus) {
                likeIcon = query('.esriCTLikeIcon', parentDiv)[0];
                domAttr.set(likeIcon, "objId", attributes[statusParamObj.objField]);
                //binding layer id to identify which issue from which layer has to be updated
                domAttr.set(likeIcon, "layerId", statusParamObj.layerField.id);
                domAttr.set(likeIcon, "layerIndex", layerIndex);
                likeCount = attributes[dojo.configData.likeField];
                // if like count is not 0, display like count, else don't display anything for like count
                if (likeCount !== null || likeCount !== "") {
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
        * @param{array} attributes
        * @param{object} object id field from the layer
        * @param{object} parentDiv, container in which the icon would be inserted
        * @param{object} operationalLayer
        * @memberOf widgets/my-issues/my-issues
        */
        _locateIssueOnMap: function (attributes, objectIdField, parentDiv, operationalLayer) {
            var locateOnMapIcon, target, objectId, webmapInstanceId, param;
            locateOnMapIcon = query('.esriCTMapIcon', parentDiv)[0];
            domAttr.set(locateOnMapIcon, "objId", attributes[objectIdField]);
            domAttr.set(locateOnMapIcon, "webmapInstanceId", operationalLayer.webmapId);
            domAttr.set(locateOnMapIcon, "layerIndex", operationalLayer.layerIndex);
            on(locateOnMapIcon, "click", lang.hitch(this, function (evt) {
                target = evt.currentTarget || evt.srcElement;
                objectId = domAttr.get(target, "objId");
                webmapInstanceId = domAttr.get(target, "webmapInstanceId");
                param = {
                    "webMapId": webmapInstanceId,
                    "operationalLayerId": operationalLayer.layerObject.id,
                    "operationalLayerDetails": operationalLayer,
                    "itemInfo": null
                };
                this.featureObjectId = objectId;
                // show map view on click of icon in mobile view
                this.loadSelectedWebmap(param);
            }));
        },

        /**
        * clear graphic layer on map if exists else, add new graphic layer
        * @memberOf widgets/my-issues/my-issues
        */
        _clearGraphicsLayer: function (map) {
            this.selectedGraphicsLayer = map.getLayer("selectionGraphicsLayer");
            if (this.selectedGraphicsLayer) {
                this.selectedGraphicsLayer.clear();
            } else {
                this.selectedGraphicsLayer = new GraphicsLayer();
                this.selectedGraphicsLayer.id = "selectionGraphicsLayer";
                map.addLayer(this.selectedGraphicsLayer);
            }
        },

        /**
        * This function is used to highlight feature.
        * @param{object} layer
        * @param{object} objectId
        * @memberOf widgets/my-issues/my-issues
        */
        highLightFeature: function (map, layer, objectId) {
            var esriQuery, highlightSymbol;
            this.featureObjectId = null;
            // clear graphics layer
            this._clearGraphicsLayer(map);
            esriQuery = new Query();
            esriQuery.objectIds = [parseInt(objectId, 10)];
            esriQuery.returnGeometry = true;
            layer.queryFeatures(esriQuery, lang.hitch(this, function (featureSet) {
                if (featureSet.features[0]) {
                    highlightSymbol = this._getHighLightSymbol(featureSet.features[0], layer);
                    // add highlight symbol to graphics layer
                    this.selectedGraphicsLayer.add(highlightSymbol);
                }
            }), function (err) {
                dojo.applicationUtils.showError(err.message);
            });
        },

        /**
        * Create crosshair symbol to highlight point feature
        * @param{object} symbol path
        * @param{object} symbol size
        * @memberOf widgets//my-issues/my-issues
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
        * @memberOf widgets//my-issues/my-issues
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
        * @memberOf widgets/my-issues/my-issues
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
        * @memberOf widgets/my-issues/my-issues
        */
        loadSelectedWebmap: function (param) {
            return param;
        },

        /**
        * Destroy instance
        * @memberOf widgets/my-issues/my-issues
        */
        destroyInstance: function () {
            this.destroy();
        }
    });
});