Time-Feed
=========

A web app for integrating social media tools (Facebook, Twitter, Gmail, more?) into one "news feed". Another planned feature
will be the ability to filter content based on author, tags, or regular content search terms. The bulk of the work should be
based on working through displaying the content cleanly and dynamically (with the help of AJAX through jQuery). Users shouldn't 
have to ever refresh the page. Ideally, users can use the app to save time opening different windows for social media. The app
won't have ads and should be fast to use.

App is structured as such:

  # There are two HTML template files: index.ejs, and loggedinhome.ejs (.ejs == embedded javascript - essentially html with
the ability to be fed information from the Express server (node.js module)

  # Stylesheet1.css is the styling file for the entire app.

  # server.js is the node.js server file that uses Express to route http requests and responses. At the moment, there is no db 
component

  # a node.js-generated modules folder. Not to be touched. This is kept in the repo for eventual use with Heroku.
  
Contact: sumeet.sharma@berkeley.edu

## To run the app:
1. "git pull" all files to a local folder.
2. inside the Time-Feed folder, run "node server.js". Open http://localhost:3000 in a browser. (port must be 3000 to be recognized
by Facebook's API)