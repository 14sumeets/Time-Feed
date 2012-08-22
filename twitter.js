console.log("USING TWITTER")
//do stuff when we realize we're logged in
var loggedInTasks = function(user) {
    // triggered when auth completed successfully
    	console.log("authenticated with twitter!");
		console.log(user);
        $("#twitter_signout").replaceWith('<button id="signout" type="button">Sign out of Twitter</button>');
        $("#twitter_signout").bind("click", function () {
        	console.log("LOGGING OUT OF TWITTER")
			twttr.anywhere.signOut();
			$("#twitter_signout").replaceWith("");
		});
}
var loggedOutTasks = function () {
	console.log("YOU ARE NOT LOGGED IN")

}
twttr.anywhere(function (T) {
    T("#twitter_auth").connectButton({
      	authComplete: loggedInTasks,
      	signOut: loggedOutTasks
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