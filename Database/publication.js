const mongoose = require("mongoose");

//Creating a book schema
const PublicationSchema = mongoose.Schema({
    ids : Number,
    name : String,
    books : [String],
    
});

//Create a book model
const PublicationModel = mongoose.model("publications",PublicationSchema);
module.exports = PublicationModel;