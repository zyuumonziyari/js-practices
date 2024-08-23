import fs from "fs";
import sqlite3 from "sqlite3";
import { createTable, closeTable } from "./book_promise.js";
import { insertBooks, fetchAllBooks } from "./book_promise_error.js";

async function initializeAndExecute() {
  const data = fs.readFileSync("books_error.json");
  const books = JSON.parse(data);
  const db = new sqlite3.Database(":memory:");

  try {
    await createTable(db);
    const { ids, reasons } = await insertBooks(db, books);
    ids.forEach((id) => {
      console.log(`新しく挿入されたレコードのID: ${id}`);
    });
    reasons.forEach((reason) => {
      console.error(reason);
    });
    const rows = await fetchAllBooks(db);
    rows.forEach((row) => {
      console.log(`新しく作成されたレコード値: ${row.title}`);
    });
  } catch (err) {
    console.error("エラーが発生しました:", err.message);
  } finally {
    await closeTable(db);
    db.close();
  }
}

initializeAndExecute();
