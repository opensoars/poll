module.exports = {

  polls: {}, 

  add: function (poll){
    this.polls[poll.id] = poll;
  },

  remove: function (id){
    delete this.polls[id];
  },

  getAll: function (){
    return this.polls;
  },

  getById: function (id){
    return(this.polls[id]);
  }

};