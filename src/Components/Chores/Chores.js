import React, { Component } from 'react';
import './Chores.css';
import axios from 'axios';

import ChoreList from './ChoreList/ChoreList';
import NewChore from '../NewChore/NewChore';
import CompletedChores from '../CompletedChores/CompletedChores';

class Chores extends Component {
  state = {
    chores: false,
    jackChores: null,
    nobyChores: null,
    jackRequiredChores: null,
    nobyRequiredChores: null,
    error: false
  }



  // After component mounts fetch chores from database
  componentDidMount() {
    // Comment out when accessing database
    // this.setUpDummyData();
    
    // Comment out when using dummy data
    this.fetchChoreData();
  }
  
  // this fetches the real data from the database (as opposed to dummy data for styling)
  fetchChoreData() {
    this.getChores();
    this.fetchKidChores('jack', false);
    this.fetchKidChores('jack', true);
    this.fetchKidChores('noby', false);
    this.fetchKidChores('noby', true);
  }

  // this is just for styling purposes so I don't hit the database every time it refreshes
  setUpDummyData() {
    const chores = {
      0: {
        name: "Clean floor of your closet",
        notes: "Hang up all clothes!",
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
        name: "Shower door",
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
        name: "Vacuum your room",
        notes: "",
        points: 1,
        persistent: false
      }
    }
    const nobyChores = {
      0: {
        name: "Vacuum living room",
        notes: "",
        points: 0.5,
        persistent: false
      }
    }
    const jackRequired = {
      0: {
        name: "Clean out your bin",
        notes: "",
        completed: true
      },
      1: {
        name: "Laundry",
        notes: "Make sure it's all folded",
        completed: false
      }
    }
    const nobyRequired = {
      0: {
        name: "Clean out your bin",
        notes: "",
        completed: false
      },
      1: {
        name: "Clean cat box",
        notes: "and vacuum stairs",
        completed: true
      }
    }
    this.setState({
      chores: chores,
      jackChores: jackChores,
      nobyChores: nobyChores,
      jackRequiredChores: jackRequired,
      nobyRequiredChores: nobyRequired
    })
  }

  // Fetch updated list of chores
  getChores = () => {
    axios.get(`/chores.json`)
      .then(response => this.setState({ chores: response.data }))
      .catch(error => {
        this.setState({error: true})
      })
  }

  // Fetch updated list of kid chores
  fetchKidChores = (kid, required) => {
    const choreLink = required ? `${kid}RequiredChores` : `${kid}Chores`;
    axios.get(`/${choreLink}.json`)
      .then(response => {
        if (kid === 'jack' && !required) this.setState({ jackChores: response.data });
        if (kid === 'jack' && required) this.setState({ jackRequiredChores: response.data });
        if (kid === 'noby' && !required) this.setState({ nobyChores: response.data });
        if (kid === 'noby' && required) this.setState({ nobyRequiredChores: response.data });
      })
  }

  // When a chore is marked as completed
  completeChoreHandler = (kid, key) => {
    const completedChore = this.state.chores[key];
    // If it's a single-time chore delete it from the chore database then fetch an updated list of chores
    if (this.state.chores[key].persistent === false) {
      this.deleteChore(key);
    }
    // Add that chore to the proper kid's completed chore list and fetch the updated list of their chores
    // Because you're storing all the chore information it makes it really easy to undo this (put the whole thing back in the active chore list) if the chore wasn't done properly
    axios.post(`/${kid}Chores.json`, completedChore)
      .then(response => this.fetchKidChores(kid, false));
  }

  // delete given chore and fetch updated list of chores
  deleteChore = (key) => {
    axios.delete(`/chores/${key}.json`)
      .then(response => this.getChores());
  }

  // A chore wasn't done right or clicked as done by accident
  // Delete the chore from the proper kid's completed chore list then fetch updated list of their chores
  putChoreBack = (kid, key, chore) => {
    axios.delete(`/${kid}Chores/${key}.json`)
      .then(response => this.fetchKidChores(kid, false));
    // If the chore is not persistent (if it is a single-time chore) add that chore back to the chores list
    // (If it's chore that can be done mulitple times it will still be on the active chore list)
    if (!chore.persistent) {
      axios.post(`/chores.json`, chore)
        .then(response => this.getChores());
    }
  }

  // delete all chores for a given kid
  clearCompleted = (kid) => {
    axios.delete(`/${kid}Chores.json`)
      .then(response => this.fetchKidChores(kid, false));
  }

  // mark a required chore as completed or incomplete (opposite of what it was)
  toggleRequiredChore = (kid, key) => {
    const chore = kid === 'jack' ? {...this.state.jackRequiredChores[key]} : {...this.state.nobyRequiredChores[key]};
    chore.completed = chore.completed ? false : true;
    axios.patch(`/${kid}RequiredChores/${key}.json`, chore)
      .then(response => this.fetchKidChores(kid, true));
  }

  // delete a required chore
  deleteRequired = (kid, key) => {
    axios.delete(`/${kid}RequiredChores/${key}.json`)
      .then(response => this.fetchKidChores(kid, true));
  }

  render() {
    return (
      <React.Fragment>
        <NewChore 
          getChores={this.getChores} 
          fetchKidChores={this.fetchKidChores} />
        <ChoreList 
          error={this.state.error}
          chores={this.state.chores}
          completeChore={this.completeChoreHandler} 
          deleteChore={this.deleteChore} />
        <CompletedChores 
          jack={this.state.jackChores} 
          noby={this.state.nobyChores}
          jackRequired={this.state.jackRequiredChores}
          nobyRequired={this.state.nobyRequiredChores}
          putBack={this.putChoreBack}
          deleteRequired={this.deleteRequired}
          clearCompleted={this.clearCompleted}
          toggleRequiredChore={this.toggleRequiredChore}/>
      </React.Fragment>
    )
  }
}

export default Chores;
