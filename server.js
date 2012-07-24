var express = require('express');
var app = express.createServer();
var ejs = require('ejs')
var fs = require('fs')
var index = fs.readFileSync(__dirname + '/index.ejs', 'utf8');
var loggedIn = fs.readFileSync(__dirname + '/loggedinhome.ejs', 'utf8');
app.get('/', function (req, res) {
    res.send(ejs.render(index,{}));
});
app.get('/userhome', function (req, res) {
    res.send(ejs.render(loggedIn, {}));
});

app.get('/fbnewsfeed', function (req, res) {
    console.log("YAY!!!!!!!!!!!")
    if (req.method === "GET") {
        // answer Facebook's verification request
        var challenge = req.query["hub.challenge"]; //need to return the 'challenge' value back to Facebook
        console.log(req.query)
    }
    if (req.method === "POST" ) {
        // YAY. WE'RE BEING AUTO UPDATED
    }
    res.send("GOODAMN");
});
app.use(express.static(__dirname));

app.listen(3000);
console.log("Server running on port 3000. Open http://localhost:3000")