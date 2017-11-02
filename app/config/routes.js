//include react library
var React = require("react");

//include react-router module
var router = require("react-router");

//inclue the route component for display individual routes
var Route = router.Route;

//Include the Router component to contains all our Routes.
//Here where we can pass in some confiuration as props
var Router = router.Router;

//include the hashHistory prop to handle routing client side without a server.
var hashHistory = router.hashHistory;

// Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

//include the high-level components
var Main = require("../components/Main.js");
var Home = require("../components/children/Home.js");
var Favourite = require("../components/children/Favourite.js");

// Export the Routes
module.exports = (
    // The high level component is the Router component
    <Router history={hashHistory}>
        <Route path="/" component={Main}>
            <IndexRoute component={Home} />
            <Route path="Favourite" component={Favourite} />
        </Route>
    </Router>
);
