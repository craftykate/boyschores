import React, { Component } from 'react';
import axios from 'axios';
import secrets from '../../utils/secrets';

class NewChore extends Component {
  state = { ...this.resetState() }

  resetState() {
    return {
      showDetails: false,
      choreName: '',
      notes: '',
      points: 1,
      persistent: false
    }
  }

  showDetails = () => {
    this.setState({ showDetails: true });
  }

  pointsChangeHandler = (event) => {
    this.setState({ points: event.target.value });
  }

  notesChangeHandler = (event) => {
    this.setState({ notes: event.target.value })
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
    let details = null;
    if (this.state.showDetails) {
      details = (
        <React.Fragment>
          <textarea value={this.state.notes} onChange={this.notesChangeHandler} />
          <select value={this.state.points} onChange={this.pointsChangeHandler}>
            <option value='0.25'>1/4</option>
            <option value="0.5">1/2</option>
            <option value="0.75">3/4</option>
            <option value="1">1</option>
            <option value='1.25'>1 1/4</option>
            <option value="1.5">1 1/2</option>
            <option value="1.75">1 3/4</option>
            <option value="2">2</option>
          </select>
          <input 
            type="radio" 
            name="persistent" 
            defaultChecked
            onChange={() => this.setState({ persistent: false })}/> Single Chore
          <input 
            type="radio" 
            name="persistent" 
            onChange={() => this.setState({ persistent: true })}/> Multiple allowed
        </React.Fragment>
      )
    }

    return (
      <div className="addChore">
        <input 
          value={this.state.choreName} 
          onChange={(event) => this.setState({ choreName: event.target.value })} 
          onClick={this.showDetails}/>
          {details}
        <button onClick={this.postChoreHandler}>Add Chore</button>
      </div>
    )
  }
};

export default NewChore;
