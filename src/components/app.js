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

    this.handleRoute = this.handleRoute.bind(this);
  }

  handleRoute() {
    handleLogin()
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
            
            <Route component={NoMatch} />
          </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}
