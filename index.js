require("dotenv").config();

//Framework
const express  = require("express");
const mongoose = require("mongoose");

//Database
const database = require("./Database/index");

// Models
const BookModels = require("./Database/book");
const AuthorModels = require("./Database/author");
const PublicationModels = require("./Database/publication");

//Intializing Express
const RJ = express();

//Configurations
RJ.use(express.json());

//Establish database connection
mongoose.connect(process.env.MONGO_URL,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true

}
).then(() => console.log("MongoDB Connection established!!!"));

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

RJ.get("/is/:isbn",(req,res) => {
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


/*
Route            /author
Description      to get list of books based on authors
Access           public
Parameters       category
Method           get
 */

RJ.get("/authors/:name", (req,res) =>{
    const getSpecificAuthors = database.authors.filter(
        (author) => author.name.includes(req.params.name)
    );

    if(getSpecificAuthors.length === 0) {
        return res.json({ error : `No books found for the Author of ${req.params.name}`,
    });
    }
    return res.json({author : getSpecificAuthors});
});



/*
Route            /author
Description      to get all authors
Access           public
Parameters       category
Method           get
 */
RJ.get("/author", (req,res) =>{
    return res.json({ authors:database.authors});
    
});



/*
Route            /author
Description      To get specific author based on id
Access           public
Parameters       category
Method           get
 */


RJ.get("/authors/:ids", (req,res) =>{
    const getSpecificAuthor = database.authors.filter(
        (author) => author.ids==req.params.ids
    );

    if(getSpecificAuthor.length === 0) {
        return res.json({ error : `No Authors found for the id of ${req.params.ids}`,
    });
    }
    return res.json({author : getSpecificAuthor});
});


/*
Route            /author
Description      To get list of all authors based on isbn
Access           public
Parameters       book isbn
Method           get
 */

RJ.get("/author/:isbn", (req, res) => {
  const getSpecificAuthors = database.authors.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificAuthors.length === 0) {
    return res.json({
      error: `No author found for the book ${req.params.isbn}`,
    });
  }

  return res.json({ authors: getSpecificAuthors });
});


/*
Route            /pub
Description      to get all publicationss
Access           public
Parameters       none
Method           get
 */
RJ.get("/pub", (req,res) =>{
    return res.json({publications:database.publications});
    
});


/*
Route            /publ
Description      To get specific publication based on id
Access           public
Parameters       publ
Method           get
 */


RJ.get("/publ/:ids", (req,res) =>{
    const getSpecificPublications = database.publications.filter(
        (publication) => publication.ids==req.params.ids
    );

    if(getSpecificPublications.length === 0) {
        return res.json({ error : `No publications found for the id of ${req.params.ids}`,
    });
    }
    return res.json({publications : getSpecificPublications});
});



/*
Route            /pubs
Description      to get publication based on book isbn
Access           public
Parameters       isbn
Method           get
 */

RJ.get("/pubs/:isbn", (req,res) =>{
    const getSpecificPublication = database.publications.filter(
        (publication) => publication.books.includes(req.params.isbn)
    );

    if(getSpecificPublication.length === 0) {
        return res.json({ error : `No publications found for the isbn of ${req.params.isbn}`,
    });
    }
    return res.json({publications : getSpecificPublication});
});

/*
Route           /book/new
Description     add new books
Access          PUBLIC
Parameters      NONE
Method          POST
*/
RJ.post("/book/new", (req, res) => {
    const { newBook } = req.body;  //ES6 Destructuring
    database.books.push(newBook);
    return res.json({ books: database.books, message: "book was added!" });
  });


  /*
Route           /author/new
Description     add new author
Access          PUBLIC
Parameters      NONE
Method          POST
*/
RJ.post("/author/new", (req, res) => {
    const { newAuthor } = req.body;
    database.authors.push(newAuthor);
    return res.json({ authors: database.authors, message: "author was added!" });
  });


 /*
Route           /publication/new
Description     add new publication
Access          PUBLIC
Parameters      NONE
Method          POST
*/
RJ.post("/publication/new", (req, res) => {
    const { newPublication } = req.body;
    database.publications.push(newPublication);
    return res.json({ publications: database.publications, message: "publications was added!" });
  });


/*
Route           /book/update
Description     update title of a book
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
RJ.put("/book/update/:isbn", (req, res) => {
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        book.title = req.body.bookTitle;
        return;
      }
    });
  
    return res.json({ books: database.books });
  });


/*
Route           /book/author/update
Description     update/add new author
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
RJ.put("/book/author/update/:isbn", (req, res) => {
    // update the book database
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn)
        return book.authors.push(req.body.newAuthor);
    });
  
    // update the author database
    database.authors.forEach((author) => {
      if (author.id === req.body.newAuthor)
        return author.books.push(req.params.isbn);
    });
  
    return res.json({
      books: database.books,
      authors: database.authors,
      message: "New author was added 🚀",
    });
  });
  

/*
Route           /publication/update/book
Description     update/add new book to a publication
Access          PUBLIC
Parameters      isbn
Method          PUT
*/
RJ.put("/publication/update/book/:isbn", (req, res) => {
  // update the publication database
  database.publications.forEach((publication) => {
    if (publication.id === req.body.pubId) {
      return publication.books.push(req.params.isbn);
    }
  });

  // update the book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = req.body.pubId;
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publications,
    message: "Successfully updated publication",
  });
});

/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameters      isbn
Method          DELETE
*/ 

RJ.delete("/book/delete/:isbn", (req, res) => {
  const updatedBookDatabase = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  );
// === : Strictly equal to
// !== : Strictly not equal to
  database.books = updatedBookDatabase;
  return res.json({ books: database.books });
});



/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameters      isbn, author id
Method          DELETE
*/
RJ.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
  // update the book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const newAuthorList = book.authors.filter(
        (author) => author !== parseInt(req.params.authorId)
      );
      book.authors = newAuthorList;
      return;
    }
  });

    // update the author database
    database.authors.forEach((author) => {
      if (author.id === parseInt(req.params.authorId)) {
        const newBooksList = author.books.filter(
          (book) => book !== req.params.isbn
        );
  
        author.books = newBooksList;
        return;
      }
    });
  
    return res.json({
      message: "author was deleted!!!!!!😪",
      book: database.books,
      author: database.authors,
    });
  });




/*
Route           /publication/delete/book
Description     delete a book from publication 
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/
RJ.delete("/publication/delete/book/:isbn/:pubId", (req, res) => {
  // update publication database
  database.publications.forEach((publication) => {
    if (publication.id === parseInt(req.params.pubId)) {
      const newBooksList = publication.books.filter(
        (book) => book !== req.params.isbn
      );

      publication.books = newBooksList;
      return;
    }
  });

  // update book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = 0; // no publication available
      return;
    }
  });

  return res.json({
    books: database.books,
    publications: database.publications,
  });
});


/*
Route           /publication
Description     delete a publication 
Access          PUBLIC
Parameters      isbn, publication id
Method          DELETE
*/



RJ.listen(3000,() => console.log("Hi Jyothi , Server running!!!"));