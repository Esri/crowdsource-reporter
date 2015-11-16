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
            error: "Kan ikke opprette kart",
            zoomInTooltip: "Zoom inn",  // Command button to zoom in to the map
            zoomOutTooltip: "Zoom ut",  // Command button to zoom out of the map
            geolocationTooltip: "Gjeldende plassering"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Ingen gruppe er konfigurert", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Send en rapport", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Listevisning", // Go to List view tooltip text
            noFeatureGeomtery: "Kan ikke vise geoobjekt" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Fortsett som gjest", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Or", // Or text on sign in screen
            signinOptionsText: "Logg på med:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Du må logge på", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Logg på som gjenst", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Logg på med Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Logg på med Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Logg på med Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Logg på med ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Eier", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Opprettingsdato", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Oppdatert dato", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Beskrivelse", // Shown in the 'Map information' section describing the webmap
            snippet: "Sammendrag", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Begrensning av tilgang og bruk", // Shown in the map information section indicating the webmap license information
            accessInformation: "Credits", // Shown in the 'Map information' section indicating account credits
            tags: "Merker", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Antall visninger", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Vurdering", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Konfigurert gruppe er ugyldig, eller ingen elementer er blitt delt med denne gruppen ennå.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Kartinformasjon" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Finner ingen geoobjekter", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Finner ingen geoobjekter i nærheten av deg", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Kan ikke fullføre operasjonen", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Gå til hovedliste", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Kartvisning" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Mine rapporter", // Command button shown in mobile menu list
            signIn: "Logg på", // Command button shown in mobile menu list and in appheader
            signOut: "Logg ut", // Command button shown in mobile menu list
            signInTooltip: "Logg på", // Tooltip to 'Sign in' option
            signOutTooltip: "Logg av", // Tooltip  to 'Sign out' option
            myReportTooltip: "Vis mine rapporter" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Detaljer", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Vedlegg", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Bla gjennom", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Lokasjon", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Rapporter det", // Command button to submit the geoform to report an issue
            cancelButton: "Avbryt", //Command button to close the geoform
            requiredField: "(obligatorisk)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Select&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Du må angi en gyldig verdi.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Lagfelt er ikke konfigurert til å samle inn data", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Angi et heltall", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Angi et heltall", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Angi et tall", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Angi et tall", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Angi verdier for alle obligatoriske felt", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Velg lokasjonen for rapporten", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Hint:${closeStrong} Minimumsverdi ${minValue} og maksimumsverdi ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Hint:${closeStrong} Laveste dato ${minValue} og høyeste dato ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Kan ikke sende inn rapporten", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "vedlegg valgt", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "kan ikke laste opp ${failed} av ${total} vedlegg", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Gjeldende plassering er ikke tilgjengelig",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Gjeldende plassering er utenfor bakgrunnskartets utstrekning",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Rapporter det", // Command button to open the geoform
            cancelButtonTooltip: "Avbryt", //tooltip for cancel button
            geoformBackButtonTooltip: "Gå til rapportlisten" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Adresse:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Lengdegrad/breddegrad", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Fant ingen resultater", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Skriv inn en adresse som skal søkes etter", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Funnet adresse er utenfor bakgrunnskartets utstrekning", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Søke", // Tooltip for search button
            clearButtonTooltip: "Fjern søkeverdi" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Mine rapporter", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Mine rapporter", // Command button to access issues reported by the logged in user
            noResultsFound: "Finner ingen rapporter" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Lik", // Command button for up-voting a report
            likeButtonTooltip: "Stem på denne rapporten",  // Tooltip for Like button
            commentButtonLabel: "Kommentar", // Command button for submitting feedback
            commentButtonTooltip: "Kommenter denne rapporten", // Tooltip for Comment button
            galleryButtonLabel: "Galleri", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Se vedlagte dokumenter", // Tooltip for command button shown in details panel
            mapButtonLabel: "Vis på kart", // Command button shown in details panel
            mapButtonTooltip: "Vis lokasjonen for denne rapporten", // Tooltip for Gallery button
            commentsListHeading: "Kommentarer", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Stemmen din kan ikke telles akkurat nå.", // Error message for feature unable to update
            gotoIssueListTooltip: "Gå til rapportlisten" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Stemmer på denne rapporten", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Last inn flere..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Send inn kommentar",
            commentsFormCancelButton: "Avbryt",
            errorInSubmittingComment: "Kommentar kan ikke sendes.", // Shown when user is unable to add comments
            emptyCommentMessage: "Skriv en kommentar.", // Shown when user submits a comment without any text/character
            placeHolderText: "Skriv en kommentar.", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Ingen tilgjengelige kommentarer", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} tegn gjenstår", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Nei" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galleri",
            noAttachmentsAvailableText: "Fant ingen vedlegg" // Shown when no comments are available for the selected issue
        }
    })
);
