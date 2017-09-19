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

import AppleHealthkit from 'rn-apple-healthkit';
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
import * as UL from 'ulna-ui'

import * as T from '../../Tools'

export class Splash extends React.Component {

  componentDidMount() {
    setTimeout(() => {
      // Start Inital Healthkit
      AppleHealthkit.initHealthKit({}: Object, (err: Object, results: Object) => {});

      // Onboarding Lookup
      T.getStorage('Onboarding', (results) => {
        if (results) {
          T.getStorage('Connected', (results) => {

            // All Permissions match
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

          // New User
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
