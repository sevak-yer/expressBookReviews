const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

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

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  res.send({books});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    let book;
    for (let key in books) {
        if (books[key].isbn === isbn) {
            book = books[key];
            break;
        }
    }
    res.send(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    let book;
    for (let key in books) {
        if (books[key].author === author) {
            book = books[key];
            break;
        }
    }
    res.send(book);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
    let book;
    for (let key in books) {
        if (books[key].title === title) {
            book = books[key];
            break;
        }
    }
    res.send(book);
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
