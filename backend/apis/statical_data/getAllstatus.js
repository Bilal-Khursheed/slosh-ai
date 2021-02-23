const cors = require("cors");
const express = require("express");
const bodyParse = require("body-parser");
const app = express();
const connection = require("../../connection/connection");

app.use(cors());

//this is use for sending mail for contact us window
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

app.get("/getStats", async (req, res) => {
  const addReport = `select p.city , p.country , count(*) as total from sql12393732.patient as p inner join sql12393732.report as rep on rep.patient_ID = p.CNIC group by p.city;`;
  connection.query(addReport, (err, results) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("Report data is recovered ");
      res.json({ data: results });
    }
  });
});

app.get("/getstateStats", async (req, res) => {
  const addReport = `select p.state , p.country , count(*) as total from mid.patient as p inner join mid.report as rep on rep.patient_ID = p.CNIC group by p.state;`;
  connection.query(addReport, (err, results) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("Report data is recovered ");
      res.json({ data: results });
    }
  });
});

module.exports = app;
