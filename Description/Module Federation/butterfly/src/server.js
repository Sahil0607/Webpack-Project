const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.get('/', (req, res) => {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/butterfly.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
    res.send(contentFromHtmlFile);
});

// app.get('/butterfly/', (req, res) => {
//     const pathToHtmlFile = path.resolve(__dirname, '../dist/butterfly.html');
//     const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8'); 
//     res.send(contentFromHtmlFile);
// });
 
app.use('/static', express.static(path.resolve(__dirname, '../dist')));

app.listen(9002, () => {
    console.log('App is running on port http://localhost:9002');
});


// Add new script in package.json file. For running our app. "start": "node src/server.js"