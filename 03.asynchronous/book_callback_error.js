import sqlite3 from "sqlite3";

function main() {
  const db = new sqlite3.Database(":memory:");
  const books = [
    { title: "カビゴン" },
    { title: "カビゴン" },
    { title: "ヤドン" },
  ];

  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () => {
      db.run(
        "INSERT INTO books (title) VALUES (?)",
        books[0].title,
        function (err) {
          if (err) {
            console.error(
              `レコード挿入時にエラーが発生しました: ${err.message}`,
            );
          } else {
            console.log(`新しく挿入されたレコードのID: ${this.lastID}`);
          }
          db.run(
            "INSERT INTO books (title) VALUES (?)",
            books[1].title,
            function (err) {
              if (err) {
                console.error(
                  `レコード挿入時にエラーが発生しました: ${err.message}`,
                );
              } else {
                console.log(`新しく挿入されたレコードのID: ${this.lastID}`);
              }
              db.all("SELECT name FROM books", (err, rows) => {
                if (err) {
                  console.error(
                    `レコード取得時にエラーが発生しました: ${err.message}`,
                  );
                } else {
                  rows.forEach((row) => {
                    console.log(`新しく作成されたレコード値: ${row.title}`);
                  });
                }
                db.run("DROP TABLE books", () => {
                  db.close();
                });
              });
            },
          );
        },
      );
    },
  );
}

main();
