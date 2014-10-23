

module.exports = function post_vote_by_id(req, res){

  var id = req.params.id,
      poll = process.POLL_COL.getById(id);


  if(!poll) return res.json({
    status: 'failed',
    desc: 'The poll you wanted to vote for does not exist.'
  });

  poll.isUsed();

  res.json({ status: 'succes' });

};