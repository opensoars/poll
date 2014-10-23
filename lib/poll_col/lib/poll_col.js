var Ezlog = require(process.DIR + '/node_modules/Ezlog'),
    log = new Ezlog({ p: {t: '[poll_coll]', c: 'yellow'} });

module.exports = {

  polls: {}, 

  add: function (poll){
    log('add: ' + poll.title);
    this.polls[poll.id] = poll;
  },

  remove: function (id){
    log('Deleting poll: ' + id);
    delete this.polls[id];
  },

  getAll: function (){
    log('getAll');
    return this.polls;
  },

  getById: function (id){
    log('getById: ' + id);
    return(this.polls[id]);
  }

}