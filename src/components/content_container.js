import React, { Component } from 'react';
import axios from 'axios';





class Content_Container extends Component {

	constructor() {
		super();

		this.state = {
            wind: "",
            vis: "",
            clouds: "",
            user_airport: "",
            user_wind: "",
            user_cloud: "",
            user_vis: "",
            response: "",
            redirect: false,
            show_weather_button: false,
            show_weather: true,
            isHidden: true
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleMinimums = this.handleMinimums.bind(this);
        this.renderWeather = this.renderWeather.bind(this);
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
            console.log(response);
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
                <div className="flex-container">
                    <div className="form_wrapper">
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
