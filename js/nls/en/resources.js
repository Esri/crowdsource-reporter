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
        error: "@en@ Unable to create map",
        zoomInTooltip: "@en@ Zoom In",
        zoomOutTooltip: "@en@ Zoom Out",
        geolocationTooltip: "@en@ Geolocation"
    },
    main: {
        noGroup: "@en@ No Group configured"
    },
    signin: {
        guestSigninText: "@en@ Proceed as Guest",
        signinOptionsText: "@en@ Sign in with:",
        noGroupNameText: "@en@ Please Sign in",
        guestLoginTooltip: "@en@ Guest Login",
        facebookLoginTooltip: "@en@ Facebook Login",
        twitterLoginTooltip: "@en@ Twitter Login",
        googlePlusLoginTooltip: "@en@ Google+ Login",
        agolLoginTooltip: "@en@ AGOL Login",
        signInTooltip: "@en@ Sign In",
        signOutTooltip: "@en@ Sign Out"
    },
    webMapList: {
        owner: "@en@ Owner",
        created: "@en@ Created",
        modified: "@en@ Modified",
        description: "@en@ Description",
        snippet: "@en@ Summary",
        licenseInfo: "@en@ Access and use constraints",
        accessInformation: "@en@ Credits",
        tags: "@en@ Tags",
        numViews: "@en@ Number of views",
        avgRating: "@en@ Rating",
        noWebMapInGroup: "@en@ Configured group is invalid or no items have been shared with this group yet.",
        infoBtnToolTip: "@en@ Map Information"
    },
    issueWall: {
        noResultsFound: "@en@ No issues found in the current extent"
    },
    mobileMenu: {
        home: "@en@ Home",
        myIssuesView: "@en@ My Issues",
        mapView: "@en@ Map View",
        listView: "@en@ List View",
        reportIt: "@en@ Report It",
        signIn: "@en@ Sign in",
        signOut: "@en@ Sign out",
        loggedInAs: "@en@ Logged in as"
    },
    geoform: {
        enterInformation: "@en@ 1. Enter Information",
        selectAttachments: "@en@ Attachments",
        selectFileText: "@en@ Select File",
        enterLocation: "@en@ 2. Select Location",
        completeForm: "@en@ 3. Complete Form",
        reportItButton: "@en@ Report It",
        requiredField: "@en@ (required)",
        selectDefaultText: "@en@ Select&hellip;",
        invalidInputValue: "@en@ Please enter valid value.",
        noFieldsConfiguredMessage: "@en@ Layer fields are not configured to capture data",
        invalidSmallNumber: "@en@ Please enter valid ${openStrong}integer${closeStrong} value between -32768 and 32767.",
        invalidNumber: "@en@ Please enter valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.",
        invalidFloat: "@en@ Please enter valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 ",
        invalidDouble: "@en@ Please enter valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308",
        requiredFields: "@en@ Please enter all the required fields",
        selectLocation: "@en@ Please select a location for your submission.",
        numericRangeHintMessage: "@en@ ${openStrong}Hint:${closeStrong} Minimum value ${minValue} and Maximum value ${maxValue}",
        dateRangeHintMessage: "@en@ ${openStrong}Hint:${closeStrong} Minimum Date ${minValue} and Maximum Date ${maxValue}",
        errorsInApplyEdits: "@en@ Issue could not be reported.",
        attachmentSelectedMsg: "@en@ Attachment(s) selected",
        attachmentUploadStatus: "@en@ ${failed} of ${total} Attachment(s) failed to upload.",
        selectLocationTitleText: "@en@ (Tap/Click on map to select location)",
        geoLocationError: "@en@ Current location not available",
        geoLocationOutOfExtent: "@en@ Current location is out of basemap extent",
        geoformTooltip: "@en@ Report It"
    },
    locator: {
        addressText: "@en@ Address:",
        usngText: "@en@ USNG",
        mgrsText: "@en@ MGRS",
        latLongText: "@en@ LatLong",
        invalidSearch: "@en@ No results found",
        locatorPlaceholder: "@en@ Enter address to search",
        locationOutOfExtent: "@en@ Located address is out of basemap extent"
    },
    myIssues: {
        title: "@en@ My Issues",
        myIssuesTooltip: "@en@ My Issues",
        noResultsFound: "@en@ No issues found"
    },
    comment: {
        errorInSubmmitingComment: "@en@ Comment could not be submitted.",
        emptyCommentMessage: "@en@ Please enter comment.",
        placeHolderText: "@en@ Write a comment",
        noCommentsAvailableText: "@en@ No comments available",
        remainingTextCount: "@en@ ${0} character(s) remain",
        showNoText: "@en@ No"
    },
    issueDetailsHelper: {
        likeTooltip: "@en@ Like",
        commentTooltip: "@en@ Comment",
        viewOnMapTooltip: "@en@ View on Map",
        link: "@en@ Link",
        photoAttachmentHeader: "@en@ Photo",
        votesUpdateFailure: "@en@ Unable to update"
    }
}));
