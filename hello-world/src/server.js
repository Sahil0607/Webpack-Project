const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// Use '/' Instead '/hello-world/' for root app
app.get('/', (req, res) => {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/hello-world.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8'); 
    res.send(contentFromHtmlFile);
});

// Not needed
// app.get('/butterfly/', (req, res) => {
//     const pathToHtmlFile = path.resolve(__dirname, '../dist/butterfly.html');
//     const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8'); 
//     res.send(contentFromHtmlFile);
// });
 
app.use('/', express.static(path.resolve(__dirname, '../dist')));

// Instead 3000. Used for hello-world app. And 9002 for second app.
app.listen(9001, () => {
    console.log('App is running on port http://localhost:9001');
});
