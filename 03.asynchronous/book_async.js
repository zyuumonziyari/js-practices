import sqlite3 from "sqlite3";
import { runPromise, allPromise, closePromise } from "./db_utils.js";

async function main() {
  const db = new sqlite3.Database(":memory:");
  const books = [
    { title: "ピカチュウ" },
    { title: "カビゴン" },
    { title: "ヤドン" },
  ];

  try {
    await runPromise(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
    for (const book of books) {
      const result = await runPromise(
        db,
        "INSERT INTO books (title) VALUES (?)",
        book.title,
      );
      console.log(`新しく挿入されたレコードのID: ${result.bookId}`);
    }
    const rows = await allPromise(db, "SELECT title FROM books");
    rows.forEach((row) =>
      console.log(`新しく作成されたレコード値: ${row.title}`),
    );
    await runPromise(db, "DROP TABLE books");
  } finally {
    await closePromise(db);
  }
}

main();
