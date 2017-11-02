var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BeerSchema = new Schema({
    name: {
        type: String,
    },
    image_url: {
        type: String
    },
    description: {
        type: String
    },
    saved: {
        type: Boolean
    }
});

var Beer = mongoose.model("Beer", BeerSchema);
	
module.exports = Beer;