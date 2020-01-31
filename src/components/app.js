import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from "./pages/home";
import SignIn from "./pages/login";
import NoMatch from "./pages/no-match";
import TosPop from '../components/tos_pop_up';
import Footer from './footer';
import NavBar from './navbar';
import Icons from "./helpers/icons";

export default class App extends Component {
  constructor() {
    super();

    Icons();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    }



    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }


  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    })
  }

  handleUnSuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    })
  }

  authorizedPages() {
    return [<Route key="home" path="/fly" component={Home} />];
  }


  render() {
    return (
      <div className='app'>
        <TosPop />
        <Router>
          <div>
            <NavBar />
          <Switch>

            {/* <Route exact path="/fly" component={Home} /> */}

            <Route exact path="/" component={SignIn} />

            {this.state.loggedInStatus === "LOGGED_IN" ? this.authorizedPages() : null}

            <Route component={NoMatch} />
          </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}
