const { resolve } = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackChromeReloaderPlugin = require("webpack-chrome-extension-reloader");

module.exports = {
    devtool: "source-map",
    entry: {
        "content-script": "./src/my-content-script.js",
        "background": "./src/my-background.js"
    },
    output: {
        publicPath: ".",
        path: resolve(__dirname, "dist/"),
        filename: "[name].js",
        libraryTarget: "umd"
    },
    plugins: [
        //We check the NODE_ENV for the "development" value to include the plugin
        process.env.NODE_ENV === "development"? new WebpackChromeReloaderPlugin({
            port: 9090, // Which port use to create the server
            reloadPage: true, // Force the reload of the page also
            entries: { //The entries used for the content/background scripts
                contentScript: 'content-script', //Use the entry names, not the file name or the path
                background: 'background'
            }
        }) : null,

        new ExtractTextPlugin({ filename: "style.css" }),
        new CopyWebpackPlugin([{ from: "./src/some-asset.txt", flatten: true }]),
        new CopyWebpackPlugin([{ from: "./src/*.html", flatten: true }]),
        new CopyWebpackPlugin([{ from: "./src/manifest.json", flatten: true }])
    ].filter(plugin => !!plugin),
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: [require("babel-preset-es2015")]
                }
            }
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader",
            }),
        }]
    }
};