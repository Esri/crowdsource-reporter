{
    "values": {
        "group": "",
        "basemapGroup" :"",
        "theme": "#137DB9",
        "applicationName": "",
        "applicationIcon": "",
        "applicationFavicon": "/images/favicon.ico",
        "signInSubtitle": "",
        "signInBackgroundImage": "/images/signinbg.png",
        "enableGuestAccess": true,
        "enableFacebook": false,
        "enableTwitter": false,
        "enablePortalLogin": true,
        "enableGoogleplus": false,
        "tool_search" : true,
        "facebookAppId": "",
        "googleplusClientId": "",
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
        "showNonEditableLayers": false,
        "showPopupForNonEditableLayers": false,
        "showBaseMapGallery": false,
        "showLegend": false,
        "submitMessage": "Thank you. Your report has been submitted.",
        "featureOutsideAOIMsg": "Feature cannot be added outside study area",
        "likeField": "NUMVOTES",
        "commentField": "COMMENTS",
        "usePopupConfigurationForComment": false,
        "enableFeatureEdit": false,
        "enableFeatureDelete": false,
        "reportedByField": "USERID",
        "locationField": "",
        "zoomLevel": 12,
        "honorZoomLevel": false,
        "enableUSNGSearch": false,
        "enableMGRSSearch": false,
        "enableLatLongSearch": false,
        "geographicalExtentLayer": "",
        "submitReportButtonText": "",
        "submitReportButtonColor": "#35ac46",
        "splashScreenTextColor": "#FFF",
        "imageBackgroundColor": "#999999",
        "imageForeGroundColor": "white",
        "showMapFirst": "list",
        "enableHelp": true,
        "showHelpOnLoad": false,
        "enableDifferentHelpContent": false,
        "helpLinkText": "Help",
        "helpDialogTitle": "Help",
        "helpDialogContent": "<p>Crowdsource Reporter is a configurable gallery application template that allows users to submit problems or observations. The application has been optimized for smartphones but is responsively designed to be used on smartphones, tablets, and desktop computers.</p><p>The Crowdsource Reporter application presents one or more maps that can be used to report a problem or observation. Users can anonymously submit new reports, review existing reports, and comment and vote on reports or observations submitted by other users. They also can authenticate with their social media or ArcGIS Online credentials and track the status of problems or observations they have reported.</p>",
        "loginHelpDialogTitle": "",
        "loginHelpDialogContent": "",
        "bufferRadius": 3,
        "bufferUnit": "miles",
        "geoformDetailsSectionLabel": "Details",
        "geoformLocationSectionLabel": "Location",
        "geoformAttachmentSectionLabel": "Attachments",
        "noWebmapInGroupText": "Configured group is invalid or no items have been shared with this group yet.",
        "headerTextColor": "#137DB9",
        "bodyBackgroundColor": "#fff",
        "bodyTextColor": "#515151",
        "buttonBackgroundColor": "#fff",
        "buttonTextColor": "#137DB9",
        "details": "Top",
        "attachments": "Middle",
        "location": "Bottom",
        "sortingField" : "",
        "sortingOrder": "DESC",
        "reportingPeriod": "Open",
        "reportingPeriodDialogTitle": "Reporting Period Closed",
        "reportingPeriodDialogContent": "We are no longer accepting new reports for this project."
    },
  "configurationSettings": [{
      "category": "<b>General</b>",
      "fields": [{
          "type": "paragraph",
          "value": "For more information on configuring this application, please see the <a href=\"http://links.esri.com/localgovernment/help/crowdsource-reporter\" target=\"_blank\">Crowdsource Reporter documentation</a>."
      }, {
          "label": "Select a group",
          "tooltip": "Group displayed in the application",
          "type": "group"
      }, {
          "label": "Application title",
          "tooltip": "Title should be shorter than approximately 34 characters to fit on mobile devices.",
          "type": "string",
          "fieldName": "applicationName"
      }, {
          "label": "Application subtitle",
          "tooltip": "Subtitles should be shorter than approximately 36 characters to fit on mobile devices.",
          "type": "string",
          "stringFieldOption": "string",
          "fieldName": "signInSubtitle"
      }, {
          "label": "Message to display when the configured group does not contain at least one map with at least one editable layer that is accessible to the current user.",
          "tooltip": "Use this message to prompt users to sign in to the organization hosting the content or to prompt the application configurer to verify the content of the group.",
          "type": "string",
          "fieldName": "noWebmapInGroupText"
      }, {
          "type": "subcategory",
          "label": "Help"
      }, {
          "type": "paragraph",
          "value": "A help window can be accessed from a link on the splash page and from an icon within the app. Configure this dialog to display instructions for using the app, or any other information that may be useful to your users."
      }, {
          "label": "Enable the help window",
          "tooltip": "When disabled, the help window will not be accessible.",
          "type": "conditional",
          "condition": false,
          "fieldName": "enableHelp",
          "items": [{
              "label": "Show help on load",
              "tooltip": "Show help dialog on application load as a splash screen.",
              "type": "boolean",
              "fieldName": "showHelpOnLoad"
          }, {
              "label": "Help link text",
              "tooltip": "Clicking this text will open the help dialog.",
              "type": "string",
              "fieldName": "helpLinkText"
          }, {
              "label": "Help window title",
              "tooltip": "Text displayed at the top of the help window.",
              "type": "string",
              "fieldName": "helpDialogTitle"
          }, {
              "label": "Dialog content",
              "tooltip": "Text and graphics that will display in the help window.",
              "type": "string",
              "fieldName": "helpDialogContent",
              "stringFieldOption": "richtext"
          }, {
              "label": "Display different content on sign in page",
              "tooltip": "Different content in help dialog.",
              "type": "conditional",
              "condition": false,
              "fieldName": "enableDifferentHelpContent",
              "items": [{
                  "label": "Sign in help window title",
                  "tooltip": "Text displayed at the top of the help window.",
                  "type": "string",
                  "fieldName": "loginHelpDialogTitle"
              }, {
                  "label": "Sign in help Dialog content",
                  "tooltip": "Text and graphics that will display in the help window.",
                  "type": "string",
                  "fieldName": "loginHelpDialogContent",
                  "stringFieldOption": "richtext"
              }]
          }]
      }]
  }, {
      "category": "<b>Theme</b>",
      "fields": [{
          "label": "Header text color",
          "tooltip": "Application color scheme",
          "type": "color",
          "fieldName": "theme",
          "sharedThemeProperty": "header.text"
      }, {
          "label": "Header background color",
          "tooltip": "Set header background color.",
          "type": "color",
          "sharedThemeProperty": "header.background",
          "fieldName": "headerBackgroundColor"
      }, {
          "label": "Body text color",
          "tooltip": "Set body text color.",
          "type": "color",
          "sharedThemeProperty": "body.text",
          "fieldName": "bodyTextColor"
      }, {
          "label": "Body background color",
          "tooltip": "Set body background color.",
          "type": "color",
          "sharedThemeProperty": "body.background",
          "fieldName": "bodyBackgroundColor"
      }, {
          "label": "Button text color",
          "tooltip": "Set button text color.",
          "type": "color",
          "sharedThemeProperty": "button.text",
          "fieldName": "buttonTextColor"
      }, {
          "label": "Button background color",
          "tooltip": "Set button background color.",
          "type": "color",
          "sharedThemeProperty": "button.background",
          "fieldName": "buttonBackgroundColor"
      }, {
          "label": "Application logo",
          "tooltip": "Logo displays in top left corner of application. Image should be 48px tall.",
          "type": "string",
          "sharedThemeProperty": "logo.small",
          "fieldName": "applicationIcon",
          "placeHolder": "/images/app-icon.png"
      }, {
          "label": "Application favicon",
          "tooltip": "Icon to display in browser tabs",
          "type": "string",
          "fieldName": "applicationFavicon",
          "placeHolder": "/images/favicon.ico"
      }]
  }, {
      "category": "<b>Options</b>",
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
          "label": "Show popup for non-editable layers",
          "tooltip": "Enable to show popup for non-editable layers",
          "type": "boolean",
          "fieldName": "showPopupForNonEditableLayers"
      }, {
          "type": "subcategory",
          "label": "Map Information"
      }, {
          "type": "paragraph",
          "value": "Select the item details elements that will be visible for each map:"
      }, {
          "label": "Description",
          "tooltip": "Enable to show webmap description.",
          "type": "boolean",
          "fieldName": "webMapInfoDescription"
      }, {
          "label": "Short Summary",
          "tooltip": "Enable to show webmap summary.",
          "type": "boolean",
          "fieldName": "webMapInfoSnippet"
      }, {
          "label": "Owner Name",
          "tooltip": "Enable to show webmap owner.",
          "type": "boolean",
          "fieldName": "webMapInfoOwner"
      }, {
          "label": "Creation Date",
          "tooltip": "Enable to show webmap created date.",
          "type": "boolean",
          "fieldName": "webMapInfoCreated"
      }, {
          "label": "Modification Date",
          "tooltip": "Enable to show webmap modified date.",
          "type": "boolean",
          "fieldName": "webMapInfoModified"
      }, {
          "label": "Access and Use Constraints",
          "tooltip": "Enable to show webmap licensing information.",
          "type": "boolean",
          "fieldName": "webMapInfoLicenseInfo"
      }, {
          "label": "Credits",
          "tooltip": "Enable to show webmap credits.",
          "type": "boolean",
          "fieldName": "webMapInfoAccessInformation"
      }, {
          "label": "Tags",
          "tooltip": "Enable to show webmap tags.",
          "type": "boolean",
          "fieldName": "webMapInfoTags"
      }, {
          "label": "Number of Views",
          "tooltip": "Enable to show webmap number of views.",
          "type": "boolean",
          "fieldName": "webMapInfoNumViews"
      }, {
          "label": "Average Rating",
          "tooltip": "Enable to show webmap average rating.",
          "type": "boolean",
          "fieldName": "webMapInfoAvgRating"
      }, {
          "type": "subcategory",
          "label": "Zoom Level"
      }, {
          "type": "paragraph",
          "value": "Zoom level used when zooming to user location or to the submission form search location."
      }, {
          "label": "Zoom level for selected report",
          "tooltip": "Specify how near (larger number) or far (smaller number) the map should zoom relative to the ground.",
          "type": "string",
          "fieldName": "zoomLevel"
      }, {
        "label": "Use configured zoom level while navigating to existing reports",
        "tooltip": "The configured zoom level will be used to zoom to selected feature",
        "type": "boolean",
        "fieldName": "honorZoomLevel"
      }, {
          "type": "subcategory",
          "label": "Additional Widgets"
      }, {
        "label": "Show legend",
        "tooltip": "When disabled, legend button will not be displayed in map navigation buttons",
        "type": "boolean",
        "fieldName": "showLegend"
      }, {
        "label": "Show basemap gallery",
        "tooltip": "When disabled, basemap gallery button will not be displayed in map navigation buttons",
        "type": "conditional",
        "condition": false,
        "fieldName": "showBaseMapGallery",
        "items" : [{
          "label": "Select basemap group",
          "tooltip": "Group displayed in the base map gallery",
          "type": "basemapgroup",
          "fieldName": "basemapGroup"
        }]
     }]
  }, {
      "category": "<b>Access</b>",
      "fields": [{
          "type": "subcategory",
          "label": "Sign In Screen"
      }, {
          "label": "Sign in background image",
          "tooltip": "Background image for login screen. Recommended 640x960.",
          "type": "string",
          "fieldName": "signInBackgroundImage"
      }, {
          "label": "Sign in icon foreground color",
          "tooltip": "Foreground image color of social media and guest icons.",
          "type": "options",
          "fieldName": "imageForeGroundColor",
          "options": [{
              "label": "Grey",
              "value": "grey"
          }, {
              "label": "White",
              "value": "white"
          }]
      }, {
          "label": "Sign in icon background color",
          "tooltip": "Background image color of social media and guest icons.",
          "type": "color",
          "fieldName": "imageBackgroundColor"
      }, {
          "label": "Sign in screen text color",
          "tooltip": "Color for splash screen content",
          "type": "color",
          "fieldName": "splashScreenTextColor"
      }, {
          "type": "subcategory",
          "label": "Sign In Options"
      }, {
          "type": "paragraph",
          "value": "Configure how users will be able to access your application. See the <a href='http://links.esri.com/localgovernment/help/CrowdsourcePolling/SocialSignIn/' target='_blank'>help</a> for the steps to register your app with Facebook and Google+."
      }, {
          "type": "paragraph",
          "value": "Disable all sign in options to hide the splash screen."
      }, {
          "label": "Allow anonymous access",
          "tooltip": "Enable to allow users to sign in as a guest user.",
          "type": "boolean",
          "fieldName": "enableGuestAccess"
      }, {
          "label": "Allow users to sign in using ArcGIS Online",
          "tooltip": "Enable to allow users to sign in using their ArcGIS Online credentials. Accounts must be members of the organization hosting the application.",
          "type": "boolean",
          "fieldName": "enablePortalLogin"
      }, {
          "label": "Allow users to sign in using Twitter",
          "tooltip": "Enable to allow users to sign in using their Twitter credentials.",
          "type": "boolean",
          "fieldName": "enableTwitter"
      }, {
          "label": "Allow users to sign in using Facebook",
          "tooltip": "Enable to allow users to sign in using their Facebook credentials",
          "type": "conditional",
          "fieldName": "enableFacebook",
          "condition": false,
          "items": [{
              "label": "Please register your app with Facebook and provide your Facebook AppId",
              "tooltip": "Facebook AppId",
              "type": "string",
              "fieldName": "facebookAppId"
          }]
      }, {
          "label": "Allow users to sign in using Google+",
          "tooltip": "Enable to allow users to sign in using their Google+ credentials.",
          "type": "conditional",
          "fieldName": "enableGoogleplus",
          "condition": false,
          "items": [{
              "label": "Please register your app with Google+ and provide your Google+ Client ID",
              "tooltip": "Google+ ClientId",
              "type": "string",
              "fieldName": "googleplusClientId"
          }]
      }, {
          "label": "Field for storing the ID of authenticated users (optional)",
          "tooltip": "Text field that stores the ID of the person who submitted or commented on a report. Field name must be the same across all layers and maps.",
          "type": "string",
          "fieldName": "reportedByField"
      }]
  }, {
      "category": "<b>Search</b>",
      "fields": [{
          "type": "paragraph",
          "value": "By default the application search will use the locators configured in your organization settings. Additionally, the following search types can be enabled:"
      }, {
          "label": "USNG",
          "tooltip": "Enable USNG search.",
          "type": "boolean",
          "fieldName": "enableUSNGSearch"
      }, {
          "label": "MGRS",
          "tooltip": "Enable MGRS search.",
          "type": "boolean",
          "fieldName": "enableMGRSSearch"
      }, {
          "label": "Latitude/Longitude",
          "tooltip": "Enable latitude/longitude search.",
          "type": "boolean",
          "fieldName": "enableLatLongSearch"
      }, {
          "type": "subcategory",
          "label": "Search Settings"
      }, {
        "type": "paragraph",
        "value": "Enable search to allow users to find a location or data in the map."
      }, {
          "type": "conditional",
          "condition": false,
          "fieldName": "tool_search",
          "label": "Enable search tool",
          "items": [{
             "type": "search",
             "fieldName": "searchConfig",
             "label": ""
        }]
    }]
  }, {
      "category": "<b>Form</b>",
      "fields": [{
          "type": "subcategory",
          "label": "Details"
      }, {
          "type": "paragraph",
          "value": "The details section of the form is built using the fields marked as editable in the popup configuration."
      }, {
          "label": "Section header",
          "tooltip": "Title for the details section of the form.",
          "type": "string",
          "fieldName": "geoformDetailsSectionLabel"
      }, {
          "label": "Display order",
          "tooltip": "Set order of details section.",
          "type": "options",
          "fieldName": "details",
          "options": [{
              "label": "Top",
              "value": "Top"
          }, {
              "label": "Middle",
              "value": "Middle"
          }, {
              "label": "Bottom",
              "value": "Bottom"
          }]
      }, {
          "type": "subcategory",
          "label": "Attachments"
      }, {
          "type": "paragraph",
          "value": "The attachment section of the form where photos and other supporting files can be added to the report. This section is only available when attachments are enabled on the layer."
      }, {
          "label": "Section header",
          "tooltip": "Title for the attachments section of the form.",
          "type": "string",
          "fieldName": "geoformAttachmentSectionLabel"
      }, {
          "label": "Display order",
          "tooltip": "Set order of attachment section.",
          "type": "options",
          "fieldName": "attachments",
          "options": [{
              "label": "Top",
              "value": "Top"
          }, {
              "label": "Middle",
              "value": "Middle"
          }, {
              "label": "Bottom",
              "value": "Bottom"
          }]
      }, {
          "type": "subcategory",
          "label": "Location"
      }, {
          "type": "paragraph",
          "value": "The location section of the form where reports can be drawn on the map or found by searching for an address."
      }, {
          "label": "Section header",
          "tooltip": "Title for the location section of the form.",
          "type": "string",
          "fieldName": "geoformLocationSectionLabel"
      }, {
          "label": "Display order",
          "tooltip": "Set order of location section.",
          "type": "options",
          "fieldName": "location",
          "options": [{
              "label": "Top",
              "value": "Top"
          }, {
              "label": "Middle",
              "value": "Middle"
          }, {
              "label": "Bottom",
              "value": "Bottom"
          }]
      }, {
          "type": "paragraph",
          "value": "Optionally, store a text form of the report location. This location-storing functionality will only be available for layers with a field of the specified (case-sensitive) name."
      }, {
          "label": "Name of the field to store report location",
          "tooltip": "Allows user to configure location field.",
          "type": "string",
          "fieldName": "locationField"
      }, {
          "type": "paragraph",
          "value": "Restrict where reports can be drawn by specifying the name of an uneditable polygon layer. Reports will only be accepted within the boudaries of features in this layer. The locations of reports will only be restricted in maps that contain an uneditable polygon layer with this name."
      }, {
          "label": "Name of an uneditable polygon layer",
          "tooltip": "Reports can only be added within the polygon features in layers with this name in the map Contents.",
          "type": "string",
          "fieldName": "geographicalExtentLayer"
      }, {
          "label": "Message when a report cannot be added at the specified location.",
          "tooltip": "Message displayed when a report location is outside the features in the configured polygon layer",
          "type": "string",
          "fieldName": "featureOutsideAOIMsg"
      }, {
          "type": "subcategory",
          "label": "Report Button"
      }, {
          "label": "Submit report button text",
          "tooltip": "Text for the button that opens the submission form.",
          "type": "string",
          "fieldName": "submitReportButtonText"
      }, {
          "label": "Submit report button color",
          "tooltip": "Color for submit report button",
          "type": "color",
          "fieldName": "submitReportButtonColor"
      }, {
          "type": "subcategory",
          "label": "Submission Message"
      }, {
          "label": "Message displayed after a report is submitted successfully",
          "tooltip": "Message displayed at the top of the form acknowledging report submission.",
          "type": "string",
		  "stringFieldOption": "richtext",
          "fieldName": "submitMessage"
      }]
  }, {
      "category": "<b>Reports</b>",
      "fields": [{
          "type": "subcategory",
          "label": "Mobile Display Settings"
      }, {
          "type": "paragraph",
          "value": "On smartphones choose to initially display the reports on a map or in a list. Users will be able to toggle between both views."
      }, {
          "type": "radio",
          "fieldName": "showMapFirst",
          "tooltip": "Show map or list on application load.",
          "items": [{
              "label": "Show map first",
              "value": "map"
          }, {
              "label": "Show list first",
              "value": "list"
          }]
      }, {
          "type": "subcategory",
          "label": "Search Radius"
      }, {
          "type": "paragraph",
          "value": "When the application loads, users will be asked to share their location to view nearby reports. Only reports within this radius will load, but users can expand this search radius incrementally in the application. Define the radius of this initial search for nearby reports. "
      }, {
          "label": "Initial search radius",
          "tooltip": "When location is shared, application will initially load all reports within this search radius.",
          "type": "number",
          "fieldName": "bufferRadius"
      }, {
          "tooltip": "Unit of distance for the search radius.",
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
      }, {
          "type": "subcategory",
          "label": "Editing Reports and Comments"
      }, {
          "type": "paragraph",
          "value": "Allow users to edit and/or delete their own submissions. These capabilities will only be accessible on reports submitted by users who accessed the application using ArcGIS or social media accounts. Configure these sign in options on the Access tab."
      }, {
          "label": "Allow editing of reports and comments",
          "tooltip": "Allow authenticated reporters to edit their own reports and comments.",
          "type": "boolean",
          "fieldName": "enableFeatureEdit"
      }, {
          "label": "Allow features to be deleted",
          "tooltip": "Allow authenticated reporters to delete their own reports and comments.",
          "type": "boolean",
          "fieldName": "enableFeatureDelete"
      }, {
          "type": "subcategory",
          "label": "Votes"
      }, {
          "type": "paragraph",
          "value": "Allow users to vote for reports by specifying a numeric field from one or many of the layers that will be shown in your app. A vote button will appear on reports submitted to any layer that has a field of this name, and clicking this button will increment the vote count stored in this field."
      }, {
          "type": "paragraph",
          "value": "Voting will not be available on layers that do not have a field of this (case-sensitive) name. Voting requires a service that allows updating existing records."
      }, {
          "label": "Name of the field storing the vote tally for each report",
          "tooltip": "Integer field that stores the vote count for each report. Layers without a field of this name will not have the option for submitting votes.",
          "type": "string",
          "fieldName": "likeField"
      }, {
          "type": "subcategory",
          "label": "Comments"
      }, {
          "type": "paragraph",
          "value": "Collect and store comments on reports using a related table. Commenting is available for layers with geodatabase relationships to a single table. Choose to collect and display comments using a single field, or using the popup configuration of the table layer."
      }, {
          "label": "Display comments using the popup configuration of the table layer where the comments are stored.",
          "tooltip": "Enable to display related records and the editing form based on the table layer's popup configuration instead of a single field. Fields that are marked editable in the popup will be editable in the application.",
          "type": "conditional",
          "fieldName": "usePopupConfigurationForComment",
          "condition": true,
          "items": [{
              "type": "paragraph",
              "value": "Alternatively, provide the name of a field to display, regardless of the popup settings. This value is ignored if you choose to build the form from the comment table popup (previous option). Commenting will only be available for layers related to tables that have a field of this name."
          }, {
              "label": "Name of the field to store comments",
              "tooltip": "Only content from related tables that have this field will be accessible through the application. This value is ignored if you choose to build the form from the comment table popup (previous option).",
              "type": "string",
              "fieldName": "commentField"
          }]
      }, {
          "label": "Reports sorting field",
          "tooltip": "Sort issues based on configured field",
          "type": "string",
          "fieldName": "sortingField"
      }, {
          "label": "Sorting order",
          "tooltip": "Order in which issue's can be sorted ",
          "type": "options",
          "fieldName": "sortingOrder",
          "options": [{
              "label": "Ascending",
              "value": "ASC"
          }, {
              "label": "Descending",
              "value": "DESC"
          }]
      }, {
          "type": "subcategory",
          "label": "Reporting Period"
      }, {
          "type": "radio",
          "fieldName": "reportingPeriod",
          "tooltip": "Reporting period status.",
          "items": [{
              "label": "Reporting Period Open",
              "value": "Open",
              "checked": true
          }, {
              "label": "Reporting Period Closed",
              "value": "Closed"
          }]
      }, {
          "label": "Reporting period closed window title",
          "tooltip": "Title of window that displays when reporting period is closed.",
          "type": "string",
          "fieldName": "reportingPeriodDialogTitle"
      }, {
          "label": "Reporting period closed window content",
          "tooltip": "Content of window that displays when reporting period is closed.",
          "type": "string",
          "fieldName": "reportingPeriodDialogContent",
          "stringFieldOption": "richtext"
      }]
  }]
}