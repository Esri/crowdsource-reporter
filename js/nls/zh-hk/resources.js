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
    "error": "無法建立地圖",
    "zoomInTooltip": "放大",
    "zoomOutTooltip": "縮小",
    "geolocationTooltip": "目前位置"
  },
  "main": {
    "noGroup": "未配置任何群組",
    "submitReportButtonText": "試_Submit a Report______驗",
    "gotoListViewTooltip": "清單視圖",
    "noFeatureGeomtery": "無法顯示圖徵"
  },
  "signin": {
    "guestSigninText": "以訪客身份繼續進行",
    "signInOrText": "Or(R)",
    "signinOptionsText": "透過以下方式登入：",
    "noGroupNameText": "請登入",
    "guestLoginTooltip": "以訪客身份登入",
    "facebookLoginTooltip": "使用 Facebook 登入",
    "twitterLoginTooltip": "使用 Twitter 登入",
    "googlePlusLoginTooltip": "使用 Google+ 登入",
    "agolLoginTooltip": "使用 ArcGIS 登入"
  },
  "webMapList": {
    "owner": "擁有者",
    "created": "建立日期",
    "modified": "修改日期",
    "description": "描述",
    "snippet": "摘要(S)",
    "licenseInfo": "存取和使用限制",
    "accessInformation": "點數",
    "tags": "標記",
    "numViews": "視圖數量",
    "avgRating": "評級次數",
    "noWebMapInGroup": "已配置的群組無效，或者沒有與該群組共用的任何項目。",
    "infoBtnToolTip": "地圖資訊"
  },
  "issueWall": {
    "noResultsFound": "找不到圖徵",
    "noResultsFoundInCurrentBuffer": "找不到您附近的圖徵",
    "unableToFetchFeatureError": "無法完成操作",
    "gotoWebmapListTooltip": "轉至主清單",
    "gotoMapViewTooltip": "地圖視圖"
  },
  "appHeader": {
    "myReport": "我的報告",
    "signIn": "登入",
    "signOut": "登出",
    "signInTooltip": "登入",
    "signOutTooltip": "登出",
    "myReportTooltip": "檢視我的報告"
  },
  "geoform": {
    "enterInformation": "詳細資訊",
    "selectAttachments": "附件(A)",
    "selectFileText": "瀏覽(B)",
    "enterLocation": "位置",
    "reportItButton": "進行報告",
    "cancelButton": "取消",
    "requiredField": "(必填)",
    "selectDefaultText": "選擇&hellip;",
    "invalidInputValue": "請輸入有效值。",
    "noFieldsConfiguredMessage": "圖層欄位未被配置為擷取資料",
    "invalidSmallNumber": "請輸入一個整數",
    "invalidNumber": "請輸入一個整數",
    "invalidFloat": "請輸入一個數字",
    "invalidDouble": "請輸入一個數字",
    "requiredFields": "請為所有必填欄位填寫值",
    "selectLocation": "請為您的報告選擇位置",
    "numericRangeHintMessage": "${openStrong}提示:${closeStrong} 最小值 ${minValue} 和最大值 ${maxValue}",
    "dateRangeHintMessage": "${openStrong}提示:${closeStrong} 最小日期 ${minValue} 和最大日期 ${maxValue}",
    "errorsInApplyEdits": "無法提交報告",
    "attachmentSelectedMsg": "已選定附件",
    "attachmentUploadStatus": "${failed} 個附件（共有 ${total} 個）上傳失敗",
    "geoLocationError": "目前位置不可用",
    "geoLocationOutOfExtent": "目前位置不在底圖範圍之內",
    "submitButtonTooltip": "試_Submit___驗",
    "cancelButtonTooltip": "取消",
    "geoformBackButtonTooltip": "試_Return to the report list_________驗"
  },
  "locator": {
    "addressText": "地址(E):",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "緯度/經度",
    "invalidSearch": "未找到任何結果",
    "locatorPlaceholder": "輸入一個搜尋位址",
    "locationOutOfExtent": "已找到的地址不在底圖範圍之內",
    "searchButtonTooltip": "搜尋",
    "clearButtonTooltip": "清除搜尋值"
  },
  "myIssues": {
    "title": "我的報告",
    "myIssuesTooltip": "我的報告",
    "noResultsFound": "未找到任何報告"
  },
  "itemDetails": {
    "likeButtonLabel": "試_Vote__驗",
    "likeButtonTooltip": "為此報告投票",
    "commentButtonLabel": "評論",
    "commentButtonTooltip": "評論此報告",
    "galleryButtonLabel": "圖庫",
    "galleryButtonTooltip": "參閱隨附的說明文件",
    "mapButtonLabel": "檢視地圖",
    "mapButtonTooltip": "檢視此報告的位置",
    "commentsListHeading": "評論",
    "unableToUpdateVoteField": "您的投票此時無法進行計數。",
    "gotoIssueListTooltip": "轉至報告清單"
  },
  "itemList": {
    "likesForThisItemTooltip": "為此報告投票",
    "loadMoreButtonText": "載入更多..."
  },
  "comment": {
    "commentsFormSubmitButton": "提交評論",
    "commentsFormCancelButton": "取消",
    "errorInSubmittingComment": "無法提交評論。",
    "emptyCommentMessage": "請輸入一條評論。",
    "placeHolderText": "輸入一條評論",
    "noCommentsAvailableText": "沒有任何評論可用",
    "remainingTextCount": "剩餘 ${0} 個字元",
    "showNoText": "否(N)"
  },
  "gallery": {
    "galleryHeaderText": "圖庫",
    "noAttachmentsAvailableText": "未找到任何附件"
  }
});