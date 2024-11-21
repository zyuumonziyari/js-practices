import sqlite3 from "sqlite3";
import { runPromise, insertPromise, allPromise } from "./book_utils.js";

async function main() {
  const db = new sqlite3.Database(":memory:");
  const books = [
    { title: "ピカチュウ" },
    { title: "カビゴン" },
    { title: "ヤドン" },
  ];

  await runPromise(db, "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)")
  const bookPromises = books.map((book) => insertPromise(db, book.title));
  await Promise.allSettled(bookPromises);
  await allPromise(db, "SELECT title FROM books");
  await runPromise(db, "DROP TABLE books");
  db.close();
}
main();
