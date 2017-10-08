import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar
} from 'react-native';

import AppleHealthkit from 'rn-apple-healthkit';

import * as UI from '../../UI'
import * as T from '../../Tools'

export class Health extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      new: true
    };
  }

  componentDidMount() {
    T.getStorage('O/Health', (results) => {
      if (results) {
        this.setState({
          new: false
        })
      }
    });
  }

  syncAppleHealth() {
    T.Watchdog(this);
    let options = T.Permissions()
    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {
        AppleHealthkit.initHealthKit(options: Object, (err: Object, results: Object) => {
          if (err) return;
          const { navigate } = this.props.navigation;
          T.getStorage('O/Localization', (results) => {
            if (results) {
              navigate('Dash')
            } else {
              navigate('Localization')
            }
          });
          T.setStorage('O/Health', JSON.stringify(options));
        });
      }
    });
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
          <UI.UITitle text={T.Speech.onboarding.apple_title} lite={true}/>
          <UI.UISubTitle text={T.Speech.onboarding.apple_sub_title}  lite={true}/>
          <UI.UISpace small={true} />
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               this.syncAppleHealth();
             }}>
            <View>
              {this.state.new && <UI.UIButton style="white" text={T.Speech.onboarding.apple_button_first} /> }
              {!this.state.new &&
                <View>
                  <UI.UISubTitle text={T.Speech.onboarding.apple_new_sync} lite={true}/>
                  <UI.UIButton style="white" text={T.Speech.onboarding.apple_button} />
                </View>
              }
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
