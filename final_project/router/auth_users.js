const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ 
    return users.find(user => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const {username, password} = req.body.user;
  const user = authenticatedUser(username,password)
  
  console.log(user)
    if (!user) {
        return res.status(404).json({ message: "No such user" });
    }
    // Generate JWT access token
    let accessToken = jwt.sign({
        data: user
    }, 'access', { expiresIn: 60 * 60 });

    console.log('accessToken: ',accessToken)

    // Store access token in session
    req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const {review} = req.query;
    for (let key in books) {
        if (books[key].isbn === isbn) {
            books[key].reviews = {...books[key].reviews, [req.user.data.username]: review};
            break;
        }
    }
    // console.log('review: ', review)
    // console.log('req.session: ',req.session)
    // console.log('req.user: ',req.user)
    console.log('req.user: ',books)
    res.status(200).send("review has been added!");
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;