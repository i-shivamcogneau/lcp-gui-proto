import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import Home from './routes/Home';
import './style.css';
import { useState } from 'react';

import Workflow from './routes/Workflow/Workflows';
import Config from './routes/Config';
import DataModel from './routes/DataModels/DataModel';

function App(){
  const [Workflows, setWorkflows] = useState({}); 
  const [WorkflowsName, setWorkflowsName] = useState([]);

  const [obj, setObj] = useState({});         //{"objectname1": {"id":uuid}}
  const [objName, setObjName] = useState([]);    // [{"objectname1" : "objid1"}]

    return (
      <Router>
        <div className="flex-column app-frame">
          <div className="flex-row align-center header container">
            <Link to="/">LCP</Link>
          </div>
          <div className="flex flex-row app-main">
            <div className="flex-column sidebar container">
              <Link to="/DataModel">DataModel</Link>
              <Link to="/Workflow">Workflow</Link>
              <Link to="/Config">Config</Link>
            </div>
            <div className="app-body flex">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/DataModel" render={() => <DataModel obj={obj} setObj={setObj} objName={objName} setObjName={setObjName} />} />
                <Route exact path="/Workflow" render={() => <Workflow Workflows={Workflows} setWorkflows ={setWorkflows} WorkflowsName={WorkflowsName} setWorkflowsName={setWorkflowsName} />} />
                <Route exact path="/Config" render={() => <Config  />} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
}

export default App;