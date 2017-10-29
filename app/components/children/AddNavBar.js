var React = require("react");

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
                            <a href="#" className="nav-item">
                                <h1 className="subtitle">Home</h1>
                            </a>
                            <a href="#" className="nav-item">
                                <h1 className="subtitle">Favourites</h1>
                            </a>
                        </div>
                    </nav>
                </div>
            </section>
        );
    }
});

module.exports = AddNavBar;