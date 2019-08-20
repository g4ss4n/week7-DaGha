const fs = require("fs");
const dbConnection = require("./db_connection");
const sql = fs.readFileSync(`${__dirname}/db_build.sql`).toString();

dbConnection.query(sql, (err, results) => {
  console.log(err);
  console.log("DB created with the results:", results);
});

const runDbBuild = cb => dbConnection.query(sql, cb);
module.exports = runDbBuild;
