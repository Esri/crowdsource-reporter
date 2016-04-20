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
            error: "Nije moguće stvoriti kartu",
            zoomInTooltip: "Povećaj",  // Command button to zoom in to the map
            zoomOutTooltip: "Smanji",  // Command button to zoom out of the map
            geolocationTooltip: "Trenutačna lokacija"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Nema konfiguriranih grupa", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Č_Submit a Report______ž", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Prikaz u popisu", // Go to List view tooltip text
            noFeatureGeomtery: "Geoobjekt se ne može prikazati" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Nastavi kao gost", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "ili", // Or text on sign in screen
            signinOptionsText: "Prijava kao:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Prijavite se", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Prijavite se kao gost", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Prijava preko Facebooka", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Prijava preko Twittera", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Prijava preko Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Prijavite se preko ArcGIS-a" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Vlasnik", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Datum izrade", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Datum izmjene", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Opis", // Shown in the 'Map information' section describing the webmap
            snippet: "Sažetak", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Ograničenja pristupa i upotrebe", // Shown in the map information section indicating the webmap license information
            accessInformation: "Krediti", // Shown in the 'Map information' section indicating account credits
            tags: "Oznake", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Broj prikaza", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Ocjena", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Konfigurirana grupa nije valjana ili s grupom još nisu podijeljene stavke.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Informacije o karti" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Nema geoobjekata", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Nema geoobjekata u vašoj blizini", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Nije moguće dovršiti radnju", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Idi na glavni popis", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Prikaz karte" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Moja izvješća", // Command button shown in mobile menu list
            signIn: "Prijava", // Command button shown in mobile menu list and in appheader
            signOut: "Odjava", // Command button shown in mobile menu list
            signInTooltip: "Prijava", // Tooltip to 'Sign in' option
            signOutTooltip: "Odjava", // Tooltip  to 'Sign out' option
            myReportTooltip: "Prikaz mojih izvješća" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Pojedinosti", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Privitci", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Pregledaj", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Lokacija", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Prijavi", // Command button to submit the geoform to report an issue
            cancelButton: "Odustani", //Command button to close the geoform
            requiredField: "(obavezno)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Odabir&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Unesite valjanu vrijednost.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Polja slojeva nisu konfigurirana za prikupljanje podataka", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Unesite cijeli broj", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Unesite cijeli broj", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Unesite broj", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Unesite broj", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Upišite vrijednosti za sva obavezna polja", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Odaberite lokaciju za izvješće", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Podsjetnik:${closeStrong} minimalna vrijednost ${minValue} i maksimalna vrijednost ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Podsjetnik:${closeStrong} minimalni datum ${minValue} i maksimalni datum ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Nije moguće podnijeti izvješće.", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "odabrani privitak(-ci)", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} od ${total} privit(a)ka nije poslano", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Trenutačna lokacija nije dostupna",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Trenutačna lokacija izvan je obuhvata kartografske podloge",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Č_Submit___ž", // Command button to open the geoform
            cancelButtonTooltip: "Odustani", //tooltip for cancel button
            geoformBackButtonTooltip: "Č_Return to the report list_________ž" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Adresa:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Geografska dužina/širina", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Nema rezultata", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Unesite adresu za pretraživanje", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Pronađena adresa izvan je obuhvata kartografske podloge", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Pretraži", // Tooltip for search button
            clearButtonTooltip: "Očisti vrijednost pretrage" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Moja izvješća", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Moja izvješća", // Command button to access issues reported by the logged in user
            noResultsFound: "Nema izvješća" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Č_Vote__ž", // Command button for up-voting a report
            likeButtonTooltip: "Glasaj za ovo izvješće",  // Tooltip for Like button
            commentButtonLabel: "Komentar", // Command button for submitting feedback
            commentButtonTooltip: "Komentiraj ovo izvješće", // Tooltip for Comment button
            galleryButtonLabel: "Galerija", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Vidi priložene dokumente", // Tooltip for command button shown in details panel
            mapButtonLabel: "Prikaži na karti", // Command button shown in details panel
            mapButtonTooltip: "Prikaz lokacije ovog izvješća", // Tooltip for Gallery button
            commentsListHeading: "Komentari", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Vaš se glas trenutačno ne može pribrojiti.", // Error message for feature unable to update
            gotoIssueListTooltip: "Idi na popis izvješća" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Glasovi za ovo izvješće", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Učitaj više..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Pošalji komentar",
            commentsFormCancelButton: "Odustani",
            errorInSubmittingComment: "Nije moguće poslati komentar.", // Shown when user is unable to add comments
            emptyCommentMessage: "Unesite komentar.", // Shown when user submits a comment without any text/character
            placeHolderText: "Upišite komentar", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Nema dostupnih komentara", // Shown when no comments are available for the selected issue
            remainingTextCount: "preostalo ${0} znakova", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Ne" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galerija",
            noAttachmentsAvailableText: "Nema privitaka" // Shown when no comments are available for the selected issue
        }
    })
);
