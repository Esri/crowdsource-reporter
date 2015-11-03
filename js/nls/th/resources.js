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
            error: "ไม่สามารถสร้างแผนที่ได้",
            zoomInTooltip: "ขยายภาพ",  // Command button to zoom in to the map
            zoomOutTooltip: "ย่อภาพ",  // Command button to zoom out of the map
            geolocationTooltip: "ตำแหน่งปัจจุบัน"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "ยังไม่กำหนดกลุ่ม", // Shown when no group is configured in the configuration file
            submitReportButtonText: "ส่งรายงาน", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "รายการยอดเข้าชม", // Go to List view tooltip text
            noFeatureGeomtery: "ไม่สามารถแสดงฟีเจอร์ได้" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "ดำเนินการในฐานะผู้เยี่ยมชม", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "หรือ", // Or text on sign in screen
            signinOptionsText: "ลงทะเบียนด้วย:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "กรุณาลงชื่อเข้าใช้", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "ลงชื่อเข้าใช้เป็นผู้เยี่ยมชม", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "ลงชื่อเข้าใช้ด้วยเฟสปุ๊ค", // Command button to access the application via Facebook login
            twitterLoginTooltip: "ลงชื่อเข้าใช้ด้วยทวิตเตอร์", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "ลงชื่อเข้าใช้ด้วยกูเกิ้ล พลัส", // Command button to access the application via Google+ login
            agolLoginTooltip: "ลงชื่อเข้าใช้ด้วย ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "เจ้าของ", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "วันที่สร้าง", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "วันที่แก้ไข", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "คำบรรยาย", // Shown in the 'Map information' section describing the webmap
            snippet: "สรุป", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "การเข้าถึงและข้อจำกัด", // Shown in the map information section indicating the webmap license information
            accessInformation: "เครดิต", // Shown in the 'Map information' section indicating account credits
            tags: "แท็กส์", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "จำนวนวิว", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "อันดับ", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "กำหนดกลุ่มไม่ถูกต้องหรือยังไม่มีไอเท็มแชร์อยู่ในกลุ่ม", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "ข้อมูลรายละเอียดแผนที่" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "ก้_No features found______ษฺ", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "ก้_No features found near you_________ษฺ", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "ก้_Unable to complete operation_________ษฺ", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "ไปที่รายการหลัก", // Tooltip for back icon in list header
            gotoMapViewTooltip: "มุมมองแผนที่" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "รายงาน", // Command button shown in mobile menu list
            signIn: "ลงชื่อเข้าใช้", // Command button shown in mobile menu list and in appheader
            signOut: "ลงชื่อออก", // Command button shown in mobile menu list
            signInTooltip: "ลงชื่อเข้าใช้", // Tooltip to 'Sign in' option
            signOutTooltip: "ออกจากระบบ", // Tooltip  to 'Sign out' option
            myReportTooltip: "ก้_View my reports______ษฺ" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "รายละเอียด", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "เอกสารแนบ", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "ค้นหา", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "ตำแหน่ง", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "รายการสิ่งนี้", // Command button to submit the geoform to report an issue
            cancelButton: "ยกเลิก", //Command button to close the geoform
            requiredField: "(จำเป็นต้องใช้)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "เลือก;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "กรุณากรอกข้อมูลที่ถูกต้อง", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "ฟิลด์ชั้นข้อมูลไม่ได้ระบุเพื่อกำหนดการเก็บข้อมู,", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "โปรดกรอกเลขจำนวนเต็ม", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "โปรดกรอกเลขจำนวนเต็ม", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "โปรดกรอกตัวเลข", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "โปรดกรอกตัวเลข", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "โปรดระปุค่าสำหรับฟิลด์ที่จำเป็นทั้งหมด", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "โปรดเลือกสถานที่สำหรับรายงานของคุณ", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}เปรย:${closeStrong} ค่่าต่ำที่สุด ${minValue} และค่าสูงที่สุด ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}เปรย:${closeStrong} วันขั้นต่ำ ${minValue} และวันสูงสุด ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "ก้_Report could not be submitted__________ษฺ", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "เลือกไฟล์แนบ", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} จาก ${total} ไฟล์แนบที่ไม่สามารถอัพโหลดได้", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "ไม่พร้อมใช้ตำแหน่งปัจจุบัน",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "ตำแหน่งปัจจุบันอยู่นอกขอบเขตของแผนที่ฐาน",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "รายการสิ่งนี้", // Command button to open the geoform
            cancelButtonTooltip: "ยกเลิก", //tooltip for cancel button
            geoformBackButtonTooltip: "ไปที่รายการรายงาน" //tooltip for Geoform back button

        },
        locator: {
            addressText: "ที่อยู่:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "ละติจูด/ลองจิจูด", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "ไม่พบผลลัพธ์", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "กรอกที่อยู่ เพื่อค้นหา", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "ตำแหน่งที่อยู่อยู่นอกขอบเขตของแผนที่ฐาน", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "ค้นหา", // Tooltip for search button
            clearButtonTooltip: "ล้างค่าที่ใช้ค้นหา" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "รายงาน", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "รายงาน", // Command button to access issues reported by the logged in user
            noResultsFound: "ก้_No reports found______ษฺ" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "ชอบ", // Command button for up-voting a report
            likeButtonTooltip: "โหวตให้รายงานนี้",  // Tooltip for Like button
            commentButtonLabel: "คำอธิบาย", // Command button for submitting feedback
            commentButtonTooltip: "แสดงความคิดเห็นเกี่ยวกับรายงานนี้", // Tooltip for Comment button
            galleryButtonLabel: "แกลเลอรี", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "แสดงเอกสารแนบ", // Tooltip for command button shown in details panel
            mapButtonLabel: "แสดงบนแผนที่", // Command button shown in details panel
            mapButtonTooltip: "แสดงตำแหน่งของรายงานนี้", // Tooltip for Gallery button
            commentsListHeading: "ความคิดเห็น", // List heading for Comments section in details panel
            unableToUpdateVoteField: "ก้_Your vote cannot be counted at this time_____________ษฺ.", // Error message for feature unable to update
            gotoIssueListTooltip: "ไปที่รายการรายงาน" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "โหวตให้รายงานนี้", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "ก้_Load More_____ษฺ..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "ส่งความคิดเห็น",
            commentsFormCancelButton: "ยกเลิก",
            errorInSubmittingComment: "ความคิดเห็นนี้ไม่สามารถส่งได้", // Shown when user is unable to add comments
            emptyCommentMessage: "โปรดกรอกความเห็น", // Shown when user submits a comment without any text/character
            placeHolderText: "ประเภทของความเห็น", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "ไม่มีความคิดเห็น", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} ตัวอักษร ที่เหลือ", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "ไม่" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "แกลเลอรี",
            noAttachmentsAvailableText: "ไม่พบไฟล์แนบ" // Shown when no comments are available for the selected issue
        }
    })
);
