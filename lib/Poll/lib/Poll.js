var pollCount = 0;


function Poll(o){

  this.pollCount = pollCount;
  pollCount += 1;

  this.createdAt = new Date().getTime();

  this.lastUse = this.createdAt;

  o = o || {};


  var data = JSON.parse(o.data);

  for(var key in data)
    this[key] = data[key];
  

  return this;


}

Poll.prototype.startPinger = function (){

  setInterval(checkActive, 100);


};

Poll.prototype.checkActive = function (){

};





module.exports = Poll;