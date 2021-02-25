const { json } = require("body-parser");
const cors = require("cors");
const express = require("express");
const connection = require("../connection/connection");
const app = express();
//const connection = mysql();
app.use(cors());

app.get("/forgetPassword", (req, res) => {
    var cnic=res.query.CNIC;
    const changePatientPass= `update bwgx3p22go7nsj8lsorn.patient set password='${newPassword}' where cnic='${cnic}';`;
    const changeDoctorPass= `update bwgx3p22go7nsj8lsorn.doctor set password='${newPassword}' where email='${cnic}';`;
    const changeAdminPass= `update bwgx3p22go7nsj8lsorn.adminp set password='${newPassword}' where email='${cnic}';`;
})