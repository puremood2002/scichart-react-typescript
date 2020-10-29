// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import  App from "./App";

// ReactDOM.render(
//   <App />,
//   document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
// import 'core-js/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, Store } from "redux";;
import thunk from 'redux-thunk';
import { TopState } from './types';
import reducer from "./reducers";


const store: Store<TopState, any> & {
    dispatch: any;
  } = createStore(reducer, applyMiddleware(thunk));
  
  // console.log(reducer);
  
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

