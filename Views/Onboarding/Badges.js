import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar,
  Image
} from 'react-native';

import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'

import * as UI from '../../UI'
import * as T from '../../Tools'

export class Badges extends React.Component {

  enable(fn) {
    // T.Notifications();
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
          <Image
          style={{width: 200, height: 200}}
          source={require('../../assets/badges.png')}
        />
          <UI.UITitle lite={true} text="Steps as badges?"/>
          <UI.UISubTitle lite={true} text="Quickly preview your step count!"/>
          <UI.UISpace small={true} />
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               this.enable(() => {
                 T.setStorage('EnableBadges', 'yes');
                 T.setStorage('O/Badges', 'yes');
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
               T.setStorage('O/Badges', 'yes');
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
