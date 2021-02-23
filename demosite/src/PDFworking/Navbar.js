import React, { Component} from "react";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <div>
        <Navbar className="navbar navbar-dark bg-dark">
          <button className="btn btn-dark" onClick={window.print}>
            Print kr Oe
          </button>
        </Navbar>
        {this.props.children}
      </div>
    );
  }
}

export default Navbar;
