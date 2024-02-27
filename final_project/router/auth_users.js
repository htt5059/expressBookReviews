const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username": "user1", "password": "pass1"}];

const isValid = (username)=>{ //returns boolean
    const user = users.filter(user => user.username === username)
    return user.length > 0 ? false : true
}

const authenticatedUser = (username,password)=>{ //returns boolean
    const user = users.filter(user => {
        return user.username === username && user.password === password
    })
    return user.length > 0 ? true : false
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username
    const password = req.body.password

    if(!username || !password)
        return res.status(404).json({message: "Username/Password Missing"})

    if(authenticatedUser(username, password)){
        const accessToken = jwt.sign({
            data: password
        }, "access", {expiresIn: 60 * 60})
        req.session.authorization = {
            accessToken,username
        }
        return res.status(200).json({message: "Login Successfully"})
    }
    return res.status(208).json({message: "Invalid. Check username and password"})
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = parseInt(req.params.isbn)
    var book = books[isbn]
    if(book){

    }
    return res.status(404).json({message: "Book Not Found"})
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
