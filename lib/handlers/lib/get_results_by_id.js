module.exports = function (req, res){

  var id = req.params.id;


  var poll = process.POLL_COL.getById(req.params.id);

  if(!poll){
    return res.status(404).json({
      status: 'failed',
      desc: 'Could not find poll: ' + req.params.id
    });
  }


  res.json(poll.getVotes());

}