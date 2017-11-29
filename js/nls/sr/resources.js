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
    "error": "Kreiranje mape nije moguće",
    "zoomInTooltip": "Uvećanje",
    "zoomOutTooltip": "Umanjenje",
    "geolocationTooltip": "Trenutna lokacija"
  },
  "main": {
    "noGroup": "Nijedna grupa nije konfigurisana",
    "submitReportButtonText": "Prosledi izveštaj",
    "gotoListViewTooltip": "Prikaz liste",
    "noFeatureGeomtery": "Funkcija ne može da bude prikazana",
    "featureOutsideAOIMessage": "Geoobjekat ne može da se doda izvan oblasti ispitivanja",
    "noEditingPermissionsMessage": "Nemate dozvolu za ovu radnju.",
    "basemapGalleryText": "Galerija pozadinskih mapa",
    "legendText": "Legenda"
  },
  "signin": {
    "guestSigninText": "Nastavite kao gost",
    "signInOrText": "ili",
    "signinOptionsText": "Prijavite se preko:",
    "noGroupNameText": "Prijavite se",
    "guestLoginTooltip": "Prijavite se kao gost",
    "facebookLoginTooltip": "Prijavite se putem Facebook naloga",
    "twitterLoginTooltip": "Prijavite se putem Twitter naloga",
    "googlePlusLoginTooltip": "Prijavite se putem Google+ naloga",
    "agolLoginTooltip": "Prijavite se putem ArcGIS naloga"
  },
  "webMapList": {
    "owner": "Vlasnik",
    "created": "Datum kreiranja",
    "modified": "Datum izmene",
    "description": "Opis",
    "snippet": "Rezime",
    "licenseInfo": "Ograničenja korišćenja i pristupa",
    "accessInformation": "Krediti",
    "tags": "Oznake",
    "numViews": "Broj prikaza",
    "avgRating": "Ocena",
    "noWebMapInGroup": "Konfigurisana grupa nije validna ili nijedna stavka još nije podeljena sa ovom grupom.",
    "infoBtnToolTip": "Informacije o mapi"
  },
  "issueWall": {
    "noResultsFound": "Nije pronađen nijedan geoobjekat",
    "noResultsFoundInCurrentBuffer": "Nije pronađen nijedan geoobjekat blizu vas",
    "unableToFetchFeatureError": "Završetak operacije nije moguć",
    "gotoWebmapListTooltip": "Idi na glavnu listu",
    "gotoMapViewTooltip": "Prikaz mape"
  },
  "appHeader": {
    "myReport": "Moje prosleđene stavke",
    "signIn": "Prijavite se",
    "signOut": "Odjavite se",
    "signInTooltip": "Prijavite se",
    "signOutTooltip": "Odjavite se",
    "myReportTooltip": "Prikaži moje prosleđene stavke"
  },
  "geoform": {
    "enterInformation": "Detalji",
    "selectAttachments": "Prilozi",
    "selectFileText": "Pregledanje",
    "enterLocation": "Lokacija",
    "reportItButton": "Prijavi",
    "editReportButton": "Ažuriraj",
    "cancelButton": "Otkaži",
    "requiredField": "(obavezno)",
    "selectDefaultText": "Izaberi&hellip;",
    "invalidInputValue": "Unesite validnu vrednost.",
    "noFieldsConfiguredMessage": "Polja sloja nisu konfigurisana da snimaju podatke",
    "invalidSmallNumber": "Unesite ceo broj",
    "invalidNumber": "Unesite ceo broj",
    "invalidFloat": "Unesite broj",
    "invalidDouble": "Unesite broj",
    "requiredFields": "Unesite vrednosti za sva obavezna polja",
    "selectLocation": "Izaberite lokaciju za izveštaj",
    "numericRangeHintMessage": "${openStrong}Podsetnik:${closeStrong} Minimalna vrednost ${minValue} i maksimalna vrednost ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Podsetnik:${closeStrong} Minimalna vrednost datuma ${minValue} i maksimalna vrednost datuma ${maxValue}",
    "errorsInApplyEdits": "Prosleđivanje vrednosti nije uspelo.",
    "attachmentSelectedMsg": "izabrani prilog/prilozi",
    "attachmentUploadStatus": "Nije uspelo otpremanje ${failed} od ${total} priloga",
    "geoLocationError": "Trenutna lokacija nije dostupna",
    "geoLocationOutOfExtent": "Trenutna lokacija je van obuhvata pozadinske mape",
    "submitButtonTooltip": "Prosledi",
    "cancelButtonTooltip": "Otkaži",
    "geoformBackButtonTooltip": "Povratak na listu",
    "locationSelectionHintForPointLayer": "Dodirnite mapu da nacrtate lokaciju.",
    "locationSelectionHintForPolygonLayer": "Dodirnite mapu da nacrtate lokaciju. Dodirnite dvaput da završite crtež.",
    "locationSelectionHintForPointLayerDesktop": "Kliknite na mapu da nacrtate lokaciju.",
    "locationSelectionHintForPolygonLayerDesktop": "Kliknite na mapu da nacrtate lokaciju. Kliknite dvaput da završite crtež."
  },
  "locator": {
    "addressText": "Adresa:",
    "usngText": "Nacionalna koordinatna mreža SAD (USNG)",
    "mgrsText": "Referentni sistem vojne pravougle koordinatne mreže (MGRS)",
    "latLongText": "Geografska širina/dužina",
    "invalidSearch": "Nema pronađenih rezultata",
    "locatorPlaceholder": "Unesite adresu za pretragu",
    "locationOutOfExtent": "Lokacija je van prosleđene oblasti",
    "searchButtonTooltip": "Pretraži",
    "clearButtonTooltip": "Izbriši vrednosti za pretragu"
  },
  "myIssues": {
    "title": "Moje prosleđene stavke",
    "myIssuesTooltip": "Moje prosleđene stavke",
    "noResultsFound": "Nije pronađena nijedna prosleđena stavka"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "Saglasan sam",
    "commentButtonLabel": "",
    "commentButtonTooltip": "Ostavite komentar",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Pogledaj priložena dokumenta",
    "mapButtonLabel": "Prikaži na mapi",
    "mapButtonTooltip": "Prikaži lokaciju ovog prosleđivanja",
    "commentsListHeading": "Komentari",
    "unableToUpdateVoteField": "Vaš glas ne može da bude uračunat ovoga puta.",
    "gotoIssueListTooltip": "Prikaži listu ovih prosleđivanja",
    "deleteMessage": "Želite li zaista da izbrišete?"
  },
  "itemList": {
    "likesForThisItemTooltip": "Broj glasova",
    "loadMoreButtonText": "Učitaj više..."
  },
  "comment": {
    "commentsFormHeading": "Komentar",
    "commentsFormSubmitButton": "Prosledi komentar",
    "commentsFormEditButton": "Ažuriraj komentar",
    "commentsFormCancelButton": "Otkaži",
    "errorInSubmittingComment": "Prosleđivanje komentara nije moguće.",
    "emptyCommentMessage": "Unesite komentar.",
    "placeHolderText": "Iskucajte komentar",
    "noCommentsAvailableText": "Nema dostupnih komentara",
    "remainingTextCount": "preostalo ${0} karaktera",
    "showNoText": "Ne",
    "selectAttachments": "Prilozi",
    "selectFileText": "Pregledaj",
    "attachmentSelectedMsg": "izabrani prilog/prilozi",
    "attachmentHeaderText": "Prilozi",
    "unknownCommentAttachment": "DATOTEKA",
    "editRecordText": "Izmeni",
    "deleteRecordText": "Izbriši",
    "deleteCommentFailedMessage": "Komentar nije moguće izbrisati"
  },
  "gallery": {
    "galleryHeaderText": "Galerija",
    "noAttachmentsAvailableText": "Prilozi nisu pronađeni"
  }
});