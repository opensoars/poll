var hTitle = document.getElementById('hTitle'),
    main = document.getElementById('main');


var ID = window.location.search.split('=')[1],
    POLL_URL = '/rest/polls/' + ID;

var FAIL_TEXT = 'Could not GET poll. This poll does not exist!'

document.title += ' #' + ID;
hTitle.innerHTML += ' #' + ID;

function handlePoll(poll){
  main.innerHTML += "<h3>" + poll.title + "</h3>";
}

function getPoll(){

  var req = new XMLHttpRequest();

  req.onabort = function (){
    main.innerHTML = FAIL_TEXT;
  };

  req.onreadystatechange = function (){
    if(this.readyState === 4){
      if(this.status === 200) handlePoll(JSON.parse(this.response));
      else main.innerHTML = FAIL_TEXT;
    }

  };

  req.open('GET', POLL_URL, true);
  req.send('');
}


getPoll();