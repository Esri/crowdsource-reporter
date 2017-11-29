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
    "error": "Žemėlapio sukurti nepavyko",
    "zoomInTooltip": "Artinti",
    "zoomOutTooltip": "Tolinti",
    "geolocationTooltip": "Esama padėtis"
  },
  "main": {
    "noGroup": "Sukonfigūruotų grupių nėra",
    "submitReportButtonText": "Pateikti ataskaitą",
    "gotoListViewTooltip": "Sąrašo vaizdas",
    "noFeatureGeomtery": "Elemento parodyti negalima",
    "featureOutsideAOIMessage": "Elemento negalima pridėti už regiono ribų",
    "noEditingPermissionsMessage": "Neturite leidimo atlikti šį veiksmą.",
    "basemapGalleryText": "Pagrindo žemėlapiai",
    "legendText": "Legenda"
  },
  "signin": {
    "guestSigninText": "Tęsti svečio teisėmis",
    "signInOrText": "Arba",
    "signinOptionsText": "Prisijungti naudojant",
    "noGroupNameText": "Prisijunkite",
    "guestLoginTooltip": "Prisijungti svečio teisėmis",
    "facebookLoginTooltip": "Prisijungti naudojant Facebook",
    "twitterLoginTooltip": "Prisijungti naudojant Twitter",
    "googlePlusLoginTooltip": "Prisijungti naudojant Google+",
    "agolLoginTooltip": "Prisijungti naudojant ArcGIS"
  },
  "webMapList": {
    "owner": "Savininkas",
    "created": "Sukūrimo data",
    "modified": "Paskutinis pakeitimas",
    "description": "Aprašas",
    "snippet": "Santrauka",
    "licenseInfo": "Prieigos ir naudojimo apribojimai",
    "accessInformation": "Autoriai",
    "tags": "Raktažodžiai",
    "numViews": "Peržiūrų skaičius",
    "avgRating": "Vertinimas",
    "noWebMapInGroup": "Sukonfigūruota grupė neteisinga arba šioje grupėje nebendrinamas nė vienas elementas.",
    "infoBtnToolTip": "Žemėlapio informacija"
  },
  "issueWall": {
    "noResultsFound": "Elementų nerasta",
    "noResultsFoundInCurrentBuffer": "Šalia jūsų objektų nerasta",
    "unableToFetchFeatureError": "Nepavyko įvykdyti operacijos",
    "gotoWebmapListTooltip": "Eiti į pagrindinį sąrašą",
    "gotoMapViewTooltip": "Žemėlapio vaizdas"
  },
  "appHeader": {
    "myReport": "Mano pateiktys",
    "signIn": "Prisijungti",
    "signOut": "Atsijungti",
    "signInTooltip": "Prisijunkite",
    "signOutTooltip": "Atsijungti",
    "myReportTooltip": "Peržiūrėti mano pateiktis"
  },
  "geoform": {
    "enterInformation": "Išsamiau",
    "selectAttachments": "Priedai",
    "selectFileText": "Parinkti",
    "enterLocation": "Vieta",
    "reportItButton": "Pranešti apie tai",
    "editReportButton": "Atnaujinti",
    "cancelButton": "Atšaukti",
    "requiredField": "(privalomas)",
    "selectDefaultText": "Pasirinkti&hellip;",
    "invalidInputValue": "Įveskite leistiną reikšmę.",
    "noFieldsConfiguredMessage": "Sluoksnio laukai nesukonfigūruoti kaupti duomenis",
    "invalidSmallNumber": "Įveskite sveikąjį skaičių",
    "invalidNumber": "Įveskite sveikąjį skaičių",
    "invalidFloat": "Įveskite skaičių",
    "invalidDouble": "Įveskite skaičių",
    "requiredFields": "Pateikite reikšmes visuose būtinuose laukuose",
    "selectLocation": "Nurodykite ataskaitos vietą",
    "numericRangeHintMessage": "${openStrong}Užuomina:${closeStrong} minimali vertė ${minValue} ir maksimali vertė ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Užuomina:${closeStrong} minimali data ${minValue} ir maksimali data ${maxValue}",
    "errorsInApplyEdits": "Reikšmių pateikti nepavyko.",
    "attachmentSelectedMsg": "pasirinktas (-i) priedas (-ai)",
    "attachmentUploadStatus": "Nepavyko įkelti ${failed} iš ${total} priedo (-ų)",
    "geoLocationError": "Informacijos apie esamą vietą nėra",
    "geoLocationOutOfExtent": "Dabartinė vieta yra už pagrindo žemėlapio ribų",
    "submitButtonTooltip": "Pateikti",
    "cancelButtonTooltip": "Atšaukti",
    "geoformBackButtonTooltip": "Grįžti į sąrašą",
    "locationSelectionHintForPointLayer": "Bakstelėkite žemėlapį, norėdami apibrėžti teritoriją.",
    "locationSelectionHintForPolygonLayer": "Bakstelėkite žemėlapį, norėdami apibrėžti teritoriją. Norėdami baigti braižyti, bakstelėkite du kartus.",
    "locationSelectionHintForPointLayerDesktop": "Spustelėkite žemėlapį, norėdami apibrėžti teritoriją.",
    "locationSelectionHintForPolygonLayerDesktop": "Spustelėkite žemėlapį, norėdami apibrėžti teritoriją. Norėdami baigti braižyti, spustelėkite du kartus."
  },
  "locator": {
    "addressText": "Adresas:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Platuma/Ilguma",
    "invalidSearch": "Nieko nerasta",
    "locatorPlaceholder": "Įveskite ieškotiną adresą",
    "locationOutOfExtent": "Teritorija yra už pateikties srities ribų",
    "searchButtonTooltip": "Ieškoti",
    "clearButtonTooltip": "Išvalyti paieškos reikšmę"
  },
  "myIssues": {
    "title": "Mano pateiktys",
    "myIssuesTooltip": "Mano pateiktys",
    "noResultsFound": "Pateikčių nerasta"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "Sutinku",
    "commentButtonLabel": "",
    "commentButtonTooltip": "Palikti atsiliepimą",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Žr. pridėtus dokumentus",
    "mapButtonLabel": "Žiūrėti žemėlapyje",
    "mapButtonTooltip": "Peržiūrėti šios pateikties teritoriją",
    "commentsListHeading": "Komentarai",
    "unableToUpdateVoteField": "Šiuo metu jūsų balso įskaičiuoti negalima.",
    "gotoIssueListTooltip": "Peržiūrėti pateikčių sąrašą",
    "deleteMessage": "Ar tikrai norite ištrinti?"
  },
  "itemList": {
    "likesForThisItemTooltip": "Balsų skaičius",
    "loadMoreButtonText": "Įkelti daugiau..."
  },
  "comment": {
    "commentsFormHeading": "Komentuoti",
    "commentsFormSubmitButton": "Pateikti komentarą",
    "commentsFormEditButton": "Atnaujinti komentarą",
    "commentsFormCancelButton": "Atšaukti",
    "errorInSubmittingComment": "Komentaro pateikti nepavyko.",
    "emptyCommentMessage": "Įveskite komentarą.",
    "placeHolderText": "Įvesti komentarą",
    "noCommentsAvailableText": "Komentarų nėra",
    "remainingTextCount": "liko simbolių: ${0}",
    "showNoText": "Ne",
    "selectAttachments": "Priedai",
    "selectFileText": "Parinkti",
    "attachmentSelectedMsg": "pasirinktas (-i) priedas (-ai)",
    "attachmentHeaderText": "Priedai",
    "unknownCommentAttachment": "FAILAS",
    "editRecordText": "Redaguoti",
    "deleteRecordText": "Ištrinti",
    "deleteCommentFailedMessage": "Komentaro ištrinti nepavyko"
  },
  "gallery": {
    "galleryHeaderText": "Galerija",
    "noAttachmentsAvailableText": "Priedų nėra"
  }
});