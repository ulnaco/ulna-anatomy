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

import * as UL from 'ulna-ui'
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
      <ScrollView style={UL.ULStyles.window}>
        <View style={UL.ULStyles.screen}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
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
                       navigate('Weight')
                     },
                     style: 'cancel'
                   },
                   {text: 'OK', onPress: () => {
                     AppleHealthkit.saveWeight(options: Object, (err: Object, results: Object) => {
                       if (!err) {
                         T.Track('event', 'Logged Weight')
                         const { navigate } = this.props.navigation;
                         navigate('Weight')
                       }
                     });
                   }}
                 ]
               );
             }}>
              <View>
                <UL.ULButton style="primary" text="Save" />
              </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
}
