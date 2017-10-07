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

const views = {
  initialRouteName: {
    mode: "modal",
    screen: Screens.Splash,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    }
  },
  Welcome: {
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
  Localization: {
    mode: "modal",
    screen: Screens.Localization,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    }
  },
  HealthStudy: {
    mode: "modal",
    screen: Screens.HealthStudy,
    navigationOptions: {
      gesturesEnabled: false,
      header: null,
    }
  },
  Inital: {
    mode: "modal",
    screen: Screens.InitalRating,
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
      title: 'Dash'
    }
  },
  LogWeight: {
    screen: Screens.LogWeight,
    navigationOptions: {
      title: 'Log Weight'
    }
  },
  Steps: {
    screen: Screens.Steps,
    navigationOptions: {
      title: 'Steps Insights'
    }
  },
  Weight: {
    screen: Screens.Weight,
    navigationOptions: {
      title: 'Weight Insights'
    }
  },
  Profile: {
    screen: Screens.Profile,
    navigationOptions: {
      title: 'Profile'
    }
  },
  Notifications: {
    screen: Screens.Notifications,
    navigationOptions: {
      header: null,
    }
  },
  MyRating: {
    screen: Screens.MyRating,
    navigationOptions: {
      title: 'My Rating'
    }
  }
}

const anatomy = StackNavigator(views);
AppRegistry.registerComponent('anatomy', () => anatomy);
