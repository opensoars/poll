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
      catch(e){ assert.equal(e, 'No o.data found'); }
    });


    it('o.data.ip should default to false', function (){
      var poll = new Poll({ data: {options: ['a', 'b']} });
      assert.equal(poll.ip, false);
    });

    it('o.data.multi should default to false', function (){
      var poll = new Poll({ data: {options: ['a', 'b']} });
      assert.equal(poll.multi, false);
    });


    it('should set o.data.ip to true when it passed', function (){
      var poll = new Poll({ data: {options: ['a', 'b'], ip: true} });
      assert.equal(poll.ip, true);
    });

    it('should set o.data.multi to true when it passed', function (){
      var poll = new Poll({ data: {options: ['a', 'b'], multi: true} });
      assert.equal(poll.multi, true);
    });


    it('should parse a JSON string to native JS', function (){
      var poll = new Poll({ data: JSON.stringify({options: ['a', 'b']}) });
    });

  });

  describe('#active pinger', function (){
    it('should ping checkActive', function (done){
      var poll = new Poll({ timeout: 100, data: JSON.stringify({options: ['a', 'b']}) });

      setTimeout(function (){ done(); }, 1100);
    });
  });

});