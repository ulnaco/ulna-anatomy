import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import * as UL from 'ulna-ui'

export class LogWeight extends React.Component {

  render() {

    return (
      <ScrollView style={UL.ULStyles.window}>
        <View style={UL.ULStyles.screen}>
          <UL.ULTitle text="LogWeight"/>
        </View>
      </ScrollView>
    )
  }
}
