import React, { Component } from 'react';
import './Chores.css';
import axios from 'axios';
import secrets from '../../utils/secrets';

import ChoreList from './ChoreList/ChoreList';
import NewChore from '../NewChore/NewChore';
import CompletedChores from '../CompletedChores/CompletedChores';

class Chores extends Component {
  state = {
    chores: false,
    jackChores: null,
    nobyChores: null
  }

  // this is just for styling purposes so I don't hit the database every time it refreshes
  setUpDummyData() {
    const chores = {
      0: {
        name: "Clean floor of your closet",
        notes: "",
        points: 2,
        persistent: false
      },
      1: {
        name: "Scrub kitchen doorway",
        notes: "Both sides",
        points: 0.25,
        persistent: false
      },
      2: {
        name: "My shower door",
        notes: "Get gutter, too",
        points: 2,
        persistent: false
      },
      3: {
        name: "Organize books in large bookcase in living room",
        notes: "",
        points: 1,
        persistent: false
      },
      4: {
        name: "15 dishes",
        notes: "",
        points: 0.25,
        persistent: true
      }
    }
    const jackChores = {
      0: {
        name: "Clean floor of your closet",
        notes: "Hang everything",
        points: 2,
        persistent: false
      }
    }
    this.setState({
      chores: chores,
      jackChores: jackChores
    })
  }

  // After component mounts fetch chores from database
  componentDidMount() {
    // Comment out when accessing database
    // this.setUpDummyData();

    // Comment out when using dummy data
    axios.get(`${secrets.baseURL}/chores.json`)
      .then(response => {
        // console.log('fetched chores on mounting');
        this.setState({ chores: response.data });
      })
    axios.get(`${secrets.baseURL}/jackChores.json`)
      .then(response => {
        // console.log('fetched jack chores on mounting');
        this.setState({ jackChores: response.data });
      });
    axios.get(`${secrets.baseURL}/nobyChores.json`)
      .then(response => {
        // console.log('fetched noby chores on mounting');
        this.setState({ nobyChores: response.data });
      })
  }

  // Fetch new list of chores after adding a new one
  addChoreHandler = () => {
    axios.get(`${secrets.baseURL}/chores.json`)
      .then(response => {
        // console.log('fetched chores after adding');
        this.setState({ chores: response.data });
      })
  }

  // When a chore is marked as completed
  completeChoreHandler = (kid, key) => {
    const completedChore = this.state.chores[key];

    // If it's a single-time chore delete it from the chore database then fetch an updated list of chores
    if (this.state.chores[key].persistent === false) {
      axios.delete(`${secrets.baseURL}/chores/${key}.json`)
        .then(response => {
          // console.log('deleted chore');
          axios.get(`${secrets.baseURL}/chores.json`)
            .then(response => {
              // console.log('fetched chores after deleting');
              this.setState({ chores: response.data });
            });
        })
    }

    // Add that chore to the proper kid's completed chore list and fetch the updated list of their chores
    // Because you're storing all the chore information it makes it really easy to undo this (put the whole thing back in the active chore list) if the chore wasn't done properly
    axios.post(`${secrets.baseURL}/${kid}Chores.json`, completedChore)
      .then(response => {
        // console.log(`adding a ${kid} chore`);
        axios.get(`${secrets.baseURL}/${kid}Chores.json`)
          .then(response => {
            // console.log(`fetched ${kid} chores`);
            if (kid === 'jack') this.setState({ jackChores: response.data });
            if (kid === 'noby') this.setState({ nobyChores: response.data });
          })
      });
  }

  // A chore wasn't done right or clicked as done by accident
  // Delete the chore from the proper kid's completed chore list then fetch updated list of their chores
  putChoreBack = (kid, key, chore) => {
    axios.delete(`${secrets.baseURL}/${kid}Chores/${key}.json`)
      .then(response => {
        // console.log('deleted chore');
        axios.get(`${secrets.baseURL}/${kid}Chores.json`)
          .then(response => {
            // console.log(`fetched ${kid} chores after deleting`);
            if (kid === 'jack') this.setState({ jackChores: response.data });
            if (kid === 'noby') this.setState({ nobyChores: response.data });
          });
      });
    
    // If the chore is not persistent (if it is a single-time chore) add that chore back to the chores list
    // (If it's chore that can be done mulitple times it will still be on the active chore list)
    if (!chore.persistent) {
      axios.post(`${secrets.baseURL}/chores.json`, chore)
        .then(response => {
          // console.log('added back chore');
          axios.get(`${secrets.baseURL}/chores.json`)
            .then(response => {
              // console.log('fetched chores after putting one back');
              this.setState({ chores: response.data });
            })
        })
    }
  }

  render() {
    return (
      <React.Fragment>
        <NewChore addChore={this.addChoreHandler} />
        <ChoreList 
          chores={this.state.chores}
          completeChore={this.completeChoreHandler} />
        <CompletedChores 
          jack={this.state.jackChores} 
          noby={this.state.nobyChores}
          putBack={this.putChoreBack}/>
      </React.Fragment>
    )
  }
}

export default Chores;
