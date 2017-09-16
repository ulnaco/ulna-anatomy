import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar
} from 'react-native';

import * as UL from 'ulna-ui'

export class Welcome extends React.Component {

  render() {
    return (
      <View style={[UL.ULStyles.window, UL.ULStyles.backgroundPrimary]}>
        <StatusBar barStyle="light-content" />
        <View style={UL.ULStyles.screen}>
          <TouchableHighlight
             underlayColor='rgba(0,0,0,0,0.0)'
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('Health')
             }}>
            <View>
              <UL.ULButton style="white" text="Onboarding : Health" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
