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
            zoomInTooltip: "Zoom in",  // Command button to zoom in to the map
            zoomOutTooltip: "Zoom out",  // Command button to zoom out of the map
            geolocationTooltip: "Current location"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "No group configured", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Submit a report", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "List view", // Go to List view tooltip text
            noFeatureGeomtery: "Feature cannot be displayed" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Proceed as Guest", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Or", // Or text on sign in screen
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
            created: "Date created", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Date modified", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Description", // Shown in the 'Map information' section describing the webmap
            snippet: "Summary", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Access and use constraints", // Shown in the map information section indicating the webmap license information
            accessInformation: "Credits", // Shown in the 'Map information' section indicating account credits
            tags: "Tags", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Number of views", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Rating", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Configured group is invalid or no items have been shared with this group yet.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Map information" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "No reports available in the current area", // Shown in the issue wall when no issues are present in the current map extent
            gotoWebmapListTooltip: "Go to main list", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Map view" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "My Reports", // Command button shown in mobile menu list
            signIn: "Sign In", // Command button shown in mobile menu list and in appheader
            signOut: "Sign Out", // Command button shown in mobile menu list
            help: "Help", // Command button shown in mobile menu list
            signInTooltip: "Sign in", // Tooltip to 'Sign in' option
            signOutTooltip: "Sign out", // Tooltip  to 'Sign out' option
            myReportTooltip: "View reports submitted by me", // Tooltip  to 'My Reports' option
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
            invalidSmallNumber: "Please enter an integer", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Please enter an integer", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Please enter a number", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Please enter a number", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Please provide values for all required fields", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Please select the location for your report", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Hint:${closeStrong} Minimum value ${minValue} and Maximum value ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Hint:${closeStrong} Minimum Date ${minValue} and Maximum Date ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Issue could not be reported", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "attachment(s) selected", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} of ${total} attachment(s) failed to upload", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Current location not available",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Current location is out of basemap extent",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Report It", // Command button to open the geoform
            cancelButtonTooltip: "Cancel", //tooltip for cancel button
            geoformBackButtonTooltip: "Go to the report list" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Address:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Latitude/Longitude", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "No results found", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Enter an address to search", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Located address is out of basemap extent", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Search", // Tooltip for search button
            clearButtonTooltip: "Clear search value" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "My Reports", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "My Reports", // Command button to access issues reported by the logged in user
            noResultsFound: "No reports found" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Like", // Command button shown in details panel
            likeButtonTooltip: "Vote for this report",  // Tooltip for command button shown in details panel
            commentButtonLabel: "Comment", // Command button shown in details panel
            commentButtonTooltip: "Comment on this report", // Tooltip for command button shown in details panel
            galleryButtonLabel: "Gallery", // Command button shown in details panel
            galleryButtonTooltip: "See attached documents", // Tooltip for command button shown in details panel
            mapButtonLabel: "View on Map", // Command button shown in details panel
            mapButtonTooltip: "View the location of this report", // Tooltip for command button shown in details panel
            commentsListHeading: "Comments", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Your vote cannot be added at this time.", // Error message for feature unable to update
            gotoIssueListTooltip: "Go to the report list" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Votes for this report" //Shown on hovering of the like icon in my-issues and issue-wall
        },
        comment: {
            commentsFormText: "Comment",
            commentsFormSubmitButton: "Submit Comment",
            commentsFormCancelButton: "Cancel",
            errorInSubmittingComment: "Comment could not be submitted.", // Shown when user is unable to add comments
            emptyCommentMessage: "Please enter a comment.", // Shown when user submits a comment without any text/character
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
    "ar": 0,
    "cs": 0,
    "da": 0,
    "de": 0,
    "el": 0,
    "es": 0,
    "et": 0,
    "fi": 0,
    "fr": 0,
    "he": 0,
    "it": 0,
    "ja": 0,
    "ko": 0,
    "lt": 0,
    "lv": 0,
    "nb": 0,
    "nl": 0,
    "pl": 0,
    "pt-br": 0,
    "pt-pt": 0,
    "ro": 0,
    "ru": 0,
    "sv": 0,
    "th": 0,
    "tr": 0,
    "vi": 0,
    "zh-cn": 0,
    "zh-hk": 0,
    "zh-tw": 0
});
