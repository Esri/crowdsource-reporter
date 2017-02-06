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
    "error": "Không thể tạo bản đồ",
    "zoomInTooltip": "Thu nhỏ",
    "zoomOutTooltip": "Phóng to",
    "geolocationTooltip": "Vị trí hiện tại"
  },
  "main": {
    "noGroup": "Không có nhóm nào được cấu hình",
    "submitReportButtonText": "Đệ trình Báo cáo",
    "gotoListViewTooltip": "Chế độ xem dạng danh sách",
    "noFeatureGeomtery": "Không thể hiển thị đối tượng",
    "featureOutsideAOIMessage": "Không thể thêm đối tượng bên ngoài vùng nghiên cứu",
    "noEditingPermissionsMessage": "Đ_You do not have permission to perform this action________________ớ."
  },
  "signin": {
    "guestSigninText": "Tiến hành dưới dạng Khách",
    "signInOrText": "Hoặc",
    "signinOptionsText": "Đăng nhập bằng:",
    "noGroupNameText": "Vui lòng đăng nhập",
    "guestLoginTooltip": "Đăng nhập với vai trò khách",
    "facebookLoginTooltip": "Đăng nhập bằng Facebook",
    "twitterLoginTooltip": "Đăng nhập bằng Twitter",
    "googlePlusLoginTooltip": "Đăng nhập bằng Google+",
    "agolLoginTooltip": "Đăng nhập bằng ArcGIS"
  },
  "webMapList": {
    "owner": "Chủ sở hữu",
    "created": "Ngày tạo",
    "modified": "Ngày sửa đổi",
    "description": "Mô tả",
    "snippet": "Tóm tắt",
    "licenseInfo": "Những ràng buộc về Truy cập và Sử dụng",
    "accessInformation": "Service Credits",
    "tags": "Từ khóa",
    "numViews": "Số lần xem",
    "avgRating": "Xếp loại",
    "noWebMapInGroup": "Nhóm được cấu hình không hợp lệ hoặc vẫn chưa có mục nào được chia sẻ với nhóm này.",
    "infoBtnToolTip": "Thông tin bản đồ"
  },
  "issueWall": {
    "noResultsFound": "Không tìm thấy đối tượng",
    "noResultsFoundInCurrentBuffer": "Không tìm thấy đối tượng gần bạn",
    "unableToFetchFeatureError": "Không thể hoàn thành hoạt động",
    "gotoWebmapListTooltip": "Đến danh sách chính",
    "gotoMapViewTooltip": "Chế độ xem bản đồ"
  },
  "appHeader": {
    "myReport": "Đ_My Submissions_____ớ",
    "signIn": "Đăng nhập",
    "signOut": "Đăng xuất",
    "signInTooltip": "Đăng nhập",
    "signOutTooltip": "Đăng xuất",
    "myReportTooltip": "Đ_View my submissions_______ớ"
  },
  "geoform": {
    "enterInformation": "Chi tiết",
    "selectAttachments": "Tệp đính kèm",
    "selectFileText": "Duyệt",
    "enterLocation": "Vị trí",
    "reportItButton": "Báo cáo Nó",
    "editReportButton": "Cập nhật",
    "cancelButton": "Hủy",
    "requiredField": "(bắt buộc)",
    "selectDefaultText": "Chọn&hellip;",
    "invalidInputValue": "Vui lòng nhập giá trị hợp lệ.",
    "noFieldsConfiguredMessage": "Các trường không được cấu hình để chụp dữ liệu",
    "invalidSmallNumber": "Vui lòng nhập số nguyên",
    "invalidNumber": "Vui lòng nhập số nguyên",
    "invalidFloat": "Vui lòng nhập một số",
    "invalidDouble": "Vui lòng nhập một số",
    "requiredFields": "Vui lòng cung cấp giá trị cho tất cả các trường yêu cầu",
    "selectLocation": "Vui lòng chọn vị trí cho báo cáo của bạn",
    "numericRangeHintMessage": "${openStrong}Gợi ý:${closeStrong} Giá trị tối thiểu ${minValue} và Giá trị tối đa ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Gợi ý:${closeStrong} Ngày tối thiểu ${minValue} và Ngày tối đa ${maxValue}",
    "errorsInApplyEdits": "Đ_Values could not be submitted__________ớ.",
    "attachmentSelectedMsg": "(các) tệp đính kèm được chọn",
    "attachmentUploadStatus": "Không thể tải lên ${failed} trên ${total} tệp đính kèm",
    "geoLocationError": "Vị trí hiện tại không khả dụng",
    "geoLocationOutOfExtent": "Vị trí hiện tại ngoài phạm vi bản đồ nền",
    "submitButtonTooltip": "Gửi",
    "cancelButtonTooltip": "Hủy",
    "geoformBackButtonTooltip": "Đ_Return to the list______ớ",
    "locationSelectionHintForPointLayer": "Đ_Tap the map to draw the location___________ớ.",
    "locationSelectionHintForPolygonLayer": "Đ_Tap the map to draw the location. Double tap to complete the drawing______________________ớ.",
    "locationSelectionHintForPointLayerDesktop": "Đ_Click the map to draw the location____________ớ.",
    "locationSelectionHintForPolygonLayerDesktop": "Đ_Click the map to draw the location. Double click to complete the drawing_______________________ớ."
  },
  "locator": {
    "addressText": "Địa chỉ:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Vĩ độ/Kinh độ",
    "invalidSearch": "Không tìm thấy kết quả",
    "locatorPlaceholder": "Nhập địa chỉ để tìm kiếm",
    "locationOutOfExtent": "Đ_Location is outside the submission area_____________ớ",
    "searchButtonTooltip": "Tìm kiếm",
    "clearButtonTooltip": "Xóa giá trị tìm kiếm"
  },
  "myIssues": {
    "title": "Đ_My Submissions_____ớ",
    "myIssuesTooltip": "Đ_My Submissions_____ớ",
    "noResultsFound": "Đ_No submissions found_______ớ"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "Tôi đồng ý",
    "commentButtonLabel": "",
    "commentButtonTooltip": "Để lại câu trả lời",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Xem tài liệu đính kèm",
    "mapButtonLabel": "Xem trên Bản đồ",
    "mapButtonTooltip": "Đ_View the location of this submission____________ớ",
    "commentsListHeading": "Bình luận",
    "unableToUpdateVoteField": "Không thể tính bình chọn của bạn vào lúc này.",
    "gotoIssueListTooltip": "Đ_View the list of submissions_________ớ",
    "deleteMessage": "Bạn có chắc chắn muốn xóa không?"
  },
  "itemList": {
    "likesForThisItemTooltip": "Đ_Number of votes______ớ",
    "loadMoreButtonText": "Tải Thêm..."
  },
  "comment": {
    "commentsFormHeading": "Bình luận",
    "commentsFormSubmitButton": "Gửi bình luận",
    "commentsFormEditButton": "Cập nhật Bình luận",
    "commentsFormCancelButton": "Hủy",
    "errorInSubmittingComment": "Không thể gửi bình luận.",
    "emptyCommentMessage": "Vui lòng nhập bình luận.",
    "placeHolderText": "Nhập bình luận",
    "noCommentsAvailableText": "Không có bình luận",
    "remainingTextCount": "Còn ${0} ký tự",
    "showNoText": "Không",
    "selectAttachments": "Tệp đính kèm",
    "selectFileText": "Duyệt",
    "attachmentSelectedMsg": "(các) tệp đính kèm được chọn",
    "attachmentHeaderText": "Tệp đính kèm",
    "unknownCommentAttachment": "TỆP",
    "editRecordText": "Chỉnh sửa",
    "deleteRecordText": "Xóa",
    "deleteCommentFailedMessage": "Không thể xóa bình luận"
  },
  "gallery": {
    "galleryHeaderText": "Bộ sưu tập",
    "noAttachmentsAvailableText": "Không tìm thấy tệp đính kèm"
  }
});