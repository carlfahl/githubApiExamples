var najax = $ = require('najax');
// import $ from 'jquery';

var github_username = 'carlfahl';

// $.get('https://api.github.com/users/carlfahl/repos', function (data) {
najax('https://api.github.com/users/carlfahl/repos', {type: 'GET'}, function (data) {
  console.log('done with the ajax call');
  console.log(data);
  data.map(function (item) {
    console.log(item.name);
  });
});
