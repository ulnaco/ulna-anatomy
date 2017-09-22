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


import PushNotification from 'react-native-push-notification';
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'
import * as UL from 'ulna-ui'

import * as T from '../../Tools'

export class Notifications extends React.Component {

  enable() {
    PushNotification.configure({
      onRegister: function(token) {
        T.setStorage('Token', token);
      },

      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    PushNotification.setApplicationIconBadgeNumber(0)
  }

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
          <UL.ULTitle lite={true} text="Notifications"/>
          <UL.ULSubTitle lite={true} text="Ulna Anatomy is designed to help people live healthier & happier lives!"/>
          <UL.ULSpace small={true} />
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               this.enable()
               T.setStorage('Onboarding', 'complete');
               const { navigate } = this.props.navigation;
               navigate('Dash')
             }}>
            <View>
              <UL.ULButton style="white" text="Enable" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
