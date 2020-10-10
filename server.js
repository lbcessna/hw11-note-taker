// Dependencies
// =============================================================
const { response } = require("express");
var express = require("express");
var fs = require("fs");
var path = require("path");


// Sets up the Express App
// =============================================================
var app = express();
app.use(express.static('public'));
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notesDB = fs.readFileSync(path.join(__dirname, "/db/db.json"));
notesDB = JSON.parse(notesDB)

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/api/notes", function (req, res) {
    return res.json(notesDB);
});
//Post route
app.post("/api/notes", function (req, res) {
    const newNote = req.body;
    if (notesDB.length === 0) {
        newNote.id = 1;
        notesDB.push(newNote);
    } else {
        newNote.id = Math.max.apply(Math, notesDB.map(function (note) { return note.id; })) + 1;
        notesDB.push(newNote);
    }
    fs.writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(notesDB));
    return res.json(req.body);
})
//Delete route
app.delete("/api/notes/:id", function (req, res) {
    notesDB.splice(notesDB.findIndex(element => element.id == req.params.id), 1);
    fs.writeFileSync(path.join(__dirname, "/db/db.json"), JSON.stringify(notesDB));
    return res.json(req.body);
})
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});

  //delete
