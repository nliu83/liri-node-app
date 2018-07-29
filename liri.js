require("dotenv").config();

var fs = require("fs");

var keys = require('./keys.js');

var Spotify = require('node-spotify-api');

var action = process.argv[2];

var searchinput = process.argv[3];

var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');

var request = require('request');




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

function moviesearch () {
    
    var queryURL = "https://www.omdbapi.com/?t=" + searchinput + "&y=&plot=short&apikey=trilogy";

    request(queryURL, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.

    console.log('Title of Movie: ' + JSON.parse(body).Title);

    console.log('Year movie came out: ' + JSON.parse(body).Year);

    console.log('IMDB Rating of the movie: ' + JSON.parse(body).Ratings[0].Value);

    console.log('Rotten Tomatoes Rating of the movie: ' + JSON.parse(body).Ratings[1].Value);

    console.log('Country where the movie was produced: ' + JSON.parse(body).Country);

    console.log('Language of the movie: ' + JSON.parse(body).Language);

    console.log('Plot of the movie: ' + JSON.parse(body).Plot);

    console.log('Actors in the movie: ' + JSON.parse(body).Actors);
    });
};


