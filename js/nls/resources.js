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
            submitReportButtonText: "Submit a Report", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "List view", // Go to List view tooltip text
            noFeatureGeomtery: "Feature cannot be displayed", // Error message when geometry is not available
            featureOutsideAOIMessage: "Feature cannot be added outside study area", // Error message when feature edits are performed outside the study area
            noEditingPermissionsMessage: "You do not have permission to perform this action.", //Message when user do not have editing permissions
            basemapGalleryText: "Basemap Gallery", // Basemap gallery text
            legendText: "Legend" //Legend text

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
            noResultsFound: "No features found", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "No features found near you", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Unable to complete operation", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Go to main list", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Map view" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "My Submissions", // Command button shown in mobile menu list
            signIn: "Sign In", // Command button shown in mobile menu list and in appheader
            signOut: "Sign Out", // Command button shown in mobile menu list
            signInTooltip: "Sign in", // Tooltip to 'Sign in' option
            signOutTooltip: "Sign out", // Tooltip  to 'Sign out' option
            myReportTooltip: "View my submissions" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Details", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Attachments", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Browse", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Location", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Report It", // Command button to submit the geoform to report an issue
            editReportButton: "Update", // Command button to edit reported issue
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
            errorsInApplyEdits: "Values could not be submitted.", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "attachment(s) selected", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} of ${total} attachment(s) failed to upload", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Current location not available",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Current location is out of basemap extent",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Submit", // Command button to open the geoform
            cancelButtonTooltip: "Cancel", //tooltip for cancel button
            geoformBackButtonTooltip: "Return to the list", //tooltip for Geoform back button
            locationSelectionHintForPointLayer : "Tap the map to draw the location.", //hint text for selecting location incase of point layer
            locationSelectionHintForPolygonLayer : "Tap the map to draw the location. Double tap to complete the drawing.", //hint text for selecting location incase of line and polygon layer
            locationSelectionHintForPointLayerDesktop : "Click the map to draw the location.", //hint text for selecting location incase of point layer
            locationSelectionHintForPolygonLayerDesktop : "Click the map to draw the location. Double click to complete the drawing." //hint text for selecting location incase of line and polygon layer
        },
        locator: {
            addressText: "Address:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Latitude/Longitude", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "No results found", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Enter an address to search", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Location is outside the submission area", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Search", // Tooltip for search button
            clearButtonTooltip: "Clear search value" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "My Submissions", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "My Submissions", // Command button to access issues reported by the logged in user
            noResultsFound: "No submissions found" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "", // Command button for up-voting a report
            likeButtonTooltip: "I agree",  // Tooltip for Like button
            commentButtonLabel: "", // Command button for submitting feedback
            commentButtonTooltip: "Leave a reply", // Tooltip for Comment button
            galleryButtonLabel: "", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "See attached documents", // Tooltip for command button shown in details panel
            mapButtonLabel: "View on Map", // Command button shown in details panel
            mapButtonTooltip: "View the location of this submission", // Tooltip for Gallery button
            commentsListHeading: "Comments", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Your vote cannot be counted at this time.", // Error message for feature unable to update
            gotoIssueListTooltip: "View the list of submissions", // Tooltip for back icon in Issue list header
            deleteMessage : "Are you sure you want to delete?", //shown when user tries to delete a report or comment
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Number of votes", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Load More..." //Text for load more button
        },
        comment: {
            commentsFormHeading: "Comment",
            commentsFormSubmitButton: "Submit Comment",
            commentsFormEditButton: "Update Comment",
            commentsFormCancelButton: "Cancel",
            errorInSubmittingComment: "Comment could not be submitted.", // Shown when user is unable to add comments
            emptyCommentMessage: "Please enter a comment.", // Shown when user submits a comment without any text/character
            placeHolderText: "Type a comment", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "No comments available", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} character(s) remain", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "No", // Shown when comments character limit is exceeded
            selectAttachments: "Attachments", // Appears above 'Select file' button indicating option to attach files while adding comments
            selectFileText: "Browse", // Command button to open a dialog box to select file(s) to be attached
            attachmentSelectedMsg: "attachment(s) selected", // Shown besides the select file button indicating the number of files attached
            attachmentHeaderText: "Attachments", //attachment header Text
            unknownCommentAttachment: "FILE", // displayed for attached file having unknown extension
            editRecordText: "Edit", // Displayed on hover of edit comment button
            deleteRecordText: "Delete", // Displayed on hover of delete comment button
            deleteCommentFailedMessage: "Unable to delete comment" // Displayed when delete comment operation gets failed
        },
        gallery: {
            galleryHeaderText: "Gallery",
            noAttachmentsAvailableText: "No attachments found" // Shown when no comments are available for the selected issue
        }
    }),
    "ar": 1,
    "bs": 1,
    "ca": 1,
    "cs": 1,
    "da": 1,
    "de": 1,
    "el": 1,
    "es": 1,
    "et": 1,
    "fi": 1,
    "fr": 1,
    "he": 1,
    "hi": 1,
    "hr": 1,
    "hu": 1,
    "id": 1,
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
    "sl": 1,
    "sr": 1,
    "sv": 1,
    "th": 1,
    "tr": 1,
    "vi": 1,
    "zh-cn": 1,
    "zh-hk": 1,
    "zh-tw": 1
});
