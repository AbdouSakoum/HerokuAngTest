const express = require('express');  
const path = require('path');  
  
const ngApp = express();  
  
ngApp.use(express.static('./dist/client-app-one'));  
  
ngApp.get('/*', function (request, response) {  
    response.sendFile(path.join(__dirname, '/dist/client-app-one/index.html'));  
});  
  
ngApp.listen(process.env.PORT || 8080); 



/*const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4200;
const server = require('http').Server(app);


// Serve only the static files form the angularapp directory
app.use(express.static(__dirname + '/client-app-one'));
 
app.get('/*', function(req,res) {
 
res.sendFile(path.join(__dirname+'/client-app-one/index.html'));
});
 
// Start the app by listening on the default Heroku port


server.listen(port, function () {
    console.log("App running on port " + port);
})*/



/*//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/client-app-one'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname+'/dist/client-app-one/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);*/