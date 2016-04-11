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
            error: "Nevar izveidot karti",
            zoomInTooltip: "Pietuvināt",  // Command button to zoom in to the map
            zoomOutTooltip: "Attālināt",  // Command button to zoom out of the map
            geolocationTooltip: "Pašreizējais izvietojums"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Nav konfigurētas grupas", // Shown when no group is configured in the configuration file
            submitReportButtonText: "ķ_Submit a Report______ū", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Saraksta skats", // Go to List view tooltip text
            noFeatureGeomtery: "Funkciju nevar parādīt" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Turpināt kā viesim", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Vai", // Or text on sign in screen
            signinOptionsText: "Pieteikties ar:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Lūdzu, pierakstieties", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Pieteikties kā viesim", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Pieteikties ar Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Pieteikties ar Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Pieteikties ar Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Pieteikties ar ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Īpašnieks", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Izveides datums", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Modificēšanas datums", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Apraksts", // Shown in the 'Map information' section describing the webmap
            snippet: "Kopsavilkums", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Piekļuves un izmantošanas ierobežojumi", // Shown in the map information section indicating the webmap license information
            accessInformation: "Kredīti", // Shown in the 'Map information' section indicating account credits
            tags: "Tagi", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Skatījumu skaits", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Vērtējums", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Konfigurētā grupa nav derīga vai ar šo grupu vēl nav kopīgots neviens elements.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Kartes informācija" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Nav atrasts neviens elements", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Jūsu tuvumā nav atrasts neviens elements", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Nevar pabeigt darbību", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Doties uz galveno sarakstu", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Kartes skats" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Mani ziņojumi", // Command button shown in mobile menu list
            signIn: "Pierakstīties", // Command button shown in mobile menu list and in appheader
            signOut: "Izrakstīties", // Command button shown in mobile menu list
            signInTooltip: "Pierakstīties", // Tooltip to 'Sign in' option
            signOutTooltip: "Izrakstīties", // Tooltip  to 'Sign out' option
            myReportTooltip: "Skatīt manus ziņojumus" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Detaļas", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Pielikumi", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Pārlūks", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Izvietojums", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Ziņot par to", // Command button to submit the geoform to report an issue
            cancelButton: "Atcelt", //Command button to close the geoform
            requiredField: "(nepieciešams)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Izvēlēties&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Lūdzu, ievadiet derīgu vērtību.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Slāņa lauki nav konfigurēti datu tveršanai", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Lūdzu ievadiet veselu skaitli", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Lūdzu ievadiet veselu skaitli", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Lūdzu ievadiet numuru", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Lūdzu ievadiet numuru", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Lūdzu nodrošiniet vērtības visiem obligātajiem laukiem", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Lūdzu atlasiet vietu savam ziņojumam", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Norāde:${closeStrong} minimālā vērtība ${minValue} un maksimālā vērtība ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Norāde:${closeStrong} minimālais datums ${minValue} un maksimālais datums ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Neizdevās iesniegt ziņojumu", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "atlasītais(-ie) pielikums(-i)", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} no ${total} pielikuma(-iem) neizdevās augšupielādēt", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Pašreizējā vieta nav pieejama",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Pašreizējā vieta ir ārpus pamatkartes tvēruma",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "ķ_Submit___ū", // Command button to open the geoform
            cancelButtonTooltip: "Atcelt", //tooltip for cancel button
            geoformBackButtonTooltip: "ķ_Return to the report list_________ū" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Adrese:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Platums/Garums", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Rezultāti nav atrasti", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Ievadiet adresi meklēšanai", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Noteiktā adrese ir ārpus pamatkartes tvēruma", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Meklēšana", // Tooltip for search button
            clearButtonTooltip: "Notīrīt meklēšanas vērtību" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Mani ziņojumi", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Mani ziņojumi", // Command button to access issues reported by the logged in user
            noResultsFound: "Nav atrasts neviens ziņojums" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "ķ_Vote__ū", // Command button for up-voting a report
            likeButtonTooltip: "Balsot par šo ziņojumu",  // Tooltip for Like button
            commentButtonLabel: "Komentārs", // Command button for submitting feedback
            commentButtonTooltip: "Komentēt šo ziņojumu", // Tooltip for Comment button
            galleryButtonLabel: "Galerija", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Skatīt pievienotos dokumentus", // Tooltip for command button shown in details panel
            mapButtonLabel: "Skatīt kartē", // Command button shown in details panel
            mapButtonTooltip: "Skatiet šī ziņojuma vietu", // Tooltip for Gallery button
            commentsListHeading: "Komentāri", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Jūsu balsi šobrīd nevar pievienot.", // Error message for feature unable to update
            gotoIssueListTooltip: "Doties uz ziņojumu sarakstu" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Balsis par šo ziņojumu", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Ielādēt vēl..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Iesniegt komentāru",
            commentsFormCancelButton: "Atcelt",
            errorInSubmittingComment: "Komentāru nevarēja iesniegt.", // Shown when user is unable to add comments
            emptyCommentMessage: "Lūdzu ievadiet komentāru.", // Shown when user submits a comment without any text/character
            placeHolderText: "Ierakstiet komentāru", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Nav pieejamu komentāru", // Shown when no comments are available for the selected issue
            remainingTextCount: "Palikusi(-šas) ${0} rakstzīme(-s)", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Nē" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galerija",
            noAttachmentsAvailableText: "Nav atrasta piesaiste" // Shown when no comments are available for the selected issue
        }
    })
);
