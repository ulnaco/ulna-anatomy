/**
 * - Button : Content with Apple Health
 * - Action : Onboarding/HealthStudy
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
import * as UL from 'ulna-ui'

export class Health extends React.Component {

  syncAppleHealth() {

    let options = {
      permissions: {
        read: ["Height", "Weight", "DateOfBirth", "Steps", "BodyMassIndex"],
        write: ["Weight", "BodyMassIndex"]
      }
    };

    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {
        AppleHealthkit.initHealthKit(options: Object, (err: Object, results: Object) => {
          if (err) return;
          const { navigate } = this.props.navigation;
          navigate('HealthStudy')
        });
      }
    });

  }

  render() {
    return (
      <View style={[UL.ULStyles.window, UL.ULStyles.backgroundPrimary]}>
        <StatusBar barStyle="light-content" />
        <View style={UL.ULStyles.screen}>
          <UL.ULTitle text="Apple Health" lite={true}/>
          <UL.ULSubTitle text="Short description of the app any welcome details!" lite={true}/>
          <UL.ULSpace />
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
