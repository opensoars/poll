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

  });

  describe('#active pinger', function (){

    it('should have set timeout to the default 60000 when no timeout.config argument is given', function (){
      var poll = new Poll({ options: ['a', 'b'] });
      assert.equal(poll.timeout, 60000);
    });

    it('should have set timeout to 100 when we pass the config.timeout argument', function (done){
      var poll = new Poll({
        config: {timeout: 100},
        data: JSON.stringify({options: ['a', 'b']})
      });
      assert.equal(poll.timeout, 100);
    });

  });

});