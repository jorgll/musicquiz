import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux-root/store'
import LoginScreen from './screens/LoginScreen'

export default class App extends Component<{}> {

  render() {
    return (
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    )
  }
}