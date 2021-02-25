const express = require("express");
const bodyParse = require("body-parser");
const cors = require("cors");
//var mysql = require("mysql");
var mysql = require("./backend/connection/connection");

const app = express();
mysql;
app.use(express.json({ extended: false }));
app.use("/user", require("./backend/apis/login")); //use to get login data and will check data from database and will allow the user to login
app.use("/users", require("./backend/apis/signupmail")); // use to store data in database and also mail data to the admin
app.use("/api", require("./backend/apis/contactusMail")); //use to mail the that came from contact us
app.use("/users", require("./backend/apis/signupApprovel")); //admin will approve signup request
app.use("/users", require("./backend/apis/rejectrequest")); //admin will reject signup request
app.use("/users", require("./backend/apis/changePass")); // this is use to update new pass by verifying old pass
app.use("/users", require("./backend/apis/doctorData/getAllDoc")); // this is use to send data
app.use("/users", require("./backend/apis/PatientData/checkcnic")); // this is use to send data
app.use("/users", require("./backend/apis/PatientData/patientHistory")); // this is use to send data
app.use("/users", require("./backend/apis/changeEmail")); // this is use to send data
app.use("/users", require("./backend/apis/PatientData/deletePatient")); // this is use to send data
app.use("/users", require("./backend/apis/doctorData/DoctorRequest")); // this is use to send data
app.use("/users", require("./backend/apis/PatientData/PatientRequest")); // this is use to send data
app.use("/users", require("./backend/apis/PatientData/getAllPatient")); // this is use to send data
app.use("/users", require("./backend/apis/reports/report")); // this is use to send data
app.use("/users", require("./backend/apis/statical_data/getAllstatus")); // this is use to  get stats
// port for local host
const PORT = process.env.PORT || 3001;


if (process.env.NODE_ENV == "production") {
  app.use(express.static("demosite/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "demosite", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  // console.log(`Server is listening on port ${PORT}`);
});
