// REQUIRE //
var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var cors = require('cors');

// APP Express //
var app = express();
app.use(bodyParser.json());

// CONTROLLERS //


// Run MongoD //
var db = mongojs('birds', ['sightings']);

// OPERATIONS //
app.post('/api/sighting', function (req, res, next) {
    var dataToInsert = req.body;
    db.sightings.insert(dataToInsert, function (err, result) {
        if (err) {
            res.status(500).end();
        }
        res.send(result);
    });
});
app.get('/api/sighting', function (req, res, next) {
    console.log('get hit');
    res.end();
});
app.delete('/api/sighting', function (req, res, next) {
    console.log('put hit');
    res.end();
});
app.put('/api/sighting', function (req, res, next) {
    console.log('put hit');
    res.end();
});

// PORT //
var nodePort = 3000;
app.listen(nodePort, function () {
    console.log('Listening on port ' + nodePort);
});