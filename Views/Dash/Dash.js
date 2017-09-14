import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar
} from 'react-native';

import * as UL from 'ulna-ui'

export class Dash extends React.Component {

  render() {
    return (
      <ScrollView style={UL.ULStyles.window}>
        <StatusBar barStyle="dark-content" />
        <View>
          <TouchableHighlight
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('Weight')
             }}>
            <View>
              <UL.ULButton style="primary" text="DataVisuals : Weight" />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('LogWeight')
             }}>
            <View>
              <UL.ULButton style="primary" text="DataCollection : LogWeight" />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('MyRating')
             }}>
            <View>
              <UL.ULButton style="primary" text="HealthRating : MyRating" />
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
}
