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
    T.Watchdog(this);
    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {
        // Age
        AppleHealthkit.getDateOfBirth(null, (err: string, results: Object) => {
          if (results.age) {
            this.setState({
              age: results.age
            })
          }
        });

        // Height
        AppleHealthkit.getLatestHeight({unit: 'foot'}, (err: string, results: Object) => {
          if (results) {
            const height = results.value.toFixed(1).replace(".", "'")
            this.setState({
              height: height
            })
          }
        });

        // BMI
        T.bmi((result) => {
          this.setState({
            bmi: result
          })
        })

        T.getStorage('Person', (uuid) => {
          this.setState({
            uuid: uuid
          })
        })

      }
    });

  }

  render() {
    return (
      <ScrollView style={UI.UIStyles.window}>
        <View>
         {this.state.age && <UI.UIListItem reverse={true} title="Age" subTitle={this.state.age} /> }
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
              this.setState({
                hidden: Number(this.state.hidden) + 1
              })
              if (this.state.hidden > 2) {
                T.removeStorage('Onboarding');
                T.removeStorage('Connected');
                T.removeStorage('Person');
                const { navigate } = this.props.navigation;
                navigate('Welcome')
              }
             }}>
             <View>
                {this.state.bmi && <UI.UIListItem reverse={true} title="BMI" subTitle={this.state.bmi} /> }
             </View>
            </TouchableHighlight>
          {this.state.height && <UI.UIListItem reverse={true} title="Height" subTitle={this.state.height} /> }
          {this.state.uuid && <UI.UIListItem reverse={true} subTitle={this.state.uuid} /> }
        </View>
      </ScrollView>
    )
  }
}
