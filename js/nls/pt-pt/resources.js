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
            error: "Não foi possível criar mapa",
            zoomInTooltip: "Aumentar Zoom",  // Command button to zoom in to the map
            zoomOutTooltip: "Reduzir zoom",  // Command button to zoom out of the map
            geolocationTooltip: "Localização atual"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Nenhum grupo configurado", // Shown when no group is configured in the configuration file
            submitReportButtonText: "ã_Submit a Report______Ç", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Vista de Lista", // Go to List view tooltip text
            noFeatureGeomtery: "Elemento não pode ser exibido" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Prosseguir como Convidado", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Ou", // Or text on sign in screen
            signinOptionsText: "Iniciar sessão com:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Por favor inicie sessão", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Iniciar sessão como convidado", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Iniciar sessão com Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Iniciar sessão com Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Iniciar sessão com Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Iniciar sessão com ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Proprietário", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Data criada", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Data de modificação", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Descrição", // Shown in the 'Map information' section describing the webmap
            snippet: "Resumo", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Restrições de utilização e acesso", // Shown in the map information section indicating the webmap license information
            accessInformation: "Créditos", // Shown in the 'Map information' section indicating account credits
            tags: "Palavras-chave", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Número de visualizações", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Avaliação", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "Grupo configurado é inválido ou itens não foram partilhados com este grupo.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Informação de mapa" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Não foram encontrados elementos", // Shown in the issue wall when no issues are present in layer
            noResultsFoundInCurrentBuffer: "Não foram encontrados elementos perto de si", // Shown in the issue wall when no issues are present in the current buffer extent
            unableToFetchFeatureError: "Não é possível completar a operação", // Shown in the issue wall when layer does not return any features and throws an error
            gotoWebmapListTooltip: "Ir para a lista principal", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Vista de mapa" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Meus Relatórios", // Command button shown in mobile menu list
            signIn: "Iniciar sessão", // Command button shown in mobile menu list and in appheader
            signOut: "Terminar sessão", // Command button shown in mobile menu list
            signInTooltip: "Iniciar sessão", // Tooltip to 'Sign in' option
            signOutTooltip: "Terminar Sessão", // Tooltip  to 'Sign out' option
            myReportTooltip: "Visualizar os meus relatórios" // Tooltip  to 'My Reports' option
        },
        geoform: {
            enterInformation: "Detalhes", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Anexos", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Procurar", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Local", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Reportar", // Command button to submit the geoform to report an issue
            cancelButton: "Cancelar", //Command button to close the geoform
            requiredField: "(exigido)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Select&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Por favor, introduza um valor válido.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Campos de camada não são configuraveis para capturar dados", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Por favor introduza um número inteiro", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Por favor introduza um número inteiro", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Por favor introduza um número", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Por favor introduza um número", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Por favor forneça valores para todos os campos solicitados", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Por favor seleccione uma localização para o seu relatório", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Hint:${closeStrong} valor Mínimo ${minValue} e valor Máximo ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Hint:${closeStrong} Data Mínima ${minValue} e Data Máxima ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "O relatório não pôde ser submetido", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "anexo(s) seleccionado(s)", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "${failed} do ${total} anexo(s) falhou a carregar", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "Localização actual não disponível",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "Localização actual está fora da extensão de mapa",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "ã_Submit___Ç", // Command button to open the geoform
            cancelButtonTooltip: "Cancelar", //tooltip for cancel button
            geoformBackButtonTooltip: "ã_Return to the report list_________Ç" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Endereço:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Latitude/Longitude", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Nenhum resultado encontrado", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Introduza um endereço de pesquisa", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "Endereço localizado está fora da extensão do mapa base", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Pesquisar", // Tooltip for search button
            clearButtonTooltip: "Limpar valor de pesquisa" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Meus Relatórios", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Meus Relatórios", // Command button to access issues reported by the logged in user
            noResultsFound: "Não foram descobertos relatórios" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "ã_Vote__Ç", // Command button for up-voting a report
            likeButtonTooltip: "Votar neste relatório",  // Tooltip for Like button
            commentButtonLabel: "Comentário", // Command button for submitting feedback
            commentButtonTooltip: "Comentar neste relatório", // Tooltip for Comment button
            galleryButtonLabel: "Galeria", // Command button for opening and closing attachment file gallery
            galleryButtonTooltip: "Ver documentos anexados", // Tooltip for command button shown in details panel
            mapButtonLabel: "Ver no mapa", // Command button shown in details panel
            mapButtonTooltip: "Ver a localização deste relatório", // Tooltip for Gallery button
            commentsListHeading: "Comentários", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Não é possível contar o seu voto neste momento.", // Error message for feature unable to update
            gotoIssueListTooltip: "Vá para a lista de relatório" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Votos para este relatório", //Shown on hovering of the like icon in my-issues and issue-wall
            loadMoreButtonText: "Carregar mais..." //Text for load more button
        },
        comment: {
            commentsFormSubmitButton: "Submeter Comentário",
            commentsFormCancelButton: "Cancelar",
            errorInSubmittingComment: "Comentário não pode ser submetido", // Shown when user is unable to add comments
            emptyCommentMessage: "Por favor introduza um comentário.", // Shown when user submits a comment without any text/character
            placeHolderText: "Escreva um comentário", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Não existem comentários disponíveis", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} caractere(s) mantem-se", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Não" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galeria",
            noAttachmentsAvailableText: "Não foram encontrados anexos" // Shown when no comments are available for the selected issue
        }
    })
);
