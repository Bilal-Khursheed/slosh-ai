const { json } = require("body-parser");
const cors = require("cors");
const express = require("express");
const connection = require("../../connection/connection");
const app = express();
//const connection = mysql();
app.use(cors());
// this is use to validate user
app.get("/alldoctorsReq", (req, res) => {
  const allDoctor = `SELECT * FROM bwgx3p22go7nsj8lsorn.doctor where status=0;`;
  connection.query(allDoctor, (err, results) => {
    if (err) {
      //will send error message if any
      // console.log("data not working");
      res.send(err);
    } else if (results.length === 0) {
      return res.json({
        message: "The user is not verified",
        status: "Fail",
      });
    } else if (results.length > 0) {
      return res.json({
        data: results,
        status: "Success",
      });
    }
  }); //query ends

  // }
});

module.exports = app;
