/** REQUIRE*/
var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var cors = require('cors');
var objectId = require('mongodb').objectId;

/** How to invoke the express() by calling upon 'app'*/
var app = express();
app.use(bodyParser.json());

/** How to connect to the Mongo Database, passing through 'birds' and 'sightings'*/
var db = mongojs('birds', ['sightings']);

/** GET // requesting information*/
app.get('/api/sighting', function (req, res, next) {
    db.sightings.find({}, function (err, result) {
        res.send(result);
    });
});

/** POST // adding information*/
app.post('/api/sighting', function (req, res, next) {
    var dataToInsert = req.body;
    db.sightings.insert(dataToInsert, function (err, result) {
        if (err) {
            res.status(500).end();
        }
        res.send(result);
    });
});

/** PUT // updating information*/
app.put('/api/sighting/:id', function (req, res, next) {
    var idToModify = objectId(req.params.id);
    var updateObject = {
        query: { _id: idToModify },
        // update: { $set: { req.body } },
        update: req.body,
        new: false
    }
    db.sightings.findAndModify(updateObject, function (err, result) {
        res.send(result);
    });
});

/** DELETE // eliminating information*/
app.delete('/api/sighting/:id', function (req, res, next) {
    var idToDelete = objectId(req.params.id);
    db.sightings.remove({ _id: idToDelete }, function (err, result) {
        if (err || result.n === 0) {
            res.status(500).send('Failed to delete');
        }
        res.send('Successfully deleted record');
    })
});

/** PORT*/
var nodePort = 3000;
app.listen(nodePort, function () {
    console.log('Listening on port ' + nodePort);
});

/* mongodb.org/manual/reference/operator... */