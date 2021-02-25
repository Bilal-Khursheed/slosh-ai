const { json } = require("body-parser");
const cors = require("cors");
const express = require("express");
const connection = require("../../connection/connection");
const app = express();
//const connection = mysql();
app.use(cors());
// this is use to validate user
app.get("/patientshistory", (req, res) => {
  console.log("working");
  const cnic = req.query.cnic;
  const role = req.query.role;

  const patientReport2 = `SELECT * FROM bwgx3p22go7nsj8lsorn.report where Patient_ID=${cnic};`;
  const patientReport1 = `SELECT rp.Report_ID, CONCAT(dc.F_Name, '_',dc.L_Name) as Name, rp.Dated,rp.Report_URL,dc.Hospital
  FROM bwgx3p22go7nsj8lsorn.report as rp
  INNER JOIN bwgx3p22go7nsj8lsorn.doctor as dc
  ON rp.Doctor_ID=dc.CNIC where rp.Patient_ID=${cnic};`;

  const patientReport = `SELECT rp.Report_ID, CONCAT(dc.F_Name, '_',dc.L_Name) as Name, rp.Dated,rp.Report_URL,dc.Hospital
  FROM bwgx3p22go7nsj8lsorn.report as rp
  INNER JOIN bwgx3p22go7nsj8lsorn.doctor as dc
  ON rp.Doctor_ID=dc.CNIC where rp.Doctor_ID=${cnic};`;
  if (role == 3) {
    connection.query(patientReport1, (err, results) => {
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
  } else {
    connection.query(patientReport, (err, results) => {
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
  }

  // }
});

module.exports = app;
