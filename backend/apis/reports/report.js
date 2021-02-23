const cors = require("cors");
const express = require("express");
const bodyParse = require("body-parser");
const app = express();
const connection = require("../../connection/connection");

app.use(cors());

//this is use for sending mail for contact us window
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));
//get report
app.get("/getReport", async (req, res) => {
  const Report_ID = req.query.Report_ID;

  const getReport = `SELECT r.Report_ID, r.Dated, r.type, r.result,  CONCAT(p.F_Name, " ", p.L_Name) as pname,p.DOB, CONCAT(d.F_Name, " ", d.L_Name) as dname FROM sql12393732.report as r  INNER JOIN sql12393732.doctor as d  ON r.Doctor_ID=d.CNIC  INNER JOIN sql12393732.patient as p  ON r.Patient_ID=p.CNIC  where Report_ID='${Report_ID}';`;
  connection.query(getReport, (err, results) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else  if(results.length !=0){
      console.log("Report found");
      res.json({
        result: results,
        message: "found",
      });
    }
    else{
      res.json({
        message: "notfound",
      });
    }
  });
});

//add report
app.post("/addReport", async (req, res) => {
  const Report_ID = req.body.Report_ID;
  const Dated = req.body.Dated;
  const Time = req.body.Time;
  const Doctor_ID = req.body.Doctor_ID;
  const Report_URL = req.body.Report_URL;
  const Patient_ID = req.body.Patient_ID;
  const type = req.body.type;
  const result = req.body.finalresult;
  console.log(Report_ID);
  console.log(Dated);
  console.log(Time);
  console.log(Doctor_ID);
  console.log(Report_URL);
  console.log(" here is the iud", Patient_ID);

  const addReport = `INSERT INTO sql12393732.report(Report_ID, Dated, Time, Report_URL, Doctor_ID, Patient_ID, type, result) VALUES ('${Report_ID}', '${Dated}','${Time}', '${Report_URL}','${Doctor_ID}','${Patient_ID}','${type}','${result}');`;
  connection.query(addReport, (err, results) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else{
      console.log("Report added");
      res.send("data added");
    }
  });
});

module.exports = app;
