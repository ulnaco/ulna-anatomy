import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar
} from 'react-native';

import AppleHealthkit from 'rn-apple-healthkit';

import * as UI from '../../UI'
import * as T from '../../Tools'

export class Health extends React.Component {

  syncAppleHealth() {
    T.Watchdog(this);
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
      <View style={[UI.UIStyles.window, UI.UIStyles.backgroundPrimary]}>
        <StatusBar barStyle="light-content" />
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: UI.UIStyleguide.spacing*1.5,
          }}>
          <UI.UITitle text="Apple Health" lite={true}/>
          <UI.UISubTitle text="Sync your Apple Health data with Ulna Anatomy. Steps, Height, Weight, BMI, Distance Walking + Running, and Date of Birth" lite={true}/>
          <UI.UISpace small={true} />
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               this.syncAppleHealth();
             }}>
            <View>
              <UI.UIButton style="white" text="Connect" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
