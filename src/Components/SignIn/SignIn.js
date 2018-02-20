import React, { Component } from 'react';
import axios from 'axios';

class SignIn extends Component {
  state = {
    username: '',
    pwd: '',
    errorMessage: null
  }

  signIn = () => {
    axios.get(`/users.json`)
      .then(users => {
        if (users.data.hasOwnProperty(this.state.username.toLowerCase())) {
          if (users.data[this.state.username] === this.state.pwd) {
            this.props.authenticate(this.state.username)
          } else {
            this.setState({ errorMessage: "Oops, you're not a valid user"})
          }
        } else {
          this.setState({ errorMessage: "Oops, you're not a valid user" })
        }
      })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.errorMessage} <br />
        <input 
          value={this.state.username}
          onChange={(event) => this.setState({ username: event.target.value })}
          placeholder="Username" /> <br />
        <input
          value={this.state.pwd}
          onChange={(event) => this.setState({ pwd: event.target.value })}
          type="password"
          placeholder="Password" /> <br />
        <button onClick={this.signIn}>Sign In</button>
      </React.Fragment>
    )
  }
}

export default SignIn;
