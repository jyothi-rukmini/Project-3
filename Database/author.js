const mongoose = require("mongoose");

//Creating a authors schema
const AuthorSchema = mongoose.Schema({
    ids : Number,
    name : String,
    books : [String],
    
});

//Create a authors model
const AuthorModel = mongoose.model("authors",AuthorSchema);

module.exports = AuthorModel;