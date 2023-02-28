import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import Home from './routes/Home';
import './style.css';

import Processes from './routes/Processes';
import Config from './routes/Config';
import DataModel from './routes/DataModels/DataModel';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="flex-column app-frame">
          <div className="flex-row align-center header container">
            <Link to="/">LCP</Link>
          </div>
          <div className="flex flex-row app-main">
            <div className="flex-column sidebar container">
              <Link to="/DataModel">DataModel</Link>
              <Link to="/Processes">Processes</Link>
              <Link to="/Config">Config</Link>
            </div>
            <div className="app-body flex">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/DataModel" component={DataModel} />
                <Route exact path="/Processes" component={Processes} />
                <Route exact path="/Config" component={Config} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;