const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', 
    output: {   
         filename: 'bundle.[contenthash].js',  
         path: path.resolve(__dirname, './dist'),   
        publicPath: '', 
    },
    mode: 'development',  // Can use none, development, production
    module: {
        rules: [
            {  
                test: /\.(png|jpg)$/,
                type: 'asset',  
                parser: {  
                    dataUrlCondition: {  
                        maxSize: 3 * 1024, 
                    }
                }
            },
            {  
                test: /\.txt$/,  
                type: 'asset/source'  
            },  
            {  
                test: /\.css$/,
                use: [ 
                    MiniCssExtractPlugin.loader, 'css-loader'  
                ], 
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' 
                ] 
            }, 
            {
                test: /\.js$/,  
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', 
                    options: {  
                        presets: ['@babel/env'],  
                        plugins: ['@babel/plugin-proposal-class-properties'] 
                    }, 
                }
            },
            {
                test: /\.hbs$/,   
                use: {
                    loader: 'handlebars-loader', 
                }
            },
        ],
    },
    plugins: [
        new TerserPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash].css'  
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',  
                path.join(process.cwd(), 'build/**/*') 
            ],
        }),
        new HtmlWebpackPlugin({  
            title: 'Hello World',
            meta: {  
                description: 'Some description'
            },
            template: 'src/index.hbs',  
            description: 'Some description'  
        }), 
    ],    
}

// Mode will give us more built in optiomization
// Not availabe bef. version 4. Has to do more stuff if use bef version 4 versions.
// Can put 3 possible values in mode. none, deveopment, production
// If we turn on production we can see bundle.js in minified version. But in development we can see it readeble way.
// Batter to detect error in deveopment mode.

// Manage mode depend on use case
// We cannot set to production every time when we send code to production.
// We can set two file. one for development and one for production.
// Also set in package.json for both file.

// Faster development with webpack dev server
// npm install webpack-dev-server --save-dev
// Used "dev": "webpack serve --config webpack.dev.config.js --hot" instead of "dev": "webpack --config webpack.dev.config.js" 
// used new script for dev server. And open 9000 port for result.