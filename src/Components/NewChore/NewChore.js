import React, { Component } from 'react';
import axios from 'axios';
import secrets from '../../utils/secrets';

import NewChoreDetails from './NewChoreDetails/NewChoreDetails';

class NewChore extends Component {
  state = { ...this.resetState() }

  // Every time component updates, check to see if the input name is valid so "Add chore" button can be displayed
  componentDidUpdate() {
    this.checkReady();
  }

  // If there is a name present and the ready state is false change to true
  // If there is NO name present and the ready state is true, change to false
  checkReady = () => {
    if (this.state.choreName) {
      if (this.state.ready === false) {
        this.setState({ ready: true })
      }
    } else {
      if (this.state.ready === true) {
        this.setState({ ready: false })
      }
    }
  }

  resetState() {
    return {
      showDetails: false,
      choreName: '',
      notes: '',
      points: 1,
      persistent: false,
      ready: false
    }
  }

  // Show the rest of the fields needed to add a new chore
  showDetails = () => {
    this.setState({ showDetails: true });
  }

  // update the state for each field every time they change
  updateChoreNameHandler = (event) => {
    this.setState({ choreName: event.target.value })
  }
  pointsChangeHandler = (event) => {
    this.setState({ points: event.target.value });
  }
  notesChangeHandler = (event) => {
    this.setState({ notes: event.target.value })
  }
  persistentHandler = (boolean) => {
    this.setState({ persistent: boolean })
  }

  // Save all states for the new chore in an object then post that object to the database and reset the new chore fields
  postChoreHandler = () => {
    const chore = { 
      name: this.state.choreName,
      notes: this.state.notes,
      points: Number(this.state.points),
      persistent: this.state.persistent
    };

    axios.post(`${secrets.baseURL}/chores.json`, chore)
      .then(response => {
        // console.log('posted a chore')
        this.props.addChore();
      });
    this.setState({ ...this.resetState() });
  }

  render() {
    return (
      <NewChoreDetails 
        choreName={this.state.choreName} 
        showDetails={this.showDetails}
        show={this.state.showDetails}
        updateChoreName={this.updateChoreNameHandler} 
        notes={this.state.notes}
        notesChange={this.notesChangeHandler}
        points={this.state.points}
        pointsChange={this.pointsChangeHandler}
        persistent={this.persistentHandler}
        postChore={this.postChoreHandler} 
        cancel={() => this.setState({ ...this.resetState() })} 
        ready={this.state.ready} />
    )
  }
};

export default NewChore;
