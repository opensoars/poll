/**
 * POST /polls
 * Creates a new poll
 */

var Ezlog = require('ezlog'),
    log = new Ezlog({ p: {t: '[post_polls]', c: 'green'} });


var Poll = require(process.DIR + '/lib/Poll');


module.exports = function post_polls(req, res){

  // Check if we're actualy creating a legit poll HERE...


  var poll = new Poll({
    data: req.body
  });

  process.POLL_COL.add(poll);


  poll.startPinger();


  var poll_id = 123;
  res.json({
    status: 'succes',
    url: '/poll/' + poll_id
  });

};