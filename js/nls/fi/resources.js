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
            error: "Karttaa ei voi luoda",
            zoomInTooltip: "Lähennä",  // Command button to zoom in to the map
            zoomOutTooltip: "Loitonna",  // Command button to zoom out of the map
            geolocationTooltip: "Nykyinen sijainti"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Yhtään ryhmää ei ole määritetty", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Å_Submit a Report______ö", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Luettelonäkymä", // Go to List view tooltip text
            noFeatureGeomtery: "Kohdetta ei voi näyttää" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Jatka käyttöä vierailijana", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Tai", // Or text on sign in screen
            signinOptionsText: "Kirjaudu sisään tunnuksella:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Kirjaudu sisään", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Kirjaudu vierailijana", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Kirjaudu sisään Facebook-tunnuksella", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Kirjaudu sisään Twitter-tunnuksella", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Kirjaudu sisään Google+-tunnuksella", // Command button to access the application via Google+ login
            agolLoginTooltip: "Kirjaudu sisään ArcGIS-tunnuksella" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Omistaja", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Luontipäivämäärä", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Muokkauspäivämäärä", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Kuvaus", // Shown in the 'Map information' section describing the webmap
            snippet: "Summary", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Käyttörajoitukset", // Shown in the map information section indicating the webmap license information
            accessInformation: "Krediitit", // Shown in the 'Map information' section indicating account credits
            tags: "Tunnisteet", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Näkymien määrä", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Arviointi", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Määritetty ryhmä on virheellinen tai tämän ryhmän kanssa ei ole vielä jaettu mitään kohteita.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Kartan tiedot" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Kohteita ei löytynyt", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Läheltäsi ei löytynyt kohteita", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Toimintoa ei voi suorittaa loppuun", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Siirry pääluetteloon", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Karttanäkymä" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Omat raportit", // Command button shown in mobile menu list
            signIn: "Kirjaudu sisään", // Command button shown in mobile menu list and in appheader
            signOut: "Kirjaudu ulos", // Command button shown in mobile menu list
            signInTooltip: "Kirjaudu sisään", // Tooltip to 'Sign in' option
            signOutTooltip: "Kirjaudu ulos", // Tooltip  to 'Sign out' option
            myReportTooltip: "Näytä raporttini" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Yksityiskohdat", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Liitteet", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Selaa", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Sijainti", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Raportoi", // Command button to submit the geoform to report an issue
            cancelButton: "Peruuta", //Command button to close the geoform
            requiredField: "(pakollinen)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Valitse&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Anna kelvollinen arvo.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Karttatason kenttiä ei ole määritetty aineiston keräämistä varten", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Kirjoita kokonaisluku", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Kirjoita kokonaisluku", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Kirjoita numero", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Kirjoita numero", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Määritä arvot kaikille pakollisille kentille", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Valitse raportin sijainti", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Vihje:${closeStrong} Vähimmäisarvo ${minValue} ja enimmäisarvo ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Vihje:${closeStrong} aikaisin ${minValue} ja myöhäisin päivämäärä ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Raportin lähetys ei onnistunut", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "liite(ttä) on valittu", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed}/${total} liitteen lataus epäonnistui", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Nykyinen sijainti ei ole käytettävissä",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Nykyinen sijainti ei ole taustakartan rajoissa",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Å_Submit___ö", // Command button to open the geoform
            cancelButtonTooltip: "Peruuta", //tooltip for cancel button
            geoformBackButtonTooltip: "Å_Return to the report list_________ö" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Osoite:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Leveysaste/Pituusaste", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Tuloksia ei löytynyt", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Anna haettava osoite", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Löydetty osoite ei ole taustakartan rajoissa", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Etsi", // Tooltip for search button
            clearButtonTooltip: "Tyhjennä etsintäarvo" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Omat raportit", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Omat raportit", // Command button to access issues reported by the logged in user
            noResultsFound: "Yhtään raporttia ei löytynyt" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Å_Vote__ö", // Command button for up-voting a report
            likeButtonTooltip: "Äänestä tätä raporttia",  // Tooltip for Like button
            commentButtonLabel: "Kommentti", // Command button for submitting feedback
            commentButtonTooltip: "Kommentoi tätä raporttia", // Tooltip for Comment button
            galleryButtonLabel: "Gallery", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Näytä liitetyt dokumentit", // Tooltip for command button shown in details panel
            mapButtonLabel: "Näytä kartalla", // Command button shown in details panel
            mapButtonTooltip: "Näytä tämän raportin sijainti", // Tooltip for Gallery button
            commentsListHeading: "Comments", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Ääntäsi ei voi laskea tällä kertaa.", // Error message for feature unable to update
            gotoIssueListTooltip: "Siirry raporttiluetteloon" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Tämän raportin äänet", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Lataa lisää..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Lähetä kommentti",
            commentsFormCancelButton: "Peruuta",
            errorInSubmittingComment: "Kommentin lähetys ei onnistunut.", // Shown when user is unable to add comments
            emptyCommentMessage: "Kirjoita kommentti.", // Shown when user submits a comment without any text/character
            placeHolderText: "Kirjoita kommentti", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Yhtään kommenttia ei ole saatavilla", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} merkki(ä) jäljellä", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Ei" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Gallery",
            noAttachmentsAvailableText: "Liitteitä ei löydy." // Shown when no comments are available for the selected issue
        }
    })
);
