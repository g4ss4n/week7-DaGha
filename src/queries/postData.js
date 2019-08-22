const dbConnection = require("../database/db_connection.js");
const bcrypt = require("bcrypt");

const postData = (username, password, first_name, last_name,response, cb) => {
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      consolr.log("error");
    } else {
      dbConnection.query(
        "INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3 ,$4)",
        [username, hash, first_name, last_name],
        (err, res) => {
          if (err) return cb(err);
          cb(null, res);
        }
      );
     console.log("got to the postdata")

      response.writeHead(302, {'Location': 'public/sign-in.html'});

      response.end();
    }
  });
};

module.exports = postData;
