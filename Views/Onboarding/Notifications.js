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

  enable(fn) {
    PushNotification.configure({
      onRegister: function(token) {

        // Update Profile
        T.Person({
          'Notification Token': token.token,
        });

        T.setStorage('Token', token.token);
        T.Track('event', 'Enable Notifications');
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

    fn()
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
          <UI.UITitle lite={true} text="Enable Notifications"/>
          <UI.UISubTitle lite={true} text="Recieve friendly infrequent notifications about your health!"/>
          <UI.UISpace small={true} />
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               this.enable(() => {
                 T.setStorage('EnableNotifications', 'yes');
                 const { navigate } = this.props.navigation;
                 navigate('Dash')
               })
             }}>
            <View>
              <UI.UIButton style="white" text="Enable" />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               T.Track('event', 'Disable Notifications');
               T.setStorage('EnableNotifications', 'no');
               const { navigate } = this.props.navigation;
               navigate('Dash')
             }}>
             <View>
               <UI.UIButton style="primary" text="Maybe Later" />
             </View>
           </TouchableHighlight>
        </View>
      </View>
    )
  }
}
