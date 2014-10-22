/**
 * GET /polls/:id
 * Serves an existing poll
 */

var Ezlog = require('ezlog'),
    log = new Ezlog({ p: {t: '[get_polls]', c: 'green'} });


module.exports = function get_polls_by_id(req, res){


  var poll = process.POLL_COL.getById(req.params.id);



  if(!poll){
    return res.status(404).json({
      status: 'failed',
      desc: 'Could not find poll: ' + req.params.id
    });
  }

  res.json({
    status: 'succes',
    id: poll.id,
    title: poll.title,
    createdAt: poll.createdAt,
    options: poll.options,
    multi: poll.multi,
    pollCount: poll.pollCount
  });

};