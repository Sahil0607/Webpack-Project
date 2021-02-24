const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: './src/hello-world.js',  // Need only 1 entry app
    output: {   
         filename: '[name].bundle.js',   
         path: path.resolve(__dirname, './dist'),   
         publicPath: 'https://localhost:9001/',   // Current url
    },
    mode: 'development', 
    devServer: {  
        contentBase: path.resolve(__dirname, './dist'),   
        index: 'hello-world.html',   // Change name 
        port: 9001   // 9001 for first app and 9002 for sec. app
    },
    module: {
        rules: [
            // Not use butterfly component
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
            // Using sass everywhere
            // {  
            //     test: /\.css$/,
            //     use: [ 
            //         'style-loader',  
            //         'css-loader'  
            //     ], 
            // },
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
            // chunks: ['hello-world'],  // not needed
            template: 'src/page-template.hbs',  
            description: 'Hello world',
            minify: false  
        }), 
        // Only need helloworld plugin
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
