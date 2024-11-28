export const runPromise = (db, query, bookTitle) => {
  return new Promise((resolve, reject) => {
    db.run(query, bookTitle, function (err) {
      if (err) {
        reject(err);
      } else {
        if (bookTitle) {
          resolve(this.lastID);
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
        reject(err);
      } else {
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
