const dbConnection = require('../database/db_connection.js');

const postData = (username,password, first_name, last_name,  cb) => {
  dbConnection.query(
    'INSERT INTO users (username, password, first_name, last_name) VALUES ($1, $2, $3 ,$4)',
    [username,password, first_name, last_name],
    (err, res) => {
      if (err) return cb(err);
      cb(null, res);
    }
  );
};

module.exports = postData;


