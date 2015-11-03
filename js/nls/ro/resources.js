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
            error: "Imposibil de creat harta",
            zoomInTooltip: "Mărire",  // Command button to zoom in to the map
            zoomOutTooltip: "Micşorare",  // Command button to zoom out of the map
            geolocationTooltip: "Locaţie curentă"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Niciun grup configurat", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Transmitere raport", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Vizualizare tip listă", // Go to List view tooltip text
            noFeatureGeomtery: "Obiectul spaţial nu poate fi afişat" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Continuare ca oaspete", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Sau", // Or text on sign in screen
            signinOptionsText: "Autentificare cu:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Autentificaţi-vă", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Autentificare ca oaspete", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Autentificare cu Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Autentificare cu Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Autentificare cu Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Autentificare cu ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Proprietar", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Data creării", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Dată modificată", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Descriere", // Shown in the 'Map information' section describing the webmap
            snippet: "Rezumat", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Reguli de accesare şi utilizare", // Shown in the map information section indicating the webmap license information
            accessInformation: "Credite", // Shown in the 'Map information' section indicating account credits
            tags: "Etichete", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Număr de vizualizări", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Calificativ", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Grupul configurat nu este valid sau niciun element nu a fost încă partajat cu grupul.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Informaţii hartă" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Ă_No features found______ș", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Ă_No features found near you_________ș", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Ă_Unable to complete operation_________ș", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Accesaţi lista principală", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Vizualizare hartă" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Rapoartele mele", // Command button shown in mobile menu list
            signIn: "Autentificare", // Command button shown in mobile menu list and in appheader
            signOut: "Deconectare", // Command button shown in mobile menu list
            signInTooltip: "Autentificaţi-vă", // Tooltip to 'Sign in' option
            signOutTooltip: "Deconectare", // Tooltip  to 'Sign out' option
            myReportTooltip: "Ă_View my reports______ș" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Detalii", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Fișiere atașate", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Parcurgere", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Locaţie", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Raportare", // Command button to submit the geoform to report an issue
            cancelButton: "Anulare", //Command button to close the geoform
            requiredField: "(obligatoriu)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Selectare&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Introduceţi o valoare validă.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Câmpurile straturilor tematice nu sunt configurate pentru a captura datele", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Introduceţi un număr întreg", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Introduceţi un număr întreg", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Introduceţi un număr", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Introduceţi un număr", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Furnizaţi valorile pentru toate câmpurile obligatorii", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Selectaţi locaţia pentru raport", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Sugestie:${closeStrong} Valoarea minimă ${minValue} şi Valoarea maximă ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Sugestie:${closeStrong} Data minimă ${minValue} şi Data maximă ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Ă_Report could not be submitted__________ș", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "ataşări selectate", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} din ${total} ataşări nu au fost încărcate", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Locaţia curentă nu este disponibilă",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Locaţia curentă se află în afara extinderii hărţii fundal",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Raportare", // Command button to open the geoform
            cancelButtonTooltip: "Anulare", //tooltip for cancel button
            geoformBackButtonTooltip: "Accesare listă rapoarte" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Adresă:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Latitudine/Longitudine", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Nu a fost găsit niciun rezultat", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Introduceţi o adresă pentru a o căuta", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Adresa localizată se află în afara extinderii hărţii fundal", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Căutare", // Tooltip for search button
            clearButtonTooltip: "Golire valoare căutare" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Rapoartele mele", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Rapoartele mele", // Command button to access issues reported by the logged in user
            noResultsFound: "Ă_No reports found______ș" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Îmi place", // Command button for up-voting a report
            likeButtonTooltip: "Votaţi pentru acest raport",  // Tooltip for Like button
            commentButtonLabel: "Comentariu", // Command button for submitting feedback
            commentButtonTooltip: "Comentaţi acest raport", // Tooltip for Comment button
            galleryButtonLabel: "Galerie", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Consultaţi documentele ataşate", // Tooltip for command button shown in details panel
            mapButtonLabel: "Vizualizare pe hartă", // Command button shown in details panel
            mapButtonTooltip: "Vizualizaţi locaţia acestui raport", // Tooltip for Gallery button
            commentsListHeading: "Comentarii", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Ă_Your vote cannot be counted at this time_____________ș.", // Error message for feature unable to update
            gotoIssueListTooltip: "Accesare listă rapoarte" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Voturi pentru acest raport", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Ă_Load More_____ș..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Trimitere comentariu",
            commentsFormCancelButton: "Anulare",
            errorInSubmittingComment: "Comentariul nu a putut fi transmis.", // Shown when user is unable to add comments
            emptyCommentMessage: "Introduceţi un comentariu.", // Shown when user submits a comment without any text/character
            placeHolderText: "Introduceţi un comentariu", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Niciun comentariu disponibil", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} caractere rămase", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Nu" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galerie",
            noAttachmentsAvailableText: "Nicio ataşare găsită" // Shown when no comments are available for the selected issue
        }
    })
);
