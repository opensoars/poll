module.exports = {

  polls: {}, 

  add: function (poll){

    this.polls[poll.id] = poll;

    console.log(this.polls);

  },

  get: function (){



  }


}