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
            error: "לא ניתן ליצור מפה",
            zoomInTooltip: "התמקד פנימה",  // Command button to zoom in to the map
            zoomOutTooltip: "התמקד החוצה",  // Command button to zoom out of the map
            geolocationTooltip: "מיקום נוכחי"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "לא הוגדרה קבוצה", // Shown when no group is configured in the configuration file
            submitReportButtonText: "שלח דוח", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "תצוגת רשימה", // Go to List view tooltip text
            noFeatureGeomtery: "לא ניתן להציג את הישות" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "המשך כאורח", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "או", // Or text on sign in screen
            signinOptionsText: "התחבר עם:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "אנא התחבר", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "התחבר כאורח", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "התחבר עם Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "התחבר עם טוויטר", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "התחבר עם Google+‎", // Command button to access the application via Google+ login
            agolLoginTooltip: "התחבר עם ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "יוצר", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "תאריך יצירה", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "תאריך שינוי", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "תיאור", // Shown in the 'Map information' section describing the webmap
            snippet: "סיכום", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "מגבלות גישה ושימוש", // Shown in the map information section indicating the webmap license information
            accessInformation: "קרדיט", // Shown in the 'Map information' section indicating account credits
            tags: "תגיות", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "מספר מבטים", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "דירוג", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "הקבוצה שהוגדרה לא חוקית או שלא שותפו עדיין פריטים עם קבוצה זו.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "מידע על המפה" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "לא נמצאו ישויות", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "לא נמצאו ישויות בסביבתך", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "לא ניתן להשלים את הפעולה", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "עבור לרשימה הראשית", // Tooltip for back icon in list header
            gotoMapViewTooltip: "מבט מפה" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "הדוחות שלי", // Command button shown in mobile menu list
            signIn: "הירשם", // Command button shown in mobile menu list and in appheader
            signOut: "התנתק", // Command button shown in mobile menu list
            signInTooltip: "הרשם", // Tooltip to 'Sign in' option
            signOutTooltip: "יציאה", // Tooltip  to 'Sign out' option
            myReportTooltip: "הצג את הדוחות שלי" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "פרטים", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "קישורים", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "נתב", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "מיקום", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "דווח על כך", // Command button to submit the geoform to report an issue
            cancelButton: "בטל", //Command button to close the geoform
            requiredField: "(נדרש)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "בחר&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "הזן ערך חוקי.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "שדות השכבות לא מוגדרים ללכידת נתונים", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "הזן מספר שלם", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "הזן מספר שלם", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "הזן מספר", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "הזן מספר", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "ציין ערכים בכל שדות החובה", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "בחר מיקום לדוח", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}רמז:${closeStrong} ערך מינימום ${minValue} וערך מקסימום ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}רמז:${closeStrong} תאריך מינימום ${minValue} ותאריך מקסימום ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "לא ניתן לשלוח דוח", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "קבצים מצורפים נבחרו", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "נכשלה ההעלאה של ${failed} מתוך ${total} קבצים מצורפים", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "מיקום נוכחי לא זמין",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "המיקום נוכחי נמצא מחוץ לגבולות מפת הבסיס",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "דווח על כך", // Command button to open the geoform
            cancelButtonTooltip: "בטל", //tooltip for cancel button
            geoformBackButtonTooltip: "עבור לרשימת הדוחות" //tooltip for Geoform back button

        },
        locator: {
            addressText: "כתובת:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "קו רוחב/אורך", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "לא נמצאו תוצאות", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "הזן כתובת לחיפוש", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "הכתובת שאותרה נמצאת מחוץ לגבולות מפת הבסיס", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "חפש", // Tooltip for search button
            clearButtonTooltip: "נקה ערך חיפוש" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "הדוחות שלי", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "הדוחות שלי", // Command button to access issues reported by the logged in user
            noResultsFound: "לא נמצאו דוחות" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "סמן Like", // Command button for up-voting a report
            likeButtonTooltip: "הצבע עבור דוח זה",  // Tooltip for Like button
            commentButtonLabel: "הערה", // Command button for submitting feedback
            commentButtonTooltip: "הוסף תגובה לדוח", // Tooltip for Comment button
            galleryButtonLabel: "גלריה", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "ראה מסמכים מצורפים", // Tooltip for command button shown in details panel
            mapButtonLabel: "הצג במפה", // Command button shown in details panel
            mapButtonTooltip: "הצג את מיקום הדוח", // Tooltip for Gallery button
            commentsListHeading: "הערות", // List heading for Comments section in details panel
            unableToUpdateVoteField: "לא ניתן לקחת בחשבון את ההצבעה שלך כעת.", // Error message for feature unable to update
            gotoIssueListTooltip: "עבור לרשימת הדוחות" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "הצבעות לדוח זה", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "טען עוד..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "שלח תגובה",
            commentsFormCancelButton: "בטל",
            errorInSubmittingComment: "לא ניתן לשלוח תגובה.", // Shown when user is unable to add comments
            emptyCommentMessage: "שלח תגובה.", // Shown when user submits a comment without any text/character
            placeHolderText: "הקלד תגובה", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "אין תגובות זמינות", // Shown when no comments are available for the selected issue
            remainingTextCount: "נותרו ${0} תווים", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "לא" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "גלריה",
            noAttachmentsAvailableText: "לא נמצאו קבצים מקושרים" // Shown when no comments are available for the selected issue
        }
    })
);
