var pollTitle = document.getElementById('pollTitle');

var id = window.location.search.split('=')[1];

document.title += ' #' + id;
pollTitle.innerHTML += ' #' + id;
