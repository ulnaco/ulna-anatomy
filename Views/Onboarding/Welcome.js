import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar
} from 'react-native';

import AnimatedLinearGradient, { presetColors } from 'react-native-animated-linear-gradient'

import moment from 'moment'
import * as UI from '../../UI'
import * as T from '../../Tools'

export class Welcome extends React.Component {

  componentDidMount() {
    T.Person();
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
          <UI.UITitle lite={true} text={T.Speech.onboarding.welcome_title}/>
          <UI.UISubTitle lite={true} text={T.Speech.onboarding.welcome_sub_title} />
          <UI.UISpace small={true} />
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               T.setStorage('O/Welcome', moment().format());
               const { navigate } = this.props.navigation;
               navigate('Health')
             }}>
            <View>
              <UI.UIButton style="white" text={T.Speech.onboarding.welcome_button} />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
