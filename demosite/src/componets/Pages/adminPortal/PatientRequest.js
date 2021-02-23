import React, { Component } from "react";
import allDocReq from "../../doctorData/GetAllDoc";
import $ from "jquery";
class PatientRequest extends Component {
  state = {
    v: 0,
    AllRequests: [],
  };
  async componentDidMount() {
    // var alldoctors = await allDocReq.allDocReq();
    // // var name=JSON.parse(alldoctors)
    // var length = JSON.stringify(alldoctors.names.length);
    // console.log("data of the doctor" + length);
    // var x;
    // var y = length;
    console.log("working");
    await fetch(`users/allPatientReq`)
      .then((respone) => respone.json())
      .then((Result) => {
        if (Result.status == "Success") {
          console.log("here is the length", Result.data.length);

          this.setState({
            AllRequests: Result.data,
          });
        }
      });

    // if (this.state.v === 0) {
    //   for (x = 0; x < length; x++) {
    //     console.log("working in for loop");
    //     $("#tabledata").prepend(
    //       `<tr><th scope="row">` +
    //         y +
    //         `</th><td>` +
    //         alldoctors.names[x].toUpperCase() +
    //         `</td><td>` +
    //         alldoctors.emails[x] +
    //         `</td><td>` +
    //         alldoctors.cnic[x] +
    //         `</td>
    //   <td>` +
    //         alldoctors.address[x] +
    //         `</td>    <td>
    //         <a href="http://localhost:3001/users/approve?Id=${
    //           alldoctors.emails[x]
    //         }&&role=${2}"><button type="button" class="btn btn-success btn-lg ">
    //           <i class="fas fa-check-square"></i>
    //         </button> </a>
    //         <a href="http://localhost:3001/users/reject?Id=${
    //           alldoctors.emails[x]
    //         }&&role=${2}"> <button type="button" class="btn btn-danger btn-lg ml-3">
    //           <i class="fas fa-times"></i>
    //         </button>
    //         </a>
    //       </td>
    // </tr>`
    //     );
    //     y--;
    //     this.setState({ v: 1 });
    //   }
    // } else {
    // console.log("not working");
    // }
    /* do {
      $("#tabledata").prepend(
        '<tr><th scope="row">1</th><td>Muhammad Umar</td><td>umarnazaket@gmail.com</td>'
      
    } while (alldoctors.names.length);*/
    //this.setState({ docname: alldoctors[1] });
  }
  Reject = async (e) => {
    var email = e.target.value;
    //console.log("emialsi s", email);
    await fetch(`users/reject?Id=${email}&&role=${1}`).then((res) => {
      if (res.status) {
        this.setState((prevState) => ({
          AllRequests: prevState.AllRequests.filter(
            (AllRequests) => AllRequests.Email !== email
          ),
        }));
      }
    });
  };
  Accept = async (e) => {
    var email = e.target.value;
    //console.log("emialsi s", email);
    await fetch(`users/approve?Id=${email}&&role=${1}`).then((res) => {
      if (res.status) {
        this.setState((prevState) => ({
          AllRequests: prevState.AllRequests.filter(
            (AllRequests) => AllRequests.Email !== email
          ),
        }));
      }
    });
  };
  render() {
    var data = this.state.AllRequests;
    return (
      <div class="container">
        <div class="row">
          <div class="col-12">
            <table
              class="table table-hover table-bordered table-dark text-center"
              id="tabledata"
            >
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">CNIC</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">Accept / Reject</th>
                </tr>
              </thead>
              <tbody>
                {this.state.AllRequests.length > 0 &&
                  data.map((req, index) => (
                    <tr>
                      <th scope="row">{index}</th>
                      <td>
                        {req.F_Name} {req.L_Name}
                      </td>
                      <td>{req.CNIC}</td>
                      <td>{req.Email}</td>
                      <td>
                        {req.Street} {req.City} {req.State} {req.Country}
                      </td>

                      <td>
                        <button
                          type="button"
                          value={req.Email}
                          class="btn btn-success btn-lg"
                          onClick={this.Accept}
                        >
                          <i class="fas fa-check-square"></i>
                        </button>

                        <button
                          type="button"
                          value={req.Email}
                          class="btn btn-danger btn-lg"
                          onClick={this.Reject}
                        >
                          <i class="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default PatientRequest;
