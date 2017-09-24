import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar
} from 'react-native';

import AppleHealthkit from 'rn-apple-healthkit';

import * as UL from 'ulna-ui'
import * as T from '../../Tools'

export class Health extends React.Component {

  syncAppleHealth() {

    let options = T.Permissions()
    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {
        AppleHealthkit.initHealthKit(options: Object, (err: Object, results: Object) => {
          if (err) return;
          const { navigate } = this.props.navigation;
          T.getStorage('Onboarding', (results) => {
            if (results) {
              navigate('Dash')
            } else {
              navigate('HealthStudy')
            }
          });
          T.setStorage('Connected', JSON.stringify(options));
        });
      }
    });

  }

  render() {
    return (
      <View style={[UL.ULStyles.window, UL.ULStyles.backgroundPrimary]}>
        <StatusBar barStyle="light-content" />
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: UL.ULStyleguide.spacing*1.5,
          }}>
          <UL.ULTitle text="Apple Health" lite={true}/>
          <UL.ULSubTitle text="Sync your Apple Health data with Ulna Anatomy. Steps, Height, Weight, BMI, Distance Walking + Running, and Date of Birth" lite={true}/>
          <UL.ULSpace small={true} />
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               this.syncAppleHealth();
             }}>
            <View>
              <UL.ULButton style="white" text="Connect" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
