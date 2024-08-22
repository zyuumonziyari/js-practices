import fs from "fs";
import sqlite3 from "sqlite3";

function createTable(db) {
  return new Promise((resolve) => {
    db.run(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      function () {
        resolve();
      },
    );
  });
}

function insertBooks(db, books) {
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

function fetchAllBooks(db) {
  return new Promise((resolve) => {
    db.all("SELECT title FROM books", (_, rows) => {
      resolve(rows);
    });
  });
}

async function initializeAndExecute() {
  const data = fs.readFileSync("books.json");
  const books = JSON.parse(data);
  const db = new sqlite3.Database(":memory:");

  await createTable(db);
  const ids = await insertBooks(db, books);
  ids.forEach((id) => {
    console.log(`新しく挿入されたレコードのID: ${id}`);
  });
  const rows = await fetchAllBooks(db);
  rows.forEach((row) => {
    console.log(`新しく作成されたレコード値: ${row.title}`);
  });
  db.close();
}

initializeAndExecute();
