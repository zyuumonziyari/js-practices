import sqlite3 from "sqlite3";
import { runPromise, allPromise, closePromise } from "./book_utils.js";

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
  .then(() => runPromise(db, "INSERT INTO books (title) VALUES (?)", books[0].title))
  .then(() => runPromise(db, "INSERT INTO books (title) VALUES (?)", books[1].title))
  .then(() => runPromise(db, "INSERT INTO books (title) VALUES (?)", books[2].title))
  .catch((insertError) => {
    console.error(insertError.message);
    return allPromise(db, "SELECT name FROM books");
  })
  .catch((selectError) => {
    console.error(selectError.message);
    return runPromise(db, "DROP TABLE books");
  })
  .finally(() => closePromise(db));
}

main();
