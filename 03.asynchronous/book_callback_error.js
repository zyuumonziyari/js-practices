import fs from "fs";
import sqlite3 from "sqlite3";

function main() {
  const db = new sqlite3.Database(":memory:");
  const data = fs.readFileSync("books_error.json");
  const books = JSON.parse(data);

  db.run("CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)", function() {
    const insertStatement = db.prepare("INSERT INTO books (title) VALUES (?)");
    let insertCount = 0;

    books.forEach((book) => {
      insertStatement.run(book.title, function (err) {
        if (err) {
          console.error(`データ挿入時にエラーが発生しました: ${err.message}`);
        } else {
          console.log(`新しく挿入されたレコードのID: ${this.lastID}`);
        }
        insertCount++;

        if (insertCount === books.length) {
          insertStatement.finalize(() => {
            db.all("SELECT author FROM books", function (err, rows) {
              if (err) {
                console.error("データ取得時にエラーが発生しました:", err.message);
              } else {
                rows.forEach((row) => {
                  console.log(`新しく作成されたレコード値: ${row.title}`);
                });
              }

              db.run("DROP TABLE books", function () {
                db.close();
              });
            });
          });
        }
      });
    });
  });
}

main();
