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

// Serves list of polls
app.get('/polls', handlers.get_polls)

// Serves an existing poll
app.get('/polls/:id', handlers.get_polls_by_id);

// Creates new poll
app.post('/polls', handlers.post_polls);


// Start listening
app.listen(PORT);
log('Listening at port: ' + PORT);