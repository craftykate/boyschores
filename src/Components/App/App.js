import React, { Component } from 'react';

import Layout from '../Layout/Layout';
import SignIn from '../SignIn/SignIn';
import Chores from '../Chores/Chores';

class App extends Component {
  constructor(props) {
    super(props);
    let user = null;
    let authenticated = false;
    if (localStorage.getItem('loggedInUser') !== null) {
      authenticated = true;
      user = JSON.parse(localStorage.getItem('loggedInUser'));
    }
    this.state = {
      authenticated: authenticated,
      user: user
    }
  }

  authenticate = (user) => {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    this.setState({ 
      authenticated: true,
      user: user
    })
  }

  logout = () => {
    localStorage.clear();
    this.setState({
      authenticated: false,
      user: null
    })
  }

  render() {
    const signInContent = this.state.authenticated ? <Chores /> : <SignIn authenticate={this.authenticate}/>
    return (
      <Layout user={this.state.user} logout={this.logout}>
        {signInContent}
      </Layout>
    );
  }
}

export default App;
