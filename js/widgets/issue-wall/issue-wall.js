/*global define,dojo,alert,moment */
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
    "dojo/text!./templates/issue-wall.html",
    "dojo/text!./templates/issue-item-template.html",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "esri/layers/FeatureLayer"

], function (declare, dom, domConstruct, domStyle, domAttr, domClass, lang, on, string, template, issueItemTemplate, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, FeatureLayer) {
    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        templateString: template,

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
            var operationalLayer, featureLayer;
            if (config) {
                lang.mixin(this, config);
            }
            operationalLayer = this.map.getLayer(this.operationalLayerId);
            featureLayer = new FeatureLayer(operationalLayer.url);
            on(featureLayer, "load", lang.hitch(this, function (evt) {
                setTimeout(lang.hitch(this, function () {
                    this._fetchIssueListData(operationalLayer);
                }), 1000);
            }));
        },

        /**
        * Fetch feature layer graphics and info popup header fields to be displayed in the list
        * @param{object} operationalLayer details
        * @memberOf widgets/issue-wall/issue-wall
        */
        _fetchIssueListData: function (operationalLayer) {
            var j, fields, fieldName, fieldValue, attributes, x, featureArray = [];
            domStyle.set(this.listLoadingIndicator, "display", "block");
            domConstruct.empty(this.listContainer);
            for (j = 0; j < operationalLayer.graphics.length; j++) {
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
                    if (operationalLayer.fields[x].name === fieldName) {
                        if (Number(attributes[operationalLayer.fields[x].name])) {
                            attributes[operationalLayer.fields[x].name] = moment(attributes[operationalLayer.fields[x].name]).format('MM-DD-YYYY');
                        }
                    }
                }

                if (!fieldName) {
                    // if edit date field is not available in the layer, perform sorting based on object id
                    for (x = 0; x < operationalLayer.fields.length; x++) {
                        if (operationalLayer.fields[x].type === "esriFieldTypeOID") {
                            fieldName = operationalLayer.fields[x].name;
                            fieldValue = operationalLayer.graphics[j].attributes[fieldName];
                        }
                    }
                }
                featureArray.push({
                    "attributes": attributes,
                    "sortValue": fieldValue
                });
            }
            // Sort feature array
            featureArray.sort(this._sortFeatureArray);
            this._displayIssueList(featureArray);
        },

        /**
        * Display list of issues in right panel
        * @param{array} featureSet
        * @memberOf widgets/issue-wall/issue-wall
        */
        _displayIssueList: function (featureSet) {
            var titleField, j, k, l, popupTitle, value, headerFieldArray, panelHeaderValue, templateString, parentDiv;
            domAttr.set(this.listContainerTitle, "innerHTML", this.operationalLayerDetails.title);
            if (featureSet.length > 0) {
                for (j = 0; j < featureSet.length; j++) {
                    popupTitle = this.operationalLayerDetails.popupInfo.title.split("{");

                    headerFieldArray = [];
                    if (popupTitle.length > 1) {
                        titleField = lang.trim(popupTitle[0]) + " ";
                        for (l = 1; l < popupTitle.length; l++) {
                            if (l === 1) {
                                headerFieldArray.push(titleField + string.substitute("${" + lang.trim(popupTitle[l]), featureSet[j].attributes));
                            } else {
                                headerFieldArray.push(string.substitute("${" + lang.trim(popupTitle[l]), featureSet[j].attributes));
                            }
                        }
                        value = null;
                        for (k = 0; k < headerFieldArray.length; k++) {
                            if (value) {
                                value = value + headerFieldArray[k];
                            } else {
                                value = headerFieldArray[k];
                            }
                        }
                        templateString = string.substitute(issueItemTemplate, {
                            IssueTitle: value
                        });
                    } else {
                        if (lang.trim(this.operationalLayerDetails.popupInfo.title) !== "") {
                            value = lang.trim(this.operationalLayerDetails.popupInfo.title);
                            panelHeaderValue = string.substitute(value, featureSet[j].attributes);
                        } else {
                            panelHeaderValue = dojo.configData.showNullValueAs;
                        }
                        templateString = string.substitute(issueItemTemplate, {
                            IssueTitle: panelHeaderValue
                        });
                    }
                    parentDiv = domConstruct.toDom(templateString).childNodes[0];
                    this.listContainer.appendChild(parentDiv);
                }
            } else {
                domConstruct.create("div", { "innerHTML": dojo.configData.i18n.issueWall.noResultsFound, "class": "esriCTNoIssuesDiv" }, this.listContainer);
            }
            domStyle.set(this.listLoadingIndicator, "display", "none");
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
        }

    });
});

