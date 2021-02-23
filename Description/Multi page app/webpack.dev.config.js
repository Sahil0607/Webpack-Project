const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: './src/index.js', 
    entry: {  // Split code in to multiple bundle
        'butterfly': './src/butterfly.js',
        'hello-world': './src/hello-world.js' 
    }, 
    // Same as prod
    output: {   
         filename: '[name].bundle.js',   // webpack take [name] from entrypoint. Here it'll take hello-world and butterfly.
         path: path.resolve(__dirname, './dist'),   
        publicPath: '', 
    },
    mode: 'development', 
    devServer: {  
        contentBase: path.resolve(__dirname, './dist'),   
        index: 'index.html',
        port: 9000,
        writeToDisk: true
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
                    'style-loader',  
                    'css-loader'  
                ], 
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',  
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

// Setup dev env for multiple app.