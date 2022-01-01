import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../images/warbler-logo.png";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              <img src={Logo} alt="Warbler Home" />
              Landing
            </Link>
            <Link to="/messages" className="navbar-brand">
              Messages
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;