import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar
} from 'react-native';

import AnimatedLinearGradient, { presetColors } from 'react-native-animated-linear-gradient'

import * as UI from '../../UI'
import * as T from '../../Tools'

export class Welcome extends React.Component {

  componentDidMount() {
    T.Person();
    T.Watchdog(this);
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
          <UI.UITitle lite={true} text="Welcome"/>
          <UI.UISubTitle lite={true} text="Ulna Anatomy is designed to help people live healthier & happier lives!"/>
          <UI.UISpace small={true} />
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('Health')
             }}>
            <View>
              <UI.UIButton style="white" text="Get Started" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
