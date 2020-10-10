// Dependencies
var http = require("http");
var fs = require("fs");
var express = require("express");

var app = express();

// Set our port to 3001
var PORT = process.env.PORT || 3000;

// Create our server
var server = http.createServer(handleRequest);

// Create a function for handling the requests and responses coming into our server
function handleRequest(req, res) {

  // Here we use the fs package to read our index.html file
  fs.readFile(__dirname + "/index.html", function(err, data) {
    if (err) throw err;
    // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
    // an html file.
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

// Starts our server
server.listen(PORT, function() {
  console.log("Server is listening on PORT: " + PORT);
});

app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
  });