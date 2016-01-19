/** Require */
var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var cors = require('cors');

/** Application */
var app = express();
app.use(bodyParser.json());

/** MongoDB */
var mongodb = mongojs('', []);

/** Ene Points */
app.get('api/', function () {});
app.post('api/', function () {});
app.put('api//:id', function () {});
app.delete('api//:id', function () {});

/** Port */
var nodePort = 3000;
app.listen(nodePort, function () {
    console.log('Listening on ' + nodePort);
});
/* mongodb.org/manual/reference/operator... */