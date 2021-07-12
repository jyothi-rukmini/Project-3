const mongoose = require("mongoose");

//Creating a publiaction schema
const PublicationSchema = mongoose.Schema({
    ids : Number,
    name : String,
    books : [String],
    
});

//Create a publication model
const PublicationModel = mongoose.model("publications",PublicationSchema);
module.exports = PublicationModel;