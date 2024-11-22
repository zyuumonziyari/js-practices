import sqlite3 from "sqlite3";
import { runPromise, insertPromise, allPromise } from "./book_utils.js";

function main() {
  const db = new sqlite3.Database(":memory:");
  const books = [
    { title: "カビゴン" },
    { title: "カビゴン" },
    { title: "ヤドン" },
  ];

  runPromise(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  )
    .then(() => {
      const bookPromises = books.map((book) => insertPromise(db, book.title));
      return Promise.all(bookPromises);
    })
    .catch((insertError) => {
      console.error(insertError.message);
    })
    .then(() => {
      return allPromise(db, "SELECT name FROM books");
    })
    .catch((selectError) => {
      console.error(selectError.message);
    })
    .finally(() => {
      runPromise(db, "DROP TABLE books").finally(() => db.close());
    });
}
main();
