﻿/*global define */
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
    "error": "يتعذر إنشاء الخريطة",
    "licenseError": {
      "message": "بيت_Your account is not licensed to use Configurable Apps that are not public. Please ask your organization administrator to assign you a user type that includes Essential Apps or an add-on Essential Apps license__________________________________________________________________________________________________________لاحقة.",
      "title": "بيت_Not Licensed_____________لاحقة"
    },
    "zoomInTooltip": "التكبير",
    "zoomOutTooltip": "التصغير.",
    "geolocationTooltip": "الموقع الحالي"
  },
  "main": {
    "noGroup": "لم يتم تكوين المجموعة",
    "submitReportButtonText": "إرسال تقرير",
    "gotoListViewTooltip": "عرض القائمة",
    "noFeatureGeomtery": "يتعذر عرض المعالم",
    "featureOutsideAOIMessage": "يتعذر إضافة المعلم خارج منطقة الدراسة",
    "noEditingPermissionsMessage": "لا يتوفر لديك إذن تنفيذ هذا الحدث.",
    "basemapGalleryText": "معرض خرائط الأساس",
    "basemapThumbnailAltText": "بيت_Click to load ${basemapTitle} ${index} of ${totalBasemaps}______________________________لاحقة",
    "legendText": "وسيلة الإيضاح",
    "featureNotFoundMessage": "بيت_Requested feature not found____________________________لاحقة",
    "backButton": "بيت_back_________لاحقة",
    "panelCloseButton": "بيت_Close___________لاحقة"
  },
  "signin": {
    "guestSigninText": "تابع بصفتك ضيف",
    "signInOrText": "أو",
    "signinOptionsText": "تسجيل الدخول باستخدام:",
    "noGroupNameText": "الرجاء تسجيل الدخول",
    "guestLoginTooltip": "تسجيل الدخول بصفتك ضيف",
    "facebookLoginTooltip": "تسجيل الدخول باستخدام Facebook",
    "twitterLoginTooltip": "تسجيل الدخول باستخدام Twitter",
    "googlePlusLoginTooltip": "تسجيل الدخول باستخدام Google+",
    "agolLoginTooltip": "تسجيل الدخول باستخدام ArcGIS"
  },
  "webMapList": {
    "owner": "المالك",
    "created": "التاريخ الذي تم إنشائه",
    "modified": "تاريخ التعديل",
    "description": "الوصف",
    "snippet": "الملخص",
    "licenseInfo": "الدخول والاستخدام",
    "accessInformation": "اعتمادات",
    "tags": "علامات",
    "numViews": "عدد مرات العرض",
    "avgRating": "التقييم",
    "noWebMapInGroup": "المجموعات التي تم تكوينها غير صحيحة أو لم تتم مشاركة العناصر مع هذه المجموعة بعد.",
    "infoBtnToolTip": "معلومات الخريطة"
  },
  "issueWall": {
    "noResultsFound": "لم يتم العثور على أي معلم",
    "noResultsFoundInCurrentBuffer": "لم يتم العثور على أي معالم بجوارك",
    "unableToFetchFeatureError": "يتعذر إكمال العملية",
    "gotoWebmapListTooltip": "الانتقال إلى القائمة الرئيسية",
    "gotoMapViewTooltip": "عرض الخريطة"
  },
  "appHeader": {
    "help": "بيت_Help_________لاحقة",
    "myReport": "عمليات الإرسال",
    "signIn": "تسجيل الدخول",
    "signOut": "تسجيل الخروج",
    "signInTooltip": "تسجيل الدخول",
    "signOutTooltip": "تسجيل الخروج",
    "myReportTooltip": "عرض عمليات الإرسال",
    "share": "بيت_Share___________لاحقة",
    "shareDialogTitle": "بيت_Share Dialog_____________لاحقة",
    "shareDialogAppURLLabel": "بيت_Application URL________________لاحقة",
    "mobileHamburger": "بيت_Hamburger___________________لاحقة"
  },
  "geoform": {
    "enterInformation": "التفاصيل",
    "selectAttachments": "المرفقات",
    "selectFileText": "مربع حوار",
    "enterLocation": "موقع",
    "reportItButton": "تقريرها",
    "editReportButton": "تحديث",
    "cancelButton": "إلغاء الأمر",
    "requiredField": "(مطلوب)",
    "selectDefaultText": "حدد&hellip;",
    "invalidInputValue": "يرجى إدخال قيمة صحيحة.",
    "noFieldsConfiguredMessage": "لم يتم تكوين حقول الطبقة لالتقاط البيانات",
    "invalidSmallNumber": "برجاء إدخال عدد صحيح",
    "invalidNumber": "برجاء إدخال عدد صحيح",
    "invalidFloat": "Please enter a number",
    "invalidDouble": "Please enter a number",
    "requiredFields": "برجاء توفير قيم لجميع الحقول المطلوبة",
    "selectLocation": "برجاء تحديد موقع التقرير",
    "numericRangeHintMessage": "${openStrong}تلميح:${closeStrong} القيمة الدنيا ${minValue} والقيمة العليا ${maxValue}",
    "dateRangeHintMessage": "${openStrong}تلميح:${closeStrong} التاريخ الأدنى ${minValue} والتاريخ الأقصى ${maxValue}",
    "errorsInApplyEdits": "لا يمكن إرسال القيم.",
    "attachmentSelectedMsg": "المرفقات المحددة",
    "attachmentUploadStatus": "فشل تحميل المرفقات ${failed} من ${total}",
    "geoLocationError": "الموقع الحالي غير متاح",
    "geoLocationOutOfExtent": "الموقع الحالي خارج نطاق الخريطة",
    "submitButtonTooltip": "إرسال",
    "cancelButtonTooltip": "إلغاء الأمر",
    "geoformBackButtonTooltip": "رجوع إلى القائمة",
    "locationSelectionHintForPointLayer": "انقر على الخريطة لرسم الموقع.",
    "locationSelectionHintForPolygonLayer": "اضغط على الخريطة لرسم الموقع. اضغط مرتين لإكمال الرسم.",
    "locationSelectionHintForPointLayerDesktop": "انقر على الخريطة لرسم الموقع.",
    "locationSelectionHintForPolygonLayerDesktop": "انقر على الخريطة لرسم الموقع. انقر مرتين لإكمال الرسم.",
    "locationDialogTitle": "بيت_Select location for report___________________________لاحقة",
    "locationDialogContent": "بيت_Are you sure you want to use image location________________________لاحقة ?",
    "errorMessageText": "بيت_${message} for field ${fieldName}__________________لاحقة",
    "deleteAttachmentBtnText": "بيت_Delete attachment__________________لاحقة"
  },
  "locator": {
    "addressText": "العنوان:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "دائرة العرض/خط الطول",
    "invalidSearch": "لم يتم العثور على أية نتائج",
    "locatorPlaceholder": "أدخل عنوان للبحث",
    "locationOutOfExtent": "الموقع خارج منطقة الإرسال",
    "searchButtonTooltip": "بحث",
    "clearButtonTooltip": "مسح قيمة البحث"
  },
  "myIssues": {
    "title": "عمليات الإرسال",
    "myIssuesTooltip": "عمليات الإرسال",
    "noResultsFound": "لم يتم العثور على عمليات الإرسال"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "أقبل",
    "commentButtonLabel": "",
    "commentButtonTooltip": "اكتب ردًا",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "مراجعة المستندات المرفقة",
    "mapButtonLabel": "العرض على الخريطة",
    "mapButtonTooltip": "عرض موقع هذا الإرسال",
    "commentsListHeading": "التعليقات",
    "unableToUpdateVoteField": "يتعذر حساب التصويت الآن.",
    "gotoIssueListTooltip": "عرض قائمة عمليات الإرسالات",
    "deleteMessage": "هل تريد الحذف بالتأكيد؟"
  },
  "itemList": {
    "likesForThisItemTooltip": "عدد الأصوات",
    "loadMoreButtonText": "تحميل المزيد..."
  },
  "comment": {
    "commentsFormHeading": "تعليق",
    "commentsFormSubmitButton": "تقديم تعليق",
    "commentsFormEditButton": "تحديث التعليق",
    "commentsFormCancelButton": "إلغاء الأمر",
    "errorInSubmittingComment": "يتعذر إرسال التعليق.",
    "commentSubmittedMessage": "بيت_Thank you for your feedback_____________________________لاحقة.",
    "emptyCommentMessage": "الرجاء إدخال تعليق.",
    "placeHolderText": "اكتب تعليق",
    "noCommentsAvailableText": "لا توجد تعليقات متاحة",
    "remainingTextCount": "يتبقى ${0} حرف",
    "showNoText": "لا",
    "selectAttachments": "مرفقات",
    "selectFileText": "مربع حوار",
    "attachmentSelectedMsg": "المرفقات المحددة",
    "attachmentHeaderText": "مرفقات",
    "unknownCommentAttachment": "ملف",
    "editRecordText": "تحرير",
    "deleteRecordText": "حذف",
    "deleteCommentFailedMessage": "يتعذر حذف التعليق"
  },
  "gallery": {
    "galleryHeaderText": "معرض الصور",
    "noAttachmentsAvailableText": "لا توجد مرفقات."
  },
  "dialog": {
    "okButton": "بيت_Ok_____لاحقة",
    "cancelButton": "بيت_Cancel_____________لاحقة",
    "yesButton": "بيت_Yes_______لاحقة",
    "noButton": "بيت_No_____لاحقة"
  }
});