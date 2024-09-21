import sqlite3 from "sqlite3";

function main() {
  const db = new sqlite3.Database(":memory:");
  const books = [
    { title: "ピカチュウ" },
    { title: "カビゴン" },
    { title: "ヤドン" }
  ];

  db.run("CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)", function() {
    const insertStatement = db.prepare("INSERT INTO books (title) VALUES (?)");
    let insertCount = 0;

    books.forEach((book) => {
      insertStatement.run(book.title, function () {
        console.log(`新しく挿入されたレコードのID: ${this.lastID}`);
        insertCount++;
        if (insertCount === books.length) {
          insertStatement.finalize(() => {
            db.all("SELECT title FROM books", function (_, rows) {
              rows.forEach((row) => {
                console.log(`新しく作成されたレコード値: ${row.title}`);
              });
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
