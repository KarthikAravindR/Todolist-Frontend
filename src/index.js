import React from 'react';
import { createStore,applyMiddleware,compose,combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk'

import taskreducer from './store/reducers/Tasks'
import modalreducer from './store/reducers/Modal'
import authreducer from './store/reducers/Auth'
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  task: taskreducer,
  modal: modalreducer,
  auth: authreducer
})
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))
ReactDOM.render(
  <React.StrictMode>
    <Provider store= {store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') 
);

serviceWorker.unregister();
