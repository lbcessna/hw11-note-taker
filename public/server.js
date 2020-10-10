// Dependencies
var http = require("http");
// var fs = require("fs");
var express = require("express");

var app = express();

// Set our port to 3000
var PORT = process.env.PORT || 3000;

// Create our server
var server = http.createServer(handleRequest);

// Create a function for handling the requests and responses coming into our server
function handleRequest(req, res) {
  app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
})

}

// Starts our server
server.listen(PORT, function() {
  console.log("Server is listening on PORT: " + PORT);
});

app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
  });