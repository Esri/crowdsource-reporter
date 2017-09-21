/*global define,dojo,Modernizr,alert,$,console,dojoConfig,confirm*/
/*jslint browser:true,sloppy:true,nomen:true,unparam:true,plusplus:true */
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
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-construct',
    'dojo/dom-style',
    'dojo/dom-class',
    'dojo/dom-attr',
    'dojo/query',
    'dojo/on',
    'dojo/dom',
    'dojo/string',
    'dojo/topic',
    'dojo/touch',
    'dojo/NodeList-dom',
    'dojo/Deferred',
    'esri/graphic',
    'esri/dijit/PopupTemplate',
    'esri/tasks/query',
    'esri/tasks/QueryTask',
    'esri/tasks/RelationshipQuery',
    'dijit/layout/ContentPane',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/DeferredList',
    'dojo/text!./templates/item-details-view.html',
    "widgets/comment-form/comment-form",
    "dojo/query"
], function (declare,
    lang,
    arrayUtil,
    domConstruct,
    domStyle,
    domClass,
    domAttr,
    dojoQuery,
    on,
    dom,
    string,
    topic,
    touch,
    nld,
    Deferred,
    Graphic,
    PopupTemplate,
    Query,
    QueryTask,
    RelationshipQuery,
    ContentPane,
    _WidgetBase,
    _TemplatedMixin,
    DeferredList,
    template,
    CommentForm,
    query
    ) {

    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        id: 'itemDetail',
        baseClass: 'esriCTItemDetail',
        itemTitle: 'default title',
        characterLength: null,
        tooltipHandler: null,
        selectedLayer: null,
        commentformInstance: null,
        isCommentFormOpen: false,
        votesUpdatedArray: [],
        _entireAttachmentsArr: null,
        i18n: {
            likeButtonLabel: "Like",
            likeButtonTooltip: "Vote for this",
            commentButtonLabel: "Comment",
            commentButtonTooltip: "Add a comment about this",
            galleryButtonLabel: "Gallery",
            galleryButtonTooltip: "See attached photos for this",
            mapButtonLabel: "View on Map",
            mapButtonTooltip: "See attached photos for this",
            commentsListHeading: "Comments",
            unableToUpdateVoteField: "Unable to Update the Feature",
            gotoIssueListTooltip: "Go To Issue List",
            comment: {
                commentsFormSubmitButton: "Submit Comment",
                commentsFormCancelButton: "Cancel",
                errorInSubmittingComment: "Comment could not be submitted.",
                emptyCommentMessage: "Please enter comment.",
                placeHolderText: "Type a comment",
                noCommentsAvailableText: "No comments available",
                remainingTextCount: "${0} character(s) remain",
                showNoText: "No"
            },
            gallery: {
                galleryHeaderText: "Gallery",
                noAttachmentsAvailableText: "No attachments found"
            }
        },
        itemVotes: {
            "label": 0,
            "needSpace": false
        },
        actionVisibilities: {
            "showVotes": false,
            "showComments": false,
            "showGallery": false
        },
        _commentTable: null,

        /**
        * This function is called when widget is constructed.
        * @param{object} configData
        * @constructor
        * @memberOf widgets/item-details/item-details-controller
        */
        constructor: function (configData) {
            this.inherited(arguments);
            // check if configData is present, then merge it with config object
            if (configData) {
                lang.mixin(this, configData);
            }
            if (this.appConfig && this.appConfig.i18n && this.appConfig.i18n.itemDetails && this.appConfig.i18n.comment && this.appConfig.i18n.gallery) {
                this.i18n = this.appConfig.i18n.itemDetails;
                this.i18n.comment = this.appConfig.i18n.comment;
                this.i18n.gallery = this.appConfig.i18n.gallery;
            }
        },

        postCreate: function () {
            this.inherited(arguments);
            this._initContentPane();
            this.hide();
        },

        startup: function () {
            this.inherited(arguments);
            this._addListeners();
        },

        /**
        * Show/hide buttons based on layer configuration
        */
        show: function () {
            domStyle.set(this.likeButton, 'display', this.actionVisibilities.showVotes ? 'inline-block' : 'none');
            //If editing capabilities are disabled, hide commetns button but show added comments
            domStyle.set(this.commentButton, 'display', this.actionVisibilities.showComments ? 'inline-block' : 'none');
            //We will keep gallery button OFF by default, if feature has valid attachments then button will automatically be turned ON
            domStyle.set(this.galleryButton, 'display', 'none');
            domStyle.set(this.domNode, 'display', '');
            this._setLikeButtonState();
        },

        /**
        * Decide wether to show/hide gallery button based on attachments in feature
        */
        _showGalleryButton: function () {
            this.selectedLayer.queryAttachmentInfos(this.item.attributes[this.selectedLayer.objectIdField], lang.hitch(this, function (attachments) {
                // If attachments found, enable gallery button
                if (attachments && attachments.length > 0) {
                    domStyle.set(this.galleryButton, 'display', 'inline-block');
                }
            }), function () {
                //handle for error
            });
        },

        hide: function () {
            domStyle.set(this.domNode, 'display', 'none');
        },

        /**
        * Sets up the i18n comments-list heading and the no-comments placeholder.
        */
        _initCommentsDiv: function () {
            this.commentsHeading.innerHTML = this.i18n.commentsListHeading;
        },

        /**
        * Attach click events on all the available buttons
        */
        _addListeners: function () {
            var self = this;
            on(this.backIcon, "click", lang.hitch(this, function (evt) {
                this.onCancel(self.item);
            }));

            on(this.likeButton, "click", lang.hitch(this, function () {
                if (this.appConfig.reportingPeriod === "Closed") {
                    this.appUtils.reportingPeriodDialog.showDialog("reporting");
                    return;
                }
                if (!domClass.contains(this.likeButton, "esriCTDetailButtonSelected")) {
                    if (this.appConfig.logInDetails.canEditFeatures) {
                        self._fetchVotesCount(self.item).then(lang.hitch(this, function (item) {
                            self._incrementVote(item);
                        }));
                    } else {
                        this.appUtils.showMessage(this.appConfig.i18n.main.noEditingPermissionsMessage);
                    }
                }
            }));

            on(this.commentButton, "click", lang.hitch(this, function () {
                if (this.appConfig.reportingPeriod === "Closed") {
                    this.appUtils.reportingPeriodDialog.showDialog("reporting");
                    return;
                }
                if (this.appConfig.logInDetails.canEditFeatures) {
                    this.appUtils.showLoadingIndicator();
                    this._showCommentHeaderAndListContainer();
                    this._hideCommentDetailsContainer();
                    topic.publish('getComment', self.item);
                    self._createCommentForm(self.item, true, null);
                    this.appUtils.hideLoadingIndicator();
                } else {
                    this.appUtils.showMessage(this.appConfig.i18n.main.noEditingPermissionsMessage);
                }
            }));


            on(this.mapItButton, "click", lang.hitch(this, function () {
                domStyle.set(dom.byId("mapParentContainer"), "display", "block");
                topic.publish("resizeMap");
                this.onMapItButtonClicked(this.item);
            }));

            on(this.galleryButton, "click", function () {
                if (domClass.contains(self.gallery, "esriCTHidden")) {
                    self._showAttachments(self.item);
                }
                self._showPanel(self.gallery, self.galleryButton, true);
            });
        },

        onCancel: function (evt) {
            return evt;
        },

        onMapItButtonClicked: function (item) {
            return item;
        },

        onFeatureUpdated: function (feature) {
            return feature;
        },
        /**
        * fetch the latest count of like field.
        * @param {item} the current item for which count is to be retrieved.
        */
        _fetchVotesCount: function (item) {
            var updateQuery, updateQueryTask, deferred = new Deferred();
            // Get the latest vote count from the server, not just the feature layer
            updateQuery = new Query();
            updateQuery.objectIds = [item.attributes[this.selectedLayer.objectIdField]];
            updateQuery.returnGeometry = false;
            updateQuery.outFields = [this.appConfig.likeField];
            updateQueryTask = new QueryTask(this.selectedLayer.url);
            updateQueryTask.execute(updateQuery, lang.hitch(this, function (results) {
                var retrievedVotes;
                if (results && results.features && results.features.length > 0) {
                    retrievedVotes = results.features[0].attributes[this.appConfig.likeField];
                    retrievedVotes = retrievedVotes || 0;
                    item.attributes[this.appConfig.likeField] = retrievedVotes;
                    this.previousCount = lang.clone(item.attributes[this.appConfig.likeField]);
                    deferred.resolve(item);
                }
                deferred.reject(item);
            }), function (error) {
                deferred.reject(item);
            });
            return deferred;
        },

        /**
        * Increment count of current item.
        * @param {item} the current item for which count is to be incremented.
        */
        _incrementVote: function (item) {
            var selectedFeatureOID;
            item.attributes[this.appConfig.likeField] = item.attributes[this.appConfig.likeField] + 1;
            // Update the item in the feature layer
            this.appUtils.showLoadingIndicator();
            this.selectedLayer.applyEdits(null, [item], null, lang.hitch(this, function (updates) {
                if (updates && updates.length > 0 && updates[0].error) {
                    this.appUtils.hideLoadingIndicator();
                    this.appUtils.showError(this.i18n.unableToUpdateVoteField);
                } else {
                    this._updateItemVotes(item);
                    //highlight like button to indicate user all-ready clicked it
                    if (!domClass.contains(this.likeButton, "esriCTDetailButtonSelected")) {
                        domClass.add(this.likeButton, "esriCTDetailButtonSelected");
                        this.likeButton.disabled = true;
                    }
                    selectedFeatureOID = item.webMapId + "_" +
                        this.selectedLayer.id + "_" +
                        item.attributes[this.selectedLayer.objectIdField];
                    //If selected features object id is not present in the array, push it
                    if (this.votesUpdatedArray.indexOf(selectedFeatureOID) === -1) {
                        this.votesUpdatedArray.push(selectedFeatureOID);
                    }
                    //fire event to indicate feature is updated
                    this.onFeatureUpdated(item);
                }
                this.appUtils.hideLoadingIndicator();
            }), lang.hitch(this, function (err) {
                item.attributes[this.appConfig.likeField] = this.previousCount;
                this.appUtils.hideLoadingIndicator();
                this.appUtils.showError(this.i18n.unableToUpdateVoteField);
            }));
        },

        /**
        * Sets the fields that are needed to display feature information in this list (number of votes).
        * Needs to be called before first setItems to tell the widget which fields to look for.
        * @param {string} votesField Name of votes property
        * @param {object} instance of selected layer
        */
        setItemFields: function (votesField, selectedLayer) {
            this.votesField = votesField;
            this.selectedLayer = selectedLayer;
        },

        /**
        * Sets visibiltiy of like, comment and gallery buttons
        */
        setActionsVisibility: function (settings, commentTable, itemInfos, commentPopupTable) {
            this.actionVisibilities = {
                "showVotes": settings.like,
                "showComments": settings.comment,
                "showGallery": settings.gallery
            };
            this._commentTable = commentTable;
            this.itemInfos = itemInfos;
            this.commentPopupTable = commentPopupTable;
        },

        /**
        * Initialize content pane
        */
        _initContentPane: function () {
            this.itemCP = new ContentPane({ id: 'itemCP' }, this.descriptionDiv);
            this.itemCP.startup();
        },

        /**
        * Set selected item and create detail panel
        * @param {object} item Updated definition of current item
        * @param {object} layerInfo layer details
        */
        setItem: function (item, layerInfo) {
            this.item = item;
            //This will make sure when ever the detail's' panel is shown, the edit form will be hidden and other components will be shown
            this.handleComponentsVisibility();
            if (this.actionVisibilities.showComments) {
                this._queryComments(item);
            }
            this.itemTitle = this._getItemTitle(item) || "&nbsp;";
            this.itemVotes = this._getItemVotes(item);
            this._checkForLayerCapabilities(layerInfo, item);
            this.item.originalFeature.canEdit = this.item.canEdit;
            this.item.originalFeature.canDelete = this.item.canDelete;
            //Check for attachments and enable gallery button
            this._showGalleryButton();
            this._clearItemDisplay();
            this._buildItemDisplay();
        },

        /**
        * Check for reported by field and decide wether to show edit/delete buttons
        * @param {object} layerInfo layer details
        * @param {object} item Updated definition of current item
        */
        _checkForLayerCapabilities: function (layerInfo, item) {
            var layerCapabilities;
            //set default values
            item.canEdit = false;
            item.canDelete = false;
            if (layerInfo.resourceInfo) {
                layerCapabilities = layerInfo.resourceInfo.capabilities;
            } else {
                layerCapabilities = layerInfo.capabilities;
            }
            //Check if reported by field is configured and then check for layer capabilities
            if (this.appConfig.reportedByField && lang.trim(this.appConfig.logInDetails.processedUserName) !== "" &&
                    (item.attributes[this.appConfig.reportedByField]) === (this.appConfig.logInDetails.processedUserName)) {
                if (layerCapabilities.indexOf("Update") !== -1 && this.appConfig.enableFeatureEdit) {
                    item.canEdit = true;
                }
                if (layerCapabilities.indexOf("Delete") !== -1 && this.appConfig.enableFeatureDelete) {
                    item.canDelete = true;
                }
            }
        },

        /**
        * Updates the definition and display of the current item.
        * @param {object} item Updated definition of current item
        */
        _updateItemVotes: function (item) {
            if (item === this.item) {
                this.itemVotes = this._getItemVotes(item);
                this.itemVotesDiv.innerHTML = this.itemVotes.label;
                domAttr.set(this.votesDetailContainer, "title", this.itemVotes.label + " " + this.i18n.likeButtonTooltip);
            }
        },

        /**
        * Gets title of feature for header display
        * @param  {feature} item The feature for which to get the title
        * @return {string}      The title of the feature
        */
        _getItemTitle: function (item) {
            return item.originalFeature.getTitle ? item.originalFeature.getTitle() : "";
        },

        /**
        * Gets the number of votes for an item
        * @param  {feature} item The feature for which to get the vote count
        * @return {object} Object containing "label" with vote count for the item in a shortened form (num if <1000,
        * floor(count/1000)+"k" if <1M, floor(count/1000000)+"M" otherwise) and "needSpace" that's indicates if an
        * extra digit of room is needed to handle numbers between 99K and 1M, exclusive
        */
        _getItemVotes: function (item) {
            var needSpace = false, votes = item.attributes[this.votesField] || 0;
            if (votes > 999) {
                if (votes > 99999) {
                    needSpace = true;
                }
                if (votes > 999999) {
                    votes = Math.floor(votes / 1000000) + "M";
                } else {
                    votes = Math.floor(votes / 1000) + "k";
                }
            }
            return {
                "label": votes,
                "needSpace": needSpace
            };
        },

        _clearItemDisplay: function () {
            this.itemTitleDiv.innerHTML = '';
            this.itemVotesDiv.innerHTML = '';
            this.commentsList.innerHTML = '';
            this.commentsHeading.innerHTML = '';
            this.itemCP.set('content', '');
            domClass.add(this.gallery, "esriCTHidden");
            domClass.add(this.commentDetails, "esriCTHidden");
            arrayUtil.forEach(dojoQuery(".esriCTDetailButtonContainer"), lang.hitch(this, function (currentButton) {
                domClass.remove(currentButton.children[0], "esriCTDetailButtonSelected");
            }));
        },

        _buildItemDisplay: function () {
            this.itemTitleDiv.innerHTML = this.itemTitle;
            domAttr.set(this.itemTitleDiv, "title", this.itemTitle);
            //Show popup on click/hover of layer title div
            if (window.hasOwnProperty("ontouchstart") || window.ontouchstart !== undefined) {
                this._createTooltip(this.itemTitleDiv, this.itemTitle);
            }
            this.itemVotesDiv.innerHTML = this.itemVotes.label;
            //Remove hidden classes from comments list and comments header
            domClass.remove(this.commentsHeading, "esriCTHidden");
            domClass.remove(this.commentsList, "esriCTHidden");
            domAttr.set(this.votesDetailContainer, "title", this.itemVotes.label + " " + this.i18n.likeButtonTooltip);
            if (this.actionVisibilities.showVotes && this.votesField) {
                domClass.remove(this.votesDetailContainer, "esriCTHidden");
                domClass.remove(this.itemTitleDiv, "esriCTNoVotesDetailContainer");
            } else {
                domClass.add(this.votesDetailContainer, "esriCTHidden");
                domClass.add(this.itemTitleDiv, "esriCTNoVotesDetailContainer");
            }
            if (this.actionVisibilities.showComments) {
                this._initCommentsDiv();
            }
            //If property does not exsist, add it to the infotemplate
            //Without this the set content of content pane gives an relationship error
            if (this.item.infoTemplate && !this.item.infoTemplate.hasOwnProperty("_relatedLayersInfo")) {
                this.item.infoTemplate["_relatedLayersInfo"] = {};
                this.item.originalFeature.infoTemplate["_relatedLayersInfo"] = {};
            }
            //Hide edit form if visible and show popup details for selected feature
            domClass.add(this.popupDetailsDiv, "esriCTHidden");
            domClass.remove(this.descriptionDiv, "esriCTHidden");
            this.item.originalFeature.attributes = lang.clone(this.item.attributes);
            this.itemCP.set('content', this.item.originalFeature.getContent());
            //Go to top after popup details is shown
            this.scrollToTop();
            //Create edit/delete buttons only if user has required permissions
            if (this.item.canEdit || this.item.canDelete) {
                this._createEditButton(this.descriptionDiv, this.item.originalFeature, true);
            }
        },

        _showPanel: function (domNode, buttonNode, isScroll) {
            if (domClass.contains(domNode, "esriCTHidden")) {
                domClass.remove(domNode, "esriCTHidden");
                domClass.add(buttonNode, "esriCTDetailButtonSelected");
                if (isScroll) {
                    $('.esriCTItemDetailsContainer').animate({
                        scrollTop: dojoQuery('.esriCTTtemDescription')[0].clientHeight + dojoQuery('.esriCTAttachmentsSection ')[0].clientHeight
                    }, 'slow');
                }
            } else {
                domClass.remove(buttonNode, "esriCTDetailButtonSelected");
                domClass.add(domNode, "esriCTHidden");
            }
        },

        _setComments: function (commentsArr) {
            arrayUtil.forEach(commentsArr, lang.hitch(this, this._buildCommentDiv));
        },

        /**
        * Creates a ContentPane to hold the contents of a comment.
        * @param {object} comment Comment to display; its contents come from calling
        * getContent() on it
        */
        _buildCommentDiv: function (comment, index) {
            var commentDiv;
            comment._layer = this._commentTable;
            commentDiv = domConstruct.create('div', {
                'class': 'comment esriCTCommentsPopup'
            }, this.commentsList);
            new ContentPane({
                'class': 'content small-text',
                'content': comment.getContent()
            }, commentDiv).startup();
            this._checkAttachments(commentDiv, index);
            this._checkForLayerCapabilities(this._commentTable, comment);
            if (comment.canEdit || comment.canDelete) {
                this._createEditButton(commentDiv, comment, false);
            }
        },

        /**
        * This function is used to create comments button
        * @memberOf widgets/details-panel/comments
        */
        _createEditButton: function (parentDiv, graphic, isGeoform) {
            var editBtn, deleteBtn, existingAttachmentsObjectsArr, buttonContainer, confirmDelete;
            buttonContainer = domConstruct.create("div", { "class": "esriCTEditingButtons" }, parentDiv);
            if (graphic.canEdit) {
                editBtn = domConstruct.create("div", { "class": "esriCTEditButton icon icon-pencil esriCTBodyTextColor", "title": this.appConfig.i18n.comment.editRecordText }, buttonContainer);
                on(editBtn, "click", lang.hitch(this, function (evt) {
                    if (this.appConfig.logInDetails.canEditFeatures) {
                        if (isGeoform) {
                            domClass.add(parentDiv, "esriCTHidden");
                            domClass.remove(this.popupDetailsDiv, "esriCTHidden");
                            domClass.add(this.actionButtonsContainer, "esriCTHidden");
                            this._createGeoformForEdits(this.popupDetailsDiv);

                        } else {
                            this.appUtils.showLoadingIndicator();
                            existingAttachmentsObjectsArr = this._getExistingAttachments(evt);
                            this._showEditCommentForm(graphic, existingAttachmentsObjectsArr);
                            this.appUtils.hideLoadingIndicator();
                        }
                    } else {
                        this.appUtils.showMessage(this.appConfig.i18n.main.noEditingPermissionsMessage);
                    }
                }));
            }
            if (graphic.canDelete) {
                deleteBtn = domConstruct.create("div", { "class": "esriCTDeleteButton icon icon-delete esriCTBodyTextColor", "title": this.appConfig.i18n.comment.deleteRecordText }, buttonContainer);
                on(deleteBtn, "click", lang.hitch(this, function (evt) {
                    if (this.appConfig.logInDetails.canEditFeatures) {
                        confirmDelete = confirm(this.appConfig.i18n.itemDetails.deleteMessage);
                        if (confirmDelete) {
                            this.appUtils.showLoadingIndicator();
                            if (isGeoform) {
                                this.deleteSelectedFeature();
                            } else {
                                this._deleteSelectedComment(graphic, evt.currentTarget.parentNode);
                            }
                        }
                    } else {
                        this.appUtils.showMessage(this.appConfig.i18n.main.noEditingPermissionsMessage);
                    }
                }));
            }
        },

        /**
        * This function is used to delete the selected comment
        * @memberOf widgets/details-panel/comments
        */
        _deleteSelectedComment: function (selectedComment, commentNode) {
            this._commentTable.applyEdits(null, null, [selectedComment], lang.hitch(this, function (addResults, updateResults, deleteResults) {
                if (deleteResults[0].success) {
                    //Delete the node of selected comment
                    domConstruct.destroy(commentNode.parentElement);
                    if (this.commentsList.childNodes.length === 0) {
                        domClass.remove(this.noCommentsDiv, "esriCTHidden");
                        domAttr.set(this.noCommentsDiv, "innerHTML", this.appConfig.i18n.comment.noCommentsAvailableText);
                    }
                    this.appUtils.hideLoadingIndicator();
                } else {
                    this.appUtils.showMessage(this.appConfig.i18n.comment.deleteCommentFailedMessage);
                    this.appUtils.hideLoadingIndicator();
                }
            }), lang.hitch(this, function (err) {
                this.appUtils.showMessage(this.appConfig.i18n.comment.deleteCommentFailedMessage);
                this.appUtils.hideLoadingIndicator();
            }));
        },

        /**
        * This function is used to get the existing attachment of comment which user is editing
        * @memberOf widgets/details-panel/comments
        */
        _getExistingAttachments: function (evt) {
            var existingAttachmentsArr, i, existingAttachmentsObjectsArr;
            existingAttachmentsObjectsArr = [];
            existingAttachmentsArr = query(".esriCTNonImageNameMiddle", evt.currentTarget.parentNode.parentNode);
            if (existingAttachmentsArr && existingAttachmentsArr.length > 0) {
                for (i = 0; i < existingAttachmentsArr.length; i++) {
                    existingAttachmentsObjectsArr.push(this._createAttachmentsObjects(existingAttachmentsArr[i]));
                }
            }
            return existingAttachmentsObjectsArr;
        },

        /**
        * This function is used to create attachment object which has details like attachment name, etc...
        * @memberOf widgets/details-panel/comments
        */
        _createAttachmentsObjects: function (existingAttachment) {
            var existingAttachmentObject;
            existingAttachmentObject = {};
            existingAttachmentObject.attachmentFileName = existingAttachment.innerText;
            existingAttachmentObject.attachmentObjectID = domAttr.get(existingAttachment, "attachmentObjectID");
            return existingAttachmentObject;
        },

        /**
        * This function is used to show edit comments form
        * @memberOf widgets/details-panel/comments
        */
        _showEditCommentForm: function (graphic, existingAttachmentsObjectsArr) {
            this._hideCommentDetailsContainer();
            this._createCommentForm(graphic, false, existingAttachmentsObjectsArr);
            this._hideCommentHeaderAndListContainer();
            domClass.remove(this.commentButton, "esriCTDetailButtonSelected");
        },

        /**
        * This function is used to delete the selected feature from issue list and map
        * @memberOf widgets/details-panel/comments
        */
        deleteSelectedFeature: function () {
            var isDeleted = false;
            // Add feature to the layer
            this.selectedLayer.applyEdits(null, null, [this.item], lang.hitch(this, function (addResults, updateResults, deleteResults) {
                if (deleteResults[0].success) {
                    isDeleted = true;
                } else {
                    isDeleted = false;
                }
                this.onFeatureDeleted(isDeleted);
            }), lang.hitch(this, function (err) {
                this.appUtils.hideLoadingIndicator();
                isDeleted = false;
                this.onFeatureDeleted(isDeleted);
            }));
        },

        onFeatureDeleted: function (isDeleted) {
            return isDeleted;
        },

        /**
        * This function is used hide the comment header & list container
        * @memberOf widgets/details-panel/comments
        */
        _hideCommentHeaderAndListContainer: function () {
            domClass.add(this.commentsHeading, "esriCTHidden");
            domClass.add(this.commentsList, "esriCTHidden");
        },

        /**
        * This function is used show the comment header & list container
        * @memberOf widgets/details-panel/comments
        */
        _showCommentHeaderAndListContainer: function () {
            if (domClass.contains(this.commentsHeading, "esriCTHidden")) {
                domClass.remove(this.commentsHeading, "esriCTHidden");
            }
            if (domClass.contains(this.commentsList, "esriCTHidden")) {
                domClass.remove(this.commentsList, "esriCTHidden");
            }
        },

        /**
        * This function is used to hide the comment details container
        * @memberOf widgets/details-panel/comments
        */
        _hideCommentDetailsContainer: function () {
            if (!(domClass.contains(this.commentDetails, "esriCTHidden"))) {
                domClass.add(this.commentDetails, "esriCTHidden");
            }
        },

        /**
        * Empties the list of comments.
        */
        clearComments: function () {
            domConstruct.empty(this.commentsList);
            domConstruct.empty(this.noCommentsDiv);
        },

        /**
        * Retrieves the comments associated with an item.
        * @param {objectID} item Item whose comments are sought
        * @return {publish} "updatedCommentsList" with results of query
        */
        _queryComments: function (item) {
            var updateQuery = new RelationshipQuery(), commentsTableDefinitionExpression;
            updateQuery.objectIds = [item.attributes[this.selectedLayer.objectIdField]];
            updateQuery.returnGeometry = true;
            updateQuery.outFields = ["*"];
            updateQuery.relationshipId = this.selectedLayer.relationships[0].id;
            commentsTableDefinitionExpression = this._commentTable.getDefinitionExpression();
            //If table has definition expression set in web map then apply it
            if (commentsTableDefinitionExpression &&
                    commentsTableDefinitionExpression !== null &&
                    commentsTableDefinitionExpression !== "") {
                updateQuery.definitionExpression = commentsTableDefinitionExpression;
            }
            this._entireAttachmentsArr = null;
            this.selectedLayer.queryRelatedFeatures(updateQuery, lang.hitch(this, function (results) {
                var pThis = this, fset, features, i;
                // Function for descending-OID-order sort
                // Function for descending-OID-order sort
                function sortByOID(a, b) {
                    if (a.attributes[pThis._commentTable.objectIdField] > b.attributes[pThis._commentTable.objectIdField]) {
                        return -1;  // order a before b
                    }
                    if (a.attributes[pThis._commentTable.objectIdField] < b.attributes[pThis._commentTable.objectIdField]) {
                        return 1;  // order b before a
                    }
                    return 0;  // a & b have same date, so relative order doesn't matter
                }

                fset = results[item.attributes[this.selectedLayer.objectIdField]];
                features = fset ? fset.features : [];

                if (features.length > 0) {
                    // Sort by descending OID order
                    features.sort(sortByOID);

                    // Add the comment table popup
                    for (i = 0; i < features.length; ++i) {
                        features[i].setInfoTemplate(new PopupTemplate(this.commentPopupTable.popupInfo));
                    }
                }
                this.clearComments();
                if (features.length > 0) {
                    // Sort by descending OID order
                    features.sort(sortByOID);
                    if (this._commentTable.hasAttachments) {
                        this._getAllAttachments(results[item.attributes[this.selectedLayer.objectIdField]].features);
                    } else {
                        this._setComments(results[item.attributes[this.selectedLayer.objectIdField]].features);
                    }
                    domClass.add(this.noCommentsDiv, "esriCTHidden");
                } else {
                    domClass.remove(this.noCommentsDiv, "esriCTHidden");
                    domAttr.set(this.noCommentsDiv, "innerHTML", this.appConfig.i18n.comment.noCommentsAvailableText);
                }
                this.appUtils.hideLoadingIndicator();
            }), lang.hitch(this, function (err) {
                console.log(err.message || "queryRelatedFeatures");
                //Hide loading indicator
                this.appUtils.hideLoadingIndicator();
            }));
        },

        /**
        * This function is used to get all the attachments
        */
        _getAllAttachments: function (commentsFeature) {
            var deferredList, deferredListArr, i;
            deferredListArr = [];
            for (i = 0; i < commentsFeature.length; i++) {
                deferredListArr.push(this._commentTable.queryAttachmentInfos(commentsFeature[i].attributes[this.selectedLayer.objectIdField]));
            }
            deferredList = new DeferredList(deferredListArr);
            deferredList.then(lang.hitch(this, function (response) {
                this._entireAttachmentsArr = response;
                this._setComments(commentsFeature);
            }), lang.hitch(this, function () {
                this.hideCommentsTab();
            }));
        },

        /**
        * Check whether attachments are available in layer and enabled in webmap
        **/
        _checkAttachments: function (commentContentPaneContainer, index) {
            if (this._commentTable.hasAttachments) {
                var attachmentsDiv = $(".attachmentsSection", commentContentPaneContainer)[0];
                if (attachmentsDiv) {
                    domConstruct.empty(attachmentsDiv);
                    domStyle.set(attachmentsDiv, "display", "block");
                    domClass.remove(attachmentsDiv, "hidden");
                    this._showAttachmentsInComment(attachmentsDiv, index);
                }
            }
        },

        /**
        * Query layer to get attachments
        * @param{object} graphic
        * @param{object} attachmentContainer
        * @memberOf widgets/details-panel/comments
        **/
        _showAttachmentsInComment: function (attachmentContainer, index) {
            var fieldContent, i, attachmentWrapper, imageThumbnailContainer, imageThumbnailContent, imageContainer, fileTypeContainer, isAttachmentAvailable, imagePath, imageDiv;
            //check if attachments found
            if (this._entireAttachmentsArr[index][1] && this._entireAttachmentsArr[index][1].length > 0) {
                //Create attachment header text
                domConstruct.create("div", { "innerHTML": this.appConfig.i18n.comment.attachmentHeaderText, "class": "esriCTAttachmentHeader esriCTBodyTextColor" }, attachmentContainer);
                fieldContent = domConstruct.create("div", { "class": "esriCTThumbnailContainer" }, attachmentContainer);
                // display all attached images in thumbnails
                for (i = 0; i < this._entireAttachmentsArr[index][1].length; i++) {
                    attachmentWrapper = domConstruct.create("div", {}, fieldContent);
                    imageThumbnailContainer = domConstruct.create("div", { "class": "esriCTNonImageContainer", "alt": this._entireAttachmentsArr[index][1][i].url }, attachmentWrapper);
                    imageThumbnailContent = domConstruct.create("div", { "class": "esriCTNonImageContent" }, imageThumbnailContainer);
                    imageContainer = domConstruct.create("div", {}, imageThumbnailContent);
                    fileTypeContainer = domConstruct.create("div", { "class": "esriCTNonFileTypeContent" }, imageThumbnailContent);
                    isAttachmentAvailable = true;
                    // set default image path if attachment has no image URL
                    imagePath = dojoConfig.baseURL + this.appConfig.noAttachmentIcon;
                    imageDiv = domConstruct.create("img", { "alt": this._entireAttachmentsArr[index][1][i].url, "class": "esriCTAttachmentImg", "src": imagePath }, imageContainer);
                    this._fetchDocumentContentType(this._entireAttachmentsArr[index][1][i], fileTypeContainer);
                    this._fetchDocumentName(this._entireAttachmentsArr[index][1][i], imageThumbnailContainer);
                    on(imageThumbnailContainer, "click", lang.hitch(this, this._displayImageAttachments));
                }
                if (!isAttachmentAvailable) {
                    domClass.add(attachmentContainer, "hidden");
                }
            }
        },

        /**
        * Function to fetch document content type
        * @param{object} attachment object
        **/
        _fetchDocumentContentType: function (attachmentData, fileTypeContainer) {
            var typeText, fileExtensionRegEx, fileExtension;
            fileExtensionRegEx = /(?:\.([^.]+))?$/; //ignore jslint
            fileExtension = fileExtensionRegEx.exec(attachmentData.name);
            if (fileExtension && fileExtension[1]) {
                typeText = "." + fileExtension[1].toUpperCase();
            } else {
                typeText = this.appConfig.i18n.comment.unknownCommentAttachment;
            }
            domAttr.set(fileTypeContainer, "innerHTML", typeText);
        },


        /**
        * Function to fetch document name
        * @param{object} attachment object
        * @param{object} dom node
        **/
        _fetchDocumentName: function (attachmentData, container) {
            var attachmentNameWrapper, attachmentName;
            attachmentNameWrapper = domConstruct.create("div", { "class": "esriCTNonImageName" }, container);
            attachmentName = domConstruct.create("div", {
                "class": "esriCTNonImageNameMiddle",
                "innerHTML": attachmentData.name
            }, attachmentNameWrapper);
            domAttr.set(attachmentName, "attachmentObjectID", attachmentData.id);
        },

        /**
        * This function is used to show attachments in new window when user clicks on the attachment thumbnail
        * @param{object} evt
        **/
        _displayImageAttachments: function (evt) {
            window.open(domAttr.get(evt.currentTarget, "alt"));
        },

        /**
        * Display character count
        * @memberOf widgets/issue-comments/issue-comments
        */
        _setTextAreaMaxLength: function () {
            this.countLabel.innerHTML = string.substitute(this.appConfig.i18n.comment.remainingTextCount, [this.characterLength]);
        },

        /**
        * Calculating character count of text area
        * @memberOf widgets/issue-comments/issue-comments
        */
        _calculateCharactersCount: function () {
            var count;
            /* Check if the number of characters entered in the comment textarea exceeds the character limit
            If it exceeds the limit do not allow the user to add more characters
            Else, accept the added character and decrease the character count */
            if (this.commentsTextArea.value.length >= this.characterLength) {
                this.commentsTextArea.value = this.commentsTextArea.value.substring(0, this.characterLength);
                this.commentsTextArea.blur();
                // Setting the count to "No" if character limit is exceeded
                count = this.appConfig.i18n.comment.showNoText;
                this.countLabel.innerHTML = string.substitute(this.appConfig.i18n.comment.remainingTextCount, [count]);
            } else {
                // Decreasing the count and displaying the entered character in the textarea
                count = this.characterLength - this.commentsTextArea.value.length;
                this.countLabel.innerHTML = string.substitute(this.appConfig.i18n.comment.remainingTextCount, [count]);
            }
        },

        //CODE FOR GALLERY
        _showAttachments: function (item) {
            var container, fieldContent, i, imageContent, imagePath, imageDiv = [];
            domConstruct.empty(this.gallery);
            this.selectedLayer.queryAttachmentInfos(item.attributes[this.selectedLayer.objectIdField], lang.hitch(this, function (infos) {
                container = domConstruct.create("div", {
                    "class": "esriCTDetailsContainer"
                }, this.gallery);
                domConstruct.create("div", {
                    "innerHTML": this.appConfig.i18n.gallery.galleryHeaderText,
                    "class": "esriCTItemDetailHeader esriCTListItemHeader esriCTLargeText esriCTCalculatedBodyTextColorAsBorder"
                }, container);
                // If attachments found
                if (infos && infos.length > 0) {
                    fieldContent = domConstruct.create("div", {
                        "class": "container esriCTListData row"
                    }, container);
                    // Display all attached images in thumbnails
                    for (i = 0; i < infos.length; i++) {
                        imagePath = location.href.slice(0, location.href.lastIndexOf('/')) + this.appConfig.noAttachmentIcon;
                        if (infos[i].contentType.indexOf("image") > -1) {
                            imagePath = infos[i].url;
                        }
                        imageContent = domConstruct.create("span", {
                            "class": "esriCTIssueImgSpan col esriCTCalculatedBodyTextColorAsBorder"
                        }, fieldContent);
                        domClass.add(imageContent, "esriCTImageLoader");
                        imageDiv[i] = domConstruct.create("img", {
                            "alt": infos[i].url,
                            "class": "esriCTIssueDetailImg esriCTPointerCursor",
                            "src": imagePath
                        }, imageContent);
                        // Hide loader image after image is loaded
                        on(imageDiv[i], "load", lang.hitch(this, this._onImageLoad));
                        // Show attachment in new tab on click of the attachment thumbnail
                        on(imageDiv[i], "click", lang.hitch(this, this._openAttachment));
                    }
                } else {
                    domConstruct.create("div", { "innerHTML": this.appConfig.i18n.gallery.noAttachmentsAvailableText, "class": "esriCTGalleryNoAttachment esriCTDetailsNoResult esriCTSmallText" }, this.gallery);
                }
            }), lang.hitch(this, function (err) {
                this.appUtils.hideLoadingIndicator();
                this.appUtils.showError(err.message);
            }));
        },

        /**
        * Callback handler for image loaded event.
        * @param{object} evt
        */
        _onImageLoad: function (evt) {
            // if event target is available
            if (evt && evt.target && evt.target.parentNode) {
                // hide the image loader once the image is loaded, and set the image dimensions so that complete image will be shown in thumbnail.
                domClass.remove(evt.target.parentNode, "esriCTImageLoader");
            }
            // if event target is available
            if (evt && evt.target) {
                this._setImageDimensions(evt.target, true);
            }
        },

        /**
        * Set the images dimensions so that the complete image will be shown in thumbnail
        * @param{object} imgModule - Image object
        * @param{Boolean} isOnLoad - set this flag this function is called after image load.
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
        * Show attachments in new window when user clicks on the attachment thumbnail
        * @param{object} evt
        */
        _openAttachment: function (evt) {
            window.open(evt.target.alt);
        },

        /**
        * Instantiate comment-form widget
        * @memberOf widgets/item-details-controller/item-details-controller
        */
        _createCommentForm: function (item, addComments, existingAttachmentsObjectsArr) {
            domConstruct.empty(this.commentDetails);
            //Create new instance of CommentForm
            this.commentformInstance = new CommentForm({
                config: this.appConfig,
                commentTable: this._commentTable,
                commentPopupTable: this.commentPopupTable,
                itemInfos: this.itemInfos,
                appUtils: this.appUtils,
                nls: this.i18n,
                item: item,
                selectedLayer: this.selectedLayer,
                addComments: addComments,
                existingAttachmentsObjectsArr: existingAttachmentsObjectsArr
            }, domConstruct.create("div", {}, this.commentDetails));

            //attach cancel button click event
            this.commentformInstance.onCancelButtonClick = lang.hitch(this, function () {
                this._showCommentHeaderAndListContainer();
                this._showPanel(this.commentDetails, this.commentButton, false);
                this.commentformInstance._clearFormFields();
                this.isCommentFormOpen = false;
                //Check if application is running on android devices, and show/hide the details panel
                //This resolves the jumbling of content in details panel on android devices
                if (this.appUtils.isAndroid()) {
                    this.toggleDetailsPanel();
                }
            });
            this.commentformInstance.onCommentFormSubmitted = lang.hitch(this, function (item, canClose) {
                this._showCommentHeaderAndListContainer();
                if (canClose) {
                    //close the comment form after submitting new comment
                    this._showPanel(this.commentDetails, this.commentButton, false);
                }
                this.commentformInstance._clearFormFields();
                this.isCommentFormOpen = false;
                //update comment list
                this._queryComments(this.item);
            });
            this._showPanel(this.commentDetails, this.commentButton, true);
            //If Comment form is close, update the comment form open flag
            if (domClass.contains(this.commentDetails, "esriCTHidden")) {
                if (this.appUtils.isAndroid()) {
                    this.toggleDetailsPanel();
                }
                this.isCommentFormOpen = false;
            } else {
                this.isCommentFormOpen = true;
            }
        },

        /**
        * Invoked when touch occurs on respective title
        * @memberOf widgets/item-details-controller/item-details-controller
        */
        _createTooltip: function (node, title) {
            domAttr.set(node, "data-original-title", title);
            //Remove previous handle
            if (this.tooltipHandler) {
                this.tooltipHandler.remove();
                if ($(node)) {
                    $(node).tooltip("hide");
                }
            }
            this.tooltipHandler = on(node, touch.press, lang.hitch(this, function (e) {
                $(node).tooltip("toggle");
                e.preventDefault();
            }));
            on(document, "click", lang.hitch(this, function () {
                $(node).tooltip("hide");
            }));

            on(window, "resize", lang.hitch(this, function () {
                $(node).tooltip("hide");
            }));
        },

        /**
        * Invoked when application is running in android devices
        * Workaround for preventing jubmling of panel
        * @memberOf widgets/item-details-controller/item-details-controller
        */
        toggleDetailsPanel: function () {
            if (this.itemDetailsContainer) {
                domStyle.set(this.itemDetailsContainer, "display", "none");
                setTimeout(lang.hitch(this, function () {
                    domStyle.set(this.itemDetailsContainer, "display", "block");
                }), 100);
            }
        },

        /**
        * Set like button state based upon it is clicked or not
        * @memberOf widgets/item-details-controller/item-details-controller
        */
        _setLikeButtonState: function () {
            var selectedFeatureId;
            selectedFeatureId = this.item.webMapId + "_" +
                this.selectedLayer.id + "_" +
                this.item.attributes[this.selectedLayer.objectIdField];
            if (this.votesUpdatedArray.indexOf(selectedFeatureId) !== -1) {
                domClass.add(this.likeButton, "esriCTDetailButtonSelected");
                this.likeButton.disabled = true;
            } else {
                this.likeButton.disabled = false;
            }
        },

        /**
        * Handle visibility of popup panel, edit geoform panel and action buttons
        * @memberOf widgets/item-details-controller/item-details-controller
        */
        handleComponentsVisibility: function () {
            domClass.add(this.popupDetailsDiv, "esriCTHidden");
            domClass.remove(this.descriptionDiv, "esriCTHidden");
            domClass.remove(this.actionButtonsContainer, "esriCTHidden");
        },

        /**
        * Scroll to top of item details panel
        * @memberOf widgets/item-details-controller/item-details-controller
        */
        scrollToTop: function () {
            setTimeout(lang.hitch(this, function () {
                this.itemDetailsContainer.scrollTop = 0;
            }), 100);
        }
    });
});
