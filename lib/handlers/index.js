/**
 * Exports all listeners from ./lib folder.
 *
 * Simulates:
 * module.exports {
 *   get_poll: require('get_poll.js'),
 *   etc ...
 * }
 */

var files = require('fs').readdirSync(__dirname + '/lib/');

files.forEach(function (file){
  module.exports[file.replace(/.js/, '')]
    = require(__dirname + '/lib/' + file);
});
