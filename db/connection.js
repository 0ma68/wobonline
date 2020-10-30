var sqlite3 = require('sqlite3');

let db = new sqlite3.Database('./db/page.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the page.db database.');
  });

  module.exports = db;