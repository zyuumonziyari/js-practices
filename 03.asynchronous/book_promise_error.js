import sqlite3 from "sqlite3";
import { runPromise, allPromise } from "./book_utils.js";

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
      let bookPromise = Promise.resolve();
      for (let i = 0; i < books.length; i++) {
        bookPromise = bookPromise.then(() =>
          runPromise(
            db,
            "INSERT INTO books (title) VALUES (?)",
            books[i].title,
          ),
        );
      }
      return bookPromise;
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
