import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TextInput,
  StatusBar
} from 'react-native';

import moment from 'moment'
import Prompt from 'react-native-prompt';
import AppleHealthkit from 'rn-apple-healthkit';

import * as UI from '../../UI'
import * as T from '../../Tools'

export class InitalRating extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      analysing: true,
    };
  }

  async componentWillMount() {
    T.Watchdog(this);
    await this.verify();
    await this.checkWeight();
  }

  // Verify Done with Initial Rating
  verify() {
    T.rating((results) => {
      if (results) {
        this.setState({
          analysing: false,
          done: true,
        })
        console.log(results)
      }
    });
  }

  checkWeight() {

  }

  render() {
    return (
      <View style={[UI.UIStyles.window, UI.UIStyles.backgroundPrimary]}>
        <StatusBar barStyle="light-content" />
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: UI.UIStyleguide.spacing*1.5,
          }}>

            {/* Analysing */}
            {this.state.analysing &&
              <Text style={[UI.UIStyles.subTitle, {textAlign: 'center', color: '#ffffff', backgroundColor: 'transparent'}]}>Analysing..</Text>
            }

            {/* Done */}
            {this.state.done &&
              <TouchableHighlight
                 underlayColor='transparent'
                 onPress={() => {
                   const { navigate } = this.props.navigation;
                   navigate('Notifications')
                 }}>
                <View>
                  <UI.UIButton style="white" text="Next" />
                </View>
              </TouchableHighlight>
            }

        </View>
      </View>
    )
  }
}
