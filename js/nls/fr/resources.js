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
define(({
    map: {
        error: "@fr@ Unable to create map"
    },
    main: {
        noGroup: "@fr@ No Group configured"
    },
    signin: {
        guestSigninText: "@fr@ Proceed as Guest",
        signinOptionsText: "@fr@ Sign in with:",
        noGroupNameText: "@fr@ Please Sign in"
    },
    webMapList: {
        owner: "@fr@ Owner",
        created: "@fr@ Created",
        modified: "@fr@ Modified",
        description: "@fr@ Description",
        snippet: "@fr@ Summary",
        licenseInfo: "@fr@ Access and use constraints",
        accessInformation: "@fr@ Credits",
        tags: "@fr@ Tags",
        numViews: "@fr@ Number of views",
        avgRating: "@fr@ Rating",
        noWebMapInGroup: "@fr@ Configured group is invalid or no items have been shared with this group yet."
    },
    issueWall: {
        noResultsFound: "@fr@ No issues found in the current extent",
        photoAttachmentHeader: "@fr@ Photo"
    },
    mobileMenu: {
        home: "@fr@ Home",
        myIssuesView: "@fr@ My Issues",
        mapView: "@fr@ Map View",
        listView: "@fr@ List View",
        reportIt: "@fr@ Report It",
        signIn: "@fr@ Sign in",
        signOut: "@fr@ Sign out",
        loggedInAs: "@fr@ Logged in as"
    },
    geoform: {
        enterInformation: "@fr@ 1. Enter Information",
        selectAttachments: "@fr@ Attachments",
        selectFileText: "@fr@ Select File",
        enterLocation: "@fr@ 2. Select Location",
        completeForm: "@fr@ 3. Complete Form",
        reportItButton: "@fr@ Report It",
        uploadPhoto: "@fr@ Upload Photo",
        requiredField: "@fr@ (required)",
        selectDefaultText: "@fr@ Select&hellip;",
        invalidString: "@fr@ Please enter valid value.",
        noLayerConfiguredMessage: "@fr@ Layer fields are not configured to capture data",
        invalidSmallNumber: "@fr@ Please enter valid ${openStrong}integer${closeStrong} value between -32768 and 32767.",
        invalidNumber: "@fr@ Please enter valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.",
        invalidFloat: "@fr@ Please enter valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 ",
        invalidDouble: "@fr@ Please enter valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308",
        requiredFields: "@fr@ Please enter all the required fields",
        selectLocation: "@fr@ Please select a location for your submission.",
        textRangeHintMessage: "@fr@ ${openStrong}Hint:${closeStrong} Minimum value ${minValue} and Maximum value ${maxValue}",
        dateRangeHintMessage: "@fr@ ${openStrong}Hint:${closeStrong} Minimum Date ${minValue} and Maximum Date ${maxValue}",
        remainingCharactersHintMessage: "@fr@ ${value} characters remaining",
        errorsInApplyEdits: "@fr@ Issue could not be reported.",
        attachmentSelectedMsg: "@fr@ Attachment(s) selected",
        selectLocationTitleText: "@fr@ (Tap/Click on map to select location)",
        geoLocationError: "@fr@ Current location not available",
        geoLocationOutOfExtent: "@fr@ Current location is out of basemap extent"
    },
    locator: {
        addressText: "@fr@ Address",
        usngText: "@fr@ USNG",
        mgrsText: "@fr@ MGRS",
        latLongText: "@fr@ LatLong",
        invalidSearch: "@fr@ No results found",
        locatorPlaceholder: "@fr@ Enter address to search"
    }
}));
