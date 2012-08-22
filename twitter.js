console.log("USING TWITTER")
//do stuff when we realize we're logged in
var loggedInTasks = function(user) {
    // show the logged-in to twitter view
    console.log("authenticated with twitter!");
    $("#twittersignoutbutton").css({'display':'inline'})
}
var loggedOutTasks = function () {
	//logged out of twitter view
	console.log("YOU ARE NOT LOGGED IN")
	$("#twittersignoutbutton").css({'display':'none'})

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
    	loggedInTasks();
    } else {
    	loggedOutTasks();
    }

});




/*twttr.anywhere(function (T) {
        if(T.isConnected()) {
            console.log("HEY! YOU'RE AUTHED")
            console.log(T)
            $("#twitter_auth").append('<button id="signout" type="button">Sign out of Twitter</button>');
            $("#twitter_auth").bind("click", function () {
                twttr.anywhere.signOut();
                $("#twitter_auth").replaceWith("");
                T("#twitter_auth").connectButton({ size: "medium",authComplete: function(user) {
                        console.log("authenticated with twitter!");
                        console.log(user); 
                    } 
                });
            });
        } else {
            T("#twitter_auth").connectButton({ size: "medium",authComplete: function(user) {
                    console.log("authenticated with twitter!");
                    console.log(user);
                     
                } 
            });
        }
    });*/