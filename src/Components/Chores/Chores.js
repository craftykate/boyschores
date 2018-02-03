import React, { Component } from 'react';
import axios from 'axios';
import secrets from '../../utils/secrets';

import NewChore from '../NewChore/NewChore';
import CompletedChores from '../CompletedChores/CompletedChores';

class Chores extends Component {
  state = {
    chores: false,
    jackChores: null,
    nobyChores: null
  }

  componentDidMount() {
    // chores = {
    //   0: {
    //     name: "Clean floor of your closet",
    //     notes: "",
    //     points: 2,
    //     persistent: false
    //   },
    //   1: {
    //     name: "Scrub kitchen doorway",
    //     notes: "Both sides",
    //     points: 0.25,
    //     persistent: false
    //   },
    //   2: {
    //     name: "My shower door",
    //     notes: "Get gutter, too",
    //     points: 2,
    //     persistent: false
    //   },
    //   3: {
    //     name: "Organize books in large bookcase in living room",
    //     notes: "",
    //     points: 1,
    //     persistent: false
    //   },
    //   4: {
    //     name: "15 dishes",
    //     notes: "",
    //     points: 0.25,
    //     persistent: true
    //   }
    // }
    axios.get(`${secrets.baseURL}/chores.json`)
      .then(response => {
        console.log('fetched chores on mounting');
        this.setState({ chores: response.data });
      })
  }

  addChoreHandler = () => {
    axios.get(`${secrets.baseURL}/chores.json`)
      .then(response => {
        console.log('fetched chores after adding');
        this.setState({ chores: response.data });
      })
  }

  completeChoreHandler = (kid, key) => {
    const completedChore = this.state.chores[key];
    if (this.state.chores[key].persistent === false) {
      axios.delete(`${secrets.baseURL}/chores/${key}.json`)
        .then(response => {
          console.log('deleted chore');
          axios.get(`${secrets.baseURL}/chores.json`)
            .then(response => {
              console.log('fetched chores after deleting');
              this.setState({ chores: response.data });
            });
        })
    }

    if (kid === 'jack') {
      axios.post(`${secrets.baseURL}/jackChores.json`, completedChore)
        .then(response => {
          console.log('adding a jack chore');
          axios.get(`${secrets.baseURL}/jackChores.json`)
            .then(response => {
              console.log('fetched jack chores');
              this.setState({ jackChores: response.data });
            })
        });
    } else if (kid === 'noby') {
      axios.post(`${secrets.baseURL}/nobyChores.json`, completedChore)
        .then(response => {
          console.log('adding a noby chore');
          axios.get(`${secrets.baseURL}/nobyChores.json`)
            .then(response => {
              console.log('fetched noby chores');
              this.setState({ nobyChores: response.data });
            })
        });
    }
  }

  render() {
    let chores;
    if (this.state.chores === false) {
      chores = <tr><td>loading chores...</td></tr>;
    } else if (this.state.chores === null) {
      chores = <tr><td>No chores yet!</td></tr>;
    }
    if (this.state.chores) {
      chores = Object.keys(this.state.chores).map(key => {
        const chore = this.state.chores[key];
        return ( 
          <tr key={key}>
            <td>{chore.name}</td>
            <td>{chore.points}</td>
            <td><a onClick={() => this.completeChoreHandler('jack', key)}>J</a></td>
            <td><a onClick={() => this.completeChoreHandler('noby', key)}>N</a></td>
          </tr>
        )
      })
    }
    return (
      <React.Fragment>
        <table>
          <thead>
            <tr>
              <th>Chore</th>
              <th>Points</th>
              <th>Jack</th>
              <th>Noby</th>
            </tr>
          </thead>
          <tbody>
            {chores}
          </tbody>
        </table>
        <NewChore addChore={this.addChoreHandler}/>
        <CompletedChores jack={this.state.jackChores} noby={this.state.nobyChores} />
      </React.Fragment>
    )
  }
}

export default Chores;
