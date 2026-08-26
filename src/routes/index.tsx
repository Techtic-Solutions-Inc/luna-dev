import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import ErrorBoundary from '../components/ErrorBoundary';
import NotFound from '../components/404';

const Home = React.lazy(() => import('./Home'));

const Routes = () => (
  <Router>
    <ErrorBoundary>
      <AppShell>
        <Switch>
          <Route exact path="/" component={Home} />
          <ProtectedRoute path="/protected" component={ProtectedComponent} />
          <Route component={NotFound} />
        </Switch>
      </AppShell>
    </ErrorBoundary>
  </Router>
);

export default Routes;