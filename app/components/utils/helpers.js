// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require("axios");

// Helper functions for making API Calls
var helper = {

    // This function serves our purpose of running the query to punk beer api.
    runSearch: function(term) 
    {
        // Beer API
        var queryBaseUrl = "https://api.punkapi.com/v2/beers";
        var queryUrl = "";
        
        queryUrl = queryBaseUrl + "?beer_name=" + term;

        console.log(queryUrl);

        return axios.get(queryUrl).then(function(response) 
        {
            // If get a result, return the result
            //console.log(response.data);
            if (response.data.length !== 0) 
            {
                const beers = [];
                let recordsCnt = response.data.length;
                for (let i = 0; i < recordsCnt; i++)
                {
                    var obj = response.data[i];
                    //console.log(response.data[i].description.length);
                    //get first 100 characters of the description and then add ...
                    if (obj.description.length > 100)
                    {
                        obj.description = obj.description.substring(0, 100) + "...";
                    }
                    //console.log(obj.description);
                    //get first 12 chars of the name and then add ...
                    if (obj.name.length > 12)
                    {
                        obj.name = obj.name.substring(0, 12) + "...";
                    }
                    //console.log(obj.name);
                    beers.push(obj);
                }
                return beers;
            }
            else
            {
                console.log("No data found from punk beer api!")
                // If we don't get any results, return an empty string
                return "";
            }
        });
    },
    // This function serves our purpose of running the query to punk beer api.
    getBeers: function() 
    {
        // Beer API
        var queryBaseUrl = "https://api.punkapi.com/v2/beers";
        var queryUrl = "";
        
        queryUrl = queryBaseUrl 

        console.log(queryUrl);

        return axios.get(queryUrl).then(function(response) 
        {
            // If get a result, return the result
            //console.log(response.data);
            if (response.data.length !== 0) 
            {
                const beers = [];
                let recordsCnt = response.data.length;
                for (let i = 0; i < recordsCnt; i++)
                {
                    var obj = response.data[i];
                    //console.log(response.data[i].description.length);
                    //get first 100 characters of the description and then add ...
                    if (obj.description.length > 100)
                    {
                        obj.description = obj.description.substring(0, 100) + "...";
                    }
                    //console.log(obj.description);
                    //get first 12 chars of the name and then add ...
                    if (obj.name.length > 12)
                    {
                        obj.name = obj.name.substring(0, 12) + "...";
                    }
                    //console.log(obj.name);
                    beers.push(obj);
                }
                return beers;
            }
            else
            {
                console.log("No data found from punk beer api!")
                // If we don't get any results, return an empty string
                return "";
            }
        });
    },
    // This function hits our own server to retrieve a record of query results
    getSavedBeer: function() 
    {
        return axios.get("/api/saved?saved=true");
    },
    // This function updates the beer in our database.
    updateBeer: function(beer) 
    {
        console.log("In updateBeer(), beer: " + JSON.stringify(beer));
        return axios.put("/api", { beer: beer });
    },
    // This function posts new beer to our database.
    postBeer: function(beer) 
    {
        return axios.post("/api", { beer: beer });
    },
    removeBeers: function()
    {
        return axios.delete("/api/all");
    },
    removeSavedBeer: function(beer)
    {
        console.log("ID to delete: " + beer._id);
        return axios.delete("/api", {params: { name: beer.name } });
    }
};

// We export the API helper
module.exports = helper;