/**
 * GET /polls
 * Serves a list of polls
 */

module.exports = function get_polls(req, res){

  var response = [];

  var polls = process.POLL_COL.getAll();

  var poll;
  for(var id in polls){
    poll = polls[id];

    response.push({
      id: id,
      title: poll.title,
      createdAt: poll.createdAt,
      options: poll.options,
      multi: poll.multi
    });
  }

  res.json(response);

};