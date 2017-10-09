import React, { Component } from 'react';
import {
  View,
  StatusBar,
  AsyncStorage
} from 'react-native';

import AppleHealthkit from 'rn-apple-healthkit';
import AnimatedLinearGradient, { presetColors } from 'react-native-animated-linear-gradient'

import * as UI from '../../UI'
import * as T from '../../Tools'

export class Splash extends React.Component {

  componentDidMount() {
    T.Watchdog(this);
    T.Healthkit(() => {
      this.router()
    });
  }

  async router() {
    let route = 'Dash'

    value = await AsyncStorage.getItem('@MySuperStore:O/Notifications');
    if (!value) route = 'Notifications'

    value = await AsyncStorage.getItem('@MySuperStore:O/Inital');
    if (!value) route = 'Inital'

    value = await AsyncStorage.getItem('@MySuperStore:O/Localization');
    if (!value) route = 'Localization'

    value = await AsyncStorage.getItem('@MySuperStore:O/Health');
    if (value !== JSON.stringify(T.Permissions())) route = 'Health'
    if (!value) route = 'Health'

    let value = await AsyncStorage.getItem('@MySuperStore:O/Welcome');
    if (!value) route = 'Welcome'

    const { navigate } = this.props.navigation;
    console.log(route)
    navigate(route)

  }

  render() {
    return (
      <View style={[UI.UIStyles.window]}>
        <StatusBar barStyle="light-content" />
        <AnimatedLinearGradient customColors={UI.UIStyleguide.gradient} speed={4000}/>
      </View>
    )
  }

}
