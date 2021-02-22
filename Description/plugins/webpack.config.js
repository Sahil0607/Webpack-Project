const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', 
    output: {   
         filename: 'bundle.[contenthash].js',  // .[contenthash] to generate hashcode in main or bundle.js file
         path: path.resolve(__dirname, './dist'),   
        //  publicPath: 'dist/',   // use it before HtmlWebpackPlugin.
        publicPath: '', 
    },
    mode: 'none',
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
                    MiniCssExtractPlugin.loader, 'css-loader'  // Change rules 'style-loader' to MiniCssExtractPlugin.loader
                ], 
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' // Change rules 'style-loader' to MiniCssExtractPlugin.loader
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
                test: /\.hbs$/,    // Tell Webpack how to use .hbs files
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
            // .[contenthash] to generate hashcode in style.js file && keep same if not have any change in file.
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',  // This is default if we not modify.
                // Remove all file and subfolder in dist folder.
                // Clean this file before webpack make new file. File path is relative to dist folder(output.path ==> path.resolve(__dirname, './dist'),).
                path.join(process.cwd(), 'build/**/*') // Use absolute path if remove another files.
                // remove subfolder and file inside build folder
            ],
        }), // clean output.path folder.
        new HtmlWebpackPlugin({  // create new index.html file in dist with bundle.js and style.css hashcode.
            title: 'Hello World',
            // filename: 'subfolder/custom_filename.html',  
            // create subfolder in dist. And create custom_filename.html in it instead index.html
            meta: {  // Tell webpack to add meta tag in html.
                description: 'Some description'
            },
            template: 'src/index.hbs',   // Use hbs file for getting description and title
            description: 'Some description'  // Value read by index.hbs file
        }), 
    ],    
}

// Terser Plugin
// TerserPlugin minimize bundle size and apply minification
// npm install terser-webpack-plugin --save-dev
// --save-dev means development dependancy. only used during development
// --save prod dependancy. Used for production dependency.
// webpack version > 5, then dont need to install terser plugin. Come with it.
// Can use uglify.js for same result. Used in old version

// mini-css-extract-plugin
// npm install mini-css-extract-plugin --save-dev
// It will extract css into different file in dist folder.
// Currently we have all style in html. So it is not good for production. Add css saperate file.
// Styles are dynamically added to dom during runtime by javascript. Problem is bundle size is more bigger at runtime.
// Big files need more time to load. 
// So we will generate 2 bundle instead 1. 
// Take all css file from project and add in to style.css file. Check for heading and helloworld css file

// Browser Caching
// When browser load website it will load assest required. When user reload it will download cache everytime.
// It will take time to load every time when user has slow connection or use in mobile.
// Cache is always stored in browser. So page can load faster. Browser will not load page, it will use cache if it is a same.
// If hash is different then download new version of file.
// If the cache is different the it will download new cache(Ex: main.hash.js).
// We can use hash code to validate code is same or different. Also same for style file.
// Webpack will only generate new hashcode if file has changes.

// Clean Webpack plugin
// Clean bundle.js or main.js file when new file or new hashcode is created.
// It will check all time when webpack running.
// Clean output.path folder. In our case this is dist folder. 
// Webpack make sure to clean folder before put snything else in it.

// HtmlWebpackPlugin
// Include bundle hash code in index.html file. Before we are using only bundle.js file without hash.
// Create new index.html in dist folder with hashcode. But path is start with 'dist/bundle.323hvh.js'
// We dont need absolute path. So dont need 'dist/' in path. So make from output.publicPath = ''. (instead 'dist/')
// So we will remove globle index.html file.(not in dist folder)
// After gen. index.html in dist, it will use 'Webpack App' title. We want title back.
// Add title and filename in HtmlWebpackPlugin config.

// We can use template engin(such as handlebar) in html.
// We need to add loader to teach how to use .hbs file
// And add variable in plugins which will use by .hbs file.
// npm install handlebars-loader --save-dev and npm install handlebars --save