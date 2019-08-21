const databaseConnection = require("../database/db_connection.js");
const bcrypt = require("bcrypt");
// var SQL = require("sql-template-strings");

// Gets a tables of the usernames and the passwords
const getUsers = (username, password, cb) => {
  databaseConnection.query(
    `SELECT username,password
     FROM users 
     WHERE username LIKE '${username}';`,
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        console.log("users", res.rows[0].password);
        // bcrypt.compare()
        cb(null, res.rows);
      }
    }
  );
};

//Gets a table of the usernames and thier results
const getResults = cb => {
  databaseConnection.query(
    `SELECT users.username, results.result
    FROM users INNER JOIN results
    ON users.user_id = results.user_id;`,
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        cb(null, res.rows);
      }
    }
  );
};

module.exports = {
  getUsers,
  getResults
};
