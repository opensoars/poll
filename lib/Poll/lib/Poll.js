var MAX_INACTIVE = 10000;

/**
 * Poll class
 * Sets all poll data
 * Call the poll.startPinger method
 *
 * @param o {object}  Options
 */
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

/**
 * Starts a poll it's pinger
 * This will call 'checkActive'
 */
Poll.prototype.startPinger = function (){
  var self = this;
  this.checkInterval = setInterval(function (){
    self.checkActive();
  }, 1000);
};

/**
 * Check whether a poll is active or not
 * When a poll it inactive for MAX_INACTIVE ms it calls 'remove'
 */
Poll.prototype.checkActive = function (){
  if( (new Date().getTime() - this.lastUse) > MAX_INACTIVE)
    this.remove();
};

/**
 * Clears a polls interval
 * Removes poll data
 * Removes a poll from the POL_COL
 */
Poll.prototype.remove = function (){

  clearInterval(this.checkInterval);

};

/**
 * @return {object}  Public poll data
 */
Poll.prototype.getPublicData = function (){
  return {
    id: this.id,
    title: this.title,
    createdAt: this.createdAt,
    options: this.options,
    multi: this.multi
  };
};


module.exports = Poll;