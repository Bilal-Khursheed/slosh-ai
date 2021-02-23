const { json } = require("body-parser");
const cors = require("cors");
const express = require("express");
const connection = require("../../connection/connection");
const app = express();
//const connection = mysql();
app.use(cors());
// this is use to validate user
app.get("/allPatient", (req, res) => {
  var Doctor_ID = req.query.Doctor_ID;
  const allDoctor = `SELECT r.Report_ID, p.F_Name,  p.L_Name, p.Email, p.CNIC,p.State, p.Street,p.City,p.Country FROM sql12393732.report as r  INNER JOIN sql12393732.doctor as d  ON r.Doctor_ID=d.CNIC  INNER JOIN sql12393732.patient as p  ON r.Patient_ID=p.CNIC  where r.Doctor_ID='${Doctor_ID}';`;
  connection.query(allDoctor, (err, results) => {
    if (err) {
      //will send error message if any
      console.log("data not working");
      res.send(err);
    } else if (results.length === 0) {
      return res.json({
        message: "The user is not verified",
        status: "Fail",
      });
    } else if (results.length > 0) {
      return res.json({
        data: results,
      });
    }
  }); //query ends

  // }
});
app.get("/allPatients", (req, res) => {
  const allDoctor = `SELECT * FROM sql12393732.patient where status=1`;
  connection.query(allDoctor, (err, results) => {
    if (err) {
      //will send error message if any
      console.log("data not working");
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
