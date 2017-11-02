var React = require("react");
//Including the Link component from React Router
//to navigate within our application without full
//page reloads
var Link = require("react-router").Link;
var IndexLink = require("react-router").IndexLink;

var AddNavBar = React.createClass(
{
    render: function() 
    {
        return (
            <section className="hero is-primary">
                <div className="container">
                    <nav className="nav">
                        <div className="nav-left">
                            <h1 className="title is-2">Beans Love Beers</h1>
                        </div>
                        <div className="nav-right nav-menu is-active">
                            <li href="#" className="nav-item">
                                <h1 className="subtitle"><IndexLink to="/" activeClassName="active">Home</IndexLink></h1>
                            </li>
                            <li href="#" className="nav-item">
                                <h1 className="subtitle"><Link to="/Favourite" activeClassName="active">Favourites</Link></h1>
                            </li>
                        </div>
                    </nav>
                </div>
            </section>
        );
    }
});

module.exports = AddNavBar;