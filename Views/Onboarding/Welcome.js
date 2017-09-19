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

import * as UL from 'ulna-ui'

export class Welcome extends React.Component {

  render() {
    return (
      <View style={[UL.ULStyles.window, UL.ULStyles.backgroundPrimary]}>
        <StatusBar barStyle="light-content" />
        <View style={UL.ULStyles.screen}>
          <UL.ULTitle text="Ulna Anatomy" lite={true}/>
          <UL.ULSubTitle text="Helping people live healthier & happier lives" lite={true}/>
          <UL.ULSpace />
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('Health')
             }}>
            <View>
              <UL.ULButton style="white" text="Get Started" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
