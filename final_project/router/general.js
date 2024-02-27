const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    const username = req.body.username
    const password = req.body.password
  
    const user = users.filter(user => user.username === username);
    if(user.length > 0)
        return res.status(400).json({message: "Username already exists"})
    else{
        users.push({"username": username, "password": password})
        return res.status(200).json({users})
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    return res.status(200).send(JSON.stringify({books}, null, 4))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = parseInt(req.params.isbn)
    const book = books[isbn]
    if(book)
        return res.status(200).send(JSON.stringify({book}, null, 4))
    else
        return res.status(404).json({message: "Book Not Found"})
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author
    for(var book in books){
        if(books[book].author === author)
            return res.status(200).json(books[book])
    }
    return res.status(404).json({message: "Book Not Found"})
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title
    for(var book in books){
        if(books[book].title === title)
            return res.status(200).json(books[book])
    }
    return res.status(404).json({message: "Book Not Found"})
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = parseInt(req.params.isbn)
    const book = books[isbn]

    if(book){
        const reviews = book.reviews
        return res.status(200).json(book.reviews)
    }
    return res.status(404).json({message: "Book Not Found"})
});

module.exports.general = public_users;
