import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './RootState';
import LoginScreen from './screens/LoginScreen'
import devToolsEnhancer from 'remote-redux-devtools';

const store = createStore(reducer, devToolsEnhancer());

export default class App extends Component<{}> {

  render() {
    return (
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    )
  }
}