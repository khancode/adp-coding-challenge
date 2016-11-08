/**
 * Created by khancode on 11/2/2016.
 */

const express = require('express');
const bodyParser = require('body-parser');
var app = express();
var server = require('http').Server(app);
const db = require('./config/db');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

require('./api/router')(app);

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/client/index.html')
});

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(200);
});

server.listen(port);