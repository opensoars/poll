var hTitle = document.getElementById('hTitle'),
    main = document.getElementById('main'),
    pollData = document.getElementById('pollData'),
    voteBtn = document.getElementById('voteBtn'),
    resultList = document.getElementById('resultList');

var ID = window.location.search.split('=')[1] || 0,
    POLL_URL = '/rest/polls/' + ID,
    VOTE_URL = '/rest/vote/' + ID,
    RESULTS_URL = '/rest/results/' + ID;

var FAIL_TEXT = '<p>Could not GET poll. This poll does not exist!</p>'

document.title += ' #' + ID;
hTitle.innerHTML += ' #' + ID;

(function (){

  function handleSucces(results){
    console.log(results);
  }
  function handleAbort(){
    alert('Vote could not be cast. Request failed');
  }
  function handleFail(desc){
    alert('Vote could not be cast. ' + desc || '');
  }


  function getResults(){
    var req = new XMLHttpRequest();

    req.onabort = handleAbort;

    req.onreadystatechange = function (){
      if(this.readyState === 4){
        var resp;
        try{ resp = JSON.parse(this.response); } catch(e){ resp = {} }

        if(this.status === 200){
          if(resp.status === 'failed') handleFail(resp.desc);
          else handleSucces();
        }
        else handleFail(resp.desc);
      }
    };

    req.open('GET', RESULTS_URL, true);

    req.send('');
  }


  getResults();

}());

(function (){

  function handleAbort(){
    alert('Vote could not be cast. Request failed.');
  }

  function handleFail(desc){
    alert('Vote could not be cast. ' + desc || '');
  }

  function handleSucces(){
    alert('Vote succesful!');
  }

  function postVote(checks){

    var req = new XMLHttpRequest();
    req.onabort = handleFail;

    req.onreadystatechange = function (){

      if(this.readyState === 4){
        var resp;
        try{ resp = JSON.parse(this.response); } catch(e){ resp = {} }

        if(this.status === 200){
          if(resp.status === 'failed') handleFail(resp.desc);
          else handleSucces();
        }
        else handleFail(resp.desc);
      }

    };

    req.open('POST', VOTE_URL, true);

    req.send(JSON.stringify(checks));
  }

  function onVoteClick(evt){
    var options = document.getElementsByClassName('option'),
        checks = [];

    for(var i=0; i<options.length; i+=1)
      if(options[i].checked === true) checks.push(i);

    if(checks.length === 0) return alert('Nothing to submit!');

    postVote(checks);
  }


  voteBtn.onclick = onVoteClick;

}());


(function (){

  function writePoll(poll){
    pollData.innerHTML +="<h3>" + poll.title + "</h3>"
      + "<p>" + new Date(poll.createdAt) + "</p>"
      + "<ol>"
      + function (){
          var str = '', options = poll.options;

          if(poll.multi)  for(var i=0; i<options.length; i+=1)
            str += "<li><input class='option' id='checkbox_" + i
              + "' type='checkbox'>"
              + "<label for='checkbox_" + i + "''>" + options[i]
              + "</label></li>";

          else  for(var i=0; i<options.length; i+=1)
            str += "<li><input name='singleVoteGroup' class='option'"
              + " id='radio_" + i + "' value='" + i + "'"
              + " type='radio'><label for='radio_" + i + "'>"
              + options[i] + "</label</li>";
        
          return str;
        }()
      + "</ol>"
  }

  function handleFail(){ main.innerHTML = FAIL_TEXT; }

  function getPoll(){
    var req = new XMLHttpRequest();

    req.onabort = handleFail;

    req.onreadystatechange = function (){
      if(this.readyState === 4){
        if(this.status === 200) writePoll(JSON.parse(this.response));
        else handleFail();
      }
    };

    req.open('GET', POLL_URL, true);
    req.send('');
  }

  getPoll();

}());





