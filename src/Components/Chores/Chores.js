import React, { Component } from 'react';
// import axios from 'axios';
// import secrets from '../../utils/secrets';

import NewChore from '../NewChore/NewChore';
import CompletedChores from '../CompletedChores/CompletedChores';

class Chores extends Component {
  state = {
    chores: null,
    jackChores: null,
    nobyChores: null
  }

  componentDidMount() {
    let chores;
    // axios.get(`${secrets.baseURL}/chores.json`)
    //   .then(response => {
    //     chores = response.data;
    //     // console.log(chores);
    //     this.setState({ chores: chores });
    //   })

    chores = {
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
    this.setState({ chores: chores })
  }

  addChoreHandler = (chore) => {
    let updatedChores = {...this.state.chores, chore}
    this.setState({ chores: updatedChores })
  }

  completeChoreHandler = (kid, key) => {
    // const data = {
    //   completed: kid
    // }
    // axios.patch(`${secrets.baseURL}/chores/${key}.json`, data)
    //   .then(response => {
    //     console.log(response.data)
    //   });
    
  }

  render() {
    let chores = <tr><td>loading chores...</td></tr>;
    if (this.state.chores) {
      chores = Object.keys(this.state.chores).map(key => {
        const chore = this.state.chores[key];
        return ( 
          <tr key={key}>
            <td>{chore.name}</td>
            <td>{chore.points}</td>
            <td><input
              name="jack"
              type="checkbox"
              onChange={() => this.completeChoreHandler('jack', key)} />
            </td>
            <td><input
              name="noby"
              type="checkbox"
              onChange={() => this.completeChoreHandler('noby', key)} />
            </td>
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
