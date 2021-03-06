import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar
} from 'react-native';

import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'

import * as UI from '../../UI'
import * as T from '../../Tools'

export class Notifications extends React.Component {

  enable(fn) {
    T.Notifications();
    fn()
  }

  render() {
    return (
      <View style={[UI.UIStyles.window, UI.UIStyles.backgroundAccent]}>
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
                 T.setStorage('O/Notifications', 'yes');
                 const { navigate } = this.props.navigation;
                 navigate('Badges')
               })
             }}>
            <View>
              <UI.UIButton style="white" text="Enable" />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               T.setStorage('EnableNotifications', 'no');
               T.setStorage('O/Notifications', 'yes');
               const { navigate } = this.props.navigation;
               navigate('Dash')
             }}>
             <View>
               <UI.UIButton style="accent" text="Maybe Later" />
             </View>
           </TouchableHighlight>
        </View>
      </View>
    )
  }
}
