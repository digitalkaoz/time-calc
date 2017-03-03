import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import './index.css';
import { Provider } from 'react-redux'
import createStore from './logic/store';

ReactDOM.render(
    <Provider store={createStore()}>
        <App />
    </Provider>,
  document.getElementById('root')
);
