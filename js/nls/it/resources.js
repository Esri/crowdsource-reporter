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
define({
  "map": {
    "error": "Impossibile creare la mappa",
    "zoomInTooltip": "Esegui Zoom in",
    "zoomOutTooltip": "Zoom indietro",
    "geolocationTooltip": "Posizione corrente"
  },
  "main": {
    "noGroup": "Nessun gruppo configurato",
    "submitReportButtonText": "Invia un report",
    "gotoListViewTooltip": "Vista elenco",
    "noFeatureGeomtery": "Impossibile visualizzare la feature",
    "featureOutsideAOIMessage": "é_Feature cannot be added outside study area______________È"
  },
  "signin": {
    "guestSigninText": "Continua come ospite",
    "signInOrText": "Oppure",
    "signinOptionsText": "Accedi con:",
    "noGroupNameText": "Effettuare l'accesso",
    "guestLoginTooltip": "Accedi come ospite",
    "facebookLoginTooltip": "Accedi con Facebook",
    "twitterLoginTooltip": "Accedi con Twitter",
    "googlePlusLoginTooltip": "Accedi con Google+",
    "agolLoginTooltip": "Accedi con ArcGIS"
  },
  "webMapList": {
    "owner": "Proprietario",
    "created": "Data creazione",
    "modified": "Data modifica",
    "description": "Descrizione",
    "snippet": "Riepilogo",
    "licenseInfo": "Vincoli di accesso e uso",
    "accessInformation": "Crediti",
    "tags": "Tag",
    "numViews": "Numero di visualizzazioni",
    "avgRating": "Classificazione",
    "noWebMapInGroup": "Il gruppo configurato non è valido oppure non sono stati ancora condivisi elementi con il gruppo.",
    "infoBtnToolTip": "Informazioni mappa"
  },
  "issueWall": {
    "noResultsFound": "Nessuna feature trovata",
    "noResultsFoundInCurrentBuffer": "Nessuna feature trovata nelle vicinanze",
    "unableToFetchFeatureError": "Impossibile completare l'operazione",
    "gotoWebmapListTooltip": "Vai all'elenco principale",
    "gotoMapViewTooltip": "Vista mappa"
  },
  "appHeader": {
    "myReport": "I miei report",
    "signIn": "Accedi",
    "signOut": "Esci",
    "signInTooltip": "l'accesso",
    "signOutTooltip": "Disconnetti",
    "myReportTooltip": "Visualizza i miei report"
  },
  "geoform": {
    "enterInformation": "Dettagli",
    "selectAttachments": "Allegati",
    "selectFileText": "Esplora",
    "enterLocation": "Località",
    "reportItButton": "Segnala",
    "editReportButton": "é_Update___È",
    "cancelButton": "Annulla",
    "requiredField": "(obbligatorio)",
    "selectDefaultText": "Seleziona&hellip;",
    "invalidInputValue": "Immettere un valore valido.",
    "noFieldsConfiguredMessage": "I campi del layer non sono configurati per acquisire dati",
    "invalidSmallNumber": "Immettere un numero intero",
    "invalidNumber": "Immettere un numero intero",
    "invalidFloat": "Si prega di immettere un numero",
    "invalidDouble": "Si prega di immettere un numero",
    "requiredFields": "Specificare valori per tutti i campi obbligatori",
    "selectLocation": "Selezionare la posizione del report",
    "numericRangeHintMessage": "${openStrong}Suggerimento:${closeStrong} Valore minimo ${minValue} e valore massimo ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Suggerimento:${closeStrong} Data minima ${minValue} e data massima ${maxValue}",
    "errorsInApplyEdits": "Impossibile inviare il rapporto",
    "attachmentSelectedMsg": "allegato/i selezionato/i",
    "attachmentUploadStatus": "Impossibile caricare ${failed} di ${total} allegati",
    "geoLocationError": "Posizione corrente non disponibile",
    "geoLocationOutOfExtent": "Posizione corrente esterna all'estensione della mappa di base",
    "submitButtonTooltip": "Invia",
    "cancelButtonTooltip": "Annulla",
    "geoformBackButtonTooltip": "Torna all'elenco dei report"
  },
  "locator": {
    "addressText": "Indirizzo:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Latitudine/Longitudine",
    "invalidSearch": "Nessun risultato trovato",
    "locatorPlaceholder": "Immettere un indirizzo per la ricerca",
    "locationOutOfExtent": "Indirizzo individuato esterno all'estensione della mappa di base",
    "searchButtonTooltip": "Ricerca",
    "clearButtonTooltip": "Cancella valore di ricerca"
  },
  "myIssues": {
    "title": "I miei report",
    "myIssuesTooltip": "I miei report",
    "noResultsFound": "Nessun report trovato"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "é_I agree___È",
    "commentButtonLabel": "",
    "commentButtonTooltip": "é_Leave a reply_____È",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Vedi documenti allegati",
    "mapButtonLabel": "Visualizza su mappa",
    "mapButtonTooltip": "Visualizza la posizione di questo report",
    "commentsListHeading": "Commenti",
    "unableToUpdateVoteField": "Impossibile conteggiare il voto al momento.",
    "gotoIssueListTooltip": "Vai all'elenco dei report",
    "deleteMessage": "é_Are you sure you want to delete___________È?"
  },
  "itemList": {
    "likesForThisItemTooltip": "Voti per questo report",
    "loadMoreButtonText": "Carica altro..."
  },
  "comment": {
    "commentsFormHeading": "é_Comment___È",
    "commentsFormSubmitButton": "Invia commento",
    "commentsFormEditButton": "é_Update Comment_____È",
    "commentsFormCancelButton": "Annulla",
    "errorInSubmittingComment": "Impossibile inviare il commento.",
    "emptyCommentMessage": "Immettere un commento.",
    "placeHolderText": "Immettere un commento",
    "noCommentsAvailableText": "Nessun commento disponibile",
    "remainingTextCount": "${0} caratteri rimanenti",
    "showNoText": "No",
    "selectAttachments": "é_Attachments____È",
    "selectFileText": "é_Browse___È",
    "attachmentSelectedMsg": "é_attachment(s) selected________È",
    "attachmentHeaderText": "é_Attachments____È",
    "unknownCommentAttachment": "é_FILE__È",
    "editRecordText": "é_Edit__È",
    "deleteRecordText": "é_Delete___È",
    "deleteCommentFailedMessage": "é_Unable to delete comment________È"
  },
  "gallery": {
    "galleryHeaderText": "Galleria",
    "noAttachmentsAvailableText": "Nessun allegato trovato"
  }
});