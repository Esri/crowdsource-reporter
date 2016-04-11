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
define(
     ({
        map: {
            error: "Č_Unable to create map_______ž",
            zoomInTooltip: "Č_Zoom in___ž",  // Command button to zoom in to the map
            zoomOutTooltip: "Č_Zoom out___ž",  // Command button to zoom out of the map
            geolocationTooltip: "Č_Current location______ž"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Č_No group configured_______ž", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Č_Submit a Report______ž", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Č_List view____ž", // Go to List view tooltip text
            noFeatureGeomtery: "Č_Feature cannot be displayed_________ž" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Č_Proceed as Guest______ž", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Č_Or__ž", // Or text on sign in screen
            signinOptionsText: "Č_Sign in with_____ž:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Č_Please sign in_____ž", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Č_Sign in as a guest______ž", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Č_Sign in with Facebook_______ž", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Č_Sign in with Twitter_______ž", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Č_Sign in with Google+_______ž", // Command button to access the application via Google+ login
            agolLoginTooltip: "Č_Sign in with ArcGIS_______ž" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Č_Owner___ž", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Č_Date created_____ž", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Č_Date modified_____ž", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Č_Description____ž", // Shown in the 'Map information' section describing the webmap
            snippet: "Č_Summary___ž", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Č_Access and use constraints_________ž", // Shown in the map information section indicating the webmap license information
            accessInformation: "Č_Credits___ž", // Shown in the 'Map information' section indicating account credits
            tags: "Č_Tags__ž", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Č_Number of views______ž", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Č_Rating___ž", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Č_Configured group is invalid or no items have been shared with this group yet________________________ž.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Č_Map information______ž" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Č_No features found______ž", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Č_No features found near you_________ž", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Č_Unable to complete operation_________ž", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Č_Go to main list______ž", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Č_Map view___ž" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Č_My Reports____ž", // Command button shown in mobile menu list
            signIn: "Č_Sign In___ž", // Command button shown in mobile menu list and in appheader
            signOut: "Č_Sign Out___ž", // Command button shown in mobile menu list
            signInTooltip: "Č_Sign in___ž", // Tooltip to 'Sign in' option
            signOutTooltip: "Č_Sign out___ž", // Tooltip  to 'Sign out' option
            myReportTooltip: "Č_View my reports______ž" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Č_Details___ž", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Č_Attachments____ž", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Č_Browse___ž", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Č_Location___ž", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Č_Report It____ž", // Command button to submit the geoform to report an issue
            cancelButton: "Č_Cancel___ž", //Command button to close the geoform
            requiredField: "Č_(required)____ž", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Č_Select&hellip;_____ž", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Č_Please enter valid value_________ž.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Č_Layer fields are not configured to capture data_______________ž", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Č_Please enter an integer________ž", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Č_Please enter an integer________ž", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Č_Please enter a number_______ž", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Č_Please enter a number_______ž", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Č_Please provide values for all required fields_______________ž", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Č_Please select the location for your report______________ž", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "Č_${openStrong}Hint:${closeStrong} Minimum value ${minValue} and Maximum value ${maxValue}___________________________ž", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "Č_${openStrong}Hint:${closeStrong} Minimum Date ${minValue} and Maximum Date ${maxValue}___________________________ž", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Č_Report could not be submitted__________ž", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "Č_attachment(s) selected________ž", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "Č_${failed} of ${total} attachment(s) failed to upload_________________ž", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Č_Current location not available__________ž",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Č_Current location is out of basemap extent_____________ž",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Č_Submit___ž", // Command button to open the geoform
            cancelButtonTooltip: "Č_Cancel___ž", //tooltip for cancel button
            geoformBackButtonTooltip: "Č_Return to the report list_________ž" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Č_Address___ž:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "Č_USNG__ž", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "Č_MGRS__ž", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Č_Latitude/Longitude______ž", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Č_No results found______ž", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Č_Enter an address to search_________ž", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Č_Located address is out of basemap extent_____________ž", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Č_Search___ž", // Tooltip for search button
            clearButtonTooltip: "Č_Clear search value______ž" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Č_My Reports____ž", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Č_My Reports____ž", // Command button to access issues reported by the logged in user
            noResultsFound: "Č_No reports found______ž" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Č_Vote__ž", // Command button for up-voting a report
            likeButtonTooltip: "Č_Vote for this report_______ž",  // Tooltip for Like button
            commentButtonLabel: "Č_Comment___ž", // Command button for submitting feedback
            commentButtonTooltip: "Č_Comment on this report________ž", // Tooltip for Comment button
            galleryButtonLabel: "Č_Gallery___ž", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Č_See attached documents________ž", // Tooltip for command button shown in details panel
            mapButtonLabel: "Č_View on Map____ž", // Command button shown in details panel
            mapButtonTooltip: "Č_View the location of this report___________ž", // Tooltip for Gallery button
            commentsListHeading: "Č_Comments___ž", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Č_Your vote cannot be counted at this time_____________ž.", // Error message for feature unable to update
            gotoIssueListTooltip: "Č_Go to the report list_______ž" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Č_Votes for this report_______ž", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Č_Load More_____ž..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Č_Submit Comment_____ž",
            commentsFormCancelButton: "Č_Cancel___ž",
            errorInSubmittingComment: "Č_Comment could not be submitted__________ž.", // Shown when user is unable to add comments
            emptyCommentMessage: "Č_Please enter a comment________ž.", // Shown when user submits a comment without any text/character
            placeHolderText: "Č_Type a comment_____ž", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Č_No comments available_______ž", // Shown when no comments are available for the selected issue
            remainingTextCount: "Č_${0} character(s) remain________ž", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Č_No__ž" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Č_Gallery___ž",
            noAttachmentsAvailableText: "Č_No attachments found_______ž" // Shown when no comments are available for the selected issue
        }
    })
);
