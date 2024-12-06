export const runPromise = (db, query, ...parameters) => {
  return new Promise((resolve, reject) => {
    db.run(query, ...parameters, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ bookId: this.lastID, changes: this.changes });
      }
    });
  });
};

export const allPromise = (db, query, ...parameters) => {
  return new Promise((resolve, reject) => {
    db.all(query, ...parameters, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

export const closePromise = (db) => {
  return new Promise((resolve, reject) => {
    db.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
