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
            error: "Kreiranje mape nije moguće",
            zoomInTooltip: "Uvećanje",  // Command button to zoom in to the map
            zoomOutTooltip: "Umanjenje",  // Command button to zoom out of the map
            geolocationTooltip: "Trenutna lokacija"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Nijedna grupa nije konfigurisana", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Č_Submit a Report______ž", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Prikaz liste", // Go to List view tooltip text
            noFeatureGeomtery: "Funkcija ne može da bude prikazana" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Nastavite kao gost", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "ili", // Or text on sign in screen
            signinOptionsText: "Prijavite se preko:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Prijavite se", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Prijavite se kao gost", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Prijavite se putem Facebook naloga", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Prijavite se putem Twitter naloga", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Prijavite se putem Google+ naloga", // Command button to access the application via Google+ login
            agolLoginTooltip: "Prijavite se putem ArcGIS naloga" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Vlasnik", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Datum kreiranja", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Datum izmene", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Opis", // Shown in the 'Map information' section describing the webmap
            snippet: "Rezime", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Ograničenja korišćenja i pristupa", // Shown in the map information section indicating the webmap license information
            accessInformation: "Krediti", // Shown in the 'Map information' section indicating account credits
            tags: "Oznake", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Broj prikaza", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Ocena", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Konfigurisana grupa nije validna ili nijedna stavka još nije podeljena sa ovom grupom.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Informacije o mapi" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Nije pronađen nijedan geoobjekat", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Nije pronađen nijedan geoobjekat blizu vas", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Završetak operacije nije moguć", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Idi na glavnu listu", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Prikaz mape" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Moji izveštaji", // Command button shown in mobile menu list
            signIn: "Prijavite se", // Command button shown in mobile menu list and in appheader
            signOut: "Odjavite se", // Command button shown in mobile menu list
            signInTooltip: "Prijavite se", // Tooltip to 'Sign in' option
            signOutTooltip: "Odjavite se", // Tooltip  to 'Sign out' option
            myReportTooltip: "Prikaži moje izveštaje" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Detalji", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Prilozi", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Pregledanje", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Lokacija", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Prijavi", // Command button to submit the geoform to report an issue
            cancelButton: "Otkaži", //Command button to close the geoform
            requiredField: "(obavezno)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Izaberi&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Unesite validnu vrednost.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Polja sloja nisu konfigurisana da snimaju podatke", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Unesite ceo broj", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Unesite ceo broj", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Unesite broj", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Unesite broj", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Unesite vrednosti za sva obavezna polja", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Izaberite lokaciju za izveštaj", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Podsetnik:${closeStrong} Minimalna vrednost ${minValue} i maksimalna vrednost ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Podsetnik:${closeStrong} Minimalna vrednost datuma ${minValue} i maksimalna vrednost datuma ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Prosleđivanje izveštaja nije moguće", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "izabrani prilog/prilozi", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "Nije uspelo otpremanje ${failed} od ${total} priloga", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Trenutna lokacija nije dostupna",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Trenutna lokacija je van obuhvata pozadinske mape",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Č_Submit___ž", // Command button to open the geoform
            cancelButtonTooltip: "Otkaži", //tooltip for cancel button
            geoformBackButtonTooltip: "Č_Return to the report list_________ž" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Adresa:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "Nacionalna koordinatna mreža SAD (USNG)", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "Referentni sistem vojne pravougle koordinatne mreže (MGRS)", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Geografska širina/dužina", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Nema pronađenih rezultata", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Unesite adresu za pretragu", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Locirana adresa je van obuhvata pozadinske mape", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Pretraži", // Tooltip for search button
            clearButtonTooltip: "Izbriši vrednosti za pretragu" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Moji izveštaji", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Moji izveštaji", // Command button to access issues reported by the logged in user
            noResultsFound: "Nema pronađenih izveštaja" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Č_Vote__ž", // Command button for up-voting a report
            likeButtonTooltip: "Glasaj za ovaj izveštaj",  // Tooltip for Like button
            commentButtonLabel: "Komentariši", // Command button for submitting feedback
            commentButtonTooltip: "Komentariši ovaj izveštaj", // Tooltip for Comment button
            galleryButtonLabel: "Galerija", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Pogledaj priložena dokumenta", // Tooltip for command button shown in details panel
            mapButtonLabel: "Prikaži na mapi", // Command button shown in details panel
            mapButtonTooltip: "Prikaži lokaciju ovog izveštaja", // Tooltip for Gallery button
            commentsListHeading: "Komentari", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Vaš glas ne može da bude uračunat ovoga puta.", // Error message for feature unable to update
            gotoIssueListTooltip: "Idi na listu izveštaja" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Glasovi za ovaj izveštaj", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Učitaj više..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Prosledi komentar",
            commentsFormCancelButton: "Otkaži",
            errorInSubmittingComment: "Prosleđivanje komentara nije moguće.", // Shown when user is unable to add comments
            emptyCommentMessage: "Unesite komentar.", // Shown when user submits a comment without any text/character
            placeHolderText: "Iskucajte komentar", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Nema dostupnih komentara", // Shown when no comments are available for the selected issue
            remainingTextCount: "preostalo ${0} karaktera", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Ne" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galerija",
            noAttachmentsAvailableText: "Prilozi nisu pronađeni" // Shown when no comments are available for the selected issue
        }
    })
);
