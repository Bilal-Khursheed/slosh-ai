const { json } = require("body-parser");
const cors = require("cors");
const express = require("express");
const connection = require("../connection/connection");
const app = express();
//const connection = mysql();
app.use(cors());
// this is use to validate user
app.get("/changepass", (req, res) => {
  //get this concept from mosh on youtube (restapi)
  const { email, oldPassword, newPassword, role } = req.query;
  // console.log("email" + email);
  // console.log("old pass working" + oldPassword);
  // console.log("new pass working" + newPassword);

  const verifyDoctor = `SELECT * FROM bwgx3p22go7nsj8lsorn.doctor where email='${email}' and password='${oldPassword}';`;
  const verifypatient = `SELECT * FROM bwgx3p22go7nsj8lsorn.patient where email='${email}' and password='${oldPassword}';`;
  const verifyAdmin = `SELECT * FROM bwgx3p22go7nsj8lsorn.adminp where email='${email}' and password='${oldPassword}';`;
  const changePatientPass = `update bwgx3p22go7nsj8lsorn.patient set password='${newPassword}' where email='${email}';`;
  const changeDoctorPass = `update bwgx3p22go7nsj8lsorn.doctor set password='${newPassword}' where email='${email}';`;
  const changeAdminPass = `update bwgx3p22go7nsj8lsorn.adminp set password='${newPassword}' where email='${email}';`;
  if (role == 1) {
    //for user(patient)
    connection.query(verifyAdmin, (err, results) => {
      // console.log("length" + results.length);
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
        connection.query(changeAdminPass, (err, results) => {
          if (err) {
            //will send error message if any
            res.send(err);
          } else {
            return res.json({
              data: results,
              message: "The user password is changed",
              status: "passChange",
            });
          }
        }); //end of second query
      } // end of inner else if
    }); /// end of first query run
  } else if (role == 2) {
    // for doctor
    connection.query(verifyDoctor, (err, results) => {
      // console.log("length" + results.length);
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
        connection.query(changeDoctorPass, (err, results) => {
          if (err) {
            //will send error message if any
            res.send(err);
          } else {
            return res.json({
              data: results,
              message: "The user password is changed",
              status: "passChange",
            });
          }
        }); //end of second query
      } // end of inner else if
    });
  } //end of else if outer
  else if (role == 3) {
    connection.query(verifypatient, (err, results) => {
      // console.log("length" + results.length);
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
        connection.query(changePatientPass, (err, results) => {
          if (err) {
            //will send error message if any
            res.send(err);
          } else {
            return res.json({
              data: results,
              message: "The user password is changed",
              status: "passChange",
            });
          }
        }); //end of second query
      } // end of inner else if
    });
  } //end of all if else
  // }
});

module.exports = app;
