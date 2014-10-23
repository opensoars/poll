module.exports = function post_vote_by_id(req, res){

  var id = req.params.id,
      poll = process.POLL_COL.getById(id);

  if(!poll) return res.status(404).json({
    status: 'failed',
    desc: 'The poll you wanted to vote for does not exist.'
  });


  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

  console.log(ip);

  // If the poll doesnt allows multi votes from 1 IP
  // we check if there is already a vote from that  IP
  if(poll.ip !== true){

    if(poll.ips.indexOf(ip) !== -1) return res.json({
      status: 'failed',
      desc: 'You can only vote once for this poll'
    });
    
    poll.ips.push(ip);

  }

  var votes = JSON.parse(req.body);

  for(var i=0; i<votes.length; i+=1) poll.votes[votes[i]] += 1;

  poll.isUsed();

  res.json({ status: 'succes' });
};