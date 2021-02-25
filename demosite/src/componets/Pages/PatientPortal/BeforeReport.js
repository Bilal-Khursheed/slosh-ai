import React, { Component } from "react";
import "../DoctorPortal/PreReport.css";
import { Link, Redirect } from "react-router-dom";

class BeforeReport extends Component {
  state = {
    Report_ID: "",
    navigate: false,
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(" login e value", e.target.value);
  };
  handleSubmit = () => {
    localStorage.setItem("ReportID", this.state.Report_ID);
    this.setState({
      navigate: true,
    });
  };
  render() {
    if (this.state.navigate) {
      return <Redirect to="/viewPatientReport" />;
    }

    return (
      <div class="login-box bt-5 bg-transparent">
        <h2 className="bt-5">Enter Report ID to View Report</h2>
        <form>
          {/* <div class="user-box">
              <input type="text" name="" required="" />
              <label>Username</label>
            </div>
            <div class="user-box">
              <input type="password" name="" required="" />
              <label>Password</label>
            </div> */}
          <div class="bt-5 col-lg-12 col-12">
            <label for="ID">Report ID:</label>
            <input
              type="Number"
              class="form-control bg-transparent text-light"
              id="ID"
              placeholder="Enter Report ID"
              name="Report_ID"
              required
              onChange={this.handleChange}
            />
          </div>

          <Link onClick={this.handleSubmit}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Get Report
          </Link>
        </form>
      </div>
    );
  }
}
export default BeforeReport;
