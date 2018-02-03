import React, { Component } from 'react';
import axios from 'axios';
import secrets from '../../utils/secrets';

import NewChoreDetails from './NewChoreDetails/NewChoreDetails';

class NewChore extends Component {
  state = { ...this.resetState() }

  componentDidUpdate() {
    this.checkReady();
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

  showDetails = () => {
    this.setState({ showDetails: true });
  }

  updateChoreNameHandler = (event) => {
    this.setState({ choreName: event.target.value })
  }

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

  pointsChangeHandler = (event) => {
    this.setState({ points: event.target.value });
  }

  notesChangeHandler = (event) => {
    this.setState({ notes: event.target.value })
  }

  persistentHandler = (boolean) => {
    this.setState({ persistent: boolean })
  }

  postChoreHandler = () => {
    const chore = { 
      name: this.state.choreName,
      notes: this.state.notes,
      points: Number(this.state.points),
      persistent: this.state.persistent
    };

    axios.post(`${secrets.baseURL}/chores.json`, chore)
      .then(response => {
        console.log('posted a chore')
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
