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

import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'


import * as UL from 'ulna-ui'

export class Welcome extends React.Component {

  render() {
    return (
      <View style={[UL.ULStyles.window]}>
        <StatusBar barStyle="light-content" />
        <AnimatedLinearGradient customColors={UL.ULStyleguide.gradient} speed={4000}/>
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: UL.ULStyleguide.spacing*1.5,
          }}>
          <UL.ULTitle lite={true} text="Welcome"/>
          <UL.ULSubTitle lite={true} text="Ulna Anatomy is designed to help people live healthier & happier lives!"/>
          <UL.ULSpace small={true} />
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
