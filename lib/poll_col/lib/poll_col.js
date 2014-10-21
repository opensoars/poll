module.exports = {

  polls: {}, 

  add: function (poll){

    this.polls[poll.id] = poll;

    console.log(this.polls);

  },

  getAll: function (){
    return this.polls;
  },

  getById: function (id){

    return(this.polls[id])

  }


}