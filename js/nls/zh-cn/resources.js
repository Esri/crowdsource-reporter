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
    "error": "无法创建地图",
    "zoomInTooltip": "放大",
    "zoomOutTooltip": "缩小",
    "geolocationTooltip": "当前位置"
  },
  "main": {
    "noGroup": "未配置任何群组",
    "submitReportButtonText": "提交报告",
    "gotoListViewTooltip": "列表视图",
    "noFeatureGeomtery": "无法显示要素",
    "featureOutsideAOIMessage": "无法向研究区域外添加要素",
    "noEditingPermissionsMessage": "您无权执行此操作。",
    "basemapGalleryText": "底图库",
    "legendText": "图例"
  },
  "signin": {
    "guestSigninText": "以访客身份继续进行",
    "signInOrText": "或",
    "signinOptionsText": "通过以下方式登录：",
    "noGroupNameText": "请登录",
    "guestLoginTooltip": "以访客身份登录",
    "facebookLoginTooltip": "使用 Facebook 登录",
    "twitterLoginTooltip": "使用 Twitter 登录",
    "googlePlusLoginTooltip": "使用 Google+ 登录",
    "agolLoginTooltip": "使用 ArcGIS 登录"
  },
  "webMapList": {
    "owner": "所有者",
    "created": "创建日期",
    "modified": "修改日期",
    "description": "描述",
    "snippet": "摘要",
    "licenseInfo": "访问和使用限制",
    "accessInformation": "制作者名单",
    "tags": "标签",
    "numViews": "查看次数",
    "avgRating": "评级",
    "noWebMapInGroup": "已配置的群组无效，或者没有与该群组共享的任何项目。",
    "infoBtnToolTip": "地图信息"
  },
  "issueWall": {
    "noResultsFound": "未找到要素",
    "noResultsFoundInCurrentBuffer": "在您附近未找到要素",
    "unableToFetchFeatureError": "无法完成操作",
    "gotoWebmapListTooltip": "转至主列表",
    "gotoMapViewTooltip": "地图视图"
  },
  "appHeader": {
    "myReport": "我的提交内容",
    "signIn": "登录",
    "signOut": "登出",
    "signInTooltip": "登录",
    "signOutTooltip": "登出",
    "myReportTooltip": "查看我的提交内容"
  },
  "geoform": {
    "enterInformation": "详细信息",
    "selectAttachments": "附件",
    "selectFileText": "浏览",
    "enterLocation": "位置",
    "reportItButton": "提交报告",
    "editReportButton": "更新",
    "cancelButton": "取消",
    "requiredField": "(必填)",
    "selectDefaultText": "选择&hellip;",
    "invalidInputValue": "请输入有效值。",
    "noFieldsConfiguredMessage": "图层字段未被配置为捕获数据",
    "invalidSmallNumber": "请输入一个整数",
    "invalidNumber": "请输入一个整数",
    "invalidFloat": "请输入一个数字",
    "invalidDouble": "请输入一个数字",
    "requiredFields": "请为所有必填字段填写值",
    "selectLocation": "请为您的报告选择位置",
    "numericRangeHintMessage": "${openStrong}提示:${closeStrong} 最小值 ${minValue} 和最大值 ${maxValue}",
    "dateRangeHintMessage": "${openStrong}提示:${closeStrong} 最小日期 ${minValue} 和最大日期 ${maxValue}",
    "errorsInApplyEdits": "无法提交值。",
    "attachmentSelectedMsg": "附件已选定",
    "attachmentUploadStatus": "${failed} 个附件(共有 ${total} 个)上传失败",
    "geoLocationError": "当前位置不可用",
    "geoLocationOutOfExtent": "当前位置不在底图范围之内",
    "submitButtonTooltip": "提交",
    "cancelButtonTooltip": "取消",
    "geoformBackButtonTooltip": "返回列表",
    "locationSelectionHintForPointLayer": "点击地图以绘制位置。",
    "locationSelectionHintForPolygonLayer": "点击地图以绘制位置。双击以完成绘制。",
    "locationSelectionHintForPointLayerDesktop": "单击地图以绘制位置。",
    "locationSelectionHintForPolygonLayerDesktop": "单击地图以绘制位置。双击以完成绘制。"
  },
  "locator": {
    "addressText": "地址:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "纬度/经度",
    "invalidSearch": "未找到任何结果",
    "locatorPlaceholder": "输入一个搜索地址",
    "locationOutOfExtent": "位置位于提交范围外",
    "searchButtonTooltip": "搜索",
    "clearButtonTooltip": "清除搜索值"
  },
  "myIssues": {
    "title": "我的提交内容",
    "myIssuesTooltip": "我的提交内容",
    "noResultsFound": "找不到提交内容"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "我同意",
    "commentButtonLabel": "",
    "commentButtonTooltip": "回复",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "参见随附文档",
    "mapButtonLabel": "在地图中查看",
    "mapButtonTooltip": "查看此提交内容的位置",
    "commentsListHeading": "评论",
    "unableToUpdateVoteField": "目前无法计数您的投票。",
    "gotoIssueListTooltip": "查看提交内容列表",
    "deleteMessage": "是否确定删除?"
  },
  "itemList": {
    "likesForThisItemTooltip": "投票数",
    "loadMoreButtonText": "加载更多..."
  },
  "comment": {
    "commentsFormHeading": "评论",
    "commentsFormSubmitButton": "提交评论",
    "commentsFormEditButton": "更新评论",
    "commentsFormCancelButton": "取消",
    "errorInSubmittingComment": "无法提交评论。",
    "emptyCommentMessage": "请输入一条评论。",
    "placeHolderText": "输入一条评论",
    "noCommentsAvailableText": "没有任何评论可用",
    "remainingTextCount": "剩余 ${0} 个字符",
    "showNoText": "否",
    "selectAttachments": "附件",
    "selectFileText": "浏览",
    "attachmentSelectedMsg": "附件已选定",
    "attachmentHeaderText": "附件",
    "unknownCommentAttachment": "文件",
    "editRecordText": "编辑",
    "deleteRecordText": "删除",
    "deleteCommentFailedMessage": "无法删除评论"
  },
  "gallery": {
    "galleryHeaderText": "图库",
    "noAttachmentsAvailableText": "未找到任何附件"
  }
});