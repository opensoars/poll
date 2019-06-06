/**
 * Exports all listeners from ./src folder.
 *
 * Simulates:
 * module.exports {
 *   get_poll: require('get_poll.js'),
 *   etc ...
 * }
 */

var files = require('fs').readdirSync(__dirname + '/src/');

files.forEach(function (file){
  module.exports[file.replace(/.js/, '')]
    = require(__dirname + '/src/' + file);
});
