import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import auth from './auth';
import Modal from './modals/modal';


class Content_Container extends Component {

	constructor(props) {
		super(props);

		this.state = {
            wind: "",
            vis: "",
            clouds: "",
            user_airport: "",
            user_wind: "",
            user_cloud: "",
            user_vis: "",
            response: "",
            show_weather_button: false,
            show_weather: true,
            isHidden: true,
            isShowing: false
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMinimums = this.handleMinimums.bind(this);
        this.renderWeather = this.renderWeather.bind(this);
        this.openModalHandler = this.openModalHandler.bind(this);
        this.closeModalHandler = this.closeModalHandler.bind(this);
    }

    openModalHandler() {
		this.setState({
			isShowing: true
		});
	}

	closeModalHandler() {
		this.setState({
			isShowing: false
		});
	}


    renderWeather() {
        this.setState ({
            show_weather: !this.state.show_weather
        })

    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }


    handleMinimums() {
        if ((this.state.wind <= this.state.user_wind) && (this.state.clouds >= this.state.user_cloud) && (this.state.vis >= this.state.user_vis)) {
            this.setState({
                response: `The weather at ${this.state.station} is within your minimums!`,
            })
        } else {
            this.setState({
                response: `The weather at ${this.state.station} is not within your minimums.`,
            })
        }
    }

    
	handleSubmit(event) {
        axios.request({
            method: 'GET',
            url: `https://avwx.rest/api/metar/${this.state.user_airport}`,
            headers: {
              'Authorization': 'LuCJKrhy8YIEydJ3rGAErm0ju5KQ87oBW9C1SCGyqDs'
            }
        }).then(response => {
            console.log(response)
            this.setState({
                wind: response.data.wind_speed.value,
                vis: response.data.visibility.value,
                clouds: response.data.clouds[0].altitude,
                station: response.data.station,
                show_weather_button: true,
                isHidden: false
            },
            this.handleMinimums  
            )
        }).catch(error => {
            console.log("error in Axios Call", error);
        });
        event.preventDefault();
    }



	render() {
		return (
            <div className="content-wrapper">
                <div className="flex-container-content">
                    <div className="form_wrapper">
                        <div className="nav-link-wrapper">
                            <div className="right-side">
                                Logout
                                <FontAwesomeIcon icon="sign-out-alt" 
                                onClick={() => {
                                    auth.logout(() => {
                                        this.props.history.push("/");
                                    });
                                }}
                                />
                            </div>
                        </div>
                        <div className="modal-wrapper">
				                { this.state.isShowing ? 
                                
                                <div onClick={this.closeModalHandler} className="back-drop"></div> 
                                
                                : null }

                                <button className="open-modal-btn" onClick={this.openModalHandler}>What are ICAO Codes?</button>

                                <Modal className="modal"
                                    show={this.state.isShowing}
                                    close={this.closeModalHandler}>
                                        The ICAO airport code or 
                                        location indicator is a four-letter code designating aerodromes 
                                        around the world.<br></br> Dont Know your ICAO code? Find it <a target="_blank" href="https://www.world-airport-codes.com/">Here</a> 
                                </Modal>
                        </div>
                        <form onSubmit={this.handleSubmit} className="submit-form-wrapper">
                            <div className="user_airport_wrapper">
                                <input 
                                type="text"
                                name="user_airport"
                                placeholder="Destination Aiport (ICAO)"
                                value={this.state.user_airport}
                                onChange={this.handleChange}
                                />
                            </div>

                            <div className="user_wind_wrapper">
                                <input 
                                type="text"
                                name="user_wind"
                                placeholder="Maximum Wind (Knots)"
                                value={this.state.user_wind}
                                onChange={this.handleChange}
                                />
                            </div>

                            <div className="user_cloud_wrapper">
                                <input 
                                type="text"
                                name="user_cloud"
                                placeholder="Minimum Ceiling (Ex 41 = 4,100 Feet)"
                                value={this.state.user_cloud}
                                onChange={this.handleChange}
                                />
                            </div>

                            <div className="user_vis_wrapper">
                                <input 
                                type="text"
                                name="user_vis"
                                placeholder="Minimum Visibility (Statute Miles)"
                                value={this.state.user_vis}
                                onChange={this.handleChange}
                                />
                            </div>

                            <div>
                                <button type="submit" className="btn">Submit</button>
                            </div>
                        </form> 
                    </div>
                </div>

                {this.state.isHidden === false ?
                    <div className="render-content-wrapper">
                        <div className="render-content">
                            {this.state.response}
                        </div>
                        <div className="render-content-weather">
                            {this.state.show_weather_button ? 
                                <button 
                                    onClick={this.renderWeather}
                                    className="btn"
                                    >
                                    {this.state.show_weather ? "Show Full Weather Report" : "Hide Weather Report"}
                                </button>
                            : ""}
                        </div>
                        <div className="render_weather" style={{ display: this.state.show_weather ? "none" : "block" }}>
                            <div>
                                Wind: {this.state.wind} Knots
                            </div>
                            <div>
                                Cloud Ceiling: {this.state.clouds}00 ft 
                            </div>
                            <div>
                                Visibility: {this.state.vis} Statute Miles
                            </div>
                        </div>
                    </div>
                 : null }
            </div>
		)
	}
}

export default Content_Container;
