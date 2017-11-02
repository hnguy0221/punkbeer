var React = require("react");
var Results = require("./grandchildren/Results.js");
var helpers = require("../utils/helpers.js");
var UniqueArr = require("../utils/UniqueArr.js");

var Favourite = React.createClass(
{
    getInitialState: function()
    {
        return {
            results: []
        };
    },
    componentWillMount: function()
    {
        helpers.getSavedBeer().then(function(response) 
        {
            if (response !== "") 
            {
                var beers = [];
                for (let i = 0; i < response.data.length; i++)
                {
                    var beerObj = 
                    {
                        _id: response.data[i]._id,
                        name: response.data[i].name,
                        image_url: response.data[i].image_url,
                        description: response.data[i].description
                    }
                    beers.push(beerObj);
                    //beers.push(response.data[i]);
                }
                beers = UniqueArr(beers);
                this.setState({ results: beers });
            }
            else
            {
                alert("No favorite punk beers");
            }
        }.bind(this));   
    },
    handleRemoveFavourite: function(id)
    {
        let beers = this.state.results;
        let index = beers.findIndex(x => x._id === id); //loop through beers to find a match. 
        //if match, return that index.
        //remove the favorite beer from database
        helpers.removeSavedBeer(beers[index]).then(function(response)
        {
            beers.splice(index, 1); //remove 1 beer where the index is located.

            this.setState({ results: beers });

        }.bind(this));  
    },
    render: function()
    {
        return (
            <div className="block">
                <br />
                <br />
                <Results 
                    beers={this.state.results}
                    processFavoriteBeer={this.handleRemoveFavourite}
                />
            </div>
       );
    }
});

module.exports = Favourite;