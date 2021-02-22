const path = require('path');

module.exports = {
    entry: './src/index.js',  // Start from this file when running build process
    output: {   // file will generated after build process
         filename: 'bundle.js',  // When webpack run it will store result in main.js or bundle.js
         path: path.resolve(__dirname, './dist'),   // directory name and path use for absolute path
         // Webpack create folder and file if it will not exist
         publicPath: 'dist/', // It is auto in after webpack 4. Need to add relative path
         // publicpath will tell webpack that where to find file. Ex image will find in dist folder.
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
            {  // css loader will teach webpack how to import css file
                test: /\.css$/,
                use: [  // we can use one or more loader use to import our file
                    'style-loader', 'css-loader'// can combine multiple loader
                ], // when we import css file it will import both style and css loader.
                // css-loader: read content of css file and return this contents
                // style-loader: take css and inject in to page using style text. Bundle css in to bundle.js file.
                // Assets doesnt need to import but loader need to import and install using npm
                // npm install css-loader style-loader --save-dev 
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', 'css-loader', 'sass-loader'  // Webpack look right to left
                ] // first invoke sass-loader then css-loader and last style-loader
                // sass-loader: convert sass to css, css-loader: convert in to js, style-loader: create style in html page and put css in it.
                // npm install sass-loader node-sass --save-dev
            }, // node-sass convert sass to css speedy.
            {
                test: /\.js$/,  // check all js file accept node_modules
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', 
                    options: {  // we can set this option for any loaders
                        presets: ['@babel/env'],  // env compile es6,7,8,9 all versions
                        plugins: ['@babel/plugin-proposal-class-properties'] // support latest es6 feature for browser
                        // can use as many as plugin as we want
                        // babel convert latest js code to older js code
                        // npm install @babel/core babel-loader @babel/preset-env @babel/plugin-proposal-class-properties --save-dev
                    }, 
                }
            }
        ],
    },
}

