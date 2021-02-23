const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.get('/hello-world/', (req, res) => {
    // res.send('Some dummy content');
    // We will serve html file instead dummy content. Use absolute path.
    const pathToHtmlFile = path.resolve(__dirname, '../dist/hello-world.html');
    // read file content synchronsly. Return file contnt as js string.
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8'); // content of file will stored in unicode(htf-8).
    res.send(contentFromHtmlFile);
});

app.get('/butterfly/', (req, res) => {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/butterfly.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8'); 
    res.send(contentFromHtmlFile);
});

// Handleing static file such as js and css. It will send static file when it's needed.
// /static path we dont need to change manually but need to change in webpack prod file.
// publicPath: '/static/', in output. So it will generate /ststic file in dist. Check in .html file. 
app.use('/static', express.static(path.resolve(__dirname, '../dist')));

app.listen(3000, () => {
    console.log('App is running on port http://localhost:3000');
});


// Add new script in package.json file. For running our app. "start": "node src/server.js"