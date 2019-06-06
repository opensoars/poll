
/**
 * Poll class
 * Sets all poll data
 * Call the poll.startPinger method
 *
 * @param o {object}  Options
 */
function Poll(o){

  if(typeof o === 'string') o = JSON.parse(o);

  if(!o) throw 'No `o` (options) param found';
  if(!o.options) throw 'No o.options found';

  if(!o.ip) o.ip = false;
  if(!o.multi) o.multi = false;

  if(!o.timeout) o.timeout = 600000;

  this.createdAt = new Date().getTime();
  this.lastUse = this.createdAt;

  for(var key in o)
    this[key] = o[key];

  this.votes = {};

  this.ips = [];

  for(var i=0; i<this.options.length; i+=1)
    this.votes[i] = 0;
  
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
 * When a poll it inactive for this.timeout ms it calls 'remove'
 */
Poll.prototype.checkActive = function (){
  if( (new Date().getTime() - this.lastUse) > this.timeout) this.remove();
};

/**
 * Clears a polls interval
 * Removes poll data
 * Removes a poll from the POL_COL
 */
Poll.prototype.remove = function (){

  clearInterval(this.checkInterval);

  process.POLL_COL.remove(this.id);

  for(var key in this)
    delete this[key];

  return null;
};

Poll.prototype.isUsed = function (){
  this.lastUse = new Date().getTime();
};

/**
 * Sets lastUsed to now
 * @return {object}  Public poll data
 */
Poll.prototype.getPublicData = function (){
  this.isUsed();

  return {
    id: this.id,
    title: this.title,
    createdAt: this.createdAt,
    options: this.options,
    multi: this.multi
  };
};

Poll.prototype.getVotes = function (){
  return this.votes;
};


module.exports = Poll;