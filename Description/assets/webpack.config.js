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
            {  // resource asset type
                // If we have multiple rule, it will checkone by one
                // test: /\.(png|jpg)$/,  // check if file name contain either jpg or png
                // type: 'asset/resource',  
              // Everytime import jpg file it will check rule. If not find then give an error.
               // We can import js and json file without rule. Webpack already know about it. 
               // 'asset/resourse' will copy file to output directory
            },
            {   // inline asset type
                // test: /\.(png|jpg)$/,
                // type: 'asset/inline',
                // asset/inline will make base 64 string represnetation file. So it will not generate image file.
                // We can use it for small image like svg. Not use for big file otherwise make bundle size bigger.
            },
            {  // general asset type
                test: /\.(png|jpg)$/,
                type: 'asset',  // if we not define anything after asset it will be generat automatically.
                parser: {  // use to set size rule
                    dataUrlCondition: {  // decide webpack if resource or inline will use
                        maxSize: 3 * 1024, // < 3kb is inline, > 3kb is resource
                    }
                }
                // if asset >8kb it will consider resource asset type and < 8kb it'll inline asset type
                // we can also set size and 8kb is by default.
            },
            {  // source asset type
                test: /\.txt/,  // listen text content from text file and treat as asset source
                type: 'asset/source'  // take txt file and convert string representation
            }  // test in chrome inspect
        ],
    },
}

