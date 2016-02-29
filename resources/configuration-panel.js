{
    "values": {
        "group": "520b1bd79fa74f0f9f3d13315dab6915",
        "theme": "#137DB9",
        "signInSubtitle": "",
        "signInBackgroundImage": "/images/signinbg.png",
        "enableFacebook": false,
        "facebookAppId": "",
        "enableTwitter": false,
        "enablePortalLogin": true,
        "enableGoogleplus": false,
        "googleplusClientId": "",
        "applicationName": "",
        "applicationIcon": "",
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
        "bufferRadius": 3,
        "bufferUnit": "miles",
        "submitMessage": "Thank you. Your report has been submitted.",
        "likeField": "NUMVOTES",
        "commentField": "COMMENTS",
        "usePopupConfigurationForComment":false,
        "reportedByField": "USERID",
        "zoomLevel": 12,
        "enableUSNGSearch": false,
        "enableMGRSSearch": false,
        "enableLatLongSearch": false,
        "enableHelp":true,
        "helpLinkText": "Help",
        "helpDialogTitle":"Help Page",
        "helpDialogContent": "<p>Crowdsource Reporter is a configurable gallery application template that allows users to submit problems or observations. The application has been optimized for smartphones but is responsively designed to be used on smartphones, tablets, and desktop computers.</p><p>The Crowdsource Reporter application presents one or more maps that can be used to report a problem or observation. Users can anonymously submit new reports, review existing reports, and comment and vote on reports or observations submitted by other users. They also can authenticate with their social media or ArcGIS Online credentials and track the status of problems or observations they have reported.</p>"
    },
    "configurationSettings": [{
        "category": "<b>App Settings</b>",
        "fields": [{
                    "type": "group",
                    "label": "Select Group",
                    "tooltip": "Group displayed in the application"
                }, {
                    "type": "string",
                    "fieldName": "applicationName",
                    "label": "Application title",
                    "tooltip": "Application title (max 34 chars)"
                }, {
                    "type": "string",
                    "stringFieldOption": "textarea",
                    "fieldName": "signInSubtitle",
                    "label": "Application subtitle (displayed on splash page)",
                    "tooltip": "Approximately 36 characters of text displayed below title on splash page"
                }, {
                    "type": "string",
                    "fieldName": "signInBackgroundImage",
                    "tooltip": "Background image for login screen. Recommended 640x960.",
                    "label": "Splash screen image"
                }, {
                    "type": "string",
                    "fieldName": "applicationIcon",
                    "label": "URL of application logo",
                    "tooltip": "URL to a 48px high graphic to display in the top left corner of application."
                }, {
                    "type": "color",
                    "fieldName": "theme",
                    "tooltip": "Color theme to use",
                    "label": "Color scheme"
                }, {
                    "type": "paragraph",
                    "value": "By default the application search will use the locators configured in your organization settings. Additionally, the following search types can be enabled:"
                }, {
                    "type": "boolean",
                    "fieldName": "enableUSNGSearch",
                    "label": "USNG",
                    "tooltip": "Enable USNG search"
                }, {
                    "type": "boolean",
                    "fieldName": "enableMGRSSearch",
                    "label": "MGRS",
                    "tooltip": "Enable MGRS search"
                }, {
                    "type": "boolean",
                    "fieldName": "enableLatLongSearch",
                    "label": "Latitude/Longitude",
                    "tooltip": "Enable latitude/longitude search"
                }, {
                    "type": "string",
                    "stringFieldOption": "textarea",
                    "fieldName": "submitMessage",
                    "label": "Message displayed after a report is submitted",
                    "tooltip": "Message displayed when a report is submitted successfully"
                }
            ]
    }, {
        "category": "<b>Content Settings</b>",
        "fields": [
            {
                "type": "paragraph",
                "value": "Configure how the application will interact with your maps and layers."
            }, {
                "type": "string",
                "fieldName": "likeField",
                "label": "Field to store the vote tally for each report (optional)",
                "tooltip": "Integer field that stores the vote count. Field name must be the same across all layers and maps."
            }, {
                "type": "boolean",
                "fieldName": "usePopupConfigurationForComment",
                "label": "Build comment form from comment table popup",
                "tooltip": "Enable to display a comment submission form based on the popup configuration for the comments layer instead of a single field for comment entry."
            },{
                "type": "string",
                "fieldName": "commentField",
                "label": "Choose a field to display a single field comment entry form (optional)",
                "tooltip": "Text field in the comments tables that stores feedback. Field name must be the same across all layers and maps. This can be overwritten by choosing to build the form from the comment table popup."
            },  {
                "type": "string",
                "fieldName": "zoomLevel",
                "label": "Zoom level for selected report",
                "tooltip": "Configure zoom level"
            }, {
                "type": "paragraph",
                "value": "When the application loads, users will be asked to share their location to view nearby reports. Define the radius of this initial search for nearby reports. Users will be able to expand this search radius incrementally in the application."
            }, {
                "type": "number",
                "fieldName": "bufferRadius",
                "label": "Initial search radius",
                "tooltip": "Application will initially load all reports within this search radius"
            }, {
                "type": "options",
                "fieldName": "bufferUnit",
                "tooltip": "Unit of distance for the search radius",
                "label": "Search radius unit:",
                "options": [
                    {
                        "label": "Miles",
                        "value": "miles"
                    }, {
                        "label": "Kilometers",
                        "value": "kilometers"
                    }, {
                        "label": "Meters",
                        "value": "meters"
                    }, {
                        "label": "Feet",
                        "value": "feet"
                    }
                ]
            }, {
                "type": "paragraph",
                "value": "Choose the item information to display in the map information panel:"
            }, {
                "type": "boolean",
                "fieldName": "webMapInfoDescription",
                "label": "Description",
                "tooltip": "Enable to show webmap description"
            }, {
                "type": "boolean",
                "fieldName": "webMapInfoSnippet",
                "label": "Short Summary",
                "tooltip": "Enable to show webmap summary"
            }, {
                "type": "boolean",
                "fieldName": "webMapInfoOwner",
                "label": "Owner Name",
                "tooltip": "Enable to show webmap owner"
            }, {
                "type": "boolean",
                "fieldName": "webMapInfoCreated",
                "label": "Creation Date",
                "tooltip": "Enable to show webmap created date"
            }, {
                "type": "boolean",
                "fieldName": "webMapInfoModified",
                "label": "Modification Date",
                "tooltip": "Enable to show webmap modified date"
            }, {
                "type": "boolean",
                "fieldName": "webMapInfoLicenseInfo",
                "label": "Access and Use Constraints",
                "tooltip": "Enable to show webmap licensing information"
            }, {
                "type": "boolean",
                "fieldName": "webMapInfoAccessInformation",
                "label": "Credits",
                "tooltip": "Enable to show webmap credits"
            }, {
                "type": "boolean",
                "fieldName": "webMapInfoTags",
                "label": "Tags",
                "tooltip": "Enable to show webmap tags"
            }, {
                "type": "boolean",
                "fieldName": "webMapInfoNumViews",
                "label": "Number of Views",
                "tooltip": "Enable to show webmap number of views"
            }, {
                "type": "boolean",
                "fieldName": "webMapInfoAvgRating",
                "label": "Average Rating",
                "tooltip": "Enable to show webmap average rating"
            }
        ]
    }, {
            "category": "<b>Access Settings</b>",
            "fields": [{
                "type": "paragraph",
                "value": "Configure how users will be able to access your application. See the <a href='http://solutions.arcgis.com/local-government/help/crowdsource-polling/get-started/configure-social-media-signin/' target='_blank'>help</a> for the steps to register your app with Facebook and Google+."
            }, {
                "type": "boolean",
                "fieldName": "enablePortalLogin",
                "label": "Allow users to sign in using ArcGIS Online",
                "tooltip": "Enable to allow users to sign in using their ArcGIS Online credentials"
            }, {
                    "type": "boolean",
                    "fieldName": "enableTwitter",
                    "label": "Allow users to sign in using Twitter",
                    "tooltip": "Enable to allow users to sign in using their Twitter credentials"
                }, {
                    "type": "boolean",
                    "fieldName": "enableFacebook",
                    "label": "Allow users to sign in using Facebook",
                    "tooltip": "Enable to allow users to sign in using their Facebook credentials"
                }, {
                    "type": "string",
                    "fieldName": "facebookAppId",
                    "label": "Facebook AppId",
                    "tooltip": "Facebook AppId"
                }, {
                    "type": "boolean",
                    "fieldName": "enableGoogleplus",
                    "label": "Allow users to sign in using Google+",
                    "tooltip": "Enable to allow users to sign in using their Google+ credentials"
                }, {
                    "type": "string",
                    "fieldName": "googleplusClientId",
                    "label": "Google+ Client ID",
                    "tooltip": "Google+ ClientId"
                }, {
                    "type": "string",
                    "fieldName": "reportedByField",
                    "label": "Field for storing the ID of authenticated users (optional)",
                    "tooltip": "Text field that stores the ID of the person who submitted or commented on a report. Field name must be the same across all layers and maps."
                }
            ]
        }, {
            "category": "<b>Help Widget Settings</b>",
            "fields": [
                {
                    "type": "paragraph",
                    "value": "A help window can be accessed from a link on the spash page and from an icon within the app. Configure this dialog to display instructions for using the app, or any other information that may be useful to your users."
                }, {
                    "type": "boolean",
                    "fieldName": "enableHelp",
                    "label": "Enable the help window",
                    "tooltip": "When disabled, the help window will not be accessible."
                }, {
                    "type": "string",
                    "fieldName": "helpLinkText",
                    "label": "Splash page link text",
                    "tooltip": "Clicking this text will open the help dialog."
                }, {
                    "type": "string",
                    "fieldName": "helpDialogTitle",
                    "label": "Help window title",
                    "tooltip": "Text displayed at the top of the help window"
                }, {
                    "type": "string",
                    "fieldName": "helpDialogContent",
                    "label": "Dialog content",
                    "stringFieldOption": "richtext",
                    "tooltip": "Text and graphics that will display in the help window."
                }
            ]
        }
    ]
}