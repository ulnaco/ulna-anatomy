import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import { UIStyles } from '../Styles/UIStyles';

export class UIButton extends React.Component {

  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      {this.props.style == 'white' &&
        <View style={UIStyles.buttonWhite}>
          <Text style={[UIStyles.colorBlack, UIStyles.textCenter]}>{this.props.text}</Text>
        </View>
      }
      {this.props.style == 'primary' &&
        <View style={UIStyles.buttonPrimary}>
          <Text style={[UIStyles.colorWhite, UIStyles.textCenter]}>{this.props.text}</Text>
        </View>
      }
      {this.props.style == 'black' &&
        <View style={UIStyles.buttonBlack}>
          <Text style={[UIStyles.colorWhite, UIStyles.textCenter]}>{this.props.text}</Text>
        </View>
      }
      {this.props.style == 'accent' &&
        <View style={UIStyles.buttonAccent}>
          <Text style={[UIStyles.colorWhite, UIStyles.textCenter]}>{this.props.text}</Text>
        </View>
      }
      </ View>

    )
  }
}
