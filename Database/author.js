const mongoose = require("mongoose");

//Creating a book schema
const AuthorSchema = mongoose.Schema({
    ids : Number,
    name : String,
    books : [String],
    
});

//Create a book model
const AuthorModel = mongoose.model(AuthorSchema);

module.exports = AuthorModel;