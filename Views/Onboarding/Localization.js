import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar,
  Alert
} from 'react-native';

import * as UI from '../../UI'
import * as T from '../../Tools'

export class Localization extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <View style={[UI.UIStyles.window, UI.UIStyles.backgroundAccent]}>
        <StatusBar barStyle="light-content" />
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: UI.UIStyleguide.spacing*1.5,
          }}>
          <UI.UITitle text={T.Speech.onboarding.localization_title}  lite={true} />
          <UI.UISubTitle text={T.Speech.onboarding.localization_sub_title} lite={true}/>
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               T.setStorage('Localization', 'Metric');
               T.setStorage('O/Localization', 'yes');
               T.Person({
                 'Localization': 'Metric'
               });
               const { navigate } = this.props.navigation;
               T.getStorage('O/Inital', (results) => {
                 if (results) {
                   navigate('Dash')
                 } else {
                   navigate('Inital')
                 }
               });
             }}>
            <View>
              <UI.UIButton style="white" text={T.Speech.onboarding.localization_metric} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               T.setStorage('Localization', 'Imperial');
               T.setStorage('O/Localization', 'yes');
               T.Person({
                 'Localization': 'Imperial'
               });
               const { navigate } = this.props.navigation;
               T.getStorage('O/Inital', (results) => {
                 if (results) {
                   navigate('Dash')
                 } else {
                   navigate('Inital')
                 }
               });
             }}>
             <View>
              <UI.UIButton style="white" text={T.Speech.onboarding.localization_imperial} />
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
