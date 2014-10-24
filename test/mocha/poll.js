var assert = require('assert');

describe('Poll', function (){
 var Poll = require('./../../lib/Poll');

  describe('#new Poll()', function (){

    it('should throw "No `o` (options) param found" when we given no `o` argument', function (){
      try{ var poll = new Poll(); }
      catch(e){ assert.equal(e, 'No `o` (options) param found'); }
    });

    it('should throw "No o.options found" when we do not give o.data', function (){
      try{ var poll = new Poll({}); }
      catch(e){ assert.equal(e, 'No o.options found'); }
    });


    it('o.ip should default to false', function (){
      var poll = new Poll({ options: ['a', 'b'] });
      assert.equal(poll.ip, false);
    });

    it('o.data.multi should default to false', function (){
      var poll = new Poll({ options: ['a', 'b'] });
      assert.equal(poll.multi, false);
    });


    it('should set o.data.ip to true when it passed', function (){
      var poll = new Poll({ options: ['a', 'b'], ip: true });
      assert.equal(poll.ip, true);
    });

    it('should set o.data.multi to true when it passed', function (){
      var poll = new Poll({ options: ['a', 'b'], multi: true });
      assert.equal(poll.multi, true);
    });


    it('should parse a JSON string to native JS', function (){
      var poll = new Poll( JSON.stringify({options: ['a', 'b']}) );
    });

    it('should have set timeout to the default 60000 when no config argument is given', function (){
      var poll = new Poll({ options: ['a', 'b'] });
      assert.equal(poll.timeout, 600000);
    });

    it('should have set timeout to 100 when we pass the timeout argument as 100', function (){
      var poll = new Poll({ timeout: 100, options: ['a', 'b'] });
      assert.equal(poll.timeout, 100);
    });

  });

  describe('#active pinger', function (){
    it('should call ping checkActive(), checked by the remove call', function (done){
      var poll = new Poll({ timeout: 100, options: ['a', 'b'] });
      setTimeout(function (){ done(); }, 1100);
    });
  });

  describe('#isUsed', function (){
    it('should set a new date when we call it', function (done){
      var poll = new Poll({ options: ['a', 'b'] });
      done();
    });
  });

  describe('#getPublicData', function (){
    it('should return: id, title, createdAt, options and multi', function (){
      var poll = new Poll({  options: ['a', 'b'] });
      var publicData = poll.getPublicData();

      var keyCount = 0;
      for(var key in publicData) keyCount += 1;
      
      assert.equal(keyCount, 5);

    });
  });


  describe('#getVotes', function (){
    it('should return 0 votes for `a` and `b`', function (){
      var poll = new Poll({  options: ['a', 'b'] });
      var votes = poll.getVotes();

      assert.equal(votes[0], 0);
      assert.equal(votes[1], 0);
    });
  });

});