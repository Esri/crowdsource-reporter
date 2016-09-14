/*global define,dojo,Modernizr,alert,$,console*/
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
    'dojo/text!./templates/item-details-view.html',
    "widgets/comment-form/comment-form"
], function (declare, lang, arrayUtil, domConstruct, domStyle, domClass, domAttr, dojoQuery, on, dom, string, topic, touch, nld, Deferred, Graphic, PopupTemplate, Query, QueryTask, RelationshipQuery,
    ContentPane,
    _WidgetBase, _TemplatedMixin,
    template, CommentForm) {

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
            domStyle.set(this.commentButton, 'display', this.actionVisibilities.showComments ? 'inline-block' : 'none');
            domStyle.set(this.galleryButton, 'display', this.actionVisibilities.showGallery ? 'inline-block' : 'none');
            domStyle.set(this.domNode, 'display', '');
            this._setLikeButtonState();
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
            on(this.backIcon, 'click', lang.hitch(this, function (evt) {
                if (this.commentformInstance) {
                    this.commentformInstance = null;
                }
                this.onCancel(self.item);
            }));

            on(this.likeButton, 'click', lang.hitch(this, function () {
                if (!domClass.contains(this.likeButton, "esriCTDetailButtonSelected")) {
                    self._fetchVotesCount(self.item).then(lang.hitch(this, function (item) {
                        self._incrementVote(item);
                    }));
                }
            }));

            on(this.commentButton, 'click', function () {
                topic.publish('getComment', self.item);
                self._createCommentForm(self.item);

            });


            on(this.mapItButton, 'click', function () {
                domStyle.set(dom.byId("mapParentContainer"), "display", "block");
                topic.publish("resizeMap");
            });

            on(this.galleryButton, 'click', function () {
                if (domClass.contains(self.gallery, "esriCTHidden")) {
                    self._showAttachments(self.item);
                }
                self._showPanel(self.gallery, self.galleryButton, true);
            });
        },

        onCancel: function (evt) {
            return evt;
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
        */
        setItem: function (item) {
            this.item = item;
            if (this.actionVisibilities.showComments) {
                this._queryComments(item);
            }
            this.itemTitle = this._getItemTitle(item) || "&nbsp;";
            this.itemVotes = this._getItemVotes(item);
            this._clearItemDisplay();
            this._buildItemDisplay();
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
            }
            this.itemCP.set('content', this.item.originalFeature.getContent());
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
        _buildCommentDiv: function (comment) {
            var commentDiv;
            commentDiv = domConstruct.create('div', {
                'class': 'comment'
            }, this.commentsList);

            new ContentPane({
                'class': 'content small-text',
                'content': comment.getContent()
            }, commentDiv).startup();
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
            var updateQuery = new RelationshipQuery();
            updateQuery.objectIds = [item.attributes[this.selectedLayer.objectIdField]];
            updateQuery.returnGeometry = true;
            updateQuery.outFields = ["*"];
            updateQuery.relationshipId = this.selectedLayer.relationships[0].id;
            //Show loading indicator
            this.appUtils.showLoadingIndicator();
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
                    this._setComments(results[item.attributes[this.selectedLayer.objectIdField]].features);
                    domClass.add(this.noCommentsDiv, "esriCTHidden");
                } else {
                    domClass.remove(this.noCommentsDiv, "esriCTHidden");
                    domAttr.set(this.noCommentsDiv, "innerHTML", this.appConfig.i18n.comment.noCommentsAvailableText);
                }
                //Hide loading indicator
                this.appUtils.hideLoadingIndicator();
            }), lang.hitch(this, function (err) {
                console.log(err.message || "queryRelatedFeatures");
                //Hide loading indicator
                this.appUtils.hideLoadingIndicator();
            }));
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
            this.appUtils.showLoadingIndicator();
            this.selectedLayer.queryAttachmentInfos(item.attributes[this.selectedLayer.objectIdField], lang.hitch(this, function (infos) {
                container = domConstruct.create("div", {
                    "class": "esriCTDetailsContainer"
                }, this.gallery);
                domConstruct.create("div", {
                    "innerHTML": this.appConfig.i18n.gallery.galleryHeaderText,
                    "class": "esriCTItemDetailHeader esriCTListItemHeader esriCTLargeText"
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
                            "class": "esriCTIssueImgSpan col"
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
                this.appUtils.hideLoadingIndicator();
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
        _createCommentForm: function (item) {
            if (!this.commentformInstance) {
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
                    selectedLayer: this.selectedLayer
                }, domConstruct.create("div", {}, this.commentDetails));

                //attach cancel button click event
                this.commentformInstance.onCancelButtonClick = lang.hitch(this, function () {
                    this._showPanel(this.commentDetails, this.commentButton, false);
                    this.commentformInstance._clearFormFields();
                    this.isCommentFormOpen = false;
                    //Check if application is running on android devices, and show/hide the details panel
                    //This resolves the jumbling of content in details panel on android devices
                    if (this.appUtils.isAndroid()) {
                        this.toggleDetailsPanel();
                    }
                });
                this.commentformInstance.onCommentFormSubmitted = lang.hitch(this, function (item) {
                    //close the comment form after submitting new comment
                    this._showPanel(this.commentDetails, this.commentButton, false);
                    this.commentformInstance._clearFormFields();
                    this.isCommentFormOpen = false;
                    //update comment list
                    this._queryComments(item);
                });
            } else {
                //Hide error message div, if it is visible
                this.commentformInstance.clearHeaderMessage();
            }
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
        }
    });
});
