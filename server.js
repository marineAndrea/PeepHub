var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var db = require('./DB/dbparser');
var morgan      = require('morgan');
var bodyParser  = require('body-parser');

var portNum = process.env.PORT || 8000;

// Start Express server
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

// Request handlers
app.use(express.static(__dirname + '/client'));

app.get('/api/user/:UID', function(req, res){
  // receive uid
  // return user object
  var UID = req.params.UID;
  // console.log('------------->>>>>>',db.getUID);
  db.getUID(UID, function(userData){
    // console.log("26", userData);
    res.end(JSON.stringify(userData));
  });
});

app.get('/api/users', function(req, res){
  //receives get request
  //returns lal users
  db.getUsers(function(users){
    res.end(JSON.stringify(users));
  });
});

app.post('/api/user', function(req, res) {
  // receive user object
  // add it to database
  // respond with 304 - TODO: redirect here or client-side? 
  var userObj = req.body;
  // console.log("============================>", req.body);
  db.addUser(userObj, function(){
    res.end();
  });
});

app.get('/api/requests/:UID', function(req, res){
  // receive UID
  // return events under UID
  var UID = req.params.UID;
  // console.log(req.params.UID);
  db.getUIDRequests(UID, function(requestsData){
    // console.log("49", requestsData);
    res.end(JSON.stringify(requestsData));
  });
});

app.get('/api/requests', function(req, res){
  // right now get all requests TODO filter requests
  // return object of requests
  db.getRequests(function(requests){
    console.log('-------------------------------------> req ',requests);
    res.end(JSON.stringify(requests));
  });
});

app.post('/api/toggle', function(req, res) {
  db.toggleRequest(req.body, function() {
    res.end('', 200);
  });
});

app.post('/api/request', function(req, res){
  // console.log('-------------> ', req.body);
  var reqObj = req.body;
  db.addRequest(reqObj, function(){
    res.end(200);
  });
});

app.get('/api/events/:UID', function(req, res){
  // receive UID
  // return events under UID
  var UID = req.params.UID;
  // console.log(req.params.UID);
  db.getUIDEvents(UID, function(eventsData){
    // console.log("79", eventsData);
    res.end(JSON.stringify(eventsData));
  });
});

app.get('/api/event', function(req, res){
  // return all events as an object
  db.getEvents(function(events){
    res.end(JSON.stringify(events));
  });
});

app.post('/api/event', function(req, res){
  // Receives event obj
  // attempts to post it
  // returns if success
  var eventObj = req.body;
  db.addEvent(eventObj, function(){
    res.end(200);
  });
});



// Set app to listen
app.listen(portNum);

// Export app
module.exports = app;