var IS_FOCUSSED = true;
window.onfocus = function(){ IS_FOCUSSED = true; };
window.onblur = function(){ IS_FOCUSSED = false; };

var hTitle = document.getElementById('hTitle'),
    main = document.getElementById('main'),
    pollData = document.getElementById('pollData'),
    voteBtn = document.getElementById('voteBtn'),
    resultList = document.getElementById('resultList');

var ID = window.location.search.split('=')[1] || 0,
    POLL_URL = '/api/polls/' + ID,
    VOTE_URL = '/api/votes/' + ID;


var FAIL_TEXT = '<p>Could not GET poll. This poll does not exist!</p>'

var POLL;

document.title += ' #' + ID;
hTitle.innerHTML += ' #' + ID;

(function (){

  function handleAbort(){
    alert('Vote could not be cast. Request failed.');
  }

  function handleFail(desc){
    alert('Vote could not be cast. ' + desc || '');
  }

  function handleSucces(){
    alert('Vote succesful!');

    console.log(POLL);

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
      + "</ol>";

    writeResultPlaceholder(poll);

  }

  // ALLOW ORDERING BY PERCENTAGE || COUNT
  function writeResultPlaceholder(poll){
    POLL = poll;

    var options = poll.options;

    options.forEach(function (option, i){
      resultList.innerHTML += "<li>" + option + ": " 
        + "<span class='percentage' id='resultPercentage_" + i + "'>0%</span> - "
        + "<span class='count' id='resultCount_" + i + "'>0</span>" 
        + "<div style='width: 200px; background: red'><div class='bar' style='height:10px; width: 0px; background: green;"
        + " 'id='bar_" + i + "'></div></div></li>";
    });
  }
  // ALLOW ORDERING BY PERCENTAGE || COUNT


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

  startResultGetter();

}());



function startResultGetter(){

  function handleAbort(){
    alert('Could not get poll results. Request failed');
  }
  function handleFail(desc){
    alert('Could not get poll results. ' + (desc || ''));
  }

  function handleResults(results){

    if(!POLL) return;

    var options = POLL.options;

    var totalVotes = 0;

    for(var key in results){
      totalVotes += results[key];
      document.getElementById('resultCount_' + key).innerHTML = results[key];
    }

    for(var key in results){
      var percentageText = document.getElementById('resultPercentage_' + key);
      if(results[key] === 0)
        percentageText = '0%';
      else
        percentageText.innerHTML =
          Math.round(100 / (totalVotes / results[key])) + '%';
    }

    for(var key in results){
      var bar = document.getElementById('bar_' + key);
      if(results[key] === 0)
        bar.style.width = '0px';
      else
        bar.style.width =
          (Math.round(100 / (totalVotes / results[key])) * 2) + 'px';
    }
    
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
          else handleResults(resp);
        }
        else handleFail(resp.desc);
      }
    };

    req.open('GET', VOTE_URL, true);

    req.send('');
  }

  setInterval(function (){
    if(IS_FOCUSSED) getResults();
  }, 1250);

  getResults();
}

