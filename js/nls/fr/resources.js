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
    "featureOutsideAOIMessage": "Impossible d’ajouter l'entité hors de la zone d'étude",
    "noEditingPermissionsMessage": "Vous n’êtes pas autorisé à effectuer cette action.",
    "basemapGalleryText": "Bibliothèque de fonds de carte",
    "legendText": "Légende"
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
    "myReport": "Mes envois",
    "signIn": "Connexion",
    "signOut": "Déconnexion",
    "signInTooltip": "Connexion",
    "signOutTooltip": "Déconnexion",
    "myReportTooltip": "Consulter mes envois"
  },
  "geoform": {
    "enterInformation": "Détails",
    "selectAttachments": "Pièces jointes",
    "selectFileText": "Parcourir",
    "enterLocation": "Emplacement",
    "reportItButton": "Signaler",
    "editReportButton": "Mettre à jour",
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
    "errorsInApplyEdits": "Impossible d’envoyer les valeurs.",
    "attachmentSelectedMsg": "pièce(s) jointe(s) sélectionnée(s)",
    "attachmentUploadStatus": "Echec du chargement de ${failed} sur ${total} pièce(s) jointe(s)",
    "geoLocationError": "Localisant actuel non disponible",
    "geoLocationOutOfExtent": "L'étendue courante est en dehors de l'étendue du fond de carte",
    "submitButtonTooltip": "Envoyer",
    "cancelButtonTooltip": "Annuler",
    "geoformBackButtonTooltip": "Retourner à la liste",
    "locationSelectionHintForPointLayer": "Touchez la carte pour tracer l’emplacement.",
    "locationSelectionHintForPolygonLayer": "Touchez la carte pour tracer l’emplacement. Touchez deux fois pour terminer le dessin.",
    "locationSelectionHintForPointLayerDesktop": "Cliquez sur la carte pour tracer l’emplacement.",
    "locationSelectionHintForPolygonLayerDesktop": "Cliquez sur la carte pour tracer l’emplacement. Doublez-cliquez pour terminer le dessin."
  },
  "locator": {
    "addressText": "Adresse :",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Latitude/Longitude",
    "invalidSearch": "Aucun résultat trouvé",
    "locatorPlaceholder": "Entrer une adresse à rechercher",
    "locationOutOfExtent": "L’emplacement est situé en dehors de la zone d’envoi",
    "searchButtonTooltip": "Rechercher",
    "clearButtonTooltip": "Effacer la valeur de recherche"
  },
  "myIssues": {
    "title": "Mes envois",
    "myIssuesTooltip": "Mes envois",
    "noResultsFound": "Aucun envoi trouvé"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "J'accepte",
    "commentButtonLabel": "",
    "commentButtonTooltip": "Laisser une réponse",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Voir les documents joints",
    "mapButtonLabel": "Afficher sur la carte",
    "mapButtonTooltip": "Visualiser l’emplacement de cet envoi",
    "commentsListHeading": "Commentaires",
    "unableToUpdateVoteField": "Il est actuellement impossible de comptabiliser votre vote.",
    "gotoIssueListTooltip": "Visualiser la liste des envois",
    "deleteMessage": "Etes-vous sûr de vouloir le supprimer ?"
  },
  "itemList": {
    "likesForThisItemTooltip": "Nombre de votes",
    "loadMoreButtonText": "Charger plus..."
  },
  "comment": {
    "commentsFormHeading": "Commentaire",
    "commentsFormSubmitButton": "Envoyer un commentaire",
    "commentsFormEditButton": "Mettre à jour un commentaire",
    "commentsFormCancelButton": "Annuler",
    "errorInSubmittingComment": "Impossible d'envoyer le commentaire.",
    "emptyCommentMessage": "Saisissez un commentaire.",
    "placeHolderText": "Saisir un commentaire",
    "noCommentsAvailableText": "Aucun commentaire disponible",
    "remainingTextCount": "${0} caractère(s) restant(s)",
    "showNoText": "Non",
    "selectAttachments": "Pièces jointes",
    "selectFileText": "Parcourir",
    "attachmentSelectedMsg": "pièce(s) jointe(s) sélectionnée(s)",
    "attachmentHeaderText": "Pièces jointes",
    "unknownCommentAttachment": "FICHIER",
    "editRecordText": "Modifie",
    "deleteRecordText": "Effacer",
    "deleteCommentFailedMessage": "Impossible de supprimer le commentaire"
  },
  "gallery": {
    "galleryHeaderText": "Bibliothèque",
    "noAttachmentsAvailableText": "Aucune pièce jointe trouvée"
  }
});