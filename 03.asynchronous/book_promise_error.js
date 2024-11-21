import sqlite3 from "sqlite3";
import { runPromise, allPromise, insertStatementPromise } from "./book_utils.js";

function main() {
  const db = new sqlite3.Database(":memory:");
  const books = [
    { title: "カビゴン" },
    { title: "カビゴン" },
    { title: "ヤドン" },
  ];

  runPromise(db, "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)")
  .then(() => {
    const insertStatement = db.prepare("INSERT INTO books (title) VALUES (?)");
    insertStatementPromise(books[0].title, insertStatement)
    .then(() => {
      insertStatementPromise(books[1].title, insertStatement)
    })
    .then(() => {
      insertStatementPromise(books[2].title, insertStatement)
    })
    .then(() => {
      return new Promise((resolve) => {
        insertStatement.finalize(() => {
          resolve();
        });
      });
    })
    .then(() => {
      return allPromise(db);
  })
    .catch((error) => {
      console.error(`データ取得時にエラーが発生しました: ${error.message}`);
    })
    .finally(() => {
      runPromise(db, "DROP TABLE books").finally(() => db.close());
    });
  })
}
main();
