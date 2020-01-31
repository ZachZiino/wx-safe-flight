import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavBar() {
  return (
    <div className="navbar">
      <div className="title-wrapper">
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
      </div>
      {/* <div className="nav-link-wrapper">
          <div className="right-side">
            <FontAwesomeIcon icon="sign-out-alt" />
          </div>
      </div> */}
    </div>
  );
}

export default NavBar;