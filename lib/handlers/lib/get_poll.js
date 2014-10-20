var Ezlog = require('ezlog'),
    log = new Ezlog({ p: {t: '[get_poll]', c: 'green'} });


module.exports = function get_poll(req, res){

  console.log(req.params);

  res.end(req.params.id);

};