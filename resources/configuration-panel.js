{
    "values": {
        "group": "",
		"theme": "#137DB9",
		"signInSubtitle": "",
		"signInBackgroundImage": "/images/signinbg.png",
		"enableFacebook": false,
		"facebookAppId": "",
		"enableGuestAccess": true,
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
		"submitReportButtonColor":"#35ac46",
		"likeField": "NUMVOTES",
		"commentField": "COMMENTS",
		"locationField": "",
		"usePopupConfigurationForComment": false,
		"showNonEditableLayers": false,
		"reportedByField": "USERID",
		"zoomLevel": 12,
		"enableUSNGSearch": false,
		"enableMGRSSearch": false,
		"enableLatLongSearch": false,
		"enableHelp": true,
		"helpLinkText": "Help",
		"helpDialogTitle": "Help",
		"helpDialogContent": "<p>Crowdsource Reporter is a configurable gallery application template that allows users to submit problems or observations. The application has been optimized for smartphones but is responsively designed to be used on smartphones, tablets, and desktop computers.</p><p>The Crowdsource Reporter application presents one or more maps that can be used to report a problem or observation. Users can anonymously submit new reports, review existing reports, and comment and vote on reports or observations submitted by other users. They also can authenticate with their social media or ArcGIS Online credentials and track the status of problems or observations they have reported.</p>",
		"geoformDetailsSectionLabel": "Details",
		"geoformLocationSectionLabel": "Location",
		"geoformAttachmentSectionLabel": "Attachments"
    },
	"configurationSettings": [{
	    "category": "<b>App Settings</b>",
	    "fields": [{
	        "label": "Select a group",
	        "tooltip": "Group displayed in the application",
	        "type": "group"
	    }, {
	        "label": "Application title",
	        "tooltip": "Title should be shorter than approximately 34 characters to fit on mobile devices",
	        "type": "string",
	        "fieldName": "applicationName"
	    }, {
	        "label": "Application subtitle",
	        "tooltip": "Subtitles should be shorter than approximately 36 characters to fit on mobile devices.",
	        "type": "string",
	        "stringFieldOption": "textarea",
	        "fieldName": "signInSubtitle"
	    }, {
	        "label": "Splash screen image",
	        "tooltip": "Background image for login screen. Recommended 640x960.",
	        "type": "string",
	        "fieldName": "signInBackgroundImage"
	    }, {
	        "label": "URL to a logo to display in the application header",
	        "tooltip": "Logo displays in top left corner of application. Image should be 48px tall.",
	        "type": "string",
	        "fieldName": "applicationIcon"
	    }, {
	        "label": "URL to a favicon to display in browser tabs where your application is loaded",
	        "tooltip": "Icon to display in browser tabs",
	        "type": "string",
	        "fieldName": "applicationFavicon"
	    }, {
	        "label": "Application color",
	        "tooltip": "Application color scheme",
	        "type": "color",
	        "fieldName": "theme"
	    }, {
	        "label": "Submit report button color",
	        "tooltip": "Color for submit report button",
	        "type": "color",
	        "fieldName": "submitReportButtonColor"
	    }, {
	        "type": "paragraph",
	        "value": "When the application loads, users will be asked to share their location to view nearby reports. Only reports in this radius will load, but users can expand this search radius incrementally in the application. Define the radius of this initial search for nearby reports. "
	    }, {
	        "label": "Initial search radius",
	        "tooltip": "When location is shared, application will initially load all reports within this search radius",
	        "type": "number",
	        "fieldName": "bufferRadius"
	    }, {
	        "tooltip": "Unit of distance for the search radius",
	        "label": "Search radius unit:",
	        "type": "options",
	        "fieldName": "bufferUnit",
	        "options": [{
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
	        }]
	    }]
	}, {
	    "category": "<b>Map Settings</b>",
	    "fields": [{
	        "type": "subcategory",
	        "label": "Reference Layers"
	    }, {
	        "type": "paragraph",
	        "value": "By default, Crowdsource Reporter apps will show only one editable layer at a time. Optionally, choose to also display non-editable map layers for additional context."
	    }, {
	        "label": "Show reference layers",
	        "tooltip": "Enable to show non-editable layers",
	        "type": "boolean",
	        "fieldName": "showNonEditableLayers"
	    }, {
	        "type": "subcategory",
	        "label": "Zoom Level"
	    }, {
	        "label": "When a report is selected from the list, the map will pan and zoom to show the location of that report. Specify how near (larger number) or far (smaller number) the map should zoom relative to the ground.",
	        "tooltip": "When a report is selected the map will zoom to the associated feature using this zoom level.",
	        "type": "string",
	        "fieldName": "zoomLevel"
	    }, {
	        "type": "subcategory",
	        "label": "Map Information"
	    }, {
	        "type": "paragraph",
	        "value": "Select the item details elements that will be visible for each map:"
	    }, {
	        "label": "Description",
	        "tooltip": "Enable to show webmap description",
	        "type": "boolean",
	        "fieldName": "webMapInfoDescription"
	    }, {
	        "label": "Short Summary",
	        "tooltip": "Enable to show webmap summary",
	        "type": "boolean",
	        "fieldName": "webMapInfoSnippet"
	    }, {
	        "label": "Owner Name",
	        "tooltip": "Enable to show webmap owner",
	        "type": "boolean",
	        "fieldName": "webMapInfoOwner"
	    }, {
	        "label": "Creation Date",
	        "tooltip": "Enable to show webmap created date",
	        "type": "boolean",
	        "fieldName": "webMapInfoCreated"
	    }, {
	        "label": "Modification Date",
	        "tooltip": "Enable to show webmap modified date",
	        "type": "boolean",
	        "fieldName": "webMapInfoModified"
	    }, {
	        "label": "Access and Use Constraints",
	        "tooltip": "Enable to show webmap licensing information",
	        "type": "boolean",
	        "fieldName": "webMapInfoLicenseInfo"
	    }, {
	        "label": "Credits",
	        "tooltip": "Enable to show webmap credits",
	        "type": "boolean",
	        "fieldName": "webMapInfoAccessInformation"
	    }, {
	        "label": "Tags",
	        "tooltip": "Enable to show webmap tags",
	        "type": "boolean",
	        "fieldName": "webMapInfoTags"
	    }, {
	        "label": "Number of Views",
	        "tooltip": "Enable to show webmap number of views",
	        "type": "boolean",
	        "fieldName": "webMapInfoNumViews"
	    }, {
	        "label": "Average Rating",
	        "tooltip": "Enable to show webmap average rating",
	        "type": "boolean",
	        "fieldName": "webMapInfoAvgRating"
	    }]
	}, {
	    "category": "<b>Form Settings</b>",
	    "fields": [{
	        "type": "paragraph",
	        "value": "The form for submitting new reports is built in three sections for providing the report details, supporting documents, and the location of the report."
	    }, {
	        "type": "subcategory",
	        "label": "Report Details"
	    }, {
	        "type": "paragraph",
	        "value": "The details section of the form is built using the fields marked as editable in the popup configuration."
	    }, {
	        "label": "Header for the report details section of the form",
	        "tooltip": "Header for the section of the form that is populated by the layer's editable fields.",
	        "type": "string",
	        "fieldName": "geoformDetailsSectionLabel"
	    }, {
	        "type": "subcategory",
	        "label": "Attachments"
	    }, {
	        "label": "Header for section of the form where photos and other supporting files can be added to the report. This section is only available when attachments are enabled on the layer.",
	        "tooltip": "Header for the section of the form where supporting files can be attached to the report.",
	        "type": "string",
	        "fieldName": "geoformAttachmentSectionLabel"
	    }, {
	        "type": "subcategory",
	        "label": "Location"
	    }, {
	        "label": "Header for the report location section of the form. The report location can be drawn on the map or found by searching for an address.",
	        "tooltip": "Header for the section of the form containing the map and location search options.",
	        "type": "string",
	        "fieldName": "geoformLocationSectionLabel"
	    }, {
	        "label": "Optionally, store a text form of the report location. This location-storing functionality will only be available for layers with a field of the specified (case-sensitive) name.",
	        "tooltip": "Allows user to configure location field",
	        "type": "string",
	        "fieldName": "locationField"
	    }, {
	        "type": "subcategory",
	        "label": "Submission Message"
	    }, {
	        "label": "Message displayed after a report is submitted",
	        "tooltip": "Message displayed when a report is submitted successfully",
	        "type": "string",
	        "stringFieldOption": "textarea",
	        "fieldName": "submitMessage"
	    }, {
	        "type": "paragraph",
	        "value": "For more information on setting up the report form, check out the <a href=\"http://links.esri.com/localgovernment/help/crowdsource-reporter\" target=\"_blank\">Crowdsource Reporter documentation<\/a>."
	    }]
	}, {
	    "category": "<b>Comments & Votes Settings</b>",
	    "fields": [{
	        "type": "subcategory",
	        "label": "Comments"
	    }, {
	        "type": "paragraph",
	        "value": "Collect and store comments on reports using a related table. Commenting is available for layers with geodatabase relationships to a single table. Choose to collect and display comments using a single field, or using the popup configuration of the table layer."
	    }, {
	        "label": "Display comments using the popup configuration of the table layer where the comments are stored.",
	        "tooltip": "Enable to display related records and the editing form based on the table layer's popup configuration instead of a single field. Fields that are marked editable in the popup will be editable in the application.",
	        "type": "boolean",
	        "fieldName": "usePopupConfigurationForComment"
	    }, {
	        "label": "Alternatively, provide the name of a field to display, regardless of the popup settings. This value is ignored if you choose to build the form from the comment table popup (previous option). Commenting will only be available for layers related to tables that have a field of this name.",
	        "tooltip": "Only content from related tables that have this field will be accessible through the application. This value is ignored if you choose to build the form from the comment table popup (previous option).",
	        "type": "string",
	        "fieldName": "commentField"
	    }, {
	        "type": "subcategory",
	        "label": "Votes"
	    }, {
	        "label": "Allow users to vote for reports by specifying a numeric field from one or many of the layers that will be shown in your app. A vote button will appear on reports submitted to any layer that has a field of this name, and clicking this button will increment the vote count stored in this field.",
	        "tooltip": "Integer field that stores the vote count for each report. Layers without a field of this name will not have the option for submitting votes.",
	        "type": "string",
	        "fieldName": "likeField"
	    }, {
	        "type": "paragraph",
	        "value": "Voting will not be available on layers that do not have a field of this (case-sensitive) name. Voting requires a service that allows updating existing records."
	    }, {
	        "type": "paragraph",
	        "value": "For more information on setting up comments and votes, check out the <a href=\"http://links.esri.com/localgovernment/help/crowdsource-reporter\" target=\"_blank\">Crowdsource Reporter documentation<\/a>."
	    }]
	}, {
	    "category": "<b>Search Settings</b>",
	    "fields": [{
	        "type": "paragraph",
	        "value": "By default the application search will use the locators configured in your organization settings. Additionally, the following search types can be enabled:"
	    }, {
	        "label": "USNG",
	        "tooltip": "Enable USNG search",
	        "type": "boolean",
	        "fieldName": "enableUSNGSearch"
	    }, {
	        "label": "MGRS",
	        "tooltip": "Enable MGRS search",
	        "type": "boolean",
	        "fieldName": "enableMGRSSearch"
	    }, {
	        "label": "Latitude/Longitude",
	        "tooltip": "Enable latitude/longitude search",
	        "type": "boolean",
	        "fieldName": "enableLatLongSearch"
	    }]
	}, {
	    "category": "<b>Access Settings</b>",
	    "fields": [{
	        "type": "paragraph",
	        "value": "Configure how users will be able to access your application. See the <a href='http://links.esri.com/localgovernment/help/CrowdsourcePolling/SocialSignIn/' target='_blank'>help</a> for the steps to register your app with Facebook to get an AppId and Google+ to get a Client ID."
	    }, {
	        "label": "Allow anonymous access",
	        "tooltip": "Enable to allow users to sign in as a guest user",
	        "type": "boolean",
	        "fieldName": "enableGuestAccess"
	    }, {
	        "label": "Allow users to sign in using ArcGIS Online",
	        "tooltip": "Enable to allow users to sign in using their ArcGIS Online credentials. Accounts must be members of the organization hosting the application.",
	        "type": "boolean",
	        "fieldName": "enablePortalLogin"
	    }, {
	        "label": "Allow users to sign in using Twitter",
	        "tooltip": "Enable to allow users to sign in using their Twitter credentials",
	        "type": "boolean",
	        "fieldName": "enableTwitter"
	    }, {
	        "label": "Allow users to sign in using Facebook",
	        "tooltip": "Enable to allow users to sign in using their Facebook credentials",
	        "type": "boolean",
	        "fieldName": "enableFacebook"
	    },  {
	        "label": "Facebook AppId",
	        "tooltip": "Facebook AppId",
	        "type": "string",
	        "fieldName": "facebookAppId"
	    }, {
	        "label": "Allow users to sign in using Google+",
	        "tooltip": "Enable to allow users to sign in using their Google+ credentials",
	        "type": "boolean",
	        "fieldName": "enableGoogleplus"
	    }, {
	        "label": "Google+ Client ID",
	        "tooltip": "Google+ ClientId",
	        "type": "string",
	        "fieldName": "googleplusClientId"
	    }, {
	        "label": "Field for storing the ID of authenticated users (optional)",
	        "tooltip": "Text field that stores the ID of the person who submitted or commented on a report. Field name must be the same across all layers and maps.",
	        "type": "string",
	        "fieldName": "reportedByField"
	    }]
	}, {
	    "category": "<b>Help Widget Settings</b>",
	    "fields": [{
	        "type": "paragraph",
	        "value": "A help window can be accessed from a link on the spash page and from an icon within the app. Configure this dialog to display instructions for using the app, or any other information that may be useful to your users."
	    }, {
	        "label": "Enable the help window",
	        "tooltip": "When disabled, the help window will not be accessible.",
	        "type": "boolean",
	        "fieldName": "enableHelp"
	    }, {
	        "label": "Splash page link text",
	        "tooltip": "Clicking this text will open the help dialog.",
	        "type": "string",
	        "fieldName": "helpLinkText"
	    }, {
	        "label": "Help window title",
	        "tooltip": "Text displayed at the top of the help window",
	        "type": "string",
	        "fieldName": "helpDialogTitle"
	    }, {
	        "label": "Dialog content",
	        "tooltip": "Text and graphics that will display in the help window.",
	        "type": "string",
	        "fieldName": "helpDialogContent",
	        "stringFieldOption": "richtext"
	    }]
	}]
}