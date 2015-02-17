/*global define,dojo,dojoConfig,alert,moment,$ */
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
    "esri/graphic",
    "esri/layers/FeatureLayer",
    "esri/tasks/query",
    "widgets/issue-comments/issue-comments"
], function (declare, dom, domConstruct, domStyle, domAttr, domClass, lang, on, string, query, template, issueItemTemplate, issueDetailsTemplate, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Graphic, FeatureLayer, Query, IssueComments) {
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
        * If Comments relationship exist as per the configured field then it will get the related table info for further use
        * Considering only the first related table although the layer has many related table
        * @memberOf widgets/issue-wall/issue-wall
        */
        _getRelatedTableInfo: function () {
            var relatedTableURL, operationalLayer;
            operationalLayer = this.map.getLayer(this.operationalLayerId);
            // if comment field is present in config file and the layer contains related table, fetch the first related table URL
            if (dojo.configData.commentField && operationalLayer.relationships.length > 0) {
                // Construct the related table URL form operational layer URL and the related table id
                // We are considering only first related table although the layer has many related table.
                // Hence, we are fetching relatedTableId from relationships[0] ie:"operationalLayer.relationships[0].relatedTableId"
                relatedTableURL = operationalLayer.url.substr(0, operationalLayer.url.lastIndexOf('/') + 1) + operationalLayer.relationships[0].relatedTableId;
                this._commentsTable = new FeatureLayer(relatedTableURL);
                if (!this._commentsTable.loaded) {
                    on(this._commentsTable, "load", lang.hitch(this, function (evt) {
                        this._commentsTableLoaded();
                    }));
                } else {
                    this._commentsTableLoaded();
                }
            } else {
                this._createIssueList();
            }
        },

        _commentsTableLoaded: function () {
            var k;
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
            // On window resize update the height of issue details based on screen size and headers and footers.
            // As in case of long header title, header height need to be adjusted.
            on(window, "resize", lang.hitch(this, function () {
                this.issueDetailsHelper.resizeIssuesContainer(this.listDetailedContainer);
            }));
        },

        /**
        * Load feature layer and fetch the graphics from that layer
        * @param{object} operationalLayer
        * @memberOf widgets/issue-wall/issue-wall
        */
        _loadFeatureLayer: function (operationalLayer, extentChangeFlag) {
            domStyle.set(this.listLoadingIndicator, "display", "block");
            this.featureLayer = new FeatureLayer(operationalLayer.url);
            if (!this.featureLayer.loaded) {
                on(this.featureLayer, "load", lang.hitch(this, function (evt) {
                    setTimeout(lang.hitch(this, function () {
                        this._featureLayerLoaded(operationalLayer, extentChangeFlag);
                    }), 1000);
                }));
            } else {
                this._featureLayerLoaded(operationalLayer, extentChangeFlag);
            }
        },

        /**
        * Fetch issue details from the feature layer after the layer is loaded
        * @param{object} operationalLayer
        * @param{boolean} extentChangeFlag
        * @memberOf widgets/issue-wall/issue-wall
        */
        _featureLayerLoaded: function (operationalLayer, extentChangeFlag) {
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
                if (!extentChangeFlag) {
                    domConstruct.empty(this.listDetailedContainer);
                    domClass.add(this.listDetailedContainer, "esriCTHidden");
                    domClass.remove(this.listContainer, "esriCTHidden");
                }
            }
            domAttr.set(this.listContainerTitle, "innerHTML", this.operationalLayerDetails.title);
        },

        /**
        * Fetch feature layer graphics and info popup header fields to be displayed in the list
        * @param{object} operationalLayer details
        * @param{object} extentChangeFlag - indicates if map extent has been changed
        * @memberOf widgets/issue-wall/issue-wall
        */
        _fetchIssueDetails: function (operationalLayer, extentChangeFlag) {
            var j, x, featureArray = [], likeFlag = false, fields, fieldValue, attributes, objectIdFieldValue, flagObject = {};
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
                        // get object id field from the layer
                        objectIdFieldValue = operationalLayer.graphics[j].attributes[operationalLayer.objectIdField];
                        // if like field is present in the config file and the layer contains like field, set the flag to true
                        if (dojo.configData.likeField && (operationalLayer.fields[x].name === dojo.configData.likeField)) {
                            likeFlag = true;
                        }
                    }

                    // perform sorting based on object id field
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
            this._displayIssueList(featureArray, operationalLayer, flagObject, this._commentsTable);
        },

        /**
        * Display list of issues in right panel
        * @param{array} featureSet
        * @param{object} operationalLayer details
        * @param{object} flagObject for like icon,comments icon, extent change
        * @param{object} relatedTable - related table data
        * @memberOf widgets/issue-wall/issue-wall
        */
        _displayIssueList: function (featureSet, operationalLayer, flagObject, relatedTable) {
            var i, commentParams, issueListTemplateString, parentDiv, issueTitleName, statusParamObj = {
                likeStatus: flagObject.like,
                commentStatus: flagObject.comment,
                objField: operationalLayer.objectIdField,
                layerField: operationalLayer
            }, setIssueObj, issueDetailsParam;
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
                    issueTitleName = this.issueDetailsHelper.getIssueDetailsTitle(featureSet[i].attributes, this.operationalLayerDetails, true);
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
                    setIssueObj = query('.esriCTIssueListHeader', parentDiv)[0];
                    // bind object id field to the issue header
                    if (setIssueObj) {
                        domAttr.set(setIssueObj, "objId", featureSet[i].attributes[statusParamObj.objField]);
                    }
                    this.listContainer.appendChild(parentDiv);
                    this._showHideLikeIcon(statusParamObj, featureSet[i].attributes, parentDiv);
                    // add tooltips to like, comment and view on map icon
                    domAttr.set(query('.esriCTLikeIcon', parentDiv)[0], "title", dojo.configData.i18n.issueDetailsHelper.likeTooltip);
                    domAttr.set(query('.esriCTCommentsIcon', parentDiv)[0], "title", dojo.configData.i18n.issueDetailsHelper.commentTooltip);
                    domAttr.set(query('.esriCTMapIcon', parentDiv)[0], "title", dojo.configData.i18n.issueDetailsHelper.viewOnMapTooltip);

                    commentParams = {
                        "attributes": featureSet[i].attributes,
                        "objectId": statusParamObj.objField,
                        "parentNode": parentDiv,
                        "commentFlag": statusParamObj.commentStatus,
                        "layer": operationalLayer,
                        "relatedTable": relatedTable,
                        "issueTitle": issueTitleName
                    };
                    issueDetailsParam = {
                        "issueCommentWidget": this.issueCommentWidget,
                        "isHighlightFeature": true,
                        "selectedGraphicsLayer": this.selectedGraphicsLayer,
                        "map": this.map
                    };
                    this.issueDetailsHelper.showHideCommentIcon(commentParams, issueDetailsParam);
                    this._locateIssueOnMap(featureSet[i].attributes, parentDiv, operationalLayer);
                    // show issue details on down arrow click
                    this._handleIssueHeaderClick(parentDiv, statusParamObj);
                }
                // show issue details on click of feature on map
                this._attachFeatureClickEvent(parentDiv, statusParamObj);
                $(".esriCTIssueListContainer").scrollTop(0);
            } else {
                domConstruct.create("div", {
                    "innerHTML": dojo.configData.i18n.issueWall.noResultsFound,
                    "class": "esriCTNoIssuesDiv"
                }, this.listContainer);
            }
            domStyle.set(this.listLoadingIndicator, "display", "none");
        },

        /**
        * Click event to display selected issue details in the right panel
        * @param{object} parentDiv
        * @param{object} statusParamObj
        * @memberOf widgets/issue-wall/issue-wall
        */
        _handleIssueHeaderClick: function (parentDiv, statusParamObj) {
            var issueItemHeader, getIssueObj;
            // click event for opening the issue detailed view
            issueItemHeader = query('.esriCTIssueListHeader', parentDiv)[0];
            // binding event only if the queried node found
            if (issueItemHeader) {
                on(issueItemHeader, "click", lang.hitch(this, function (evt) {
                    getIssueObj = domAttr.get(issueItemHeader, "objId");
                    // if issue object id found
                    if (getIssueObj) {
                        this._getIssueFeatureSet(parentDiv, getIssueObj, statusParamObj);
                    }
                }));
            }
        },

        /**
        * Get feature from layer and Display selected issue details of right panel
        * @param{string} parentDiv
        * @param{string} getIssueObj
        * @param{object} statusParamObj
        * @memberOf widgets/issue-wall/issue-wall
        */
        _getIssueFeatureSet: function (parentDiv, getIssueObj, statusParamObj) {
            var issueTitleName, featureLayerQuery;
            featureLayerQuery = new Query();
            featureLayerQuery.outSpatialReference = this.map.spatialReference;
            featureLayerQuery.objectIds = [getIssueObj];
            statusParamObj.layerField.queryFeatures(featureLayerQuery, lang.hitch(this, function (attr) {
                var keyfield;
                // loop through the attributes and assign configured null value to attributes with null values
                for (keyfield in attr.features[0].attributes) {
                    // Check if feature attributes value is null
                    if (attr.features[0].attributes.hasOwnProperty(keyfield)) {
                        if (attr.features[0].attributes[keyfield] === null || attr.features[0].attributes[keyfield] === "") {
                            attr.features[0].attributes[keyfield] = dojo.configData.showNullValueAs;
                        }
                    }
                }
                this.issueDetailsHelper.highLightFeatureOnClick(statusParamObj.layerField, getIssueObj, this.selectedGraphicsLayer, this.map);
                issueTitleName = this.issueDetailsHelper.getIssueDetailsTitle(attr.features[0].attributes, this.operationalLayerDetails, true);
                this._showIssueDetails(parentDiv, attr.features[0].attributes, statusParamObj, issueTitleName, this._commentsTable);
            }), function (err) {
                dojo.applicationUtils.showError(err.message);
            });
        },

        /**
        * Display selected issue details in right panel
        * @param{array} featureSet
        * @param{object} statusParamObj
        * @param{string} issueTitleName,parentDiv
        * @memberOf widgets/issue-wall/issue-wall
        */
        _showIssueDetails: function (parentDiv, featureSet, statusParamObj, issueTitleName, relatedTable) {
            var issueDetailsTemplateString, detailsData, objectID, issueDetailsheader, descriptionValue, commentParams, issueDetailsParam, displayPopupParam;
            domClass.add(this.listContainer, "esriCTHidden");
            domClass.remove(this.listDetailedContainer, "esriCTHidden");
            issueDetailsTemplateString = string.substitute(issueDetailsTemplate, {
                IssueTitle: issueTitleName
            });
            domConstruct.empty(this.listDetailedContainer);
            // Checking if IE Version is less than 9
            if (dojo.isIE < 9) {
                parentDiv = domConstruct.toDom(issueDetailsTemplateString);
            } else {
                parentDiv = domConstruct.toDom(issueDetailsTemplateString).childNodes[0];
            }
            this.listDetailedContainer.appendChild(parentDiv);

            issueDetailsheader = query('.esriCTIssueDetailsHeader', parentDiv)[0];
            // If queried node exists, bind click event to close issue details panel
            if (issueDetailsheader) {
                on(issueDetailsheader, "click", lang.hitch(this, function (evt) {
                    this.issueDetailsHelper.hideIssueDetailsPanel(this.listDetailedContainer, this.listContainer);
                }));
            }
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
                    "innerHTML": dojo.configData.i18n.issueWall.noResultsFound,
                    "class": "esriCTNoIssuesDiv"
                }, detailsData);
            }
            // Create Attachments if layer has attachments and showAttachments is set to true in pop-up configuration.
            if (statusParamObj.layerField.hasAttachments && this.operationalLayerDetails.popupInfo.showAttachments) {
                // Get object id for the feature
                objectID = featureSet[statusParamObj.objField];
                this.issueDetailsHelper.showAttachments(statusParamObj.layerField, parentDiv, objectID, dojo.configData.i18n.issueDetailsHelper.photoAttachmentHeader);
            }
            this.issueDetailsHelper.resizeIssuesContainer(this.listDetailedContainer);
            this._showHideLikeIcon(statusParamObj, featureSet, parentDiv);

            domAttr.set(query('.esriCTLikeIcon', parentDiv)[0], "title", dojo.configData.i18n.issueDetailsHelper.likeTooltip);
            domAttr.set(query('.esriCTCommentsIcon', parentDiv)[0], "title", dojo.configData.i18n.issueDetailsHelper.commentTooltip);
            domAttr.set(query('.esriCTMapIcon', parentDiv)[0], "title", dojo.configData.i18n.issueDetailsHelper.viewOnMapTooltip);

            commentParams = {
                "attributes": featureSet,
                "objectId": statusParamObj.objField,
                "parentNode": parentDiv,
                "commentFlag": this._hasCommentsTable,
                "layer": statusParamObj.layerField,
                "relatedTable": relatedTable,
                "issueTitle": issueTitleName
            };
            issueDetailsParam = {
                "issueCommentWidget": this.issueCommentWidget,
                "isHighlightFeature": true,
                "selectedGraphicsLayer": this.selectedGraphicsLayer,
                "map": this.map
            };
            this.issueDetailsHelper.showHideCommentIcon(commentParams, issueDetailsParam);
            this._locateIssueOnMap(featureSet, parentDiv, statusParamObj.layerField);
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
                // Remove the layer click handler if it already exists
                if (this._layerClickHandler) {
                    this._layerClickHandler.remove();
                }
                this._layerClickHandler = on(statusParamObj.layerField, "click", lang.hitch(this, function (evt) {
                    featureObjId = evt.graphic.attributes[statusParamObj.objField];
                    this.issueDetailsHelper.highLightFeatureOnClick(statusParamObj.layerField, featureObjId, this.selectedGraphicsLayer, this.map);
                    issueDetailsPanel = query(".esriCTListDetails", this.listDetailedContainer);
                    if (issueDetailsPanel) {
                        domConstruct.destroy(issueDetailsPanel);
                    }
                    this.featureSelectedOnMapClick();
                    // If object id of the issue is retrieved successfully
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
            // If like icon is available or not
            if (likeIcon) {
                // Attach click event on like icon
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
        * Show or hide like icon
        * @param{object} statusParamObj
        * @param{array} attributes
        * @param{object} parentDiv - container in which the icon would be inserted
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
        * @param{object} parentDiv - container in which the icon is present
        * @param{object} operationalLayer
        * @memberOf widgets/issue-wall/issue-wall
        */
        _locateIssueOnMap: function (attributes, parentDiv, operationalLayer) {
            var locateOnMapIcon, target, objectId;
            locateOnMapIcon = query('.esriCTMapIcon', parentDiv)[0];
            domAttr.set(locateOnMapIcon, "objId", attributes[operationalLayer.objectIdField]);
            on(locateOnMapIcon, "click", lang.hitch(this, function (evt) {
                target = evt.currentTarget || evt.srcElement;
                // show map view on click of icon in mobile view
                this.showMapViewOnLocate();
                objectId = domAttr.get(target, "objId");
                this.issueDetailsHelper.highLightFeatureOnClick(operationalLayer, objectId, this.selectedGraphicsLayer, this.map);
            }));
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