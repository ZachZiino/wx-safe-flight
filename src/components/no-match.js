import React from 'react';
import { Link } from "react-router-dom";

export default function() {
    return (
        <div className="flex-container">
            <div className="no-match-wrapper">
                    <div className="no-match-text">
                        This page has flown away!
                    </div>
                    <img className="plane-img" src={require("../../static/assets/images/plane.jpg")} />
                <Link to="/">Click here for the homepage</Link>
            </div>
        </div>
    );
}
