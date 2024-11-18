export const createTable = (db) => {
    return new Promise((resolve) => {
    db.run(
        "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
        () => {
          resolve();
        },
      );
    })
}

export const dropTable = (db) => {
    return new Promise((resolve) => {
        db.run("DROP TABLE books", () => {
          resolve();
        });
      });
}
