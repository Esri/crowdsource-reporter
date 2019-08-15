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
    "error": "Неможливо створити карту",
    "licenseError": {
      "message": "Ваш обліковий запис не має ліцензії на використання настроюваних додатків, які не є публічними Попросіть адміністратора вашої організації призначити вам тип користувача, що включає основні додатки або додаткову ліцензію на основні додатки.",
      "title": "Немає ліцензії"
    },
    "zoomInTooltip": "Збільшити масштаб",
    "zoomOutTooltip": "Зменшити масштаб",
    "geolocationTooltip": "Поточне місце розташування"
  },
  "main": {
    "noGroup": "Група не налаштована",
    "submitReportButtonText": "Надіслати звіт",
    "gotoListViewTooltip": "Вид списку",
    "noFeatureGeomtery": "Об'єкт неможливо відобразити",
    "featureOutsideAOIMessage": "Об'єкт неможливо додати за межами області, що вивчається",
    "noEditingPermissionsMessage": "Ви не маєте дозволу виконувати цю дію.",
    "basemapGalleryText": "Галерея базових карт",
    "basemapThumbnailAltText": "Клацніть, щоб завантажити ${basemapTitle} ${index} з ${totalBasemaps}",
    "legendText": "Легенда",
    "featureNotFoundMessage": "Запитаний об’єкт не знайдено",
    "backButton": "ззаду",
    "panelCloseButton": "Закрити"
  },
  "signin": {
    "guestSigninText": "Продовжити як гість",
    "signInOrText": "Або",
    "signinOptionsText": "Увійти через:",
    "noGroupNameText": "Увійдіть в систему",
    "guestLoginTooltip": "Увійти в систему як гість",
    "facebookLoginTooltip": "Увійти через Facebook",
    "twitterLoginTooltip": "Увійти через Twitter",
    "googlePlusLoginTooltip": "Увійти через Google+",
    "agolLoginTooltip": "Увійти через ArcGIS"
  },
  "webMapList": {
    "owner": "Власник",
    "created": "Дата створення",
    "modified": "Дата зміни",
    "description": "Опис",
    "snippet": "Коротка інформація",
    "licenseInfo": "Отримати доступ та використовувати обмеження",
    "accessInformation": "Кредити",
    "tags": "Теги",
    "numViews": "Кількість переглядів",
    "avgRating": "Рейтинг",
    "noWebMapInGroup": "Налаштована група недійсна або елементи ще не було надано у спільне використання цій групі.",
    "infoBtnToolTip": "Інформація про карту"
  },
  "issueWall": {
    "noResultsFound": "Об'єкти не знайдено",
    "noResultsFoundInCurrentBuffer": "Об'єкти поруч з вами не знайдено",
    "unableToFetchFeatureError": "Неможливо виконати операцію",
    "gotoWebmapListTooltip": "Перейти до основного списку",
    "gotoMapViewTooltip": "Вид карти"
  },
  "appHeader": {
    "help": "Довідка",
    "myReport": "Мої внески",
    "signIn": "Увійти в систему",
    "signOut": "Вийти із системи",
    "signInTooltip": "Увійти в систему",
    "signOutTooltip": "Вийти із системи",
    "myReportTooltip": "Переглянути мої внески",
    "share": "Поділитися",
    "shareDialogTitle": "Діалогове вікно спільного доступу",
    "shareDialogAppURLLabel": "URL додатка",
    "mobileHamburger": "«Гамбургер»"
  },
  "geoform": {
    "enterInformation": "Детальна інформація",
    "selectAttachments": "Прикріплення",
    "selectFileText": "Переглянути",
    "enterLocation": "Місце розташування",
    "reportItButton": "Повідомити про це",
    "editReportButton": "Оновити",
    "cancelButton": "Скасувати",
    "requiredField": "(потрібно)",
    "selectDefaultText": "Вибрати&hellip;",
    "invalidInputValue": "Введіть дійсне значення.",
    "noFieldsConfiguredMessage": "Поля шару не налаштовані для реєстрації даних",
    "invalidSmallNumber": "Введіть ціле число",
    "invalidNumber": "Введіть ціле число",
    "invalidFloat": "Введіть число",
    "invalidDouble": "Введіть число",
    "requiredFields": "Введіть значення у всі потрібні поля",
    "selectLocation": "Виберіть місце розташування для вашого звіту",
    "numericRangeHintMessage": "${openStrong}Підказка:${closeStrong} мінімальне значення ${minValue} та максимальне значення ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Підказка:${closeStrong} мінімальна дата ${minValue} та максимальна дата ${maxValue}",
    "errorsInApplyEdits": "Значення не вдалося надіслати.",
    "attachmentSelectedMsg": "додаток (додатки) вибрано",
    "attachmentUploadStatus": "${failed} з ${total} додатку (додатків) не вдалося передати",
    "geoLocationError": "Поточне місце розташування недоступне",
    "geoLocationOutOfExtent": "Поточне місце розташування знаходиться поза екстентом базової карти",
    "submitButtonTooltip": "Надіслати",
    "cancelButtonTooltip": "Скасувати",
    "geoformBackButtonTooltip": "Повернутись до списку",
    "locationSelectionHintForPointLayer": "Торкніться карти, щоб намалювати місце розташування.",
    "locationSelectionHintForPolygonLayer": "Торкніться карти, щоб намалювати місце розташування. Два рази торкніться, щоб завершити малювання.",
    "locationSelectionHintForPointLayerDesktop": "Клацніть на карті, щоб намалювати місце розташування.",
    "locationSelectionHintForPolygonLayerDesktop": "Клацніть на карті, щоб намалювати місце розташування. Два рази клацніть, щоб завершити малювання.",
    "locationDialogTitle": "Виберіть місце розташування для звіту",
    "locationDialogContent": "Бажаєте використовувати місце розташування зображення?",
    "errorMessageText": "${message} для поля ${fieldName}",
    "deleteAttachmentBtnText": "Видалити прикріплення"
  },
  "locator": {
    "addressText": "Адреса:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Широта/довгота",
    "invalidSearch": "Результати не знайдено",
    "locatorPlaceholder": "Введіть адресу для пошуку",
    "locationOutOfExtent": "Місце розташування знаходиться поза зоною внесень",
    "searchButtonTooltip": "Пошук",
    "clearButtonTooltip": "Очистити значення пошуку"
  },
  "myIssues": {
    "title": "Мої внески",
    "myIssuesTooltip": "Мої внески",
    "noResultsFound": "Внески не знайдено"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "Я погоджуюся",
    "commentButtonLabel": "",
    "commentButtonTooltip": "Залишити відповідь",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Подивитись прикріплені документи",
    "mapButtonLabel": "Переглянути на карті",
    "mapButtonTooltip": "Переглянути місце розташування цього внеску",
    "commentsListHeading": "Коментарі",
    "unableToUpdateVoteField": "Ваш голос неможливо врахувати зараз.",
    "gotoIssueListTooltip": "Переглянути список внесків",
    "deleteMessage": "Бажаєте видалити?"
  },
  "itemList": {
    "likesForThisItemTooltip": "Кількість голосів",
    "loadMoreButtonText": "Завантажити більше..."
  },
  "comment": {
    "commentsFormHeading": "Коментар",
    "commentsFormSubmitButton": "Надіслати коментар",
    "commentsFormEditButton": "Оновити коментар",
    "commentsFormCancelButton": "Скасувати",
    "errorInSubmittingComment": "Коментар не вдалося надіслати.",
    "commentSubmittedMessage": "Дякуємо за ваш відгук.",
    "emptyCommentMessage": "Будь ласка, введіть коментар.",
    "placeHolderText": "Введіть коментар",
    "noCommentsAvailableText": "Коментарі недоступні",
    "remainingTextCount": "Залишився ${0} символ(-ів)",
    "showNoText": "Ні",
    "selectAttachments": "Прикріплення",
    "selectFileText": "Переглянути",
    "attachmentSelectedMsg": "додаток (додатки) вибрано",
    "attachmentHeaderText": "Прикріплення",
    "unknownCommentAttachment": "ФАЙЛ",
    "editRecordText": "Редагувати",
    "deleteRecordText": "Видалити",
    "deleteCommentFailedMessage": "Неможливо видалити коментар"
  },
  "gallery": {
    "galleryHeaderText": "Галерея",
    "noAttachmentsAvailableText": "Прикріплення не знайдено"
  },
  "dialog": {
    "okButton": "Ok",
    "cancelButton": "Скасувати",
    "yesButton": "Так",
    "noButton": "Ні"
  }
});