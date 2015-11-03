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
            error: "无法创建地图",
            zoomInTooltip: "放大",  // Command button to zoom in to the map
            zoomOutTooltip: "缩小",  // Command button to zoom out of the map
            geolocationTooltip: "当前位置"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "未配置任何群组", // Shown when no group is configured in the configuration file
            submitReportButtonText: "提交报告", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "列表视图", // Go to List view tooltip text
            noFeatureGeomtery: "无法显示要素" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "以访客身份继续进行", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "或", // Or text on sign in screen
            signinOptionsText: "通过以下方式登录：", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "请登录", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "以访客身份登录", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "使用 Facebook 登录", // Command button to access the application via Facebook login
            twitterLoginTooltip: "使用 Twitter 登录", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "使用 Google+ 登录", // Command button to access the application via Google+ login
            agolLoginTooltip: "使用 ArcGIS 登录" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "所有者", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "创建日期", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "修改日期", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "描述", // Shown in the 'Map information' section describing the webmap
            snippet: "摘要", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "访问和使用限制", // Shown in the map information section indicating the webmap license information
            accessInformation: "制作者名单", // Shown in the 'Map information' section indicating account credits
            tags: "标签", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "查看次数", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "评级", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "已配置的群组无效，或者没有与该群组共享的任何项目。", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "地图信息" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "试_No features found______验", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "试_No features found near you_________验", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "试_Unable to complete operation_________验", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "转至主列表", // Tooltip for back icon in list header
            gotoMapViewTooltip: "地图视图" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "我的报告", // Command button shown in mobile menu list
            signIn: "登录", // Command button shown in mobile menu list and in appheader
            signOut: "登出", // Command button shown in mobile menu list
            signInTooltip: "登录", // Tooltip to 'Sign in' option
            signOutTooltip: "登出", // Tooltip  to 'Sign out' option
            myReportTooltip: "试_View my reports______验" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "详细信息", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "附件", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "浏览", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "位置", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "提交报告", // Command button to submit the geoform to report an issue
            cancelButton: "取消", //Command button to close the geoform
            requiredField: "(必填)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "选择&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "请输入有效值。", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "图层字段未被配置为捕获数据", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "请输入一个整数", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "请输入一个整数", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "请输入一个数字", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "请输入一个数字", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "请为所有必填字段填写值", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "请为您的报告选择位置", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}提示:${closeStrong} 最小值 ${minValue} 和最大值 ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}提示:${closeStrong} 最小日期 ${minValue} 和最大日期 ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "试_Report could not be submitted__________验", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "附件已选定", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} 个附件(共有 ${total} 个)上传失败", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "当前位置不可用",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "当前位置不在底图范围之内",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "提交报告", // Command button to open the geoform
            cancelButtonTooltip: "取消", //tooltip for cancel button
            geoformBackButtonTooltip: "转至报告列表" //tooltip for Geoform back button

        },
        locator: {
            addressText: "地址:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "纬度/经度", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "未找到任何结果", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "输入一个搜索地址", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "已找到的地址不在底图范围之内", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "搜索", // Tooltip for search button
            clearButtonTooltip: "清除搜索值" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "我的报告", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "我的报告", // Command button to access issues reported by the logged in user
            noResultsFound: "试_No reports found______验" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "赞", // Command button for up-voting a report
            likeButtonTooltip: "投票支持此报告",  // Tooltip for Like button
            commentButtonLabel: "评论", // Command button for submitting feedback
            commentButtonTooltip: "评论此报告", // Tooltip for Comment button
            galleryButtonLabel: "图库", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "参见随附文档", // Tooltip for command button shown in details panel
            mapButtonLabel: "在地图中查看", // Command button shown in details panel
            mapButtonTooltip: "查看此报告的位置", // Tooltip for Gallery button
            commentsListHeading: "评论", // List heading for Comments section in details panel
            unableToUpdateVoteField: "试_Your vote cannot be counted at this time_____________验.", // Error message for feature unable to update
            gotoIssueListTooltip: "转至报告列表" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "投票支持此报告", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "试_Load More_____验..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "提交评论",
            commentsFormCancelButton: "取消",
            errorInSubmittingComment: "无法提交评论。", // Shown when user is unable to add comments
            emptyCommentMessage: "请输入一条评论。", // Shown when user submits a comment without any text/character
            placeHolderText: "输入一条评论", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "没有任何评论可用", // Shown when no comments are available for the selected issue
            remainingTextCount: "剩余 ${0} 个字符", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "否" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "图库",
            noAttachmentsAvailableText: "未找到任何附件" // Shown when no comments are available for the selected issue
        }
    })
);
