var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

// Get Heroku ipAddress
var ipAddr = req.headers["x-forwarded-for"];
if (ipAddr){
    var list = ipAddr.split(",");
    ipAddr = list[list.length-1];
} else {
    ipAddr = req.connection.remoteAddress;
}

app.set('ipaddress', (process.env.ipAddr));
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), app.get('ipaddress'));

