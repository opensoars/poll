var ARGV = process.argv,
    ENV = ARGV[2] || undefined;

var http = require('http'),
    fs = require('fs');


var INDEX = fs.readFileSync('./public/index.html');


var methodHandlers = {
  GET: function (req, res){

    switch(req.url){
      case '/':
        if(ENV && ENV === 'dev')
          res.end(fs.readFileSync('./public/index.html'));
        else res.end(INDEX);
      break;
    }
  }
};

function httpListener(req, res){

  // Is there a handler for the req its method?
  if(methodHandlers[req.method])
    methodHandlers[req.method](req, res);

  // If there ain't, we end with a simple string
  else
    res.end('Nothing here');
}


http.createServer(httpListener).listen(80);