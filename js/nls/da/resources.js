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
            error: "Kan ikke oprette kort",
            zoomInTooltip: "Zoom ind",  // Command button to zoom in to the map
            zoomOutTooltip: "Zoom ud",  // Command button to zoom out of the map
            geolocationTooltip: "Aktuel placering"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Ingen gruppe konfigureret", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Send en rapport", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Listevisning", // Go to List view tooltip text
            noFeatureGeomtery: "Objekt kan ikke vises" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Fortsæt som gæst", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Eller", // Or text on sign in screen
            signinOptionsText: "Log ind med", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Log ind", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Log ind som gæst", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Log ind med Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Log ind med Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Log ind med Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Log ind med ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Ejer", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Oprettelsesdato", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Dato for ændring", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Beskrivelse", // Shown in the 'Map information' section describing the webmap
            snippet: "Summary", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Få adgang til og brug begrænsninger", // Shown in the map information section indicating the webmap license information
            accessInformation: "Credits", // Shown in the 'Map information' section indicating account credits
            tags: "Tags", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Antal visninger", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Vurdering", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Konfigureret gruppe er ugyldig, eller ingen elementer er endnu blevet delt med denne gruppe.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Kortoplysninger" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Ingen rapporter er tilgængelige i det aktuelle område", // Shown in the issue wall when no issues are present in the current map extent
            gotoWebmapListTooltip: "Gå til hovedlisten", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Kortvisning" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Mine rapporter", // Command button shown in mobile menu list
            signIn: "Log ind", // Command button shown in mobile menu list and in appheader
            signOut: "Log ud", // Command button shown in mobile menu list
            help: "Hjælp", // Command button shown in mobile menu list
            signInTooltip: "Sign in", // Tooltip to 'Sign in' option
            signOutTooltip: "Log ud", // Tooltip  to 'Sign out' option
            myReportTooltip: "Vis rapporter indsendt af mig", // Tooltip  to 'My Reports' option
            helpTooltip: "Hjælp" // Tooltip  to 'Help' option
        },
        geoform: {
            enterInformation: "Oplysninger", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Vedhæftninger", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Gennemse", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Sted", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Rapportér det", // Command button to submit the geoform to report an issue
            cancelButton: "Annuller", //Command button to close the geoform
            requiredField: "(obligatorisk)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Select&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Indtast en gyldig værdi.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Lagfelter er ikke konfigureret til at hente data", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Indtast et heltal", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Indtast et heltal", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Indtast et tal", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Indtast et tal", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Angiv værdier for alle påkrævede felter", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Vælg en placering for din rapport", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Hint:${closeStrong} Minimumværdi ${minValue} og maksimumværdi ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Hint:${closeStrong} Minimumdato ${minValue} og maksimumdato ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Problem kunne ikke rapporteres", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "vedhæftning(er) valgt", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${mislykkedes} af ${total} vedhæftning(er) kunne ikke overføres", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Aktuel position er ikke tilgængelig",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Aktuel position ligger uden for baggrundskortets udstrækning",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Rapportér det", // Command button to open the geoform
            cancelButtonTooltip: "Annuller", //tooltip for cancel button
            geoformBackButtonTooltip: "Gå til rapportlisten" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Adresse:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Breddegrad/længdegrad", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Ingen resultater", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Indtast en adresse, der skal søges efter", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Den fundne adresse ligger uden for baggrundskortets udstrækning", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Search", // Tooltip for search button
            clearButtonTooltip: "Ryd søgeværdi" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Mine rapporter", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Mine rapporter", // Command button to access issues reported by the logged in user
            noResultsFound: "ingen rapporter fundet" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Synes godt om", // Command button shown in details panel
            likeButtonTooltip: "Stem på denne rapport",  // Tooltip for command button shown in details panel
            commentButtonLabel: "Kommentar", // Command button shown in details panel
            commentButtonTooltip: "Kommentér på denne rapport", // Tooltip for command button shown in details panel
            galleryButtonLabel: "Galleri", // Command button shown in details panel
            galleryButtonTooltip: "Se vedhæftede dokumenter", // Tooltip for command button shown in details panel
            mapButtonLabel: "Vis på kort", // Command button shown in details panel
            mapButtonTooltip: "Vis denne rapports placering", // Tooltip for command button shown in details panel
            commentsListHeading: "Comments", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Din stemme kan ikke afgives på nuværende tidspunkt.", // Error message for feature unable to update
            gotoIssueListTooltip: "Gå til rapportlisten" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Stemmer på denne rapport" //Shown on hovering of the like icon in my-issues and issue-wall
        },
        comment: {
            commentsFormText: "Kommentar",
            commentsFormSubmitButton: "Send kommentar",
            commentsFormCancelButton: "Annuller",
            errorInSubmittingComment: "Kommentar kunne ikke indsendes.", // Shown when user is unable to add comments
            emptyCommentMessage: "Indtast en kommentar.", // Shown when user submits a comment without any text/character
            placeHolderText: "Skriv en kommentar", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "ingen kommentarer tilgængelige", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} tegn tilbage", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Nej" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galleri",
            noAttachmentsAvailableText: "Ingen vedhæftede filer" // Shown when no comments are available for the selected issue
        }
    })
);
