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
      const insertStatement = db.prepare("INSERT INTO books (title) VALUES (?)");

      insertStatement.run(books[0].title, function(err) {
        if (err) {
          console.error(`データ挿入時にエラーが発生しました: ${err.message}`);
        } else {
          console.log(`新しく挿入されたレコードのID: ${this.lastID}`);

          insertStatement.run(books[1].title, function(err) {
            if (err) {
              console.error(`データ挿入時にエラーが発生しました: ${err.message}`);
            } else {
              console.log(`新しく挿入されたレコードのID: ${this.lastID}`);

              insertStatement.run(books[2].title, function(err) {
                if (err) {
                  console.error(`データ挿入時にエラーが発生しました: ${err.message}`);
                } else {
                  console.log(`新しく挿入されたレコードのID: ${this.lastID}`);

                  insertStatement.finalize(() => {
                    db.all("SELECT title FROM books", (_, rows) => {
                      rows.forEach((row) => {
                        console.log(`新しく作成されたレコード値: ${row.title}`);
                      });

                      db.run("DROP TABLE books", () => {
                        db.close();
                      });
                    });
                  });
                }
              });
            }
          });
        }
      });
    }
  );
}

main();
