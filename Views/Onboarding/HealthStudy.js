import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar,
  Alert
} from 'react-native';

import * as UL from 'ulna-ui'

export class HealthStudy extends React.Component {

  JoinStudy() {
    const { navigate } = this.props.navigation;
    navigate('Dash')
  }

  render() {
    return (
      <View style={[UL.ULStyles.window, UL.ULStyles.backgroundPrimary]}>
        <StatusBar barStyle="light-content" />
        <View style={UL.ULStyles.screen}>
          <UL.ULTitle text="Health Study" lite={true} />
          <UL.ULSubTitle text="Short description of the app any welcome details!" lite={true} />
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               Alert.alert('Your Amazing!', '', [{text: 'OK', onPress: () => this.JoinStudy()}], { cancelable: false })
             }}>
             <View>
              <UL.ULButton style="white" text="Join Anonymous Study" />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               Alert.alert('Are you sure?', '100% Anonymous and Free!',
               [
                 {
                   text: 'No',
                   onPress: () => {
                     const { navigate } = this.props.navigation;
                     navigate('Dash')
                   }
                 },
                 {
                   text: 'Join',
                   onPress: () => {
                     this.JoinStudy()
                   }
                 }
               ])
             }}>
            <View>
              <UL.ULButton style="primary" text="Maybe Later" />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
