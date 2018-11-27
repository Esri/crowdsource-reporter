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
    "licenseError": {
      "message": "Tài khoản của bạn không được cấp phép để sử dụng Ứng dụng có thể cấu hình mà không được công khai. Vui lòng yêu cầu quản trị viên của tổ chức bạn gán cho bạn loại người dùng nào có bao gồm các ứng dụng thiết yếu hoặc có giấy phép sử dụng các ứng dụng thiết yếu bổ trợ.",
      "title": "Không được cấp phép"
    },
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
    "noEditingPermissionsMessage": "Bạn không có quyền thực hiện thao tác này.",
    "basemapGalleryText": "Bộ sưu tập bản đồ nền",
    "basemapThumbnailAltText": "Bấm để tải ${basemapTitle} ${index} trong số ${totalBasemaps}",
    "legendText": "Chú giải",
    "featureNotFoundMessage": "Không tìm thấy đối tượng được yêu cầu",
    "backButton": "quay lại",
    "panelCloseButton": "Đóng"
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
    "help": "Trợ giúp",
    "myReport": "Đệ trình của tôi",
    "signIn": "Đăng nhập",
    "signOut": "Đăng xuất",
    "signInTooltip": "Đăng nhập",
    "signOutTooltip": "Đăng xuất",
    "myReportTooltip": "Xem các đệ trình của tôi",
    "share": "Chia sẻ",
    "shareDialogTitle": "Hộp thoại Chia sẻ",
    "shareDialogAppURLLabel": "URL Ứng dụng",
    "mobileHamburger": "Hamburger"
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
    "errorsInApplyEdits": "Không thể gửi các giá trị.",
    "attachmentSelectedMsg": "(các) tệp đính kèm được chọn",
    "attachmentUploadStatus": "Không thể tải lên ${failed} trên ${total} tệp đính kèm",
    "geoLocationError": "Vị trí hiện tại không khả dụng",
    "geoLocationOutOfExtent": "Vị trí hiện tại ngoài phạm vi bản đồ nền",
    "submitButtonTooltip": "Gửi",
    "cancelButtonTooltip": "Hủy",
    "geoformBackButtonTooltip": "Quay lại danh sách",
    "locationSelectionHintForPointLayer": "Chạm vào bản đồ để vẽ vị trí.",
    "locationSelectionHintForPolygonLayer": "Chạm vào bản đồ để vẽ vị trí. Chạm hai lần để hoàn thành bản vẽ.",
    "locationSelectionHintForPointLayerDesktop": "Nhấp vào bản đồ để vẽ vị trí.",
    "locationSelectionHintForPolygonLayerDesktop": "Nhấp vào bản đồ để vẽ vị trí. Nhấp đúp để hoàn thành bản vẽ.",
    "locationDialogTitle": "Chọn vị trí để báo cáo",
    "locationDialogContent": "Bạn có chắc chắn muốn sử dụng thông tin vị trí của hình ảnh không?",
    "errorMessageText": "${message} cho trường ${fieldName}",
    "deleteAttachmentBtnText": "Xóa tệp đính kèm"
  },
  "locator": {
    "addressText": "Địa chỉ:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Vĩ độ/Kinh độ",
    "invalidSearch": "Không tìm thấy kết quả",
    "locatorPlaceholder": "Nhập địa chỉ để tìm kiếm",
    "locationOutOfExtent": "Vị trí nằm bên ngoài khu vực đệ trình",
    "searchButtonTooltip": "Tìm kiếm",
    "clearButtonTooltip": "Xóa giá trị tìm kiếm"
  },
  "myIssues": {
    "title": "Đệ trình của tôi",
    "myIssuesTooltip": "Đệ trình của tôi",
    "noResultsFound": "Không tìm thấy đệ trình nào"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "Tôi đồng ý",
    "commentButtonLabel": "",
    "commentButtonTooltip": "Để lại câu trả lời",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Xem tài liệu đính kèm",
    "mapButtonLabel": "Xem trên Bản đồ",
    "mapButtonTooltip": "Xem vị trí của đệ trình này",
    "commentsListHeading": "Bình luận",
    "unableToUpdateVoteField": "Không thể tính bình chọn của bạn vào lúc này.",
    "gotoIssueListTooltip": "Xem danh sách đệ trình",
    "deleteMessage": "Bạn có chắc chắn muốn xóa không?"
  },
  "itemList": {
    "likesForThisItemTooltip": "Số lượng phiếu bầu",
    "loadMoreButtonText": "Tải Thêm..."
  },
  "comment": {
    "commentsFormHeading": "Bình luận",
    "commentsFormSubmitButton": "Gửi bình luận",
    "commentsFormEditButton": "Cập nhật Bình luận",
    "commentsFormCancelButton": "Hủy",
    "errorInSubmittingComment": "Không thể gửi bình luận.",
    "commentSubmittedMessage": "Cảm ơn bạn đã phản hồi.",
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
  },
  "dialog": {
    "okButton": "Ok",
    "cancelButton": "Hủy",
    "yesButton": "Có",
    "noButton": "Không"
  }
});