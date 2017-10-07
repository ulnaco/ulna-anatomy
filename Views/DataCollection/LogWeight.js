import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TextInput,
  AlertIOS
} from 'react-native';

import AppleHealthkit from 'rn-apple-healthkit';

import * as UI from '../../UI'
import * as T from '../../Tools'

export class LogWeight extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      weight: 0,
      newWeight: 0
    };
  }

  componentWillMount() {
    AppleHealthkit.getLatestWeight({ unit: 'pound' }, (err: string, results: Object) => {
      if (results) {
        this.setState({
          weight: results.value,
          newWeight: results.value,
        })
      }
    });

  }

  render() {
    return (
      <ScrollView style={[UI.UIStyles.window, UI.UIStyles.backgroundPrimary]}>
        <View style={UI.UIStyles.screen}>
          <Text style={[UI.UIStyles.subTitle, {textAlign: 'center', color: '#ffffff', backgroundColor: 'transparent'}]}>How much do you weight? (Pounds)</Text>
          <TextInput
            style={UI.UIStyles.InputNumber}
            onChangeText={(text) => this.setState({newWeight: text})}
            placeholder={this.state.weight.toString()}
            keyboardType="numeric"
            value={this.state.newWeight.toString()}
          />
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               var weight = this.state.newWeight
               var options = { value: weight }
               AlertIOS.alert(
                 'Sync Complete',
                 'Weight saved to Apple Health', [
                   {text: 'Cancel', onPress: () => {
                       const { navigate } = this.props.navigation;
                       navigate('Dash')
                     },
                     style: 'cancel'
                   },
                   {text: 'OK', onPress: () => {
                     AppleHealthkit.saveWeight(options: Object, (err: Object, results: Object) => {
                       if (!err) {
                         const { navigate } = this.props.navigation;
                         navigate('Dash')
                       }
                     });
                   }}
                 ]
               );
             }}>
              <View>
                <UI.UIButton style="white" text="Save" />
              </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
}
