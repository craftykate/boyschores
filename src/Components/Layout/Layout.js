import React from 'react';
import Header from '../Header/Header';

const Layout = (props) => (
  <React.Fragment>
    <Header />
    <div id="wrapper">
      {props.children}
    </div>
  </React.Fragment>
);

export default Layout;
