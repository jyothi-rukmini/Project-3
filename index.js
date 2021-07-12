  
require("dotenv").config();

//Framework
const express = require("express");

//database
const database = require("./Database/index");
const mongoose= require("mongoose");

//models

const BookModel = require("./Database/book");
const AuthorModel = require("./Database/author");
const PublicationModel = require("./Database/publication");

//micro secrvices routes
const books = require("./API/Book");
const authors = require("./API/Author");
const publications = require("./API/Publication");

//connect to data base
mongoose.connect(process.env.MONGO_URL,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>console.log("MongoDB connection established!!"));

//intiallizing express
 const RJ = express();

//configurations
 RJ.use(express.json());

 //intializing Microservices

 RJ.use("/book", books);
 RJ.use("/author", authors);
 RJ.use("/publication", publications);
 RJ.listen(3000, ()=> console.log("Server Running!!"));