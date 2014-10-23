var POST_URL = '/rest/polls',
    POLL_URL = '/poll/?id='

// DOM
var pollForm = ge('pollForm'),
    titleInp = ge('titleInp')
    optionList = ge('optionList'),
    multiCheck = ge('multiCheck'),
    ipCheck = ge('ipCheck'),
    createBtn = ge('createBtn');


// Helpers
function ge(id){ return document.getElementById(id); }
function ce(type){ return document.createElement(type); }


// Auto add inputs to list when the last input registers a keydown event
(function (){
  function onKeyDown(){
    last.onkeydown = null;

    var li = ce('li'),
        input = ce('input');

    li.appendChild(input);

    input.onkeydown = onKeyDown;

    optionList.appendChild(li);

    last = input;
  }

  var last = optionList.children[optionList.children.length-1].children[0];
  last.onkeydown = onKeyDown;
}());


// Adds listener to createBtn
// When clicked send data which is pulled out of the 'form'
// by the getDataSt
(function (){

  function handleFail(resp){

  }

  function handleSucces(resp){
    window.location = POLL_URL + resp.id;
  }

  function sendPoll(data){
    var req = new XMLHttpRequest();

    req.open('POST', POST_URL, true);

    req.onabort = function (){ handleFail(JSON.parse(this.response)) };
    req.onerror = function (){ handleFail(JSON.parse(this.response)) };

    req.onreadystatechange = function (){
      if(this.readyState === 4){
        var resp;
        try{ resp = JSON.parse(this.response); } catch(e){ resp = {} }

        if(this.status === 200)
          handleSucces(resp);
        else
          handleFail(resp);
      }
    }

    req.send(data);

  }

  function getDataString(){
    return JSON.stringify({
      title: titleInp.value,

      options: function (){
        var optionsArr = [];

        for(var i=0; i<optionList.children.length; i+=1)
          if(optionList.children[i].children[0].value !== '')
            optionsArr.push(optionList.children[i].children[0].value);

        return optionsArr;
      }(),

      multi: multiCheck.checked,
      ip: ipCheck.checked
    });
  }

  function onCreate(){
    sendPoll(getDataString());
  }

  createBtn.onclick = onCreate;

}());

