import fs from "fs";
import sqlite3 from "sqlite3";
import {
  createTable,
  insertBooks,
  fetchAllBooks,
  closeTable,
} from "./book_promise.js";

async function main() {
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
  await closeTable(db);
  db.close();
}

main();
