import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux-root/store'
import LoginScreen from './screens/LoginScreen'
import QuestionScreen from './screens/QuestionScreen'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import * as Colors from './uicomponents/ColorScheme';

const mainNavigator = createStackNavigator({
  Home: LoginScreen,
  Question: QuestionScreen,
},
{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Colors.BACKGROUND_PRIMARY,
    },
    headerTintColor: Colors.FOREGROUND_PRIMARY,
    headerTitleStyle: {
      fontWeight: 'bold',
    },   
  }
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