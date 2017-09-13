import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import * as UL from 'ulna-ui'

export class Welcome extends React.Component {

  render() {
    return (
      <ScrollView style={UL.ULStyles.window}>
        <View style={UL.ULStyles.screen}>
          <TouchableHighlight
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('Health')
             }}>
            <View>
              <UL.ULButton style="primary" text="Onboarding : Health" />
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
}
