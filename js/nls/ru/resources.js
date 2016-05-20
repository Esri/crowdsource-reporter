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
    "error": "Не удалось создать карту",
    "zoomInTooltip": "Увеличить",
    "zoomOutTooltip": "Уменьшить",
    "geolocationTooltip": "Текущее местоположение"
  },
  "main": {
    "noGroup": "Не задана группа",
    "submitReportButtonText": "Ж_Submit a Report______Я",
    "gotoListViewTooltip": "Вид - список",
    "noFeatureGeomtery": "Объекты невозможно отобразить"
  },
  "signin": {
    "guestSigninText": "Продолжить как гость",
    "signInOrText": "Или",
    "signinOptionsText": "Вход с использованием:",
    "noGroupNameText": "Выполните вход",
    "guestLoginTooltip": "Войти как гость",
    "facebookLoginTooltip": "Войти через Facebook",
    "twitterLoginTooltip": "Войти через Twitter",
    "googlePlusLoginTooltip": "Войти через Google+",
    "agolLoginTooltip": "Войти через ArcGIS"
  },
  "webMapList": {
    "owner": "Владелец",
    "created": "Время создания",
    "modified": "Дата изменения",
    "description": "Описание",
    "snippet": "Итоговая информация",
    "licenseInfo": "Ограничения доступа и использования",
    "accessInformation": "Сведения об авторах",
    "tags": "Теги",
    "numViews": "Количество просмотров",
    "avgRating": "Рейтинг",
    "noWebMapInGroup": "Настроенная группа недействительна, или в указанной группе нет доступных элементов",
    "infoBtnToolTip": "Информация карты"
  },
  "issueWall": {
    "noResultsFound": "Не найдены объекты",
    "noResultsFoundInCurrentBuffer": "Не найдены объекты рядом",
    "unableToFetchFeatureError": "Невозможно завершить операцию",
    "gotoWebmapListTooltip": "Перейти в основной список",
    "gotoMapViewTooltip": "Вид карты"
  },
  "appHeader": {
    "myReport": "Мои отчеты",
    "signIn": "Вход",
    "signOut": "Выход",
    "signInTooltip": "Вход",
    "signOutTooltip": "Выход",
    "myReportTooltip": "Просмотреть мои отчеты"
  },
  "geoform": {
    "enterInformation": "Подробности",
    "selectAttachments": "Вложения",
    "selectFileText": "Просмотр",
    "enterLocation": "Расположение",
    "reportItButton": "Отчет",
    "cancelButton": "Отменить",
    "requiredField": "(необходимо)",
    "selectDefaultText": "Выбрать&hellip;",
    "invalidInputValue": "Введите корректное значение.",
    "noFieldsConfiguredMessage": "Поля слоя не настроены для получения данных",
    "invalidSmallNumber": "Введите целое число",
    "invalidNumber": "Введите целое число",
    "invalidFloat": "Введите число",
    "invalidDouble": "Введите число",
    "requiredFields": "Укажите значения для всех обязательных полей",
    "selectLocation": "Выберите местоположение для отчета",
    "numericRangeHintMessage": "${openStrong}Подсказка:${closeStrong} Минимальное значение ${minValue} и Максимальное значение ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Hint:${closeStrong} Минимальная дата ${minValue} и Максимальная дата ${maxValue}",
    "errorsInApplyEdits": "Невозможно добавить отчет.",
    "attachmentSelectedMsg": "выбранные вложения",
    "attachmentUploadStatus": "${failed} из ${total} вложений не удалось выгрузить.",
    "geoLocationError": "Текущее местоположение недоступно",
    "geoLocationOutOfExtent": "Текущее местоположение вне экстента базовой карты",
    "submitButtonTooltip": "Ж_Submit___Я",
    "cancelButtonTooltip": "Отменить",
    "geoformBackButtonTooltip": "Ж_Return to the report list_________Я"
  },
  "locator": {
    "addressText": "Адрес:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Широта/Долгота",
    "invalidSearch": "Результаты не найдены",
    "locatorPlaceholder": "Введите адрес для поиска",
    "locationOutOfExtent": "Адрес находится вне экстента базовой карты",
    "searchButtonTooltip": "Поиск",
    "clearButtonTooltip": "Очистить значение поиска"
  },
  "myIssues": {
    "title": "Мои отчеты",
    "myIssuesTooltip": "Мои отчеты",
    "noResultsFound": "Отчеты не найдены."
  },
  "itemDetails": {
    "likeButtonLabel": "Ж_Vote__Я",
    "likeButtonTooltip": "Голосовать за этот отчет",
    "commentButtonLabel": "Комментарий",
    "commentButtonTooltip": "Комментировать этот отчет",
    "galleryButtonLabel": "Галерея",
    "galleryButtonTooltip": "Просмотр вложенных документов",
    "mapButtonLabel": "Просмотр на карте",
    "mapButtonTooltip": "Просмотреть местоположение этого отчета",
    "commentsListHeading": "Комментарии",
    "unableToUpdateVoteField": "Ваш голос не может быть учтен сейчас.",
    "gotoIssueListTooltip": "Перейти к списку отчетов"
  },
  "itemList": {
    "likesForThisItemTooltip": "Число голосов отданных за отчет",
    "loadMoreButtonText": "Загрузить больше..."
  },
  "comment": {
    "commentsFormSubmitButton": "Отправить комментарий",
    "commentsFormCancelButton": "Отменить",
    "errorInSubmittingComment": "Комментарий не может быть добавлен.",
    "emptyCommentMessage": "Введите комментарий.",
    "placeHolderText": "Введите комментарий",
    "noCommentsAvailableText": "Нет доступных комментариев",
    "remainingTextCount": "Символов осталось: ${0}",
    "showNoText": "Нет"
  },
  "gallery": {
    "galleryHeaderText": "Галерея",
    "noAttachmentsAvailableText": "Вложения не найдены"
  }
});