const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: './src/butterfly.js',  // Need only 1 entry app
    output: {   
         filename: '[name].bundle.js',   
         path: path.resolve(__dirname, './dist'),   
        publicPath: '', 
    },
    mode: 'development', 
    devServer: {  
        contentBase: path.resolve(__dirname, './dist'),   
        index: 'butterfly.html',   // Change name 
        port: 9002   // 9001 for first app and 9002 for sec. app
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
                        presets: ['@babel/env'] 
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
            // chunks: ['butterfly'],  // not needed
            template: 'src/page-template.hbs',  
            description: 'butterfly',
            minify: false  
        }), 
        new ModuleFederationPlugin({
            name: 'ButterflyApp',
            // This app does not expose anything.
            remotes: {  // remote module shared by other app.
                // list of remote app
                HelloWorldApp: 'HelloWorldApp@http://localhost:9001/remoteEntry.js'  
                // remoteEntry: same name used in helloworld dev webpack in ModuleFederationPlugin
            }
        }),
    ],    
}
