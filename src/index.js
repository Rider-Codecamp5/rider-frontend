import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import { saveState, loadState } from './configs/persistState';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>, 
  document.getElementById("root")
);
