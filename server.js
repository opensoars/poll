/**
 * Globals
 */

// Find out what enviroment to run
var ARGV = process.argv,
    ENV = ARGV[2] || undefined;

var PORT = 80;


/**
 * Dependencies
 */

// Native modules
var http = require('http'),
    fs = require('fs');

// Get and init express
var express = require('express'),
    app = express();

// Pretty logging
var Ezlog = require('ezlog'),
    log = new Ezlog({ p: {t: '[server]', c: 'green'} });

// Request handlers
var handlers = require('./lib/handlers');


/**
 * Midleware
 */

// Log requests if ENV === dev
if(ENV === 'dev') app.use(function (req, res, next){
  log(req.method + ' ' + req.url); return next();
});

app.use(express.static(__dirname + '/public'));


/**
 * Request handlers
 */

// Serves an existing poll
app.get('/poll/:id', handlers.get_poll);

// Creates new poll
app.post('/poll', handlers.post_poll);




app.listen(PORT);
log('Listening at port: ' + PORT);