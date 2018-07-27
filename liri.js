require("dotenv").config();

var keys = require('./keys.js');

var Spotify = require('node-spotify-api');

var action = process.argv[2];

var searchinput = process.argv[3];

var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');


switch(action) {
    case 'spotify-this-song':
    songsearch();
    break;

    case 'movie-this':
    moviesearch();
    break;

    case 'my-tweets':
    displayTweets();
    break;
};


function displayTweets() {

    var client = new Twitter(keys.twitterkeys);
       
    var params = {screen_name: 'dstadz'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        // console.log(tweets);

        for (i=0; i < tweets.length; i++) {
            console.log(tweets[i].text);
            console.log('Tweeted at: ' + tweets[i].created_at);
            console.log('----------------------------------------');
        };
    }
    });


};
 
function songsearch() {

spotify.search({ type: 'track', query: searchinput }, 

function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

// prints artists name 

console.log('Artist Name: ' + data.tracks.items[0].artists[0].name); 

//song's name
console.log('Song name: ' + data.tracks.items[0].name);

//song preview url
console.log('Preview Url: ' + data.tracks.items[0].artists[0].external_urls.spotify);

// album name of song is from
console.log('Album Name: ' + data.tracks.items[0].album.name);

});

};



