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
            error: "Não foi possível criar o mapa",
            zoomInTooltip: "Mais Zoom",  // Command button to zoom in to the map
            zoomOutTooltip: "Menos Zoom",  // Command button to zoom out of the map
            geolocationTooltip: "Local Atual"  // Command button to navigate to the current geographical position
        },
        main: {
            noGroup: "Nenhum grupo configurado", // Shown when no group is configured in the configuration file
            submitReportButtonText: "Enviar um relatório", //Submit report  text for buttons on map and list
            gotoListViewTooltip: "Visualização da lista", // Go to List view tooltip text
            noFeatureGeomtery: "A feição não pode ser exibida" // Error message when geomtery is not available
        },
        signin: {
            guestSigninText: "Prosseguir como Convidado", // Shown in the 'Sign in' page below the icon for accessing application as an anonymous user
            signInOrText: "Ou", // Or text on sign in screen
            signinOptionsText: "Entrar com:", // Shown in the 'Sign in' page above the icons for social media sign in
            noGroupNameText: "Entrar", // Shown when the group title is not available or the group is private
            guestLoginTooltip: "Entrar como um convidado", // Command button to access the application as an anonymous user
            facebookLoginTooltip: "Entrar com Facebook", // Command button to access the application via Facebook login
            twitterLoginTooltip: "Entrar com Twitter", // Command button to access the application via Twitter login
            googlePlusLoginTooltip: "Entrar com Google+", // Command button to access the application via Google+ login
            agolLoginTooltip: "Entrar com ArcGIS" // Command button to access the application via AGOL login
        },
        webMapList: {
            owner: "Proprietário", // Shown in the 'Map information' section indicating the owner of the webmap
            created: "Data de criação", // Shown in the 'Map information' section indicating the date when the webmap was created
            modified: "Data modificada", // Shown in the 'Map information' section indicating the date when the webmap was modified
            description: "Descrição", // Shown in the 'Map information' section describing the webmap
            snippet: "Resumo", // Shown in the 'Map information' section providing the summary of the webmap
            licenseInfo: "Restrições de uso e acesso", // Shown in the map information section indicating the webmap license information
            accessInformation: "Créditos", // Shown in the 'Map information' section indicating account credits
            tags: "Tags", // Shown in the 'Map information' section indicating tags of the webmap
            numViews: "Número de visualizações", // Shown in the 'Map information' section indicating number of times the webmap has been viewed
            avgRating: "Classificação", // Shown in the 'Map information' section indicating webmap rating
            noWebMapInGroup: "O grupo configurado é inválido ou nenhum item ainda foi compartilhado com este grupo.", // Shown when the configured group is invalid/private or no items have been shared with the group
            infoBtnToolTip: "Informações do Mapa" // Command button to view the 'Map information'
        },
        issueWall: {
            noResultsFound: "Nenhum relatório disponível na área atual", // Shown in the issue wall when no issues are present in the current map extent
            gotoWebmapListTooltip: "Ir para lista principal", // Tooltip for back icon in list header
            gotoMapViewTooltip: "Visualização do mapa" // Tooltip for map-it icon in list header
        },
        appHeader: {
            myReport: "Meus Relatórios", // Command button shown in mobile menu list
            signIn: "Acessar", // Command button shown in mobile menu list and in appheader
            signOut: "Sair", // Command button shown in mobile menu list
            help: "Ajuda", // Command button shown in mobile menu list
            signInTooltip: "Registrar", // Tooltip to 'Sign in' option
            signOutTooltip: "Sair", // Tooltip  to 'Sign out' option
            myReportTooltip: "Visualizar relatórios enviador por mim", // Tooltip  to 'My Reports' option
            helpTooltip: "Ajuda" // Tooltip  to 'Help' option
        },
        geoform: {
            enterInformation: "Detalhes", // Shown as the first section of the geoform, where the user can enter details of the issue
            selectAttachments: "Anexos", // Appears above 'Select file' button indicating option to attach files
            selectFileText: "Procurar", // Command button to open a dialog box to select file(s) to be attached
            enterLocation: "Localização", // Shown as the second section of the geoform, where the user can select a location on the map
            reportItButton: "Reportar Isto", // Command button to submit the geoform to report an issue
            cancelButton: "Cancelar", //Command button to close the geoform
            requiredField: "(exigido)", // Shown next to the field in which the data is mandatory
            selectDefaultText: "Selecionar&hellip;", // Shown in the dropdown field indicating to select an option
            invalidInputValue: "Insira um valor válido.", // Shown when user clicks/taps the required field but does not enter the data and comes out of the required field
            noFieldsConfiguredMessage: "Os campos da camada não configurados para capturar dados", // Shown when all the fields of the selected layer are disabled
            invalidSmallNumber: "Digite um número inteiro", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -32768 and 32767.)
            invalidNumber: "Digite um número inteiro", // Shown when the entered value is beyond the specified range (valid ${openStrong}integer${closeStrong} value between -2147483648 and 2147483647.)
            invalidFloat: "Digite um número", // Shown when the entered value is beyond the specified range (valid ${openStrong}floating point${closeStrong} value between -3.4E38 and 1.2E38 )
            invalidDouble: "Digite um número", // Shown when the entered value is beyond the specified range (valid ${openStrong}double${closeStrong} value between -2.2E308 and 1.8E308)
            requiredFields: "Forneça valores para todos os campos exigidos", // Shown when user submits the geoform without entering data in the mandatory field(s)
            selectLocation: "Selecione o local para seu relatório", // Shown when user submits the geoform without selecting location on the map
            numericRangeHintMessage: "${openStrong}Dica:${closeStrong} valor Mínimo ${minValue} e valor Máximo ${maxValue}", // Shown as a pop over above the fields with numeric values, indicating the minimum and maximum range
            dateRangeHintMessage: "${openStrong}Dica:${closeStrong} Data Mínima ${minValue} e Data Máxima ${maxValue}", // Shown as a pop over above the fields with date values, indicating the minimum and maximum date range
            errorsInApplyEdits: "Não foi possível reportar o problema", // Shown when there is an error in any of the services while submitting the geoform
            attachmentSelectedMsg: "anexos selecionados", // Shown besides the select file button indicating the number of files attached
            attachmentUploadStatus: "Falha ao carregar ${failed} de ${total} anexos", // Shown when there is error while uploading the attachment, while submitting the geoform
            geoLocationError: "O local atual não está disponível",  // Shown when the browser returns an error instead of the current geographical position
            geoLocationOutOfExtent: "O local atual está fora da extensão do mapa base",  // Shown when the current geographical position is out of the basemap extent
            submitButtonTooltip: "Reportar Isto", // Command button to open the geoform
            cancelButtonTooltip: "Cancelar", //tooltip for cancel button
            geoformBackButtonTooltip: "Ir para a lista do relatório" //tooltip for Geoform back button

        },
        locator: {
            addressText: "Endereço:", // Shown as a title for a group of addresses returned on performing unified search
            usngText: "USNG", // Shown as a title for a group of USNG values returned on performing unified search
            mgrsText: "MGRS", // Shown as a title for a group of MGRS values returned on performing unified search
            latLongText: "Latitude/Longitude", // Shown as a title for a group of latitude longitude values returned on performing unified search
            invalidSearch: "Nenhum resultado encontrado", // Shown in the address container when no results are returned on performing unified search
            locatorPlaceholder: "Digite um endereço para pesquisar", // Shown in the address container textbox as a placeholder
            locationOutOfExtent: "O endereço localizado está fora da extensão do mapa base", // Shown as an alert when the selected address in the search result is out of basemap extent
            searchButtonTooltip: "Pesquisar", // Tooltip for search button
            clearButtonTooltip: "Limpar valor de pesquisa" // Tooltip for Geocoder clear button
        },
        myIssues: {
            title: "Meus Relatórios", // Shown as a title in 'My issues' panel
            myIssuesTooltip: "Meus Relatórios", // Command button to access issues reported by the logged in user
            noResultsFound: "Nenhum relatório localizado" // Shown when no issues are reported by the logged in user
        },
        itemDetails: {  // Detailed information about an item and a list of its comments
            likeButtonLabel: "Como", // Command button shown in details panel
            likeButtonTooltip: "Vote por este relatório",  // Tooltip for command button shown in details panel
            commentButtonLabel: "Comentário", // Command button shown in details panel
            commentButtonTooltip: "Comente sobre este relatório", // Tooltip for command button shown in details panel
            galleryButtonLabel: "Galeria", // Command button shown in details panel
            galleryButtonTooltip: "Visualize documentos anexados", // Tooltip for command button shown in details panel
            mapButtonLabel: "Visualizar no Mapa", // Command button shown in details panel
            mapButtonTooltip: "Visualize o local deste relatório", // Tooltip for command button shown in details panel
            commentsListHeading: "Comentários", // List heading for Comments section in details panel
            unableToUpdateVoteField: "Seu voto não pode ser adicionado neste momento.", // Error message for feature unable to update
            gotoIssueListTooltip: "Ir para a lista do relatório" // Tooltip for back icon in Issue list header
        },
        itemList: {  // List of feature layer items shown in my-issues and issue-wall
            likesForThisItemTooltip: "Vote por este relatório" //Shown on hovering of the like icon in my-issues and issue-wall
        },
        comment: {
            commentsFormText: "Comentário",
            commentsFormSubmitButton: "Enviar Comentário",
            commentsFormCancelButton: "Cancelar",
            errorInSubmittingComment: "Não foi possível enviar o comentário.", // Shown when user is unable to add comments
            emptyCommentMessage: "Por favor, insira um comentário.", // Shown when user submits a comment without any text/character
            placeHolderText: "Digite um comentário", // Shown as a placeholder in comments textbox
            noCommentsAvailableText: "Nenhum comentário disponível", // Shown when no comments are available for the selected issue
            remainingTextCount: "${0} caracteres restantes", // Shown below the comments textbox indicating the number of characters that can be added
            showNoText: "Não" // Shown when comments character limit is exceeded
        },
        gallery: {
            galleryHeaderText: "Galeria",
            noAttachmentsAvailableText: "Nenhum anexo encontrado" // Shown when no comments are available for the selected issue
        }
    })
);
