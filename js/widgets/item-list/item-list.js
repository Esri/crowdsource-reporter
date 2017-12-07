/*global define,dojo,console */
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
    'dojo/on',
    'dojo/query',
    'dojo/topic',
    'dojo/NodeList-dom',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin',
    'dojo/text!./templates/item-list-view.html'
], function (declare, lang, arrayUtil, domConstruct, domStyle, domClass, on, dojoQuery, topic, nld,
    _WidgetBase, _TemplatedMixin,
    template) {

    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        showLikes: false,
        currentMap: null,
        /**
        * Widget constructor. Placeholder if future functionality is needed in the
        * widget creation life cycle.
        * @constructor
        */
        constructor: function () {
            this.inherited(arguments);
        },

        /**
        * Widget post-create, called automatically in widget creation
        * life cycle, after constructor. Sets class variables.
        */
        postCreate: function () {
            this.inherited(arguments);
            this.i18n = this.appConfig.i18n.itemList;
            this.hide();
        },

        /**
        * Widget startup. Placeholder if functionality is needed in the
        * widget creation life cycle
        *
        */
        startup: function () {
            this.inherited(arguments);
        },

        /**
        * Shows the widget with a simple display: ''
        */
        show: function () {
            domStyle.set(this.domNode, 'display', '');
        },

        /**
        * Hides the widget with a simple display: 'none'
        */
        hide: function () {
            domStyle.set(this.domNode, 'display', 'none');
        },

        /**
        * Sets the fields that are needed to display feature information in this list (number of votes).
        * Needs to be called before first setItems to tell the widget which fields to look for.
        * @param {string} votesField Name of votes property
        */
        setLikeField: function (votesField) {
            this.votesField = votesField;
        },

        /**
        * Sets the items to be displayed in the items list, and then builds the list.
        * @param {array} items feature collection or array
        */
        setItems: function (items) {
            this.items = items;
            this.clearList();
            this.buildList();
        },

        /**
        * Sets the OID of the item to be considered the current selection.
        * @param {OID} itemOID
        */
        setSelection: function (itemOID) {
            this.selectedItemOID = itemOID;
        },

        /**
        * Clears the OID of the item considered as the current selection.
        */
        clearSelection: function () {
            this.selectedItemOID = null;
            this.refreshList();

        },

        /**
        * Clears the items list
        */
        clearList: function () {
            domConstruct.empty(this.list);
        },

        /**
        * Refresh the items list
        */
        refreshList: function (item) {
            var currentNode, itemVotes, favIconDiv, votesNode, titleNode;
            //Clear all the previously selected feature
            arrayUtil.forEach(dojoQuery(".esriCTItemSummaryParentSelected", this.domNode), lang.hitch(this, function (currentNode) {
                domClass.remove(currentNode, "esriCTItemSummaryParentSelected");
                domClass.remove(dojoQuery(".esriCTItemSummaryHighlighter", currentNode)[0], "esriCTItemSummarySelected");

            }));
            //If selected features object id exsist, highlight the dom element
            if (this.selectedItemOID) {
                currentNode = dojoQuery("." + this.selectedItemOID, this.domNode);
                if (currentNode.length > 0) {
                    domClass.add(currentNode[0], "esriCTItemSummaryParentSelected");
                    domClass.add(dojoQuery(".esriCTItemSummaryHighlighter", currentNode[0])[0], "esriCTItemSummarySelected");
                }
                if (item && this.showLikes) {
                    //If votes count is increased, update the selected items votes in item list
                    itemVotes = this.getItemVotes(item);
                    favIconDiv = dojoQuery(".esriCTItemFav", currentNode[0])[0];
                    favIconDiv.title = itemVotes.label + " " + this.i18n.likesForThisItemTooltip;
                    votesNode = dojoQuery(".esriCTItemVotes", currentNode[0])[0];
                    votesNode.innerHTML = itemVotes.label;
                }
                //Update the title for issue wall or my issue list
                if (dojoQuery(".esriCTMyIssuePopupTitle", currentNode[0]).length > 0) {
                    titleNode = dojoQuery(".esriCTMyIssuePopupTitle", currentNode[0])[0];
                } else {
                    titleNode = dojoQuery(".esriCTItemTitle", currentNode[0])[0];
                }
                if (titleNode) {
                    titleNode.innerHTML = this.getItemTitle(item) || "&nbsp;";
                }
            }
        },

        /**
        * Builds the items list
        */
        buildList: function () {
            //scroll the list to top always
            this.list.scrollTop = 0;
            arrayUtil.forEach(this.items, lang.hitch(this, this.buildItemSummary));
            if (this.featureLayerCount && this.items && this.featureLayerCount !== this.items.length) {
                this._createLoadMoreButton();
            }
            this.appUtils.hideLoadingIndicator();
        },

        /**
        * Builds an individual item summary given an item.
        * @param  {feature} item to display in the list
        */
        buildItemSummary: function (item) {
            var itemTitle, itemVotes, itemSummaryDiv, itemTitleDiv, favDiv, itemSummaryParent, itemSummaryHighlighter, details = "", itemTitleDivMyIssues, selectedLayerId, objectIdFieldName;
            item = (item && item.graphic) ? item.graphic : item;
            itemTitle = this.getItemTitle(item) || "&nbsp;";
            if (this.isMyIssues) {
                details = item.webMapTitle + " : " + item.layerTitle;
                this.showLikes = item.showLikes;
                selectedLayerId = item._layer.id;
                objectIdFieldName = item._layer.objectIdField;
            } else {
                selectedLayerId = this.selectedLayer.id;
                objectIdFieldName = this.selectedLayer.objectIdField;
            }
            itemSummaryParent = domConstruct.create('div', {
                'class': 'esriCTtemSummaryParent, ' + item.attributes[objectIdFieldName] + "_" + item.webMapId + "_" + selectedLayerId,
                "click": lang.partial(this.summaryClick, this, item)
            }, this.list);

            itemSummaryHighlighter = domConstruct.create('div', {
                'class': 'esriCTItemSummaryHighlighter'
            }, itemSummaryParent);

            itemSummaryDiv = domConstruct.create('div', {
                'class': 'esriCTItemSummary esriCTCalculatedBodyTextColorAsBorder'
            }, itemSummaryParent);

            if (this.isMyIssues) {
                itemTitleDivMyIssues = domConstruct.create('div', {
                    'class': 'esriCTItemTitle'
                }, itemSummaryDiv);

                domConstruct.create('div', {
                    'class': 'esriCTItemListTitleFullWidth esriCTEllipsis',
                    'innerHTML': details
                }, itemTitleDivMyIssues);

                domConstruct.create('div', {
                    'class': 'esriCTItemListTitleFullWidth esriCTEllipsis esriCTMyIssuePopupTitle',
                    'innerHTML': itemTitle
                }, itemTitleDivMyIssues);
            } else {
                itemTitleDiv = domConstruct.create('div', {
                    'class': 'esriCTItemTitle',
                    'innerHTML': itemTitle
                }, itemSummaryDiv);
            }

            //If selected features object id exsist, make sure we are highlighting the respective row
            if (this.selectedItemOID && this.selectedItemOID === item.attributes[this.selectedLayer.objectIdField] + "_" + item.webMapId + "_" + selectedLayerId) {
                domClass.add(itemSummaryParent, "esriCTItemSummaryParentSelected");
                domClass.add(itemSummaryHighlighter, "esriCTItemSummarySelected");
            }

            if (this.showLikes) {
                itemVotes = this.getItemVotes(item);
                favDiv = domConstruct.create('div', {
                    'class': 'esriCTItemFav esriCTCalculatedBodyTextColor',
                    'title': itemVotes.label + " " + this.i18n.likesForThisItemTooltip
                }, itemSummaryDiv);

                domConstruct.create('div', {
                    'class': 'esriCTItemVotes esriCTCalculatedBodyTextColor esriCTEllipsis',
                    'innerHTML': itemVotes.label
                }, favDiv);

                domConstruct.create('div', {
                    'class': 'glyphicon glyphicon-heart esriCTFavDiv esriCTCalculatedBodyTextColor'
                }, favDiv);
            } else {
                //If like field is not configured use the entire space for issue title
                if (this.isMyIssues && itemTitleDivMyIssues) {
                    domClass.add(itemTitleDivMyIssues, "esriCTItemListTitleFullWidth");
                } else {
                    domClass.add(itemTitleDiv, "esriCTItemListTitleFullWidth");
                }
            }
        },

        /**
        * Gets title of feature for list display
        * @param  {feature} item The feature for which to get the title
        * @return {string}      The title of the feature
        */
        getItemTitle: function (item) {
            return item.originalFeature.getTitle ? item.originalFeature.getTitle() : "";
        },

        /**
        * Gets the number of votes for an item
        * @param  {feature} item The feature for which to get the vote count
        * @return {object} Object containing "label" with vote count for the item in a shortened form (num if <1000,
        * floor(count/1000)+"k" if <1M, floor(count/1000000)+"M" otherwise) and "needSpace" that's indicates if an
        * extra digit of room is needed to handle numbers between 99K and 1M, exclusive
        */
        getItemVotes: function (item) {
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

        /**
        * Called on an item summary click
        * @param  {context} self The widget itself, since 'this' is the row that was clicked
        * @param  {feature} feat The feature that corresponds to the row that was clicked
        * @param  {mouse event} evt  The click event on the row that was clicked
        */
        summaryClick: function (self, feat, evt) {
            // 'this' = row click
            return true;
        },

        /**
        * Create load more button
        */
        _createLoadMoreButton: function () {
            var loadMoreButton, itemSummaryDiv, itemTitleDivMyIssues;
            loadMoreButton = domConstruct.create('div', {
                'class': 'esriCTtemSummaryParent'
            }, this.list);

            itemSummaryDiv = domConstruct.create('div', {
                'class': 'esriCTItemSummary esriCTCalculatedBodyTextColorAsBorder'
            }, loadMoreButton);

            itemTitleDivMyIssues = domConstruct.create('div', {
                'class': 'esriCTLoadMoreContainer'
            }, itemSummaryDiv);

            domConstruct.create('div', {
                'class': 'esriCTItemListTitleFullWidth esriCTEllipsis esriCTMyIssuePopupTitle esriCTLoadMoreButton',
                'innerHTML': this.i18n.loadMoreButtonText
            }, itemTitleDivMyIssues);

            on(loadMoreButton, "click", lang.hitch(this, function (evt) {
                this.onLoadMoreClick();
            }));
        },

        onLoadMoreClick: function (evt) {
            return evt;
        }
    });
});

