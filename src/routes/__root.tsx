// Assuming a routing setup exists
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} />
        {/* Other routes */}
      </Switch>
    </Router>
  );
};

export default AppRoutes;