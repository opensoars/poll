/**
 * GET /polls
 * Serves a list of polls
 */

module.exports = function get_polls(req, res){

  var response = [];




/*
  process.POLL_COL.forEach(function (poll){
    response.push({
      title: poll.title,
      createdAt: poll.createdAt,
      options: poll.options,
      multi: poll.multi,
      pollCount: poll.pollCount
    });
  });
*/
  res.json(response);

};