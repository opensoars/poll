module.exports = {

  polls: {}, 

  count: 0,

  add: function (poll){
    poll.id = this.count;
    this.polls[this.count] = poll;

    this.count += 1;
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