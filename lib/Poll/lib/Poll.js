var MAX_INACTIVE = 10000;


function Poll(o){

  this.id = process.POLL_COUNT;
  process.POLL_COUNT += 1;

  this.createdAt = new Date().getTime();

  this.lastUse = this.createdAt;

  o = o || {};

  var data;
  if(typeof o.data === 'object') data = o.data;
  else data = JSON.parse(o.data);

  for(var key in data)
    this[key] = data[key];

  this.startPinger();

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

Poll.prototype.getPublicData = function (){

  return {
    id: this.id,
    title: this.title,
    createdAt: this.createdAt,
    options: this.options,
    multi: this.multi
  }

};





module.exports = Poll;