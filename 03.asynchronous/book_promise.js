import sqlite3 from "sqlite3";

function main() {
  const db = new sqlite3.Database(":memory:");
  const books = [
    { title: "ピカチュウ" },
    { title: "カビゴン" },
    { title: "ヤドン" },
  ];

  return new Promise((resolve) => {
    db.run(
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
      () => {
        resolve();
      }
    );
  })
  .then(() => {
    const insertStatement = db.prepare("INSERT INTO books (title) VALUES (?)");
    return new Promise((resolve) => {
      insertStatement.run(books[0].title, function () {
        console.log(`新しく挿入されたレコードのID: ${this.lastID}`);
        resolve(this.lastID);
      });
    })
    .then(() => {
      return new Promise((resolve) => {
        insertStatement.run(books[1].title, function () {
          console.log(`新しく挿入されたレコードのID: ${this.lastID}`);
          resolve(this.lastID);
        });
      });
    })
    .then(() => {
      return new Promise((resolve) => {
        insertStatement.run(books[2].title, function () {
          console.log(`新しく挿入されたレコードのID: ${this.lastID}`);
          resolve(this.lastID);
        });
      });
    })
    .then(() => {
      insertStatement.finalize();
    });
  })
  .then(() => {
    return new Promise((resolve) => {
      db.all("SELECT title FROM books", (_, rows) => {
        resolve(rows);
      });
    });
  })
  .then((rows) => {
    rows.forEach((row) => {
      console.log(`新しく作成されたレコード値: ${row.title}`);
    });
  })
  .then(() => {
    return new Promise((resolve) => {
      db.run("DROP TABLE books", () => {
        resolve();
      });
    });
  })
  .finally(() => {
    db.close();
  });
}
main();
