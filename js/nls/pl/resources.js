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
            error: "Nie można utworzyć",
            zoomInTooltip: "Powiększ",  // Command button to zoom in to the map
            zoomOutTooltip: "Pomniejsz",  // Command button to zoom out of the map
            geolocationTooltip: "Bieżąca lokalizacja"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Nie skonfigurowano żadnej grupy", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Prześlij raport", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Widok listy", // Go to List view tooltip text
            noFeatureGeomtery: "Nie można wyświetlić obiektu" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Kontynuuj jako gość", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Or", // Or text on sign in screen
            signinOptionsText: "Zaloguj się, używając:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Zaloguj się", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Zaloguj się jako gość", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Zaloguj się, używając danych dostępowych z serwisu Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Zaloguj się, używając danych dostępowych z serwisu Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Zaloguj się, używając danych dostępowych z serwisu Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Zaloguj się, używając danych dostępowych z serwisu ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Właściciel", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Data utworzenia", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Ostatnia modyfikacja", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Opis", // Shown in the 'Map information' section describing the webmap
            snippet: "Summary", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Ograniczenia dostępu i użytkowania", // Shown in the map information section indicating the webmap license information
            accessInformation: "Udostępniający zasoby", // Shown in the 'Map information' section indicating account credits
            tags: "Tags", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Liczba wyświetleń", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Ocena", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Skonfigurowana grupa jest nieprawidłowa lub tej grupie nie udostępniono jeszcze żadnych elementów.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Informacje o mapie" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Nie znaleziono żadnych obiektów", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Nie znaleziono żadnych obiektów niedaleko Ciebie", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Nie można zakończyć czynności", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Przejdź do głównej listy", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Widok mapy" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Moje raporty", // Command button shown in mobile menu list
            signIn: "Zaloguj się", // Command button shown in mobile menu list and in appheader
            signOut: "Wyloguj się", // Command button shown in mobile menu list
            signInTooltip: "Sign in", // Tooltip to 'Sign in' option
            signOutTooltip: "Wyloguj się", // Tooltip  to 'Sign out' option
            myReportTooltip: "Wyświetl Moje raporty" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Szczegóły", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Załączniki", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Przeglądaj", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Lokalizacja", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Zgłoś", // Command button to submit the geoform to report an issue
            cancelButton: "Anuluj", //Command button to close the geoform
            requiredField: "(wymagane)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Wybierz&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Podaj właściwą wartość.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Pola warstw nie są skonfigurowane do rejestrowania danych", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Wprowadź liczbę całkowitą", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Wprowadź liczbę całkowitą", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Wprowadź liczbę", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Wprowadź liczbę", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Podaj wartości wszystkich wymaganych pól", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Wybierz lokalizację dla raportu", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Wskazówka:${closeStrong} Wartość minimalna ${minValue} i Wartość maksymalna ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Wskazówka:${closeStrong} Data minimalna ${minValue} i Data maksymalna ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Nie można przesłać raportu", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "wybrany(-e/-ych) załącznik(-i/-ów)", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "Nie udało się przesłać ${failed} z ${total} załączników", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Bieżąca lokalizacja nie jest dostępna",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Bieżąca lokalizacja jest poza zakresem mapy bazowej",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Zgłoś", // Command button to open the geoform
            cancelButtonTooltip: "Anuluj", //tooltip for cancel button
            geoformBackButtonTooltip: "Przejdź do listy raportów" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Adres:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Szer. geogr./dł. geogr.", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Nie znaleziono wyników", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Wprowadź adres do wyszukania", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Zlokalizowany adres jest poza zakresem mapy bazowej", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Szukaj", // Tooltip for search button
            clearButtonTooltip: "Wyczyść wartość wyszukiwania" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Moje raporty", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Moje raporty", // Command button to access issues reported by the logged in user
            noResultsFound: "Nie znaleziono raportów" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Lubię to", // Command button for up-voting a report
            likeButtonTooltip: "Głosuj na ten raport",  // Tooltip for Like button
            commentButtonLabel: "Komentarz", // Command button for submitting feedback
            commentButtonTooltip: "Dodaj komentarz do tego raportu", // Tooltip for Comment button
            galleryButtonLabel: "Galeria", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Zobacz załączone dokumenty", // Tooltip for command button shown in details panel
            mapButtonLabel: "Wyświetl na mapie", // Command button shown in details panel
            mapButtonTooltip: "Wyświetl lokalizację tego raportu", // Tooltip for Gallery button
            commentsListHeading: "Comments", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Oddanego głosu nie można teraz zliczyć.", // Error message for feature unable to update
            gotoIssueListTooltip: "Przejdź do listy raportów" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Głosy na ten raport", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Wczytaj więcej..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Prześlij komentarz",
            commentsFormCancelButton: "Anuluj",
            errorInSubmittingComment: "Nie można przesłać komentarza.", // Shown when user is unable to add comments
            emptyCommentMessage: "Wprowadź komentarz.", // Shown when user submits a comment without any text/character
            placeHolderText: "Wpisz komentarz", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Brak dostępnych komentarzy", // Shown when no comments are available for the selected issue
            remainingTextCount: "Pozostało znaków: ${0}", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Nie" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galeria",
            noAttachmentsAvailableText: "Nie znaleziono załączników" // Shown when no comments are available for the selected issue
        }
    })
);
