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
        zoomInTooltip: "Zoom in",
        zoomOutTooltip: "Zoom out",
        geolocationTooltip: "Current location"
    },
    main: {
        noGroup: "No group configured",
        submitReportButtonText: "Submit a report",
        gotoListViewTooltip: "List view",
        noFeatureGeomtery: "Feature cannot be displayed"
    },
    signin: {
        guestSigninText: "Proceed as Guest",
        signInOrText: "Or",
        signinOptionsText: "Sign in with:", 
        noGroupNameText: "Please sign in", 
        guestLoginTooltip: "Sign in as a guest", 
        facebookLoginTooltip: "Sign in with Facebook", 
        twitterLoginTooltip: "Sign in with Twitter", 
        googlePlusLoginTooltip: "Sign in with Google+", 
        agolLoginTooltip: "Sign in with ArcGIS"
    },
    webMapList: {
        owner: "Owner",
        created: "Date dreated",
        modified: "Date modified",
        description: "Description",
        snippet: "Summary",
        licenseInfo: "Access and use constraints",
        accessInformation: "Credits", 
        tags: "Tags", 
        numViews: "Number of views",
        avgRating: "Rating", 
        noWebMapInGroup: "Configured group is invalid or no items have been shared with this group yet.",
        infoBtnToolTip: "Map information"
    },
    issueWall: {
        noResultsFound: "No reports available in the current area",
        gotoWebmapListTooltip: "Go to main list", 
        gotoMapViewTooltip: "Map view" 
    },
    appHeader: {
        myReport: "My Reports",
        signIn: "Sign In", 
        signOut: "Sign Out", 
        help: "Help", 
        signInTooltip: "Sign in", 
        signOutTooltip: "Sign out", 
        myReportTooltip: "View reports submitted by me", 
        helpTooltip: "Help"
    },
    geoform: {
        enterInformation: "Details", 
        selectAttachments: "Attachments", 
        selectFileText: "Browse", 
        enterLocation: "Location", 
        reportItButton: "Report It", 
        cancelButton: "Cancel", 
        requiredField: "(required)", 
        selectDefaultText: "Select&hellip;", 
        invalidInputValue: "Please enter valid value.", 
        noFieldsConfiguredMessage: "Layer fields are not configured to capture data",
        invalidSmallNumber: "Please enter an integer", 
        invalidNumber: "Please enter an integer",
        invalidFloat: "Please enter a number", 
        invalidDouble: "Please enter a number", 
        requiredFields: "Please provide values for all required fields", 
        selectLocation: "Please select the location for your report", 
        numericRangeHintMessage: "${openStrong}Hint:${closeStrong} Minimum value ${minValue} and Maximum value ${maxValue}",
        dateRangeHintMessage: "${openStrong}Hint:${closeStrong} Minimum Date ${minValue} and Maximum Date ${maxValue}",
        errorsInApplyEdits: "Issue could not be reported", 
        attachmentSelectedMsg: "attachment(s) selected",
        attachmentUploadStatus: "${failed} of ${total} attachment(s) failed to upload",
        geoLocationError: "Current location not available",
        geoLocationOutOfExtent: "Current location is out of basemap extent",
        submitButtonTooltip: "Report It", 
        cancelButtonTooltip: "Cancel",
        geoformBackButtonTooltip: "Go to the report list" 

    },
    locator: {
        addressText: "Address:", 
        usngText: "USNG", 
        mgrsText: "MGRS", 
        latLongText: "Latitude/Longitude", 
        invalidSearch: "No results found", 
        locatorPlaceholder: "Enter an address to search",
        locationOutOfExtent: "Located address is out of basemap extent",
        searchButtonTooltip: "Search",
        clearButtonTooltip: "Clear search value" 
    },
    myIssues: {
        title: "My Reports", 
        myIssuesTooltip: "My Reports", 
        noResultsFound: "No reports found" 
    },
    itemDetails: { 
        likeButtonLabel: "Like", 
        likeButtonTooltip: "Vote for this report",  
        commentButtonLabel: "Comment", 
        commentButtonTooltip: "Comment on this report", 
        galleryButtonLabel: "Gallery", 
        galleryButtonTooltip: "See attached documents", 
        mapButtonLabel: "View on Map", 
        mapButtonTooltip: "View the location of this report", 
        commentsListHeading: "Comments", 
        unableToUpdateVoteField: "Your vote cannot be added at this time.", 
        gotoIssueListTooltip: "Go to the report list" 
    },
    itemList: {  
        likesForThisItemTooltip: "Votes for this report"
    },
    comment: {
        commentsFormText: "Comment",
        commentsFormSubmitButton: "Submit Comment",
        commentsFormCancelButton: "Cancel",
        errorInSubmittingComment: "Comment could not be submitted.",
        emptyCommentMessage: "Please enter a comment.", 
        placeHolderText: "Type a comment", 
        noCommentsAvailableText: "No comments available", 
        remainingTextCount: "${0} character(s) remain", 
        showNoText: "No" 
    },
    gallery: {
        galleryHeaderText: "Gallery",
        noAttachmentsAvailableText: "No attachments found" 
    }
}));
