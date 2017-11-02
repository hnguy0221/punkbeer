var React = require("react");
var Search = require("./grandchildren/Search.js");
var Results = require("./grandchildren/Results.js");
var helpers = require("../utils/helpers.js");

var Home = React.createClass(
{
    getInitialState: function()
    {
        return {
            searchTerm: "",
            results: []
        };
    },
    componentWillMount: function()
    {
        helpers.getBeers().then(function(data) 
        {
            if (data !== "") 
            {
                var beers = [];
                //We remove all beers where saved is false before posting the new ones 
                //to avoid duplicates in our database.
                helpers.removeBeers().then(function(response)
                {
                    for (let i = 0; i < data.length; i++)
                    {
                        var beerObj = {
                            name: data[i].name,
                            image_url: data[i].image_url,
                            description: data[i].description,
                            saved: false
                        };
                        //after removing all beers, we post the new ones.
                        helpers.postBeer(beerObj).then(function(response)
                        {
                            //console.log(response.data);
                            //beers.push(data[i]);
                            beers.push(response.data);
                            this.setState({ results: beers });
                        }.bind(this));
                    }
                    //console.log("Beers: ", beers);
                }.bind(this));
            }
            else
            {
                alert("No punk beers");
            }
        }.bind(this));   
    },
    // If the component changes (i.e. if a search is entered)...
    componentDidUpdate: function() 
    {
        if (this.state.searchTerm !== "")
        {
            console.log(this.state.searchTerm);

            helpers.runSearch(this.state.searchTerm).then(function(data) 
            {
                if (data !== "") 
                {
                    //the function (componentDidUpdate) gets called when a 
                    //state changes, reset searchTerm to blank so the 
                    //runQuery() above does not gets called again to fix an 
                    //API error.
                    this.setState({ searchTerm: "" });

                    var beers = [];
                    //We remove all beers where saved is false before posting the new ones 
                    //to avoid duplicates in our database.
                    helpers.removeBeers().then(function(response)
                    {
                        for (let i = 0; i < data.length; i++)
                        {
                            var beerObj = {
                                name: data[i].name,
                                image_url: data[i].image_url,
                                description: data[i].description,
                                saved: false
                            };
                            //after removing all beers, we post the new ones.
                            helpers.postBeer(beerObj).then(function(response)
                            {
                                //console.log(response.data);
                                //beers.push(data[i]);
                                beers.push(response.data);
                                this.setState({ results: beers });
                            }.bind(this));
                        }
                        //console.log("Beers: ", beers);
                    }.bind(this));
                }
                else
                {
                    alert("No punk beers for " + this.state.searchTerm);
                }
            }.bind(this));
        }
    },
    setSearchVal: function(searchVal)
    {
        this.setState({ searchTerm: searchVal })
    },
    handleAddToFavourite: function(id)
    {
        let beers = this.state.results;
        let index = beers.findIndex(x => x._id === id); //loop through beers to find a match. 
        //if match, return that index.
        //update database to save the favorite beer
        let beer = beers[index];
        //console.log("In handleAddToFavourite(), beer: " + JSON.stringify(beer));
        helpers.updateBeer(beer).then(function() 
        {
            beers.splice(index, 1); //remove 1 beer from where index is located
            this.setState({ results: beers });
        }.bind(this));
    },
    render: function()
    {
        return (
            <div className="block">
                <Search 
                    setSearchVal={this.setSearchVal} 
                />
                <Results 
                    beers={this.state.results}
                    processFavoriteBeer={this.handleAddToFavourite}
                />
            </div>
       );
    }
});

module.exports = Home;