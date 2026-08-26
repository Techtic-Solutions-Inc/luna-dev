import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/home" component={Home} />
    </Switch>
  </Router>
);

export default Routes;