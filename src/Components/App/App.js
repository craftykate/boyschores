import React, { Component } from 'react';

import Layout from '../Layout/Layout';
import Chores from '../Chores/Chores';

class App extends Component {
  render() {
    return (
      <Layout>
        <Chores />
      </Layout>
    );
  }
}

export default App;
