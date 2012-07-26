var express = require('express')
var app = express.createServer();
var ejs = require('ejs')
var fs = require('fs')
var querystring = require('querystring')
var httpreq = require('request')
var index = fs.readFileSync(__dirname + '/index.ejs', 'utf8');
var loggedIn = fs.readFileSync(__dirname + '/loggedinhome.ejs', 'utf8');


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
});

app.get('/postToCallback', function (req, res) {
    httpreq.post({
        url : "http://morning-dusk-7788.herokuapp.com/fbnewsfeed",
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        body : "sup",
    },function (error,response,body) {
        console.log("POSTED status "+response.statusCode)
    });
    res.send("yes");
});

app.get('/subscribefb', function (req, res) {
    console.log("subscribing to facebook")
    httpreq.post({
        url : "https://graph.facebook.com/391087367620804/subscriptions",
        body : querystring.stringify({access_token : "391087367620804|cHnrQ3TeHYNGM1OhK1qD1CrtxIY",object : "user",fields : "feed,notifications",
            callback_url : "http://morning-dusk-7788.herokuapp.com/fbnewsfeed",verify_token : "oklol"}),
    },function (error,response,body) {
        console.log("status "+response.statusCode + "error:")
        console.log(response) 
        res.send(response);
    });
    res.send("subscribed - ");
});


app.get('/', function (req, res) {
    res.send(ejs.render(index,{}));
});
app.get('/userhome', function (req, res) {
    res.send(ejs.render(loggedIn, {}));
});

app.post('/fbnewsfeed', function (req, res) {
    console.log("GOT POSTED!")
    if (req.method === "POST" ) {
        // YAY. WE'RE BEING AUTO UPDATED
		console.log("got a POST!")
        console.log(req.body);
    }
    res.send(req.body)
});
app.get('/fbnewsfeed', function (req, res) {
    console.log("YAY!!!!!!!!!!!")
    if (req.method === "GET") {
        // answer Facebook's verification request
        var challenge = req.query["hub.challenge"]; //need to return the 'challenge' value back to Facebook
        console.log(req.query["hub.challenge"])
        res.send(challenge)
    }
});
app.use(express.static(__dirname));

app.listen(process.env.PORT || 3000);
console.log("Server running on port:")
console.log(process.env.PORT || 3000)

//Initialize Facebook Subscription updates for all authenticated users

