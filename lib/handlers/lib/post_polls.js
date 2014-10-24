/**
 * POST /polls
 * Creates a new poll
 */

var Poll = require(process.DIR + '/lib/Poll');


module.exports = function post_polls(req, res){

  // Check if we're actualy creating a legit poll HERE...

  var poll = new Poll(
    req.body
  );

  process.POLL_COL.add(poll);

  res.json({
    status: 'succes',
    id: poll.id
  });

};