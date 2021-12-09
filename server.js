//Install express server
const express = require('express');
const path = require('path');

const app = express();

// serve only the static files from the dist directory
app.use(express.static('./dist/client-app-one'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/angular-heroku/'}),
);

app.listen(process.env.PORT || 8080);