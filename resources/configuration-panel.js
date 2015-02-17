{
    "values": {
        "group": "e96bd5b249a04235bcd7399cb80ee3cf",
        "theme": "#d15706",
        "signInSubtitle": "",
        "signInBackgroundImage": "/images/signinbg.png",
        "enableFacebook": true,
        "facebookAppId": "",
        "enableTwitter": true,
        "enableGoogleplus": true,
        "googleplusClientId": "",
        "applicationName": "",
        "applicationIcon": "/images/app-icon.png",
        "applicationFavicon": "/images/favicon.ico",
        "webMapInfoDescription": true,
        "webMapInfoSnippet": false,
        "webMapInfoOwner": true,
        "webMapInfoCreated": false,
        "webMapInfoModified": false,
        "webMapInfoLicenseInfo": false,
        "webMapInfoAccessInformation": false,
        "webMapInfoTags": false,
        "webMapInfoNumViews": false,
        "webMapInfoAvgRating": false,
        "submitMessage": "Thank you! Your report has been submitted.",
        "likeField": "",
        "commentField": "",
        "reportedByField": "",
        "zoomLevel": 12,
        "enableUSNGSearch": false,
        "enableMGRSSearch": false,
        "enableLatLongSearch": false
    },
    "configurationSettings": [
        {
            "category": "<b>Splash Page Settings</b>",
            "fields": [
                {
                    "type": "string",
                    "fieldName": "applicationName",
                    "label": "Title",
                    "tooltip": "Application title (max 34 chars)"
                },
                {
                    "type": "string",
                    "stringFieldOption": "textarea",
                    "fieldName": "signInSubtitle",
                    "label": "Subtitle",
                    "tooltip": "Text displayed below title on splash page (max 36 chars)"
                },
                {
                    "type": "string",
                    "fieldName": "signInBackgroundImage",
                    "tooltip": "Background image for login screen. Recommended 640x960.",
                    "label": "Splash Screen Image"
                },
                {
                    "type": "boolean",
                    "fieldName": "enableTwitter",
                    "label": "Allow users to sign in using Twitter",
                    "tooltip": "Enable to allow users to sign in using their Twitter credentials"
                },
                {
                    "type": "boolean",
                    "fieldName": "enableFacebook",
                    "label": "Allow users to sign in using Facebook",
                    "tooltip": "Enable to allow users to sign in using their Facebook credentials"
                },
                {
                    "type": "string",
                    "fieldName": "facebookAppId",
                    "label": "Facebook AppId",
                    "tooltip": "Facebook AppId"
                },

                {
                    "type": "boolean",
                    "fieldName": "enableGoogleplus",
                    "label": "Allow users to sign in using Google+",
                    "tooltip": "Enable to allow users to sign in using their Google+ credentials"
                },
                {
                    "type": "string",
                    "fieldName": "googleplusClientId",
                    "label": "Google+ Client ID",
                    "tooltip": "Google+ ClientId"
                }
            ]
        },
        {
            "category": "<b>Application Settings</b>",
            "fields": [

                {
                    "type": "string",
                    "fieldName": "applicationIcon",
                    "label": "Icon URL",
                    "tooltip": "URL to a 48px high graphic to display in the top left corner of application."
                },
                {
                    "type": "color",
                    "fieldName": "theme",
                    "tooltip": "Color theme to use",
                    "label": "Color Scheme"
                },
                {
                    "type": "string",
                    "stringFieldOption": "textarea",
                    "fieldName": "submitMessage",
                    "label": "Submit Message",
                    "tooltip": "Message displayed when a report is submitted successfully"
                }
            ]
        },
        {
            "category": "<b>Content Settings</b>",
            "fields": [
                {
                    "type": "group",
                    "label": "Select Group",
                    "tooltip": "Group displayed in the application"
                },
                {
                    "type": "string",
                    "fieldName": "reportedByField",
                    "label": "Reporter Name Field (optional)",
                    "tooltip": "Text field that stores the username of the person who created the feature. Field name must be the same across all layers and maps."
                },
                {
                    "type": "string",
                    "fieldName": "likeField",
                    "label": "Vote Field (optional)",
                    "tooltip": "Integer field that stores the vote count. Field name must be the same across all layers and maps."
                },
                {
                    "type": "string",
                    "fieldName": "commentField",
                    "label": "Comment Field (optional)",
                    "tooltip": "Text field in the comments tables that stores feedback. Field name must be the same across all layers and maps."
                },

                {
                    "type": "string",
                    "fieldName": "zoomLevel",
                    "label": "Zoom Level",
                    "tooltip": "Configure zoom level"
                },
                {
                    "type": "paragraph",
                    "value": "Choose the map information to display:"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoDescription",
                    "label": "Description",
                    "tooltip": "Enable to show webmap description"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoSnippet",
                    "label": "Short Summary",
                    "tooltip": "Enable to show webmap summary"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoOwner",
                    "label": "Owner Name",
                    "tooltip": "Enable to show webmap owner"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoCreated",
                    "label": "Creation Date",
                    "tooltip": "Enable to show webmap created date"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoModified",
                    "label": "Modification Date",
                    "tooltip": "Enable to show webmap modified date"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoLicenseInfo",
                    "label": "Access and Use Constraints",
                    "tooltip": "Enable to show webmap licensing information"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoAccessInformation",
                    "label": "Credits",
                    "tooltip": "Enable to show webmap credits"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoTags",
                    "label": "Tags",
                    "tooltip": "Enable to show webmap tags"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoNumViews",
                    "label": "Number of Views",
                    "tooltip": "Enable to show webmap number of views"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoAvgRating",
                    "label": "Average Rating",
                    "tooltip": "Enable to show webmap average rating"
                }
            ]
        },
        {
            "category": "<b>Search Settings</b>",
            "fields": [
                {
                    "type": "paragraph",
                    "value": "By default the application search will use the locators configured in your organization settings. Additionally, the following search types can be enabled:"
                },
                {
                    "type": "boolean",
                    "fieldName": "enableUSNGSearch",
                    "label": "USNG",
                    "tooltip": "Enable USNG Search"
                },
                {
                    "type": "boolean",
                    "fieldName": "enableMGRSSearch",
                    "label": "MGRS",
                    "tooltip": "Enable MGRS Search"
                },
                {
                    "type": "boolean",
                    "fieldName": "enableLatLongSearch",
                    "label": "Latitude/Longitude",
                    "tooltip": "Enable Latitude Longitude Search"
                }
            ]
        }
    ]
}