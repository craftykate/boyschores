import React, { Component } from 'react';
import './App.css';

import Layout from '../Layout/Layout';
import NewChore from '../NewChore/NewChore';

class App extends Component {
  render() {
    return (
      <Layout>
        <NewChore />
      </Layout>
    );
  }
}

export default App;
