const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let bookController = require('../controllers/book_controller.js')
const public_users = express.Router();


public_users.post("/register", async (req,res) => {
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
public_users.get('/', (req, res)=> {
    bookController.getAllBooks(req, res).then((response) => res.status(200).send(response))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
    bookController.getBookByISBN(req, res)
        .then((response) => res.status(200).send(response))
        .catch(err => res.status(404).json({message: err}))
});
  
// Get book details based on author
public_users.get('/author/:author', (req, res) => {
    bookController.getBookByAuthor(req, res)
        .then((response) => res.status(200).send(response))
        .catch(err => res.status(404).json({message: err}))
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    bookController.getBookByTitle(req, res)
        .then((response) => res.status(200).send(response))
        .catch(err => res.status(err.status).json({message: err.message}))
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
