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
    "error": "ไม่สามารถสร้างแผนที่ได้",
    "zoomInTooltip": "ขยายภาพ",
    "zoomOutTooltip": "ย่อภาพ",
    "geolocationTooltip": "ตำแหน่งปัจจุบัน"
  },
  "main": {
    "noGroup": "ยังไม่กำหนดกลุ่ม",
    "submitReportButtonText": "ส่งรายงาน",
    "gotoListViewTooltip": "รายการยอดเข้าชม",
    "noFeatureGeomtery": "ไม่สามารถแสดงฟีเจอร์ได้",
    "featureOutsideAOIMessage": "ไม่สามารถเพิ่มฟีเจอร์นอกพื้นที่ศึกษาของคุณ",
    "noEditingPermissionsMessage": "ก้_You do not have permission to perform this action________________ษฺ."
  },
  "signin": {
    "guestSigninText": "ดำเนินการในฐานะผู้เยี่ยมชม",
    "signInOrText": "หรือ",
    "signinOptionsText": "ลงทะเบียนด้วย:",
    "noGroupNameText": "กรุณาลงชื่อเข้าใช้",
    "guestLoginTooltip": "ลงชื่อเข้าใช้เป็นผู้เยี่ยมชม",
    "facebookLoginTooltip": "ลงชื่อเข้าใช้ด้วยเฟสปุ๊ค",
    "twitterLoginTooltip": "ลงชื่อเข้าใช้ด้วยทวิตเตอร์",
    "googlePlusLoginTooltip": "ลงชื่อเข้าใช้ด้วยกูเกิ้ล พลัส",
    "agolLoginTooltip": "ลงชื่อเข้าใช้ด้วย ArcGIS"
  },
  "webMapList": {
    "owner": "เจ้าของ",
    "created": "วันที่สร้าง",
    "modified": "วันที่แก้ไข",
    "description": "คำบรรยาย",
    "snippet": "สรุป",
    "licenseInfo": "การเข้าถึงและข้อจำกัด",
    "accessInformation": "เครดิต",
    "tags": "แท็กส์",
    "numViews": "จำนวนวิว",
    "avgRating": "อันดับ",
    "noWebMapInGroup": "กำหนดกลุ่มไม่ถูกต้องหรือยังไม่มีไอเท็มแชร์อยู่ในกลุ่ม",
    "infoBtnToolTip": "ข้อมูลรายละเอียดแผนที่"
  },
  "issueWall": {
    "noResultsFound": "ไม่พบฟีเจอร์ที่ค้นหา",
    "noResultsFoundInCurrentBuffer": "ไม่พบข้อมูลในระยะใกล้",
    "unableToFetchFeatureError": "ไม่สามารถดำเนินการให้เสร็จสมบูรณ์",
    "gotoWebmapListTooltip": "ไปที่รายการหลัก",
    "gotoMapViewTooltip": "มุมมองแผนที่"
  },
  "appHeader": {
    "myReport": "ก้_My Submissions_____ษฺ",
    "signIn": "ลงชื่อเข้าใช้",
    "signOut": "ลงชื่อออก",
    "signInTooltip": "ลงชื่อเข้าใช้",
    "signOutTooltip": "ออกจากระบบ",
    "myReportTooltip": "ก้_View my submissions_______ษฺ"
  },
  "geoform": {
    "enterInformation": "รายละเอียด",
    "selectAttachments": "เอกสารแนบ",
    "selectFileText": "ค้นหา",
    "enterLocation": "ตำแหน่ง",
    "reportItButton": "รายการสิ่งนี้",
    "editReportButton": "อัพเดท",
    "cancelButton": "ยกเลิก",
    "requiredField": "(จำเป็นต้องใช้)",
    "selectDefaultText": "เลือก;",
    "invalidInputValue": "กรุณากรอกข้อมูลที่ถูกต้อง",
    "noFieldsConfiguredMessage": "ฟิลด์ชั้นข้อมูลไม่ได้ระบุเพื่อกำหนดการเก็บข้อมู,",
    "invalidSmallNumber": "โปรดกรอกเลขจำนวนเต็ม",
    "invalidNumber": "โปรดกรอกเลขจำนวนเต็ม",
    "invalidFloat": "โปรดกรอกตัวเลข",
    "invalidDouble": "โปรดกรอกตัวเลข",
    "requiredFields": "โปรดระปุค่าสำหรับฟิลด์ที่จำเป็นทั้งหมด",
    "selectLocation": "โปรดเลือกสถานที่สำหรับรายงานของคุณ",
    "numericRangeHintMessage": "${openStrong}เปรย:${closeStrong} ค่่าต่ำที่สุด ${minValue} และค่าสูงที่สุด ${maxValue}",
    "dateRangeHintMessage": "${openStrong}เปรย:${closeStrong} วันขั้นต่ำ ${minValue} และวันสูงสุด ${maxValue}",
    "errorsInApplyEdits": "ก้_Values could not be submitted__________ษฺ.",
    "attachmentSelectedMsg": "เลือกไฟล์แนบ",
    "attachmentUploadStatus": "${failed} จาก ${total} ไฟล์แนบที่ไม่สามารถอัพโหลดได้",
    "geoLocationError": "ไม่พร้อมใช้ตำแหน่งปัจจุบัน",
    "geoLocationOutOfExtent": "ตำแหน่งปัจจุบันอยู่นอกขอบเขตของแผนที่ฐาน",
    "submitButtonTooltip": "ส่ง",
    "cancelButtonTooltip": "ยกเลิก",
    "geoformBackButtonTooltip": "ก้_Return to the list______ษฺ",
    "locationSelectionHintForPointLayer": "ก้_Tap the map to draw the location___________ษฺ.",
    "locationSelectionHintForPolygonLayer": "ก้_Tap the map to draw the location. Double tap to complete the drawing______________________ษฺ.",
    "locationSelectionHintForPointLayerDesktop": "ก้_Click the map to draw the location____________ษฺ.",
    "locationSelectionHintForPolygonLayerDesktop": "ก้_Click the map to draw the location. Double click to complete the drawing_______________________ษฺ."
  },
  "locator": {
    "addressText": "ที่อยู่:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "ละติจูด/ลองจิจูด",
    "invalidSearch": "ไม่พบผลลัพธ์",
    "locatorPlaceholder": "กรอกที่อยู่ เพื่อค้นหา",
    "locationOutOfExtent": "ก้_Location is outside the submission area_____________ษฺ",
    "searchButtonTooltip": "ค้นหา",
    "clearButtonTooltip": "ล้างค่าที่ใช้ค้นหา"
  },
  "myIssues": {
    "title": "ก้_My Submissions_____ษฺ",
    "myIssuesTooltip": "ก้_My Submissions_____ษฺ",
    "noResultsFound": "ก้_No submissions found_______ษฺ"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "เห็นด้วย",
    "commentButtonLabel": "",
    "commentButtonTooltip": "ออกจากการตอบ",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "แสดงเอกสารแนบ",
    "mapButtonLabel": "แสดงบนแผนที่",
    "mapButtonTooltip": "ก้_View the location of this submission____________ษฺ",
    "commentsListHeading": "ความคิดเห็น",
    "unableToUpdateVoteField": "ผลโหวตของคุณไม่สามารถนับได้ในขณะนี้",
    "gotoIssueListTooltip": "ก้_View the list of submissions_________ษฺ",
    "deleteMessage": "คุณแน่ใจว่าต้องการลบ"
  },
  "itemList": {
    "likesForThisItemTooltip": "ก้_Number of votes______ษฺ",
    "loadMoreButtonText": "โหลดเพิ่มเติม"
  },
  "comment": {
    "commentsFormHeading": "คำอธิบาย",
    "commentsFormSubmitButton": "ส่งความคิดเห็น",
    "commentsFormEditButton": "อัพเดตความคิดเห็น",
    "commentsFormCancelButton": "ยกเลิก",
    "errorInSubmittingComment": "ความคิดเห็นนี้ไม่สามารถส่งได้",
    "emptyCommentMessage": "โปรดกรอกความเห็น",
    "placeHolderText": "ประเภทของความเห็น",
    "noCommentsAvailableText": "ไม่มีความคิดเห็น",
    "remainingTextCount": "${0} ตัวอักษร ที่เหลือ",
    "showNoText": "ไม่",
    "selectAttachments": "แนบ",
    "selectFileText": "ค้นหา",
    "attachmentSelectedMsg": "เลือกไฟล์แนบ",
    "attachmentHeaderText": "แนบ",
    "unknownCommentAttachment": "ไฟล์",
    "editRecordText": "แก้ไข",
    "deleteRecordText": "ลบ",
    "deleteCommentFailedMessage": "ไม่สมารถลบความคิดเห็น"
  },
  "gallery": {
    "galleryHeaderText": "แกลเลอรี",
    "noAttachmentsAvailableText": "ไม่พบไฟล์แนบ"
  }
});