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
    "error": "Nevar izveidot karti",
    "licenseError": {
      "message": "Jūsu kontam nav licences, lai izmantotu konfigurējamās lietotnes, kas nav publiskas. Pieprasiet savas organizācijas administratoram piešķirt jums lietotāja veidu, kurā iekļauts lietotņu komplekts Essential Apps vai papildinājumlietotņu Essential Apps licence.",
      "title": "Nav licences"
    },
    "zoomInTooltip": "Pietuvināt",
    "zoomOutTooltip": "Attālināt",
    "geolocationTooltip": "Pašreizējais novietojums"
  },
  "main": {
    "noGroup": "Nav konfigurētas grupas",
    "submitReportButtonText": "Iesniegt pārskatu",
    "gotoListViewTooltip": "Saraksta skats",
    "noFeatureGeomtery": "Elementu nevar parādīt",
    "featureOutsideAOIMessage": "Elements nevar tikt pievienots ārpus pētāmās teritorijas",
    "noEditingPermissionsMessage": "Jums nav atļaujas izpildīt šo darbību.",
    "basemapGalleryText": "Pamatkaršu galerija",
    "basemapThumbnailAltText": "Noklikšķiniet, lai ielādētu ${basemapTitle} ${index} no ${totalBasemaps}",
    "legendText": "Apzīmējumi",
    "featureNotFoundMessage": "Pieprasītais elements nav atrasts",
    "backButton": "atpakaļ",
    "panelCloseButton": "Aizvērt"
  },
  "signin": {
    "guestSigninText": "Turpināt kā viesim",
    "signInOrText": "Vai",
    "signinOptionsText": "Pieteikties ar:",
    "noGroupNameText": "Lūdzu, pierakstieties",
    "guestLoginTooltip": "Pieteikties kā viesim",
    "facebookLoginTooltip": "Pieteikties ar Facebook",
    "twitterLoginTooltip": "Pieteikties ar Twitter",
    "googlePlusLoginTooltip": "Pieteikties ar Google+",
    "agolLoginTooltip": "Pieteikties ar ArcGIS"
  },
  "webMapList": {
    "owner": "Īpašnieks",
    "created": "Izveides datums",
    "modified": "Modificēšanas datums",
    "description": "Apraksts",
    "snippet": "Kopsavilkums",
    "licenseInfo": "Piekļuves un izmantošanas ierobežojumi",
    "accessInformation": "Kredīti",
    "tags": "Atslēgas vārdi",
    "numViews": "Skatījumu skaits",
    "avgRating": "Vērtējums",
    "noWebMapInGroup": "Konfigurētā grupa nav derīga vai ar šo grupu vēl nav kopīgots neviens elements.",
    "infoBtnToolTip": "Kartes informācija"
  },
  "issueWall": {
    "noResultsFound": "Nav atrasts neviens elements",
    "noResultsFoundInCurrentBuffer": "Jūsu tuvumā nav atrasts neviens elements",
    "unableToFetchFeatureError": "Nevar pabeigt darbību",
    "gotoWebmapListTooltip": "Doties uz galveno sarakstu",
    "gotoMapViewTooltip": "Kartes skats"
  },
  "appHeader": {
    "help": "Palīdzība",
    "myReport": "Mana iesniegtā informācija",
    "signIn": "Pierakstīties",
    "signOut": "Izrakstīties",
    "signInTooltip": "Pierakstīties",
    "signOutTooltip": "Izrakstīties",
    "myReportTooltip": "Skatīt manis iesniegto informāciju",
    "share": "Kopīgošana",
    "shareDialogTitle": "Koplietot dialoglodziņu",
    "shareDialogAppURLLabel": "Lietotnes URL",
    "mobileHamburger": "Hamburgers"
  },
  "geoform": {
    "enterInformation": "Detaļas",
    "selectAttachments": "Pielikumi",
    "selectFileText": "Pārlūks",
    "enterLocation": "Novietojums",
    "reportItButton": "Ziņot par to",
    "editReportButton": "Atjaunināt",
    "cancelButton": "Atcelt",
    "requiredField": "(nepieciešams)",
    "selectDefaultText": "Izvēlēties&hellip;",
    "invalidInputValue": "Lūdzu, ievadiet derīgu vērtību.",
    "noFieldsConfiguredMessage": "Slāņa lauki nav konfigurēti datu tveršanai",
    "invalidSmallNumber": "Lūdzu ievadiet veselu skaitli",
    "invalidNumber": "Lūdzu ievadiet veselu skaitli",
    "invalidFloat": "Lūdzu ievadiet numuru",
    "invalidDouble": "Lūdzu ievadiet numuru",
    "requiredFields": "Lūdzu nodrošiniet vērtības visiem obligātajiem laukiem",
    "selectLocation": "Lūdzu atlasiet vietu savam ziņojumam",
    "numericRangeHintMessage": "${openStrong}Norāde:${closeStrong} minimālā vērtība ${minValue} un maksimālā vērtība ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Norāde:${closeStrong} minimālais datums ${minValue} un maksimālais datums ${maxValue}",
    "errorsInApplyEdits": "Vērtības nevarēja iesniegt.",
    "attachmentSelectedMsg": "atlasītais(-ie) pielikums(-i)",
    "attachmentUploadStatus": "${failed} no ${total} pielikuma(-iem) neizdevās augšupielādēt",
    "geoLocationError": "Pašreizējais novietojums nav pieejams",
    "geoLocationOutOfExtent": "Pašreizējais novietojums ir ārpus pamatkartes pārklājuma",
    "submitButtonTooltip": "Iesniegt",
    "cancelButtonTooltip": "Atcelt",
    "geoformBackButtonTooltip": "Atgriezties sarakstā",
    "locationSelectionHintForPointLayer": "Pieskarieties kartei, lai zīmētu novietojumu.",
    "locationSelectionHintForPolygonLayer": "Pieskarieties kartei, lai zīmētu novietojumu. Pieskarieties divreiz, lai pabeigtu zīmējumu.",
    "locationSelectionHintForPointLayerDesktop": "Noklikšķiniet uz kartes, lai zīmētu novietojumu.",
    "locationSelectionHintForPolygonLayerDesktop": "Noklikšķiniet uz kartes, lai zīmētu novietojumu. Veiciet dubultklikšķi, lai pabeigtu zīmējumu.",
    "locationDialogTitle": "Izvēlieties vietu pārskatam",
    "locationDialogContent": "Vai tiešām vēlaties izmantot attēla atrašanās vietu?",
    "errorMessageText": "Ziņojums ${message} laukam ${fieldName}",
    "deleteAttachmentBtnText": "Dzēst pielikumu"
  },
  "locator": {
    "addressText": "Adrese:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Platums/Garums",
    "invalidSearch": "Rezultāti nav atrasti",
    "locatorPlaceholder": "Ievadiet adresi meklēšanai",
    "locationOutOfExtent": "Novietojums atrodas ārpus iesniegšanas teritorijas",
    "searchButtonTooltip": "Meklēšana",
    "clearButtonTooltip": "Notīrīt meklēšanas vērtību"
  },
  "myIssues": {
    "title": "Mana iesniegtā informācija",
    "myIssuesTooltip": "Mana iesniegtā informācija",
    "noResultsFound": "Iesniegtā informācija nav atrasta"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "Piekrītu",
    "commentButtonLabel": "",
    "commentButtonTooltip": "Atbildēt",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Skatīt pievienotos dokumentus",
    "mapButtonLabel": "Skatīt kartē",
    "mapButtonTooltip": "Skatīt šo iesniegto datu novietojumu",
    "commentsListHeading": "Komentāri",
    "unableToUpdateVoteField": "Jūsu balsojumu šobrīd nevar pievienot.",
    "gotoIssueListTooltip": "Skatīt iesniegtās informācijas sarakstu",
    "deleteMessage": "Vai tiešām vēlaties dzēst?"
  },
  "itemList": {
    "likesForThisItemTooltip": "Balsojumu skaits",
    "loadMoreButtonText": "Ielādēt vēl..."
  },
  "comment": {
    "commentsFormHeading": "Komentārs",
    "commentsFormSubmitButton": "Iesniegt komentāru",
    "commentsFormEditButton": "Atjaunināt komentāru",
    "commentsFormCancelButton": "Atcelt",
    "errorInSubmittingComment": "Komentāru nevarēja iesniegt.",
    "commentSubmittedMessage": "Paldies par jūsu atsauksmēm!",
    "emptyCommentMessage": "Lūdzu ievadiet komentāru.",
    "placeHolderText": "Ierakstiet komentāru",
    "noCommentsAvailableText": "Nav pieejamu komentāru",
    "remainingTextCount": "Palikusi(-šas) ${0} rakstzīme(-s)",
    "showNoText": "Nē",
    "selectAttachments": "Pielikumi",
    "selectFileText": "Pārlūkot",
    "attachmentSelectedMsg": "atlasītais(-ie) pielikums(-i)",
    "attachmentHeaderText": "Pielikumi",
    "unknownCommentAttachment": "FAILS",
    "editRecordText": "Rediģēt",
    "deleteRecordText": "Izdzēst",
    "deleteCommentFailedMessage": "Nevar izdzēst komentāru"
  },
  "gallery": {
    "galleryHeaderText": "Galerija",
    "noAttachmentsAvailableText": "Pielikumi nav atrasti"
  },
  "dialog": {
    "okButton": "Labi",
    "cancelButton": "Atcelt",
    "yesButton": "Jā",
    "noButton": "Nē"
  }
});
