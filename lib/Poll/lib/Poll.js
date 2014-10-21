var POLL_COUNT = 0,
    MAX_INACTIVE = 10000;


function Poll(o){

  this.id = POLL_COUNT;
  POLL_COUNT += 1;

  this.createdAt = new Date().getTime();

  this.lastUse = this.createdAt;

  o = o || {};


  var data = JSON.parse(o.data);

  this.publicData = {};

  for(var key in data)
    this[key] = data[key];

}

Poll.prototype.startPinger = function (){
  var self = this;
  this.checkInterval = setInterval(function (){
    self.checkActive();
  }, 1000);
};

Poll.prototype.checkActive = function (){
  if( (new Date().getTime() - this.lastUse) > MAX_INACTIVE)
    this.remove();
};

Poll.prototype.remove = function (){

  clearInterval(this.checkInterval);

};

Poll.prototype.getData = function (){

};





module.exports = Poll;