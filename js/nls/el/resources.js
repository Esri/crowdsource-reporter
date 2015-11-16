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
            error: "Δεν είναι δυνατή η δημιουργία χάρτη",
            zoomInTooltip: "Εστίαση σε μεγαλύτερη κλίμακα",  // Command button to zoom in to the map
            zoomOutTooltip: "Απομάκρυνση σε μικρότερη κλίμακα",  // Command button to zoom out of the map
            geolocationTooltip: "Τρέχουσα τοποθεσία"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Δεν έχει παραμετροποιηθεί κάποια ομάδα", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Υποβολή αναφοράς", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Προβολή λίστας", // Go to List view tooltip text
            noFeatureGeomtery: "Δεν είναι δυνατή η εμφάνιση του στοιχείου" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Συνέχεια ως επισκέπτης", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Ή", // Or text on sign in screen
            signinOptionsText: "Σύνδεση με:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Εισέλθετε", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Σύνδεση ως επισκέπτης", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Σύνδεση με Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Σύνδεση με Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Σύνδεση με Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Σύνδεση με ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Κάτοχος", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Ημερομηνία δημιουργίας", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Ημερομηνία τροποποίησης", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Περιγραφή", // Shown in the 'Map information' section describing the webmap
            snippet: "Σύνοψη", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Περιορισμοί στην πρόσβαση και τη χρήση", // Shown in the map information section indicating the webmap license information
            accessInformation: "Συντελεστές", // Shown in the 'Map information' section indicating account credits
            tags: "Ετικέτες", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Αριθμός προβολών", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Αξιολόγηση", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Η παραμετροποιημένη ομάδα δεν είναι έγκυρη ή δεν έχει γίνει ακόμη κοινοποίηση στοιχείων σε αυτήν την ομάδα.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Πληροφορίες χάρτη" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Δεν βρέθηκαν στοιχεία", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Δεν βρέθηκαν στοιχεία κοντά σας", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Δεν είναι δυνατή η ολοκλήρωση της ενέργειας", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Μετάβαση στην κύρια λίστα", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Προβολή χάρτη" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Οι αναφορές μου", // Command button shown in mobile menu list
            signIn: "Είσοδος", // Command button shown in mobile menu list and in appheader
            signOut: "Έξοδος", // Command button shown in mobile menu list
            signInTooltip: "Εισέλθετε", // Tooltip to 'Sign in' option
            signOutTooltip: "Έξοδος", // Tooltip  to 'Sign out' option
            myReportTooltip: "Προβολή των αναφορών μου" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "ΛΕΠΤΟΜΕΡΕΙΕΣ", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Συνημμένα", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Αναζήτηση", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Τοποθεσία", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Αναφορά", // Command button to submit the geoform to report an issue
            cancelButton: "Ακύρωση", //Command button to close the geoform
            requiredField: "(απαιτούμενο)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Επιλέξτε&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Εισαγάγετε μια έγκυρη τιμή.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Τα πεδία του θεματικού επιπέδου δεν έχουν παραμετροποιηθεί για την καταγραφή δεδομένων", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Εισαγάγετε έναν ακέραιο αριθμό", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Εισαγάγετε έναν ακέραιο αριθμό", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Εισαγάγετε έναν αριθμό", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Εισαγάγετε έναν αριθμό", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Δώστε τιμές για όλα τα απαιτούμενα πεδία.", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Επιλέξτε τη θέση για την αναφορά σας", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Υπόδειξη:${closeStrong} ελάχιστη τιμή ${minValue} και μέγιστη τιμή ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Υπόδειξη:${closeStrong} ελάχιστη ημερομηνία ${minValue} και μέγιστη ημερομηνία ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Δεν ήταν δυνατή η υποβολή της αναφοράς", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "συνημμένα επιλέχθηκαν", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "Απέτυχε η μεταφόρτωση ${failed} από ${total} συνημμένων", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Η τρέχουσα τοποθεσία δεν είναι διαθέσιμη",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Η τρέχουσα τοποθεσία είναι εκτός της έκτασης του υποβάθρου",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Αναφορά", // Command button to open the geoform
            cancelButtonTooltip: "Ακύρωση", //tooltip for cancel button
            geoformBackButtonTooltip: "Μετάβαση στη λίστα αναφορών" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Διεύθυνση:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Γεωγραφικό πλάτος/Γεωγραφικό μήκος", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Δεν βρέθηκαν αποτελέσματα", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Εισαγάγετε μια διεύθυνση για αναζήτηση", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Η εντοπισμένη διεύθυνση είναι εκτός της έκτασης του υποβάθρου", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Αναζήτηση", // Tooltip for search button
            clearButtonTooltip: "Απαλοιφή τιμής αναζήτησης" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Οι αναφορές μου", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Οι αναφορές μου", // Command button to access issues reported by the logged in user
            noResultsFound: "Δεν βρέθηκαν αναφορές." // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Μου αρέσει", // Command button for up-voting a report
            likeButtonTooltip: "Ψηφίστε για αυτήν την αναφορά",  // Tooltip for Like button
            commentButtonLabel: "Σχόλιο", // Command button for submitting feedback
            commentButtonTooltip: "Σχολιάστε αυτήν την αναφορά", // Tooltip for Comment button
            galleryButtonLabel: "ΣΥΛΛΟΓΗ", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Δείτε τα συνημμένα έγγραφα", // Tooltip for command button shown in details panel
            mapButtonLabel: "Προβολή στο χάρτη", // Command button shown in details panel
            mapButtonTooltip: "Προβολή της τοποθεσίας αυτής της αναφοράς", // Tooltip for Gallery button
            commentsListHeading: "Σχόλια", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Δεν είναι δυνατή η μέτρηση της ψήφου σας αυτήν τη στιγμή.", // Error message for feature unable to update
            gotoIssueListTooltip: "Μετάβαση στη λίστα αναφορών" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Ψήφοι για αυτήν την αναφορά", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Φόρτωση περισσότερων δεδομένων..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Υποβολή σχολίου",
            commentsFormCancelButton: "Ακύρωση",
            errorInSubmittingComment: "Δεν ήταν δυνατή η υποβολή του σχολίου.", // Shown when user is unable to add comments
            emptyCommentMessage: "Εισαγάγετε ένα σχόλιο.", // Shown when user submits a comment without any text/character
            placeHolderText: "Πληκτρολογήστε ένα σχόλιο", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Δεν υπάρχουν διαθέσιμα σχόλια", // Shown when no comments are available for the selected issue
            remainingTextCount: "Απομένουν ${0} χαρακτήρες", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Όχι" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "ΣΥΛΛΟΓΗ",
            noAttachmentsAvailableText: "Δεν βρέθηκαν συνημμένα" // Shown when no comments are available for the selected issue
        }
    })
);
