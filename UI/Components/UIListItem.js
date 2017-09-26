import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import { UIStyles } from '../Styles/UIStyles';

export class UIListItem extends React.Component {

  render() {
    return (
      <View style={UIStyles.ListItem}>
        {!this.props.small && !this.props.reverse && !this.props.justtext &&
          <View style={UIStyles.ListItemInner}>
            <Text style={UIStyles.ListItemTitle}>{this.props.title}</Text>
            <Text style={UIStyles.ListItemSubTitle}>{this.props.subTitle}</Text>
          </View>
        }
        {this.props.small &&
          <View style={UIStyles.ListItemInner}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={UIStyles.ListItemTitle}>{this.props.title}</Text>
                <Text style={[UIStyles.ListItemTitle, {fontSize: 11}]}>{this.props.subSubTitle}</Text>
              </View>
              <View style={{paddingTop: 5}}>
                <Text style={[UIStyles.ListItemSubTitle, {fontSize: 20}]}>{this.props.subTitle}</Text>
              </View>
            </View>
          </View>
        }
        {this.props.reverse &&
          <View style={UIStyles.ListItemInner}>
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{paddingTop: 5}}>
                <Text style={[UIStyles.ListItemSubTitle, {fontSize: 20}]}>{this.props.subTitle}</Text>
              </View>
              <View style={{paddingTop: 10}}>
                <Text style={UIStyles.ListItemTitle}>{this.props.title}</Text>
              </View>
            </View>
          </View>
        }
        {this.props.justtext &&
          <View style={UIStyles.ListItemInner}>
            <View style={{paddingTop: 5}}>
              <Text style={UIStyles.ListItemTitle}>{this.props.text}</Text>
            </View>
          </View>
        }
      </ View>
    )
  }
}
