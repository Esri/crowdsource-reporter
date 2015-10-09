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
            error: "Karte kann nicht erstellt werden",
            zoomInTooltip: "Vergrößern",  // Command button to zoom in to the map
            zoomOutTooltip: "Verkleinern",  // Command button to zoom out of the map
            geolocationTooltip: "Aktueller Standort"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Keine Gruppe konfiguriert", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Bericht senden", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Listenansicht", // Go to List view tooltip text
            noFeatureGeomtery: "Feature kann nicht angezeigt werden" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Vorgang als Gast fortsetzen", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Oder", // Or text on sign in screen
            signinOptionsText: "Anmelden mit:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Melden Sie sich an", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Als Gast anmelden", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Mit Facebook anmelden", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Mit Twitter anmelden", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Mit Google+ anmelden", // Command button to access the application via Google+ login
            agolLoginTooltip: "Mit ArcGIS anmelden" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Besitzer", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Erstellungsdatum", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Änderungsdatum", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Beschreibung", // Shown in the 'Map information' section describing the webmap
            snippet: "Zusammenfassung", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Zugriffs- und Nutzungsbeschränkungen", // Shown in the map information section indicating the webmap license information
            accessInformation: "Quellennachweise", // Shown in the 'Map information' section indicating account credits
            tags: "Tags", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Anzahl der Ansichten", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Bewertung", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Die konfigurierte Gruppe ist ungültig oder es wurden noch keine Elemente für diese Gruppe freigegeben.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Karteninformationen" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "ä_No features found______Ü", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "ä_No features found near you_________Ü", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "ä_Unable to complete operation_________Ü", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Zur Hauptliste wechseln", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Kartenansicht" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Eigene Berichte", // Command button shown in mobile menu list
            signIn: "Anmelden", // Command button shown in mobile menu list and in appheader
            signOut: "Abmelden", // Command button shown in mobile menu list
            signInTooltip: "Anmelden", // Tooltip to 'Sign in' option
            signOutTooltip: "Abmelden", // Tooltip  to 'Sign out' option
            myReportTooltip: "Von mir gesendete Berichte anzeigen" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Details", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Anlagen", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Durchsuchen", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Speicherort", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Melden", // Command button to submit the geoform to report an issue
            cancelButton: "Abbrechen", //Command button to close the geoform
            requiredField: "(erforderlich)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Auswählen&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Geben Sie einen gültigen Wert ein.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Layer-Felder sind nicht für die Erfassung von Daten konfiguriert", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Geben Sie einen Ganzzahlwert ein", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Geben Sie einen Ganzzahlwert ein", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Geben Sie eine Zahl ein", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Geben Sie eine Zahl ein", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Geben Sie Werte für alle erforderlichen Felder ein", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Wählen Sie den Speicherort für Ihren Bericht aus", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Hinweis:${closeStrong} Minimalwert ${minValue} und Maximalwert ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Hinweis:${closeStrong} Mindestdatum ${minValue} und maximal auswählbares Datum ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Problem konnte nicht gemeldet werden", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "Anlage(n) ausgewählt", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} von ${total} Anlage(n) konnte(n) nicht hochgeladen werden", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Aktuelle Position ist nicht verfügbar",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Aktuelle Position befindet sich außerhalb der Grundkartenausdehnung",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Melden", // Command button to open the geoform
            cancelButtonTooltip: "Abbrechen", //tooltip for cancel button
            geoformBackButtonTooltip: "Zur Berichtsliste wechseln" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Adresse:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Breitengrad/Längengrad", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Keine Ergebnisse gefunden", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Zu suchende Adresse eingeben", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Verortete Adresse befindet sich außerhalb der Grundkartenausdehnung", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Suche", // Tooltip for search button
            clearButtonTooltip: "Suchwert löschen" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Eigene Berichte", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Eigene Berichte", // Command button to access issues reported by the logged in user
            noResultsFound: "ä_No reports found______Ü" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Wie", // Command button shown in details panel
            likeButtonTooltip: "Für diesen Bericht stimmen",  // Tooltip for command button shown in details panel
            commentButtonLabel: "Kommentar", // Command button shown in details panel
            commentButtonTooltip: "Diesen Bericht kommentieren", // Tooltip for command button shown in details panel
            galleryButtonLabel: "Galerie", // Command button shown in details panel
            galleryButtonTooltip: "Angehängte Dokumente anzeigen", // Tooltip for command button shown in details panel
            mapButtonLabel: "Auf Karte anzeigen", // Command button shown in details panel
            mapButtonTooltip: "Speicherort dieses Berichts anzeigen", // Tooltip for command button shown in details panel
            commentsListHeading: "Bemerkungen", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Ihre Stimme kann zurzeit nicht hinzugefügt werden.", // Error message for feature unable to update
            gotoIssueListTooltip: "Zur Berichtsliste wechseln" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Stimmen für diesen Bericht", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "ä_Load More_____Ü..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Kommentar senden",
            commentsFormCancelButton: "Abbrechen",
            errorInSubmittingComment: "Kommentar konnte nicht gesendet werden.", // Shown when user is unable to add comments
            emptyCommentMessage: "Geben Sie einen Kommentar ein.", // Shown when user submits a comment without any text/character
            placeHolderText: "Kommentar eingeben", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Keine Kommentare verfügbar", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} Zeichen verbleiben", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Nein" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galerie",
            noAttachmentsAvailableText: "Keine Anlagen gefunden" // Shown when no comments are available for the selected issue
        }
    })
);
