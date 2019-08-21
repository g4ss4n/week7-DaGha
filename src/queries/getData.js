const databaseConnection = require("../database/db_connection.js");
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

const getUsers = (username, password, cb) => {
  databaseConnection.query(
    `SELECT username,password
     FROM users 
     WHERE username LIKE '${username}';`,
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        var pass = res.rows[0].password;
        console.log("pass:", pass);

        bcrypt.compare(`${password}`, pass, (err, res) => {
          if (err) {
            console.log(err);
          } else {
            if (pass != `${password}`) {
              console.log("msg", "password is incorrect");
            } else {
              console.log("res", res);
              if (!res) {
                console.log("No PASS");
                res.writeHead(500, "Content-Type:text/html");
                res.end("<h1>Inncorrect password, access denied</h1>");
              } else {
                var token = sign(
                  {
                    name: `${username}`,
                    logged_in: true
                  },
                  "ourSecret"
                );
                console.log(token);
                res.writeHead(302, {
                  "Set-Cookie": `data = ${token}; HttpOnly`,
                  Location: "/"
                });
                console.log("Token", token);
                return res.end();
              }
            }
          }
        });
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
