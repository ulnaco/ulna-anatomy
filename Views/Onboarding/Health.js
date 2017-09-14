import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
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
      <ScrollView style={UL.ULStyles.window}>
        <View style={UL.ULStyles.screen}>
          <TouchableHighlight
             onPress={() => {
               this.syncAppleHealth();
             }}>
            <View>
              <UL.ULButton style="primary" text="Dash : Dash" />
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
}
