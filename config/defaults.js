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
    "proxyurl": "proxy.ashx",
    //Example of a template specific property. If your template had several color schemes
    //you could define the default here and setup configuration settings to allow users to choose a different
    //color theme.
    "theme": "#137DB9",
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

    "facebookAppId": "",

    "twitterSigninUrl": location.protocol + "//utility.arcgis.com/tproxy/signin",
    "twitterUserUrl": location.protocol + "//utility.arcgis.com/tproxy/proxy/1.1/account/verify_credentials.json?q=&include_entities=true&skip_status=true&locale=en",
    "twitterCallbackUrl": "/oauth-callback-twitter.html",

    "googleplusClientId": "",
    "googleplusScope": "https://www.googleapis.com/auth/userinfo.email",

    "showNullValueAs": "",
    "noThumbnailIcon": "/images/default-webmap-thumbnail.png",
    "noAttachmentIcon": "/images/no-attachment.png",

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

    "submitMessage": "Thank you! Your report has been submitted.",
    "likeField": "NUMVOTES",
    "commentField": "COMMENTS",
    "usePopupConfigurationForComment":false,
    "reportedByField": "USERID",
    "locationField": "LONG_TEXT",

    "zoomLevel": 12,
    "enableUSNGSearch": false,
    "enableMGRSSearch": false,
    "enableLatLongSearch": false,
    //Lower level configuration
    "submitReportButtonColor": "#35ac46", //Color for Submit Report button.If EMPTY default color will be  #35ac46.
    //Configurable text for help dialog and help link
    "enableHelp":true,
    "helpLinkText": "Help",
    "helpDialogTitle":"Help Page",
    "helpDialogContent": "<p>Crowdsource Reporter is a configurable gallery application template that allows users to submit problems or observations. The application has been optimized for smartphones but is responsively designed to be used on smartphones, tablets, and desktop computers.</p><p>The Crowdsource Reporter application presents one or more maps that can be used to report a problem or observation. Users can anonymously submit new reports, review existing reports, and comment and vote on reports or observations submitted by other users. They also can authenticate with their social media or ArcGIS Online credentials and track the status of problems or observations they have reported.</p>",
    "bufferRadius": 3, //Buffer radius will be used to create inital buffer on applicaiton load
    "bufferUnit": "miles",
    "geoformDetailsSectionLabel": "Details", //label for details section in geoform
    "geoformLocationSectionLabel": "Location", //label for location section in geoform
    "geoformAttachmentSectionLabel": "Attachments" //label for attachment section in geoform
});
