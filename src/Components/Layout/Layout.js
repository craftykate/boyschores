import React from 'react';
import Header from '../Header/Header';

const Layout = (props) => (
  <React.Fragment>
    <Header user={props.user} logout={props.logout}/>
    <div id="wrapper">
      {props.children}
    </div>
  </React.Fragment>
);

export default Layout;
