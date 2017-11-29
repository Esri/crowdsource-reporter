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
    "error": "Det går inte att skapa kartan",
    "zoomInTooltip": "Zooma in",
    "zoomOutTooltip": "Zooma ut",
    "geolocationTooltip": "Aktuell plats"
  },
  "main": {
    "noGroup": "Ingen grupp konfigurerad",
    "submitReportButtonText": "Skicka in en rapport",
    "gotoListViewTooltip": "Listvy",
    "noFeatureGeomtery": "Geoobjektet kan inte visas",
    "featureOutsideAOIMessage": "Geoobjektet går inte att lägga till utanför undersökningsområdet",
    "noEditingPermissionsMessage": "Du har inte behörighet att utföra den här åtgärden.",
    "basemapGalleryText": "Baskartgalleri",
    "legendText": "Teckenförklaring"
  },
  "signin": {
    "guestSigninText": "Fortsätt som gäst",
    "signInOrText": "Eller",
    "signinOptionsText": "Logga in med:",
    "noGroupNameText": "Logga in",
    "guestLoginTooltip": "Logga in som gäst",
    "facebookLoginTooltip": "Logga in med Facebook",
    "twitterLoginTooltip": "Logga in med Twitter",
    "googlePlusLoginTooltip": "Logga in med Google+",
    "agolLoginTooltip": "Logga in med ArcGIS"
  },
  "webMapList": {
    "owner": "Ägare",
    "created": "Skapad den",
    "modified": "Ändrad den",
    "description": "Beskrivning",
    "snippet": "Sammanfattning",
    "licenseInfo": "Begränsningar av åtkomst och användning",
    "accessInformation": "Krediter",
    "tags": "Taggar",
    "numViews": "Antal visningar",
    "avgRating": "Bedömning",
    "noWebMapInGroup": "Den konfigurerade gruppen är ogiltig eller inga objekt har delats med den här gruppen ännu.",
    "infoBtnToolTip": "Kartinformation"
  },
  "issueWall": {
    "noResultsFound": "Inga geoobjekt hittades",
    "noResultsFoundInCurrentBuffer": "Inga geoobjekt hittades nära dig",
    "unableToFetchFeatureError": "Det gick inte att slutföra åtgärden",
    "gotoWebmapListTooltip": "Gå till huvudlistan",
    "gotoMapViewTooltip": "Kartvy"
  },
  "appHeader": {
    "myReport": "Mina bidrag",
    "signIn": "Logga in",
    "signOut": "Logga ut",
    "signInTooltip": "Logga in",
    "signOutTooltip": "Logga ut",
    "myReportTooltip": "Visa mina bidrag"
  },
  "geoform": {
    "enterInformation": "Detaljer",
    "selectAttachments": "Bilagor",
    "selectFileText": "Bläddra",
    "enterLocation": "Plats",
    "reportItButton": "Rapportera",
    "editReportButton": "Uppdatera",
    "cancelButton": "Avbryt",
    "requiredField": "(obligatoriskt)",
    "selectDefaultText": "Välj&hellip;",
    "invalidInputValue": "Ange ett giltigt värde.",
    "noFieldsConfiguredMessage": "Lagerfält är inte konfigurerade att fånga data",
    "invalidSmallNumber": "Ange ett heltal",
    "invalidNumber": "Ange ett heltal",
    "invalidFloat": "Ange ett tal",
    "invalidDouble": "Ange ett tal",
    "requiredFields": "Ange värden för alla obligatoriska fält",
    "selectLocation": "Välj platsen för din rapport",
    "numericRangeHintMessage": "${openStrong}Tips:${closeStrong} minsta värde ${minValue} och största värde ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Tips:${closeStrong} minsta datum ${minValue} och största datum ${maxValue}",
    "errorsInApplyEdits": "Det gick inte att skicka värdena.",
    "attachmentSelectedMsg": "bilagor markerade",
    "attachmentUploadStatus": "${failed} av ${total} bilagor kunde inte överföras",
    "geoLocationError": "Aktuell plats finns inte tillgänglig",
    "geoLocationOutOfExtent": "Aktuell plats är utanför baskartans utbredning",
    "submitButtonTooltip": "Skicka",
    "cancelButtonTooltip": "Avbryt",
    "geoformBackButtonTooltip": "Återgå till listan",
    "locationSelectionHintForPointLayer": "Tryck på kartan om du vill rita platsen.",
    "locationSelectionHintForPolygonLayer": "Tryck på kartan om du vill rita platsen. Dubbeltryck när du vill slutföra ritningen.",
    "locationSelectionHintForPointLayerDesktop": "Klicka på kartan om du vill rita platsen.",
    "locationSelectionHintForPolygonLayerDesktop": "Klicka på kartan om du vill rita platsen. Dubbelklicka när du vill slutföra ritningen."
  },
  "locator": {
    "addressText": "Adress:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Latitud/longitud",
    "invalidSearch": "Inga resultat hittades",
    "locatorPlaceholder": "Ange en adress att söka efter",
    "locationOutOfExtent": "Platsen ligger utanför inlämningsområdet",
    "searchButtonTooltip": "Sök",
    "clearButtonTooltip": "Rensa sökvärde"
  },
  "myIssues": {
    "title": "Mina bidrag",
    "myIssuesTooltip": "Mina bidrag",
    "noResultsFound": "Inga bidrag hittades"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "Jag godkänner",
    "commentButtonLabel": "",
    "commentButtonTooltip": "Lämna ett svar",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Se bifogade dokument",
    "mapButtonLabel": "Visa på kartan",
    "mapButtonTooltip": "Visa platsen för detta bidrag",
    "commentsListHeading": "Kommentarer",
    "unableToUpdateVoteField": "Det går inte att räkna din röst just nu.",
    "gotoIssueListTooltip": "Visa listan över bidrag",
    "deleteMessage": "Vill du ta bort?"
  },
  "itemList": {
    "likesForThisItemTooltip": "Antal röster",
    "loadMoreButtonText": "Läs in mer ..."
  },
  "comment": {
    "commentsFormHeading": "Kommentar",
    "commentsFormSubmitButton": "Skicka en kommentar",
    "commentsFormEditButton": "Uppdatera kommentar",
    "commentsFormCancelButton": "Avbryt",
    "errorInSubmittingComment": "Det gick inte att skicka kommentaren.",
    "emptyCommentMessage": "Ange en kommentar.",
    "placeHolderText": "Skriv en kommentar",
    "noCommentsAvailableText": "Inga kommentarer tillgängliga",
    "remainingTextCount": "${0} tecken återstår",
    "showNoText": "Nej",
    "selectAttachments": "Bilagor",
    "selectFileText": "Bläddra",
    "attachmentSelectedMsg": "bilagor markerade",
    "attachmentHeaderText": "Bilagor",
    "unknownCommentAttachment": "ARKIV",
    "editRecordText": "Redigera",
    "deleteRecordText": "Ta bort",
    "deleteCommentFailedMessage": "Det gick inte att ta bort kommentaren"
  },
  "gallery": {
    "galleryHeaderText": "Galleri",
    "noAttachmentsAvailableText": "Inga bilagor hittades"
  }
});