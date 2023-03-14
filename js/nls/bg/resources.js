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
    "error": "Не може да се създаде карта",
    "licenseError": {
      "message": "Вашият акаунт не е лицензиран да използва Configurable Apps, които не са публични. Помолете администратора на Вашата организация да Ви направи тип потребител, който включва Основни приложения или допълнителен лиценз за Основни приложения.",
      "title": "Не е лицензиран"
    },
    "warningMessageTitle": "Ограничена поддръжка на браузър",
    "warningMessageAGOL": "Използвате остарял браузър. Някои части на това приложение може да не работят оптимално или изобщо да не работят с този браузър. Поддръжката на този браузър ще бъде преустановена в бъдеще. </br></br>Използвайте последните версии на<chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link> или<edge-link>Microsoft Edge</edge-link>.</br></br>За повече информация относно поддръжката на браузъра вижте нашата документация. Напишете ни Вашия отзив през <feedback-link>GeoNet, Esri Community</feedback-link>.",
    "warningMessageEnterprise": "Използвате браузър, който вече не се поддържа. Някои части на това приложение може да не работят оптимално или изобщо да не работят с този браузър.</br></br>Използвайте последните версии на <chrome-link>Google Chrome</chrome-link>, <firefox-link>Mozilla Firefox</firefox-link>, <safari-link>Apple Safari</safari-link> или<edge-link>Microsoft Edge</edge-link>.",
    "zoomInTooltip": "Приближаване",
    "zoomOutTooltip": "Отдалечаване",
    "geolocationTooltip": "Текущо местоположение"
  },
  "main": {
    "noGroup": "Няма конфигурирана група",
    "submitReportButtonText": "Изпращане на Отчет",
    "gotoListViewTooltip": "Изглед на списък",
    "noFeatureGeomtery": "Обектът не може да се покаже",
    "featureOutsideAOIMessage": "Обектът не може да бъде добавен извън областта на изследване",
    "noEditingPermissionsMessage": "Нямате разрешение да извършите това действие.",
    "basemapGalleryText": "Галерия с базови карти",
    "basemapThumbnailAltText": "Натиснете, за да заредите ${basemapTitle} ${index} от${totalBasemaps}",
    "legendText": "Легенда",
    "featureNotFoundMessage": "Исканият обект не е намерен",
    "backButton": "назад",
    "panelCloseButton": "Затваряне"
  },
  "signin": {
    "guestSigninText": "Продължете като Гост",
    "signInOrText": "Или",
    "signinOptionsText": "Вписване чрез:",
    "noGroupNameText": "Моля, влезте",
    "guestLoginTooltip": "Вписване като гост",
    "facebookLoginTooltip": "Вписване чрез Facebook",
    "twitterLoginTooltip": "Вписване чрез Twitter",
    "googlePlusLoginTooltip": "Вписване чрез Google+",
    "agolLoginTooltip": "Вписване чрез ArcGIS"
  },
  "webMapList": {
    "owner": "Собственик",
    "created": "Дата на създаване",
    "modified": "Дата на промяна",
    "description": "Описание",
    "snippet": "Обобщение",
    "licenseInfo": "Достъп до и използване на ограничения",
    "accessInformation": "Кредити",
    "tags": "Тагове",
    "numViews": "Брой гледания",
    "avgRating": "Оценка",
    "noWebMapInGroup": "Конфигурираната група е невалидна или все още не са споделени елементи с тази група.",
    "infoBtnToolTip": "Информация за карта"
  },
  "issueWall": {
    "noResultsFound": "Няма намерени обекти",
    "noResultsFoundInCurrentBuffer": "Няма намерени обекти близо до вас",
    "unableToFetchFeatureError": "Операцията не може да се завърши",
    "gotoWebmapListTooltip": "Към основния списък",
    "gotoMapViewTooltip": "Изглед на карта"
  },
  "appHeader": {
    "help": "Помощ",
    "myReport": "Моите подавания",
    "signIn": "Вписване",
    "signOut": "Отписване",
    "signInTooltip": "Вписване",
    "signOutTooltip": "Отписване",
    "myReportTooltip": "Преглед на моите подавания",
    "share": "Споделяне",
    "shareDialogTitle": "Споделяне на Диалогово поле",
    "shareDialogAppURLLabel": "URL адрес на приложението",
    "mobileHamburger": "Хамбургер"
  },
  "geoform": {
    "enterInformation": "Подробни данни",
    "selectAttachments": "Прикачени файлове",
    "selectFileText": "Зареждане",
    "enterLocation": "Местоположение",
    "reportItButton": "Докладвайте за това",
    "editReportButton": "Обновяване",
    "cancelButton": "Отказ",
    "requiredField": "(задължително)",
    "selectDefaultText": "Избор",
    "invalidInputValue": "Моля, въведете валидна стойност.",
    "noFieldsConfiguredMessage": "Полетата на слоевете не са конфигурирани за прихващане на данни",
    "invalidSmallNumber": "Моля, въведете цяло число",
    "invalidNumber": "Моля, въведете цяло число",
    "invalidFloat": "Моля, въведете число",
    "invalidDouble": "Моля, въведете число",
    "requiredFields": "Моля, посочете стойности за всички задължителни полета",
    "selectLocation": "Моля, изберете местоположението за отчета",
    "numericRangeHintMessage": "${openStrong}Съвет:${closeStrong} Минимална стойност ${minValue} и Максимална стойност ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Съвет:${closeStrong} Минимална дата ${minValue} и Максимална дата ${maxValue}",
    "errorsInApplyEdits": "Стойностите не могат да бъдат изпратени.",
    "attachmentSelectedMsg": "избран(и) прикачен файл(ове)",
    "attachmentUploadStatus": "Неуспешно качване на ${failed} от ${total} прикачен(и) файл(а)",
    "geoLocationError": "Текущото местоположение не е налично",
    "geoLocationOutOfExtent": "Текущото местоположение е извън обхвата на базовата карта",
    "submitButtonTooltip": "Изпращане",
    "cancelButtonTooltip": "Отказ",
    "geoformBackButtonTooltip": "Връщане към списъка",
    "locationSelectionHintForPointLayer": "Докоснете картата, за да начертаете местоположението.",
    "locationSelectionHintForPolygonLayer": "Докоснете картата, за да начертаете местоположението. Докоснете два пъти, за да изпълните чертежа.",
    "locationSelectionHintForPointLayerDesktop": "Натиснете върху картата, за да начертаете местоположението.",
    "locationSelectionHintForPolygonLayerDesktop": "Натиснете върху картата, за да начертаете местоположението. Натиснете два пъти, за да изпълните чертежа.",
    "locationDialogTitle": "Изберете местоположение за отчета",
    "locationDialogContent": "Наистина ли искате да използвате местоположението на изображението?",
    "errorMessageText": "${message} за поле${fieldName}",
    "deleteAttachmentBtnText": "Изтриване на прикачен файл"
  },
  "locator": {
    "addressText": "Адрес:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Географска ширина/Географска дължина",
    "invalidSearch": "Няма намерени резултати",
    "locatorPlaceholder": "Въведете адрес за търсене",
    "locationOutOfExtent": "Местоположението е извън зоната за подаване",
    "searchButtonTooltip": "Търсене",
    "clearButtonTooltip": "Изчистване на стойността на търсенето"
  },
  "myIssues": {
    "title": "Моите подавания",
    "myIssuesTooltip": "Моите подавания",
    "noResultsFound": "Не са намерени подавания"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "Приемам",
    "commentButtonLabel": "",
    "commentButtonTooltip": "Оставете отговор",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Вижте приложените документи",
    "mapButtonLabel": "Преглед на карта",
    "mapButtonTooltip": "Преглед на местоположението на това подаване",
    "commentsListHeading": "Коментари",
    "unableToUpdateVoteField": "В момента вашият глас не може да се преброи.",
    "gotoIssueListTooltip": "Преглед на списъка с подавания",
    "deleteMessage": "Сигурни ли сте, че искате да го изтриете?"
  },
  "itemList": {
    "likesForThisItemTooltip": "Брой гласове",
    "loadMoreButtonText": "Зареждане на още..."
  },
  "comment": {
    "commentsFormHeading": "Коментар",
    "commentsFormSubmitButton": "Подаване на Коментар",
    "commentsFormEditButton": "Актуализиране на Коментар",
    "commentsFormCancelButton": "Отказ",
    "errorInSubmittingComment": "Коментарът не може да бъде изпратен.",
    "commentSubmittedMessage": "Благодарим за обратната връзка.",
    "emptyCommentMessage": "Моля, въведете коментар.",
    "placeHolderText": "Въведете коментар",
    "noCommentsAvailableText": "Не са налични коментари",
    "remainingTextCount": "остава(т) ${0} символ(а)",
    "showNoText": "Не",
    "selectAttachments": "Прикачени файлове",
    "selectFileText": "Зареждане",
    "attachmentSelectedMsg": "избран(и) прикачен файл(ове)",
    "attachmentHeaderText": "Прикачени файлове",
    "unknownCommentAttachment": "ФАЙЛ",
    "editRecordText": "Редактиране",
    "deleteRecordText": "Изтриване",
    "deleteCommentFailedMessage": "Коментарът не може да се изтрие"
  },
  "gallery": {
    "galleryHeaderText": "Галерия",
    "noAttachmentsAvailableText": "Няма намерени прикачени файлове"
  },
  "dialog": {
    "okButton": "Добре",
    "cancelButton": "Отказ",
    "yesButton": "Да",
    "noButton": "Не"
  }
});