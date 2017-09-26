import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import { UIStyles } from '../Styles/UIStyles';

export class UIFeaturedText extends React.Component {

  render() {
    return (
      <View style={UIStyles.ListItem}>
        <View style={UIStyles.ListItemInner}>
          <Text style={UIStyles.ListItemTitle}>{this.props.title}</Text>
          <Text style={UIStyles.ListItemSubTitle}>{this.props.subTitle}</Text>
          {this.props.subSubTitle && <Text style={UIStyles.ListItemTitle}>{this.props.subSubTitle}</Text>}
        </View>
      </ View>
    )
  }
}
