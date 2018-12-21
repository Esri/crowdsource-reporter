/*global define,location */
/*jslint sloppy:true */
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
    //Default configuration settings for the application. This is where you'll define things like a bing maps key,
    //default web map, default app color theme and more. These values can be overwritten by template configuration settings and url parameters.
    "appid": "",
    "webmap": "",
    "oauthappid": null,
    //Group templates must support a group url parameter. This will contain the id of the group.
    "group": "520b1bd79fa74f0f9f3d13315dab6915",
    //Enter the url to the proxy if needed by the application. See the 'Using the proxy page' help topic for details
    //http://developers.arcgis.com/en/javascript/jshelp/ags_proxy.html
    "proxyurl": "proxy/proxy.ashx",
    "proxyThesePrefixes": [],

    "bingKey": "", //Enter the url to your organizations bing maps key if you want to use bing basemaps
    //Defaults to arcgis.com. Set this value to your portal or organization host name.
    "sharinghost": location.protocol + "//" + "arcgis.com",
    "units": null,
    //If your applcation needs to edit feature layer fields set this value to true. When false the map will
    //be created with layers that are not set to editable which allows the FeatureLayer to load features optimally.
    "editable": false,
    "helperServices": {
     "geometry": {
       "url": null
     },
     "printTask": {
       "url": null
     },
     "elevationSync": {
       "url": null
     },
     "geocode": [{
       "url": null
         }]
  },
      //color theme.
    "theme": "#137DB9",
    "applicationName": "",
    "applicationIcon": "",
    "applicationFavicon": "/images/favicon.ico",

    "signInSubtitle": "",
    "signInBackgroundImage": "/images/signinbg.png",

    "searchedAddressPushpinImage":"/images/redstickpin.png",
    "enableGuestAccess": true,
    "enableFacebook": false,
    "enableTwitter": false,
    "enableGoogleplus": false,
    "enablePortalLogin": true,

    "disableCurrentLocation" : false, //Flag to decide wether to use the current location
    "facebookAppId": "",

    "twitterSigninUrl": location.protocol + "//utility.arcgis.com/tproxy/signin",
    "twitterUserUrl": location.protocol + "//utility.arcgis.com/tproxy/proxy/1.1/account/verify_credentials.json?q=&include_entities=true&skip_status=true&locale=en",
    "twitterCallbackUrl": "/oauth-callback-twitter.html",

    "googleplusClientId": "",
    "googleplusScope": "https://www.googleapis.com/auth/userinfo.email",

    "showNullValueAs": "",
    "noThumbnailIcon": "/images/default-webmap-thumbnail.png",
    "noAttachmentIcon": "/images/no-attachment.png",

    "showSectionTitle": true, //show/hide title in map details
    "showEmptySectionContent": true, //show/hide sections with empty contents
    "webMapInfoDescription": true,
    "webMapInfoSnippet": false,
    "webMapInfoOwner": true,
    "webMapInfoCreated": false,
    "webMapInfoModified": false,
    "webMapInfoLicenseInfo": false,
    "webMapInfoAccessInformation": false,
    "webMapInfoTags": false,
    "webMapInfoNumViews": false,
    "webMapInfoAvgRating": false,
    "showNonEditableLayers": false,
    "showPopupForNonEditableLayers" : false,

    "submitMessage": "Thank you! Your report has been submitted.",
    "likeField": "NUMVOTES",
    "commentField": "COMMENTS",
    "usePopupConfigurationForComment":false,
    "enableFeatureEdit": false,
    "enableFeatureDelete" : false,
    "reportedByField": "USERID",
    "locationField": "LONG_TEXT",
    "showMapFirst":"list",
    "showHelpOnLoad": false,
    "showBaseMapGallery": false,
    "showLegend": false,
    "basemapGroup":"",

    //Sort report configuration
    "sortingField" : "", //Field can be of type integer, string or date
    "sortingOrder" : "DESC", //ASC or DESC
    //Configure order of form components
    "details" : "Top",
    "attachments" : "Middle",
    "location" : "Bottom",

    "zoomLevel": 12,
    "honorZoomLevel": false, //Flag to honor zoom level after a feature is selected
    "enableUSNGSearch": false,
    "enableMGRSSearch": false,
    "enableLatLongSearch": false,
    "geographicalExtentLayer": "",
    //Lower level configuration
    "submitReportButtonText" : "Submit a Report", // Text for submit report button
    "submitReportButtonColor": "#35ac46", //Color for Submit Report button.If EMPTY default color will be  #35ac46.
    "submitReportButtonPosition": "bottom", // Report buttons position (top/bottom)
    "splashScreenTextColor": "#FFF", // Color of splash screen content
    "imageBackgroundColor": "#999999", // Background color icons
    "imageForeGroundColor": "white", // Foreground color of icons values (gray or white)
    //Configurable text for help dialog and help link
    "enableHelp":true,
    "enableShare": false,
    "helpLinkText": "Help",
    "helpDialogTitle":"Help",
    "helpDialogContent": "<p>Crowdsource Reporter is a configurable gallery application template that allows users to submit problems or observations. The application has been optimized for smartphones but is responsively designed to be used on smartphones, tablets, and desktop computers.</p><p>The Crowdsource Reporter application presents one or more maps that can be used to report a problem or observation. Users can anonymously submit new reports, review existing reports, and comment and vote on reports or observations submitted by other users. They also can authenticate with their social media or ArcGIS Online credentials and track the status of problems or observations they have reported.</p>",
    "enableDifferentHelpContent":false,
    "loginHelpDialogTitle":"",
    "loginHelpDialogContent": "",
    "bufferRadius": 3, //Buffer radius will be used to create inital buffer on applicaiton load
    "bufferUnit": "miles",
    "geoformDetailsSectionLabel": "Details", //label for details section in geoform
    "geoformLocationSectionLabel": "Location", //label for location section in geoform
    "geoformAttachmentSectionLabel": "Attachments", //label for attachment section in geoform
    "noWebmapInGroupText": "Configured group is invalid or no items have been shared with this group yet.",
    // to show as a label for attachment section in comments form where attachments can be added
    "commentFormAttachmentSectionLabel": "Attachments",
    "headerBackgroundColor":"#fff",
    "bodyBackgroundColor":"#fff",
    "bodyTextColor":"#515151",
    "buttonBackgroundColor":"#fff",
    "buttonTextColor": "#137DB9",
    // reporting period value
    "reportingPeriodDialogTitle": "Reporting Period Closed",
    "reportingPeriodDialogContent": "We are no longer accepting new reports for this project.",
    "featureOutsideAOIMsg": "Feature cannot be added outside study area.",
    "commentStartDate": "", // Comment start date
    "commentStartTime": "", // Comment start time
    "commentEndDate" : "", // Comment end date
    "commentEndTime": "", // Comment end time
    "commentsSuccessMessage": "Comments Submitted Successfully.",
    "commentSortingOrder": "DESC", // To sort comment in ascending(ASC) or descending(DESC) order.
    "commentSortingField": "comments" // Field on which ascending or descending sorting needs to be applied
});
