import React, { ReactNode } from 'react';
import Main from '../main/Main';
import '../styles/Layout.css';

const Layout: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <div className="layout-container">
      <Main></Main>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
