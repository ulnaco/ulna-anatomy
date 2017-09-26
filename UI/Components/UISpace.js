import React, { Component } from 'react';
import {
  View,
} from 'react-native';

import { UIStyles } from '../Styles/UIStyles';

export class UISpace extends React.Component {

  render() {
    return (
      <View>
        {this.props.small &&
          <View style={UIStyles.spaceSM} />
        }
        {!this.props.small &&
          <View style={UIStyles.space} />
        }
      </View>
    )
  }
}
