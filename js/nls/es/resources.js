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
            error: "No se puede crear el mapa",
            zoomInTooltip: "Acercar",  // Command button to zoom in to the map
            zoomOutTooltip: "Alejar",  // Command button to zoom out of the map
            geolocationTooltip: "Ubicación actual"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "No hay ningún grupo configurado", // Shown when no group is configured in the configuration file
            submitReportButtonText: "á_Submit a Report______Ó", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Vista de lista", // Go to List view tooltip text
            noFeatureGeomtery: "No se puede mostrar la entidad" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Continuar como invitado", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "O", // Or text on sign in screen
            signinOptionsText: "Inicia sesión con:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Inicia sesión", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Inicia sesión como invitado", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Inicia sesión con Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Inicia sesión con Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Inicia sesión con Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Inicia sesión en ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Propietario", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Fecha creada", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Fecha de modificación", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Descripción", // Shown in the 'Map information' section describing the webmap
            snippet: "Resumen", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Restricciones de acceso y uso", // Shown in the map information section indicating the webmap license information
            accessInformation: "Créditos", // Shown in the 'Map information' section indicating account credits
            tags: "Etiquetas", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Número de vistas", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Calificación", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "El grupo configurado no es válido o todavía no se han compartido elementos con este grupo.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Información del mapa" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "No se ha encontrado ninguna entidad", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "No se encontraron entidades cerca de ti", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "No se puede completar la operación", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Ir a lista principal", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Vista del mapa" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Mis informes", // Command button shown in mobile menu list
            signIn: "Iniciar sesión", // Command button shown in mobile menu list and in appheader
            signOut: "Cerrar sesión", // Command button shown in mobile menu list
            signInTooltip: "Iniciar sesión", // Tooltip to 'Sign in' option
            signOutTooltip: "Cerrar sesión", // Tooltip  to 'Sign out' option
            myReportTooltip: "Ver mis informes" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Detalles", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Adjuntos", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Examinar", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Ubicación", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Informar", // Command button to submit the geoform to report an issue
            cancelButton: "Cancelar", //Command button to close the geoform
            requiredField: "(necesario)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Seleccionar&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Introduce un valor válido.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Los campos de la capa no están configurados para capturar datos", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Introduce un entero", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Introduce un entero", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Por favor, entre un número", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Por favor, entre un número", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Indica valores para todos los campos obligatorios", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Selecciona la ubicación para el informe", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Sugerencia:${closeStrong} Valor mínimo ${minValue} y valor máximo ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Sugerencia:${closeStrong} Fecha mínima ${minValue} y fecha máxima ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "No se pudo enviar el informe", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "adjuntos seleccionados", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "Error al cargar ${failed} de ${total} adjuntos", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Ubicación actual no disponible",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "La ubicación actual está fuera de la extensión del mapa base",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "á_Submit___Ó", // Command button to open the geoform
            cancelButtonTooltip: "Cancelar", //tooltip for cancel button
            geoformBackButtonTooltip: "á_Return to the report list_________Ó" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Dirección:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Latitud/longitud", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Ningún resultado encontrado", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Introduce una dirección para buscar", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "La dirección localizada está fuera de la extensión del mapa base", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Búsqueda", // Tooltip for search button
            clearButtonTooltip: "Borrar valor de búsqueda" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Mis informes", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Mis informes", // Command button to access issues reported by the logged in user
            noResultsFound: "No se encontraron informes" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "á_Vote__Ó", // Command button for up-voting a report
            likeButtonTooltip: "Votar este informe",  // Tooltip for Like button
            commentButtonLabel: "Comentario", // Command button for submitting feedback
            commentButtonTooltip: "Comentar este informe", // Tooltip for Comment button
            galleryButtonLabel: "Galería", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Ver documentos adjuntos", // Tooltip for command button shown in details panel
            mapButtonLabel: "Ver en mapa", // Command button shown in details panel
            mapButtonTooltip: "Ver la ubicación de este informe", // Tooltip for Gallery button
            commentsListHeading: "Comentarios", // List heading for Comments section in details panel
            unableToUpdateVoteField: "No es posible contar tu voto en este momento.", // Error message for feature unable to update
            gotoIssueListTooltip: "Ir a lista de informes" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Vota este informe", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Cargar más..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Enviar comentario",
            commentsFormCancelButton: "Cancelar",
            errorInSubmittingComment: "No se pudo enviar el comentario.", // Shown when user is unable to add comments
            emptyCommentMessage: "Introduzca un comentario.", // Shown when user submits a comment without any text/character
            placeHolderText: "Escribe un comentario", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "No hay comentarios disponibles", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} caracteres restantes", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "No" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galería",
            noAttachmentsAvailableText: "No se encontraron adjuntos" // Shown when no comments are available for the selected issue
        }
    })
);
