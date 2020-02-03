import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import auth from '../auth';



export default class Register extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            registerdStatus: "notDone"
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister() {
        if (this.state.registerdStatus == "Done") {
            auth.login(() => {
                this.props.history.push("/fly");
            })
        } else {
            alert("Invalid");
        }
    }
    


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    
    
    handleSubmit(event) {
        axios.post("https://cors-anywhere.herokuapp.com/https://wx-backend-app.herokuapp.com/register",
        {
            user: {
                email: this.state.email, 
                password: this.state.password
            }
        }
        ).then(response => {
            this.setState({
                registerdStatus: response.data
            },
             this.handleRegister
            )  
        }).catch(error => {
            console.log(error, "error in registerForm")
        });
        event.preventDefault();
    }



	render() {
		return (
            <div className="flex-container">
                <form onSubmit={this.handleSubmit} className="auth-form-wrapper">
                    <div className="register-title">
                        Register To Redirect To Application
                    </div>
                    <div className="form-group">
                        <FontAwesomeIcon icon="envelope-square" />
                        <input 
                        type="email"
                        name="email"
                        placeholder="your email"
                        onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <FontAwesomeIcon icon="key" />
                        <input 
                        type="password"
                        name="password"
                        placeholder="unique password"
                        onChange={this.handleChange}
                        />
                    </div>
                    <button className="btn-form" type="submit">Register</button>
                </form> 
            </div>
		)
	}
}
