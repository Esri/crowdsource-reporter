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
            error: "يتعذر إنشاء الخريطة",
            zoomInTooltip: "التكبير",  // Command button to zoom in to the map
            zoomOutTooltip: "التصغير.",  // Command button to zoom out of the map
            geolocationTooltip: "الموقع الحالي"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "لم يتم تكوين المجموعة", // Shown when no group is configured in the configuration file
            submitReportButtonText: "إرسال تقرير", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "عرض القائمة", // Go to List view tooltip text
            noFeatureGeomtery: "يتعذر عرض المعالم" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "تابع بصفتك ضيف", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "أو", // Or text on sign in screen
            signinOptionsText: "تسجيل الدخول باستخدام:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "الرجاء تسجيل الدخول", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "تسجيل الدخول بصفتك ضيف", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "تسجيل الدخول باستخدام Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "تسجيل الدخول باستخدام Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "تسجيل الدخول باستخدام Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "تسجيل الدخول باستخدام ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "المالك", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "بيت_Date created_____لاحقة", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "تاريخ التعديل", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "الوصف", // Shown in the 'Map information' section describing the webmap
            snippet: "الملخص", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "الدخول والاستخدام", // Shown in the map information section indicating the webmap license information
            accessInformation: "اعتمادات", // Shown in the 'Map information' section indicating account credits
            tags: "علامات", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "عدد مرات العرض", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "التقييم", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "المجموعات التي تم تكوينها غير صحيحة أو لم تتم مشاركة العناصر مع هذه المجموعة بعد.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "معلومات الخريطة" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "لا توجد تقارير متاحة في المنطقة الحالية", // Shown in the issue wall when no issues are present in the current map extent
            gotoWebmapListTooltip: "الانتقال إلى القائمة الرئيسية", // Tooltip for back icon in list header
            gotoMapViewTooltip: "عرض الخريطة" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "التقارير خاصتي", // Command button shown in mobile menu list
            signIn: "تسجيل الدخول", // Command button shown in mobile menu list and in appheader
            signOut: "تسجيل الخروج", // Command button shown in mobile menu list
            help: "المساعدة", // Command button shown in mobile menu list
            signInTooltip: "تسجيل الدخول", // Tooltip to 'Sign in' option
            signOutTooltip: "تسجيل الخروج", // Tooltip  to 'Sign out' option
            myReportTooltip: "عرض التقارير التي تم إرسالها بواسطتي", // Tooltip  to 'My Reports' option
            helpTooltip: "المساعدة" // Tooltip  to 'Help' option
        },
        geoform: {
            enterInformation: "التفاصيل", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "المرفقات", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "مربع حوار", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "موقع", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "تقريرها", // Command button to submit the geoform to report an issue
            cancelButton: "إلغاء الأمر", //Command button to close the geoform
            requiredField: "(مطلوب)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "حدد&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "يرجى إدخال قيمة صحيحة.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "لم يتم تكوين حقول الطبقة لالتقاط البيانات", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "برجاء إدخال عدد صحيح", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "برجاء إدخال عدد صحيح", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Please enter a number", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Please enter a number", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "برجاء توفير قيم لجميع الحقول المطلوبة", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "برجاء تحديد موقع التقرير", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}تلميح:${closeStrong} القيمة الدنيا ${minValue} والقيمة العليا ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}تلميح:${closeStrong} التاريخ الأدنى ${minValue} والتاريخ الأقصى ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "يتعذر تقرير المشكلة", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "المرفقات المحددة", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "فشل تحميل المرفقات ${failed} من ${total}", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "الموقع الحالي غير متاح",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "الموقع الحالي خارج نطاق الخريطة",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "تقريرها", // Command button to open the geoform
            cancelButtonTooltip: "إلغاء الأمر", //tooltip for cancel button
            geoformBackButtonTooltip: "الانتقال إلى قائمة التقرير" //tooltip for Geoform back button

        },
        locator: {
            addressText: "العنوان:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "دائرة العرض/خط الطول", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "لم يتم العثور على أية نتائج", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "أدخل عنوان للبحث", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "العنوان الحالي خارج نطاق خريطة الأساس", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "بحث", // Tooltip for search button
            clearButtonTooltip: "مسح قيمة البحث" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "التقارير خاصتي", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "التقارير خاصتي", // Command button to access issues reported by the logged in user
            noResultsFound: "لم يتم إيجاد التقارير" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "مثل", // Command button shown in details panel
            likeButtonTooltip: "التصويت لهذا التقرير",  // Tooltip for command button shown in details panel
            commentButtonLabel: "التعليق", // Command button shown in details panel
            commentButtonTooltip: "التعليق على هذا التقرير", // Tooltip for command button shown in details panel
            galleryButtonLabel: "معرض الصور", // Command button shown in details panel
            galleryButtonTooltip: "مراجعة المستندات المرفقة", // Tooltip for command button shown in details panel
            mapButtonLabel: "العرض على الخريطة", // Command button shown in details panel
            mapButtonTooltip: "عرض موقع هذا التقرير", // Tooltip for command button shown in details panel
            commentsListHeading: "التعليقات", // List heading for Comments section in details panel
            unableToUpdateVoteField: "تتعذر إضافة التصويت الآن.", // Error message for feature unable to update
            gotoIssueListTooltip: "الانتقال إلى قائمة التقرير" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "عمليات التصويت لهذا التقرير" //Shown on hovering of the like icon in my-issues and issue-wall
        },
        comment: {
            commentsFormText: "التعليق",
            commentsFormSubmitButton: "تقديم تعليق",
            commentsFormCancelButton: "إلغاء الأمر",
            errorInSubmittingComment: "يتعذر إرسال التعليق.", // Shown when user is unable to add comments
            emptyCommentMessage: "الرجاء إدخال تعليق.", // Shown when user submits a comment without any text/character
            placeHolderText: "اكتب تعليق", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "لا توجد تعليقات متاحة", // Shown when no comments are available for the selected issue
            remainingTextCount: "يتبقى ${0} حرف", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "لا" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "معرض الصور",
            noAttachmentsAvailableText: "لا توجد مرفقات." // Shown when no comments are available for the selected issue
        }
    })
);
