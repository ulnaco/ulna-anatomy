/**
 * - Button : Onboarding/Health
 */
import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar
} from 'react-native';

import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'

import * as UL from 'ulna-ui'

import * as T from '../../Tools'

export class Splash extends React.Component {

  componentDidMount() {
    setTimeout(() => {
      T.getStorage('Onboarding', (results) => {
        if (results) {
          T.getStorage('Connected', (results) => {
            if (results == JSON.stringify(T.Permissions())) {
              const { navigate } = this.props.navigation;
              navigate('Dash')
            } else {
              const { navigate } = this.props.navigation;
              navigate('Health')
            }
          });
        }
        else {
          const { navigate } = this.props.navigation;
          navigate('Welcome')
        }
      })
    }, 1000);
  }


  render() {
    return (
      <View style={[UL.ULStyles.window]}>
        <StatusBar barStyle="light-content" />
        <AnimatedLinearGradient customColors={UL.ULStyleguide.gradient} speed={4000}/>
      </View>
    )
  }
}
