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
        url : "https://graph.facebook.com/111749342300038/subscriptions",
        body : querystring.stringify({access_token : "481488051865882|9ebI4nJU1lzSjV-15rD-oLclk58",object : "user"}),
    },function (error,response,body) {
        console.log("I am del")
        console.log(">>>>"+response.statusCode)
    });
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
httpreq.post({
    url : "https://graph.facebook.com/111749342300038/subscriptions",
    body : querystring.stringify({access_token : "481488051865882|9ebI4nJU1lzSjV-15rD-oLclk58",object : "user",fields : "feed",callback_url : "http://morning-dusk-7788.herokuapp.com/fbnewsfeed",verify_token : "oklol"}),
},function (error,response,body) {
    console.log("status "+response.statusCode)
});
