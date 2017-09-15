import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import * as UL from 'ulna-ui'

import * as C from '../../Components'

export class Weight extends React.Component {

  render() {
    return (
      <ScrollView style={UL.ULStyles.window}>
        <View>
          <C.VsLast />
          <TouchableHighlight
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('LogWeight')
             }}>
            <View>
              <UL.ULButton style="primary" text="Log Weight" />
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
}
