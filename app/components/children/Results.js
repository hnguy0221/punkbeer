var React = require("react");
var BeerItem = require("./grandchildren/BeerItem.js");

var Results = React.createClass(
{
    addToFavourite: function(id)
    {
        this.props.onAddToFavourite(id);
    },
    render: function()
    {
        let beerItems = [];
        if (this.props.beers.length !== 0)
        {
            beerItems = this.props.beers.map((beer, i) => {
                return (
                    <BeerItem 
                        key={beer.id} 
                        beer={beer}
                        onAddToFavourite={this.addToFavourite}
                    />
                );
            });
        }
        return (
            <div className="columns is-multiline">
                {beerItems}
            </div>
        );
    }
});

module.exports = Results;