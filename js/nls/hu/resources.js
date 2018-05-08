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
    root: ({
        map: {
            error: "Nem sikerült létrehozni a térképet",
            zoomInTooltip: "Nagyítás",  // Command button to zoom in to the map
            zoomOutTooltip: "Kicsinyítés",  // Command button to zoom out of the map
            geolocationTooltip: "Aktuális hely"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Nincs konfigurálva csoport", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Jelentés beküldése", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Listanézet", // Go to List view tooltip text
            noFeatureGeomtery: "A vektoros elem nem jeleníthető meg", // Error message when geometry is not available
            featureOutsideAOIMessage: "A vektoros elem nem adható hozzá a vizsgált területen kívül", // Error message when feature edits are performed outside the study area
            noEditingPermissionsMessage: "Nincs engedélye a művelet végrehajtására.", //Message when user do not have editing permissions
            basemapGalleryText: "Alaptérkép-galéria", // Basemap gallery text
            legendText: "Jelmagyarázat" //Legend text

        },
        signin: {
            guestSigninText: "Folytatás vendégként", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Vagy", // Or text on sign in screen
            signinOptionsText: "Bejelentkezés ezzel:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Jelentkezzen be", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Bejelentkezés vendégként", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Bejelentkezés Facebook-azonosítóval", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Bejelentkezés Twitter-azonosítóval", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Bejelentkezés Google+-azonosítóval", // Command button to access the application via Google+ login
            agolLoginTooltip: "Bejelentkezés ArcGIS-azonosítóval" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Tulajdonos", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Létrehozás dátuma", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Módosítás dátuma", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Leírás", // Shown in the 'Map information' section describing the webmap
            snippet: "Összefoglalás", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Hozzáférési és használati korlátozások", // Shown in the map information section indicating the webmap license information
            accessInformation: "Kreditek", // Shown in the 'Map information' section indicating account credits
            tags: "Címkék", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Megtekintések száma", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Értékelés", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "A konfigurált csoport érvénytelen, vagy még nincsenek megosztva elemek ezzel a csoporttal.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Térkép adatai" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Nem találhatók vektoros elemek", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Nem találhatók vektoros elemek a közelében", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Nem sikerült befejezni a műveletet", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Ugrás a főlistára", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Térképnézet" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Saját beküldések", // Command button shown in mobile menu list
            signIn: "Bejelentkezés", // Command button shown in mobile menu list and in appheader
            signOut: "Kijelentkezés", // Command button shown in mobile menu list
            signInTooltip: "Bejelentkezés", // Tooltip to 'Sign in' option
            signOutTooltip: "Kijelentkezés", // Tooltip  to 'Sign out' option
            myReportTooltip: "Saját beküldések megtekintése" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Részletek", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Csatolmányok", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Tallózás", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Hely", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Jelentés", // Command button to submit the geoform to report an issue
            editReportButton: "Frissítés", // Command button to edit reported issue
            cancelButton: "Mégse", //Command button to close the geoform
            requiredField: "(kötelező)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Kiválasztás&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Adjon meg érvényes értéket.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "A réteg mezői nincsenek konfigurálva adatok rögzítésére", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Adjon meg egy egész számot", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Adjon meg egy egész számot", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Adjon meg egy számot", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Adjon meg egy számot", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Adjon meg értéket minden kötelező mezőben", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Válasszon helyet a jelentés számára", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Tipp:${closeStrong} ${minValue} minimális érték és ${maxValue} maximális érték", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Tipp:${closeStrong} ${minValue} minimális dátum és ${maxValue} maximális dátum", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Nem sikerült elküldeni az értékeket.", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "csatolmány kiválasztva", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} csatolmányt nem sikerült feltölteni (összesen: ${total})", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Az aktuális hely nem érhető el",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Az aktuális hely az alaptérkép kiterjedésén kívül van",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Beküldés", // Command button to open the geoform
            cancelButtonTooltip: "Mégse", //tooltip for cancel button
            geoformBackButtonTooltip: "Vissza a listához", //tooltip for Geoform back button
            locationSelectionHintForPointLayer : "Koppintson a térképre a hely megrajzolásához.", //hint text for selecting location incase of point layer
            locationSelectionHintForPolygonLayer : "Koppintson a térképre a hely megrajzolásához. Koppintson duplán a rajzolás befejezéséhez.", //hint text for selecting location incase of line and polygon layer
            locationSelectionHintForPointLayerDesktop : "Kattintson a térképre a hely megrajzolásához.", //hint text for selecting location incase of point layer
            locationSelectionHintForPolygonLayerDesktop : "Kattintson a térképre a hely megrajzolásához. Kattintson duplán a rajzolás befejezéséhez." //hint text for selecting location incase of line and polygon layer
        },
        locator: {
            addressText: "Cím:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Hosszúság/szélesség", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Nincs találat", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Adja meg a keresendő címet", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "A hely a beküldési területen kívül van", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Keresés", // Tooltip for search button
            clearButtonTooltip: "Keresett érték törlése" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Saját beküldések", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Saját beküldések", // Command button to access issues reported by the logged in user
            noResultsFound: "Nem találhatók beküldések" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "", // Command button for up-voting a report
            likeButtonTooltip: "Elfogadom",  // Tooltip for Like button
            commentButtonLabel: "", // Command button for submitting feedback
            commentButtonTooltip: "Válaszoljon", // Tooltip for Comment button
            galleryButtonLabel: "", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Csatolt dokumentumok megtekintése", // Tooltip for command button shown in details panel
            mapButtonLabel: "Megtekintés a térképen", // Command button shown in details panel
            mapButtonTooltip: "Beküldés helyének megtekintése", // Tooltip for Gallery button
            commentsListHeading: "Hozzászólások", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Szavazatát nem lehet beszámítani most.", // Error message for feature unable to update
            gotoIssueListTooltip: "Beküldések listájának megtekintése", // Tooltip for back icon in Issue list header
            deleteMessage : "Biztos, hogy törli?", //shown when user tries to delete a report or comment
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Szavazatok száma", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Továbbiak betöltése..." //Text for load more button
        },
        comment: {
            commentsFormHeading: "Hozzászólás",
            commentsFormSubmitButton: "Hozzászólás elküldése",
            commentsFormEditButton: "Hozzászólás frissítése",
            commentsFormCancelButton: "Mégse",
            errorInSubmittingComment: "Nem sikerült elküldeni a hozzászólást.", // Shown when user is unable to add comments
            emptyCommentMessage: "Adja meg a hozzászólást.", // Shown when user submits a comment without any text/character
            placeHolderText: "Írja be a hozzászólást", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Nincsenek elérhető hozzászólások", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} karakter maradt", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Nem", // Shown when comments character limit is exceeded
            selectAttachments: "Csatolmányok", // Appears above 'Select file' button indicating option to attach files while adding comments
            selectFileText: "Tallózás", // Command button to open a dialog box to select file(s) to be attached
            attachmentSelectedMsg: "csatolmány kiválasztva", // Shown besides the select file button indicating the number of files attached
            attachmentHeaderText: "Csatolmányok", //attachment header Text
            unknownCommentAttachment: "FÁJL", // displayed for attached file having unknown extension
            editRecordText: "Szerkesztés", // Displayed on hover of edit comment button
            deleteRecordText: "Törlés", // Displayed on hover of delete comment button
            deleteCommentFailedMessage: "Nem lehet törölni a hozzászólást" // Displayed when delete comment operation gets failed
        },
        gallery: {
            galleryHeaderText: "Galéria",
            noAttachmentsAvailableText: "Nem található csatolmány" // Shown when no comments are available for the selected issue
        }
    }),
    "ar": 1,
    "bs": 1,
    "ca": 0,
    "cs": 1,
    "da": 1,
    "de": 1,
    "el": 1,
    "es": 1,
    "et": 1,
    "fi": 1,
    "fr": 1,
    "he": 1,
    "hi": 1,
    "hr": 1,
    "hu": 0,
    "id": 1,
    "it": 1,
    "ja": 1,
    "ko": 1,
    "lt": 1,
    "lv": 1,
    "nb": 1,
    "nl": 1,
    "pl": 1,
    "pt-br": 1,
    "pt-pt": 1,
    "ro": 1,
    "ru": 1,
    "sl": 1,
    "sr": 1,
    "sv": 1,
    "th": 1,
    "tr": 1,
    "vi": 1,
    "zh-cn": 1,
    "zh-hk": 1,
    "zh-tw": 1
});
