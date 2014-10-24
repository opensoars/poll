var Ezlog = require(process.DIR + '/node_modules/Ezlog'),
    log = new Ezlog({ p: {t: '[Poll]', c: 'yellow'} });


var MAX_INACTIVE = process.POLL_TIMEOUT;


/**
 * Poll class
 * Sets all poll data
 * Call the poll.startPinger method
 *
 * @param o {object}  Options
 */
function Poll(o){

  this.createdAt = new Date().getTime();

  this.lastUse = this.createdAt;

  o = o || {};

  var data;
  if(typeof o.data === 'object') data = o.data;
  else data = JSON.parse(o.data);

  for(var key in data)
    this[key] = data[key];

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
 * When a poll it inactive for MAX_INACTIVE ms it calls 'remove'
 */
Poll.prototype.checkActive = function (){
  if( (new Date().getTime() - this.lastUse) > MAX_INACTIVE) this.remove();
};

/**
 * Clears a polls interval
 * Removes poll data
 * Removes a poll from the POL_COL
 */
Poll.prototype.remove = function (){
  log('Started removal of poll: ' + this.id);

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

  return this.votes
};


module.exports = Poll;