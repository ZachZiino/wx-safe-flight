import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Content_Container from "./content_container";
import Login from "./auth/loginForm";
import Register from "./auth/registerForm";
import NoMatch from "./no-match";
import TosPop from '../components/tos_pop_up';
import Footer from './footer';
import NavBar from './navbar';
import Icons from "./helpers/icons";
import { ProtectedRoute } from "./auth/protected-route";

export default class App extends Component {
  constructor() {
    super();


    Icons();

  }


  render() {
    return (
      <div className='app'>
        <TosPop />
        <Router>
          <div>
            <NavBar />
          <Switch>

            <ProtectedRoute exact path="/fly" component={Content_Container} />

            <Route exact path="/" component={Login} />

            <Route exact path="/register" component={Register} />
            
            <Route component={NoMatch} />
            
          </Switch>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}
