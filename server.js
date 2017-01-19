var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  app = express();

// app.use(express.static(path.join(__dirname + "./client")));
app.use(express.static('client'));
app.use(bodyParser.json());

//  required
require('./server/config/mongoose.js');

//listen
app.listen(8000, function(){
  console.log("good stuff on port 8000");
})