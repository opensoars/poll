var assert = require('assert'),
    http = require('http');

var server = require('./../../server.js');

describe('handlers', function (){

  describe('#post_polls', function (){

    it('should create a new poll', function (done){
      var o = { hostname: 'localhost', path: '/rest/polls', port: 80, method: 'POST' };

      var req = http.request(o, function (res){

        res.on('data', function (){

          http.get('http://localhost/rest/polls', function (res){
            var d = ''; res.on('data', function (c){ d += c; });
            res.on('end', function (){
              var polls = JSON.parse(d);
              if(polls[0].id || polls[0].id === 0) done();
              else throw 'We did not get an id from the poll'
            });
          });

        });
      });

      req.on('error', function (){ throw 'POST request failed!'; });

      req.write(JSON.stringify({ title: 'Hello World!', options: ['a', 'b'] }));
      req.end();
    });
  });

  describe('#get_polls', function (){
    it('should return the poll we just created', function (done){
      var o = { hostname: 'localhost', path: '/rest/polls', port: 80, method: 'POST' };

      var req = http.request(o, function (res){

        res.on('data', function (){

          http.get('http://localhost/rest/polls', function (res){
            var d = ''; res.on('data', function (c){ d += c; });
            res.on('end', function (){
              var polls = JSON.parse(d);
              assert.equal(polls[0].id, 0);
              assert.equal(polls[0].title, 'Hello World!');
              assert.equal(polls[0].options[0], 'a');
              assert.equal(polls[0].options[1], 'b');
              done();
            });
          });

        });
      });

      req.on('error', function (){ throw 'POST request failed!'; });

      req.write(JSON.stringify({ title: 'Hello World!', options: ['a', 'b'] }));
      req.end();
    });
  });

  describe('#get_polls_by_id', function (){
    it('should return the poll we just created with the id of 0', function (done){
      var o = { hostname: 'localhost', path: '/rest/polls', port: 80, method: 'POST' };

      var req = http.request(o, function (res){

        res.on('data', function (){

          http.get('http://localhost/rest/polls/0', function (res){
            var d = ''; res.on('data', function (c){ d += c; });
            res.on('end', function (){
              var poll = JSON.parse(d);
              assert.equal(poll.id, 0);
              assert.equal(poll.title, 'Hello World!');
              assert.equal(poll.options[0], 'a');
              assert.equal(poll.options[1], 'b');
              done();
            });
          });

        });
      });

      req.on('error', function (){ throw 'POST request failed!'; });

      req.write(JSON.stringify({ title: 'Hello World!', options: ['a', 'b'] }));
      req.end();
    });

    it('should return a 404 when the poll was not found', function (done){
      http.get('http://localhost/rest/polls/500', function (res){
        var d = ''; res.on('data', function (c){ d += c; });
        res.on('end', function (){

          d = JSON.parse(d);

          assert.equal(d.status, 'failed')
          assert.equal(d.desc, 'Could not find poll: 500');
          assert.equal(res.statusCode, 404);

          done();

        });
      })
    })

  });


});

