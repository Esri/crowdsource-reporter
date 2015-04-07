/*global define,dojo,alert,document,dojoConfig,moment */
/*jslint browser:true,sloppy:true,nomen:true,unparam:true,plusplus:true,indent:4 */
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
    "dojo/_base/lang",
    "dojo/dom-attr",
    "dojo/dom-class",
    "dojo/dom-construct",
    "dojo/dom-style",
    "dojo/query",
    "dojo/on",
    "dojo/string",
    "esri/Color",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/geometry/Polyline",
    "esri/geometry/Polygon",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/tasks/query"
], function (
    lang,
    domAttr,
    domClass,
    domConstruct,
    domStyle,
    query,
    on,
    string,
    Color,
    Graphic,
    Point,
    Polyline,
    Polygon,
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    SimpleFillSymbol,
    Query
) {
    return {
        /*
        * Resize issue details container
        * @param{object} listContainer - issue details container
        */
        resizeIssuesContainer: function (listContainer) {
            var detailDiv, detailHeaderDiv, detailFooterDiv, detailBodyheight, listDetailsData;
            //check if issue details div is open,then adjust the detailed container height
            if (!domClass.contains(listContainer, "esriCTHidden")) {
                detailDiv = query(".esriCTListDetails", listContainer);
                detailHeaderDiv = query(".esriCTIssueDetailsHeader", listContainer);
                detailFooterDiv = query(".esriCTIssueFooterHeight", listContainer);
                detailBodyheight = parseInt(detailDiv[0].clientHeight - (detailHeaderDiv[0].clientHeight + detailFooterDiv[0].clientHeight + 17), 10);
                listDetailsData = query(".esriCTDetailsData")[0];
                if (listDetailsData) {
                    domStyle.set(listDetailsData, "height", detailBodyheight + "px");
                    if ((dojo.isIE < 9) && detailBodyheight < 500) {
                        domStyle.set(listDetailsData, "min-height", detailBodyheight + "px");
                        domStyle.set(listDetailsData, "max-height", detailBodyheight + "px");
                    }
                }
            }
        },

        /**
        * Hide issue details container and show issue list container
        * @param{object} listDetailedContainer - issue details container
        * @param{object} listContainer - issue list container
        */
        hideIssueDetailsPanel: function (listDetailedContainer, listContainer) {
            domConstruct.empty(listDetailedContainer);
            domClass.add(listDetailedContainer, "esriCTHidden");
            domClass.remove(listContainer, "esriCTHidden");
        },

        /**
        * Display popup fields in issue details panel
        * @param{object} displayPopupParam - layer and popup details
        */
        displayPopupFields: function (displayPopupParam) {
            var x, container, fieldContent, fieldLabel, fieldValue, popupInfoValue, fieldInfo, domainValue, isLink, spanLink, urlRegex;
            // loop for field data in info popup
            for (x = 0; x < displayPopupParam.operationalLayer.popupInfo.fieldInfos.length; x++) {
                if (displayPopupParam.operationalLayer.popupInfo.fieldInfos[x].visible) {
                    if (this.isFieldAvailable(displayPopupParam.operationalLayer.layerObject, displayPopupParam.operationalLayer.popupInfo.fieldInfos[x].fieldName)) {
                        isLink = false;
                        container = domConstruct.create("div", {
                            "class": "esriCTDetailsContainer"
                        }, displayPopupParam.detailsData);
                        fieldLabel = displayPopupParam.operationalLayer.popupInfo.fieldInfos[x].label;
                        if (lang.trim(fieldLabel) === "") {
                            fieldLabel = displayPopupParam.operationalLayer.popupInfo.fieldInfos[x].fieldName;
                        }
                        domConstruct.create("div", {
                            "class": "esriCTListItemHeader",
                            "innerHTML": fieldLabel
                        }, container);
                        fieldContent = domConstruct.create("div", {
                            "class": "esriCTListData"
                        }, container);
                        popupInfoValue = displayPopupParam.operationalLayer.popupInfo.fieldInfos[x];
                        fieldValue = "";
                        // Assigning the selected attribute value from popup info to fieldValue
                        if (displayPopupParam.featureSet[popupInfoValue.fieldName] !== null && displayPopupParam.featureSet[popupInfoValue.fieldName] !== "") {
                            fieldValue = displayPopupParam.featureSet[popupInfoValue.fieldName];
                        }
                        urlRegex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
                        if ((!fieldValue && fieldValue !== 0) || lang.trim(String(fieldValue)) === "") {
                            // Assigning empty string to attributes with null value
                            fieldValue = dojo.configData.showNullValueAs + "<br/>";
                        } else if (fieldValue.toString().match(urlRegex)) {
                            isLink = true;
                            // If the attribute contains a URL, display link text and open the URL on click of the text
                            spanLink = domConstruct.create("span", { "class": " esriCTInfoLink", "innerHTML": dojo.configData.i18n.issueDetailsHelper.link }, fieldContent);
                            on(spanLink, "click", lang.hitch(this, this.openWindowHandler(fieldValue)));
                        } else {
                            fieldInfo = this.isDateField(popupInfoValue.fieldName, displayPopupParam.operationalLayer.layerObject);
                            if (fieldInfo && displayPopupParam.isSetDateFormat) {
                                fieldValue = this.setDateFormat(popupInfoValue, displayPopupParam.featureSet[fieldInfo.name]);
                            } else {
                                fieldInfo = this.hasDomainCodedValue(popupInfoValue.fieldName, displayPopupParam.featureSet, displayPopupParam.operationalLayer.layerObject);
                                if (fieldInfo) {
                                    if (fieldValue === null || lang.trim(String(fieldValue)) === "") {
                                        fieldValue = "<br/>";
                                    } else if (fieldInfo.isTypeIdField) {
                                        fieldValue = fieldInfo.name;
                                    } else {
                                        domainValue = this.domainCodedValues(fieldInfo, fieldValue);
                                        fieldValue = domainValue.domainCodedValue;
                                    }
                                }
                            }
                            if (popupInfoValue.format) {
                                // Check whether format for digit separator is required
                                fieldValue = this.numberFormatCorverter(popupInfoValue, fieldValue);
                            }
                        }
                        if (!isLink) {
                            domAttr.set(fieldContent, "innerHTML", fieldValue);
                        }
                    }
                }
            }
        },

        /**
        * Check if configured field is available in layer
        * @param{object} layerObject is operational layer object
        * @param{object} fieldName is field name
        */
        isFieldAvailable: function (layerObject, fieldName) {
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
        * open link in a new window
        * @param {url} get link URL
        */
        openWindowHandler: function (link) {
            return function () {
                window.open(link);
            };
        },

        /**
        * check if field type is date
        * @param{object} layerObj - layer data
        * @param{string} fieldName - current field
        */
        isDateField: function (fieldName, layerObj) {
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
        * Fetch field from popup info
        * @param{string} fieldName - current field
        * @param{object} popupInfo - operational layer popupInfo object
        */
        getPopupInfo: function (fieldName, popupInfo) {
            var i, fieldInfo;
            for (i = 0; i < popupInfo.fieldInfos.length; i++) {
                if (popupInfo.fieldInfos[i].fieldName === fieldName) {
                    fieldInfo = popupInfo.fieldInfos[i];
                    break;
                }
            }
            return fieldInfo;
        },

        /**
        * Sets the info popup header for each issue in the issue list
        * @param{array} featureSet
        * @param{object} operationalLayer - operational layer data
        * @param{boolean} isSetDateFormat - indicates whether date field should be formatted or not
        */
        getIssueDetailsTitle: function (featureSet, operationalLayer, isSetDateFormat) {
            var i, j, titleField, fieldValue, domainValue, popupTitle, titleArray, headerValue, headerFieldArray, fieldInfo, popupInfoValue;
            headerValue = null;
            // split info popup header fields
            popupTitle = operationalLayer.popupInfo.title.split("{");
            headerFieldArray = [];
            // if header contains more than 1 fields
            if (popupTitle.length > 1) {
                // get strings from header
                titleField = lang.trim(popupTitle[0]);
                for (i = 0; i < popupTitle.length; i++) {
                    // insert remaining fields in an array
                    titleArray = popupTitle[i].split("}");
                    if (i === 0) {
                        if (featureSet.hasOwnProperty(titleArray[0])) {
                            fieldValue = featureSet[titleArray[0]];
                            // concatenate string and first field from the header and insert in an array
                            headerFieldArray.push(fieldValue);
                        } else {
                            headerFieldArray.push(titleField);
                        }
                    } else {
                        for (j = 0; j < titleArray.length; j++) {
                            if (j === 0) {
                                if (featureSet.hasOwnProperty(titleArray[j])) {
                                    //check for date type field in popup title
                                    fieldInfo = this.isDateField(titleArray[j], operationalLayer.layerObject);
                                    popupInfoValue = this.getPopupInfo(titleArray[j], operationalLayer.popupInfo);
                                    fieldValue = featureSet[lang.trim(titleArray[j])];
                                    if (fieldValue !== null && lang.trim(String(fieldValue)) !== "") {
                                        if (fieldInfo && isSetDateFormat) {
                                            //set date format
                                            fieldValue = this.setDateFormat(popupInfoValue, fieldValue);
                                        } else {
                                            fieldInfo = this.hasDomainCodedValue(titleArray[j], featureSet, operationalLayer.layerObject);
                                            if (fieldInfo) {
                                                if (fieldInfo.isTypeIdField) {
                                                    fieldValue = fieldInfo.name;
                                                } else {
                                                    domainValue = this.domainCodedValues(fieldInfo, fieldValue);
                                                    fieldValue = domainValue.domainCodedValue;
                                                }
                                            }
                                        }
                                    }
                                    if (popupInfoValue.format) {
                                        // Check whether format for digit separator is available
                                        fieldValue = this.numberFormatCorverter(popupInfoValue, fieldValue);
                                    }
                                    headerFieldArray.push(fieldValue);
                                }
                            } else {
                                headerFieldArray.push(titleArray[j]);
                            }
                        }
                    }
                }

                // form a string from the headerFieldArray array, to display in header
                for (j = 0; j < headerFieldArray.length; j++) {
                    if (headerFieldArray[j] === null) {
                        headerFieldArray[j] = dojo.configData.showNullValueAs;
                    }
                    if (headerValue) {
                        headerValue = headerValue + headerFieldArray[j];
                    } else {
                        headerValue = headerFieldArray[j];
                    }
                }
            } else {
                // if popup title is not empty, display popup field headerValue else display a configurable text
                if (lang.trim(operationalLayer.popupInfo.title) !== "") {
                    headerValue = string.substitute(lang.trim(operationalLayer.popupInfo.title), featureSet);
                }
            }
            if (headerValue === null) {
                headerValue = dojo.configData.showNullValueAs;
            }
            return headerValue;
        },

        /**
        * Show or hide comment icon
        * @param{object} commentParams
        * @param{object} issueDetailsParam
        */
        showHideCommentIcon: function (commentParams, issueDetailsParam) {
            var commentIcon, commentIconContent;
            // if the layer contains a related table and the related table has a field for comments, show comment icon else hide the icon
            if (commentParams.commentFlag && commentParams.relatedTable) {
                commentIcon = query('.esriCTCommentsIcon', commentParams.parentNode)[0];
                domAttr.set(commentIcon, "objId", commentParams.attributes[commentParams.objectId]);
                domAttr.set(commentIcon, "globalID", commentParams.attributes[commentParams.layer.globalIdField]);
                this.handleCommentsIconClick(commentIcon, commentParams, issueDetailsParam);
            } else {
                // hide comment icon
                commentIconContent = query('.esriCTCommentsIcon', commentParams.parentNode)[0].parentElement;
                domStyle.set(commentIconContent, "visibility", "hidden");
            }
        },

        /**
        * Attach click event to comment icon
        * @param{object} commentIcon
        * @param{object} commentParams
        * @param{object} issueDetailsParam
        */
        handleCommentsIconClick: function (commentIcon, commentParams, issueDetailsParam) {
            var commentIconTarget;
            on(commentIcon, "click", lang.hitch(this, function (evt) {
                commentIconTarget = evt.currentTarget || evt.srcElement;
                dojo.applicationUtils.showLoadingIndicator();
                commentParams.objectId = domAttr.get(commentIconTarget, "objId");
                commentParams.globalIdField = domAttr.get(commentIconTarget, "globalID");
                if (issueDetailsParam.isHighlightFeature) {
                    //highlight Issue on map when comments icon is clicked
                    this.highLightFeatureOnClick(commentParams.layer, commentParams.objectId, issueDetailsParam.selectedGraphicsLayer, issueDetailsParam.map);
                }
                issueDetailsParam.issueCommentWidget.fetchComments(commentParams);
            }));
        },

        /**
        * Show attached images in the issue details
        * @param{array} operationalLayer
        * @param{object} parentDiv
        * @param{string} objectID
        * @param{string} attachmentHeaderTitle
        */
        showAttachments: function (operationalLayer, parentDiv, objectID, attachmentHeaderTitle) {
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
                        "innerHTML": attachmentHeaderTitle,
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
                        // Hide loader image after image is loaded
                        on(imageDiv[i], "load", lang.hitch(this, this.onImageLoad));
                        // Show image in new tab on click of the image thumbnail
                        on(imageDiv[i], "click", lang.hitch(this, this.openAttachments));
                    }
                }
            }), function (err) {
                dojo.applicationUtils.showError(err.message);
            });
        },

        /**
        * Highlight feature on map
        * @param{object} layer
        * @param{string} objectId
        * @param{object} selectedGraphicsLayer
        * @param{object} map
        */
        highLightFeatureOnClick: function (layer, objectId, selectedGraphicsLayer, map) {
            var esriQuery, highlightSymbol;
            // clear graphics layer
            selectedGraphicsLayer.clear();
            esriQuery = new Query();
            esriQuery.objectIds = [parseInt(objectId, 10)];
            esriQuery.returnGeometry = true;
            layer.queryFeatures(esriQuery, lang.hitch(this, function (featureSet) {
                if (featureSet.features[0]) {
                    highlightSymbol = this.getHighLightSymbol(featureSet.features[0], layer, map);
                    // add highlight symbol to graphics layer
                    selectedGraphicsLayer.add(highlightSymbol);
                }
            }), function (err) {
                dojo.applicationUtils.showError(err.message);
            });
        },

        /**
        * Get description from layer popup info
        * @param{object} featureSet is feature object
        * @param{object} operationalLayerDetails
        */
        getDescription: function (featureSet, operationalLayerDetails) {
            var descriptionValue, i, field, splittedArrayForClosingBraces, fieldInfo, popupInfoValue, domainValue, fieldValue;
            // Assuming Fields will be configure within the curly braces'{}'
            // check if Custom Configuration has any fields Configured in it.
            if (operationalLayerDetails.popupInfo.description.split("{").length > 0) {
                // Add the data before 1st instance on curly '{' braces
                descriptionValue = operationalLayerDetails.popupInfo.description.split("{")[0];
                // Loop through the possible number of configured fields
                for (i = 1; i < operationalLayerDetails.popupInfo.description.split("{").length; i++) {
                    // check if string is having closing curly braces '}'. i.e. it has some field
                    if (operationalLayerDetails.popupInfo.description.split("{")[i].indexOf("}") !== -1) {
                        splittedArrayForClosingBraces = operationalLayerDetails.popupInfo.description.split("{")[i].split("}");
                        field = string.substitute(splittedArrayForClosingBraces[0]);
                        fieldInfo = this.isDateField(field, operationalLayerDetails.layerObject);
                        popupInfoValue = this.getPopupInfo(field, operationalLayerDetails.popupInfo);
                        if (fieldInfo && featureSet[lang.trim(field)] !== null && lang.trim(String(featureSet[lang.trim(field)])) !== "") {
                            //set date format
                            fieldValue = this.setDateFormat(popupInfoValue, featureSet[lang.trim(field)]);
                            if (popupInfoValue.format) {
                                // Check whether format for digit separator is available
                                fieldValue = this.numberFormatCorverter(popupInfoValue, fieldValue);
                            }
                            descriptionValue += fieldValue;
                        } else {
                            fieldInfo = this.hasDomainCodedValue(field, featureSet, operationalLayerDetails.layerObject);
                            if (fieldInfo) {
                                if (fieldInfo.isTypeIdField) {
                                    descriptionValue += fieldInfo.name;
                                } else {
                                    domainValue = this.domainCodedValues(fieldInfo, featureSet[lang.trim(field)]);
                                    descriptionValue += domainValue.domainCodedValue;
                                }
                            } else if (featureSet[field] || featureSet[field] === 0) {
                                // Check if the field is valid field or not, if it is valid then substitute its value.
                                fieldValue = featureSet[field];
                                if (popupInfoValue.format) {
                                    // Check whether format for digit separator is available
                                    fieldValue = this.numberFormatCorverter(popupInfoValue, fieldValue);
                                }
                                descriptionValue += fieldValue;
                            } else if (field === "") {
                                // if field is empty means only curly braces are configured in pop-up
                                descriptionValue += "{}";
                            }
                        }
                        splittedArrayForClosingBraces.shift();
                        // If splittedArrayForClosingBraces length is more than 1, then there are more closing braces in the string, so join the array with }
                        if (splittedArrayForClosingBraces.length > 1) {
                            descriptionValue += splittedArrayForClosingBraces.join("}");
                        } else {
                            descriptionValue += splittedArrayForClosingBraces.join("");
                        }
                    } else {
                        // If there is no closing bracket then add the rest of the string prefixed with '{' as we have split it with '{'
                        descriptionValue += "{" + operationalLayerDetails.popupInfo.description.split("{")[i];
                    }
                }
            } else {
                // No '{' braces means no field has been configured only Custom description is present in pop-up
                descriptionValue = operationalLayerDetails.popupInfo.description;
            }
            return descriptionValue;
        },

        /**
        * Format number value based on the format received from info popup
        * @param{object} popupInfoValue
        * @param{string} fieldValue
        */
        numberFormatCorverter: function (popupInfoValue, fieldValue) {
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
        * Format date value based on the format received from info popup
        * @param{object} dateFieldInfo
        * @param{string} dataFieldValue
        */
        setDateFormat: function (dateFieldInfo, dateFieldValue) {
            if (dateFieldInfo.format && dateFieldInfo.format.dateFormat) {
                dateFieldValue = moment(dateFieldValue).format(dojo.applicationUtils.getDateFormat(dateFieldInfo.format.dateFormat).dateFormat);
            } else {
                dateFieldValue = (moment(dateFieldValue).toDate()).toLocaleDateString();
            }
            return dateFieldValue;
        },

        /**
        * Check if field has domain coded values
        * @param{string} fieldName
        * @param{object} feature
        * @param{object} layerObject
        */
        hasDomainCodedValue: function (fieldName, feature, layerObject) {
            var i, j, fieldInfo;
            for (i = 0; i < layerObject.fields.length; i++) {
                if (layerObject.fields[i].name === fieldName) {
                    if (layerObject.fields[i].domain && layerObject.fields[i].domain.codedValues) {
                        fieldInfo = layerObject.fields[i];
                    } else if (layerObject.typeIdField) {
                        // get types from layer object, if typeIdField is available
                        for (j = 0; j < layerObject.types.length; j++) {
                            if (String(layerObject.types[j].id) === String(feature[layerObject.typeIdField])) {
                                fieldInfo = layerObject.types[j];
                                break;
                            }
                        }
                        // if types info is found for current value of typeIdField then break the outer loop
                        if (fieldInfo) {
                            break;
                        }
                    }
                }
            }
            // get domain values from layer types object according to the value of typeIdfield
            if (fieldInfo && fieldInfo.domains) {
                if (layerObject.typeIdField && layerObject.typeIdField !== fieldName) {
                    fieldInfo.isTypeIdField = false;
                    if (fieldInfo.domains.hasOwnProperty(fieldName)) {
                        fieldInfo.domain = {};
                        fieldInfo.domain = fieldInfo.domains[fieldName];
                    } else {
                        fieldInfo = null;
                    }
                } else {
                    // Set isTypeIdField to true if current field is typeIdField
                    fieldInfo.isTypeIdField = true;
                }
            }
            return fieldInfo;
        },

        /**
        * fetch domain coded value
        * @param{object} operationalLayerDetails
        * @param{string} fieldValue
        */
        domainCodedValues: function (operationalLayerDetails, fieldValue) {
            var k, codedValues, domainValueObj;
            domainValueObj = { domainCodedValue: dojo.configData.showNullValueAs };
            codedValues = operationalLayerDetails.domain.codedValues;
            if (codedValues) {
                // Loop for codedValue
                for (k = 0; k < codedValues.length; k++) {
                    // Check if the value is string or number
                    if (isNaN(codedValues[k].code)) {
                        // Check if the fieldValue and codedValue is equal
                        if (codedValues[k].code === fieldValue) {
                            fieldValue = codedValues[k].name;
                        }
                    } else if (codedValues[k].code === parseInt(fieldValue, 10)) {
                        fieldValue = codedValues[k].name;
                    }
                }
            }
            domainValueObj.domainCodedValue = fieldValue;
            return domainValueObj;
        },

        /**
        * Show attachments in new window when user clicks on the attachment thumbnail
        * @param{object} evt
        */
        openAttachments: function (evt) {
            window.open(evt.target.alt);
        },

        /**
        * Callback handler for image loaded event.
        * @param{object} evt
        */
        onImageLoad: function (evt) {
            // if event target is available
            if (evt && evt.target && evt.target.parentNode) {
                // hide the image loader once the image is loaded, and set the image dimensions so that complete image will be shown in thumbnail.
                domClass.remove(evt.target.parentNode, "esriCTImageLoader");
            }

            // if event target is available
            if (evt && evt.target) {
                this.setImageDimensions(evt.target, true);
            }
        },

        /**
        * Set the images dimensions so that the complete image will be shown in thumbnail
        * @param{object} imgModule - Image object
        * @param{Boolean} isOnLoad - set this flag this function is called after image load.
        */
        setImageDimensions: function (imgModule, isOnLoad) {
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
        * Create crosshair symbol to highlight point feature
        * @param{object} symbol path
        * @param{object} symbol size
        */
        createSVGSymbol: function (path, size, offset) {
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
        * Get symbol used for highlighting feature
        * @param{string} graphic - graphic of the selected feature
        * @param{string} layer - layer details
        * @param{string} map
        */
        getHighLightSymbol: function (graphic, layer, map) {
            var i, symbol, path, symbolHeight, symbolWidth, size, symbolSize, polylineSymbol, polygonSymbol, offset = {},
                graphicInfoValue, layerInfoValue;
            /* If feature geometry is of type point, add a crosshair symbol
            If feature geometry is of type polyline, highlight the line
            If feature geometry is of type polygon, highlight the boundary of the polygon */
            switch (graphic.geometry.type) {
            case "point":
                path = "M 1784,238 1805,238 1805,259 1784,259 1784,238 M 1777,248 1784,248 M 1794,231 1794,238 M 1812,248 1805,248 M 1794,266 1794,259";
                symbolSize = 50; //set default Symbol size which will be used in case symbol not found.
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
                        if (layer.typeIdField) {
                            graphicInfoValue = graphic.attributes[layer.typeIdField];
                        }
                        else if (layer.renderer.attributeField) {
                            graphicInfoValue = graphic.attributes[layer.renderer.attributeField];
                        }
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
                symbol = new Graphic(new Point([graphic.geometry.x, graphic.geometry.y], map.spatialReference), this.createSVGSymbol(path, symbolSize, offset));
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
        }
    };
});