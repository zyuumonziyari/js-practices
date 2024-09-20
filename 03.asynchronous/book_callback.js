import fs from "fs";
import sqlite3 from "sqlite3";

export function createTable(db, callback) {
  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    callback,
  );
}

function insertBook(insertStatement, book, callback) {
  insertStatement.run(book.title, function () {
    console.log(`新しく挿入されたレコードのID: ${this.lastID}`);
    callback();
  });
}

function fetchAllBooks(db, callback) {
  db.all("SELECT title FROM books", function (_, rows) {
    rows.forEach((row) => {
      console.log(`新しく作成されたレコード値: ${row.title}`);
    });
    callback();
  });
}

export function closeTable(db, callback) {
  db.run("DROP TABLE BOOKS", callback);
}

function main() {
  const db = new sqlite3.Database(":memory:");
  const data = fs.readFileSync("books.json");
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

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
