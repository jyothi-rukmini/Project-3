//Framework
const express  = require("express");

//Database
const database = require("./Database/index");

//Intializing Express
const RJ = express();

//Configurations
RJ.use(express.json());

/*
Route            /
Description      to get all books
Access           public
Parameters       none
Method           get
 */
RJ.get("/",(req,res) =>{
    return res.json({books : database.books});
});

/*
Route            /
Description      to get specific book based on isbn
Access           public
Parameters       isbn
Method           get
 */

RJ.get("/:isbn",(req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === req.params.isbn
    );

    if(getSpecificBook.length === 0) {
        return res.json({ error : `No books found for the ISBN of ${req.params.isbn}`,
    });
    }
    return res.json({book : getSpecificBook});
});

/*
Route            /Category
Description      to get books based on a category
Access           public
Parameters       category
Method           get
 */

RJ.get("/c/:category", (req,res) =>{
    const getSpecificBooks = database.books.filter(
        (book) => book.category.includes(req.params.category)
    );

    if(getSpecificBooks.length === 0) {
        return res.json({ error : `No books found for the category of ${req.params.category}`,
    });
    }
    return res.json({book : getSpecificBooks});
});

RJ.get("/a/:authors", (req,res) =>{
    const getSpecificBooks = database.books.filter(
        (book) => book.authors.includes(req.params.authors)
    );

    if(getSpecificBooks.length === 0) {
        return res.json({ error : `No books found for the category of ${req.params.authors}`,
    });
    }
    return res.json({book : getSpecificBooks});
});

RJ.listen(3000,() => console.log("Hi Jyothi , Server running!!!"));