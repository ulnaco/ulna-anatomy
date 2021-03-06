import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import * as UI from '../../UI'
import * as C from '../../Components'
import * as T from '../../Tools'

export class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: 0,
    };
  }

  componentWillMount() {
    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {

        // Fetch Healthkit
        T.getStorage('Healthkit', (results) => {
          results = JSON.parse(results)
          this.setState({
            Age: results.Age,
            Height: results.Height,
            BMI: results.BMI,
            UUID: results.UUID,
          })
        });

      }
    });

  }

  render() {
    return (
      <ScrollView style={UI.UIStyles.window}>
        <View>
         {this.state.Age && <UI.UIListItem reverse={true} title="Age" subTitle={this.state.Age} /> }
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
              this.setState({
                hidden: Number(this.state.hidden) + 1
              })
              if (this.state.hidden > 2) {
                T.removeStorage('O/Welcome');
                T.removeStorage('O/Health');
                T.removeStorage('O/Localization');
                T.removeStorage('O/Inital');
                T.removeStorage('O/Notifications');
                T.removeStorage('O/Badges');
                T.removeStorage('EnableBadges');
                const { navigate } = this.props.navigation;
                navigate('Welcome')
              }
             }}>
             <View>
                {this.state.BMI && <UI.UIListItem reverse={true} title="BMI" subTitle={this.state.BMI} /> }
             </View>
            </TouchableHighlight>
            {this.state.UUID && <UI.UIListItem reverse={true} subTitle={this.state.UUID} /> }

        </View>
      </ScrollView>
    )
  }
}
