/**
 * GET /polls/:id
 * Serves an existing poll
 */

var Ezlog = require('ezlog'),
    log = new Ezlog({ p: {t: '[get_polls]', c: 'green'} });


module.exports = function get_polls_by_id(req, res){

  console.log(req.params);

  res.end(req.params.id);

};