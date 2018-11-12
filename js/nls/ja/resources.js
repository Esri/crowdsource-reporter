﻿/*global define */
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
    "error": "マップを作成できません",
    "licenseError": {
      "message": "須_Your account is not licensed to use Configurable Apps that are not public. Please ask your organization administrator to assign you a user type that includes Essential Apps or an add-on Essential Apps license__________________________________________________________________________________________________________鷗.",
      "title": "須_Not Licensed_____________鷗"
    },
    "zoomInTooltip": "拡大",
    "zoomOutTooltip": "縮小",
    "geolocationTooltip": "現在の位置"
  },
  "main": {
    "noGroup": "グループが構成されていません",
    "submitReportButtonText": "レポートの送信",
    "gotoListViewTooltip": "リスト ビュー",
    "noFeatureGeomtery": "フィーチャを表示できません",
    "featureOutsideAOIMessage": "フィーチャを分析範囲外に追加することはできません",
    "noEditingPermissionsMessage": "この操作を実行する権限がありません。",
    "basemapGalleryText": "ベースマップ ギャラリー",
    "basemapThumbnailAltText": "須_Click to load ${basemapTitle} ${index} of ${totalBasemaps}______________________________鷗",
    "legendText": "凡例",
    "featureNotFoundMessage": "須_Requested feature not found____________________________鷗",
    "backButton": "須_back_________鷗",
    "panelCloseButton": "須_Close___________鷗"
  },
  "signin": {
    "guestSigninText": "ゲストとして続行",
    "signInOrText": "または",
    "signinOptionsText": "次を使用してサイン インします:",
    "noGroupNameText": "サイン インしてください",
    "guestLoginTooltip": "ゲストとしてサイン イン",
    "facebookLoginTooltip": "Facebook を使用してサイン イン",
    "twitterLoginTooltip": "Twitter を使用してサイン イン",
    "googlePlusLoginTooltip": "Google+ を使用してサイン イン",
    "agolLoginTooltip": "ArcGIS を使用してサイン イン"
  },
  "webMapList": {
    "owner": "所有者",
    "created": "作成日",
    "modified": "更新日",
    "description": "説明",
    "snippet": "サマリー",
    "licenseInfo": "アクセスと使用の制限",
    "accessInformation": "著作権",
    "tags": "タグ",
    "numViews": "ビュー数",
    "avgRating": "評価",
    "noWebMapInGroup": "構成済みのグループが無効であるか、アイテムがこのグループと共有されていません。",
    "infoBtnToolTip": "マップ情報"
  },
  "issueWall": {
    "noResultsFound": "フィーチャが見つかりません",
    "noResultsFoundInCurrentBuffer": "近くにフィーチャは見つかりませんでした",
    "unableToFetchFeatureError": "操作を完了できません",
    "gotoWebmapListTooltip": "メイン リストへ移動",
    "gotoMapViewTooltip": "マップ ビュー"
  },
  "appHeader": {
    "help": "須_Help_________鷗",
    "myReport": "送信内容",
    "signIn": "サイン イン",
    "signOut": "サイン アウト",
    "signInTooltip": "サイン イン",
    "signOutTooltip": "サイン アウト",
    "myReportTooltip": "送信内容の表示",
    "share": "須_Share___________鷗",
    "shareDialogTitle": "須_Share Dialog_____________鷗",
    "shareDialogAppURLLabel": "須_Application URL________________鷗",
    "mobileHamburger": "須_Hamburger___________________鷗"
  },
  "geoform": {
    "enterInformation": "詳細",
    "selectAttachments": "添付ファイル",
    "selectFileText": "参照",
    "enterLocation": "場所",
    "reportItButton": "レポートする",
    "editReportButton": "更新",
    "cancelButton": "キャンセル",
    "requiredField": "(必須)",
    "selectDefaultText": "選択&hellip;",
    "invalidInputValue": "有効な値を入力してください。",
    "noFieldsConfiguredMessage": "レイヤー フィールドがデータを取得するように構成されていません",
    "invalidSmallNumber": "整数を入力してください",
    "invalidNumber": "整数を入力してください",
    "invalidFloat": "数字を入力してください",
    "invalidDouble": "数字を入力してください",
    "requiredFields": "すべての必須フィールドに値を指定してください",
    "selectLocation": "レポート対象の位置を選択してください",
    "numericRangeHintMessage": "${openStrong}ヒント:${closeStrong} 最小値 ${minValue} および最大値 ${maxValue}",
    "dateRangeHintMessage": "${openStrong}ヒント:${closeStrong} 最小日付 ${minValue} および最大日付 ${maxValue}",
    "errorsInApplyEdits": "値を送信できませんでした。",
    "attachmentSelectedMsg": "添付ファイルが選択されています",
    "attachmentUploadStatus": "${total} 件のうち、${failed} 件の添付ファイルをアップロードできませんでした",
    "geoLocationError": "現在の位置は利用できません",
    "geoLocationOutOfExtent": "現在の位置はベースマップの範囲外です",
    "submitButtonTooltip": "送信",
    "cancelButtonTooltip": "キャンセル",
    "geoformBackButtonTooltip": "リストに戻る",
    "locationSelectionHintForPointLayer": "マップをタップして、場所を描画します。",
    "locationSelectionHintForPolygonLayer": "マップをタップして、場所を描画します。描画を完了するにはダブル タップします。",
    "locationSelectionHintForPointLayerDesktop": "マップをクリックして、場所を描画します。",
    "locationSelectionHintForPolygonLayerDesktop": "マップをクリックして、場所を描画します。描画を完了するにはダブル クリックします。",
    "locationDialogTitle": "須_Select location for report___________________________鷗",
    "locationDialogContent": "須_Are you sure you want to use image location________________________鷗 ?",
    "errorMessageText": "須_${message} for field ${fieldName}__________________鷗",
    "deleteAttachmentBtnText": "須_Delete attachment__________________鷗"
  },
  "locator": {
    "addressText": "住所:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "緯度/経度",
    "invalidSearch": "結果が見つかりませんでした",
    "locatorPlaceholder": "検索する住所を入力してください",
    "locationOutOfExtent": "場所が送信エリアの外にあります。",
    "searchButtonTooltip": "検索",
    "clearButtonTooltip": "検索値のクリア"
  },
  "myIssues": {
    "title": "送信内容",
    "myIssuesTooltip": "送信内容",
    "noResultsFound": "送信内容が見つかりません"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "同意します",
    "commentButtonLabel": "",
    "commentButtonTooltip": "返信を残す",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "添付したドキュメントを参照",
    "mapButtonLabel": "マップ上で表示",
    "mapButtonTooltip": "この送信の場所を表示",
    "commentsListHeading": "コメント",
    "unableToUpdateVoteField": "この時点では投票をカウントできません。",
    "gotoIssueListTooltip": "送信のリストを表示",
    "deleteMessage": "本当に削除してよろしいですか？"
  },
  "itemList": {
    "likesForThisItemTooltip": "投票数",
    "loadMoreButtonText": "さらに読み込み..."
  },
  "comment": {
    "commentsFormHeading": "コメント",
    "commentsFormSubmitButton": "コメントの送信",
    "commentsFormEditButton": "コメントの更新",
    "commentsFormCancelButton": "キャンセル",
    "errorInSubmittingComment": "コメントを送信できませんでした。",
    "commentSubmittedMessage": "須_Thank you for your feedback_____________________________鷗.",
    "emptyCommentMessage": "コメントを入力してください。",
    "placeHolderText": "コメントの入力",
    "noCommentsAvailableText": "コメントがありません",
    "remainingTextCount": "${0} 文字が残っています",
    "showNoText": "なし",
    "selectAttachments": "添付ファイル",
    "selectFileText": "参照",
    "attachmentSelectedMsg": "添付ファイルが選択されています",
    "attachmentHeaderText": "添付ファイル",
    "unknownCommentAttachment": "ファイル",
    "editRecordText": "編集",
    "deleteRecordText": "削除",
    "deleteCommentFailedMessage": "コメントを削除できません"
  },
  "gallery": {
    "galleryHeaderText": "ギャラリー",
    "noAttachmentsAvailableText": "添付ファイルがありません"
  },
  "dialog": {
    "okButton": "須_Ok_____鷗",
    "cancelButton": "須_Cancel_____________鷗",
    "yesButton": "須_Yes_______鷗",
    "noButton": "須_No_____鷗"
  }
});