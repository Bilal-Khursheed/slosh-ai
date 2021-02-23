const cors = require("cors");
const express = require("express");
const bodyParse = require("body-parser");
const app = express();
const connection = require("../connection/connection");
const nodemailer = require("nodemailer");
const { commit } = require("../connection/connection");
app.use(cors());

//this is use for sending mail for contact us window
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

app.post("/add", async (req, res) => {
  const CNIC = req.body.CNIC;
  const Email = req.body.Email;
  const F_Name = req.body.F_Name;
  const L_Name = req.body.L_Name;
  const Phone_No = req.body.Phone_No;
  const Password = req.body.Password;
  const Hospital = req.body.Hospital;
  const Address = req.body.Address;
  const City = req.body.City;
  const State = req.body.State;
  const Country = req.body.Country;
  const Zip_code = req.body.Zip_code;
  const DOB = req.body.DOB;
  const role = req.body.role;
  const status = req.body.status;
  console.log("CNIC :" + CNIC);
  console.log("email :" + Email);
  console.log("name :" + F_Name);
  console.log("name :" + L_Name);
  console.log("pass :" + Password);
  console.log("role :" + role);
  const addUser = `INSERT INTO sql12393732.patient(cnic,f_name, l_name, Email,dob, Phone_no, Password, street, city, state, country, zip_code,status) VALUES ('${CNIC}', '${F_Name}','${L_Name}', '${Email}',${DOB},'${Phone_No}','${Password}', '${Address}', '${City}', '${State}', '${Country}', '${Zip_code}',${status});`;
  const addAdmin = `INSERT INTO sql12393732.adminp(cnic,f_name, l_name, Email, Phone_no, Password, street, city, state, country, zip_code,status) VALUES ('${CNIC}', '${F_Name}','${L_Name}', '${Email}','${Phone_No}','${Password}', '${Address}', '${City}', '${State}', '${Country}', '${Zip_code}','${status}');`;
  const addDoctor = `INSERT INTO sql12393732.doctor(cnic,f_name, l_name, Email, Phone_no, Password,status,hospital, street, city, state, country, zip_code) VALUES ('${CNIC}', '${F_Name}','${L_Name}', '${Email}','${Phone_No}','${Password}','${status}','${Hospital}', '${Address}', '${City}', '${State}', '${Country}', '${Zip_code}');`;
  if (role === 1) {
    console.log("working in query");
    await connection.query(addDoctor, (err, results) => {
      console.log("working after query");
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("user added");
        res.send("data added");
      }
    });
  } else if (role === 2) {
    console.log("working in query");
    await connection.query(addUser, (err, results) => {
      console.log("working after query");
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("Added");
        res.send("data added");
      }
    });
  } else if (role === 3) {
    console.log("working in query");
    await connection.query(addAdmin, (err, results) => {
      console.log("working after query");
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.send("data added");
      }
    });
  }
  if (status === 0) {
    const htmll = `<p>You have a New contact request </p>
    <h2>Contact Details</h2>
    <ul>
      <li>Name: ${F_Name}</li>
      <li>Email: ${Email}</li>
      <li>UserName: ${L_Name}</li>
    </ul>
    <h3>Message</h3>
    <p>Admin kindly Check the detail and Approve OR cancel request</p>
    <button > <a href='http://localhost:3001/users/reject?Id=${Email}&&role=${role}'>Cancel</a></button>
    <a href='http://localhost:3001/users/approve?Id=${Email}&&role=${role}'>Approve</a>
      `;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "revolutionaltechnologies@gmail.com", //  user
        pass: "Revolutional_123", //  password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"MID System" <revolutionaltechnologies@gmail.com>', // sender address
      to: "umarnazaket97@gmail.com, balich617@gmail.com", // list of receivers
      subject: "Contact Request", // Subject line
      text: "This is for test purpose", // plain text body
      html: htmll, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } else {
    const htmll = `<p>You have been added to the system </p>
    <h2>Contact Details</h2>
    <ul>
      <li>Name: ${F_Name}</li>
      <li>Email: ${Email}</li>
      <li>Password: ${Password}</li>
    </ul>
    <h3>Message</h3>
    <p>Admin kindly Check the detail and Approve OR cancel request</p>
    <button  >Cancel</button>
    <a href='http://localhost:3000/login'>login</a>
      `;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "revolutionaltechnologies@gmail.com", //  user
        pass: "Revolutional_123", //  password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"MID System" <revolutionaltechnologies@gmail.com>', // sender address
      to: Email, // list of receivers
      subject: "MID System", // Subject line
      text: "This is for test purpose", // plain text body
      html: htmll, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
});

module.exports = app;
