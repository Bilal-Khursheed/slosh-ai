import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PDFViewer } from "@react-pdf/renderer";
//import pic from "../componets/assests/img/team/1.jpg";
import pic from "../componets/assests/img/team/logo.png";
import { Link, Redirect } from "react-router-dom";
import "tachyons";
//C:\Users\DELL\Desktop\React Work\demoProject\demosite\public\img\team\logo.png
class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigate: false,
      pName: "Bilal",
      dName: "Umer",
      Doctor_ID: "",
      Patient_ID: "",
      Age: "19",
      ReportID: "1234567890",
      Address: "Unknow",
      Date: "27th/Nov/2020",
      result: "not ",
      type: "Breast-Cancer",
    };
  }

  printDocument() {
    // setTimeout(() => { }, 200);

    const input = document.getElementById("output");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4", true);
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      window.open(pdf.output("bloburl"), "Loading...");
      setTimeout(() => this.setState({ navigate: true }), 20);
      pdf.save(this.state.ReportID);
    });
    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   // window.open(pdf.output("bloburl"), "Loading");
    //   const pdf = new jsPDF("p", "mm", "a4");
    //   const pdfWidth = pdf.internal.pageSize.getWidth();
    //   const imgProps = pdf.getImageProperties(imgData);
    //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    //   var width = pdf.internal.pageSize.getWidth();
    //   var height = pdf.internal.pageSize.getHeight();
    //   pdf.addImage(imgData, "Jpeg", 0, 0, width, height);
    //   window.open(pdf.output("bloburl"), "Loading...");
    //   pdf.save("Report.pdf");
    // });

    /*
    const input = document.getElementById("output");
    html2canvas(input).then((canvas) => {
      var imgWidth = 200;
      var pageHeight = 290;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      var position = 0;
      var heightLeft = imgHeight;
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      pdf.save("download.pdf");
    });
        /*
    var doc = new jsPDF("p", "pt");

    doc.text(20, 20, "This is the first title.");

    doc.setFont("helvetica");
    doc.setFontType("normal");
    doc.text(20, 60, "This is the second title.");

    doc.setFont("helvetica");
    doc.setFontType("normal");
    doc.text(20, 100, "This is the thrid title.");

    doc.save("demo.pdf");*/
  }
  async componentWillMount() {
    var data = localStorage.getItem("report");
    var data4 = sessionStorage.getItem("doctor");
    var res = localStorage.getItem("result");
    //var ress = JSON.parse(res);
    this.setState({ result: res });
    // console.log(res);
    var data2 = JSON.parse(data);
    var data3 = JSON.parse(data4);

    var Report_ID, Doctor_ID, Patient_ID;
    var newDate = new Date();
    var time = newDate.getTime();
    var seconds = (time / 1000) % 60;
    var minutes = (time / (1000 * 60)) % 60;
    var hours = (time / (1000 * 60 * 60)) % 24;
    // console.log("tine is ", ~~hours, "hr/", ~~minutes, "min/", ~~seconds + "s");
    var c_time = ~~hours + "hr" + ~~minutes + "min  " + ~~seconds + "s";
    // console.log("c time is " + c_time);
    var datetime =
      newDate.getDate() +
      "/" +
      (newDate.getMonth() + 1) +
      "/" +
      newDate.getFullYear();
    // console.log(datetime);
    this.setState({ Date: datetime });
    //var detials=JSON.parse( data2.data)
    var i = "";
    for (i in data2.data) {
      var Pname = data2.data[i].F_Name + " " + data2.data[i].L_Name;
      this.setState({ pName: Pname });
      this.setState({ Age: data2.data[i].DOB });
      this.setState({ ReportID: data2.data[i].CNIC + ~~seconds + ~~minutes });
      Report_ID = data2.data[i].CNIC + ~~seconds + ~~minutes;
      this.setState({ Address: data2.data[i].Address });
      this.setState({ Patient_ID: data2.data[i].CNIC });
      Patient_ID = data2.data[i].CNIC;
    }
    var i = "";
    for (i in data3.data) {
      var Dname = data3.data[i].F_Name + "" + data3.data[i].L_Name;
      this.setState({ dName: Dname });
      this.setState({ Doctor_ID: data3.data[i].CNIC });
      Doctor_ID = data3.data[i].CNIC;
      // console.log("doctor id" + Doctor_ID);
    }
    //Report_ID, Dated, Time, Report_URL, Doctor_ID, Patient_ID

    var Dated = datetime;
    var Time = c_time;
    var type = this.state.type;
    var finalresult = res;

 
    var Report_URL = Report_ID + ".pdf";
    const form = await axios
      .post("/users/addReport", {
        Report_ID,
        Dated,
        Time,
        Doctor_ID,
        Report_URL,
        Patient_ID,
        type,
        finalresult,
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log("your data in stored in database");
          //alert(
          //   "Thanks for you Registration! your data is transferd to Admin will Aknowledge you by Email."
          // );
          //setTimeout(() => this.setState({ navigate: true }), 20);
        }
      })
      .catch((err) => {
        // console.log(err);
      });

    //this.printDocument();
    // console.log("First this called");
  }
  handleChange = () => {
    // var data = localStorage.getItem("report");
    // var data3 = sessionStorage.getItem("doctor");
    // var data2 = JSON.parse(data);
    // //var detials=JSON.parse( data2.data)
    // var i = "";
    // for (i in data2.data) {
    //   var Pname = data2.data[i].F_Name + "" + data2.data[i].L_Name;
    //   this.setState({ pName: Pname });
    //   this.setState({ Age: data2.data[i].DOB });
    //   this.setState({ ReportID: data2.data[i].CNIC + "1" });
    //   this.setState({ Address: data2.data[i].Address });
    // }
    // var i = "";
    // for (i in data3.data) {
    //   var Dname = data3.data[i].F_Name + "" + data3.data[i].L_Name;
    //   this.setState({ dName: Dname });
    // }
    // this.printDocument();
  };

  render() {
    if (this.state.navigate) {
      localStorage.clear();
      return <Redirect to="/doctorportal" />;
    }
    {
    }
    return (
      <div onLoad={this.handleChange} className="bg-white black">
        <div id="output" style={{ color: "black" }}>
          <div class="container ">
            <div class="bg-light">
              <div class="pt-5 px-3 text-center">
                <img
                  class="d-inline mx-auto mb-4"
                  src={pic}
                  alt=""
                  width="72"
                  height="72"
                ></img>
                <h1 class="d-inline text-center mx-4 text-center">
                  Medical Imaging and Diagnostic System
                </h1>{" "}
                <br /> <br />
              </div>
              <div>
                <table class="table text-center mb-5">
                  <thead>
                    <tr>
                      <th scope="col">Report number</th>
                      <th scope="col">Patient Name</th>
                      <th scope="col">DOB </th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "black" }}>
                    <tr>
                      <th scope="row">{this.state.ReportID}</th>
                      <td>{this.state.pName}</td>
                      <td>{this.state.Age}</td>
                      <td>{this.state.Date}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 class="text-center mt-5">Medical Report</h3>
              <table class="table table-active text-center">
                <thead>
                  <tr>
                    <th scope="col">Test</th>
                    <th scope="col">Image</th>
                    <th scope="col">Result </th>
                    <th scope="col">Reference Range</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Breast Cancer</th>
                    <td>
                      <img src="converted/breast.jpg"></img>
                    </td>
                    <td>{this.state.result}</td>
                    <td>
                      Adult 0.1-1.2 <br /> children 0.2-1
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <footer class="my-5 text-muted text-center text-small">
              <hr style={{ height: "100%" }} />
              <p class="mb-1" style={{ color: "black" }}>
                This is a computer generated report and should be signed by a
                radiologist
              </p>
              <hr style={{ height: "100%" }} />
              <p class="my-0" style={{ color: "black" }}>
                <strong> Dr. {this.state.dName}</strong>
              </p>
              <p class="my-0" style={{ color: "black" }}>
                <strong> MBBS, Mphil, FCPS</strong>
              </p>
              <p class="my-0" style={{ color: "black" }}>
                Radiologist
              </p>
              <button onClick={window.print} className="btn btn-light">
                {" "}
                Print
              </button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
export default Report;
