/*global define */
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
define({
  "map": {
    "error": "मानचित्र बनाने में अक्षम",
    "zoomInTooltip": "ज़ूम इन",
    "zoomOutTooltip": "जूम आउट",
    "geolocationTooltip": "वर्तमान स्थान"
  },
  "main": {
    "noGroup": "कोई समूह कॉन्फ़िगर नहीं",
    "submitReportButtonText": "रिपोर्ट जमा करें",
    "gotoListViewTooltip": "सूची दृश्य",
    "noFeatureGeomtery": "फीचर प्रदर्शित नहीं किया जा सकता है",
    "featureOutsideAOIMessage": "फीचर अध्ययन क्षेत्र के बाहर नहीं जोड़ा जा सकता है"
  },
  "signin": {
    "guestSigninText": "अतिथि के रूप में आगे बढ़ें",
    "signInOrText": "या",
    "signinOptionsText": "इससे साइन इन करें:",
    "noGroupNameText": "कृपया साइन इन करें",
    "guestLoginTooltip": "अतिथि के रूप में साइन इन करें",
    "facebookLoginTooltip": "Facebook से साइन इन करें",
    "twitterLoginTooltip": "Twitter से साइन इन करें",
    "googlePlusLoginTooltip": "Google+ से साइन इन करें",
    "agolLoginTooltip": "ArcGIS से साइन इन करें"
  },
  "webMapList": {
    "owner": "स्वामी",
    "created": "निर्माण तिथि",
    "modified": "संशोधित तिथि",
    "description": "विवरण",
    "snippet": "सार",
    "licenseInfo": "पहुँच बनाएं और प्रतिबंधों का उपयोग करें",
    "accessInformation": "क्रेडिट्स",
    "tags": "टैग्स",
    "numViews": "दृश्यों की संख्या",
    "avgRating": "रेटिंग",
    "noWebMapInGroup": "कॉन्फ़िगर किया गया समूह अमान्य है या इस समूह के साथ अभी तक कोई आइटम साझा नहीं की गई है।",
    "infoBtnToolTip": "मानचित्र की जानकारी"
  },
  "issueWall": {
    "noResultsFound": "कोई फीचर नहीं मिला",
    "noResultsFoundInCurrentBuffer": "आप के आस पास कोई फीचर नहीं मिला",
    "unableToFetchFeatureError": "इस कार्य को पूरा करने में असमर्थ",
    "gotoWebmapListTooltip": "मुख्य सूची पर जाएं",
    "gotoMapViewTooltip": "मानचित्र दृश्य"
  },
  "appHeader": {
    "myReport": "मेरी रिपोर्ट",
    "signIn": "साइन इन करें",
    "signOut": "साइन आउट करें",
    "signInTooltip": "साइन इन करें",
    "signOutTooltip": "साइन आउट करें",
    "myReportTooltip": "मेरी रिपोर्ट देखें"
  },
  "geoform": {
    "enterInformation": "विवरण",
    "selectAttachments": "अनुलग्नक",
    "selectFileText": "ब्राउज करें",
    "enterLocation": "स्थान",
    "reportItButton": "इसकी रिपोर्ट करें",
    "editReportButton": "अपडेट करें",
    "cancelButton": "रद्द करें",
    "requiredField": "(आवश्यक है)",
    "selectDefaultText": "चुनें&hellip;",
    "invalidInputValue": "कृपया मान्य मान दर्ज करें।",
    "noFieldsConfiguredMessage": "लेयर की फील्ड डेटा हासिल करने के लिए कॉन्फ़िगर नहीं की गई हैं",
    "invalidSmallNumber": "कृपया एक पूर्णांक दर्ज करें",
    "invalidNumber": "कृपया एक पूर्णांक दर्ज करें",
    "invalidFloat": "कृपया एक संख्या दर्ज करें",
    "invalidDouble": "कृपया एक संख्या दर्ज करें",
    "requiredFields": "सभी आवश्यक फ़ील्ड के लिए संख्या प्रदान करें",
    "selectLocation": "कृपया अपनी रिपोर्ट के लिए स्थान चुनें",
    "numericRangeHintMessage": "${OpenStrong} संकेत: ${closeStrong} न्यूनतम संख्या ${minValue} और अधिकतम संख्या ${maxValue}",
    "dateRangeHintMessage": "${OpenStrong} संकेत: ${closeStrong} न्यूनतम संख्या ${minValue} और अधिकतम संख्या ${maxValue}",
    "errorsInApplyEdits": "रिपोर्ट प्रस्तुत नहीं की जा सकी",
    "attachmentSelectedMsg": "चयनित अनुलग्नक",
    "attachmentUploadStatus": "${total} अनुलग्नकों में से ${failed} अपलोड होने में विफल रहे",
    "geoLocationError": "वर्तमान स्थान उपलब्ध नहीं है",
    "geoLocationOutOfExtent": "वर्तमान स्थान बेसमैप की सीमा से बाहर है",
    "submitButtonTooltip": "सबमिट करें",
    "cancelButtonTooltip": "रद्द करें",
    "geoformBackButtonTooltip": "रिपोर्ट सूची पर वापस जाएँ"
  },
  "locator": {
    "addressText": "पता:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "अक्षांश/रेखांश",
    "invalidSearch": "कोई परिणाम नहीं मिला",
    "locatorPlaceholder": "खोज करने के लिए पता दर्ज करें",
    "locationOutOfExtent": "स्थित पता आधार मानचित्र की सीमा से बाहर है",
    "searchButtonTooltip": "खोजें",
    "clearButtonTooltip": "खोज मान साफ़ करें"
  },
  "myIssues": {
    "title": "मेरी रिपोर्ट",
    "myIssuesTooltip": "मेरी रिपोर्ट",
    "noResultsFound": "कोई रिपोर्ट नहीं मिली"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "आ_I agree___ज",
    "commentButtonLabel": "",
    "commentButtonTooltip": "आ_Leave a reply_____ज",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "संलग्न दस्तावेज देखें",
    "mapButtonLabel": "मानचित्र पर देखें",
    "mapButtonTooltip": "इस रिपोर्ट का स्थान देखें",
    "commentsListHeading": "टिप्पणियाँ",
    "unableToUpdateVoteField": "आपका वोट इस समय में गिना नहीं जा सकता है।",
    "gotoIssueListTooltip": "रिपोर्ट सूची पर जाएं",
    "deleteMessage": "आ_Are you sure you want to delete___________ज?"
  },
  "itemList": {
    "likesForThisItemTooltip": "इस रिपोर्ट के लिए वोट",
    "loadMoreButtonText": "और लोड करें.."
  },
  "comment": {
    "commentsFormHeading": "टिप्पणी",
    "commentsFormSubmitButton": "टिप्पणी प्रस्तुत करें",
    "commentsFormEditButton": "टिप्पणी में अपडेट करें",
    "commentsFormCancelButton": "रद्द करें",
    "errorInSubmittingComment": "टिप्पणी प्रस्तुत नहीं की जा सकती।",
    "emptyCommentMessage": "कृपया एक टिप्पणी दर्ज करें।",
    "placeHolderText": "एक टिप्पणी लिखें",
    "noCommentsAvailableText": "कोई टिप्पणी उपलब्ध नहीं है",
    "remainingTextCount": "${0} अक्षर शेष हैं",
    "showNoText": "नहीं",
    "selectAttachments": "अनुलग्नक",
    "selectFileText": "ब्राउज करें",
    "attachmentSelectedMsg": "चयनित अनुलग्नक",
    "attachmentHeaderText": "अनुलग्नक",
    "unknownCommentAttachment": "फ़ाइल",
    "editRecordText": "संपादित करें",
    "deleteRecordText": "हटाएँ",
    "deleteCommentFailedMessage": "टिप्पणी मिटाने में असमर्थ"
  },
  "gallery": {
    "galleryHeaderText": "गैलरी",
    "noAttachmentsAvailableText": "कोई अनुलग्नक नहीं मिला"
  }
});