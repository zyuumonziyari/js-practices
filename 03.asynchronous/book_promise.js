import sqlite3 from "sqlite3";
import { runPromise, allPromise, closePromise } from "./db_utils.js";

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
    .then(() =>
      runPromise(db, "INSERT INTO books (title) VALUES (?)", books[0].title),
    )
    .then((result) => {
      console.log(`新しく挿入されたレコードのID: ${result.bookId}`);
      return runPromise(
        db,
        "INSERT INTO books (title) VALUES (?)",
        books[1].title,
      );
    })
    .then((result) => {
      console.log(`新しく挿入されたレコードのID: ${result.bookId}`);
      return runPromise(
        db,
        "INSERT INTO books (title) VALUES (?)",
        books[2].title,
      );
    })
    .then((result) => {
      console.log(`新しく挿入されたレコードのID: ${result.bookId}`);
      return allPromise(db, "SELECT title FROM books");
    })
    .then((rows) => {
      rows.forEach((row) => {
        console.log(`新しく作成されたレコード値: ${row.title}`);
      });
      runPromise(db, "DROP TABLE books")
    })
    .finally(() => closePromise(db));
}

main();
