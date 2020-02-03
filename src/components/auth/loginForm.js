import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import auth from '../auth';



export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            loggedInStatus: "invalid"
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        if (this.state.loggedInStatus == "valid") {
            auth.login(() => {
                this.props.history.push("/fly");
            })
        } else {
            alert("Wrong Email Or Password");
        }
    }
    


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    
    
    handleSubmit(event) {
        axios.post("https://cors-anywhere.herokuapp.com/https://wx-backend-app.herokuapp.com/login",
        {
            user: {
                email: this.state.email, 
                password: this.state.password
            }
        }
        ).then(response => {
            this.setState({
                loggedInStatus: response.data
            },
            this.handleLogin
            )  
        }).catch(error => {
            console.log(error, "error in loginForm")
        });
        event.preventDefault();
    }



	render() {
		return (
            <div className="flex-container">
                <form onSubmit={this.handleSubmit} className="auth-form-wrapper">
                <div className="login-title">
                    Wx Safe Flight helps you stay within your weather minimums.
                    Login, and our application will pull from live weather data to tell
                    you if you are safe to fly.
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
                        placeholder="your password"
                        onChange={this.handleChange}
                        />
                    </div>
                    <button className="btn-form" type="submit">Login</button>

                    <div className="register-to-login-text">
                        Not A User? Click <Link to="/register">Here</Link> To Register
                    </div>
                </form>
            </div>
		)
	}
}

