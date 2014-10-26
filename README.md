poll
====


[![Build Status](https://img.shields.io/travis/opensoars/poll.svg?style=flat)](https://travis-ci.org/opensoars/poll)
[![Coverage Status](https://img.shields.io/coveralls/opensoars/poll.svg?style=flat)](https://coveralls.io/r/opensoars/poll)
[![Dependency Status](https://david-dm.org/opensoars/poll.svg?style=flat)](https://david-dm.org/opensoars/poll)
[![Development Dependency Status](https://david-dm.org/opensoars/poll/dev-status.svg?style=flat)](https://david-dm.org/opensoars/poll#info=devDependencies&view=table)



[Strawpoll.me](http://www.strawpoll.me/) rip (created in a couple of hours).


---


### Use
1. Clone source
2. `npm run server`
3. Browse to `http://localhost:80`
4. Poll away!


### Tech used (so far)
* [Node.js](http://nodejs.org/)
* [Express](http://expressjs.com/)
* [poll](https://github.com/opensoars/ezlog)
* [cls](https://github.com/opensoars/cls)
* HTML5


### Note
A new way of testing the RESTful API should b included in the project! Since [Travis-ci](https://travis-ci.org/) is having a hard time testing it. It isn't able to make requests to the server. I got to look into this!

