import sqlite3 from "sqlite3";
import { runPromise, allPromise } from "./book_utils.js";

function main() {
  const db = new sqlite3.Database(":memory:");
  const books = [
    { title: "ピカチュウ" },
    { title: "カビゴン" },
    { title: "ヤドン" },
  ];

  runPromise(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() => {
      let bookPromise = Promise.resolve();
      for (const book of books) {
        bookPromise = bookPromise.then(() =>
          runPromise(db, "INSERT INTO books (title) VALUES (?)", book.title),
        );
      }
      return bookPromise;
    })
    .then(() => {
      return allPromise(db, "SELECT title FROM books");
    })
    .then(() => {
      runPromise(db, "DROP TABLE books");
    })
    .finally(() => db.close());
}

main();
