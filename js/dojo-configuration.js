/*global dojoConfig:true */
/*jslint browser:true,sloppy:true,nomen:true,unparam:true,plusplus:true,indent:4 */
/*
 | Copyright 2013 Esri
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
//============================================================================================================================//

/**
* initialize default dojo configuration attributes by creating a dojoConfig object
*/
var root = location.href.slice(0, location.href.lastIndexOf('/'));
dojoConfig = {
    parseOnLoad: true,
    async: true,
    baseURL: root,
    packages: [{
        name: "application",
        location: root + '/js'
    }, {
        name: "css",
        location: root + '/css'
    }, {
        name: "config",
        location: root + '/config'
    }, {
        name: "arcgis_templates",
        location: root + '/..'
    }, {
        name: "widgets",
        location: root + '/js/widgets'
    }, {
        name: "vendor",
        location: root + '/js/vendor'
    }],
    locale: decodeURIComponent((new RegExp('[?|&]' + 'locale' + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ''])[1].replace(/\+/g, '%20')) || null
};
