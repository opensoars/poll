var POLL_URL = '/polls';

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

  function sendPoll(data){
    console.log(data);
    var req = new XMLHttpRequest();

    req.open('POST', POLL_URL, true);

    req.onabort = function (){
      console.log('req.onabort');
    };

    req.onerror = function (){
      console.log('req.onerror');
    };

    req.onreadystatechange = function (){
      if(this.readyState === 4)
        console.log(this);
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

