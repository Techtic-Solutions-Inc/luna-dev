import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Blog from './Blog';
import Pricing from './Pricing';
import BlogDetails from './BlogDetails';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/blog" component={Blog} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/blog/:id" component={BlogDetails} />
      </Switch>
    </Router>
  );
};

export default AppRoutes;