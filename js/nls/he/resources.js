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
    "error": "לא ניתן ליצור מפה",
    "zoomInTooltip": "התמקד פנימה",
    "zoomOutTooltip": "התמקד החוצה",
    "geolocationTooltip": "מיקום נוכחי"
  },
  "main": {
    "noGroup": "לא הוגדרה קבוצה",
    "submitReportButtonText": "שלח דו\"ח",
    "gotoListViewTooltip": "תצוגת רשימה",
    "noFeatureGeomtery": "לא ניתן להציג את הישות",
    "featureOutsideAOIMessage": "כן_Feature cannot be added outside study area______________ש"
  },
  "signin": {
    "guestSigninText": "המשך כאורח",
    "signInOrText": "או",
    "signinOptionsText": "התחבר עם:",
    "noGroupNameText": "אנא התחבר",
    "guestLoginTooltip": "התחבר כאורח",
    "facebookLoginTooltip": "התחבר עם Facebook",
    "twitterLoginTooltip": "התחבר עם טוויטר",
    "googlePlusLoginTooltip": "התחבר עם Google+‎",
    "agolLoginTooltip": "התחבר עם ArcGIS"
  },
  "webMapList": {
    "owner": "יוצר",
    "created": "תאריך יצירה",
    "modified": "תאריך שינוי",
    "description": "תיאור",
    "snippet": "סיכום",
    "licenseInfo": "מגבלות גישה ושימוש",
    "accessInformation": "קרדיט",
    "tags": "תגיות",
    "numViews": "מספר מבטים",
    "avgRating": "דירוג",
    "noWebMapInGroup": "הקבוצה שהוגדרה לא חוקית או שלא שותפו עדיין פריטים עם קבוצה זו.",
    "infoBtnToolTip": "מידע על המפה"
  },
  "issueWall": {
    "noResultsFound": "לא נמצאו ישויות",
    "noResultsFoundInCurrentBuffer": "לא נמצאו ישויות בסביבתך",
    "unableToFetchFeatureError": "לא ניתן להשלים את הפעולה",
    "gotoWebmapListTooltip": "עבור לרשימה הראשית",
    "gotoMapViewTooltip": "מבט מפה"
  },
  "appHeader": {
    "myReport": "הדוחות שלי",
    "signIn": "התחבר",
    "signOut": "התנתק",
    "signInTooltip": "התחבר",
    "signOutTooltip": "יציאה",
    "myReportTooltip": "הצג את הדוחות שלי"
  },
  "geoform": {
    "enterInformation": "פרטים",
    "selectAttachments": "קישורים",
    "selectFileText": "נתב",
    "enterLocation": "מיקום",
    "reportItButton": "דווח על כך",
    "editReportButton": "כן_Update___ש",
    "cancelButton": "בטל",
    "requiredField": "(נדרש)",
    "selectDefaultText": "בחר&hellip;",
    "invalidInputValue": "הזן ערך חוקי.",
    "noFieldsConfiguredMessage": "שדות השכבות לא מוגדרים ללכידת נתונים",
    "invalidSmallNumber": "הזן מספר שלם",
    "invalidNumber": "הזן מספר שלם",
    "invalidFloat": "הזן מספר",
    "invalidDouble": "הזן מספר",
    "requiredFields": "ציין ערכים בכל שדות החובה",
    "selectLocation": "בחר מיקום לדוח",
    "numericRangeHintMessage": "${openStrong}רמז:${closeStrong} ערך מינימום ${minValue} וערך מקסימום ${maxValue}",
    "dateRangeHintMessage": "${openStrong}רמז:${closeStrong} תאריך מינימום ${minValue} ותאריך מקסימום ${maxValue}",
    "errorsInApplyEdits": "לא ניתן לשלוח דוח",
    "attachmentSelectedMsg": "קבצים מצורפים נבחרו",
    "attachmentUploadStatus": "נכשלה ההעלאה של ${failed} מתוך ${total} קבצים מצורפים",
    "geoLocationError": "מיקום נוכחי לא זמין",
    "geoLocationOutOfExtent": "המיקום נוכחי נמצא מחוץ לגבולות מפת הבסיס",
    "submitButtonTooltip": "שלח",
    "cancelButtonTooltip": "בטל",
    "geoformBackButtonTooltip": "חזור לרשימת הדו\"חות"
  },
  "locator": {
    "addressText": "כתובת:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "קו רוחב/אורך",
    "invalidSearch": "לא נמצאו תוצאות",
    "locatorPlaceholder": "הזן כתובת לחיפוש",
    "locationOutOfExtent": "הכתובת שאותרה נמצאת מחוץ לגבולות מפת הבסיס",
    "searchButtonTooltip": "חפש",
    "clearButtonTooltip": "נקה ערך חיפוש"
  },
  "myIssues": {
    "title": "הדוחות שלי",
    "myIssuesTooltip": "הדוחות שלי",
    "noResultsFound": "לא נמצאו דוחות"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "כן_I agree___ש",
    "commentButtonLabel": "",
    "commentButtonTooltip": "כן_Leave a reply_____ש",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "ראה מסמכים מצורפים",
    "mapButtonLabel": "הצג במפה",
    "mapButtonTooltip": "הצג את מיקום הדוח",
    "commentsListHeading": "הערות",
    "unableToUpdateVoteField": "לא ניתן לקחת בחשבון את ההצבעה שלך כעת.",
    "gotoIssueListTooltip": "עבור לרשימת הדוחות",
    "deleteMessage": "כן_Are you sure you want to delete___________ש?"
  },
  "itemList": {
    "likesForThisItemTooltip": "הצבעות לדוח זה",
    "loadMoreButtonText": "טען עוד..."
  },
  "comment": {
    "commentsFormHeading": "כן_Comment___ש",
    "commentsFormSubmitButton": "שלח תגובה",
    "commentsFormEditButton": "כן_Update Comment_____ש",
    "commentsFormCancelButton": "בטל",
    "errorInSubmittingComment": "לא ניתן לשלוח תגובה.",
    "emptyCommentMessage": "שלח תגובה.",
    "placeHolderText": "הקלד תגובה",
    "noCommentsAvailableText": "אין תגובות זמינות",
    "remainingTextCount": "נותרו ${0} תווים",
    "showNoText": "לא",
    "selectAttachments": "כן_Attachments____ש",
    "selectFileText": "כן_Browse___ש",
    "attachmentSelectedMsg": "כן_attachment(s) selected________ש",
    "attachmentHeaderText": "כן_Attachments____ש",
    "unknownCommentAttachment": "כן_FILE__ש",
    "editRecordText": "כן_Edit__ש",
    "deleteRecordText": "כן_Delete___ש",
    "deleteCommentFailedMessage": "כן_Unable to delete comment________ש"
  },
  "gallery": {
    "galleryHeaderText": "גלריה",
    "noAttachmentsAvailableText": "לא נמצאו קבצים מקושרים"
  }
});