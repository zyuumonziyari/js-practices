import sqlite3 from "sqlite3";

function main() {
  const db = new sqlite3.Database(":memory:");
  const books = [
    { title: "ピカチュウ" },
    { title: "カビゴン" },
    { title: "ヤドン" },
  ];

  db.run(
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    () => {
      db.run(
        "INSERT INTO books (title) VALUES (?)",
        books[0].title,
        function () {
          console.log(`新しく挿入されたレコードのID: ${this.lastID}`);
          db.run(
            "INSERT INTO books (title) VALUES (?)",
            books[1].title,
            function () {
              console.log(`新しく挿入されたレコードのID: ${this.lastID}`);
              db.run(
                "INSERT INTO books (title) VALUES (?)",
                books[2].title,
                function () {
                  console.log(`新しく挿入されたレコードのID: ${this.lastID}`);
                  db.all("SELECT title FROM books", (_, rows) => {
                    rows.forEach((row) => {
                      console.log(`新しく作成されたレコード値: ${row.title}`);
                    });
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
    },
  );
}

main();
