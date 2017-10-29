//Include the main react dependencies
var React = require("react");

//var React = require("react");
var ReactDOM = require("react-dom");

//grab the routes
var routes = require("./config/routes.js");

// Renders the contents according to the route page.
var destination = document.querySelector(".container");

ReactDOM.render(routes, destination);
