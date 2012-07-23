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

/*app.get('/fbnewsfeed', function (req, res) {
    res.send(ejs.render(loggedIn, {}));
});*/
app.use(express.static(__dirname));

app.listen(3000);
console.log("Server running on port 3000. Open http://localhost/3000")