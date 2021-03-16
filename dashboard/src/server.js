const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Need to deifine how to serve static files
app.use('/', express.static(path.resolve(__dirname, '../dist')));

// Tell express to serve this to any url
app.get('*', (req, res) => {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/dashboard.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
    res.send(contentFromHtmlFile);
});

app.listen(9000, () => {
    console.log('Application is running on htmmp://localhost:9000');
});

// npm install webpack webpack-cli webpack-dev-server mini-css-extract-plugin html-webpack-plugin clean-webpack-plugin babel-loader @babel/core @babel/preset-env --save-dev
// npm install express --save