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
    "submitReportButtonText": "Отправить отчет",
    "gotoListViewTooltip": "Вид - список",
    "noFeatureGeomtery": "Объекты невозможно отобразить",
    "featureOutsideAOIMessage": "Невозможно добавить объекты за пределами изучаемой области.",
    "noEditingPermissionsMessage": "Ж_You do not have permission to perform this action________________Я."
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
    "myReport": "Ж_My Submissions_____Я",
    "signIn": "Вход",
    "signOut": "Выход",
    "signInTooltip": "Вход",
    "signOutTooltip": "Выход",
    "myReportTooltip": "Ж_View my submissions_______Я"
  },
  "geoform": {
    "enterInformation": "Подробности",
    "selectAttachments": "Вложения",
    "selectFileText": "Просмотр",
    "enterLocation": "Расположение",
    "reportItButton": "Отчет",
    "editReportButton": "Обновить",
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
    "errorsInApplyEdits": "Ж_Values could not be submitted__________Я.",
    "attachmentSelectedMsg": "выбранные вложения",
    "attachmentUploadStatus": "${failed} из ${total} вложений не удалось выгрузить.",
    "geoLocationError": "Текущее местоположение недоступно",
    "geoLocationOutOfExtent": "Текущее местоположение вне экстента базовой карты",
    "submitButtonTooltip": "Подтвердить",
    "cancelButtonTooltip": "Отменить",
    "geoformBackButtonTooltip": "Ж_Return to the list______Я",
    "locationSelectionHintForPointLayer": "Ж_Tap the map to draw the location___________Я.",
    "locationSelectionHintForPolygonLayer": "Ж_Tap the map to draw the location. Double tap to complete the drawing______________________Я.",
    "locationSelectionHintForPointLayerDesktop": "Ж_Click the map to draw the location____________Я.",
    "locationSelectionHintForPolygonLayerDesktop": "Ж_Click the map to draw the location. Double click to complete the drawing_______________________Я."
  },
  "locator": {
    "addressText": "Адрес:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Широта/Долгота",
    "invalidSearch": "Результаты не найдены",
    "locatorPlaceholder": "Введите адрес для поиска",
    "locationOutOfExtent": "Ж_Location is outside the submission area_____________Я",
    "searchButtonTooltip": "Поиск",
    "clearButtonTooltip": "Очистить значение поиска"
  },
  "myIssues": {
    "title": "Ж_My Submissions_____Я",
    "myIssuesTooltip": "Ж_My Submissions_____Я",
    "noResultsFound": "Ж_No submissions found_______Я"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "Я согласен",
    "commentButtonLabel": "",
    "commentButtonTooltip": "Оставить отзыв",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Просмотр вложенных документов",
    "mapButtonLabel": "Просмотр на карте",
    "mapButtonTooltip": "Ж_View the location of this submission____________Я",
    "commentsListHeading": "Комментарии",
    "unableToUpdateVoteField": "Ваш голос не может быть учтен сейчас.",
    "gotoIssueListTooltip": "Ж_View the list of submissions_________Я",
    "deleteMessage": "Вы уверены, что хотите удалить?"
  },
  "itemList": {
    "likesForThisItemTooltip": "Ж_Number of votes______Я",
    "loadMoreButtonText": "Загрузить больше..."
  },
  "comment": {
    "commentsFormHeading": "Комментарий",
    "commentsFormSubmitButton": "Отправить комментарий",
    "commentsFormEditButton": "Обновить комментарий",
    "commentsFormCancelButton": "Отменить",
    "errorInSubmittingComment": "Комментарий не может быть добавлен.",
    "emptyCommentMessage": "Введите комментарий.",
    "placeHolderText": "Введите комментарий",
    "noCommentsAvailableText": "Нет доступных комментариев",
    "remainingTextCount": "Символов осталось: ${0}",
    "showNoText": "Нет",
    "selectAttachments": "Вложения",
    "selectFileText": "Просмотр",
    "attachmentSelectedMsg": "выбранные вложения",
    "attachmentHeaderText": "Вложения",
    "unknownCommentAttachment": "ФАЙЛ",
    "editRecordText": "Изменить",
    "deleteRecordText": "Удалить",
    "deleteCommentFailedMessage": "Невозможно удалить комментарий"
  },
  "gallery": {
    "galleryHeaderText": "Галерея",
    "noAttachmentsAvailableText": "Вложения не найдены"
  }
});