import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Notfound from "./notfound";
import Home from "./home";

import Create from './components/client/create.component';
import Edit from './components/client/edit.component';
import Index from './components/client/index.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Info clients - 10pearls</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/clients'} className="nav-link">Clients</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
              <Route exact path='/' component={ Home } />     
              <Route path='/clients' component={ Index } />         
              <Route path='/create' component={ Create } />
              <Route path='/edit/:id' component={ Edit } />
              <Route component={Notfound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;