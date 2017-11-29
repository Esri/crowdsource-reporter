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
    "featureOutsideAOIMessage": "La feature non può essere aggiunta esternamente all'area di studio",
    "noEditingPermissionsMessage": "Non si è autorizzati a completare questa azione.",
    "basemapGalleryText": "Galleria di mappe di base",
    "legendText": "Legenda"
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
    "myReport": "I miei invii",
    "signIn": "Accedi",
    "signOut": "Esci",
    "signInTooltip": "l'accesso",
    "signOutTooltip": "Disconnetti",
    "myReportTooltip": "Visualizza i miei invii"
  },
  "geoform": {
    "enterInformation": "Dettagli",
    "selectAttachments": "Allegati",
    "selectFileText": "Esplora",
    "enterLocation": "Località",
    "reportItButton": "Segnala",
    "editReportButton": "Aggiorna",
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
    "errorsInApplyEdits": "Impossibile inviare i valori.",
    "attachmentSelectedMsg": "allegato/i selezionato/i",
    "attachmentUploadStatus": "Impossibile caricare ${failed} di ${total} allegati",
    "geoLocationError": "Posizione corrente non disponibile",
    "geoLocationOutOfExtent": "Posizione corrente esterna all'estensione della mappa di base",
    "submitButtonTooltip": "Invia",
    "cancelButtonTooltip": "Annulla",
    "geoformBackButtonTooltip": "Torna all'elenco",
    "locationSelectionHintForPointLayer": "Toccare la mappa per tracciare la posizione.",
    "locationSelectionHintForPolygonLayer": "Toccare la mappa per tracciare la posizione. Toccare due volte per completare l'operazione.",
    "locationSelectionHintForPointLayerDesktop": "Fare clic sulla mappa per tracciare la posizione.",
    "locationSelectionHintForPolygonLayerDesktop": "Fare clic sula mappa per tracciare la posizione. Fare doppio clic per completare l'operazione."
  },
  "locator": {
    "addressText": "Indirizzo:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Latitudine/Longitudine",
    "invalidSearch": "Nessun risultato trovato",
    "locatorPlaceholder": "Immettere un indirizzo per la ricerca",
    "locationOutOfExtent": "La località è al di fuori dell'area di invio",
    "searchButtonTooltip": "Ricerca",
    "clearButtonTooltip": "Cancella valore di ricerca"
  },
  "myIssues": {
    "title": "I miei invii",
    "myIssuesTooltip": "I miei invii",
    "noResultsFound": "Nessun invio trovato"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "Accetto",
    "commentButtonLabel": "",
    "commentButtonTooltip": "Commenta",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Vedi documenti allegati",
    "mapButtonLabel": "Visualizza su mappa",
    "mapButtonTooltip": "Visualizza la località di questo invio",
    "commentsListHeading": "Commenti",
    "unableToUpdateVoteField": "Impossibile conteggiare il voto al momento.",
    "gotoIssueListTooltip": "Visualizza l'elenco degli invii",
    "deleteMessage": "Eliminare?"
  },
  "itemList": {
    "likesForThisItemTooltip": "Numero di voti",
    "loadMoreButtonText": "Carica altro..."
  },
  "comment": {
    "commentsFormHeading": "Commento",
    "commentsFormSubmitButton": "Invia commento",
    "commentsFormEditButton": "Aggiorna commento",
    "commentsFormCancelButton": "Annulla",
    "errorInSubmittingComment": "Impossibile inviare il commento.",
    "emptyCommentMessage": "Immettere un commento.",
    "placeHolderText": "Immettere un commento",
    "noCommentsAvailableText": "Nessun commento disponibile",
    "remainingTextCount": "${0} caratteri rimanenti",
    "showNoText": "No",
    "selectAttachments": "Allegati",
    "selectFileText": "Esplora",
    "attachmentSelectedMsg": "allegato/i selezionato/i",
    "attachmentHeaderText": "Allegati",
    "unknownCommentAttachment": "FILE",
    "editRecordText": "Modifica",
    "deleteRecordText": "Può eliminare",
    "deleteCommentFailedMessage": "Impossibile eliminare il commento"
  },
  "gallery": {
    "galleryHeaderText": "Galleria",
    "noAttachmentsAvailableText": "Nessun allegato trovato"
  }
});