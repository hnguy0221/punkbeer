var React = require("react");
//Including the Link component from React Router
//to navigate within our application without full
//page reloads
var Link = require("react-router").Link;
var AddNavBar = require("./children/AddNavBar.js");
var Search = require("./children/Search.js");
var Results = require("./children/Results.js");
var helpers = require("./utils/helpers.js")

var Main = React.createClass(
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
        helpers.getTemplateData().then(function(data) 
        {
            if (data !== "") 
            {
                var beers = [];
                for (let i = 0; i < data.length; i++)
                {
                    beers.push(data[i]);
                    //this.setState({ results: beers });
                }
                console.log("Beers: ", beers);
                this.setState({ results: beers });
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

            helpers.runQuery(this.state.searchTerm).then(function(data) 
            {
                if (data !== "") 
                {
                    //the function (componentDidUpdate) gets called when a 
                    //state changes, reset searchTerm to blank so the 
                    //runQuery() above does not gets called again to fix an 
                    //API error.
                    this.setState({ searchTerm: "" });

                    var beers = [];
                    for (let i = 0; i < data.length; i++)
                    {
                        beers.push(data[i]);
                        //this.setState({ results: beers });
                    }
                    console.log("Beers: ", beers);
                    this.setState({ results: beers });
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
        let index = beers.findIndex(x => x.id === id); //loop through beers to find a match. 
        //if match, return that index.
        beers.splice(index, 1); //remove beer from where index is
        this.setState({ results: beers });
    },
    render: function()
    {
        return (
            <div className="block">
                <AddNavBar />
                <Search 
                    setSearchVal={this.setSearchVal} 
                />
                <Results 
                    beers={this.state.results}
                    onAddToFavourite={this.handleAddToFavourite}
                />
            </div>
       );
    }
});

module.exports = Main;