import fs from "fs";
import sqlite3 from "sqlite3";
import { createTable, closeTable } from "./book.js";

function insertBook(insertStatement, book, callback) {
  insertStatement.run(book.title, function (err) {
    if (err) {
      console.error(`データ挿入時にエラーが発生しました: ${err.message}`);
      callback(err);
    } else {
      console.log(`新しく挿入されたレコードのID: ${this.lastID}`);
      callback();
    }
  });
}

function fetchAllBooks(db, callback) {
  db.all("SELECT author FROM books", function (err, rows) {
    if (err) {
      console.error("データ取得時にエラーが発生しました:", err.message);
      callback(err);
    } else {
      rows.forEach((row) => {
        console.log(`新しく作成されたレコード値: ${row.title}`);
      });
      callback();
    }
  });
}

function main() {
  const db = new sqlite3.Database(":memory:");
  const data = fs.readFileSync("books_error.json");
  const books = JSON.parse(data);

  createTable(db, () => {
    const insertStatement = db.prepare("INSERT INTO books (title) VALUES (?)");
    let insertCount = 0;

    books.forEach((book) => {
      insertBook(insertStatement, book, () => {
        insertCount++;
        if (insertCount === books.length) {
          insertStatement.finalize(() => {
            fetchAllBooks(db, () => {
              closeTable(db, () => {
                db.close();
              });
            });
          });
        }
      });
    });
  });
}

main();
