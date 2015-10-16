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
            error: "マップを作成できません",
            zoomInTooltip: "拡大",  // Command button to zoom in to the map
            zoomOutTooltip: "縮小",  // Command button to zoom out of the map
            geolocationTooltip: "現在の位置"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "グループが構成されていません", // Shown when no group is configured in the configuration file
            submitReportButtonText: "レポートの送信", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "リスト ビュー", // Go to List view tooltip text
            noFeatureGeomtery: "フィーチャを表示できません" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "ゲストとして続行", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "または", // Or text on sign in screen
            signinOptionsText: "次を使用してサイン インします:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "サイン インしてください", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "ゲストとしてサイン イン", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Facebook を使用してサイン イン", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Twitter を使用してサイン イン", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Google+ を使用してサイン イン", // Command button to access the application via Google+ login
            agolLoginTooltip: "ArcGIS を使用してサイン イン" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "所有者", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "作成日", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "更新日", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "説明", // Shown in the 'Map information' section describing the webmap
            snippet: "サマリー", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "アクセスと使用の制限", // Shown in the map information section indicating the webmap license information
            accessInformation: "著作権", // Shown in the 'Map information' section indicating account credits
            tags: "タグ", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "ビュー数", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "評価", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "構成済みのグループが無効であるか、アイテムがこのグループと共有されていません。", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "マップ情報" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "須_No features found______鷗", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "須_No features found near you_________鷗", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "須_Unable to complete operation_________鷗", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "メイン リストへ移動", // Tooltip for back icon in list header
            gotoMapViewTooltip: "マップ ビュー" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "マイ レポート", // Command button shown in mobile menu list
            signIn: "サイン イン", // Command button shown in mobile menu list and in appheader
            signOut: "サイン アウト", // Command button shown in mobile menu list
            signInTooltip: "サイン イン", // Tooltip to 'Sign in' option
            signOutTooltip: "サイン アウト", // Tooltip  to 'Sign out' option
            myReportTooltip: "須_View my reports______鷗" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "詳細", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "添付ファイル", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "参照", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "場所", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "レポートする", // Command button to submit the geoform to report an issue
            cancelButton: "キャンセル", //Command button to close the geoform
            requiredField: "(必須)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "選択&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "有効な値を入力してください。", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "レイヤー フィールドがデータを取得するように構成されていません", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "整数を入力してください", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "整数を入力してください", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "数字を入力してください", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "数字を入力してください", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "すべての必須フィールドに値を指定してください", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "レポート対象の位置を選択してください", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}ヒント:${closeStrong} 最小値 ${minValue} および最大値 ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}ヒント:${closeStrong} 最小日付 ${minValue} および最大日付 ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "須_Report could not be submitted__________鷗", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "添付ファイルが選択されています", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${total} 件のうち、${failed} 件の添付ファイルをアップロードできませんでした", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "現在の位置は利用できません",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "現在の位置はベースマップの範囲外です",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "レポートする", // Command button to open the geoform
            cancelButtonTooltip: "キャンセル", //tooltip for cancel button
            geoformBackButtonTooltip: "レポート リストへ移動" //tooltip for Geoform back button

        },
        locator: {
            addressText: "住所:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "緯度/経度", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "結果が見つかりませんでした", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "検索する住所を入力してください", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "住所ロケーションがベースマップの範囲外です", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "検索", // Tooltip for search button
            clearButtonTooltip: "検索値のクリア" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "マイ レポート", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "マイ レポート", // Command button to access issues reported by the logged in user
            noResultsFound: "須_No reports found______鷗" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "LIKE", // Command button for up-voting a report
            likeButtonTooltip: "このレポートに投票",  // Tooltip for Like button
            commentButtonLabel: "コメント", // Command button for submitting feedback
            commentButtonTooltip: "このレポートにコメント", // Tooltip for Comment button
            galleryButtonLabel: "ギャラリー", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "添付したドキュメントを参照", // Tooltip for command button shown in details panel
            mapButtonLabel: "マップ上で表示", // Command button shown in details panel
            mapButtonTooltip: "このレポートの位置を表示", // Tooltip for Gallery button
            commentsListHeading: "コメント", // List heading for Comments section in details panel
            unableToUpdateVoteField: "須_Your vote cannot be counted at this time_____________鷗.", // Error message for feature unable to update
            gotoIssueListTooltip: "レポート リストへ移動" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "このレポートに投票する", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "須_Load More_____鷗..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "コメントの送信",
            commentsFormCancelButton: "キャンセル",
            errorInSubmittingComment: "コメントを送信できませんでした。", // Shown when user is unable to add comments
            emptyCommentMessage: "コメントを入力してください。", // Shown when user submits a comment without any text/character
            placeHolderText: "コメントの入力", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "コメントがありません", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} 文字が残っています", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "なし" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "ギャラリー",
            noAttachmentsAvailableText: "添付ファイルがありません" // Shown when no comments are available for the selected issue
        }
    })
);
