var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var port =process.env.PORT || 8080;

var app=express();

app.use(express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:"application/vnd.api+json"}));

mongoose.connect("mongodb://localhost/nytreact");
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});



require("./routing/routes.js")(app);

app.listen(port,function(){
    console.log("app listening to port "+port);
});
