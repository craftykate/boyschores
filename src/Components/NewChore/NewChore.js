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
      required: false,
      requiredBoy: 'both',
      ready: false
    }
  }

  // Show the rest of the fields needed to add a new chore
  showDetails = () => {
    this.setState({ showDetails: true });
  }

  // update the state for each field every time they change
  updateField = (field, event) => {
    this.setState({ [field]: event.target.value })
  }
  persistentHandler = (boolean) => {
    this.setState({ 
      persistent: boolean,
      required: false
    })
  }
  setAsRequired = () => {
    this.setState({ required: true })
  }
  setRequiredBoy = (kid) => {
    this.setState({ requiredBoy: kid })
  }


  // Save all states for the new chore in an object then post that object to the database and reset the new chore fields
  postChoreHandler = () => {
    if (this.state.required) {
      if (this.state.requiredBoy === 'both') {
        this.postChore('jack');
        this.postChore('noby');
      } else if (this.state.requiredBoy === 'jack') {
        this.postChore('jack');
      } else if (this.state.requiredBoy === 'noby') {
        this.postChore('noby');
      }
    } else {
      const chore = { 
        name: this.state.choreName,
        notes: this.state.notes,
        points: Number(this.state.points),
        persistent: this.state.persistent
      };
      axios.post(`${secrets.baseURL}/chores.json`, chore)
        .then(response => {
          // console.log('posted a chore')
          this.props.getChores();
        });
    }
    this.setState({ ...this.resetState() });
  }

  // save state as chore and post to correct kid, then fetch correct kid's updated chores
  postChore = (kid) => {
    const chore = {
      name: this.state.choreName,
      notes: this.state.notes
    }
    axios.post(`${secrets.baseURL}/${kid}RequiredChores.json`, chore)
      .then(response => {
        this.props.fetchKidChores(kid, true);
      });
  }

  render() {
    return (
      <NewChoreDetails 
        choreName={this.state.choreName} 
        showDetails={this.showDetails}
        show={this.state.showDetails}
        updateField={this.updateField} 
        notes={this.state.notes}
        points={this.state.points}
        persistent={this.persistentHandler}
        setAsRequired={this.setAsRequired}
        required={this.state.required}
        setRequiredBoy={this.setRequiredBoy}
        postChore={this.postChoreHandler} 
        cancel={() => this.setState({ ...this.resetState() })} 
        ready={this.state.ready} />
    )
  }
};

export default NewChore;
