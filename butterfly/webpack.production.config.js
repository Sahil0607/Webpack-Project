const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: './src/butterfly.js',  // same as dev
    output: {   
         filename: '[name].[contenthash].js',  
         path: path.resolve(__dirname, './dist'),   
        // publicPath: '', 
        publicPath: 'http://localhost:9002/',  // Insetad of '/static/' use actual url same as hello-world
    },
    mode: 'production', 
    optimization: {  
        splitChunks: {
            chunks: 'all',
            minSize: 10000,
            automaticNameDelimiter: '_'
        }
    },
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
            // {  
            //     test: /\.css$/,
            //     use: [ 
            //         MiniCssExtractPlugin.loader, 'css-loader'  
            //     ], 
            // },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    'sass-loader' 
                ] 
            }, 
            {
                test: /\.js$/,  
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', 
                    options: {  
                        presets: ['@babel/env']
                    }, 
                }
            },
            {
                test: /\.hbs$/,   
                use: [
                    'handlebars-loader', 
                ]
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'  
        }),
        new CleanWebpackPlugin({
            // cleanOnceBeforeBuildPatterns: [
            //     '**/*',  
            //     path.join(process.cwd(), 'build/**/*') 
            // ],
        }),
        // same as dev
        // new HtmlWebpackPlugin({  
        //     filename: 'hello-world.html',
        //     title: 'Hello World',
        //     chunks: ['hello-world'],   
        //     template: 'src/page-template.hbs',  
        //     description: 'Hello world',
        //     minify: false  
        // }), 
        new HtmlWebpackPlugin({  
            filename: 'butterfly.html',
            title: 'Butterfly',
            // chunks: ['butterfly'],  // same as dev
            template: 'src/page-template.hbs',  
            description: 'Butterfly',
            minify: false 
        }), 
        new ModuleFederationPlugin({
            name: 'ButterflyApp',
            // This app does not expose anything.
            // remotes: {  
            //     HelloWorldApp: 'HelloWorldApp@http://localhost:9001/remoteEntry.js'  
            // }

            // same as dev and hello-world
            filename: 'remoteEntry.js',
            exposes: {
                './ButterflyPage': './src/component/butterfly-page/butterfly-page.js'
            }
        }),
    ],    
}
