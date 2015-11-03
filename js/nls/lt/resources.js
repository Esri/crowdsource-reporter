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
            error: "Žemėlapio sukurti nepavyko",
            zoomInTooltip: "Artinti",  // Command button to zoom in to the map
            zoomOutTooltip: "Tolinti",  // Command button to zoom out of the map
            geolocationTooltip: "Esama padėtis"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Sukonfigūruotų grupių nėra", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Pateikti ataskaitą", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Sąrašo vaizdas", // Go to List view tooltip text
            noFeatureGeomtery: "Elemento parodyti negalima" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Tęsti svečio teisėmis", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Arba", // Or text on sign in screen
            signinOptionsText: "Prisijungti naudojant", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Prisijunkite", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Prisijungti svečio teisėmis", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Prisijungti naudojant Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Prisijungti naudojant Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Prisijungti naudojant Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Prisijungti naudojant ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Savininkas", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Sukūrimo data", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Paskutinis pakeitimas", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Aprašas", // Shown in the 'Map information' section describing the webmap
            snippet: "Santrauka", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Prieigos ir naudojimo apribojimai", // Shown in the map information section indicating the webmap license information
            accessInformation: "Autoriai", // Shown in the 'Map information' section indicating account credits
            tags: "Raktažodžiai", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Peržiūrų skaičius", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Vertinimas", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Sukonfigūruota grupė neteisinga arba šioje grupėje nebendrinamas nė vienas elementas.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Žemėlapio informacija" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Elementų nerasta", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Šalia jūsų objektų nerasta", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Nepavyko įvykdyti operacijos", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Eiti į pagrindinį sąrašą", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Žemėlapio vaizdas" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Mano ataskaitos", // Command button shown in mobile menu list
            signIn: "Prisijungti", // Command button shown in mobile menu list and in appheader
            signOut: "Atsijungti", // Command button shown in mobile menu list
            signInTooltip: "Prisijunkite", // Tooltip to 'Sign in' option
            signOutTooltip: "Atsijungti", // Tooltip  to 'Sign out' option
            myReportTooltip: "Rodyti mano ataskaitas" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Išsamiau", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Priedai", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Parinkti", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Vieta", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Pranešti apie tai", // Command button to submit the geoform to report an issue
            cancelButton: "Atšaukti", //Command button to close the geoform
            requiredField: "(privalomas)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Pasirinkti&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Įveskite leistiną reikšmę.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Sluoksnio laukai nesukonfigūruoti kaupti duomenis", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Įveskite sveikąjį skaičių", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Įveskite sveikąjį skaičių", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Įveskite skaičių", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Įveskite skaičių", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Pateikite reikšmes visuose būtinuose laukuose", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Nurodykite ataskaitos vietą", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Užuomina:${closeStrong} minimali vertė ${minValue} ir maksimali vertė ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Užuomina:${closeStrong} minimali data ${minValue} ir maksimali data ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Komentaro pateikti nepavyko", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "pasirinktas (-i) priedas (-ai)", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "Nepavyko įkelti ${failed} iš ${total} priedo (-ų)", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Informacijos apie esamą vietą nėra",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Dabartinė vieta yra už pagrindo žemėlapio ribų",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Pranešti apie tai", // Command button to open the geoform
            cancelButtonTooltip: "Atšaukti", //tooltip for cancel button
            geoformBackButtonTooltip: "Eiti į ataskaitų sąrašą" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Adresas:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Platuma/Ilguma", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Nieko nerasta", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Įveskite ieškotiną adresą", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Rastas adresas yra už pagrindo žemėlapio ribų", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Ieškoti", // Tooltip for search button
            clearButtonTooltip: "Išvalyti paieškos reikšmę" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Mano ataskaitos", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Mano ataskaitos", // Command button to access issues reported by the logged in user
            noResultsFound: "Ataskaitų nerasta" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Patinka", // Command button for up-voting a report
            likeButtonTooltip: "Balsuokite už šią ataskaitą",  // Tooltip for Like button
            commentButtonLabel: "Komentuoti", // Command button for submitting feedback
            commentButtonTooltip: "Pakomentuoti šią ataskaitą", // Tooltip for Comment button
            galleryButtonLabel: "Galerija", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Žr. pridėtus dokumentus", // Tooltip for command button shown in details panel
            mapButtonLabel: "Žiūrėti žemėlapyje", // Command button shown in details panel
            mapButtonTooltip: "Žiūrėti šios ataskaitos vietą", // Tooltip for Gallery button
            commentsListHeading: "Komentarai", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Šiuo metu jūsų balso įskaičiuoti negalima.", // Error message for feature unable to update
            gotoIssueListTooltip: "Eiti į ataskaitų sąrašą" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Balsai už šią ataskaitą", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Įkelti daugiau..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Pateikti komentarą",
            commentsFormCancelButton: "Atšaukti",
            errorInSubmittingComment: "Komentaro pateikti nepavyko.", // Shown when user is unable to add comments
            emptyCommentMessage: "Įveskite komentarą.", // Shown when user submits a comment without any text/character
            placeHolderText: "Įvesti komentarą", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Komentarų nėra", // Shown when no comments are available for the selected issue
            remainingTextCount: "liko simbolių: ${0}", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Ne" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galerija",
            noAttachmentsAvailableText: "Priedų nėra" // Shown when no comments are available for the selected issue
        }
    })
);
