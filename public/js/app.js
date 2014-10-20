// DOM
var pollForm = ge('pollForm'),
    optionList = ge('optionList'),
    multiCheck = ge('multiCheck'),
    ipCheck = ge('ipCheck'),
    createBtn = ge('createBtn'),
    titleInp = ge('titleInp');

// HELPERS
function ge(id){ return document.getElementById(id); }
function ce(type){ return document.createElement(type); }


// List related
(function (){
  function onKeyDown(){
    last.onkeydown = null;

    var li = ce('li'),
    input = li.appendChild( ce('input') );

    input.onkeydown = onKeyDown;

    optionList.appendChild(li);

    last = input;
  }

  var last = optionList.children[optionList.children.length-1].children[0];
  last.onkeydown = onKeyDown;
}());


// HTTP related
(function (){

  function sendPoll(data){
    console.log(data);
    var req = new XMLHttpRequest();

    req.open('POST', '/poll', true);

    req.onabort = function (){
      console.log('req.onabort');
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

