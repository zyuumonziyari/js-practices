import sqlite3 from "sqlite3";
import { runPromise } from "./book_utils.js";

function main() {
  const db = new sqlite3.Database(":memory:");
  const books = [
    { title: "ピカチュウ" },
    { title: "カビゴン" },
    { title: "ヤドン" },
  ];

  runPromise(db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)")
    .then(() => {
      const insertStatement = db.prepare("INSERT INTO books (title) VALUES (?)");
      const insertBook = (book) => {
        return new Promise((resolve) => {
          insertStatement.run(book.title, function () {
            console.log(`新しく挿入されたレコードのID: ${this.lastID}`);
            resolve(this.lastID);
          });
        });
      };
      return insertBook(books[0])
        .then(() => insertBook(books[1]))
        .then(() => insertBook(books[2]))
        .then(() => {
          return new Promise((resolve) => {
            insertStatement.finalize(() => {
              resolve();
            });
          });
        });
    })
    .then(() => {
      return new Promise((resolve) => {
        db.all("SELECT title FROM books", (_, rows) => {
          resolve(rows);
        });
      });
    })
    .then((rows) => {
      rows.forEach((row) => {
        console.log(`新しく作成されたレコード値: ${row.title}`);
      });
    })
    .then(() => {
        runPromise(db, "DROP TABLE books")      
    })
    .finally(() => {
      db.close();
    });
}
main();
