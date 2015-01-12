{
    "configurationSettings": [
        {
            "category": "<b>Configure template</b>",
            "fields": [
                {
                    "type": "group",
                    "label": "Select group",
                    "tooltip": "Group displayed in the application"
                },
                {
                    "type": "color",
                    "fieldName": "theme",
                    "tooltip": "Color theme to use",
                    "label": "Color Scheme"
                }
            ]
        },
        {
            "category": "<b>Login screen</b>",
            "fields": [
                {
                    "type": "paragraph",
                    "value": "Configure login screen settings."
                },
                {
                    "type": "string",
                    "stringFieldOption": "textarea",
                    "fieldName": "signInSubtitle",
                    "label": "Caption",
                    "tooltip": "Caption to display"
                },
                {
                    "type": "string",
                    "fieldName": "signInBackgroundImage",
                    "tooltip": "Background image for login screen",
                    "label": "Background image for login screen"
                },
                {
                    "type": "paragraph",
                    "value": "<b>Social media signin settings:</b>"
                },
                {
                    "type": "paragraph",
                    "value": "Facebook:"
                },
                {
                    "type": "boolean",
                    "fieldName": "enableFacebook",
                    "label": "Enable",
                    "tooltip": "Enable to show facebook login"
                },
                {
                    "type": "paragraph",
                    "value": "Twitter:"
                },
                {
                    "type": "boolean",
                    "fieldName": "enableTwitter",
                    "label": "Enable twitter",
                    "tooltip": "Enable to show twitter login"
                },
                {
                    "type": "paragraph",
                    "value": "Google+:"
                },
                {
                    "type": "boolean",
                    "fieldName": "enableGoogleplus",
                    "label": "Enable googleplus",
                    "tooltip": "Enable to show googleplus login"
                }
            ]
        },
        {
            "category": "<b>Application header</b>",
            "fields": [
                {
                    "type": "paragraph",
                    "value": "Configure Application header settings."
                },
                {
                    "type": "string",
                    "fieldName": "applicationName",
                    "label": "Title",
                    "tooltip": "Application title displayed in header"
                },
                {
                    "type": "string",
                    "fieldName": "applicationIcon",
                    "label": "Icon URL",
                    "tooltip": "Icon in top left corner of application. Icon should be 48px high."
                },
                {
                    "type": "string",
                    "fieldName": "applicationFavicon",
                    "label": "Favicon URL",
                    "tooltip": "Application favicon."
                }
            ]
        },
        {
            "category": "<b>Webmap information settings</b>",
            "fields": [
                {
                    "type": "paragraph",
                    "value": "Configure settings for details that are shown when info icon is clicked in the list of maps."
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoDescription",
                    "label": "Show description",
                    "tooltip": "Enable to show webmap description"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoSnippet",
                    "label": "Show snippet",
                    "tooltip": "Enable to show webmap snippet"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoOwner",
                    "label": "Show owner",
                    "tooltip": "Enable to show webmap owner"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoCreated",
                    "label": "Show created date",
                    "tooltip": "Enable to show webmap created date"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoModified",
                    "label": "Show modified date",
                    "tooltip": "Enable to show webmap modified date"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoLicenseInfo",
                    "label": "Show license information",
                    "tooltip": "Enable to show webmap license information"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoAccessInformation",
                    "label": "Show access information",
                    "tooltip": "Enable to show webmap access information"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoTags",
                    "label": "Show tags",
                    "tooltip": "Enable to show webmap tags"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoNumViews",
                    "label": "Show number of views",
                    "tooltip": "Enable to show webmap number of views"
                },
                {
                    "type": "boolean",
                    "fieldName": "webMapInfoAvgRating",
                    "label": "Show average rating",
                    "tooltip": "Enable to show webmap average rating"
                }
            ]
        },
        {
            "category": "<b>General Settings</b>",
            "fields": [
                {
                    "type": "paragraph",
                    "value": "Configure General fields settings."
                },
                {
                    "type": "string",
                    "fieldName": "likeField",
                    "label": "Like field",
                    "tooltip": "Configure like field"
                },
                {
                    "type": "string",
                    "fieldName": "commentField",
                    "label": "Comment field",
                    "tooltip": "Configure comment field"
                },
                {
                    "type": "string",
                    "fieldName": "reportedByField",
                    "label": "Reported by field",
                    "tooltip": "Configure reported by field"
                },
                {
                    "type": "string",
                    "fieldName": "zoomLevel",
                    "label": "Zoom Level",
                    "tooltip": "Configure zoom level"
                }
            ]
        },
        {
            "category": "<b>Geoform Settings</b>",
            "fields": [
                {
                    "type": "paragraph",
                    "value": "Configure Geoform settings."
                },
                {
                    "type": "string",
                    "fieldName": "submitMessage",
                    "label": "Submit Message",
                    "tooltip": "Configure message to be displayed when a geoform is submitted successfully"
                }
            ]
        },
        {
            "category": "<b>Locator Settings</b>",
            "fields": [
                {
                    "type": "paragraph",
                    "value": "Configure Locator settings."
                },
                {
                    "type": "boolean",
                    "fieldName": "enableUSNGSearch",
                    "label": "Enable USNG Search",
                    "tooltip": "Enable USNG Search"
                },
                {
                    "type": "boolean",
                    "fieldName": "enableMGRSSearch",
                    "label": "Enable MGRS Search",
                    "tooltip": "Enable MGRS Search"
                },
                {
                    "type": "boolean",
                    "fieldName": "enableLatLongSearch",
                    "label": "Enable Latitude Longitude Search",
                    "tooltip": "Enable Latitude Longitude Search"
                }
            ]
        }
    ],
    "values": {
        "group": "e96bd5b249a04235bcd7399cb80ee3cf",
        "theme": "#d15706",
        "signInSubtitle": "Lorem ipsum dolor sit er elit lamet, consectetaur cillium adipisicing pecu, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "signInBackgroundImage": "/images/signinbg.png",
        "enableFacebook": true,
        "enableTwitter": true,
        "enableGoogleplus": true,
        "applicationName": "Constituent Engagement",
        "applicationIcon": "/images/app-icon.png",
        "applicationFavicon": "/images/favicon.ico",
        "webMapInfoDescription": true,
        "webMapInfoSnippet": true,
        "webMapInfoOwner": true,
        "webMapInfoCreated": false,
        "webMapInfoModified": false,
        "webMapInfoLicenseInfo": false,
        "webMapInfoAccessInformation": false,
        "webMapInfoTags": false,
        "webMapInfoNumViews": false,
        "webMapInfoAvgRating": false,
        "submitMessage": "Thank you, Your report has been submitted.",
        "likeField": "VOTES",
        "commentField": "FEEDBACK",
        "reportedByField": "REPORTEDBY",
        "zoomLevel": 12,
        "enableUSNGSearch": true,
        "enableMGRSSearch": true,
        "enableLatLongSearch": true
    }
}