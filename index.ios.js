import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  StackNavigator,
  NavigationActions
} from 'react-navigation';

import * as Screens from './Views';

import {
  MXInit,
  MXTrack,
} from 'rn-mixpanel-lite';

// MXInit('5df62a939c9625dfeb091400575b6c7f')
// MXTrack('YO')


const anatomy = StackNavigator({
  initialRouteName: {
    mode: "modal",
    screen: Screens.Welcome,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    }
  },
  Health: {
    mode: "modal",
    screen: Screens.Health,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    }
  },
  Dash: {
    mode: "modal",
    screen: Screens.Dash,
    navigationOptions: {
      headerLeft: null,
      gesturesEnabled: false,
      title: 'Terrillo'
    }
  },
  LogWeight: {
    screen: Screens.LogWeight,
    navigationOptions: {
      title: 'Log Weight'
    }
  },
  Weight: {
    screen: Screens.Weight,
    navigationOptions: {
      title: 'Weight'
    }
  },
  MyRating: {
    screen: Screens.MyRating,
    navigationOptions: {
      title: 'My Rating'
    }
  }
});

AppRegistry.registerComponent('anatomy', () => anatomy);
