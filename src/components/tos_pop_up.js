import React, { Component } from 'react';

export default class TosPop extends Component {
    constructor() {
        super();


    this.handleLawSuit = this.handleLawSuit.bind(this);
    }

    handleLawSuit() {
        alert("TERMS AND CONDITIONS OF USE: In no event shall WX Safe Flight , nor any of its officers, directors and employees, be liable to you for anything arising out of or in any way connected with your use of this Website, whether such liability is under contract, tort or otherwise, and WX Safe Flight , including its officers, directors and employees shall not be liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.");
    }


    render() {
        return (
            <div>
                {this.handleLawSuit()}
            </div>
        )
    }
}
