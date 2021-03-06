var assert = require('assert'),
    http = require('http');

var server = require('./../../server.js');

describe('handlers', function (){

  describe('#post_polls', function (){

    it('should create a new poll', function (done){
      var o = { hostname: server.hostname, path: '/api/polls', port: server.port, method: 'POST' };

      var req = http.request(o, function (res){

        res.on('data', function (){

          http.get(server.listeningAt + '/api/polls', function (res){
            var d = ''; res.on('data', function (c){ d += c; });
            res.on('end', function (){
              var polls = JSON.parse(d);
              if(polls[0].id || polls[0].id === 0) done();
              else throw 'We did not get an id from the poll'
            });
          });

        });
      });

      req.on('error', function (e){
        console.log(e);
        throw 'POST request failed!'; });

      req.write(JSON.stringify({ title: 'Hello World!', options: ['a', 'b'] }));
      req.end();
    });
  });

  describe('#get_polls', function (){
    it('should return the poll we just created', function (done){
      var o = { hostname: server.hostname, path: '/api/polls', port: server.port, method: 'POST' };

      var req = http.request(o, function (res){

        res.on('data', function (){

          http.get(server.listeningAt + '/api/polls', function (res){
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
      var o = { hostname: server.hostname, path: '/api/polls', port: server.port, method: 'POST' };

      var req = http.request(o, function (res){

        res.on('data', function (){

          http.get(server.listeningAt + '/api/polls/0', function (res){
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
      http.get(server.listeningAt + '/api/polls/500', function (res){
        var d = ''; res.on('data', function (c){ d += c; });
        res.on('end', function (){
          d = JSON.parse(d);
          assert.equal(d.status, 'failed')
          assert.equal(d.desc, 'Could not find poll: 500');
          assert.equal(res.statusCode, 404);
          done();
        });
      })
    });

  });

  describe('#get_results_by_id', function (){

    it('should get the poll votes for the poll we just created with the id of 0', function (done){
      var o = { hostname: server.hostname, path: '/api/polls', port: server.port, method: 'POST' };

      var req = http.request(o, function (res){

        res.on('data', function (){

          http.get(server.listeningAt + '/api/votes/0', function (res){
            var d = ''; res.on('data', function (c){ d += c; });
            res.on('end', function (){
              votes = JSON.parse(d);

              assert.equal(votes[0], 0);
              assert.equal(votes[1], 0);
              done();
            });
          });

        });
      });

      req.on('error', function (){ throw 'POST request failed!'; });

      req.write(JSON.stringify({ title: 'Hello World!', options: ['a', 'b'] }));
      req.end();
    });

    it('should return a 404 when the poll is not found', function (done){

      http.get(server.listeningAt + '/api/votes/500', function (res){
        var d = ''; res.on('data', function (c){ d += c; });
        res.on('end', function (){
          d = JSON.parse(d);

          assert.equal(d.status, 'failed');
          assert.equal(d.desc, 'Could not find poll: 500');
          done();
        });
      });
    });

  });

  describe('#post_vote_by_id', function (){

    it('should increment the votes for options 1 (not 0) to 1', function (done){
      var o = { hostname: server.hostname, path: '/api/votes/0', port: server.port, method: 'POST' };

      var req = http.request(o, function (res){
        var d = ''; res.on('data', function (c){ d += c; });
        res.on('end', function (){
          d = JSON.parse(d);
          assert.equal(d.status, 'succes');

          http.get(server.listeningAt + '/api/votes/0', function (res){
            var d = ''; res.on('data', function (c){ d += c; });
            res.on('end', function (){
              votes = JSON.parse(d);
              assert.equal(votes[0], 0);
              assert.equal(votes[1], 1);
              done();
            });
          });

        });
      });

      req.on('error', function (){ throw 'POST request failed!'; });

      req.write(JSON.stringify([1]));
      req.end();
    });


    it('should allow multiple votes when we set ip:true', function (done){
      var o = { hostname: server.hostname, path: '/api/polls', port: server.port, method: 'POST' };

      var req = http.request(o, function (res){
        var d = ''; res.on('data', function (c){ d += c; });

        res.on('end', function (){
          d = JSON.parse(d);

          var id = d.id;

          var o = { hostname: server.hostname, path: '/api/votes/' + id, port: server.port, method: 'POST' };

          var req = http.request(o, function (res){
            var d = ''; res.on('data', function (c){ d += c; });
            res.on('end', function (){
              d = JSON.parse(d);

              var o = { hostname: server.hostname, path: '/api/votes/' + id, port: server.port, method: 'POST' };

              var req = http.request(o, function (res){
                var d = ''; res.on('data', function (c){ d += c; });
                res.on('end', function (){
                  d = JSON.parse(d);
                  assert.equal(d.status, 'succes');

                  http.get(server.listeningAt + '/api/votes/' + id, function (res){
                    var d = ''; res.on('data', function (c){ d += c; });
                    res.on('end', function (){
                      var votes = JSON.parse(d);
                      assert.equal(votes[1], 2);
                      done();
                    });
                  });

                });
              });

              req.on('error', function (){ throw 'POST request failed!'; });

              req.write(JSON.stringify([1]));
              req.end();


            });
          });

          req.on('error', function (){ throw 'POST request failed!'; });

          req.write(JSON.stringify([1]));
          req.end();



        });
      });

      req.on('error', function (){ throw 'POST request failed!'; });

      req.write(JSON.stringify({ ip: true, title: 'Hello World!', options: ['a', 'b'] }));
      req.end();
    });

    it('should return a 403 when we do not allow multiple votes from the same ip', function (done){
      var o = { hostname: server.hostname, path: '/api/polls', port: server.port, method: 'POST' };

      var req = http.request(o, function (res){
        var d = ''; res.on('data', function (c){ d += c; });

        res.on('end', function (){
          d = JSON.parse(d);

          var id = d.id;

          var o = { hostname: server.hostname, path: '/api/votes/' + id, port: server.port, method: 'POST' };

          var req = http.request(o, function (res){
            var d = ''; res.on('data', function (c){ d += c; });
            res.on('end', function (){
              d = JSON.parse(d);

              var o = { hostname: server.hostname, path: '/api/votes/' + id, port: server.port, method: 'POST' };

              var req = http.request(o, function (res){
                var d = ''; res.on('data', function (c){ d += c; });
                res.on('end', function (){
                  d = JSON.parse(d);

                  assert.equal(d.status, 'failed');
                  assert.equal(d.desc, 'You can only vote once for this poll.');
                  assert.equal(res.statusCode, 403);

                  done();
                });
              });

              req.on('error', function (){ throw 'POST request failed!'; });

              req.write(JSON.stringify([1]));
              req.end();


            });
          });

          req.on('error', function (){ throw 'POST request failed!'; });

          req.write(JSON.stringify([1]));
          req.end();



        });
      });

      req.on('error', function (){ throw 'POST request failed!'; });

      req.write(JSON.stringify({ ip: false, title: 'Hello World!', options: ['a', 'b'] }));
      req.end();
    });

    it('should return a 404 when the poll is not found', function (done){
      var o = { hostname: server.hostname, path: '/api/votes/500', port: server.port, method: 'POST' };

      var req = http.request(o, function (res){
        var d = ''; res.on('data', function (c){ d += c; });
        res.on('end', function (){
          d = JSON.parse(d);
          assert.equal(d.status, 'failed');
          assert.equal(d.desc, 'The poll you wanted to vote for does not exist.');
          assert.equal(res.statusCode, 404);
          done();
        });
      });

      req.on('error', function (){ throw 'POST request failed!'; });

      req.write(JSON.stringify([1]));
      req.end();
    });

  });


});

