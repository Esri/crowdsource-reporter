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
            error: "無法建立地圖",
            zoomInTooltip: "放大",  // Command button to zoom in to the map
            zoomOutTooltip: "縮小",  // Command button to zoom out of the map
            geolocationTooltip: "目前位置"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "未配置任何群組", // Shown when no group is configured in the configuration file
            submitReportButtonText: "提交報告", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "清單視圖", // Go to List view tooltip text
            noFeatureGeomtery: "無法顯示圖徵" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "以訪客身份繼續進行", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Or(R)", // Or text on sign in screen
            signinOptionsText: "透過以下方式登入：", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "請登入", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "以訪客身份登入", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "使用 Facebook 登入", // Command button to access the application via Facebook login
            twitterLoginTooltip: "使用 Twitter 登入", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "使用 Google+ 登入", // Command button to access the application via Google+ login
            agolLoginTooltip: "使用 ArcGIS 登入" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "擁有者", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "建立日期", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "修改日期", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "描述", // Shown in the 'Map information' section describing the webmap
            snippet: "摘要(S)", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "存取和使用限制", // Shown in the map information section indicating the webmap license information
            accessInformation: "點數", // Shown in the 'Map information' section indicating account credits
            tags: "標記", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "視圖數量", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "評級次數", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "已配置的群組無效，或者沒有與該群組共用的任何項目。", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "地圖資訊" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "試_No features found______驗", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "試_No features found near you_________驗", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "試_Unable to complete operation_________驗", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "轉至主清單", // Tooltip for back icon in list header
            gotoMapViewTooltip: "地圖視圖" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "我的報告", // Command button shown in mobile menu list
            signIn: "登入", // Command button shown in mobile menu list and in appheader
            signOut: "登出", // Command button shown in mobile menu list
            signInTooltip: "登入", // Tooltip to 'Sign in' option
            signOutTooltip: "登出", // Tooltip  to 'Sign out' option
            myReportTooltip: "試_View my reports______驗" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "詳細資訊", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "附件(A)", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "瀏覽(B)", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "位置", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "進行報告", // Command button to submit the geoform to report an issue
            cancelButton: "取消", //Command button to close the geoform
            requiredField: "(必填)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "選擇&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "請輸入有效值。", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "圖層欄位未被配置為擷取資料", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "請輸入一個整數", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "請輸入一個整數", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "請輸入一個數字", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "請輸入一個數字", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "請為所有必填欄位填寫值", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "請為您的報告選擇位置", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}提示:${closeStrong} 最小值 ${minValue} 和最大值 ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}提示:${closeStrong} 最小日期 ${minValue} 和最大日期 ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "試_Report could not be submitted__________驗", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "已選定附件", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} 個附件（共有 ${total} 個）上傳失敗", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "目前位置不可用",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "目前位置不在底圖範圍之內",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "進行報告", // Command button to open the geoform
            cancelButtonTooltip: "取消", //tooltip for cancel button
            geoformBackButtonTooltip: "轉至報告清單" //tooltip for Geoform back button

        },
        locator: {
            addressText: "地址(E):", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "緯度/經度", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "未找到任何結果", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "輸入一個搜尋位址", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "已找到的地址不在底圖範圍之內", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "搜尋", // Tooltip for search button
            clearButtonTooltip: "清除搜尋值" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "我的報告", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "我的報告", // Command button to access issues reported by the logged in user
            noResultsFound: "試_No reports found______驗" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Like(K)", // Command button for up-voting a report
            likeButtonTooltip: "為此報告投票",  // Tooltip for Like button
            commentButtonLabel: "評論", // Command button for submitting feedback
            commentButtonTooltip: "評論此報告", // Tooltip for Comment button
            galleryButtonLabel: "圖庫", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "參閱隨附的說明文件", // Tooltip for command button shown in details panel
            mapButtonLabel: "檢視地圖", // Command button shown in details panel
            mapButtonTooltip: "檢視此報告的位置", // Tooltip for Gallery button
            commentsListHeading: "評論", // List heading for Comments section in details panel
            unableToUpdateVoteField: "試_Your vote cannot be counted at this time_____________驗.", // Error message for feature unable to update
            gotoIssueListTooltip: "轉至報告清單" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "為此報告投票", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "試_Load More_____驗..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "提交評論",
            commentsFormCancelButton: "取消",
            errorInSubmittingComment: "無法提交評論。", // Shown when user is unable to add comments
            emptyCommentMessage: "請輸入一條評論。", // Shown when user submits a comment without any text/character
            placeHolderText: "輸入一條評論", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "沒有任何評論可用", // Shown when no comments are available for the selected issue
            remainingTextCount: "剩餘 ${0} 個字元", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "否(N)" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "圖庫",
            noAttachmentsAvailableText: "未找到任何附件" // Shown when no comments are available for the selected issue
        }
    })
);
