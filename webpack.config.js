var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: {
      bundle: './js/bootstrapper.js',
      vendor: [
        'script-loader!jquery',
        'moment',
        'bootstrap',
        'bootstrap-touchspin',
        'imports-loader?moment,this=>window,define=>undefined,exports=>undefined!eonasdan-bootstrap-datetimepicker',
      ]
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: './',
        libraryTarget: 'amd'
    },

    module: {
        rules: [{
            test: /\.js$/,
            enforce: 'pre',
            exclude: /node_modules/,
            use: {
                loader: 'eslint-loader',
                options: {
                  outputReport: {
                    filePath: './__eslint-[hash]_log.txt'
                  }
                }
            }
        }, {
            test: /\.html$/,
            use: 'html-loader'
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              use: 'css-loader'
            })
        }, {
            exclude: [
                /\.js$/,
                /\.html$/,
                /\.css$/
            ],
            loader: 'url-loader',
            options: { limit: 10000 }
        }]
    },

    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin({
          name: ['vendor']
        })
    ],

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

    devtool: 'source-map',
};
