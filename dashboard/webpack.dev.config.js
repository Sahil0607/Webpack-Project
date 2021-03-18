const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: './src/dashboard.js',  // Need only 1 entry app
    output: {   
         filename: '[name].bundle.js',   
         path: path.resolve(__dirname, './dist'),   
        publicPath: 'http://localhost:9000/',  // Instead of '' use same as helloworld app
    },
    mode: 'development', 
    devServer: {  
        contentBase: path.resolve(__dirname, './dist'),   
        index: 'dashboard.html',   // Change name 
        port: 9000,  // 9000 for main app
        historyApiFallback: {  // tell webpack to always return page dashboard.html. No matter what URL we put.
            index: 'dashboard.html'
        }
    },
    module: {
        rules: [
            // Not needed image 
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
                        presets: ['@babel/env'] 
                    }, 
                }
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(
            // {
            // cleanOnceBeforeBuildPatterns: [
            //     '**/*',  
            //     path.join(process.cwd(), 'build/**/*') 
            // ],
            // }
        ),
        // new HtmlWebpackPlugin({  
        //     filename: 'hello-world.html',
        //     title: 'Hello World',
        //     chunks: ['hello-world'],  
        //     template: 'src/page-template.hbs',  
        //     description: 'Hello world',
        //     minify: false  
        // }), 
        new HtmlWebpackPlugin({  
            filename: 'dashboard.html',
            title: 'Dashboard',

            // not needed
            // chunks: ['butterfly'],  
            // template: 'src/page-template.hbs',  
            // description: 'butterfly',
            // minify: false  
        }), 
        new ModuleFederationPlugin({
            name: 'App',
            remotes: { // Need to specify which remote app we need to consume
                // Here we are telling webpack which url app is running
                HelloWorldApp: 'HelloWorldApp@http://localhost:9001/remoteEntry.js',
                ButterflyApp: 'ButterflyApp@http://localhost:9002/remoteEntry.js'
            },

            // filename: 'remoteEntry.js',
            // exposes: {
            //     './ButterflyPage': './src/component/butterfly-page/butterfly-page.js'
            // }
        }),
    ],    
}
