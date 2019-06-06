/**
 * Globals
 */

// Find out what enviroment to run
var ARGV = process.argv,
    ENV = ARGV[2];

var PORT = 8888;


process.DIR = __dirname;


process.POLL_COL = require('./src/poll_col');
process.POLL_TIMEOUT = 800000;


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
var cls = require('opensoars_cls');

var Ezlog = require('ezlog'),
    log = new Ezlog({ p: {t: '[server]', c: 'green'} });

// Request handlers
var handlers = require('./src/handlers'),
    Poll = require('./src/Poll');


/**
 * Midleware stack
 */

// Body parser, will be more secure later on
app.use(function (req, res, next){
  var body = '';
  req.on('data', function (c){ body += c; });
  req.on('end', function (){ req.body = body; next(); });
});

app.use(express.static(__dirname + '/public'));


// Log requests if ENV === dev
app.use(function (req, res, next){
  log( cls(req.method, 'magenta') + ' ' + req.url); return next();
});


process.POLL_COL.add( new Poll({ 
  title: 'Sample poll, multi', options: ['I like it', 'I love it'],
  multi: true, ip: true
}) );

process.POLL_COL.add( new Poll({ 
  title: 'Sample poll, single', options: ['I like it', 'I love it'],
  multi: false, ip: true
}) );

process.POLL_COL.add( new Poll({ 
  title: 'Sample poll, ip: false', options: ['I like it', 'I love it'],
  multi: false, ip: false
}) );

process.POLL_COL.add( new Poll({ 
  title: 'Sample poll, percentages', options: 'abcdef'.split(''),
  multi: false, ip: true
}) );



/**
 * Request handlers
 */

// Serves list of polls
app.get('/api/polls', handlers.get_polls)

// Serves an existing poll
app.get('/api/polls/:id', handlers.get_polls_by_id);

// Creates new poll
app.post('/api/polls', handlers.post_polls);

// Gets poll vote results
app.get('/api/votes/:id', handlers.get_vote_by_id);

// Votes for a poll by id
app.post('/api/votes/:id', handlers.post_vote_by_id);


// Start listening
app.listen(PORT);
log('Listening at port: ' + PORT);

module.exports = {
  status: 'succes',
  port: PORT,
  hostname: 'localhost',
  listeningAt: 'http://localhost:' + PORT
};