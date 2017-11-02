var React = require("react");
var BeerItem = require("./greatgrandchildren/BeerItem.js");

var Results = React.createClass(
{
    procFavoriteBeer: function(id)
    {
        this.props.processFavoriteBeer(id);
    },
    render: function()
    {
        let beerItems = [];
        if (this.props.beers.length !== 0)
        {
            beerItems = this.props.beers.map((beer, i) => {
                return (
                    <BeerItem 
                        key={i} 
                        beer={beer}
                        onProcFavoriteBeer={this.procFavoriteBeer}
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