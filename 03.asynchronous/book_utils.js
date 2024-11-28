export const runPromise = (db, query, bookTitle) => {
  return new Promise((resolve, reject) => {
    db.run(query, bookTitle, function (err) {
      if (err) {
        reject(new Error(`データ挿入時にエラーが発生しました: ${err.message}`));
      } else {
        if (bookTitle) {
          console.log(`新しく挿入されたレコードのID: ${this.lastID}`);
        }
        resolve();
      }
    });
  });
};

export const allPromise = (db, query) => {
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(new Error(`データ取得時にエラーが発生しました: ${err.message}`));
      } else {
        rows.forEach((row) => {
          console.log(`新しく作成されたレコード値: ${row.title}`);
        });
        resolve(rows);
      }
    });
  });
};

export const closePromise = (db) => {
  return new Promise((resolve) => {
    db.close(() => resolve());
  });
};
