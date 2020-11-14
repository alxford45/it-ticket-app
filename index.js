var express = require('express');
const {Client} = require('pg');

var port = process.env.PORT;
if(port === undefined) {
    port = 5000;
}
/*
const client = new Client({
    connectionString: process.env.DATABSE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();
*/

var app = express();

app.use(express.static(__dirname + "/build"));

app.get('/*', function (req,res) {
    res.sendFile(__dirname + "/build/index.html");
});

console.log(`Listening on ${port}`);
app.listen(port);