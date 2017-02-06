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
    "error": "Karte kann nicht erstellt werden",
    "zoomInTooltip": "Vergrößern",
    "zoomOutTooltip": "Verkleinern",
    "geolocationTooltip": "Aktueller Standort"
  },
  "main": {
    "noGroup": "Keine Gruppe konfiguriert",
    "submitReportButtonText": "Bericht senden",
    "gotoListViewTooltip": "Listenansicht",
    "noFeatureGeomtery": "Feature kann nicht angezeigt werden",
    "featureOutsideAOIMessage": "Feature kann nicht außerhalb des Untersuchungsgebiets hinzugefügt werden.",
    "noEditingPermissionsMessage": "ä_You do not have permission to perform this action________________Ü."
  },
  "signin": {
    "guestSigninText": "Vorgang als Gast fortsetzen",
    "signInOrText": "Oder",
    "signinOptionsText": "Anmelden mit:",
    "noGroupNameText": "Melden Sie sich an",
    "guestLoginTooltip": "Als Gast anmelden",
    "facebookLoginTooltip": "Mit Facebook anmelden",
    "twitterLoginTooltip": "Mit Twitter anmelden",
    "googlePlusLoginTooltip": "Mit Google+ anmelden",
    "agolLoginTooltip": "Mit ArcGIS anmelden"
  },
  "webMapList": {
    "owner": "Besitzer",
    "created": "Erstellungsdatum",
    "modified": "Änderungsdatum",
    "description": "Beschreibung",
    "snippet": "Zusammenfassung",
    "licenseInfo": "Zugriffs- und Nutzungsbeschränkungen",
    "accessInformation": "Quellennachweise",
    "tags": "Tags",
    "numViews": "Anzahl der Ansichten",
    "avgRating": "Bewertung",
    "noWebMapInGroup": "Die konfigurierte Gruppe ist ungültig oder es wurden noch keine Elemente für diese Gruppe freigegeben.",
    "infoBtnToolTip": "Karteninformationen"
  },
  "issueWall": {
    "noResultsFound": "Keine Features gefunden",
    "noResultsFoundInCurrentBuffer": "Keine Features in Ihrer Nähe gefunden",
    "unableToFetchFeatureError": "Vorgang kann nicht abgeschlossen werden",
    "gotoWebmapListTooltip": "Zur Hauptliste wechseln",
    "gotoMapViewTooltip": "Kartenansicht"
  },
  "appHeader": {
    "myReport": "ä_My Submissions_____Ü",
    "signIn": "Anmelden",
    "signOut": "Abmelden",
    "signInTooltip": "Anmelden",
    "signOutTooltip": "Abmelden",
    "myReportTooltip": "ä_View my submissions_______Ü"
  },
  "geoform": {
    "enterInformation": "Details",
    "selectAttachments": "Anlagen",
    "selectFileText": "Durchsuchen",
    "enterLocation": "Speicherort",
    "reportItButton": "Melden",
    "editReportButton": "Aktualisieren",
    "cancelButton": "Abbrechen",
    "requiredField": "(erforderlich)",
    "selectDefaultText": "Auswählen&hellip;",
    "invalidInputValue": "Geben Sie einen gültigen Wert ein.",
    "noFieldsConfiguredMessage": "Layer-Felder sind nicht für die Erfassung von Daten konfiguriert",
    "invalidSmallNumber": "Geben Sie einen ganzzahligen Wert ein",
    "invalidNumber": "Geben Sie einen ganzzahligen Wert ein",
    "invalidFloat": "Geben Sie eine Zahl ein",
    "invalidDouble": "Geben Sie eine Zahl ein",
    "requiredFields": "Geben Sie Werte für alle erforderlichen Felder ein",
    "selectLocation": "Wählen Sie den Speicherort für Ihren Bericht aus",
    "numericRangeHintMessage": "${openStrong}Hinweis:${closeStrong} Minimalwert ${minValue} und Maximalwert ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Hinweis:${closeStrong} Mindestdatum ${minValue} und maximal auswählbares Datum ${maxValue}",
    "errorsInApplyEdits": "ä_Values could not be submitted__________Ü.",
    "attachmentSelectedMsg": "Anlage(n) ausgewählt",
    "attachmentUploadStatus": "${failed} von ${total} Anlage(n) konnte(n) nicht hochgeladen werden",
    "geoLocationError": "Aktuelle Position ist nicht verfügbar",
    "geoLocationOutOfExtent": "Aktuelle Position befindet sich außerhalb der Grundkartenausdehnung",
    "submitButtonTooltip": "Senden",
    "cancelButtonTooltip": "Abbrechen",
    "geoformBackButtonTooltip": "ä_Return to the list______Ü",
    "locationSelectionHintForPointLayer": "ä_Tap the map to draw the location___________Ü.",
    "locationSelectionHintForPolygonLayer": "ä_Tap the map to draw the location. Double tap to complete the drawing______________________Ü.",
    "locationSelectionHintForPointLayerDesktop": "ä_Click the map to draw the location____________Ü.",
    "locationSelectionHintForPolygonLayerDesktop": "ä_Click the map to draw the location. Double click to complete the drawing_______________________Ü."
  },
  "locator": {
    "addressText": "Adresse:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Breitengrad/Längengrad",
    "invalidSearch": "Keine Ergebnisse gefunden",
    "locatorPlaceholder": "Zu suchende Adresse eingeben",
    "locationOutOfExtent": "ä_Location is outside the submission area_____________Ü",
    "searchButtonTooltip": "Suche",
    "clearButtonTooltip": "Suchwert löschen"
  },
  "myIssues": {
    "title": "ä_My Submissions_____Ü",
    "myIssuesTooltip": "ä_My Submissions_____Ü",
    "noResultsFound": "ä_No submissions found_______Ü"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "Ich stimme zu",
    "commentButtonLabel": "",
    "commentButtonTooltip": "Antwort hinterlassen",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Angehängte Dokumente anzeigen",
    "mapButtonLabel": "Auf Karte anzeigen",
    "mapButtonTooltip": "ä_View the location of this submission____________Ü",
    "commentsListHeading": "Bemerkungen",
    "unableToUpdateVoteField": "Ihre Stimme kann zurzeit nicht gezählt werden.",
    "gotoIssueListTooltip": "ä_View the list of submissions_________Ü",
    "deleteMessage": "Möchten Sie den Löschvorgang wirklich durchführen?"
  },
  "itemList": {
    "likesForThisItemTooltip": "ä_Number of votes______Ü",
    "loadMoreButtonText": "Weitere laden..."
  },
  "comment": {
    "commentsFormHeading": "Kommentieren",
    "commentsFormSubmitButton": "Kommentar senden",
    "commentsFormEditButton": "Kommentar aktualisieren",
    "commentsFormCancelButton": "Abbrechen",
    "errorInSubmittingComment": "Kommentar konnte nicht gesendet werden.",
    "emptyCommentMessage": "Geben Sie einen Kommentar ein.",
    "placeHolderText": "Kommentar eingeben",
    "noCommentsAvailableText": "Keine Kommentare verfügbar",
    "remainingTextCount": "${0} Zeichen verbleiben",
    "showNoText": "Nein",
    "selectAttachments": "Anlagen",
    "selectFileText": "Durchsuchen",
    "attachmentSelectedMsg": "Anlage(n) ausgewählt",
    "attachmentHeaderText": "Anlagen",
    "unknownCommentAttachment": "DATEI",
    "editRecordText": "Bearbeiten",
    "deleteRecordText": "Löschen",
    "deleteCommentFailedMessage": "Der Kommentar kann nicht gelöscht werden."
  },
  "gallery": {
    "galleryHeaderText": "Galerie",
    "noAttachmentsAvailableText": "Keine Anlagen gefunden"
  }
});