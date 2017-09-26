import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import { UIStyles } from '../Styles/UIStyles';

export class UISubTitle extends React.Component {

  render() {
    return (
      <View style={{backgroundColor: 'transparent'}}>
        {this.props.lite &&
          <Text style={[UIStyles.subTitle, UIStyles.colorWhite, UIStyles.textCenter]}>{this.props.text}</Text>
        }
        {!this.props.lite &&
          <Text style={[UIStyles.subTitle, UIStyles.textCenter]}>{this.props.text}</Text>
        }
      </ View>
    )
  }
}
