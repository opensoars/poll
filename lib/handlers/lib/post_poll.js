var Ezlog = require('ezlog'),
    log = new Ezlog({ p: {t: '[post_poll]', c: 'green'} });


module.exports = function post_poll(req, res){

  var d = ''; req.on('data', function (c){ d += c; });
  req.on('end', function (){
    log(d);
  });


  // LETS CREATE A POLL HERE


  var poll_id = 123;
  res.json({
    status: 'succes',
    url: '/poll/' + poll_id
  });

};