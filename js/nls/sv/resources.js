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
            error: "Det går inte att skapa kartan",
            zoomInTooltip: "Zooma in",  // Command button to zoom in to the map
            zoomOutTooltip: "Zooma ut",  // Command button to zoom out of the map
            geolocationTooltip: "Aktuell plats"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Ingen grupp konfigurerad", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Skicka in en rapport", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Listvy", // Go to List view tooltip text
            noFeatureGeomtery: "Geoobjektet kan inte visas" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Fortsätt som gäst", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Eller", // Or text on sign in screen
            signinOptionsText: "Logga in med:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Logga in", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Logga in som gäst", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Logga in med Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Logga in med Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Logga in med Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Logga in med ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Ägare", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Skapad den", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Ändrad den", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Beskrivning", // Shown in the 'Map information' section describing the webmap
            snippet: "Sammanfattning", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Begränsningar av åtkomst och användning", // Shown in the map information section indicating the webmap license information
            accessInformation: "Krediter", // Shown in the 'Map information' section indicating account credits
            tags: "Taggar", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Antal visningar", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Bedömning", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Den konfigurerade gruppen är ogiltig eller inga objekt har delats med den här gruppen ännu.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Kartinformation" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Å_No features found______ö", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Å_No features found near you_________ö", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Å_Unable to complete operation_________ö", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Gå till huvudlistan", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Kartvy" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Mina rapporter", // Command button shown in mobile menu list
            signIn: "Logga in", // Command button shown in mobile menu list and in appheader
            signOut: "Logga ut", // Command button shown in mobile menu list
            signInTooltip: "Logga in", // Tooltip to 'Sign in' option
            signOutTooltip: "Logga ut", // Tooltip  to 'Sign out' option
            myReportTooltip: "Å_View my reports______ö" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Detaljer", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Bilagor", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Bläddra", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Plats", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Rapportera", // Command button to submit the geoform to report an issue
            cancelButton: "Avbryt", //Command button to close the geoform
            requiredField: "(obligatoriskt)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Välj&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Ange ett giltigt värde.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Lagerfält är inte konfigurerade att fånga data", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Ange ett heltal", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Ange ett heltal", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Ange ett tal", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Ange ett tal", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Ange värden för alla obligatoriska fält", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Välj platsen för din rapport", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Tips:${closeStrong} minsta värde ${minValue} och största värde ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Tips:${closeStrong} minsta datum ${minValue} och största datum ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Å_Report could not be submitted__________ö", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "bilagor markerade", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} av ${total} bilagor kunde inte överföras", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Aktuell plats finns inte tillgänglig",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Aktuell plats är utanför baskartans utbredning",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Rapportera", // Command button to open the geoform
            cancelButtonTooltip: "Avbryt", //tooltip for cancel button
            geoformBackButtonTooltip: "Gå till rapportlistan" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Adress:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Latitud/longitud", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Inga resultat hittades", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Ange en adress att söka efter", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Den lokaliserade adressen är utanför baskartans utbredning", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Sök", // Tooltip for search button
            clearButtonTooltip: "Rensa sökvärde" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Mina rapporter", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Mina rapporter", // Command button to access issues reported by the logged in user
            noResultsFound: "Å_No reports found______ö" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Gilla", // Command button for up-voting a report
            likeButtonTooltip: "Rösta för den här rapporten",  // Tooltip for Like button
            commentButtonLabel: "Kommentar", // Command button for submitting feedback
            commentButtonTooltip: "Kommentera den här rapporten", // Tooltip for Comment button
            galleryButtonLabel: "Galleri", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Se bifogade dokument", // Tooltip for command button shown in details panel
            mapButtonLabel: "Visa på kartan", // Command button shown in details panel
            mapButtonTooltip: "Visa platsen för rapporten", // Tooltip for Gallery button
            commentsListHeading: "Kommentarer", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Å_Your vote cannot be counted at this time_____________ö.", // Error message for feature unable to update
            gotoIssueListTooltip: "Gå till rapportlistan" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Röster för den här rapporten", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Å_Load More_____ö..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Skicka en kommentar",
            commentsFormCancelButton: "Avbryt",
            errorInSubmittingComment: "Det gick inte att skicka kommentaren.", // Shown when user is unable to add comments
            emptyCommentMessage: "Ange en kommentar.", // Shown when user submits a comment without any text/character
            placeHolderText: "Skriv en kommentar", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Inga kommentarer tillgängliga", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} tecken återstår", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Nej" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galleri",
            noAttachmentsAvailableText: "Inga bilagor hittades" // Shown when no comments are available for the selected issue
        }
    })
);
