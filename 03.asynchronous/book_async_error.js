import sqlite3 from "sqlite3";
import { runPromise, allPromise, closePromise } from "./db_utils.js";

async function main() {
  const db = new sqlite3.Database(":memory:");
  const books = [
    { title: "カビゴン" },
    { title: "カビゴン" },
    { title: "ヤドン" },
  ];

  await runPromise(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  try {
    try {
      for (const book of books) {
        const result = await runPromise(
          db,
          "INSERT INTO books (title) VALUES (?)",
          book.title,
        );
        console.log(`新しく挿入されたレコードのID: ${result.bookId}`);
      }
    } catch (err) {
      throw new Error(`データ挿入時にエラーが発生しました: ${err.message}`);
    }
  } catch(err) {
    console.error(err.message);
  }
  try {
    try {
      const rows = await allPromise(db, "SELECT name FROM books");
      rows.forEach((row) => {
        console.log(`新しく作成されたレコード値: ${row.title}`);
      });
    } catch (err) {
      throw new Error(`データ取得時にエラーが発生しました: ${err.message}`);
    }
  } catch(err) {
    console.error(err.message);
  } finally {
    await runPromise(db, "DROP TABLE books");
    await closePromise(db);
  }
}

main();
