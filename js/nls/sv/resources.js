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
    "noFeatureGeomtery": "Geoobjektet kan inte visas"
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
    "myReport": "Mina rapporter",
    "signIn": "Logga in",
    "signOut": "Logga ut",
    "signInTooltip": "Logga in",
    "signOutTooltip": "Logga ut",
    "myReportTooltip": "Visa mina rapporter"
  },
  "geoform": {
    "enterInformation": "Detaljer",
    "selectAttachments": "Bilagor",
    "selectFileText": "Bläddra",
    "enterLocation": "Plats",
    "reportItButton": "Rapportera",
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
    "errorsInApplyEdits": "Det gick inte att skicka rapporten",
    "attachmentSelectedMsg": "bilagor markerade",
    "attachmentUploadStatus": "${failed} av ${total} bilagor kunde inte överföras",
    "geoLocationError": "Aktuell plats finns inte tillgänglig",
    "geoLocationOutOfExtent": "Aktuell plats är utanför baskartans utbredning",
    "submitButtonTooltip": "Skicka",
    "cancelButtonTooltip": "Avbryt",
    "geoformBackButtonTooltip": "Återgå till rapportlistan"
  },
  "locator": {
    "addressText": "Adress:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Latitud/longitud",
    "invalidSearch": "Inga resultat hittades",
    "locatorPlaceholder": "Ange en adress att söka efter",
    "locationOutOfExtent": "Den lokaliserade adressen är utanför baskartans utbredning",
    "searchButtonTooltip": "Sök",
    "clearButtonTooltip": "Rensa sökvärde"
  },
  "myIssues": {
    "title": "Mina rapporter",
    "myIssuesTooltip": "Mina rapporter",
    "noResultsFound": "Inga rapporter hittades"
  },
  "itemDetails": {
    "likeButtonLabel": "Rösta",
    "likeButtonTooltip": "Rösta för den här rapporten",
    "commentButtonLabel": "Kommentar",
    "commentButtonTooltip": "Kommentera den här rapporten",
    "galleryButtonLabel": "Galleri",
    "galleryButtonTooltip": "Se bifogade dokument",
    "mapButtonLabel": "Visa på kartan",
    "mapButtonTooltip": "Visa platsen för rapporten",
    "commentsListHeading": "Kommentarer",
    "unableToUpdateVoteField": "Det går inte att räkna din röst just nu.",
    "gotoIssueListTooltip": "Gå till rapportlistan"
  },
  "itemList": {
    "likesForThisItemTooltip": "Röster för den här rapporten",
    "loadMoreButtonText": "Läs in mer ..."
  },
  "comment": {
    "commentsFormSubmitButton": "Skicka en kommentar",
    "commentsFormCancelButton": "Avbryt",
    "errorInSubmittingComment": "Det gick inte att skicka kommentaren.",
    "emptyCommentMessage": "Ange en kommentar.",
    "placeHolderText": "Skriv en kommentar",
    "noCommentsAvailableText": "Inga kommentarer tillgängliga",
    "remainingTextCount": "${0} tecken återstår",
    "showNoText": "Nej"
  },
  "gallery": {
    "galleryHeaderText": "Galleri",
    "noAttachmentsAvailableText": "Inga bilagor hittades"
  }
});