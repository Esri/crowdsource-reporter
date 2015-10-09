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
            error: "맵을 생성할 수 없음",
            zoomInTooltip: "확대",  // Command button to zoom in to the map
            zoomOutTooltip: "축소",  // Command button to zoom out of the map
            geolocationTooltip: "현재 위치"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "구성된 그룹 없음", // Shown when no group is configured in the configuration file
            submitReportButtonText: "보고서 제출", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "목록 보기", // Go to List view tooltip text
            noFeatureGeomtery: "피처를 표시할 수 없음" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "게스트로 진행", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "또는", // Or text on sign in screen
            signinOptionsText: "다음으로 로그인:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "로그인하세요.", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "게스트로 로그인", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Facebook으로 로그인", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Twitter로 로그인", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Google+로 로그인", // Command button to access the application via Google+ login
            agolLoginTooltip: "ArcGIS로 로그인" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "소유자", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "생성일", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "수정된 날짜", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "설명", // Shown in the 'Map information' section describing the webmap
            snippet: "요약", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "접근 및 사용 제약 조건", // Shown in the map information section indicating the webmap license information
            accessInformation: "크레딧", // Shown in the 'Map information' section indicating account credits
            tags: "태그", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "조회수", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "평점", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "구성된 그룹이 유효하지 않거나 이 그룹과 공유된 항목이 아직 없습니다.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "맵 정보" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "한_No features found______빠", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "한_No features found near you_________빠", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "한_Unable to complete operation_________빠", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "기본 목록으로 이동", // Tooltip for back icon in list header
            gotoMapViewTooltip: "맵 보기" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "내 보고서", // Command button shown in mobile menu list
            signIn: "로그인", // Command button shown in mobile menu list and in appheader
            signOut: "로그아웃", // Command button shown in mobile menu list
            signInTooltip: "로그인", // Tooltip to 'Sign in' option
            signOutTooltip: "로그아웃", // Tooltip  to 'Sign out' option
            myReportTooltip: "내가 제출한 보고서 보기" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "세부정보", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "첨부 파일", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "찾아보기", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "위치", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "보고", // Command button to submit the geoform to report an issue
            cancelButton: "취소", //Command button to close the geoform
            requiredField: "(필수)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "선택&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "유효한 값을 입력하세요.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "데이터를 캡처하도록 레이어 필드가 구성되지 않음", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "정수를 입력하세요.", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "정수를 입력하세요.", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "숫자를 입력하세요.", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "숫자를 입력하세요.", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "모든 필수 필드에 값을 제공하세요.", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "보고서의 위치를 선택하세요.", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}힌트:${closeStrong} 최소값 ${minValue} 및 최대값 ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}힌트:${closeStrong} 최소 날짜 ${minValue} 및 최대 날짜 ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "문제를 보고할 수 없음", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "첨부 파일이 선택됨", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${total}개 중 ${failed}개 첨부 파일 업로드 실패", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "현재 위치를 사용할 수 없음",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "현재 위치가 베이스맵 범위를 벗어남",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "보고", // Command button to open the geoform
            cancelButtonTooltip: "취소", //tooltip for cancel button
            geoformBackButtonTooltip: "보고서 목록으로 이동" //tooltip for Geoform back button

        },
        locator: {
            addressText: "주소:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "위도/경도", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "결과를 찾을 수 없음", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "검색할 주소 입력", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "찾은 주소가 베이스맵 범위를 벗어남", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "검색", // Tooltip for search button
            clearButtonTooltip: "검색 값 지우기" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "내 보고서", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "내 보고서", // Command button to access issues reported by the logged in user
            noResultsFound: "한_No reports found______빠" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "좋아요", // Command button shown in details panel
            likeButtonTooltip: "이 보고서에 투표",  // Tooltip for command button shown in details panel
            commentButtonLabel: "의견", // Command button shown in details panel
            commentButtonTooltip: "이 보고서에 대한 의견", // Tooltip for command button shown in details panel
            galleryButtonLabel: "갤러리", // Command button shown in details panel
            galleryButtonTooltip: "첨부된 문서 보기", // Tooltip for command button shown in details panel
            mapButtonLabel: "맵에서 보기", // Command button shown in details panel
            mapButtonTooltip: "이 보고서의 위치 보기", // Tooltip for command button shown in details panel
            commentsListHeading: "의견", // List heading for Comments section in details panel
            unableToUpdateVoteField: "지금은 투표를 추가할 수 없습니다.", // Error message for feature unable to update
            gotoIssueListTooltip: "보고서 목록으로 이동" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "이 보고서에 투표", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "한_Load More_____빠..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "의견 제출",
            commentsFormCancelButton: "취소",
            errorInSubmittingComment: "의견을 제출할 수 없습니다.", // Shown when user is unable to add comments
            emptyCommentMessage: "의견을 입력하세요.", // Shown when user submits a comment without any text/character
            placeHolderText: "의견 입력", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "의견을 사용할 수 없음", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0}자 남음", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "아니요" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "갤러리",
            noAttachmentsAvailableText: "첨부 파일을 찾을 수 없음" // Shown when no comments are available for the selected issue
        }
    })
);
