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
    root: ({
        map: {
            error: "No es pot crear el mapa",
            zoomInTooltip: "Amplia",  // Command button to zoom in to the map
            zoomOutTooltip: "Redueix",  // Command button to zoom out of the map
            geolocationTooltip: "Ubicació actual"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "No hi ha cap grup configurat", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Envia un informe", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Visualització de llista", // Go to List view tooltip text
            noFeatureGeomtery: "L\'entitat no es pot mostrar", // Error message when geometry is not available
            featureOutsideAOIMessage: "L\'entitat no es pot afegir fora de l\'àrea d\'estudi", // Error message when feature edits are performed outside the study area
            noEditingPermissionsMessage: "No teniu permís per fer aquesta acció.", //Message when user do not have editing permissions
            basemapGalleryText: "Galeria de mapes base", // Basemap gallery text
            legendText: "Llegenda" //Legend text

        },
        signin: {
            guestSigninText: "Continua com a convidat", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "O bé,", // Or text on sign in screen
            signinOptionsText: "Inicia la sessió amb:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Inicieu la sessió", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Inicia la sessió com a convidat", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Inicia la sessió amb el Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Inicia la sessió amb el Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Inicia la sessió amb el Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Inicia la sessió amb l\'ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Propietari", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Data de creació", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Data de modificació", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Descripció", // Shown in the 'Map information' section describing the webmap
            snippet: "Resum", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Restriccions d\'ús i d\'accés", // Shown in the map information section indicating the webmap license information
            accessInformation: "Crèdits", // Shown in the 'Map information' section indicating account credits
            tags: "Etiquetes", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Nombre de visualitzacions", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Qualificació", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "El grup que s\'ha configurat no és vàlid o no s\'ha compartit cap element amb aquest grup encara.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Informació del mapa" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "No s\'ha trobat cap entitat", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "No s\'ha trobat cap entitat a prop vostre", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "No es pot completar l\'operació", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Ves a la llista principal", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Visualització del mapa" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Els meus enviaments", // Command button shown in mobile menu list
            signIn: "Inicia la sessió", // Command button shown in mobile menu list and in appheader
            signOut: "Tanca la sessió", // Command button shown in mobile menu list
            signInTooltip: "Inicia la sessió", // Tooltip to 'Sign in' option
            signOutTooltip: "Tanca la sessió", // Tooltip  to 'Sign out' option
            myReportTooltip: "Visualitza els meus enviaments" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Detalls", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Fitxers adjunts", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Navega", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Ubicació", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Informa\'n", // Command button to submit the geoform to report an issue
            editReportButton: "Actualitza", // Command button to edit reported issue
            cancelButton: "Cancel·la", //Command button to close the geoform
            requiredField: "(obligatori)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Selecciona&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Introduïu un valor vàlid.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Els camps de la capa no estan configurats per capturar dades", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Introduïu un enter", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Introduïu un enter", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Introduïu un nombre", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Introduïu un nombre", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Proporcioneu valors per a tots els camps obligatoris", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Seleccioneu la ubicació per a l\'informe", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Suggeriment:${closeStrong} valor mínim ${minValue} i valor màxim ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Suggeriment:${closeStrong} data mínima ${minValue} i data màxima ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Els valors no es poden enviar.", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "fitxers adjunts seleccionats", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "No s\'han pogut pujar ${failed} de ${total} fitxers adjunts", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Ubicació actual no disponible",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "La ubicació actual està fora de l\'extensió del mapa base",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Envia", // Command button to open the geoform
            cancelButtonTooltip: "Cancel·la", //tooltip for cancel button
            geoformBackButtonTooltip: "Torna a la llista", //tooltip for Geoform back button
            locationSelectionHintForPointLayer : "Toqueu el mapa per dibuixar la ubicació.", //hint text for selecting location incase of point layer
            locationSelectionHintForPolygonLayer : "Toqueu el mapa per dibuixar la ubicació. Toqueu dues vegades per completar el dibuix.", //hint text for selecting location incase of line and polygon layer
            locationSelectionHintForPointLayerDesktop : "Feu clic al mapa per dibuixar la ubicació.", //hint text for selecting location incase of point layer
            locationSelectionHintForPolygonLayerDesktop : "Feu clic al mapa per dibuixar la ubicació. Feu doble clic per completar el dibuix." //hint text for selecting location incase of line and polygon layer
        },
        locator: {
            addressText: "Adreça:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Latitud/longitud", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "No s\'ha trobat cap resultat", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Introduïu una adreça per cercar", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "La ubicació està fora de l\'àrea d\'enviament", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Cerca", // Tooltip for search button
            clearButtonTooltip: "Esborra el valor de cerca" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Els meus enviaments", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Els meus enviaments", // Command button to access issues reported by the logged in user
            noResultsFound: "No s\'ha trobat cap enviament" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "", // Command button for up-voting a report
            likeButtonTooltip: "Accepto",  // Tooltip for Like button
            commentButtonLabel: "", // Command button for submitting feedback
            commentButtonTooltip: "Deixa una resposta", // Tooltip for Comment button
            galleryButtonLabel: "", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Visualitza els documents adjunts", // Tooltip for command button shown in details panel
            mapButtonLabel: "Visualitza-ho al mapa", // Command button shown in details panel
            mapButtonTooltip: "Visualitza la ubicació d\'aquest enviament", // Tooltip for Gallery button
            commentsListHeading: "Comentaris", // List heading for Comments section in details panel
            unableToUpdateVoteField: "El vostre vot no es pot comptabilitzar en aquest moment.", // Error message for feature unable to update
            gotoIssueListTooltip: "Visualitza la llista d\'enviaments", // Tooltip for back icon in Issue list header
            deleteMessage : "Segur que ho voleu suprimir?", //shown when user tries to delete a report or comment
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Nombre de vots", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Carrega\'n més..." //Text for load more button
        },
        comment: {
            commentsFormHeading: "Comentari",
            commentsFormSubmitButton: "Envia el comentari",
            commentsFormEditButton: "Actualitza el comentari",
            commentsFormCancelButton: "Cancel·la",
            errorInSubmittingComment: "El comentari no s\'ha pogut enviar.", // Shown when user is unable to add comments
            emptyCommentMessage: "Introduïu un comentari.", // Shown when user submits a comment without any text/character
            placeHolderText: "Escriviu un comentari", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "No hi ha cap comentari disponible", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} caràcters restants", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "No", // Shown when comments character limit is exceeded
            selectAttachments: "Fitxers adjunts", // Appears above 'Select file' button indicating option to attach files while adding comments
            selectFileText: "Navega", // Command button to open a dialog box to select file(s) to be attached
            attachmentSelectedMsg: "fitxers adjunts seleccionats", // Shown besides the select file button indicating the number of files attached
            attachmentHeaderText: "Fitxers adjunts", //attachment header Text
            unknownCommentAttachment: "FILE", // displayed for attached file having unknown extension
            editRecordText: "Edita", // Displayed on hover of edit comment button
            deleteRecordText: "Suprimeix", // Displayed on hover of delete comment button
            deleteCommentFailedMessage: "No es pot suprimir el comentari" // Displayed when delete comment operation gets failed
        },
        gallery: {
            galleryHeaderText: "Galeria",
            noAttachmentsAvailableText: "No s\'ha trobat cap fitxer adjunt" // Shown when no comments are available for the selected issue
        }
    }),
    "ar": 1,
    "bs": 1,
    "ca": 0,
    "cs": 1,
    "da": 1,
    "de": 1,
    "el": 1,
    "es": 1,
    "et": 1,
    "fi": 1,
    "fr": 1,
    "he": 1,
    "hi": 1,
    "hr": 1,
    "hu": 0,
    "id": 1,
    "it": 1,
    "ja": 1,
    "ko": 1,
    "lt": 1,
    "lv": 1,
    "nb": 1,
    "nl": 1,
    "pl": 1,
    "pt-br": 1,
    "pt-pt": 1,
    "ro": 1,
    "ru": 1,
    "sl": 1,
    "sr": 1,
    "sv": 1,
    "th": 1,
    "tr": 1,
    "vi": 1,
    "zh-cn": 1,
    "zh-hk": 1,
    "zh-tw": 1
});
