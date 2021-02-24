const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/hello-world.js', // same as dev
    output: {   
         filename: '[name].[contenthash].js',  
         path: path.resolve(__dirname, './dist'),   
        // publicPath: '', 
        publicPath: 'https://localhost:9001/',  // used for static file used in express.
    },
    mode: 'production', 
    optimization: {  
        splitChunks: {
            chunks: 'all',
            minSize: 3000  
        }
    },
    module: {
        rules: [
            // not needed same as dev
            // {  
            //     test: /\.(png|jpg)$/,
            //     type: 'asset',  
            //     parser: {  
            //         dataUrlCondition: {  
            //             maxSize: 3 * 1024, 
            //         }
            //     }
            // },
            // {  
            //     test: /\.txt$/,  
            //     type: 'asset/source'  
            // },  
            // {  
            //     test: /\.css$/,
            //     use: [ 
            //         MiniCssExtractPlugin.loader, 'css-loader'  
            //     ], 
            // },
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
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'  
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',  
                path.join(process.cwd(), 'build/**/*') 
            ],
        }),
        new HtmlWebpackPlugin({  
            filename: 'hello-world.html',
            title: 'Hello World',
            // chunks: ['hello-world'],   // same as dev
            template: 'src/page-template.hbs',  
            description: 'Hello world',
            minify: false  
        }), 
        // same as dev
        // new HtmlWebpackPlugin({  
        //     filename: 'butterfly.html',
        //     title: 'Butterfly',
        //     chunks: ['butterfly'],  
        //     template: 'src/page-template.hbs',  
        //     description: 'Butterfly',
        //     minify: false 
        // }), 
        new ModuleFederationPlugin({
            name: 'HelloWorldApp',
            filename: 'remoteEntry.js',  // naming convention
            exposes: {   // name of file which we expose 
                './HelloWorldButton': './src/component/hello-world-button/hello-world-button.js',
            }
        }), 
    ],    
}
