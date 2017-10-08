import React, { Component } from 'react';
import {
  View,
  StatusBar
} from 'react-native';

import AppleHealthkit from 'rn-apple-healthkit';
import AnimatedLinearGradient, { presetColors } from 'react-native-animated-linear-gradient'

import * as UI from '../../UI'
import * as T from '../../Tools'

export class Splash extends React.Component {

  componentDidMount() {
    T.Watchdog(this);
    setTimeout(() => {

      // Start Inital Healthkit
      AppleHealthkit.initHealthKit({}: Object, (err: Object, results: Object) => {});

      AppleHealthkit.isAvailable((err: Object, available: boolean) => {
        if (available) {
          const { navigate } = this.props.navigation;

          // Onboarding Lookup
          T.getStorage('Onboarding', (results) => {
            if (results) {
              T.getStorage('Connected', (results) => {

                // All Permissions match
                if (results == JSON.stringify(T.Permissions())) {
                  T.getStorage('EnableNotifications', (results) => {
                    if (results) {
                      T.getStorage('Localization', (results) => {
                        if (results) {
                          T.Notifications();
                          navigate('Dash')
                        } else {
                          navigate('Localization')
                        }
                      });
                    } else {
                      navigate('Notifications')
                    }
                  });
                } else {
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
        }
      });

    }, 1000);
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
