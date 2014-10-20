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
  log(req.method + ' ' + req.url); return next();
});

app.use(express.static(__dirname + '/public'));


/**
 * Request listeners
 */


app.get('/poll', function (req, res){

  res.end('/poll');

});


app.post('/poll', function (req, res){

  var d = ''; req.on('data', function (c){ d += c; });
  req.on('end', function (){
    console.log(d);
  });

  console.log('poll post');


  // LETS CREATE A POLL HERE


  res.json({
    status: 'succes',
    url: 'testurl'
  });

});

app.listen(80);