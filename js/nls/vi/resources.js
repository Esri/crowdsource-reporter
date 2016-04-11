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
            error: "Không thể tạo bản đồ",
            zoomInTooltip: "Thu nhỏ",  // Command button to zoom in to the map
            zoomOutTooltip: "Phóng to",  // Command button to zoom out of the map
            geolocationTooltip: "Vị trí hiện tại"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Không có nhóm nào được cấu hình", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Đ_Submit a Report______ớ", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Chế độ xem dạng danh sách", // Go to List view tooltip text
            noFeatureGeomtery: "Không thể hiển thị đối tượng" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Tiến hành dưới dạng Khách", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Hoặc", // Or text on sign in screen
            signinOptionsText: "Đăng nhập bằng:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Vui lòng đăng nhập", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Đăng nhập với vai trò khách", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Đăng nhập bằng Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Đăng nhập bằng Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Đăng nhập bằng Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Đăng nhập bằng ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Chủ sở hữu", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Ngày tạo", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Ngày sửa đổi", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Mô tả", // Shown in the 'Map information' section describing the webmap
            snippet: "Tóm tắt", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Những ràng buộc về Truy cập và Sử dụng", // Shown in the map information section indicating the webmap license information
            accessInformation: "Service Credits", // Shown in the 'Map information' section indicating account credits
            tags: "Từ khóa", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Số lần xem", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Xếp loại", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Nhóm được cấu hình không hợp lệ hoặc vẫn chưa có mục nào được chia sẻ với nhóm này.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Thông tin bản đồ" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Không tìm thấy đối tượng", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Không tìm thấy đối tượng gần bạn", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Không thể hoàn thành hoạt động", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Đến danh sách chính", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Chế độ xem bản đồ" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Báo cáo của tôi", // Command button shown in mobile menu list
            signIn: "Đăng nhập", // Command button shown in mobile menu list and in appheader
            signOut: "Đăng xuất", // Command button shown in mobile menu list
            signInTooltip: "Đăng nhập", // Tooltip to 'Sign in' option
            signOutTooltip: "Đăng xuất", // Tooltip  to 'Sign out' option
            myReportTooltip: "Xem báo cáo của tôi" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Chi tiết", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Tệp đính kèm", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Duyệt", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Vị trí", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Báo cáo Nó", // Command button to submit the geoform to report an issue
            cancelButton: "Hủy", //Command button to close the geoform
            requiredField: "(bắt buộc)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Chọn&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Vui lòng nhập giá trị hợp lệ.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Các trường không được cấu hình để chụp dữ liệu", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Vui lòng nhập số nguyên", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Vui lòng nhập số nguyên", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Vui lòng nhập một số", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Vui lòng nhập một số", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Vui lòng cung cấp giá trị cho tất cả các trường yêu cầu", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Vui lòng chọn vị trí cho báo cáo của bạn", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Gợi ý:${closeStrong} Giá trị tối thiểu ${minValue} và Giá trị tối đa ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Gợi ý:${closeStrong} Ngày tối thiểu ${minValue} và Ngày tối đa ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Không thể gửi báo cáo", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "(các) tệp đính kèm được chọn", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "Không thể tải lên ${failed} trên ${total} tệp đính kèm", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Vị trí hiện tại không khả dụng",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Vị trí hiện tại ngoài phạm vi bản đồ nền",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Đ_Submit___ớ", // Command button to open the geoform
            cancelButtonTooltip: "Hủy", //tooltip for cancel button
            geoformBackButtonTooltip: "Đ_Return to the report list_________ớ" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Địa chỉ:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Vĩ độ/Kinh độ", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Không tìm thấy kết quả", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Nhập địa chỉ để tìm kiếm", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Địa chỉ được định vị ngoài phạm vi bản đồ nền", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Tìm kiếm", // Tooltip for search button
            clearButtonTooltip: "Xóa giá trị tìm kiếm" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Các báo cáo của tôi", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Các báo cáo của tôi", // Command button to access issues reported by the logged in user
            noResultsFound: "Không tìm thấy báo cáo" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Đ_Vote__ớ", // Command button for up-voting a report
            likeButtonTooltip: "Bình chọn cho báo cáo này",  // Tooltip for Like button
            commentButtonLabel: "Bình luận", // Command button for submitting feedback
            commentButtonTooltip: "Bình luận về báo cáo này", // Tooltip for Comment button
            galleryButtonLabel: "Bộ sưu tập", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Xem tài liệu đính kèm", // Tooltip for command button shown in details panel
            mapButtonLabel: "Xem trên Bản đồ", // Command button shown in details panel
            mapButtonTooltip: "Xem vị trí của báo cáo này", // Tooltip for Gallery button
            commentsListHeading: "Bình luận", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Không thể tính bình chọn của bạn vào lúc này.", // Error message for feature unable to update
            gotoIssueListTooltip: "Đến danh sách báo cáo" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Các bình chọn cho báo cáo này", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Tải Thêm..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Gửi bình luận",
            commentsFormCancelButton: "Hủy",
            errorInSubmittingComment: "Không thể gửi bình luận.", // Shown when user is unable to add comments
            emptyCommentMessage: "Vui lòng nhập bình luận.", // Shown when user submits a comment without any text/character
            placeHolderText: "Nhập bình luận", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Không có bình luận", // Shown when no comments are available for the selected issue
            remainingTextCount: "Còn ${0} ký tự", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Không" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Bộ sưu tập",
            noAttachmentsAvailableText: "Không tìm thấy tệp đính kèm" // Shown when no comments are available for the selected issue
        }
    })
);
