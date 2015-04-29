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
        error: "Unable to create map",
        zoomInTooltip: "Zoom In",
        zoomOutTooltip: "Zoom Out",
        geolocationTooltip: "Geolocation"
    },
    main: {
        noGroup: "No group configured",
        submitReportButtonText: "Submit a report",
        gotoListViewTooltip: "List View"
    },
    signin: {
        guestSigninText: "Proceed as Guest",
        signinOptionsText: "Sign in with:",
        noGroupNameText: "Please sign in",
        guestLoginTooltip: "Sign in as a guest",
        facebookLoginTooltip: "Sign in with Facebook",
        twitterLoginTooltip: "Sign in with Twitter",
        googlePlusLoginTooltip: "Sign in with Google+",
        agolLoginTooltip: "Sign in with ArcGIS",
        signInTooltip: "Sign In",
        signOutTooltip: "Sign Out"
    },
    webMapList: {
        owner: "Owner",
        created: "Created",
        modified: "Modified",
        description: "Description",
        snippet: "Summary",
        licenseInfo: "Access and use constraints",
        accessInformation: "Credits",
        tags: "Tags",
        numViews: "Number of views",
        avgRating: "Rating",
        noWebMapInGroup: "Configured group is invalid or no items have been shared with this group yet.",
        infoBtnToolTip: "Map Information"
    },
    issueWall: {
        noResultsFound: "No reports found in the current map area",
        gotoWebmapListTooltip: "Go To Webmap List",
        gotoMapViewTooltip: "Map View"
    },
    appHeader: {
        myReport: "My Reports",
        signIn: "Sign in",
        signOut: "Sign out",
        help: "Help"
    },
    geoform: {
        enterInformation: "1. Enter Information",
        selectAttachments: "Attachments",
        selectFileText: "Select File",
        enterLocation: "2. Select Location",
        completeForm: "3. Complete Form",
        reportItButton: "Report It",
        cancelButton: "Cancel",
        requiredField: "(required)",
        selectDefaultText: "Select&hellip;",
        invalidInputValue: "Please enter valid value.",
        noFieldsConfiguredMessage: "Layer fields are not configured to capture data",
        invalidSmallNumber: "Please enter valid ${openStrong}integer${closeStrong} value between -32768 and 32767.",
        invalidNumber: "Please enter valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.",
        invalidFloat: "Please enter valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 ",
        invalidDouble: "Please enter valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308",
        requiredFields: "Please enter all the required fields",
        selectLocation: "Please select a location for your submission.",
        numericRangeHintMessage: "${openStrong}Hint:${closeStrong} Minimum value ${minValue} and Maximum value ${maxValue}",
        dateRangeHintMessage: "${openStrong}Hint:${closeStrong} Minimum Date ${minValue} and Maximum Date ${maxValue}",
        errorsInApplyEdits: "Issue could not be reported.",
        attachmentSelectedMsg: "Attachment(s) selected",
        attachmentUploadStatus: "${failed} of ${total} attachment(s) failed to upload.",
        selectLocationTitleText: "(Tap/click on map to select location)",
        geoLocationError: "Current location not available",
        geoLocationOutOfExtent: "Current location is out of basemap extent",
        submitButtonTooltip: "Report It",
        cancelButtonTooltip: "Cancel"
    },
    locator: {
        addressText: "Address:",
        usngText: "USNG",
        mgrsText: "MGRS",
        latLongText: "Latitude/Longitude",
        invalidSearch: "No results found",
        locatorPlaceholder: "Enter address to search",
        locationOutOfExtent: "Located address is out of basemap extent"
    },
    myIssues: {
        title: "My Reports",
        myIssuesTooltip: "My Reports",
        noResultsFound: "No reports found"
    },
    comment: {
        errorInSubmittingComment: "Comment could not be submitted.",
        emptyCommentMessage: "Please enter comment.",
        placeHolderText: "Type a comment",
        noCommentsAvailableText: "No comments available",
        remainingTextCount: "${0} character(s) remain",
        showNoText: "No"
    },
    itemDetails: {
        likeButtonLabel: "Like",
        likeButtonTooltip: "Vote for this",
        commentButtonLabel: "Comment",
        commentButtonTooltip: "Add a comment about this",
        galleryButtonLabel: "Gallery",
        galleryButtonTooltip: "See attached photos for this",
        mapButtonLabel: "View on Map",
        mapButtonTooltip: "View this on map",
        commentsListHeading: "Comments",
        noCommentsPlaceholder: "No comments"
    },
    itemList: {
        likesForThisItemTooltip: "Votes for this"
    }
}));
