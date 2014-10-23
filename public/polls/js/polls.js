var IS_FOCUSSED = true;

window.onfocus = function(){ IS_FOCUSSED = true; };
window.onblur = function(){ IS_FOCUSSED = false; };

var POLLS_URL = '/rest/polls';

var pollsList = document.getElementById('pollsList');

function drawPoll(poll){
  pollsList.innerHTML += "<li><a href='/poll/?id=" + poll.id + "'>"
    + poll.title + "</a></li>";
}

function handlePolls(polls){
  pollsList.innerHTML = '';

  polls.reverse();

  if(polls.length === 0){
    pollsList.innerHTML = 'There are no polls!';
  }
  else polls.forEach(drawPoll);
}

function getPolls(){

  var req = new XMLHttpRequest();

  req.onabort = function (){
    pollsList.innerHTML = 'Could not GET polls';
  };

  req.onreadystatechange = function (){
    if(this.readyState === 4){

      var resp;
      try{ resp = JSON.parse(this.response); } catch(e){ resp = {} }

      if(this.status === 200) handlePolls(resp);
      else pollsList.innerHTML = 'Could not GET polls';
    }

  };

  req.open('GET', POLLS_URL, true);
  req.send('');
}

getPolls();
setInterval(function (){
  if(IS_FOCUSSED) getPolls();
}, 2500);