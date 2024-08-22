import fs from "fs";
import sqlite3 from "sqlite3";

function createTable(db, callback) {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    callback,
  );
}

function insertBook(insert_statement, book, callback) {
  insert_statement.run(book.title, function (err) {
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

function initializeAndExecute() {
  const db = new sqlite3.Database(":memory:");
  const data = fs.readFileSync("books_error.json");
  const books = JSON.parse(data);

  createTable(db, () => {
    const insert_statement = db.prepare("INSERT INTO books (title) VALUES (?)");
    let insertCount = 0;

    books.forEach((book) => {
      insertBook(insert_statement, book, () => {

        insertCount++;
        if (insertCount === books.length) {
          insert_statement.finalize(() => {
            fetchAllBooks(db, () => {
              db.close();
            });
          });
        }
      });
    });
  });
}

initializeAndExecute();
