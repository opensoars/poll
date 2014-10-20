// Find out what enviroment to run
var ARGV = process.argv,
    ENV = ARGV[2] || undefined;

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


/**
 * Midleware
 */

// Log requests if ENV === dev
if(ENV === 'dev') app.use(function (req, res, next){
  log(req.method + ' ' + req.url);
  next();
});

app.use(express.static(__dirname + '/public'));


app.listen(80);