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
            error: "Harita oluşturulamıyor",
            zoomInTooltip: "Büyüt",  // Command button to zoom in to the map
            zoomOutTooltip: "Küçült",  // Command button to zoom out of the map
            geolocationTooltip: "Geçerli konum"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Yapılandırılan grup yok", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Rapor gönder", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Liste görünümü", // Go to List view tooltip text
            noFeatureGeomtery: "Detay görüntülenemiyor" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Konuk olarak devam et", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Veya", // Or text on sign in screen
            signinOptionsText: "Şununla oturum aç:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Oturum açın", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Konuk olarak oturum aç", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Facebook ile oturum aç", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Twitter ile oturum aç", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Google+ ile oturum aç", // Command button to access the application via Google+ login
            agolLoginTooltip: "ArcGIS ile oturum aç" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Sahibi", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "ı_Date created_____İ", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Değiştirme tarihi:", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Tanım", // Shown in the 'Map information' section describing the webmap
            snippet: "Özet", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Kısıtlamalara eriş ve bunları kullan", // Shown in the map information section indicating the webmap license information
            accessInformation: "Katkı Yapanlar", // Shown in the 'Map information' section indicating account credits
            tags: "Etiketler", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Görüntülenme sayısı", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Derecelendirme", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Yapılandırılmış grup geçersiz veya bu grupla henüz öğe paylaşılmamış.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Harita bilgileri" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Geçerli alanda kullanılabilir rapor yok", // Shown in the issue wall when no issues are present in the current map extent
            gotoWebmapListTooltip: "Ana listeye git", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Harita görünümü" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Raporlarım", // Command button shown in mobile menu list
            signIn: "Oturum Açma", // Command button shown in mobile menu list and in appheader
            signOut: "Oturum Kapat", // Command button shown in mobile menu list
            help: "Yardım", // Command button shown in mobile menu list
            signInTooltip: "Hesabınıza", // Tooltip to 'Sign in' option
            signOutTooltip: "Oturumu kapat", // Tooltip  to 'Sign out' option
            myReportTooltip: "Kendi gönderdiğim raporları görüntüle", // Tooltip  to 'My Reports' option
            helpTooltip: "Yardım" // Tooltip  to 'Help' option
        },
        geoform: {
            enterInformation: "Ayrıntılar", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Eklentiler", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "...", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Konum", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Bildir", // Command button to submit the geoform to report an issue
            cancelButton: "İptal", //Command button to close the geoform
            requiredField: "(gerekli)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Seç&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Geçerli değer girin.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Katman alanları veri yakalamak üzere yapılandırılmamış", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Tamsayı girin", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Tamsayı girin", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Lütfen bir sayı girin", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Lütfen bir sayı girin", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Tüm gerekli alanlar için değer girin", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Raporunuzun konumunu seçin", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}İpucu:${closeStrong} Minimum değer ${minValue} ve Maksimum değer ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}İpucu:${closeStrong} Minimum Tarih ${minValue} ve Maksimum Tarih ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Sorun bildirilemedi", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "ek seçildi", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} / ${total} ek yüklenemedi", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Geçerli konum kullanılamıyor",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Geçerli konum altlık haritası yayılımı dışında",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Bildir", // Command button to open the geoform
            cancelButtonTooltip: "İptal", //tooltip for cancel button
            geoformBackButtonTooltip: "Rapor listesine git" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Adres:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Enlem/Boylam", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Sonuç bulunamadı", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Aranacak adres gir", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Bulunan adres altlık haritası yayılımı dışında", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Ara", // Tooltip for search button
            clearButtonTooltip: "Arama değerini temizle" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Raporlarım", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Raporlarım", // Command button to access issues reported by the logged in user
            noResultsFound: "Herhangi bir rapor bulunamadı" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Gibi", // Command button shown in details panel
            likeButtonTooltip: "Bu rapora oy ver",  // Tooltip for command button shown in details panel
            commentButtonLabel: "Açıklama", // Command button shown in details panel
            commentButtonTooltip: "Bu rapora yorum yap", // Tooltip for command button shown in details panel
            galleryButtonLabel: "Galeri", // Command button shown in details panel
            galleryButtonTooltip: "Ekli belgeleri incele", // Tooltip for command button shown in details panel
            mapButtonLabel: "Haritada görüntüle", // Command button shown in details panel
            mapButtonTooltip: "Bu raporun konumunu görüntüle", // Tooltip for command button shown in details panel
            commentsListHeading: "Yorumlar", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Oyunuz şu anda eklenemiyor.", // Error message for feature unable to update
            gotoIssueListTooltip: "Rapor listesine git" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Bu rapora verilen oylar" //Shown on hovering of the like icon in my-issues and issue-wall
        },
        comment: {
            commentsFormText: "Açıklama",
            commentsFormSubmitButton: "Yorum Gönder",
            commentsFormCancelButton: "İptal",
            errorInSubmittingComment: "Yorum gönderilemedi.", // Shown when user is unable to add comments
            emptyCommentMessage: "Lütfen bir yorum girin.", // Shown when user submits a comment without any text/character
            placeHolderText: "Yorum yaz", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Kullanılabilir yorum yok", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} karakter kaldı", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Hayır" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galeri",
            noAttachmentsAvailableText: "Herhangi bir eklenti bulunamadı" // Shown when no comments are available for the selected issue
        }
    })
);
