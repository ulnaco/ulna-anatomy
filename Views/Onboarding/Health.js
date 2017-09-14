import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar
} from 'react-native';


import AppleHealthKit from 'rn-apple-healthkit';
import * as UL from 'ulna-ui'

export class Health extends React.Component {


  componentDidMount() {

  }

  syncAppleHealth() {

    let options = {
      permissions: {
        read: ["Height", "Weight", "DateOfBirth", "BodyMassIndex"],
        write: ["Weight", "BodyMassIndex"]
      }
    };

    AppleHealthKit.isAvailable((err: Object, available: boolean) => {
      if (available) {
        AppleHealthKit.initHealthKit(options: Object, (err: Object, results: Object) => {
          if (err) return;
          const { navigate } = this.props.navigation;
          navigate('Dash')
        });
      }
    });

  }

  render() {
    return (
      <View style={[UL.ULStyles.window, UL.ULStyles.backgroundPrimary]}>
        <StatusBar barStyle="light-content" />
        <View style={UL.ULStyles.screen}>
          <TouchableHighlight
             onPress={() => {
               this.syncAppleHealth();
             }}>
            <View>
              <UL.ULButton style="white" text="Dash : Dash" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
