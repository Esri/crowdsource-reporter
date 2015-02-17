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
    "esri/graphic",
    "esri/layers/FeatureLayer",
    "esri/tasks/QueryTask",
    "esri/tasks/query",
    "widgets/issue-comments/issue-comments"
], function (declare, Deferred, dom, domConstruct, domStyle, domAttr, domClass, lang, on, string, query, template, issueItemTemplate, issueDetailsTemplate, all, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, arcgisUtils, Graphic, FeatureLayer, QueryTask, Query, IssueComments) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,
        opLayersArr: [],
        isNoFeatureFound: null,
        /**
        * Initialize widget
        * @memberOf widgets/my-issues/my-issues
        */
        postCreate: function () {

            // Attach event on close button of my issues container.
            on(this.closeButton, "click", lang.hitch(this, function (evt) {
                this.hideMyIssuesContainer(evt);
            }));
            //initialize issue comment widget
            this.issueCommentWidget = new IssueComments({ "parentContainer": this.domNode });
            this._createMyIssuesLayerList();
        },

        /**
        * display My issues list container
        * @memberOf widgets/my-issues/my-issues
        */
        showMyIssuesContainer: function () {
            domStyle.set(this.domNode, "display", "block");
            this.issueDetailsHelper.resizeIssuesContainer(this.listDetailedContainer);
        },

        /**
        * Hide my issues list container
        * @memberOf widgets/my-issues/my-issues
        */
        hideMyIssuesContainer: function (evt) {
            domStyle.set(this.domNode, "display", "none");
            this.onHideMyIssuesContainer();
        },

        /**
        * Event on hiding my issues container
        * @memberOf widgets/my-issues/my-issues
        */
        onHideMyIssuesContainer: function (evt) {
            return evt;
        },

        /**
        * Create My issues list
        * @memberOf widgets/my-issues/my-issues
        */
        _createMyIssuesLayerList: function () {
            var webmapOpLayerArr, layerResponseDef = [], i, j, index = 0;
            this.isNoFeatureFound = true;
            this.opLayersArr = [];
            this.listContainerTitle.innerHTML = dojo.configData.i18n.myIssues.title;
            domStyle.set(this.listLoadingIndicator, "display", "block");
            domConstruct.empty(this.listContainer);
            this.selectedGraphicsLayer = this.map.getLayer("selectionGraphicsLayer");
            domConstruct.empty(this.listDetailedContainer);
            // get all operational layer from all webmaps
            for (i = 0; i < this.webmapList.length; i++) {
                webmapOpLayerArr = this.webmapList[i][1].itemInfo.itemData.operationalLayers;
                for (j = 0; j < webmapOpLayerArr.length; j++) {
                    // add layer to opLayersArr array, if it has configured reported by field to identify creator of issue
                    if (this.issueDetailsHelper.isFieldAvailable(webmapOpLayerArr[j].layerObject, dojo.configData.reportedByField)) {
                        webmapOpLayerArr[j].webmapId = this.webmapList[i][1].itemInfo.item.id;
                        // add layer index to identify layer in opLayersArr array
                        webmapOpLayerArr[j].layerIndex = index;
                        webmapOpLayerArr[j].webmapTitle = this.webmapList[i][1].itemInfo.item.title;
                        index++;
                        this.opLayersArr.push(webmapOpLayerArr[j]);
                        layerResponseDef.push(this._queryOnLayer(webmapOpLayerArr[j]));
                    }
                }
            }
            // display message if no layer has configured reported by field
            if (!this.opLayersArr.length) {
                domConstruct.create("div", {
                    "innerHTML": dojo.configData.i18n.myIssues.noResultsFound,
                    "class": "esriCTNoIssuesDiv"
                }, this.listContainer);
                domStyle.set(this.listLoadingIndicator, "display", "none");
            } else {
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
            }
            // on window resize update the height of issue list based on screen size and headers and footers.
            // As in case of long header title, header height need to be adjusted.
            on(window, "resize", lang.hitch(this, function () {
                this.issueDetailsHelper.resizeIssuesContainer(this.listDetailedContainer);
            }));
        },

        /**
        * Update my issue list when new issue is added
        * @param{object} data contains layer info, on which new issue has reported
        * @param{object} updatedIssue contains details of feature, which has been updated.
        * @memberOf widgets/my-issues/my-issues
        */
        updateIssueList: function (data, updatedIssue) {
            var layerIndex = this._getSelectedLayer(data.webMapId, data.operationalLayerId, data.operationalLayerDetails.title);
            if (layerIndex || layerIndex === 0) {
                if (updatedIssue) {
                    // check if updated issue is reported by logged in user
                    if (updatedIssue.attributes[dojo.configData.reportedByField] !== dojo.configData.logInDetails.processedUserName) {
                        return;
                    }
                }
                // query on layer to get updated feature array, if layer has configured reported by field
                if (this.issueDetailsHelper.isFieldAvailable(this.opLayersArr[layerIndex].layerObject, dojo.configData.reportedByField)) {
                    domStyle.set(this.listLoadingIndicator, "display", "block");
                    domConstruct.empty(this.listContainer);
                    this._queryOnLayer(this.opLayersArr[layerIndex]).then(lang.hitch(this, function (result) {
                        if (result) {
                            // update graphics array
                            this.opLayersArr[layerIndex].layerObject.graphics = result;
                        }
                        this._fetchIssueDetailsFromLayers(this.opLayersArr);
                    }));
                }
            }
        },

        /**
        * Query layer to get updated issue list
        * @param{object} layerObject is operational layer object
        * @memberOf widgets/my-issues/my-issues
        */
        _queryOnLayer: function (opLayer) {
            var queryTask, deferred, parameters, queryString, dateobj = new Date().getTime().toString();
            deferred = new Deferred();
            parameters = new Query();
            // query with configured reported by field to get list of issues reported by logged in user
            queryString = dojo.configData.reportedByField + "='" + dojo.configData.logInDetails.processedUserName + "' AND " + dateobj + "=" + dateobj;
            // add layer definition in query parameters if it is available in layer object
            if (opLayer.layerObject.defaultDefinitionExpression) {
                queryString += " AND " + opLayer.layerObject.defaultDefinitionExpression;
            }
            parameters.where = queryString;
            parameters.outFields = ["*"];
            queryTask = new QueryTask(opLayer.url);
            // query on layer to get all issue reported by logged in user
            queryTask.execute(parameters, function (response) {
                deferred.resolve(response.features);
            }, function (err) {
                deferred.resolve();
            });
            return deferred;
        },

        /**
        * Get instance of layer
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
        * Fetch issue details from all layers
        * @param{object} layerObject is operational layer object
        * @memberOf widgets/my-issues/my-issues
        */
        _fetchIssueDetailsFromLayers: function (oplayersArr) {
            var i;
            domConstruct.empty(this.listContainer);
            for (i = 0; i < oplayersArr.length; i++) {
                if (oplayersArr[i]) {
                    this._fetchIssueDetails(oplayersArr[i]);
                }
            }
        },

        /**
        * Fetch feature layer graphics and info popup header fields to be displayed in the list
        * @param{object} operationalLayer details
        * @memberOf widgets/my-issues/my-issues
        */
        _fetchIssueListData: function (operationalLayer) {
            var operationalLayerObj = operationalLayer.layerObject, relatedTable, layerId,
                lastIndex, relatedTableURL, layer, deferred = new Deferred();
            // if comment field is present in config file and the layer contains related table, fetch the first related table URL
            if (dojo.configData.commentField && operationalLayerObj.relationships.length > 0) {
                layerId = operationalLayerObj.relationships[0].relatedTableId;
                lastIndex = operationalLayerObj.url.lastIndexOf('/');
                layer = operationalLayerObj.url.substr(0, lastIndex + 1);
                relatedTableURL = layer + layerId;
                relatedTable = new FeatureLayer(relatedTableURL);
                if (!relatedTable.loaded) {
                    on(relatedTable, "load", lang.hitch(this, function (evt) {
                        this._relatedTableLoaded(relatedTable, operationalLayer, deferred);
                    }));
                } else {
                    this._relatedTableLoaded(relatedTable, operationalLayer, deferred);
                }
            } else {
                operationalLayer.commentFlag = false;
                deferred.resolve(operationalLayer);
            }
            return deferred;
        },

        /**
        * Check if field for comments is present in the related table
        * @param{object} relatedTable details
        * @param{object} operationalLayer details
        * @param{object} deferred
        * @memberOf widgets/my-issues/my-issues
        */
        _relatedTableLoaded: function (relatedTable, operationalLayer, deferred) {
            var commentIconFlag = false, k;
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
        },

        /**
        * Fetch feature layer graphics and info popup header fields to be displayed in the list
        * @param{object} operationalLayer details
        * @memberOf widgets/my-issues/my-issues
        */
        _fetchIssueDetails: function (operationalLayer) {
            var i, featureArray = [], operationalLayerObj = operationalLayer.layerObject, likeFlag = false,
                attributes, flagObject = {};
            // push layer features in featureArray
            for (i = operationalLayerObj.graphics.length - 1; i >= 0; i--) {
                attributes = operationalLayerObj.graphics[i].attributes;
                featureArray.push({
                    "attributes": attributes
                });
            }
            // check if configured like/vote field is available in layer
            if (dojo.configData.likeField && this.issueDetailsHelper.isFieldAvailable(operationalLayerObj, dojo.configData.likeField)) {
                likeFlag = true;
            }
            flagObject.like = likeFlag;
            flagObject.comment = operationalLayer.commentFlag;
            this._displayIssueList(featureArray, operationalLayer, flagObject);
        },

        /**
        * Display list of issues in right panel
        * @param{array} featureSet
        * @param{object} operationalLayer details
        * @param{object} flagObject for like icon,comments icon, extent change
        * @memberOf widgets/my-issues/my-issues
        */
        _displayIssueList: function (featureSet, operationalLayer, flagObject) {
            var i, statusParamObj = {
                likeStatus: flagObject.like,
                commentStatus: flagObject.comment,
                objField: operationalLayer.layerObject.objectIdField,
                layerField: operationalLayer.layerObject
            };
            // check if details exist in info popup
            if (operationalLayer.popupInfo && featureSet.length > 0) {
                this.isNoFeatureFound = false;
                // loop through the features to get feature details
                for (i = 0; i < featureSet.length; i++) {
                    // get header title of each issue details
                    this._createIssueTemplate(featureSet[i], statusParamObj, operationalLayer);
                }
            } else if (this.isNoFeatureFound && operationalLayer.layerIndex === this.opLayersArr.length - 1) {
                // display message in my issues panel if no layer has any issue reported by logged in user
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
            var issueTitleName, issueListTemplateString, parentDiv, setIssueObj, commentParams, issueDetailsParam;
            issueTitleName = this.issueDetailsHelper.getIssueDetailsTitle(feature.attributes, operationalLayer, true);
            issueListTemplateString = string.substitute(issueItemTemplate, {
                IssueTitle: issueTitleName,
                LayerTitle: operationalLayer.title,
                WebMapTitle: operationalLayer.webmapTitle
            });
            // Checking if IE Version is less than 9
            if (dojo.isIE < 9) {
                parentDiv = domConstruct.toDom(issueListTemplateString);
            } else {
                parentDiv = domConstruct.toDom(issueListTemplateString).childNodes[0];
            }
            setIssueObj = query('.esriCTIssueListHeader', parentDiv)[0];
            // bind objectid to issue header panel
            if (setIssueObj) {
                domAttr.set(setIssueObj, "objId", feature.attributes[statusParamObj.objField]);
                domAttr.set(setIssueObj, "layerIndex", operationalLayer.layerIndex);
            }
            this.listContainer.appendChild(parentDiv);
            this._showHideLikeIcon(statusParamObj, feature.attributes, parentDiv, operationalLayer.layerIndex);

            domAttr.set(query('.esriCTLikeIcon', parentDiv)[0], "title", dojo.configData.i18n.issueDetailsHelper.likeTooltip);
            domAttr.set(query('.esriCTCommentsIcon', parentDiv)[0], "title", dojo.configData.i18n.issueDetailsHelper.commentTooltip);
            domAttr.set(query('.esriCTMapIcon', parentDiv)[0], "title", dojo.configData.i18n.issueDetailsHelper.viewOnMapTooltip);

            commentParams = {
                "attributes": feature.attributes,
                "objectId": statusParamObj.objField,
                "parentNode": parentDiv,
                "commentFlag": statusParamObj.commentStatus,
                "layer": statusParamObj.layerField,
                "relatedTable": operationalLayer.relatedTable,
                "issueTitle": issueTitleName
            };
            issueDetailsParam = {
                "issueCommentWidget": this.issueCommentWidget,
                "isHighlightFeature": false
            };
            this.issueDetailsHelper.showHideCommentIcon(commentParams, issueDetailsParam);
            this._locateIssueOnMap(feature.attributes, statusParamObj.objField, parentDiv, operationalLayer);
            // show issue details on down arrow click
            this._handleIssueHeaderClick(parentDiv, statusParamObj);
        },


        /**
        * Event to display selected issue details in right panel when issue header is clicked
        * @param{object} statusParamObj
        * @param{object} parentDiv
        * @memberOf widgets/my-issues/my-issues
        */
        _handleIssueHeaderClick: function (parentDiv, statusParamObj) {
            var issueDetailsHeader, getIssueObj, getIssueLayerObj;
            // click event for opening the issue detailed view
            issueDetailsHeader = query('.esriCTIssueListHeader', parentDiv)[0];
            // binding event only if the queried node found
            if (issueDetailsHeader) {
                on(issueDetailsHeader, "click", lang.hitch(this, function (evt) {
                    getIssueObj = domAttr.get(issueDetailsHeader, "objId");
                    getIssueLayerObj = domAttr.get(issueDetailsHeader, "layerIndex");
                    this.operationalLayerDetails = this.opLayersArr[parseInt(getIssueLayerObj, 10)];
                    // if issue object id found
                    if (getIssueObj) {
                        this._getIssueFeatureSet(parentDiv, getIssueObj, statusParamObj);
                    }
                }));
            }
        },

        /**
        * Get feature from layer and display selected issue details in right panel
        * @param{object} statusParamObj
        * @param{string} parentDiv, getIssueObj
        * @memberOf widgets/my-issues/my-issues
        */
        _getIssueFeatureSet: function (parentDiv, getIssueObj, statusParamObj) {
            var issueTitleName, featureLayerQuery, queryTask;
            featureLayerQuery = new Query();
            featureLayerQuery.objectIds = [getIssueObj];
            featureLayerQuery.outFields = ["*"];

            queryTask = new QueryTask(statusParamObj.layerField.url);
            queryTask.execute(featureLayerQuery, lang.hitch(this, function (response) {
                var keyfield;
                // loop through the attributes and assign configured value to attributes with null values
                for (keyfield in response.features[0].attributes) {
                    // Check if features attributes value is null
                    if (response.features[0].attributes.hasOwnProperty(keyfield)) {
                        if (response.features[0].attributes[keyfield] === null || response.features[0].attributes[keyfield] === "") {
                            response.features[0].attributes[keyfield] = dojo.configData.showNullValueAs;
                        }
                    }
                }
                issueTitleName = this.issueDetailsHelper.getIssueDetailsTitle(response.features[0].attributes, this.operationalLayerDetails, true);
                this._showIssueDetails(parentDiv, response.features[0].attributes, statusParamObj, issueTitleName);
            }), function (err) {
                dojo.applicationUtils.showError(err.message);
            });
        },

        /**
        * Display selected issue details in right panel
        * @param{array} featureSet
        * @param{object} statusParamObj
        * @param{string} titleName,parentDiv
        * @memberOf widgets/my-issues/my-issues
        */
        _showIssueDetails: function (parentDiv, featureSet, statusParamObj, issueTitleName) {
            var issueDetailsTemplateString, detailsData, objectID, issueDetailsHeader, commentParams, descriptionValue, issueDetailsParam, displayPopupParam;
            domClass.add(this.listContainer, "esriCTHidden");
            domClass.remove(this.listDetailedContainer, "esriCTHidden");
            issueDetailsTemplateString = string.substitute(issueDetailsTemplate, {
                IssueTitle: issueTitleName
            });
            domClass.remove(this.listDetailedContainer, "esriCTHidden");
            // Checking if IE Version is less than 9
            if (dojo.isIE < 9) {
                parentDiv = domConstruct.toDom(issueDetailsTemplateString);
            } else {
                parentDiv = domConstruct.toDom(issueDetailsTemplateString).childNodes[0];
            }
            this.listDetailedContainer.appendChild(parentDiv);
            // Click event for closing the issue details panel
            issueDetailsHeader = query('.esriCTIssueDetailsHeader', parentDiv)[0];
            // binding event if only the queried node found
            if (issueDetailsHeader) {
                on(issueDetailsHeader, "click", lang.hitch(this, function (evt) {
                    this.issueDetailsHelper.hideIssueDetailsPanel(this.listDetailedContainer, this.listContainer);
                }));
            }

            domAttr.set(query('.esriCTLikeIcon', parentDiv)[0], "title", dojo.configData.i18n.issueDetailsHelper.likeTooltip);
            domAttr.set(query('.esriCTCommentsIcon', parentDiv)[0], "title", dojo.configData.i18n.issueDetailsHelper.commentTooltip);
            domAttr.set(query('.esriCTMapIcon', parentDiv)[0], "title", dojo.configData.i18n.issueDetailsHelper.viewOnMapTooltip);

            detailsData = query('.esriCTDetailsData', parentDiv)[0];
            if (this.operationalLayerDetails.popupInfo && this.operationalLayerDetails.popupInfo.description) {
                descriptionValue = this.issueDetailsHelper.getDescription(featureSet, this.operationalLayerDetails);
                //create a div with popup info description and add it to details div
                domConstruct.create("div", {
                    "innerHTML": descriptionValue,
                    "class": "esriCTCustomPopupDiv"
                }, detailsData);
            } else if (this.operationalLayerDetails.popupInfo && this.operationalLayerDetails.popupInfo.fieldInfos && this.operationalLayerDetails.popupInfo.fieldInfos.length > 0) {
                displayPopupParam = {
                    "detailsData": detailsData,
                    "featureSet": featureSet,
                    "operationalLayer": this.operationalLayerDetails,
                    "isSetDateFormat": true
                };
                this.issueDetailsHelper.displayPopupFields(displayPopupParam);
            } else {
                domConstruct.create("div", {
                    "innerHTML": dojo.configData.i18n.myIssues.noResultsFound,
                    "class": "esriCTNoIssuesDiv"
                }, detailsData);
            }
            // Show Attachments if layer has attachments and showAttachments is set to true in pop-up configuration.
            if (statusParamObj.layerField.hasAttachments && this.operationalLayerDetails.popupInfo.showAttachments) {
                // Get object id for the feature
                objectID = featureSet[statusParamObj.objField];
                this.issueDetailsHelper.showAttachments(statusParamObj.layerField, parentDiv, objectID, dojo.configData.i18n.issueDetailsHelper.photoAttachmentHeader);
            }
            this.issueDetailsHelper.resizeIssuesContainer(this.listDetailedContainer);
            this._showHideLikeIcon(statusParamObj, featureSet, parentDiv, this.operationalLayerDetails.layerIndex);
            commentParams = {
                "attributes": featureSet,
                "objectId": statusParamObj.objField,
                "parentNode": parentDiv,
                "commentFlag": statusParamObj.commentStatus,
                "layer": statusParamObj.layerField,
                "relatedTable": this.operationalLayerDetails.relatedTable,
                "issueTitle": issueTitleName
            };
            issueDetailsParam = {
                "issueCommentWidget": this.issueCommentWidget,
                "isHighlightFeature": false
            };
            this.issueDetailsHelper.showHideCommentIcon(commentParams, issueDetailsParam);
            this._locateIssueOnMap(featureSet, statusParamObj.objField, parentDiv, this.operationalLayerDetails);
        },

        /**
        * Update votes field for issue when user clicks on the like button
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
                                this._updateVotesInIssueList(statusParamObj.layerField.id, attr[statusParamObj.objField], likeCount);
                                domAttr.set(query(".esriCTLikeCount", parentDiv)[0], "innerHTML", likeCount);
                                statusParamObj.layerField.refresh();
                            } else {
                                dojo.applicationUtils.showError(dojo.configData.i18n.issueDetailsHelper.votesUpdateFailure);
                            }
                        }), function (err) {
                            dojo.applicationUtils.showError(dojo.configData.i18n.issueDetailsHelper.votesUpdateFailure);
                        });
                    }), function (err) {
                        dojo.applicationUtils.showError(err.message);
                    });
                }));
            }
        },

        /**
        * Update like count in issue list
        * @param{int} opLayerId is layer id
        * @param{int} featureObjId is feature id
        * @param{int} likeCount is current value of like field of feature
        * @memberOf widgets/my-issues/my-issues
        */
        _updateVotesInIssueList: function (opLayerId, featureObjId, likeCount) {
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
        * Update graphics array in operational layer object
        * @param{int} opLayerIndex is index of layer in opLayerArr
        * @memberOf widgets/my-issues/my-issues
        */
        _updateLayerObject: function (opLayerIndex) {
            this._queryOnLayer(this.opLayersArr[opLayerIndex]).then(lang.hitch(this, function (response) {
                this.opLayersArr[opLayerIndex].layerObject.graphics = response;
                this.onIssueUpdated(this.opLayersArr[opLayerIndex]);
            }));
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
                if (likeCount !== null && likeCount !== "") {
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
        * Highlight feature on map
        * @param{object} map
        * @param{object} layer
        * @param{object} objectId
        * @memberOf widgets/my-issues/my-issues
        */
        highLightFeature: function (map, layer, objectId) {
            this.selectedGraphicsLayer = map.getLayer("selectionGraphicsLayer");
            this.issueDetailsHelper.highLightFeatureOnClick(layer, objectId, this.selectedGraphicsLayer, map);
        },

        /**
        * Show map view when user clicks on go to map icon in mobile view
        * @memberOf widgets/my-issues/my-issues
        */
        loadSelectedWebmap: function (param) {
            return param;
        },

        /**
        * Issue is updated
        * @memberOf widgets/my-issues/my-issues
        */
        onIssueUpdated: function (updatedLayer) {
            return updatedLayer;
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