var POLLS_URL = '/rest/polls';

var pollsList = document.getElementById('pollsList');

function drawPoll(poll){
  pollsList.innerHTML += "<li><a href='/poll/?id=" + poll.id + "'>"
    + JSON.stringify(poll) + "</a></li>";
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
      if(this.status === 200){
        handlePolls(JSON.parse(this.response));
      }
      else pollsList.innerHTML = 'Could not GET polls';
    }

  };

  req.open('GET', POLLS_URL, true);
  req.send('');
}

getPolls();
setInterval(function (){ getPolls(); }, 2500);