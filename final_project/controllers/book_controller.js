let books = require("../router/booksdb");

const getAllBooks = (req, res) => {
    return new Promise((resolve, reject) => {
        resolve(JSON.stringify({books}, null, 4))
        reject(JSON.stringify({message: "Something Wrong"}))
    })
    // return res.status(200).send(JSON.stringify({books}, null, 4))
}

const getBookByISBN = (req, res) => {
    return new Promise((resolve, reject) => {
        const isbn = parseInt(req.params.isbn)
        const book = books[isbn]
        if(book)
            resolve(JSON.stringify({book}, null, 4))
        else
            reject("Book Not Found")
    })
}

const getBookByAuthor = (req, res) => {
    return new Promise((resolve, reject) => {
        const author = req.params.author
        for(var book in books){
            if(books[book].author === author)
                resolve(JSON.stringify(books[book]))
        }
        reject("Book Not Found")
    })
}

const getBookByTitle = (req, res) => {
    return new Promise((resolve, reject) => {
        const title = req.params.title
        for(var book in books){
            if(books[book].title === title)
                resolve(JSON.stringify(books[book]))
        }
        reject({status: 404, message: "Book Not Found"})
    })
}

module.exports.getAllBooks = getAllBooks
module.exports.getBookByISBN = getBookByISBN
module.exports.getBookByAuthor = getBookByAuthor
module.exports.getBookByTitle = getBookByTitle