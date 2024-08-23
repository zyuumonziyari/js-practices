import fs from "fs";
import sqlite3 from "sqlite3";
import { createTable, closeTable } from "./book_promise.js";

export function insertBooks(db, books) {
  return new Promise((resolve) => {
    const insert_statement = db.prepare("INSERT INTO books (title) VALUES (?)");

    const promises = books.map((book) => {
      return new Promise((resolve, reject) => {
        insert_statement.run(book.title, function (err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        });
      });
    });

    Promise.allSettled(promises).then((results) => {
      const ids = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      const reasons = results
        .filter((result) => result.status === "rejected")
        .map((result) => `エラーが発生しました: ${result.reason}`);

      insert_statement.finalize(() => {
        resolve({ ids, reasons });
      });
    });
  });
}

export function fetchAllBooks(db) {
  return new Promise((resolve, reject) => {
    db.all("SELECT author FROM books", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

function initializeAndExecute() {
  const data = fs.readFileSync("books_error.json");
  const books = JSON.parse(data);
  const db = new sqlite3.Database(":memory:");

  createTable(db)
    .then(() => insertBooks(db, books))
    .then(({ ids, reasons }) => {
      ids.forEach((id) => {
        console.log(`新しく挿入されたレコードのID: ${id}`);
      });
      reasons.forEach((reason) => {
        console.error(reason);
      });
      return fetchAllBooks(db);
    })
    .then((rows) => {
      rows.forEach((row) => {
        console.log(`新しく作成されたレコード値: ${row.title}`);
      });
    })
    .catch((err) => {
      console.error("エラーが発生しました:", err.message);
    })
    .finally(() => {
      closeTable(db).then(() => {
        db.close();
      });
    });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  initializeAndExecute();
}
