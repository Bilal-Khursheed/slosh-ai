import React, { Component } from 'react';
import { Link } from "react-router-dom";

const colore = {
  color: "#00BFFF"
};

class Footer extends Component
{
    render()
    {
        return (
        <div>
          <footer className="footer text-center">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 mb-5 mb-lg-0">
                  <h4 className="text-uppercase mb-4" style={colore}>Location</h4>
                  <p className="lead mb-0">
                    NIC, H-9/1, 
                    <br />
                    Islamabad{" "}
                  </p>
                </div>

                <div className="col-lg-4 mb-5 mb-lg-0">
                  <h4 className="text-uppercase mb-4" style={colore}>Around the Web</h4>
                  <Link className="btn btn-outline-light btn-social mx-1" href="#">
                    <Link className="fab fa-fw fa-facebook-f"></Link>
                  </Link>
                  <Link className="btn btn-outline-light btn-social mx-1" href="#">
                    <i className="fab fa-fw fa-twitter"></i>
                  </Link>
                  <Link className="btn btn-outline-light btn-social mx-1" href="#">
                    <i className="fab fa-fw fa-linkedin-in"></i>
                  </Link>
                  <Link className="btn btn-outline-light btn-social mx-1" href="#">
                    <i className="fab fa-fw fa-dribbble"></i>
                  </Link>
                </div>

                <div className="col-lg-4">
                  <h4 className="text-uppercase mb-4" style={colore}>About SLOSH</h4>
                  <p className="lead mb-0">Changing the future of diagnosis one scan at a time.
                  </p>
                </div>
              </div>
            </div>
          </footer>
          
            
  </div>
        );
    }
}

export default Footer;