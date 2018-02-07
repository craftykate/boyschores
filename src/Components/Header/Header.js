import React from 'react';

const Header = (props) => {
  let user = null;
  if (props.user) {
    user = (
      <div>
        <p style={{marginBottom: 0}}>Hello {props.user}! <a onClick={props.logout}>log out</a></p>
      </div>
    )
  } 
  return (
    <header>
      <h1>Boys' Chores</h1>
      {user}
    </header>
  )
};

export default Header;
