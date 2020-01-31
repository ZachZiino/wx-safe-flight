import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import auth from '../auth';



export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            errorText: "",
            redirect: true
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin() {
        auth.login(() => {
            this.props.history.push("/fly");
        })
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
            console.log(response)  
        }).catch(error => {
            this.setState({
                errorText: "An error occured"
            })
        });
        event.preventDefault();
        this.handleLogin();
    }



	render() {
		return (
            <div className="flex-container">
                <form onSubmit={this.handleSubmit} className="auth-form-wrapper">
                    <div className="form-group">
                        <FontAwesomeIcon icon="envelope-square" />
                        <input 
                        type="email"
                        name="email"
                        placeholder="your email"
                        value={null}
                        onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <FontAwesomeIcon icon="key" />
                        <input 
                        type="password"
                        name="password"
                        placeholder="your password"
                        value={null}
                        onChange={this.handleChange}
                        />
                    </div>
                    <button className="btn-form" type="submit">Login</button>
                </form> 
            </div>
		)
	}
}

