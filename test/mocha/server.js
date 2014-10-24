var assert = require('assert');

var http = require('http');

describe('server', function (){

  var server = require('./../../server.js');

  describe('#status', function (){
    it('Should return status: succes', function (){
      assert.equal(server.status, 'succes');
    });
  });

  describe('#port', function (){
    it('should return port 80', function (){
      assert.equal(server.port, 80);
    });
  });

  describe('#body parser middleware', function (){
    it('should use the body parser middleware function (GET)', function (done){

      http.get('http://localhost:80', function (res){
        done();
      }).on('error', function (e){
        throw 'GET request failed!';
      });

    });

    it('should use the body parser middleware function (POST)', function (done){

      var o = { hostname: 'localhost', port: 80, method: 'POST' };

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

