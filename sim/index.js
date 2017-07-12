var _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies

// CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//login
app.post('/authenticate', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var body = req.body;
  console.log(body);
  if(body.username.toLowerCase() === 'admin' && body.password.toLowerCase() === 'password') {
    var authResponse = require('./data/auth');
    console.log (' auth resp =' + authResponse);
    setTimeout(function(){
      res.send(JSON.stringify(authResponse));
    }, 1200);
  } else {
    setTimeout(function(){
      res.status(404).send(JSON.stringify({
        error: 'auth failure'
      }));
    }, 800);
  }
});

//logout
app.delete('/authenticate', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  setTimeout(function(){
    res.send(JSON.stringify({}));
  }, 500);
});

var profile = null;

app.get('/profile', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  // NOTE: read the authToken from the authorization header.  The real API can look up the user id associated
  // with the session.
  // var authToken = req.headers['authorization'];

  if (!profile) {
    profile = require('./data/getProfile');
  }

  setTimeout(function(){
    res.send(JSON.stringify(profile));
  }, 500);

});

// update profile
app.post('/profile', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var body = req.body;

  // NOTE: read the authToken from the authorization header.  The real API can look up the user id associated
  // with the session.
  // var authToken = req.headers['authorization'];

  profile = body;

  // entering "fail" for the name field will trigger a failure scenario for testing the UI
  if (profile.name.indexOf("fail") > -1) {
    setTimeout(function(){
      res.status(400).send(JSON.stringify({}));
    }, 500);
  } else {
    setTimeout(function(){
      res.send(JSON.stringify(profile));
    }, 500);
  }
});

var querybuilder = null;

app.get('/querybuilder', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  // NOTE: read the authToken from the authorization header.  The real API can look up the user id associated
  // with the session.
  // var authToken = req.headers['authorization'];

  if (!querybuilder) {
    querybuilder = require('./data/documents');
  }

  // add a random profile pic link
  //newsfeed = newsfeed.map(function(item) {
  //  item.pic = 'http://lorempixel.com/50/50/people/?ts=' + Math.random().toString(36).substring(7);
  //  return item;
  //});

  setTimeout(function(){
    res.send(JSON.stringify(querybuilder.slice().reverse()));
  }, 500);

});

// add a document
app.post('/querybuilder', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  var body = req.body;

  if (!querybuilder) {
    querybuilder = require('./data/documents');
  }

  // NOTE: read the authToken from the authorization header.  The real API can look up the user id associated
  // with the session.
  // var authToken = req.headers['authorization'];

  if (!profile) {
    profile = require('./data/getProfile');
  }
  var name = profile.name;
  var post = {
    "name": name,
    "user_id": 12345,
    "body": body.body,
    "date": "1 minute ago"
  };

  querybuilder.push(post);

  setTimeout(function(){
    res.send(JSON.stringify({ 'status': 'success'}));
  }, 500);
});

var server = app.listen(3111, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Simulator listening at http://%s:%s', host, port);
});