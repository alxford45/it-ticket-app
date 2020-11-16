var express = require('express');
const {Client} = require('pg');

var port = process.env.PORT;
if(port === undefined) {
    port = 5000;
}
var options = process.env.DATABSE_URL;
var client = undefined;
if(options !== undefined) {
    client = new Client({
        connectionString: options,
        ssl: {
            rejectUnauthorized: false
        }
    });
}
else {
    client = new Client({
        user: 'brvuirrqqcjzsb',
        host: 'ec2-54-158-190-214.compute-1.amazonaws.com',
        database: 'd3t7i9dt3u6h4g',
        password: '37f36b1e7cb6167c12f84c9e356c14535824e0a6c7e0dfe5fb71417f2be8d5b8',
        port: '5432',
        ssl: {
            rejectUnauthorized:false
        }
    });
}

client.connect();


var app = express();

app.use(express.static(__dirname + "/client/build"));

app.get('/*', function (req,res) {
    res.sendFile(__dirname + "/client/build/index.html");
});

console.log(`Listening on ${port}`);
app.listen(port);