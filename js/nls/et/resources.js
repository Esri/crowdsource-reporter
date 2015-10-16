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
            error: "Võimetu koostama kaarti",
            zoomInTooltip: "Suurenda",  // Command button to zoom in to the map
            zoomOutTooltip: "Vähenda",  // Command button to zoom out of the map
            geolocationTooltip: "Praegune asukoht"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Ühtki rühma ei ole konfigureeritud", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Esita aruanne", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Loendivaade", // Go to List view tooltip text
            noFeatureGeomtery: "Funktsiooni ei saa kuvada." // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Jätkake külalisena", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "või", // Or text on sign in screen
            signinOptionsText: "Logige sisse", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Palun logi sisse", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Logige sisse külalisena", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Logige sisse Facebooki konto kaudu", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Logige sisse Twitteri konto kaudu", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Logige sisse Google+ kasutajana", // Command button to access the application via Google+ login
            agolLoginTooltip: "Logige sisse ArcGIS kasutajana" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Omanik", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Kuupäev loodud", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Muutmise kuupäev", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Kirjeldus", // Shown in the 'Map information' section describing the webmap
            snippet: "Kokkuvõte", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Ligipääsu ja kasutuse piirangud", // Shown in the map information section indicating the webmap license information
            accessInformation: "Krediidid", // Shown in the 'Map information' section indicating account credits
            tags: "Märksõnad", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Vaatamiste arv", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Hinnang", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Konfigureeritud grupp ei kehti või ei ole selle grupiga veel objekte jagatud.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Kaarditeave" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Š_No features found______ä", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Š_No features found near you_________ä", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Š_Unable to complete operation_________ä", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Mine pealehele", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Kaardivaade" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Minu aruanded", // Command button shown in mobile menu list
            signIn: "Logi sisse", // Command button shown in mobile menu list and in appheader
            signOut: "Logi välja", // Command button shown in mobile menu list
            signInTooltip: "Logi sisse", // Tooltip to 'Sign in' option
            signOutTooltip: "Logi välja", // Tooltip  to 'Sign out' option
            myReportTooltip: "Š_View my reports______ä" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Detailid", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Manused", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Sirvi", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Asukoht", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Aruanne It", // Command button to submit the geoform to report an issue
            cancelButton: "Tühista", //Command button to close the geoform
            requiredField: "(nõutud)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Vali&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Sisestage kehtiv väärtus.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Kihi väljadele ei ole konfigureeritud andmete salvestamine.", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Palun sisestage täisarv", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Palun sisestage täisarv", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Palun sisestage arv", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Palun sisestage arv", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Palun sisestage väärtused kõigile nõutud väljadele.", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Valige oma aruande asukoht.", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Vihje:${closeStrong} Miinimumväärtus ${minValue} ja maksimumväärtus ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Vihje:${closeStrong} Kuupäeva alampiir ${minValue} ja kuupäeva ülempiir ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Š_Report could not be submitted__________ä", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "valitud manus(ed)", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "Manust /kokku manusest ei õnnestunud üles laadida.", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Hetke asukoht pole kättesaadav.",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Hetke asukoht on lubatud vahemikust väljas.",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Aruanne It", // Command button to open the geoform
            cancelButtonTooltip: "Tühista", //tooltip for cancel button
            geoformBackButtonTooltip: "Liigu aruande loendisse" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Aadress:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Laius/Pikkus", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Tulemusi ei leitud", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Sisesta otsingusse aadress", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Asukoht on väljaspool aluskaardi piirkonda.", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Otsi", // Tooltip for search button
            clearButtonTooltip: "Tühjenda otsingu väärtus" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Minu aruanded", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Minu aruanded", // Command button to access issues reported by the logged in user
            noResultsFound: "Š_No reports found______ä" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "nagu", // Command button for up-voting a report
            likeButtonTooltip: "Hääletage selle aruande kohta",  // Tooltip for Like button
            commentButtonLabel: "Kommentaar", // Command button for submitting feedback
            commentButtonTooltip: "Kommenteerige seda aruannet", // Tooltip for Comment button
            galleryButtonLabel: "Galerii", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Vaadake manustatud dokumente", // Tooltip for command button shown in details panel
            mapButtonLabel: "Vaata kaardil", // Command button shown in details panel
            mapButtonTooltip: "Vaata selle aruande asukohta", // Tooltip for Gallery button
            commentsListHeading: "Kommentaari", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Š_Your vote cannot be counted at this time_____________ä.", // Error message for feature unable to update
            gotoIssueListTooltip: "Liigu aruande loendisse" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Selle aruande kohta antud hääled.", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Š_Load More_____ä..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Saada kommentaar",
            commentsFormCancelButton: "Tühista",
            errorInSubmittingComment: "Kommentaari ei saanud esitada.", // Shown when user is unable to add comments
            emptyCommentMessage: "Palun sisestage kommentaar.", // Shown when user submits a comment without any text/character
            placeHolderText: "Sisestage kommentaar", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Ühtki kommentaari ei ole saadaval.", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} kasutamata tähemärgid", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Ei" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galerii",
            noAttachmentsAvailableText: "Manuseid ei leitud" // Shown when no comments are available for the selected issue
        }
    })
);
