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
    "noEditingPermissionsMessage": "Å_You do not have permission to perform this action________________ö."
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
    "myReport": "Å_My Submissions_____ö",
    "signIn": "Logga in",
    "signOut": "Logga ut",
    "signInTooltip": "Logga in",
    "signOutTooltip": "Logga ut",
    "myReportTooltip": "Å_View my submissions_______ö"
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
    "errorsInApplyEdits": "Å_Values could not be submitted__________ö.",
    "attachmentSelectedMsg": "bilagor markerade",
    "attachmentUploadStatus": "${failed} av ${total} bilagor kunde inte överföras",
    "geoLocationError": "Aktuell plats finns inte tillgänglig",
    "geoLocationOutOfExtent": "Aktuell plats är utanför baskartans utbredning",
    "submitButtonTooltip": "Skicka",
    "cancelButtonTooltip": "Avbryt",
    "geoformBackButtonTooltip": "Å_Return to the list______ö",
    "locationSelectionHintForPointLayer": "Å_Tap the map to draw the location___________ö.",
    "locationSelectionHintForPolygonLayer": "Å_Tap the map to draw the location. Double tap to complete the drawing______________________ö.",
    "locationSelectionHintForPointLayerDesktop": "Å_Click the map to draw the location____________ö.",
    "locationSelectionHintForPolygonLayerDesktop": "Å_Click the map to draw the location. Double click to complete the drawing_______________________ö."
  },
  "locator": {
    "addressText": "Adress:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Latitud/longitud",
    "invalidSearch": "Inga resultat hittades",
    "locatorPlaceholder": "Ange en adress att söka efter",
    "locationOutOfExtent": "Å_Location is outside the submission area_____________ö",
    "searchButtonTooltip": "Sök",
    "clearButtonTooltip": "Rensa sökvärde"
  },
  "myIssues": {
    "title": "Å_My Submissions_____ö",
    "myIssuesTooltip": "Å_My Submissions_____ö",
    "noResultsFound": "Å_No submissions found_______ö"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "Jag godkänner",
    "commentButtonLabel": "",
    "commentButtonTooltip": "Lämna ett svar",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Se bifogade dokument",
    "mapButtonLabel": "Visa på kartan",
    "mapButtonTooltip": "Å_View the location of this submission____________ö",
    "commentsListHeading": "Kommentarer",
    "unableToUpdateVoteField": "Det går inte att räkna din röst just nu.",
    "gotoIssueListTooltip": "Å_View the list of submissions_________ö",
    "deleteMessage": "Vill du ta bort?"
  },
  "itemList": {
    "likesForThisItemTooltip": "Å_Number of votes______ö",
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