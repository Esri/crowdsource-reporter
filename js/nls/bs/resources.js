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
    "error": "Nije moguće stvoriti kartu",
    "zoomInTooltip": "Povećaj",
    "zoomOutTooltip": "Smanji",
    "geolocationTooltip": "Trenutačna lokacija"
  },
  "main": {
    "noGroup": "Nema konfiguriranih grupa",
    "submitReportButtonText": "Podnesi izvješće",
    "gotoListViewTooltip": "Prikaz u popisu",
    "noFeatureGeomtery": "Geoobjekt se ne može prikazati",
    "featureOutsideAOIMessage": "Geoobjekt se ne može dodati izvan radnog područja",
    "noEditingPermissionsMessage": "Č_You do not have permission to perform this action________________ž."
  },
  "signin": {
    "guestSigninText": "Nastavi kao gost",
    "signInOrText": "ili",
    "signinOptionsText": "Prijava kao:",
    "noGroupNameText": "Prijavite se",
    "guestLoginTooltip": "Prijavite se kao gost",
    "facebookLoginTooltip": "Prijava preko Facebooka",
    "twitterLoginTooltip": "Prijava preko Twittera",
    "googlePlusLoginTooltip": "Prijava preko Google+",
    "agolLoginTooltip": "Prijavite se preko ArcGIS-a"
  },
  "webMapList": {
    "owner": "Vlasnik",
    "created": "Datum izrade",
    "modified": "Datum izmjene",
    "description": "Opis",
    "snippet": "Sažetak",
    "licenseInfo": "Ograničenja pristupa i upotrebe",
    "accessInformation": "Krediti",
    "tags": "Oznake",
    "numViews": "Broj prikaza",
    "avgRating": "Ocjena",
    "noWebMapInGroup": "Konfigurirana grupa nije valjana ili s grupom još nisu podijeljene stavke.",
    "infoBtnToolTip": "Informacije o karti"
  },
  "issueWall": {
    "noResultsFound": "Nema geoobjekata",
    "noResultsFoundInCurrentBuffer": "Nema geoobjekata u vašoj blizini",
    "unableToFetchFeatureError": "Nije moguće dovršiti radnju",
    "gotoWebmapListTooltip": "Idi na glavni popis",
    "gotoMapViewTooltip": "Prikaz karte"
  },
  "appHeader": {
    "myReport": "Č_My Submissions_____ž",
    "signIn": "Prijava",
    "signOut": "Odjava",
    "signInTooltip": "Prijava",
    "signOutTooltip": "Odjava",
    "myReportTooltip": "Č_View my submissions_______ž"
  },
  "geoform": {
    "enterInformation": "Pojedinosti",
    "selectAttachments": "Privitci",
    "selectFileText": "Pregledaj",
    "enterLocation": "Lokacija",
    "reportItButton": "Prijavi",
    "editReportButton": "Ažuriraj",
    "cancelButton": "Odustani",
    "requiredField": "(obavezno)",
    "selectDefaultText": "Odabir&hellip;",
    "invalidInputValue": "Unesite valjanu vrijednost.",
    "noFieldsConfiguredMessage": "Polja slojeva nisu konfigurirana za prikupljanje podataka",
    "invalidSmallNumber": "Unesite cijeli broj",
    "invalidNumber": "Unesite cijeli broj",
    "invalidFloat": "Unesite broj",
    "invalidDouble": "Unesite broj",
    "requiredFields": "Upišite vrijednosti za sva obavezna polja",
    "selectLocation": "Odaberite lokaciju za izvješće",
    "numericRangeHintMessage": "${openStrong}Podsjetnik:${closeStrong} minimalna vrijednost ${minValue} i maksimalna vrijednost ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Podsjetnik:${closeStrong} minimalni datum ${minValue} i maksimalni datum ${maxValue}",
    "errorsInApplyEdits": "Č_Values could not be submitted__________ž.",
    "attachmentSelectedMsg": "odabrani privitak(-ci)",
    "attachmentUploadStatus": "${failed} od ${total} privit(a)ka nije poslano",
    "geoLocationError": "Trenutačna lokacija nije dostupna",
    "geoLocationOutOfExtent": "Trenutačna lokacija izvan je obuhvata kartografske podloge",
    "submitButtonTooltip": "Pošalji",
    "cancelButtonTooltip": "Odustani",
    "geoformBackButtonTooltip": "Č_Return to the list______ž",
    "locationSelectionHintForPointLayer": "Č_Tap the map to draw the location___________ž.",
    "locationSelectionHintForPolygonLayer": "Č_Tap the map to draw the location. Double tap to complete the drawing______________________ž.",
    "locationSelectionHintForPointLayerDesktop": "Č_Click the map to draw the location____________ž.",
    "locationSelectionHintForPolygonLayerDesktop": "Č_Click the map to draw the location. Double click to complete the drawing_______________________ž."
  },
  "locator": {
    "addressText": "Adresa:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Geografska dužina/širina",
    "invalidSearch": "Nema rezultata",
    "locatorPlaceholder": "Unesite adresu za pretraživanje",
    "locationOutOfExtent": "Č_Location is outside the submission area_____________ž",
    "searchButtonTooltip": "Pretraži",
    "clearButtonTooltip": "Očisti vrijednost pretrage"
  },
  "myIssues": {
    "title": "Č_My Submissions_____ž",
    "myIssuesTooltip": "Č_My Submissions_____ž",
    "noResultsFound": "Č_No submissions found_______ž"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "Slažem se",
    "commentButtonLabel": "",
    "commentButtonTooltip": "Odgovori",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Vidi priložene dokumente",
    "mapButtonLabel": "Prikaži na karti",
    "mapButtonTooltip": "Č_View the location of this submission____________ž",
    "commentsListHeading": "Komentari",
    "unableToUpdateVoteField": "Vaš se glas trenutačno ne može pribrojiti.",
    "gotoIssueListTooltip": "Č_View the list of submissions_________ž",
    "deleteMessage": "Jeste li sigurni da želite izbrisati?"
  },
  "itemList": {
    "likesForThisItemTooltip": "Č_Number of votes______ž",
    "loadMoreButtonText": "Učitaj više..."
  },
  "comment": {
    "commentsFormHeading": "Komentiraj",
    "commentsFormSubmitButton": "Pošalji komentar",
    "commentsFormEditButton": "Ažuriraj komentar",
    "commentsFormCancelButton": "Odustani",
    "errorInSubmittingComment": "Nije moguće poslati komentar.",
    "emptyCommentMessage": "Unesite komentar.",
    "placeHolderText": "Upišite komentar",
    "noCommentsAvailableText": "Nema dostupnih komentara",
    "remainingTextCount": "preostalo ${0} znakova",
    "showNoText": "Ne",
    "selectAttachments": "Privici",
    "selectFileText": "Pregledaj",
    "attachmentSelectedMsg": "odabrano privitaka",
    "attachmentHeaderText": "Privici",
    "unknownCommentAttachment": "DATOTEKA",
    "editRecordText": "Uredi",
    "deleteRecordText": "Izbriši",
    "deleteCommentFailedMessage": "Nije moguće izbrisati komentar"
  },
  "gallery": {
    "galleryHeaderText": "Galerija",
    "noAttachmentsAvailableText": "Nema privitaka"
  }
});