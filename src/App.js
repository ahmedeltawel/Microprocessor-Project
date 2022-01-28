import React, { Component } from 'react';
import './App.css';
import Results from './screens/Results';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Tomasulo from './screens/Tomasulo.js';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Tomasulo} />
          <Route exact path='/results' component={Results} />
        </Switch>
      </Router>
    );
  }
}

export default App;
