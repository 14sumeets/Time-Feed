console.log("USING TWITTER")
//do stuff when we realize we're logged in
var token = null;
var secret = null;
var socket = io.connect('http://localhost'); 										//need to detect production v.s. dev
socket.on('receiveTweets',function(data) {
	//given tweets in JSON, do something with them!!!

	console.log(data)


});


//we need to get rid of the login option once they're authenticated (we can check the tokens and see if we got any -- eventually want to check if they're legit?)
function popup(mylink, windowname) {
	if (! window.focus)return true;
	var href;
	if (typeof(mylink) == 'string')
   		href=mylink;
	else
   		href=mylink.href;
	var w = window.open(href, windowname, 'width=400,height=200,scrollbars=yes');
	var timer = setInterval(function() {   //unfortunately, there's no good way to determine window closing
    	if(w.closed) {  
        	clearInterval(timer);  
			console.log("popup closed")
			//save API tokens for future twitter calls
			token = w.token;
			secret = w.secret;
			//when we detect the authentication window closed, pass the tokens to the JS server to be used in the Twitter API 
			socket.emit('getTweets',{token:w.token, secret:w.secret});
		}  
	}, 1000);
	return false;
}

