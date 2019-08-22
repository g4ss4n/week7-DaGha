const databaseConnection = require("../database/db_connection.js");
const bcrypt = require("bcrypt");
const { sign, verify } = require("jsonwebtoken");

const getUsers = (username, password,handlerResponse, cb) => {
  databaseConnection.query(
    `SELECT username,password
     FROM users 
     WHERE username LIKE '${username}';`,
    (err, response) => {
      if (err) {
        cb(err);
      } else {
        var pass = response.rows[0].password;
        var myPass = `${password}`;
        bcrypt.compare(myPass, pass, (err, res) => {
          if (err) {
            console.log(err);
          } else {
              if (!res) {
                handlerResponse.writeHead(500, "Content-Type:text/html");
                handlerResponse.end("Inncorrect password, access denied");
              } else {
                var token = sign(
                  {
                    name: `${username}`,
                    logged_in: true
                  },
                  "ourSecret"
                );
                handlerResponse.writeHead(302, {
                  "Set-Cookie": `data = ${username} logged_in: true`,
                   'Location': "/"
                });
                 handlerResponse.end();
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
