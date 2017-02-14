var path = require('path');

module.exports = {
    entry: './js/bootstrapper.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: './',
        libraryTarget: 'amd'
    },

    module: {
        rules: [
            { test: /\.html$/, use: 'html-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }
        ]
    },

    externals: [
        function(context, request, callback) {
            if (/^dojo/.test(request) ||
                /^dojox/.test(request) ||
                /^dijit/.test(request) ||
                /^esri/.test(request)
            ) {
                return callback(null, "amd " + request);
            }
            callback();
        }
    ],

    devtool: 'cheap-eval-source-map',
};
