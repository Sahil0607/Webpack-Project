const path = require('path');
// const TerserPlugin = require('terser-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', 
    output: {   
         filename: 'bundle.js',  // Dont need browser cache in dev. So remove [contenthash].
         path: path.resolve(__dirname, './dist'),   
        publicPath: '', 
    },
    mode: 'development',  // use development
    devServer: {  // Faster development with webpack dev server and also change script in package.json
        contentBase: path.resolve(__dirname, './dist'),   // Absolute path
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
                    // MiniCssExtractPlugin.loader,  // Use style-loader instead
                    'style-loader',  // use instead MiniCssExtractPlugin
                    'css-loader'  
                ], 
            },
            {
                test: /\.scss$/,
                use: [
                    // MiniCssExtractPlugin.loader,  // Use style-loader instead
                    'style-loader',  // use instead MiniCssExtractPlugin
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
        // new TerserPlugin(),
        // Can remove it. We dont need to minify in dev mode.

        // new MiniCssExtractPlugin({
        //     filename: 'styles.[contenthash].css'  
        // }),
        // dont needed in development but used in prod. Dont need to saperate style.css in dev.

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