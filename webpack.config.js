// ------------------
// Modules
// ------------------

const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');



// ------------------
// Constants
// ------------------

const API_ORIGIN = 'http://directus.karpovsystems.com/_';
const EMAIL = 'user@editor.com';
const PASSWORD = '1234321';




// ----------------
// Common config
// ----------------

const Common = {

    module: {
        rules: [
            {
                test: /\.svg$/,
                loader: 'vue-svg-loader',
                options: {
                    svgo: {
                        plugins: [
                            {convertShapeToPath: false},
                            {removeUselessStrokeAndFill: false}
                        ]
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            API_ORIGIN: JSON.stringify(API_ORIGIN)
        })
    ],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/')
        }
    },

    entry: './src/app.js'
};



// ------------------
// Development mode
// ------------------

const Dev = {

    mode: 'development',

    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback: true,
        port: 49087
    },

    plugins: [

        ...Common.plugins,

        new webpack.DefinePlugin({
            EMAIL: JSON.stringify(EMAIL),
            PASSWORD: JSON.stringify(PASSWORD),
        })

    ]

};



// ------------------
// Production mode
// ------------------

const Prod = {

    mode: 'production',
    devtool: 'source-map',

    plugins: [

        ...Common.plugins,

        new webpack.DefinePlugin({
            EMAIL: JSON.stringify(''),
            PASSWORD: JSON.stringify(''),
        })
    ]

};



// ------------------
// Exports
// ------------------

module.exports = env => {

    switch (env) {
        case 'dev': return Object.assign(Common, Dev);
        case 'prod': return Object.assign(Common, Prod);
    }

};
