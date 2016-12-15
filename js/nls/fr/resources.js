﻿/*global define */
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
    "error": "Impossible de créer la carte",
    "zoomInTooltip": "Zoom avant",
    "zoomOutTooltip": "Zoom arrière",
    "geolocationTooltip": "Position actuelle"
  },
  "main": {
    "noGroup": "Aucun groupe configuré",
    "submitReportButtonText": "Envoyer un rapport",
    "gotoListViewTooltip": "Vue Liste",
    "noFeatureGeomtery": "Impossible d'afficher l'entité",
    "featureOutsideAOIMessage": "æ_Feature cannot be added outside study area______________Â"
  },
  "signin": {
    "guestSigninText": "Continuer comme invité",
    "signInOrText": "Ou",
    "signinOptionsText": "Se connecter avec :",
    "noGroupNameText": "Connectez-vous",
    "guestLoginTooltip": "Se connecter comme invité",
    "facebookLoginTooltip": "Se connecter avec Facebook",
    "twitterLoginTooltip": "Se connecter avec Twitter",
    "googlePlusLoginTooltip": "Se connecter avec Google+",
    "agolLoginTooltip": "Se connecter avec ArcGIS"
  },
  "webMapList": {
    "owner": "Propriétaire",
    "created": "Date de création",
    "modified": "Date de modification",
    "description": "Description",
    "snippet": "Résumé",
    "licenseInfo": "Restrictions d'accès et d'utilisation",
    "accessInformation": "Crédits",
    "tags": "Balises",
    "numViews": "Nombre de vues",
    "avgRating": "Evaluation",
    "noWebMapInGroup": "Le groupe configuré n'est pas valide ou aucun élément n'a encore été partagé avec ce groupe.",
    "infoBtnToolTip": "Informations sur la carte"
  },
  "issueWall": {
    "noResultsFound": "Aucune entité trouvée",
    "noResultsFoundInCurrentBuffer": "Aucune entité trouvée à proximité de votre position",
    "unableToFetchFeatureError": "Impossible d'exécuter l'opération",
    "gotoWebmapListTooltip": "Accéder à la liste principale",
    "gotoMapViewTooltip": "Vue cartographique"
  },
  "appHeader": {
    "myReport": "Mes rapports",
    "signIn": "Connexion",
    "signOut": "Déconnexion",
    "signInTooltip": "Connexion",
    "signOutTooltip": "Déconnexion",
    "myReportTooltip": "Afficher mes rapports"
  },
  "geoform": {
    "enterInformation": "Détails",
    "selectAttachments": "Pièces jointes",
    "selectFileText": "Parcourir",
    "enterLocation": "Emplacement",
    "reportItButton": "Signaler",
    "editReportButton": "æ_Update___Â",
    "cancelButton": "Annuler",
    "requiredField": "(requis)",
    "selectDefaultText": "Sélectionner&hellip;",
    "invalidInputValue": "Entrez une valeur valide.",
    "noFieldsConfiguredMessage": "Les champs de couche ne sont pas configurés pour capturer les données",
    "invalidSmallNumber": "Entrez un entier",
    "invalidNumber": "Entrez un entier",
    "invalidFloat": "Please enter a number",
    "invalidDouble": "Please enter a number",
    "requiredFields": "Indiquez des valeurs pour tous les champs requis",
    "selectLocation": "Sélectionnez l'emplacement de votre rapport",
    "numericRangeHintMessage": "${openStrong}Astuce :${closeStrong} valeur minimale ${minValue} et valeur maximale ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Astuce :${closeStrong} date minimum ${minValue} et date maximum ${maxValue}",
    "errorsInApplyEdits": "Impossible d'envoyer le rapport",
    "attachmentSelectedMsg": "pièce(s) jointe(s) sélectionnée(s)",
    "attachmentUploadStatus": "Echec du chargement de ${failed} sur ${total} pièce(s) jointe(s)",
    "geoLocationError": "Localisant actuel non disponible",
    "geoLocationOutOfExtent": "L'étendue courante est en dehors de l'étendue du fond de carte",
    "submitButtonTooltip": "Envoyer",
    "cancelButtonTooltip": "Annuler",
    "geoformBackButtonTooltip": "Revenir à la liste des rapports"
  },
  "locator": {
    "addressText": "Adresse :",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Latitude/Longitude",
    "invalidSearch": "Aucun résultat trouvé",
    "locatorPlaceholder": "Entrer une adresse à rechercher",
    "locationOutOfExtent": "L'adresse localisée est en dehors de l'étendue du fond de carte",
    "searchButtonTooltip": "Rechercher",
    "clearButtonTooltip": "Effacer la valeur de recherche"
  },
  "myIssues": {
    "title": "Mes rapports",
    "myIssuesTooltip": "Mes rapports",
    "noResultsFound": "Aucun rapport trouvé"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "æ_I agree___Â",
    "commentButtonLabel": "",
    "commentButtonTooltip": "æ_Leave a reply_____Â",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Voir les documents joints",
    "mapButtonLabel": "Afficher sur la carte",
    "mapButtonTooltip": "Afficher l'emplacement de ce rapport",
    "commentsListHeading": "Commentaires",
    "unableToUpdateVoteField": "Il est actuellement impossible de comptabiliser votre vote.",
    "gotoIssueListTooltip": "Accéder à la liste des rapports",
    "deleteMessage": "æ_Are you sure you want to delete___________Â?"
  },
  "itemList": {
    "likesForThisItemTooltip": "Votes pour ce rapport",
    "loadMoreButtonText": "Charger plus..."
  },
  "comment": {
    "commentsFormHeading": "æ_Comment___Â",
    "commentsFormSubmitButton": "Envoyer un commentaire",
    "commentsFormEditButton": "æ_Update Comment_____Â",
    "commentsFormCancelButton": "Annuler",
    "errorInSubmittingComment": "Impossible d'envoyer le commentaire.",
    "emptyCommentMessage": "Saisissez un commentaire.",
    "placeHolderText": "Saisir un commentaire",
    "noCommentsAvailableText": "Aucun commentaire disponible",
    "remainingTextCount": "${0} caractère(s) restant(s)",
    "showNoText": "Non",
    "selectAttachments": "æ_Attachments____Â",
    "selectFileText": "æ_Browse___Â",
    "attachmentSelectedMsg": "æ_attachment(s) selected________Â",
    "attachmentHeaderText": "æ_Attachments____Â",
    "unknownCommentAttachment": "æ_FILE__Â",
    "editRecordText": "æ_Edit__Â",
    "deleteRecordText": "æ_Delete___Â",
    "deleteCommentFailedMessage": "æ_Unable to delete comment________Â"
  },
  "gallery": {
    "galleryHeaderText": "Bibliothèque",
    "noAttachmentsAvailableText": "Aucune pièce jointe trouvée"
  }
});