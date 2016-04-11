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
            error: "Impossible de créer la carte",
            zoomInTooltip: "Zoom avant",  // Command button to zoom in to the map
            zoomOutTooltip: "Zoom arrière",  // Command button to zoom out of the map
            geolocationTooltip: "Position actuelle"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Aucun groupe configuré", // Shown when no group is configured in the configuration file
            submitReportButtonText: "æ_Submit a Report______Â", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Vue Liste", // Go to List view tooltip text
            noFeatureGeomtery: "Impossible d\'afficher l\'entité" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Continuer comme invité", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Ou", // Or text on sign in screen
            signinOptionsText: "Se connecter avec :", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Connectez-vous", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Se connecter comme invité", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Se connecter avec Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Se connecter avec Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Se connecter avec Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Se connecter avec ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Propriétaire", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Date de création", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Date de modification", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Description", // Shown in the 'Map information' section describing the webmap
            snippet: "Résumé", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Restrictions d\'accès et d\'utilisation", // Shown in the map information section indicating the webmap license information
            accessInformation: "Crédits", // Shown in the 'Map information' section indicating account credits
            tags: "Balises", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Nombre de vues", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Evaluation", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Le groupe configuré n\'est pas valide ou aucun élément n\'a encore été partagé avec ce groupe.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Informations sur la carte" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Aucune entité trouvée", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Aucune entité trouvée à proximité de votre position", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Impossible d\'exécuter l\'opération", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Accéder à la liste principale", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Vue cartographique" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Mes rapports", // Command button shown in mobile menu list
            signIn: "Connexion", // Command button shown in mobile menu list and in appheader
            signOut: "Déconnexion", // Command button shown in mobile menu list
            signInTooltip: "Connexion", // Tooltip to 'Sign in' option
            signOutTooltip: "Déconnexion", // Tooltip  to 'Sign out' option
            myReportTooltip: "Afficher mes rapports" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Détails", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Pièces jointes", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Parcourir", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Emplacement", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Signaler", // Command button to submit the geoform to report an issue
            cancelButton: "Annuler", //Command button to close the geoform
            requiredField: "(requis)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Sélectionner&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Entrez une valeur valide.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Les champs de couche ne sont pas configurés pour capturer les données", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Entrez un entier", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Entrez un entier", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Please enter a number", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Please enter a number", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Indiquez des valeurs pour tous les champs requis", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Sélectionnez l\'emplacement de votre rapport", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Astuce :${closeStrong} valeur minimale ${minValue} et valeur maximale ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Astuce :${closeStrong} date minimum ${minValue} et date maximum ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Impossible d\'envoyer le rapport", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "pièce(s) jointe(s) sélectionnée(s)", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "Echec du chargement de ${failed} sur ${total} pièce(s) jointe(s)", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Localisant actuel non disponible",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "L\'étendue courante est en dehors de l\'étendue du fond de carte",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "æ_Submit___Â", // Command button to open the geoform
            cancelButtonTooltip: "Annuler", //tooltip for cancel button
            geoformBackButtonTooltip: "æ_Return to the report list_________Â" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Adresse :", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Latitude/Longitude", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Aucun résultat trouvé", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Entrer une adresse à rechercher", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "L\'adresse localisée est en dehors de l\'étendue du fond de carte", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Rechercher", // Tooltip for search button
            clearButtonTooltip: "Effacer la valeur de recherche" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Mes rapports", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Mes rapports", // Command button to access issues reported by the logged in user
            noResultsFound: "Aucun rapport trouvé" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "æ_Vote__Â", // Command button for up-voting a report
            likeButtonTooltip: "Voter pour ce rapport",  // Tooltip for Like button
            commentButtonLabel: "Commentaire", // Command button for submitting feedback
            commentButtonTooltip: "Commenter ce rapport", // Tooltip for Comment button
            galleryButtonLabel: "Bibliothèque", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Voir les documents joints", // Tooltip for command button shown in details panel
            mapButtonLabel: "Afficher sur la carte", // Command button shown in details panel
            mapButtonTooltip: "Afficher l\'emplacement de ce rapport", // Tooltip for Gallery button
            commentsListHeading: "Commentaires", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Il est actuellement impossible de comptabiliser votre vote.", // Error message for feature unable to update
            gotoIssueListTooltip: "Accéder à la liste des rapports" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Votes pour ce rapport", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Charger plus..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Envoyer un commentaire",
            commentsFormCancelButton: "Annuler",
            errorInSubmittingComment: "Impossible d\'envoyer le commentaire.", // Shown when user is unable to add comments
            emptyCommentMessage: "Saisissez un commentaire.", // Shown when user submits a comment without any text/character
            placeHolderText: "Saisir un commentaire", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Aucun commentaire disponible", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} caractère(s) restant(s)", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Non" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Bibliothèque",
            noAttachmentsAvailableText: "Aucune pièce jointe trouvée" // Shown when no comments are available for the selected issue
        }
    })
);
