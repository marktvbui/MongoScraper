//Requires our dependencies
var express = require('express');
var mongoose = require('mongoose');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');

//setting our port to be either host port or 3000
var PORT = process.env.PORT || 3000;

// instantiate our express app
var app = express();

//setting up an express router
var router = express.Router();

// require our routes file pass our router object
require('./config/routes')(router);

//designate our public folder as a static directory
app.use(express.static(__dirname + '/public'));

//connect handlebars to our express app
app.engine('handlebars', expressHandlebars({
  defaultLayout: "main"
}));
app.set('view engine', 'handlebars');

//use bodyparser in our app
app.use(bodyParser.urlencoded({
  extended: false
}));

//have every request go through our router middleware
app.use(router);

//if deployed, use the deployed database, otherwise use the local mongoheadlines database
var db = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadLines';

//connect mongoose to our database
mongoose.connect(db, function(error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log('mongoose connection is successful');
  }
});

// listening on the port
app.listen(PORT, function(){
  console.log("I can see you: " + PORT);
});