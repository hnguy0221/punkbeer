var React = require("react");

var Search = React.createClass(
{
    // Here we set a generic state associated with the text being searched for
    getInitialState: function() 
    {
        return {
            searchTerm: ""
        };
    },
    // This function will respond to the user input
    handleChangeTerm: function(event) {
        this.setState({ searchTerm: event.target.value });
    },
    // When a user searches...
    handleSearch: function(event) {
        // prevent the HTML from trying to submit a form if the user hits "Enter" instead of
        // clicking the Search button
        event.preventDefault();
        // Set the parent to have the search term
        this.props.setSearchVal(this.state.searchTerm);
        //clear out the search input
        this.setState({ searchTerm: "" });
    },
    render: function() 
    {
        var centerBlock = {
            textAlign: "center"
        };
        return (
            <div className="block">
                <br />
                <br />
                <div className="columns">
                    <div className="column is-mobile is-centered">
                        <form onSubmit={this.handleSearch}>
                            <div className="field has-addons">
                                <p className="control">
                                    <input 
                                        value={this.state.searchTerm}
                                        type="text" 
                                        className="input" 
                                        placeholder="Search for beer..." 
                                        onChange={this.handleChangeTerm}
                                        required
                                    />
                                </p>
                                <p className="control">
                                    <button type="submit" className="button is-info">Search</button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Search;