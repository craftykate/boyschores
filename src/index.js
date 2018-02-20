import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import App from './Components/App/App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://boyschores.firebaseio.com'

axios.interceptors.request.use(request => {
  // console.log(request);
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  // console.log(response);
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
