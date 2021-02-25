var mysql = require("mysql");

// connect with the given mysql database
//const connection = (async) => {
var connection = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "bwgx3p22go7nsj8lsorn",
  password: "vHMTdxdVPB",
  database: "bwgx3p22go7nsj8lsorn",
});
//check the connection with database
connection.connect(function (err) {
  if(!err)
  console.log('Database is connected!');
else
  console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
});


module.exports = connection;
