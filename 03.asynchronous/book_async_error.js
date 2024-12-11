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
        console.log(`新しく挿入されたレコードのID: ${result.lastID}`);
      }
    } catch (err) {
      console.error(`レコード挿入時にエラーが発生しました: ${err.message}`);
    }
    try {
      const rows = await allPromise(db, "SELECT name FROM books");
      rows.forEach((row) => {
        console.log(`新しく作成されたレコード値: ${row.title}`);
      });
    } catch (err) {
      console.error(`レコード取得時にエラーが発生しました: ${err.message}`);
    }
    await runPromise(db, "DROP TABLE books");
  } catch (err) {
    console.error(err.message);
  } finally {
    await closePromise(db);
  }
}

main();
