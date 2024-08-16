const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const {username, password} = req.body;
  const existingUser = users.find(user => user.username === username);

  if (existingUser) {
    res.send(`The user ${existingUser.username} already exist!`);
  } else if (!username || !password) {
    res.send(`Please provide username and password!`);
  } else {
    users.push({username, password})
    res.send(`The user ${username} has been registered!`);
  }
});

public_users.get('/', function (req, res) {
    const getBooks = new Promise((resolve, reject) => {
      if (books) {
        resolve(books);
      } else {
        reject("No books found");
      }
    });
  
    getBooks
      .then((bookList) => {
        res.send({ books: bookList });
      })
      .catch((error) => {
        res.status(404).send({ error: error });
      });
  });

 public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const getBook = new Promise((resolve, reject) => {
        let book;
        for (let key in books) {
            if (books[key].isbn === isbn) {
                book = books[key];
                resolve(book);
                break;
            }
        }
        reject("Book not found"); 
    });
  
    getBook
      .then((book) => {
        res.send(book);
      })
      .catch((error) => {
        res.status(404).send({ error: error });
      });
  });

public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const getBook = new Promise((resolve, reject) => {
        let book;
        for (let key in books) {
            if (books[key].author === author) {
                book = books[key];
                resolve(book);
                break;
            }
        }
        reject("Book not found"); 
    });
  
    getBook
      .then((book) => {
        res.send(book);
      })
      .catch((error) => {
        res.status(404).send({ error: error });
      });
  });

public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const getBook = new Promise((resolve, reject) => {
        let book;
        for (let key in books) {
            if (books[key].title === title) {
                book = books[key];
                resolve(book);
                break;
            }
        }
        reject("Book not found"); 
    });
  
    getBook
      .then((book) => {
        res.send(book);
      })
      .catch((error) => {
        res.status(404).send({ error: error });
      });
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
 const isbn = req.params.isbn;
    let reviews;
    for (let key in books) {
        if (books[key].isbn === isbn) {
            reviews = books[key].reviews;
            break;
        }
    }
    res.send({reviews});
});

module.exports.general = public_users;
