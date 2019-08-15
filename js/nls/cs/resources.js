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
    "error": "Nelze vytvořit mapu",
    "licenseError": {
      "message": "Váš účet nevlastní licenci k používání konfigurovatelných aplikací, které nejsou veřejné. Požádejte prosím správce své organizace, aby vám přidělil typ uživatele, jehož součástí jsou základní aplikace nebo doplňková licence základních aplikací.",
      "title": "Chybí licence"
    },
    "zoomInTooltip": "Přiblížit",
    "zoomOutTooltip": "Oddálit",
    "geolocationTooltip": "Aktuální poloha"
  },
  "main": {
    "noGroup": "Není nakonfigurována žádná skupina",
    "submitReportButtonText": "Odeslat zprávu",
    "gotoListViewTooltip": "Zobrazení seznamu",
    "noFeatureGeomtery": "Prvek nelze zobrazit.",
    "featureOutsideAOIMessage": "Prvek nelze přidat mimo zájmovou oblast.",
    "noEditingPermissionsMessage": "Nemáte oprávnění k provedení této akce.",
    "basemapGalleryText": "Galerie podkladových map",
    "basemapThumbnailAltText": "Klikněte pro nahrání ${basemapTitle} ${index} z ${totalBasemaps}",
    "legendText": "Legenda",
    "featureNotFoundMessage": "Požadovaný prvek nebyl nalezen.",
    "backButton": "zpět",
    "panelCloseButton": "Zavřít"
  },
  "signin": {
    "guestSigninText": "Pokračovat jako host",
    "signInOrText": "Nebo",
    "signinOptionsText": "Přihlásit se pomocí:",
    "noGroupNameText": "Prosím přihlaste se",
    "guestLoginTooltip": "Přihlásit se jako host",
    "facebookLoginTooltip": "Přihlásit se pomocí Facebooku",
    "twitterLoginTooltip": "Přihlásit se pomocí Twitteru",
    "googlePlusLoginTooltip": "Přihlásit se pomocí Google+",
    "agolLoginTooltip": "Přihlásit se pomocí systému ArcGIS"
  },
  "webMapList": {
    "owner": "Vlastník",
    "created": "Datum vytvoření",
    "modified": "Datum změny",
    "description": "Popis",
    "snippet": "Souhrn",
    "licenseInfo": "Přístup a omezení použití",
    "accessInformation": "Poděkování",
    "tags": "Klíčová slova",
    "numViews": "Počet zobrazení",
    "avgRating": "Hodnocení",
    "noWebMapInGroup": "Nakonfigurovaná skupina je neplatné, případně s touto skupinou ještě nebyly sdíleny žádné položky.",
    "infoBtnToolTip": "Informace o mapě"
  },
  "issueWall": {
    "noResultsFound": "Nebyly nalezeny žádné prvky.",
    "noResultsFoundInCurrentBuffer": "Ve vaší blízkosti nebyly nalezeny žádné prvky",
    "unableToFetchFeatureError": "Nepodařilo se dokončit operaci",
    "gotoWebmapListTooltip": "Jít na hlavní seznam",
    "gotoMapViewTooltip": "Zobrazení mapy"
  },
  "appHeader": {
    "help": "Nápověda",
    "myReport": "Moje příspěvky",
    "signIn": "Přihlásit",
    "signOut": "Odhlásit",
    "signInTooltip": "Přihlásit se",
    "signOutTooltip": "Odhlásit se",
    "myReportTooltip": "Zobrazit moje příspěvky",
    "share": "Sdílet",
    "shareDialogTitle": "Dialogové okno sdílení",
    "shareDialogAppURLLabel": "URL aplikace",
    "mobileHamburger": "Hamburger"
  },
  "geoform": {
    "enterInformation": "Podrobnosti",
    "selectAttachments": "Přílohy",
    "selectFileText": "Procházet",
    "enterLocation": "Poloha",
    "reportItButton": "Vytvořit zprávu",
    "editReportButton": "Aktualizovat",
    "cancelButton": "Storno",
    "requiredField": "(vyžadováno)",
    "selectDefaultText": "Výběr&hellip;",
    "invalidInputValue": "Zadejte platnou hodnotu.",
    "noFieldsConfiguredMessage": "Pole vrstvy nejsou nakonfigurovány pro sbírání dat.",
    "invalidSmallNumber": "Zadejte celé číslo.",
    "invalidNumber": "Zadejte celé číslo.",
    "invalidFloat": "Zadejte číslo.",
    "invalidDouble": "Zadejte číslo.",
    "requiredFields": "Zadejte hodnoty do všech vyžadovaných polí.",
    "selectLocation": "Vyberte umístění hlášení.",
    "numericRangeHintMessage": "${openStrong}Nápověda:${closeStrong} Minimální hodnota ${minValue} a Maximální hodnota ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Nápověda:${closeStrong} Minimální datum ${minValue} a Maximální datum ${maxValue}",
    "errorsInApplyEdits": "Hodnoty se nepodařilo odeslat.",
    "attachmentSelectedMsg": "příloh vybráno",
    "attachmentUploadStatus": "nepodařilo se nahrát ${failed} z ${total} příloh",
    "geoLocationError": "Současné umístění není k dispozici",
    "geoLocationOutOfExtent": "Aktuální umístění se nachází mimo rozsah podkladové mapy.",
    "submitButtonTooltip": "Odeslat",
    "cancelButtonTooltip": "Storno",
    "geoformBackButtonTooltip": "Vrátit se do seznamu",
    "locationSelectionHintForPointLayer": "Nakreslete umístění poklepáním na mapu.",
    "locationSelectionHintForPolygonLayer": "Zadejte první bod poklepáním na mapu. Dvojitým kliknutím kreslení dokončíte.",
    "locationSelectionHintForPointLayerDesktop": "Zadejte první bod poklepáním na mapu.",
    "locationSelectionHintForPolygonLayerDesktop": "Zadejte první bod poklepáním na mapu. Dvojitým kliknutím kreslení dokončíte.",
    "locationDialogTitle": "Vyberte umístění zprávy",
    "locationDialogContent": "Opravdu chcete použít umístění snímku?",
    "errorMessageText": "${message} pro pole ${fieldName}",
    "deleteAttachmentBtnText": "Smazat přílohu"
  },
  "locator": {
    "addressText": "Adresa:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "zeměpisné šířky/délky",
    "invalidSearch": "Nebyly nalezeny žádné výsledky.",
    "locatorPlaceholder": "Zadejte adresu pro hledání",
    "locationOutOfExtent": "Umístění se nachází mimo oblast příspěvku.",
    "searchButtonTooltip": "Hledat",
    "clearButtonTooltip": "Vymazat hodnotu vyhledávání"
  },
  "myIssues": {
    "title": "Moje příspěvky",
    "myIssuesTooltip": "Moje příspěvky",
    "noResultsFound": "Nebyly nalezeny žádné příspěvky."
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "Souhlasím",
    "commentButtonLabel": "",
    "commentButtonTooltip": "Napsat odpověď",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Zobrazit připojené dokumenty",
    "mapButtonLabel": "Zobrazit na mapě",
    "mapButtonTooltip": "Zobrazit umístění tohoto příspěvku.",
    "commentsListHeading": "Komentáře",
    "unableToUpdateVoteField": "Váš hlas v tuto chvíli nelze započítat.",
    "gotoIssueListTooltip": "Zobrazit seznam příspěvků",
    "deleteMessage": "Určitě odstranit?"
  },
  "itemList": {
    "likesForThisItemTooltip": "Počet hlasů",
    "loadMoreButtonText": "Načíst další..."
  },
  "comment": {
    "commentsFormHeading": "Komentář",
    "commentsFormSubmitButton": "Odeslat komentář",
    "commentsFormEditButton": "Aktualizovat komentář",
    "commentsFormCancelButton": "Storno",
    "errorInSubmittingComment": "Komentář se nepodařilo odeslat.",
    "commentSubmittedMessage": "Děkujeme, že jste se podělili o své názory.",
    "emptyCommentMessage": "Zadejte komentář.",
    "placeHolderText": "Napište komentář",
    "noCommentsAvailableText": "Nejsou k dispozici žádné komentáře.",
    "remainingTextCount": "Počet zbývajících znaků: ${0}",
    "showNoText": "Ne",
    "selectAttachments": "Přílohy",
    "selectFileText": "Procházet",
    "attachmentSelectedMsg": "příloh vybráno",
    "attachmentHeaderText": "Přílohy",
    "unknownCommentAttachment": "SOUBOR",
    "editRecordText": "Upravit",
    "deleteRecordText": "Smazat",
    "deleteCommentFailedMessage": "Komentář nelze odstranit"
  },
  "gallery": {
    "galleryHeaderText": "Galerie",
    "noAttachmentsAvailableText": "Nebyly nalezeny žádné přílohy"
  },
  "dialog": {
    "okButton": "OK",
    "cancelButton": "Storno",
    "yesButton": "Ano",
    "noButton": "Ne"
  }
});
