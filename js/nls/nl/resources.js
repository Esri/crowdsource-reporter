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
            error: "Kaart kan niet gemaakt worden",
            zoomInTooltip: "Inzoomen",  // Command button to zoom in to the map
            zoomOutTooltip: "Uitzoomen",  // Command button to zoom out of the map
            geolocationTooltip: "Huidige locatie"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Geen groep geconfigureerd", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Een rapport indienen", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Lijstweergave", // Go to List view tooltip text
            noFeatureGeomtery: "Object kan niet worden weergegeven" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Doorgaan als gast", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Of", // Or text on sign in screen
            signinOptionsText: "Aanmelden met:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Meld u aan", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Aanmelden als gast", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Aanmelden met Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Aanmelden met Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Aanmelden met Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Aanmelden met ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Eigenaar", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Aanmaakdatum", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Datum wijziging", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Beschrijving", // Shown in the 'Map information' section describing the webmap
            snippet: "Samenvatting", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Gebruiks- en toegangsbeperkingen", // Shown in the map information section indicating the webmap license information
            accessInformation: "Credits", // Shown in the 'Map information' section indicating account credits
            tags: "Labels", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Aantal weergaven", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Beoordeling", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Geconfigureerde groep is ongeldig of er worden nog geen items gedeeld met deze groep.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Kaartinformatie" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Geen objecten gevonden", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Geen objecten gevonden in uw omgeving", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Kan de actie niet voltooien", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Ga naar de hoofdlijst", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Kaartweergave" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Mijn Rapporten", // Command button shown in mobile menu list
            signIn: "Aanmelden", // Command button shown in mobile menu list and in appheader
            signOut: "Afmelden", // Command button shown in mobile menu list
            signInTooltip: "Aanmelden", // Tooltip to 'Sign in' option
            signOutTooltip: "Meld u af", // Tooltip  to 'Sign out' option
            myReportTooltip: "Mijn rapporten bekijken" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Details", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Bijlagen", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Bladeren", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Locatie", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Melden", // Command button to submit the geoform to report an issue
            cancelButton: "Annuleren", //Command button to close the geoform
            requiredField: "(vereist)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Selecteren&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Geef een geldige waarde op.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Laagvelden zijn niet geconfigureerd om data vast te leggen", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Een integer invoeren", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Een integer invoeren", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Een nummer invoeren", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Een nummer invoeren", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Geef waarden op voor alle vereiste velden", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Selecteer de locatie voor uw rapport", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Tip:${closeStrong} Minimumwaarde ${minValue} en Maximumwaarde ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Tip:${closeStrong} Minimumdatum ${minValue} en Maximumdatum ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Rapport kon niet worden ingediend", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "bijlage(n) geselecteerd", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} van ${total} bijlage(n) is niet geupload", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Huidige locatie niet beschikbaar",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Huidige locatie ligt buiten het basiskaartbereik",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Melden", // Command button to open the geoform
            cancelButtonTooltip: "Annuleren", //tooltip for cancel button
            geoformBackButtonTooltip: "Ga naar de meldlijst" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Adres:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Breedtegraad/lengtegraad", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Geen resultaten gevonden", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Voer een adres in om te zoeken", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Gezocht adres ligt buiten het basiskaartbereik", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Zoeken", // Tooltip for search button
            clearButtonTooltip: "Zoekwaarde wissen" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Mijn Rapporten", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Mijn Rapporten", // Command button to access issues reported by the logged in user
            noResultsFound: "Geen rapporten gevonden" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Zoals", // Command button for up-voting a report
            likeButtonTooltip: "Op dit rapport stemmen",  // Tooltip for Like button
            commentButtonLabel: "Opmerking", // Command button for submitting feedback
            commentButtonTooltip: "Op dit rapporten reageren", // Tooltip for Comment button
            galleryButtonLabel: "Gallery", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Zie bijgesloten documenten", // Tooltip for command button shown in details panel
            mapButtonLabel: "Op kaart weergeven", // Command button shown in details panel
            mapButtonTooltip: "Bekijk de locatie van dit rapport", // Tooltip for Gallery button
            commentsListHeading: "Opmerkingen", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Uw stem kan nu niet worden geteld.", // Error message for feature unable to update
            gotoIssueListTooltip: "Ga naar de meldlijst" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Stemmen op dit rapport", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Meer laden..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Opmerking verzenden",
            commentsFormCancelButton: "Annuleren",
            errorInSubmittingComment: "Reactie kon niet worden ingediend.", // Shown when user is unable to add comments
            emptyCommentMessage: "Voer een reactie in.", // Shown when user submits a comment without any text/character
            placeHolderText: "Type een reactie", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Geen reacties beschikbaar", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} teken(s) over", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Nee" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Gallery",
            noAttachmentsAvailableText: "Geen bijlagen gevonden" // Shown when no comments are available for the selected issue
        }
    })
);
