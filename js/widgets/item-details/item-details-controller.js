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
    'dojo/NodeList-dom',
    'dojo/Deferred',
    'esri/graphic',
    'esri/tasks/query',
    'esri/tasks/QueryTask',
    'esri/tasks/RelationshipQuery',
    'dijit/layout/ContentPane',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!./templates/item-details-view.html'
], function (declare, lang, arrayUtil, domConstruct, domStyle, domClass, domAttr, dojoQuery, on, dom, string, topic, nld, Deferred, Graphic, Query, QueryTask, RelationshipQuery,
    ContentPane,
    _WidgetBase, _TemplatedMixin,
    template) {

    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        id: 'itemDetail',
        baseClass: 'esriCTItemDetail',
        itemTitle: 'default title',
        characterLength: null,
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
                commentsFormText: "Comment",
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
                domAttr.set(self.commentsTextArea, 'value', '');
                this.onCancel(evt);
            }));

            on(this.likeButton, 'click', function () {
                self._fetchVotesCount(self.item).then(lang.hitch(this, function (item) {
                    self._incrementVote(item);
                }));
            });

            on(this.commentButton, 'click', function () {
                topic.publish('getComment', self.item);
                self._showPanel(self.commentsForm, self.commentButton, true);
            });

            on(this.postCommentButton, 'click', function () {
                self._submitComment(self.item);
            });

            on(this.cancelCommentButton, 'click', function () {
                domAttr.set(self.commentsTextArea, 'value', '');
                self._setTextAreaMaxLength();
                self._showPanel(self.commentsForm, self.commentButton, false);
            });

            on(this.mapItButton, 'click', function () {
                domStyle.set(dom.byId("mapParentContainer"), "display", "block");
                topic.publish("resizeMap");
            });

            // change event on textarea
            on(this.commentsTextArea, "change", function (evt) {
                self._calculateCharactersCount();
            });

            // keyup event on textarea
            on(this.commentsTextArea, "keyup", function (evt) {
                self._calculateCharactersCount();
            });

            // paste event on textarea
            on(this.commentsTextArea, "paste", function (evt) {
                self._calculateCharactersCount();
            });

            // cut event on textarea
            on(this.commentsTextArea, "cut", function (evt) {
                self._calculateCharactersCount();
            });

            on(this.galleryButton, 'click', function () {
                if (domClass.contains(self.gallery, "esriCTHidden")) {
                    self._showAttachments(self.item);
                }
                self._showPanel(self.gallery, self.galleryButton, false);
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
            updateQuery.objectIds = [item.attributes[item._layer.objectIdField]];
            updateQuery.returnGeometry = false;
            updateQuery.outFields = [this.appConfig.likeField];
            updateQueryTask = new QueryTask(item._layer.url);
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
            item.attributes[this.appConfig.likeField] = item.attributes[this.appConfig.likeField] + 1;
            // Update the item in the feature layer
            this.appUtils.showLoadingIndicator();
            item._layer.applyEdits(null, [item], null, lang.hitch(this, function (updates) {
                if (updates && updates.length > 0 && updates[0].error) {
                    this.appUtils.hideLoadingIndicator();
                    this.appUtils.showError(this.i18n.unableToUpdateVoteField);
                } else {
                    this._updateItemVotes(item);
                    //highlight like button to indicate user all-ready clicked it
                    if (!domClass.contains(this.likeButton, "esriCTDetailButtonSelected")) {
                        domClass.add(this.likeButton, "esriCTDetailButtonSelected");
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
        * @param {array} commentFields Fields used by comment-entry form
        */
        setItemFields: function (votesField, commentFields) {
            this.votesField = votesField;
            this.commentFields = commentFields;
        },

        /**
        * Sets visibiltiy of like, comment and gallery buttons
        */
        setActionsVisibility: function (settings, commentTable) {
            this.actionVisibilities = {
                "showVotes": settings.like,
                "showComments": settings.comment,
                "showGallery": settings.gallery
            };
            this._commentTable = commentTable;
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
            return item.getTitle ? item.getTitle() : "";
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
            domClass.add(this.commentsForm, "esriCTHidden");
            arrayUtil.forEach(dojoQuery(".esriCTDetailButtonContainer"), lang.hitch(this, function (currentButton) {
                domClass.remove(currentButton.children[0], "esriCTDetailButtonSelected");
            }));
        },

        _buildItemDisplay: function () {
            this.itemTitleDiv.innerHTML = this.itemTitle;
            this.itemVotesDiv.innerHTML = this.itemVotes.label;
            domAttr.set(this.votesDetailContainer, "title", this.itemVotes.label + " " + this.i18n.likeButtonTooltip);
            if (this.actionVisibilities.showVotes && this.votesField) {
                domClass.remove(this.votesDetailContainer, "esriCTHidden");
            } else {
                domClass.add(this.votesDetailContainer, "esriCTHidden");
            }
            if (this.actionVisibilities.showComments) {
                this._initCommentsDiv();
            }
            this.itemCP.set('content', this.item.getContent());
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

        _submitComment: function (item) {
            var featureData, attributes = {};
            //Proceed if relatedTable and relationships is available, if not show error.
            if (this._commentTable && this._commentTable.relationships.length > 0 && this._commentTable.relationships[0].keyField && item._layer.relationships[0].keyField) {
                if (lang.trim(this.commentsTextArea.value) !== "") {
                    // Create instance of graphic
                    featureData = new Graphic();
                    // create an empty array object
                    attributes[this.appConfig.commentField] = lang.trim(this.commentsTextArea.value);
                    attributes[this._commentTable.relationships[0].keyField] = item.attributes[item._layer.relationships[0].keyField];
                    featureData.setAttributes(attributes);
                    this.appUtils.showLoadingIndicator();
                    this._commentTable.applyEdits([featureData], null, null, lang.hitch(this, function (result) {
                        if (result[0].success && this.commentsTextArea.value !== "") {
                            this._queryComments(item);
                            // Assigning maxLength for Text area
                            this._setTextAreaMaxLength();
                            this.commentsTextArea.value = "";
                            this._showPanel(this.commentsForm, this.commentButton, true);
                        } else {
                            // If comment container has no comment then show message and set the remaining text
                            if (this.commentsTextArea.value === "") {
                                this._setTextAreaMaxLength();
                                alert(this.appConfig.i18n.comment.emptyCommentMessage);
                                return;
                            }
                            // Assigning maxLength for textarea
                            this._setTextAreaMaxLength();
                            this.commentsTextArea.value = "";
                            this.appUtils.showError(this.appConfig.i18n.comment.errorInSubmittingComment);
                        }
                        this.appUtils.hideLoadingIndicator();
                    }), lang.hitch(this, function (err) {
                        // Assigning maxLength for textarea
                        this._setTextAreaMaxLength();
                        this.commentsTextArea.value = "";
                        this.appUtils.showError(this.appConfig.i18n.comment.errorInSubmittingComment);
                        this.appUtils.hideLoadingIndicator();
                    }));
                } else {
                    // Assigning  maxLength for textarea
                    this._setTextAreaMaxLength();
                    this.commentsTextArea.value = "";
                    alert(this.appConfig.i18n.comment.emptyCommentMessage);
                }
            } else {
                // Assigning maxLength for textarea
                this._setTextAreaMaxLength();
                this.commentsTextArea.value = "";
                this.appUtils.showError(this.appConfig.i18n.comment.errorInSubmittingComment);
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
            domConstruct.create('div', {
                'class': 'esriCTCommentsText',
                'innerHTML': comment.attributes[this.appConfig.commentField]
            }, this.commentsList);
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
            updateQuery.objectIds = [item.attributes[item._layer.objectIdField]];
            updateQuery.returnGeometry = true;
            updateQuery.outFields = ["*"];
            updateQuery.relationshipId = item._layer.relationships[0].id;
            item._layer.queryRelatedFeatures(updateQuery, lang.hitch(this, function (results) {
                var pThis = this, fset, features;
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
                fset = results[item.attributes[item._layer.objectIdField]];
                features = fset ? fset.features : [];
                this.clearComments();
                if (features.length > 0) {
                    // Sort by descending OID order
                    features.sort(sortByOID);
                    this._setComments(results[item.attributes[item._layer.objectIdField]].features);
                    domClass.add(this.noCommentsDiv, "esriCTHidden");
                } else {
                    domClass.remove(this.noCommentsDiv, "esriCTHidden");
                    domAttr.set(this.noCommentsDiv, "innerHTML", this.appConfig.i18n.comment.noCommentsAvailableText);
                }
                // Getting character length from comments table
                if (pThis._commentTable && pThis._commentTable.fields) {
                    // Looping through the fields present in the related table for getting character length
                    arrayUtil.forEach(pThis._commentTable.fields, function (currentField) {
                        if (currentField.name === pThis.appConfig.commentField) {
                            pThis.characterLength = currentField.length;
                            // Assigning maxLength for textarea
                            pThis._setTextAreaMaxLength();
                        }
                    });
                }

            }), lang.hitch(this, function (err) {
                console.log(err.message || "queryRelatedFeatures");
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
            item._layer.queryAttachmentInfos(item.attributes[item._layer.objectIdField], lang.hitch(this, function (infos) {
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
        }
    });
});
