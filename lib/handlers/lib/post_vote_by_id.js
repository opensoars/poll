

module.exports = function post_vote_by_id(req, res){

  var id = req.param.id;

  var poll = process.POLL_COL.getById(id);

  console.log(poll);


  if(!poll) return res.json({
    status: 'failed',
    desc: 'The poll you wanted to vote for does not exist.'
  });

  res.json({ status: 'succes' });


};