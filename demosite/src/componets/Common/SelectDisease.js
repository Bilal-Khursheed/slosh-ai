import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./SelectDisease.css";

class SelectDisease extends Component {
  render() {
    return (
      <div>
        <div class="wrapper">
          <h1>Select The Disease</h1>
          <div class="cols">
            <div class="col" ontouchstart="this.classList.toggle('hover');">
              <div class="container">
                <div
                  class="front"
                  style={{ backgroundImage: `url(img/disopt.jpg)` }}
                >
                  <div class="inner">
                    <p>Brain Tumor</p>
                  </div>
                </div>
                <div class="back">
                  <div class="inner">
                    <button className="btn btn-light">
                      <Link to="/getreport">Click to Proceed</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="col" ontouchstart="this.classList.toggle('hover');">
              <div class="container">
                <div
                  class="front"
                  style={{ backgroundImage: `url(img/disopt1.jpg)` }}
                >
                  <div class="inner">
                    <p>Lung Cancer</p>
                  </div>
                </div>
                <div class="back">
                  <div class="inner">
                    <button className="btn btn-light">
                      <Link to="/getreport1">Click to Proceed</Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SelectDisease;
