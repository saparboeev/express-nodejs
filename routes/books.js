const express = require("express");
const routes = express.Router();
const books = require("../books.json");
const path = require("path");
const fs = require("fs");

routes.get("/books", (req, res) => {
  res.send(books);
});

routes.get("/books/:id", (req, res) => {
  function getData(id) {
    if (!id) {
      return books;
    }
    for (var i = 0; i < books.length; i++) {
      if (books[i].id == id) {
        return books[i];
      }
    }
    return "Nothing found";
  }
  res.send(getData(req.params.id));
});

routes.get("/add-books", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/views/add-books.html"));
});

routes.post("/post-books", (req, res) => {
  books.push({
    id: books[books.length - 1].id + 1,
    title: req.body.title,
    author: req.body.author,
  });
  fs.writeFile(
    path.join(__dirname, "..", "/books.json"),
    JSON.stringify(books, null, 4),
    (err) => {
      if (err) throw err;
    }
  );
  res.redirect("/books");
});

routes.put("/books/:id", (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;
  const book = books.find((element, value) => element.id == id);
  if (!book) {
    return res.send("Not found");
  }

  book.title = title || book.title;
  book.author = author || book.author;

  fs.writeFile(
    path.join(__dirname, "..", "/books.json"),
    JSON.stringify(books),
    (err) => {
      if (err) throw err;
    }
  );
  res.send(book);
});

routes.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const bookElems = books.filter((element, value) => element.id != id);

  fs.writeFile(
    path.join(__dirname, "..", "/books.json"),
    JSON.stringify(bookElems),
    (err) => {
      if (err) throw err;
    }
  );
  res.redirect("/books");
});

module.exports = routes;
