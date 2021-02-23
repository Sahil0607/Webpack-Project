const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: './src/index.js',  // Start here
    // Instead of using one entry point we will use two entry point for helloworld and butterfly
    entry: {  // Split code in to multiple bundle
        'butterfly': './src/butterfly.js',
        'hello-world': './src/hello-world.js' 
    },
    output: {   
         filename: '[name].[contenthash].js',  // webpack take [name] from entrypoint. Here it'll take hello-world and butterfly.
         path: path.resolve(__dirname, './dist'),   
        publicPath: '', 
    },
    mode: 'production', 
    optimization: {   // Use for common dependancy and decrease both bundle size
        // asset 486.c1b176eceded964bd14e.js 68.8 KiB cached seperatly which has dependancy and both bundle use dep. from here. 
        splitChunks: {
            chunks: 'all',
            minSize: 3000  // if dependancy dize < 3kb then it will not make saperate bundle. Use in component. 
            // By default is 30kb. If dep. > 30kb then make a saperate bundle else use in same comp.
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
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'  // name will take from entry point. Same as output.
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
            chunks: ['hello-world'],  // same name as entrypoit
            template: 'src/page-template.hbs',  
            description: 'Hello world',
            minify: false  // true by default. Make readable code in dist/index.html
        }), 
        new HtmlWebpackPlugin({  
            filename: 'butterfly.html',
            title: 'Butterfly',
            chunks: ['butterfly'],  // same name as entrypoit
            template: 'src/page-template.hbs',  
            description: 'Butterfly',
            minify: false  // true by default. Make readable code in dist/index.html
        }), 
    ],    
}

// Using chunks we can specify which bundle we want to add and where
// Using chunk we can create multiple html file in dist. Here we are creating 2 html files.

// Shared common dependancy
// Two component need to share common dependancy because if both use its own dependancy then bundle size will more bigger.
// Ex: using lodash for both component
// <script defer src="486.c1b176eceded964bd14e.js"></script>
// This bundle is common dep. bundle. It will attech to html if html need dep. otherwise will not add.
// Also check chrome --> devtools network tab --> dependancy bundle is cached with butterfly and helloworld bundle.