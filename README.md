[Preview]: http://arcgis.com/apps/CrowdsourceReporter/index.html
[Thumbnail]: crowdsource-reporter.png "Crowdsource Reporter"

[supported browsers]: http://doc.arcgis.com/en/arcgis-online/reference/browsers.htm
[New to Github? Get started here.]: http://htmlpreview.github.com/?https://github.com/Esri/esri.github.com/blob/master/help/esri-getting-to-know-github.html
[Want more info on this app? Check out the documentation.]: http://solutions.arcgis.com/local-government/help/crowdsource-reporter/
[ArcGISDesktop]: http://www.esri.com/software/arcgis/arcgis-for-desktop
[ArcGISServer]: http://www.esri.com/software/arcgis/arcgisserver
[LGInfoModel]: http://www.arcgis.com/home/item.html?id=ae175b36c4154dda987127dff879350d
[ArcGIS for Local Government maps and apps]: http://solutions.arcgis.com/local-government
[Local Government GitHub repositories]: http://esri.github.io/#Local-Government
[Esri's ArcGIS API for JavaScript]: http://help.arcgis.com/en/webapi/javascript/arcgis/
[Esri's ArcGIS Online Help]: http://resources.arcgis.com/en/help/arcgisonline/
[guidelines for contributing]: https://github.com/esri/contributing
[LICENSE.txt]: LICENSE.txt

# crowdsource-reporter

Crowdsource Reporter is a configurable group application template that allows users to submit problems or observations.

The Crowdsource Reporter application presents one, or more, maps that can be used to report a problem or observation. Users can anonymously submit new reports, review existing reports, and comment and vote on reports or observations submitted by other users. They can also authenticate with their social media or ArcGIS Online credentials and track the status of problems or observations they have reported.

[![Image of the Constituent Engagement app][Thumbnail]][Preview]

## Features

* Presents editable layers from one or more maps that have been shared with the ArcGIS Online/Portal group configured in the application.
* Users can submit new reports, review existing reports, and comment and vote on reports or observations submitted by other users.
* Users can access the content anonymously, or authenticate using their Facebook, Google+, Twitter, or ArcGIS credentials. Authenticated users gain access to additional functionality, such as My Issues - a list of all reports they have submitted.
* The application has been optimized for smartphones but is responsively designed and can also be used in browsers on smartphones, tablets, and desktops using [all browsers supported by ArcGIS Online][supported browsers].

## Requirements

### Experience

* Authoring maps
* Configuring ArcGIS Online/Portal web app templates

### Software
* ArcGIS Online subscription or ArcGIS Portal

### Browser Compatibility
* The application is optimized for display on smarthones, desktops, and tablets using [all browsers supported by ArcGIS Online][supported browsers].

## Instructions

### General Help
* [New to Github? Get started here.][]
* [Want more info on this app? Check out the documentation.][]

### Deploying

1. To deploy this application, download the template from Portal/ArcGIS Online and unzip it.
2. Copy the unzipped folder containing the web app template files, such as index.html, to your web server. You can rename the folder to change the URL through which users will access the application. By default the URL to the app will be `http://<Your Web Server>/<app folder name>/index.html`
3. Change the sharing host, found in defaults.js inside the config folder for the application, to the sharing URL for ArcGIS Online or Portal. For ArcGIS Online users, keep the default value of www.arcgis.com or specify the name of your organization.
  - ArcGIS Online Example:  `"sharinghost": location.protocol + "//" + “<your organization name>.maps.arcgis.com`
  - Portal Example where `arcgis` is the name of the Web Adaptor: `"sharinghost": location.protocol + "//" + "webadaptor.domain.com/arcgis"`
4. If you are using Portal or a local install of the ArcGIS API for JavaScript, change all references to the ArcGIS API for JavaScript in index.html to refer to your local copy of the API. Search for the references containing `"//js.arcgis.com/3.25"` and replace this portion of the reference with the url to your local install.
  - For example: `"//webadaptor.domain.com/arcgis/jsapi/jsapi"` where `arcgis` is the name of your Web Adaptor.
5. Copy a group ID from Portal/ArcGIS Online and replace the default group ID in the application’s default.js file. You can now run the application on your web server or configure the application further.

> **Note:** If your application edits features in a feature service, contains secure services or web maps that aren't shared publicly, or generate requests that exceed 200 characters, you may need to set up and use a proxy page. Common situations where you may exceed the URL length are using complex polygons as input to a task or specifying a spatial reference using well-known text (WKT). For details on installing and configuring a proxy page see [Using the proxy](https://developers.arcgis.com/javascript/jshelp/ags_proxy.html). If you do not have an Internet connection, you will need to access and deploy the ArcGIS API for JavaScript documentation from [developers.arcgis.com](https://developers.arcgis.com/).

## Resources

Learn more about Esri's [ArcGIS for Local Government maps and apps][].

Show me a list of other [Local Government GitHub repositories][].

This application uses the 3.25 version of [Esri's ArcGIS API for JavaScript][]; see the site for concepts, samples, and a reference for using the API to create mapping web sites.

[Esri's ArcGIS Online Help][] site describes how to create web maps and web map applications in the ArcGIS Online ecosystem.

## Issues

Find a bug or want to request a new feature?  Please let us know by submitting an issue.

## Contributing

Esri welcomes contributions from anyone and everyone. Please see our [guidelines for contributing][].

## Licensing

Copyright 2014 Esri

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

A copy of the license is available in the repository's [LICENSE.txt][] file.
