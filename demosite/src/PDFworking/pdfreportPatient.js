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
      Report_ID: "1234567890",
      Report_Data: [],
    };
  }
  async componentWillMount() {
    var ReportID = localStorage.getItem("ReportID");
    this.setState({
      Report_ID: ReportID,
    });

    await fetch(`/users/getReport?Report_ID=${ReportID}`)
      .then((respone) => respone.json())
      .then((Result) => {
        if (Result.message == "found") {
          this.setState({
            Report_Data: Result.result,
          });

          // console.log(this.state.Report_Data);
        } else if (Result.message == "notfound") {
          alert("Report ID is not Found");
          this.setState({ navigate: true });
        }
      });
    localStorage.clear();

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
    //this.printDocument();
  };

  render() {
    if (this.state.navigate) {
      return <Redirect to="/patientportal" />;
    }
    return (
      <div className="bg-white black">
        <div id="output" style={{ color: "black" }}>
          {this.state.Report_Data.map((result) => (
            <div>
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
                          <th scope="row">{result.Report_ID}</th>

                          <td>{result.pname}</td>
                          <td>{result.DOB}</td>
                          <td>{result.Dated}</td>
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
                        <th scope="col">Results</th>
                        <th scope="col">unit </th>
                        <th scope="col">Reference Range</th>
                      </tr>
                    </thead>

                    {result.type == "Brain_Tumor" ? (
                      <tbody>
                        <tr>
                          <th scope="row">Skull Striping</th>
                          <td>Yes</td>
                          <td>U/L</td>
                          <td>
                            Adult 0.1-1.2 <br /> children 0.2-1
                          </td>
                        </tr>

                        <tr>
                          <th scope="row">Segmentation</th>
                          <td>yes</td>
                          <td>U/L</td>
                          <td>
                            Adult 0.4-1.9 <br /> children 0.5-2
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">{result.type}</th>
                          <td>{result.result}</td>
                          <td>U/L</td>
                          <td>
                            Adult 0.4-1.9 <br /> children 0.5-2
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <th scope="row">{result.type}</th>
                          <td>{result.result}</td>
                          <td>U/L</td>
                          <td>
                            Adult 0.1-1.2 <br /> children 0.2-1
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>

                <footer class="my-5 text-muted text-center text-small">
                  <hr style={{ height: "100%" }} />
                  <p class="mb-1" style={{ color: "black" }}>
                    This is a computer generated report and should be signed by
                    a radiologist
                  </p>
                  <hr style={{ height: "100%" }} />
                  <p class="my-0" style={{ color: "black" }}>
                    <strong> Dr. {result.dname}</strong>
                  </p>
                  <p class="my-0" style={{ color: "black" }}>
                    <strong> MBBS, Mphil, FCPS</strong>
                  </p>
                  <p class="my-0" style={{ color: "black" }}>
                    Radiologist
                  </p>
                  <button className="btn btn-dark" onClick={window.print}>
                    PRINT
                  </button>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default Report;
