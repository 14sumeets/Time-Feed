                var uid = null;
                var username = null;
                //comments aren't displayed in the right order...
                var showMoreComments = function(actionElement) {
                	var region = actionElement.parentNode.parentNode
                	var elem = actionElement;
                	var isThisDisplayed = function (region,comment) {
                		var i;
                		for (i=0;i<region.childNodes.length;i++) {
                			if (region.childNodes[i].getAttribute('cid') == comment.id) {
                				return true;
                			}
                		}
                		return false;
                	}
                	FB.api('/'+elem.getAttribute('oid')+'/comments/','get',function (response) {
                		console.log(response)
                		if (response.data != undefined) {
                			var insertionSpot = region.childNodes[1], j;
                			for (j=response.data.length-1;j>=0;j--) {
                				var comment = response.data[j];
                				if (!isThisDisplayed(region,comment)) {
                					var e = document.createElement("div");
               						e.className = "fbcomment";
               						e.setAttribute('cid',comment.id); 
               						e.style.display
									e.innerHTML = "<div class=\"fbpostcommentauthorpic\">"+"<img width=\"32\" height=\"32\" src=\"https://graph.facebook.com/"+comment.from.id+"/picture\"/> </div><div class=\"fbcommentcontent\"><span class=\"fbauthorname\">"+comment.from.name+" </span>"+comment.message+"</div>";
									region.insertBefore(e,region.childNodes[1]);
                				}
                			}
                		} else {console.log("ERROR: Could not retrieve comments")}
                	});
                }

                var submitFBComment = function(tElement,event) {
               		if (event.keyCode == 13 && tElement.value != "") {
               			//if someone presses enter and they've entered in some text, create a new comment box, animate the post, and append the new comment, pushing down the create-comment box
               			var msg = tElement.value;
               			var elem = tElement;
               			var parent = tElement.parentNode;
               			var oid = tElement.getAttribute('oid');
						var numLikesElement = parent.parentNode.parentNode.firstChild.getElementsByTagName('span')[0];
						var numCommentsElement = parent.parentNode.parentNode.firstChild.getElementsByTagName('span')[1];
               			var e = document.createElement("div");
               			e.className = "fbcomment";
               			tElement.blur();
						e.innerHTML = "<div class=\"fbpostcommentauthorpic\">"+"<img width=\"32\" height=\"32\" src=\"https://graph.facebook.com/"+uid+"/picture\"/> </div><div class=\"fbcommentcontent\"><span class=\"fbauthorname\">"+username+" </span>"+msg+"</div>";
						parent.parentNode.parentNode.insertBefore(e,parent.parentNode.parentNode.lastChild);
						elem.value = "";
               			FB.api('/'+oid+'/comments', 'post',{message : msg},function(response) {
							console.log(response)
							if(response.id) {
								//Successful post! Update like and comment count.
								FB.api(oid,'get',function (response) {
									if (response.likes != undefined) {
										numLikesElement.innerHTML = response.likes.count;
									}
									if (response.comments != undefined) {
										numCommentsElement.innerHTML = response.comments.count;
									}
								});
							} else {
								//if the post wasn't successful, put back the user's comment message in the textarea to let them submit again
								console.log("ERROR POSTING COMMENT")
								elem.value = msg;
							}
						});
               		}
               	}
               	var expandCommentArea = function(tElement) {
               		tElement.setAttribute('rows',2);
               	}
               	var retractCommentArea = function(tElement) {
               		tElement.setAttribute('rows',1);
               	}
                var initializeLikeText = function(element,oid) {
                	//figure out whether I liked an object or not and show the appropriate 'like' text
                	FB.api(
					        {
					            method: 'fql.query',
					            query: 'SELECT user_id, object_id, post_id FROM like WHERE user_id=me() AND post_id=\''+oid+'\''
					        },
					        function(response) {
					            //    do something with the response
								if (response.length > 0) {
									element.innerHTML = '[-]';
								} else {
									element.innerHTML = '[+]';
								}
					        }
					);
                };
				var fbLike = function(linkElement) {
					//we shouldn't be able to like something 2x
					var oid = linkElement.getAttribute('oid');
					var numLikesElement = linkElement.parentNode.getElementsByTagName('span')[0];
					var numCommentsElement = linkElement.parentNode.getElementsByTagName('span')[1];
					linkElement.innerHTML = "[-]";
					linkElement.setAttribute('onclick','fbUnLike(this);');
					FB.api('/'+oid+'/likes', 'post',function(response) {
						if (!response) {
							linkElement.innerHTML = "[+]";
						}
						//update number of likes and comments
						FB.api(oid,'get',function (response) {
							debugger;
								if(response.likes != undefined) { numLikesElement.innerHTML = response.likes.count; }
								else { numLikesElement.innerHTML = "0";}
							
							numCommentsElement.innerHTML = response.comments.count;
						});
					});
					
				};
				var fbUnLike = function(linkElement) {
					//we shouldn't be able to like something 2x
					//debugger;

					var oid = linkElement.getAttribute('oid');
					var numLikesElement = linkElement.parentNode.getElementsByTagName('span')[0];
					var numCommentsElement = linkElement.parentNode.getElementsByTagName('span')[1];
					linkElement.innerHTML = "[+]";
					linkElement.setAttribute('onclick','fbLike(this);');
					//debugger;
					FB.api('/'+oid+'/likes', 'delete',function(response) {
						if (!response) {
							linkElement.innerHTML = "[+]";
						}
						console.log("Unliking Debug");
						//update number of likes and comments
						FB.api(oid,'get',function (response) {
						//	alert(response.likes.count);
							//alert(response);
							if(response.likes != undefined) { numLikesElement.innerHTML = response.likes.count; }
								else { numLikesElement.innerHTML = "0";}						
							numCommentsElement.innerHTML = response.comments.count;
						});
					});
					
				};

				var setPostLinks = function(ids, postID) { 
						var name, e;
						//alert("posts are being linked");
					FB.api(ids[0], 'get', function(response) { 
						
					 e = document.getElementById("fbsender" + postID);
					 name = e.innerHTML;

					 e.innerHTML = "<a href=\"" + response.link + "\">" + name + "</a>"; 

					
					});

					if(ids[1] != null)
					{
						FB.api(ids[1], 'get', function(response) { 
						
					 e = document.getElementById("fbrecipient" + postID);
					 name = e.innerHTML;

					 e.innerHTML = "<a href=\"" + response.link + "\">" + name + "</a>"; 

					
					});

					}


				};

			//given a post object, display it in region before insertionSpot. 
                var displayFBpost = function(region,post,insertionSpot) {
                	/*********start by setting up the generic fb post design***************/
                	var ids = new Array();
					var e = document.createElement("div");
					e.className = "FacebookPost";
					e.style.display = 'none';
					region.insertBefore(e,insertionSpot);
					var userLink = "";
					var from = post.from.name;
					var pictureHTML = "";
					if (post.picture != undefined) {
						pictureHTML = "<div class=\"fbpostimage\" style=\"display:none\"><img src=\"" + post.picture  + "\"/></div>";
					}

					
					//Get the id of the post author
					ids[0] = post.from.id;
			
					
					var html = "<div class=\"fbpostauthorpic\">"+"<img src=\"https://graph.facebook.com/" + post.from.id  + "/picture\"/> </div><div class=\"fbpostcontent\"><span class=\"fbauthorname\" id=\"fbsender" + post.id + "\">"+post.from.name + "</span>";
		
					if (post.to != undefined) {
					html = html + " > " + "<span class=\"fbauthorname\" id=\"fbrecipient" + post.id + "\">" + post.to.data[0].name + "</span>"; //could be to multiple people! TODO: FIX THIS
						ids[1]= post.to.data[0].id;
					}
					//html = html +"</span>";
                    var msg = post.message;
					if (msg == undefined) {
						msg = post.story;
					}
					switch (post.type) //still missing some, like check-in
					{
					case "question":
					case "link":
					case "video":
					case "photo":
					case "checkin":
					case "offer":
					case "status":
						html = html+"<br />" +  "<br />" + msg + "<br /><br />" + pictureHTML;
					}
					html = html +"<br /><div class=\"fbaudiencearea\">";
					/******************figure out number of likes and comments************/
					var numlikes = 0;
					var liketext = "s";
					var commenttext = "s";
					var numcomments = 0;

					//alert(Object.keys(post));
					
					if (post.likes != undefined) {
						numlikes  = post.likes.count;
						if (numlikes === 1) {
							liketext = "";
						}
					}
					if (post.comments != undefined ) {
						numcomments = post.comments.count;
						if (numcomments === 1) {
							commenttext = "";
						}
					}
					/**************Create the action bar *************/
					html = html +"<div class=\"fbactionbar\"><span id=\"numlikes\">"+numlikes+"</span> like"+liketext+"<a oid=\""+post.id+"\" href=\"javascript:void(0)\" onclick=\"fbLike(this);\">[+]</a> | <span>"+numcomments+"</span> comment"+commenttext+"<a oid=\""+post.id+"\" href=\"javascript:void(0)\" onclick=\"showMoreComments(this);\">[+]</a></div>";
					/***********display comments***********/
					if (post.comments.data != undefined) {
						var i;
						for (i=0;i<post.comments.data.length;i++) {
							html = html + "<div cid=\""+post.comments.data[i].id+"\" class=\"fbcomment\"><div class=\"fbpostcommentauthorpic\">"+"<img width=\"32\" height=\"32\" src=\"https://graph.facebook.com/" + post.comments.data[i].from.id  + "/picture\"/> </div><div class=\"fbcommentcontent\"><span class=\"fbauthorname\">"+post.comments.data[i].from.name + " </span>"+post.comments.data[i].message+"</div></div>";
						}
					}
					/************create a comment box with user's profile picture****************/
					e.innerHTML = html +"<div class=\"fbcomment\"> <div class=\"fbpostcommentauthorpic\">"+"<img width=\"32\" height=\"32\" src=\"https://graph.facebook.com/"+uid+"/picture\"/> </div><div class=\"fbcommentcontent\"><textarea oid=\""+post.id+"\" onkeydown=\"submitFBComment(this,event);\" onblur=\"retractCommentArea(this);\" onfocus=\"expandCommentArea(this);\" placeholder=\"Write a comment...\" rows=\"1\" cols=\"45\"></textarea></div></div></div></div><hr>";
					initializeLikeText(e.childNodes[1].lastChild.firstChild.childNodes[2],post.id);
					setPostLinks(ids, post.id);
				
                return;
                };



/*Set up function to be called when it's time to load the app. (bulk of work) */
                var loadApp = function (accessToken) {
                    //Make nav bar welcome the user (display the name)
                    FB.api('/me', function (response) {
                        document.getElementById('facebookname').innerHTML = response.name;
                        document.getElementById('profile_pic').innerHTML = '<img src=\"http://graph.facebook.com/'+response.id+'/picture\" />'
                        document.getElementById('profile_name').innerHTML = response.name;
                        console.log(response)
                        username = response.name;
                    });
                    //Load news feed + Display initial news feed items + Retrieve authorIds to query their profile pics and show them in their posts (use a hash for optimization?)
                    //*************************************************
                    var mostRecentTime = null;
					var displayedPostTimes = {};
                    FB.api('/me/home', function(response) {
                        var dispArea = document.getElementById('app');
                        var posts = response.data;
						var authorids = [];
                        var i;
                        console.log(posts)
                        for (i = 0;i<posts.length;i++) {
                            displayFBpost(dispArea,posts[i],null);
							displayedPostTimes[posts[i].created_time] = 1;
                        }
						$(".FacebookPost").slideDown(1000,function() {$(".fbpostimage").slideDown(2000);});

						
                    });
                    //Have a timer and periodically check for newer news feed items
                    //************************************************************
                    setInterval(function() { 
                        console.log("hello again")
                        FB.api('/me/home',function(response) {
                            var posts = response.data;
                            var dispArea = document.getElementById('app');
                            var i;
							var insertionSpot = dispArea.firstChild;
                            console.log("most recent: "+mostRecentTime)
                            console.log(posts)

							for (i=0;i<posts.length;i++) {
								if (displayedPostTimes[posts[i].created_time] == undefined) {
									displayedPostTimes[posts[i].created_time] = 1;
									displayFBpost(dispArea,posts[i],insertionSpot);
									insertionSpot = posts[i];
									$(".FacebookPost:first").slideDown(2000,function() {$(".fbpostimage").slideDown(2000);});
								}
							}
                        });
                    },10000)

                };