var express = require('express')
var app = express.createServer();
var ejs = require('ejs')
var fs = require('fs')
var qs = require('querystring')
var httpreq = require('request')
var index = fs.readFileSync(__dirname + '/index.ejs', 'utf8');
var loggedIn = fs.readFileSync(__dirname + '/loggedinhome.ejs', 'utf8');

app.get('/tryTwitter',function(req,res) {
    var test = fs.readFileSync(__dirname + '/testOAuth.ejs', 'utf8');
    res.send(ejs.render(test, {appId : id}));
});

/*
app.get('/unsubscribefb', function (req, res) {
    console.log("DELETING SUBSCRIPTIONS")
    httpreq.del({
        url : "https://graph.facebook.com/391087367620804/subscriptions",
        body : querystring.stringify({access_token : "391087367620804|cHnrQ3TeHYNGM1OhK1qD1CrtxIY",object : "user"}),
    },function (error,response,body) {
        console.log("I am del")
        console.log(">>>>"+response.statusCode)
    });
	res.send("unsubscribed");
});*/

/*app.get('/postToCallback', function (req, res) {
    httpreq.post({
        url : "http://morning-dusk-7788.herokuapp.com/fbnewsfeed",
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        body : "sup",
    },function (error,response,body) {
        console.log("POSTED status "+response.statusCode)
    });
    res.send("yes");
});*/

/*app.get('/subscribefb', function (req, res) {
    console.log("subscribing to facebook")
    httpreq.post({
        url : "https://graph.facebook.com/391087367620804/subscriptions",
        body : querystring.stringify({access_token : "391087367620804|cHnrQ3TeHYNGM1OhK1qD1CrtxIY",object : "user",fields : "feed,notifications",
            callback_url : "http://morning-dusk-7788.herokuapp.com/fbnewsfeed",verify_token : "oklol"}),
    },function (error,response,body) {
        console.log("status "+response.statusCode + "error:")
        console.log(body) 
    });
    res.send("subscribed");
});*/
var id = null;
if (process.env.PORT) {
	id = '391087367620804';
} else {
	id = '112186178926689';
}

app.get('/', function (req, res) {
    res.send(ejs.render(index,{appId : id}));
});
app.get('/userhome', function (req, res) {
    res.send(ejs.render(loggedIn, {appId : id}));
});

/*
app.get('/getTwitterFeed', function (req, res) {
    console.log("RECEIVED GET")
    // Twitter OAuth
    var oauth =
        { callback: 'http://www.local.dev', consumer_key: 'gZXSdzZI4D56hCOoOj1A', consumer_secret: CONSUMER_SECRET
        }, url = 'https://api.twitter.com/oauth/request_token';
    request.post({url:url, oauth:oauth}, function (e, r, body) {
  // Assume by some stretch of magic you aquired the verifier
  var access_token = qs.parse(body)
    , oauth = 
      { consumer_key: CONSUMER_KEY
      , consumer_secret: CONSUMER_SECRET
      , token: access_token.oauth_token
      , verifier: VERIFIER
      , token_secret: access_token.oauth_token_secret
      }
    , url = 'https://api.twitter.com/oauth/access_token'
    ;
  request.post({url:url, oauth:oauth}, function (e, r, body) {
    var perm_token = qs.parse(body)
      , oauth = 
        { consumer_key: CONSUMER_KEY
        , consumer_secret: CONSUMER_SECRET
        , token: perm_token.oauth_token
        , token_secret: perm_token.oauth_token_secret
        }
      , url = 'https://api.twitter.com/1/users/show.json?'
      , params = 
        { screen_name: perm_token.screen_name
        , user_id: perm_token.user_id
        }
      ;
    url += qs.stringify(params)
    request.get({url:url, oauth:oauth, json:true}, function (e, r, user) {
      console.log(user)
    })
  })
})

    res.send("got a GET")
});*/
app.use(express.static(__dirname));

app.listen(process.env.PORT || 80);
console.log("Server running on port:")
console.log(process.env.PORT || 80)

//Initialize Facebook Subscription updates for all authenticated users

