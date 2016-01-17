// START HEROKU SETUP
var express = require("express");
var app = express();
app.get('/', function(req, res){ res.send('You are now favoriting away...'); });
app.listen(process.env.PORT || 5000);
// END HEROKU SETUP


// Listbot config
//
// Config.keys uses environment variables so sensitive info is not in the repo.
var config = {
    keys: {
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
    },
};


// Get the members of our list, and pass them into a callback function.
function followTweets(word) {

  tu.stream("statuses/filter", {track: word}, function(stream) {
  stream.on('data', function(tweet) {

    var id = tweet.id_str;

    tu.post('favorites/create',{id:id}, function(error, tweet, response){
      if (!error) {
        console.log(tweet.id);
      }
      else
      {
        console.log(error);
      }
    });

    });
  });
 
}



// The application itself.
// Use the tuiter node module to get access to twitter.
var tu = require('twitter')(config.keys);

// Run the application. The callback in getListMembers ensures we get our list
// of twitter streams before we attempt to listen to them via the twitter API.
followTweets('laravel');
