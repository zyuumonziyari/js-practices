import fs from "fs";
import sqlite3 from "sqlite3";

function outputData() {
  const db = new sqlite3.Database(":memory:");
  const data = fs.readFileSync("books.json", "utf8");
  const books = JSON.parse(data);

  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    function () {
      const insert_statement = db.prepare(
        "INSERT INTO books (title) VALUES (?)",
      );
      let insertCount = 0;

      //jsonデータ2つ目の読み取りで、一位性に反するためエラーを発生させる。insertに失敗した場合、DB上でカラム及びそのidは作成されない。this.lastIDが3になることはない。
      for (let i = 0; i < books.length; i++) {
        insert_statement.run(books[i].title, function (err) {
          if (err) {
            console.error("データ挿入エラー:", err.message);
            insertCount++;
          } else {
            console.log(`新しく挿入されたレコードのID: ${this.lastID}`);
            insertCount++;
          }

          if (insertCount === books.length) {
            insert_statement.finalize(() => {
              db.all("SELECT title FROM books", function (err, rows) {
                if (err) {
                  console.error("データ取得エラー:", err.message);
                } else {
                  rows.forEach((row) => {
                    console.log(`新しく作成されたレコード値: ${row.title}`);
                  });
                }
                db.close();
              });
            });
          }
        });
      }
    },
  );
}

outputData();
