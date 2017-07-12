import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, AlertIOS } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { MapView, ScreenOrientation, AppLoading } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import IntroModal from './containers/IntroModal'
import thunkMiddleware from 'redux-thunk'

import Aerostagram from './containers/Aerostagram';
import WifiScreen from './containers/WifiScreen';
import Map from './containers/Map';
import { initDatabase, clearBalloon } from './db';
import reducer from './reducers'

const getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, logger)
)

export default class App extends Component {
  state = {
    isReady: false
  };

  componentDidMount() {
    // Crée la table, execute le sql
    initDatabase();
    // Fixe en portrait
    ScreenOrientation.allow(ScreenOrientation.Orientation.PORTRAIT);
    setTimeout(() => {
      this.setState({ isReady: true });
    }, 5000);
    console.log(store.getState());
  }

  render() {
    if (!this.state.isReady) {
      return <IntroModal />;
    }

    return (
      <Provider store={store}>
        <AppNavigator
          onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = getCurrentRouteName(currentState);
            const prevScreen = getCurrentRouteName(prevState);
          }}
        />
      </Provider>
    );
  }
}

const AppNavigator = StackNavigator({
  Aerostagram: {
    screen: TabNavigator({
      Aerostagram: {
        screen: Aerostagram,
      },
      Map: {
        screen: Map
      },
      Scanner: {
        screen: WifiScreen
      }
    }, {
      swipeEnabled: true,
      lazy: true
    })
  }
})
