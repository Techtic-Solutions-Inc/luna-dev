import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ContentCalendar from './ContentCalendar';

const AppRoutes: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/content-calendar" component={ContentCalendar} />
      {/* Other routes */}
    </Switch>
  </Router>
);

export default AppRoutes;