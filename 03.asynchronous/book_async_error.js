import sqlite3 from "sqlite3";
import { runPromise, insertAsyncpromise, allPromise } from "./book_utils.js";

async function main() {
  const db = new sqlite3.Database(":memory:");
  const books = [
    { title: "カビゴン" },
    { title: "カビゴン" },
    { title: "ヤドン" },
  ];

  await runPromise(db, "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)");
  
  try {
    const bookPromises = books.map((book) => insertAsyncpromise(db, book.title));
    await Promise.all(bookPromises);
  } catch (insertError) {
    console.error(insertError.message);
  }

  try {  
    await allPromise(db, "SELECT name FROM books");
  } catch (selectError) {
    console.error(selectError.message);
  }

  await runPromise(db, "DROP TABLE books");
  db.close();
}

main();
