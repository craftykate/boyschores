import React, { Component } from 'react';
import Popup from '../../UI/Popup/Popup';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentWillMount() {
      axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      })
      // (res => res just returns the response)
      axios.interceptors.response.use(res => res, error => {
        console.log(error)
        this.setState({error: error})
      });
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }

    render() {
      return (
        <React.Fragment>
          <Popup
            show={this.state.error}
            hide={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Popup>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  }
}

export default withErrorHandler;