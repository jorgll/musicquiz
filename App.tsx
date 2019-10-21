import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux-root/store'
import LoginScreen from './screens/LoginScreen'
import QuestionScreen from './screens/QuestionScreen'
import { createStackNavigator, createAppContainer } from 'react-navigation';

const mainNavigator = createStackNavigator({
  Home: { screen: LoginScreen },
  Question: { screen: QuestionScreen },
},
{
  initialRouteName: 'Home'
});

const AppContainer = createAppContainer(mainNavigator);

export default class App extends Component<{}> {

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}