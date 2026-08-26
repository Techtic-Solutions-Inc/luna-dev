import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const AppShell = ({ children }) => (
  <div className="app-shell">
    <Header />
    <Sidebar />
    <main>
      {children || <Outlet />}
    </main>
  </div>
);

export default AppShell;