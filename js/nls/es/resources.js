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
    "error": "No se puede crear el mapa",
    "zoomInTooltip": "Acercar",
    "zoomOutTooltip": "Alejar",
    "geolocationTooltip": "Ubicación actual"
  },
  "main": {
    "noGroup": "No hay ningún grupo configurado",
    "submitReportButtonText": "Enviar un informe",
    "gotoListViewTooltip": "Vista de lista",
    "noFeatureGeomtery": "No se puede mostrar la entidad",
    "featureOutsideAOIMessage": "La entidad no puede agregarse fuera del área de estudio",
    "noEditingPermissionsMessage": "á_You do not have permission to perform this action________________Ó."
  },
  "signin": {
    "guestSigninText": "Continuar como invitado",
    "signInOrText": "O",
    "signinOptionsText": "Inicia sesión con:",
    "noGroupNameText": "Inicia sesión",
    "guestLoginTooltip": "Inicia sesión como invitado",
    "facebookLoginTooltip": "Inicia sesión con Facebook",
    "twitterLoginTooltip": "Inicia sesión con Twitter",
    "googlePlusLoginTooltip": "Inicia sesión con Google+",
    "agolLoginTooltip": "Inicia sesión en ArcGIS"
  },
  "webMapList": {
    "owner": "Propietario",
    "created": "Fecha creada",
    "modified": "Fecha de modificación",
    "description": "Descripción",
    "snippet": "Resumen",
    "licenseInfo": "Restricciones de acceso y uso",
    "accessInformation": "Créditos",
    "tags": "Etiquetas",
    "numViews": "Número de vistas",
    "avgRating": "Calificación",
    "noWebMapInGroup": "El grupo configurado no es válido o todavía no se han compartido elementos con este grupo.",
    "infoBtnToolTip": "Información del mapa"
  },
  "issueWall": {
    "noResultsFound": "No se ha encontrado ninguna entidad",
    "noResultsFoundInCurrentBuffer": "No se encontraron entidades cerca de ti",
    "unableToFetchFeatureError": "No se puede completar la operación",
    "gotoWebmapListTooltip": "Ir a lista principal",
    "gotoMapViewTooltip": "Vista del mapa"
  },
  "appHeader": {
    "myReport": "á_My Submissions_____Ó",
    "signIn": "Iniciar sesión",
    "signOut": "Cerrar sesión",
    "signInTooltip": "Iniciar sesión",
    "signOutTooltip": "Cerrar sesión",
    "myReportTooltip": "á_View my submissions_______Ó"
  },
  "geoform": {
    "enterInformation": "Detalles",
    "selectAttachments": "Adjuntos",
    "selectFileText": "Examinar",
    "enterLocation": "Ubicación",
    "reportItButton": "Informar",
    "editReportButton": "Actualizar",
    "cancelButton": "Cancelar",
    "requiredField": "(necesario)",
    "selectDefaultText": "Seleccionar&hellip;",
    "invalidInputValue": "Introduce un valor válido.",
    "noFieldsConfiguredMessage": "Los campos de la capa no están configurados para capturar datos",
    "invalidSmallNumber": "Introduce un entero",
    "invalidNumber": "Introduce un entero",
    "invalidFloat": "Por favor, entre un número",
    "invalidDouble": "Por favor, entre un número",
    "requiredFields": "Indica valores para todos los campos obligatorios",
    "selectLocation": "Selecciona la ubicación para el informe",
    "numericRangeHintMessage": "${openStrong}Sugerencia:${closeStrong} Valor mínimo ${minValue} y valor máximo ${maxValue}",
    "dateRangeHintMessage": "${openStrong}Sugerencia:${closeStrong} Fecha mínima ${minValue} y fecha máxima ${maxValue}",
    "errorsInApplyEdits": "á_Values could not be submitted__________Ó.",
    "attachmentSelectedMsg": "adjuntos seleccionados",
    "attachmentUploadStatus": "Error al cargar ${failed} de ${total} adjuntos",
    "geoLocationError": "Ubicación actual no disponible",
    "geoLocationOutOfExtent": "La ubicación actual está fuera de la extensión del mapa base",
    "submitButtonTooltip": "Enviar",
    "cancelButtonTooltip": "Cancelar",
    "geoformBackButtonTooltip": "á_Return to the list______Ó",
    "locationSelectionHintForPointLayer": "á_Tap the map to draw the location___________Ó.",
    "locationSelectionHintForPolygonLayer": "á_Tap the map to draw the location. Double tap to complete the drawing______________________Ó.",
    "locationSelectionHintForPointLayerDesktop": "á_Click the map to draw the location____________Ó.",
    "locationSelectionHintForPolygonLayerDesktop": "á_Click the map to draw the location. Double click to complete the drawing_______________________Ó."
  },
  "locator": {
    "addressText": "Dirección:",
    "usngText": "USNG",
    "mgrsText": "MGRS",
    "latLongText": "Latitud/longitud",
    "invalidSearch": "Ningún resultado encontrado",
    "locatorPlaceholder": "Introduce una dirección para buscar",
    "locationOutOfExtent": "á_Location is outside the submission area_____________Ó",
    "searchButtonTooltip": "Búsqueda",
    "clearButtonTooltip": "Borrar valor de búsqueda"
  },
  "myIssues": {
    "title": "á_My Submissions_____Ó",
    "myIssuesTooltip": "á_My Submissions_____Ó",
    "noResultsFound": "á_No submissions found_______Ó"
  },
  "itemDetails": {
    "likeButtonLabel": "",
    "likeButtonTooltip": "Acepto",
    "commentButtonLabel": "",
    "commentButtonTooltip": "Dejar una respuesta",
    "galleryButtonLabel": "",
    "galleryButtonTooltip": "Ver documentos adjuntos",
    "mapButtonLabel": "Ver en mapa",
    "mapButtonTooltip": "á_View the location of this submission____________Ó",
    "commentsListHeading": "Comentarios",
    "unableToUpdateVoteField": "No es posible contar tu voto en este momento.",
    "gotoIssueListTooltip": "á_View the list of submissions_________Ó",
    "deleteMessage": "¿Está seguro de que desea eliminar?"
  },
  "itemList": {
    "likesForThisItemTooltip": "á_Number of votes______Ó",
    "loadMoreButtonText": "Cargar más..."
  },
  "comment": {
    "commentsFormHeading": "Comentario",
    "commentsFormSubmitButton": "Enviar comentario",
    "commentsFormEditButton": "Actualizar comentario",
    "commentsFormCancelButton": "Cancelar",
    "errorInSubmittingComment": "No se pudo enviar el comentario.",
    "emptyCommentMessage": "Introduzca un comentario.",
    "placeHolderText": "Escribe un comentario",
    "noCommentsAvailableText": "No hay comentarios disponibles",
    "remainingTextCount": "${0} caracteres restantes",
    "showNoText": "No",
    "selectAttachments": "Adjuntos",
    "selectFileText": "Examinar",
    "attachmentSelectedMsg": "adjuntos seleccionados",
    "attachmentHeaderText": "Adjuntos",
    "unknownCommentAttachment": "ARCHIVO",
    "editRecordText": "Editar",
    "deleteRecordText": "Eliminar",
    "deleteCommentFailedMessage": "Incapaz de eliminar comentario"
  },
  "gallery": {
    "galleryHeaderText": "Galería",
    "noAttachmentsAvailableText": "No se encontraron adjuntos"
  }
});