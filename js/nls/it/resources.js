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
            error: "Impossibile creare la mappa",
            zoomInTooltip: "Esegui Zoom in",  // Command button to zoom in to the map
            zoomOutTooltip: "Zoom indietro",  // Command button to zoom out of the map
            geolocationTooltip: "Posizione corrente"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Nessun gruppo configurato", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Invia un report", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Vista elenco", // Go to List view tooltip text
            noFeatureGeomtery: "Impossibile visualizzare la feature" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Continua come ospite", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Oppure", // Or text on sign in screen
            signinOptionsText: "Accedi con:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Effettuare l\'accesso", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Accedi come ospite", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Accedi con Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Accedi con Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Accedi con Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Accedi con ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Proprietario", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Data creazione", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Data modifica", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Descrizione", // Shown in the 'Map information' section describing the webmap
            snippet: "Riepilogo", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Vincoli di accesso e uso", // Shown in the map information section indicating the webmap license information
            accessInformation: "Crediti", // Shown in the 'Map information' section indicating account credits
            tags: "Tag", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Numero di visualizzazioni", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Classificazione", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Il gruppo configurato non è valido oppure non sono stati ancora condivisi elementi con il gruppo.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Informazioni mappa" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Nessun report disponibile nell\'area corrente", // Shown in the issue wall when no issues are present in the current map extent
            gotoWebmapListTooltip: "Vai all\'elenco principale", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Vista mappa" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "I miei report", // Command button shown in mobile menu list
            signIn: "Accedi", // Command button shown in mobile menu list and in appheader
            signOut: "Esci", // Command button shown in mobile menu list
            help: "Guida", // Command button shown in mobile menu list
            signInTooltip: "l\'accesso", // Tooltip to 'Sign in' option
            signOutTooltip: "Disconnetti", // Tooltip  to 'Sign out' option
            myReportTooltip: "Visualizza report inviati da me", // Tooltip  to 'My Reports' option
            helpTooltip: "Guida" // Tooltip  to 'Help' option
        },
        geoform: {
            enterInformation: "Dettagli", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Allegati", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Esplora", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Località", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Segnala", // Command button to submit the geoform to report an issue
            cancelButton: "Annulla", //Command button to close the geoform
            requiredField: "(obbligatorio)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Seleziona&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Immettere un valore valido.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "I campi del layer non sono configurati per acquisire dati", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Immettere un numero intero", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Immettere un numero intero", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Si prega di immettere un numero", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Si prega di immettere un numero", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Specificare valori per tutti i campi obbligatori", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Selezionare la posizione del report", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Suggerimento:${closeStrong} Valore minimo ${minValue} e valore massimo ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Suggerimento:${closeStrong} Data minima ${minValue} e data massima ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Impossibile segnalare il problema", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "allegato/i selezionato/i", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "Impossibile caricare ${failed} di ${total} allegati", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Posizione corrente non disponibile",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Posizione corrente esterna all\'estensione della mappa di base",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Segnala", // Command button to open the geoform
            cancelButtonTooltip: "Annulla", //tooltip for cancel button
            geoformBackButtonTooltip: "Vai all\'elenco dei report" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Indirizzo:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Latitudine/Longitudine", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Nessun risultato trovato", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Immettere un indirizzo per la ricerca", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Indirizzo individuato esterno all\'estensione della mappa di base", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Ricerca", // Tooltip for search button
            clearButtonTooltip: "Cancella valore di ricerca" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "I miei report", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "I miei report", // Command button to access issues reported by the logged in user
            noResultsFound: "Nessun report trovato" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Come", // Command button shown in details panel
            likeButtonTooltip: "Vota per questo report",  // Tooltip for command button shown in details panel
            commentButtonLabel: "Commento", // Command button shown in details panel
            commentButtonTooltip: "Commenta questo report", // Tooltip for command button shown in details panel
            galleryButtonLabel: "Galleria", // Command button shown in details panel
            galleryButtonTooltip: "Vedi documenti allegati", // Tooltip for command button shown in details panel
            mapButtonLabel: "Visualizza su mappa", // Command button shown in details panel
            mapButtonTooltip: "Visualizza la posizione di questo report", // Tooltip for command button shown in details panel
            commentsListHeading: "Commenti", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Impossibile aggiungere il voto al momento.", // Error message for feature unable to update
            gotoIssueListTooltip: "Vai all\'elenco dei report" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Voti per questo report" //Shown on hovering of the like icon in my-issues and issue-wall
        },
        comment: {
            commentsFormText: "Commento",
            commentsFormSubmitButton: "Invia commento",
            commentsFormCancelButton: "Annulla",
            errorInSubmittingComment: "Impossibile inviare il commento.", // Shown when user is unable to add comments
            emptyCommentMessage: "Immettere un commento.", // Shown when user submits a comment without any text/character
            placeHolderText: "Immettere un commento", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Nessun commento disponibile", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} caratteri rimanenti", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "No" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galleria",
            noAttachmentsAvailableText: "Nessun allegato trovato" // Shown when no comments are available for the selected issue
        }
    })
);
