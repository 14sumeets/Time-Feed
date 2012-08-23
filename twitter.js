console.log("USING TWITTER")
//do stuff when we realize we're logged in
var loggedInTasks = function(user) {
    // show the logged-in to twitter view
    console.log("authenticated with twitter!");
    $("#twittersignoutbutton").css({'display':'inline'})
    //fetch the latest feed of Tweets
    getAndDisplayTweets(user);







}
var loggedOutTasks = function () {
	//logged out of twitter view
	console.log("YOU ARE NOT LOGGED IN")
	$("#twittersignoutbutton").css({'display':'none'})

}
var hello = function () {
	console.log("ERRRMAGERRD")
	alert("HI");
}
var getAndDisplayTweets = function(user) {
	console.log("current user is:")
	console.log(user)
    /*$.ajax({
            url: 'http://twitter.com/status/user_timeline/SumeetSharma126.json',
            type: 'GET',
            dataType: 'jsonp',
            jsonp: false,
            data: {jsonpCallback: "hello"},
            data: {
                screen_name: user.screenName,
                include_rts: true,
                count: 25,
                include_entities: true
            },
            success: function(data, textStatus, xhr) {
 				console.log("Successful ajax request!")
                console.log(data)
                console.log(textStatus)                 
            },
            error: function(err) {
            	console.log("ERROR:")
            	console.log(err)
            }
 
    });*/
	 $.ajax({
                    url: 'http://twitter.com/status/user_timeline/SumeetSharma126.json?count=10',
                    dataType: 'jsonp',
                    beforeSend: function(xhr) {
                    	//xhr.setRequestHeader("Authorization","OAuth")
                    	console.log("the header")
                    	console.log(xhr)
                    },

                    success: function(data,status){
                        var text = '';
                        var len = data.length;
                        for(var i=0;i<len;i++){
                            twitterEntry = data[i];
                            text += '<p><img src = "' + twitterEntry.user.profile_image_url_https +'"/>' + twitterEntry['text'] + '</p>'
                        }
                        console.log("HURRAY");
                        console.log(data)
                        console.log(status)
                    }
    });
}






twttr.anywhere(function (T) {
    T("#twitter_auth").connectButton({
      	authComplete: loggedInTasks,
      	signOut: loggedOutTasks
	});
	$("#twittersignoutbutton").bind("click", function () {
		//sign out when our button is clicked
    	console.log("LOGGING OUT OF TWITTER")
		twttr.anywhere.signOut();
	});
    if(T.isConnected()) {
    	loggedInTasks(T.currentUser);
    } else {
    	loggedOutTasks();
    }

});


