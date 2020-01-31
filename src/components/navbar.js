import React from 'react';
import {Link} from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/">
            <div className="title-wrapper">
                <div className="title-text">
                    WX Safe Flight
                </div>
                <div className="title-img">
                    <img src={require("../../static/assets/images/logo.png")} />
                </div>
            </div>
      </Link>
    </nav>
  );
}

export default NavBar;