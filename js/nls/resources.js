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
    root: ({
        map: {
            error: "Unable to create map",
            zoomInTooltip: "Zoom In",  // Command button to zoom in to the map
            zoomOutTooltip: "Zoom Out",  // Command button to zoom out of the map
            geolocationTooltip: "Geolocation"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "No group configured", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Submit a report", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "List View", // Go to List view tooltip text
            noFeatureGeomtery: "Feature have no geometry to display" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Proceed as Guest", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signinOptionsText: "Sign in with:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Please sign in", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Sign in as a guest", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Sign in with Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Sign in with Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Sign in with Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Sign in with ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Owner", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Created", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Modified", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Description", // Shown in the 'Map information' section describing the webmap
            snippet: "Summary", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Access and use constraints", // Shown in the map information section indicating the webmap license information
            accessInformation: "Credits", // Shown in the 'Map information' section indicating account credits
            tags: "Tags", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Number of views", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Rating", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Configured group is invalid or no items have been shared with this group yet.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Map Information" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "No reports found in the current map area", // Shown in the issue wall when no issues are present in the current map extent
            gotoWebmapListTooltip: "Go To Webmap List", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Map View" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "My Reports", // Command button shown in mobile menu list
            signIn: "Sign in", // Command button shown in mobile menu list and in appheader
            signOut: "Sign out", // Command button shown in mobile menu list
            help: "Help", // Command button shown in mobile menu list
            signInTooltip: "Sign In", // Tooltip to 'Sign in' option
            signOutTooltip: "Sign Out", // Tooltip  to 'Sign out' option
            myReportTooltip: "My Reports", // Tooltip  to 'My Reports' option
            helpTooltip: "Help" // Tooltip  to 'Help' option
        },
        geoform: {
            enterInformation: "Details", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Attachments", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Browse", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Location", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Report It", // Command button to submit the geoform to report an issue
            cancelButton: "Cancel", //Command button to close the geoform
            requiredField: "(required)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Select&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Please enter valid value.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Layer fields are not configured to capture data", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Please enter valid ${openStrong}integer${closeStrong} value between -32768 and 32767.", // Shown when the entered value is beyond the specified range
            invalidNumber: "Please enter valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.", // Shown when the entered value is beyond the specified range
            invalidFloat: "Please enter valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 ", // Shown when the entered value is beyond the specified range
            invalidDouble: "Please enter valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308", // Shown when the entered value is beyond the specified range
            requiredFields: "Please enter all the required fields.", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Please select a location for your submission.", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Hint:${closeStrong} Minimum value ${minValue} and Maximum value ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Hint:${closeStrong} Minimum Date ${minValue} and Maximum Date ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Issue could not be reported.", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "Attachment(s) selected", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} of ${total} attachment(s) failed to upload.", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Current location not available",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Current location is out of basemap extent",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Report It", // Command button to open the geoform
            cancelButtonTooltip: "Cancel",//tooltip for cancel button
            geoformBackButtonTooltip: "Go To Issue List" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Address:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Latitude/Longitude", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "No results found", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Enter address to search", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Located address is out of basemap extent", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Search", // Tooltip for search button
            clearButtonTooltip: "Clear Search" // Tooltip for Geocoder clear button 
        },
        myIssues: {
            title: "My Reports", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "My Reports", // Command button to access issues reported by the logged in user
            noResultsFound: "No reports found" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Like", // Command button shown in details panel
            likeButtonTooltip: "Vote for this",  // Tooltip for command button shown in details panel
            commentButtonLabel: "Comment", // Command button shown in details panel
            commentButtonTooltip: "Add a comment about this", // Tooltip for command button shown in details panel
            galleryButtonLabel: "Gallery", // Command button shown in details panel
            galleryButtonTooltip: "See attached photos for this", // Tooltip for command button shown in details panel
            mapButtonLabel: "View on Map", // Command button shown in details panel
            mapButtonTooltip: "View this on map", // Tooltip for command button shown in details panel
            commentsListHeading: "Comments", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Your vote cannot be added at this time.", // Error message for feature unable to update
            gotoIssueListTooltip: "Go To List" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Votes for this"//Shown on hovering of the like icon in my-issues and issue-wall
        },
        comment: {
            commentsFormText: "Comment",//
            commentsFormSubmitButton: "Submit Comment",//
            commentsFormCancelButton: "Cancel",//
            errorInSubmittingComment: "Comment could not be submitted.", // Shown when user is unable to add comments
            emptyCommentMessage: "Please enter comment.", // Shown when user submits a comment without any text/character
            placeHolderText: "Type a comment", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "No comments available", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} character(s) remain", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "No" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Gallery",
            noAttachmentsAvailableText: "No attachments found" // Shown when no comments are available for the selected issue
        }
    }),
    "ar": 1,
    "cs": 1,
    "da": 1,
    "de": 1,
    "el": 1,
    "en": 1,
    "es": 1,
    "et": 1,
    "fi": 1,
    "fr": 1,
    "he": 1,
    "it": 1,
    "ja": 1,
    "ko": 1,
    "lt": 1,
    "lv": 1,
    "nb": 1,
    "nl": 1,
    "pl": 1,
    "pt-br": 1,
    "pt-pt": 1,
    "ro": 1,
    "ru": 1,
    "sv": 1,
    "th": 1,
    "tr": 1,
    "vi": 1,
    "zh-cn": 1,
    "zh-hk": 1,
    "zh-tw": 1
});
