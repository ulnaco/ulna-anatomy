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

import * as UI from '../../UI'
import * as T from '../../Tools'

export class Notifications extends React.Component {

  enable() {
    PushNotification.configure({
      onRegister: function(token) {
        T.setStorage('Token', token);
        console.log('Token', token);
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
  }

  render() {
    return (
      <View style={[UI.UIStyles.window]}>
        <StatusBar barStyle="light-content" />
        <AnimatedLinearGradient customColors={UI.UIStyleguide.gradient} speed={4000}/>
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: UI.UIStyleguide.spacing*1.5,
          }}>
          <UI.UITitle lite={true} text="Notifications"/>
          <UI.UISubTitle lite={true} text="Ulna Anatomy is designed to help people live healthier & happier lives!"/>
          <UI.UISpace small={true} />
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               this.enable()
               T.setStorage('Notifications', 'complete');
               const { navigate } = this.props.navigation;
               navigate('Dash')
             }}>
            <View>
              <UI.UIButton style="white" text="Enable" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
