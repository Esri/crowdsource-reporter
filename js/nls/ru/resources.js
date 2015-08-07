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
define(
     ({
        map: {
            error: "Не удалось создать карту",
            zoomInTooltip: "Увеличить",  // Command button to zoom in to the map
            zoomOutTooltip: "Уменьшить",  // Command button to zoom out of the map
            geolocationTooltip: "Текущее местоположение"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Не задана группа", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Отправить отчет", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Вид - список", // Go to List view tooltip text
            noFeatureGeomtery: "Объекты невозможно отобразить" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Продолжить как гость", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Или", // Or text on sign in screen
            signinOptionsText: "Вход с использованием:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Выполните вход", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Войти как гость", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Войти через Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Войти через Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Войти через Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Войти через ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Владелец", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Ж_Date created_____Я", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Дата изменения", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Описание", // Shown in the 'Map information' section describing the webmap
            snippet: "Итоговая информация", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Ограничения доступа и использования", // Shown in the map information section indicating the webmap license information
            accessInformation: "Сведения об авторах", // Shown in the 'Map information' section indicating account credits
            tags: "Теги", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Количество просмотров", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Рейтинг", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Настроенная группа недействительна, или в указанной группе нет доступных элементов", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Информация карты" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "В текущей области нет доступных отчетов", // Shown in the issue wall when no issues are present in the current map extent
            gotoWebmapListTooltip: "Перейти в основной список", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Вид карты" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Мои отчеты", // Command button shown in mobile menu list
            signIn: "Вход", // Command button shown in mobile menu list and in appheader
            signOut: "Выход", // Command button shown in mobile menu list
            help: "Справка", // Command button shown in mobile menu list
            signInTooltip: "Вход", // Tooltip to 'Sign in' option
            signOutTooltip: "Выход", // Tooltip  to 'Sign out' option
            myReportTooltip: "Просмотреть отчеты, созданные мной", // Tooltip  to 'My Reports' option
            helpTooltip: "Справка" // Tooltip  to 'Help' option
        },
        geoform: {
            enterInformation: "Подробности", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Вложения", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Просмотр", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Расположение", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Отчет", // Command button to submit the geoform to report an issue
            cancelButton: "Отменить", //Command button to close the geoform
            requiredField: "(необходимо)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Выбрать&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Введите корректное значение.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Поля слоя не настроены для получения данных", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Введите целое число", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Введите целое число", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Введите число", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Введите число", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Укажите значения для всех обязательных полей", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Выберите местоположение для отчета", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Подсказка:${closeStrong} Минимальное значение ${minValue} и Максимальное значение ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Hint:${closeStrong} Минимальная дата ${minValue} и Максимальная дата ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Это не может быть отражено в отчете.", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "выбранное вложение(я)", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} из ${total} вложений(я) не удалось выгрузить.", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Текущее местоположение недоступно",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Текущее местоположение вне экстента базовой карты",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Отчет", // Command button to open the geoform
            cancelButtonTooltip: "Отменить", //tooltip for cancel button
            geoformBackButtonTooltip: "Перейти к списку отчетов" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Адрес:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Широта/Долгота", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Результаты не найдены", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Введите адрес для поиска", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Адрес находится вне экстента базовой карты", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Поиск", // Tooltip for search button
            clearButtonTooltip: "Очистить значение поиска" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Мои отчеты", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Мои отчеты", // Command button to access issues reported by the logged in user
            noResultsFound: "Отчеты не найдены." // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Like", // Command button shown in details panel
            likeButtonTooltip: "Голосовать за этот отчет",  // Tooltip for command button shown in details panel
            commentButtonLabel: "Комментарий", // Command button shown in details panel
            commentButtonTooltip: "Комментировать этот отчет", // Tooltip for command button shown in details panel
            galleryButtonLabel: "Галерея", // Command button shown in details panel
            galleryButtonTooltip: "Просмотр вложенных документов", // Tooltip for command button shown in details panel
            mapButtonLabel: "Просмотр на карте", // Command button shown in details panel
            mapButtonTooltip: "Просмотреть местоположение этого отчета", // Tooltip for command button shown in details panel
            commentsListHeading: "Комментарии", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Ваш голос не может быть учтен сейчас.", // Error message for feature unable to update
            gotoIssueListTooltip: "Перейти к списку отчетов" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Число голосов отданных за отчет" //Shown on hovering of the like icon in my-issues and issue-wall
        },
        comment: {
            commentsFormText: "Комментарий",
            commentsFormSubmitButton: "Отправить комментарий",
            commentsFormCancelButton: "Отменить",
            errorInSubmittingComment: "Комментарий не может быть добавлен.", // Shown when user is unable to add comments
            emptyCommentMessage: "Введите комментарий.", // Shown when user submits a comment without any text/character
            placeHolderText: "Введите комментарий", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Нет доступных комментариев", // Shown when no comments are available for the selected issue
            remainingTextCount: "Символов осталось: ${0}", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Нет" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Галерея",
            noAttachmentsAvailableText: "Вложения не найдены" // Shown when no comments are available for the selected issue
        }
    })
);
