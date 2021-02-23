const { json } = require("body-parser");
const cors = require("cors");
const express = require("express");
const connection = require("../connection/connection");
const app = express();
//const connection = mysql();
app.use(cors());

app.get("/forgetPassword", (req, res) => {
    var cnic=res.query.CNIC;
    const changePatientPass= `update sql12393732.patient set password='${newPassword}' where cnic='${cnic}';`;
    const changeDoctorPass= `update sql12393732.doctor set password='${newPassword}' where email='${cnic}';`;
    const changeAdminPass= `update sql12393732.adminp set password='${newPassword}' where email='${cnic}';`;
})