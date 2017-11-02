// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Require Beer Schema
var Beer = require("./models/Beer.js");

// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 3000;

// Run Morgan for Logging
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("public"));

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect("mongodb://localhost/reactpunkbeer");
var db = mongoose.connection;

db.on("error", function(err) 
{
    console.log("Mongoose Error: ", err);
});

db.once("open", function() 
{
    console.log("Mongoose connection successful.");
});

// -------------------------------------------------

// Main "/" Route. This will redirect the user to our rendered React application
app.get("/", function(req, res) 
{
    res.sendFile(__dirname + "/publib/index.html");
});

//retrieve our favorite beers that were saved.
app.get("/api/saved", function(req, res) 
{
    var query = req.query;
    console.log("query: " + JSON.stringify(query));
    var saved = query.saved;
    console.log("saved: " + saved);
    // We will find all the records that were saved.
    Beer.find({saved: saved}).exec(function(err, doc) 
    {
        if (err) 
        {
            throw err;
        }
        else 
        {
            res.send(doc);
        }
    });
});

// This is the route we will send PUT requests to update a beer.
app.put("/api", function(req, res) 
{
    console.log("In put(), BODY: " + JSON.stringify(req.body.beer));
    // Here we'll save the beer based on the JSON input.
    Beer.update({_id: req.body.beer._id}, 
    			{$set: {saved: true}}, function(err, doc) 
    {
        if (err) 
        {
            throw err;
        }
        else 
        {
            res.send(doc);
        }
    });
});

// This is the route we will send POST requests to save each search.
app.post("/api", function(req, res) 
{
    console.log("BODY: " + JSON.stringify(req.body.beer));
    // Here we'll save the beer based on the JSON input.
    Beer.create({
        name: req.body.beer.name,
        image_url: req.body.beer.image_url,
        description: req.body.beer.description,
        saved: req.body.beer.saved
    }, function(err, doc) {
        if (err) 
        {
            throw err;
        }
        else 
        {
            res.send(doc);
        }
    });
});

app.delete("/api/all", function(req, res) 
{
    Beer.remove({
        saved: false
    }, function(err, doc) {
        if (err) 
        {
            throw err;
        }
        else 
        {
            res.send(doc);
        }
    });
});

app.delete("/api", function(req, res) 
{
    var query = req.query;
    console.log("query: " + JSON.stringify(query));
    console.log("name: " + query.name);
    Beer.remove({
        name: query.name,
        saved: true
    }, function(err, doc) {
        if (err) 
        {
            throw err;
        }
        else 
        {
            res.send(doc);
        }
    });
});

// Listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
