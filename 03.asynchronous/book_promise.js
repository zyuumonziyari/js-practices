import fs from "fs";
import sqlite3 from "sqlite3";

export function createTable(db) {
  return new Promise((resolve) => {
    db.run(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      function () {
        resolve();
      },
    );
  });
}

export function insertBooks(db, books) {
  return new Promise((resolve) => {
    const insert_statement = db.prepare("INSERT INTO books (title) VALUES (?)");

    const promises = books.map((book) => {
      return new Promise((resolve) => {
        insert_statement.run(book.title, function () {
          resolve(this.lastID);
        });
      });
    });

    Promise.all(promises).then((ids) => {
      insert_statement.finalize(function () {
        resolve(ids);
      });
    });
  });
}

export function fetchAllBooks(db) {
  return new Promise((resolve) => {
    db.all("SELECT title FROM books", (_, rows) => {
      resolve(rows);
    });
  });
}

function initializeAndExecute() {
  const data = fs.readFileSync("books.json");
  const books = JSON.parse(data);
  const db = new sqlite3.Database(":memory:");

  createTable(db)
    .then(() => insertBooks(db, books))
    .then((ids) => {
      ids.forEach((id) => {
        console.log(`新しく挿入されたレコードのid: ${id}`);
      });
      return fetchAllBooks(db);
    })
    .then((rows) => {
      rows.forEach((row) => {
        console.log(`新しく作成されたレコード値: ${row.title}`);
      });
    })
    .finally(() => db.close());
}

if (import.meta.url === `file://${process.argv[1]}`) {
  initializeAndExecute();
}
