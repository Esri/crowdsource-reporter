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
            error: "Nelze vytvořit mapu",
            zoomInTooltip: "Přiblížit",  // Command button to zoom in to the map
            zoomOutTooltip: "Oddálit",  // Command button to zoom out of the map
            geolocationTooltip: "Aktuální poloha"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Není nakonfigurována žádná skupina", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Odeslat zprávu", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Zobrazení seznamu", // Go to List view tooltip text
            noFeatureGeomtery: "Prvek nelze zobrazit." // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Pokračovat jako host", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Nebo", // Or text on sign in screen
            signinOptionsText: "Přihlásit se pomocí:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Prosím přihlaste se", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Přihlásit se jako host", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Přihlásit se pomocí Facebooku", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Přihlásit se pomocí Twitteru", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Přihlásit se pomocí Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Přihlásit se pomocí systému ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Vlastník", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Datum vytvoření", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Datum změny", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Popis", // Shown in the 'Map information' section describing the webmap
            snippet: "Souhrn", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Přístup a omezení použití", // Shown in the map information section indicating the webmap license information
            accessInformation: "Poděkování", // Shown in the 'Map information' section indicating account credits
            tags: "Klíčová slova", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Počet zobrazení", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Hodnocení", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Nakonfigurovaná skupina je neplatné, případně s touto skupinou ještě nebyly sdíleny žádné položky.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Informace o mapě" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Nebyly nalezeny žádné prvky.", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Ve vaší blízkosti nebyly nalezeny žádné prvky", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Nepodařilo se dokončit operaci", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Jít na hlavní seznam", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Zobrazení mapy" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Moje zprávy", // Command button shown in mobile menu list
            signIn: "Přihlásit", // Command button shown in mobile menu list and in appheader
            signOut: "Odhlásit", // Command button shown in mobile menu list
            signInTooltip: "Přihlásit se", // Tooltip to 'Sign in' option
            signOutTooltip: "Odhlásit se", // Tooltip  to 'Sign out' option
            myReportTooltip: "Zobrazit moje zprávy" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Podrobnosti", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Přílohy", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Procházet", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Poloha", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Vytvořit zprávu", // Command button to submit the geoform to report an issue
            cancelButton: "Storno", //Command button to close the geoform
            requiredField: "(vyžadováno)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Výběr&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Zadejte platnou hodnotu.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Pole vrstvy nejsou nakonfigurovány pro sbírání dat.", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Zadejte celé číslo.", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Zadejte celé číslo.", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Zadejte číslo.", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Zadejte číslo.", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Zadejte hodnoty do všech vyžadovaných polí.", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Vyberte umístění hlášení.", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Tip:${closeStrong} Minimální hodnota ${minValue} a Maximální hodnota ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Tip:${closeStrong} Minimální datum ${minValue} a Maximální datum ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Zprávu se nepodařilo odeslat", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "příloh vybráno", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "nepodařilo se nahrát ${failed} z ${total} příloh", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Současné umístění není k dispozici",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Aktuální umístění se nachází mimo rozsah podkladové mapy.",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Vytvořit zprávu", // Command button to open the geoform
            cancelButtonTooltip: "Storno", //tooltip for cancel button
            geoformBackButtonTooltip: "Přejít na seznam zpráv" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Adresa:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "zeměpisné šířky/délky", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Nebyly nalezeny žádné výsledky.", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Zadejte adresu pro hledání", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Nalezená adresa se nachází mimo rozsah podkladové mapy.", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Hledat", // Tooltip for search button
            clearButtonTooltip: "Vymazat hodnotu vyhledávání" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Moje zprávy", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Moje zprávy", // Command button to access issues reported by the logged in user
            noResultsFound: "Nebyly nalezeny žádné zprávy." // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Líbí se mi", // Command button for up-voting a report
            likeButtonTooltip: "Hlasovat pro tuto zprávu",  // Tooltip for Like button
            commentButtonLabel: "Komentář", // Command button for submitting feedback
            commentButtonTooltip: "Odeslat komentář pro tuto zprávu", // Tooltip for Comment button
            galleryButtonLabel: "Galerie", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Zobrazit připojené dokumenty", // Tooltip for command button shown in details panel
            mapButtonLabel: "Zobrazit na mapě", // Command button shown in details panel
            mapButtonTooltip: "Zobrazit umístění této zprávy", // Tooltip for Gallery button
            commentsListHeading: "Komentáře", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Váš hlas v tuto chvíli nelze započítat.", // Error message for feature unable to update
            gotoIssueListTooltip: "Přejít na seznam zpráv" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Hlasy pro tuto zprávu", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Načíst další..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Odeslat komentář",
            commentsFormCancelButton: "Storno",
            errorInSubmittingComment: "Komentář se nepodařilo odeslat.", // Shown when user is unable to add comments
            emptyCommentMessage: "Zadejte komentář.", // Shown when user submits a comment without any text/character
            placeHolderText: "Napište komentář", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Nejsou k dispozici žádné komentáře.", // Shown when no comments are available for the selected issue
            remainingTextCount: "Počet zbývajících znaků: ${0}", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Ne" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galerie",
            noAttachmentsAvailableText: "Nebyly nalezeny žádné přílohy" // Shown when no comments are available for the selected issue
        }
    })
);
