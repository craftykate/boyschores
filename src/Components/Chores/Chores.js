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

  componentDidMount() {
    // For styling purposes so you can avoid hitting the database after every change
    this.setUpDummyData();

    // axios.get(`${secrets.baseURL}/chores.json`)
    //   .then(response => {
    //     console.log('fetched chores on mounting');
    //     this.setState({ chores: response.data });
    //   })
    // axios.get(`${secrets.baseURL}/jackChores.json`)
    //   .then(response => {
    //     console.log('fetched jack chores on mounting');
    //     this.setState({ jackChores: response.data });
    //   });
    // axios.get(`${secrets.baseURL}/nobyChores.json`)
    //   .then(response => {
    //     console.log('fetched noby chores on mounting');
    //     this.setState({ nobyChores: response.data });
    //   })
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
    axios.post(`${secrets.baseURL}/${kid}Chores.json`, completedChore)
      .then(response => {
        console.log(`adding a ${kid} chore`);
        axios.get(`${secrets.baseURL}/${kid}Chores.json`)
          .then(response => {
            console.log(`fetched ${kid} chores`);
            if (kid === 'jack') this.setState({ jackChores: response.data });
            if (kid === 'noby') this.setState({ nobyChores: response.data });
          })
      });
  }

  putChoreBack = (kid, key, chore) => {
    axios.delete(`${secrets.baseURL}/${kid}Chores/${key}.json`)
      .then(response => {
        console.log('deleted chore');
        axios.get(`${secrets.baseURL}/${kid}Chores.json`)
          .then(response => {
            console.log(`fetched ${kid} chores after deleting`);
            if (kid === 'jack') this.setState({ jackChores: response.data });
            if (kid === 'noby') this.setState({ nobyChores: response.data });
          });
      });
    if (!chore.persistent) {
      axios.post(`${secrets.baseURL}/chores.json`, chore)
        .then(response => {
          console.log('added back chore');
          axios.get(`${secrets.baseURL}/chores.json`)
            .then(response => {
              console.log('fetched chores after putting one back');
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
