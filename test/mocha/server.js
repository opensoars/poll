var assert = require('assert');

var http = require('http');

var server = require('./../../server.js');


setTimeout(function (){

describe('server', function (){

  describe('#returns', function (){

    it('Should return status: succes', function (){
      assert.equal(server.status, 'succes');
    });

    it('should return a port number', function (){
      assert.equal(typeof server.port, 'number');
    });

    it('should return a listeningAt string', function (){
      assert.equal(typeof server.listeningAt, 'string');
    });

    it('should return a hostname string', function (){
      assert.equal(typeof server.hostname, 'string');
    });

  });

  describe('#body parser middleware', function (){
    it('should use the body parser middleware function (GET)', function (done){

      http.get(server.listeningAt, function (res){
        done();
      }).on('error', function (e){
        throw 'GET request failed!';
      });

    });

    it('should use the body parser middleware function (POST)', function (done){

      var o = { hostname: server.hostname, port: server.port, method: 'POST' };

      var req = http.request(o, function (res){
        var isDone = false;
        res.on('data', function (){
          if(!isDone) done();
          isDone = true;
        });
      });

      req.on('error', function (){ throw 'POST request failed!'; });

      req.write('data\n');
      req.end();

    });

  });

});

}, 1000);