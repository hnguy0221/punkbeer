var React = require("react");

var BeerItem = React.createClass(
{
    handleFavoriteBeer: function(id) 
    {
        this.props.onProcFavoriteBeer(id);
    },
    render: function()
    {
        //console.log(this.props.beer);
        return (
            <div className="column is-one-third">
                <div className="box">
                    {/*<nav className="level is-mobile">
                        <div className="level-left">
                            <a className="level-item">
                                <span className="icon is-small"><i className="fa fa-star-o"></i></span>
                            </a>
                        </div>
                    </nav>*/}
                    <a className="level-right">
                        <span className="icon is-small">
                            <i className="fa fa-star-o" 
                                onClick={this.handleFavoriteBeer.bind(this, this.props.beer._id)}>
                            </i>
                        </span>
                    </a>
                    <article className="media">
                        <div className="media-left">
                            <figure className="image is-24x24">
                                <img src={this.props.beer.image_url} alt="Image" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>{this.props.beer.name}</strong>
                                    <br />
                                    {this.props.beer.description}
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        );
    }
});

module.exports = BeerItem;