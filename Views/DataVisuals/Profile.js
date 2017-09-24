import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
} from 'react-native';

import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import * as UL from 'ulna-ui'
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

        T.getStorage('Token', (token) => {
          this.setState({
            token: token
          })
        })

      }
    });

  }

  render() {
    return (
      <ScrollView style={UL.ULStyles.window}>
        <View>
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
              this.setState({
                hidden: Number(this.state.hidden) + 1
              })
              if (this.state.hidden > 2) {
                T.removeStorage('Onboarding');
                T.removeStorage('Connected');
                const { navigate } = this.props.navigation;
                navigate('Welcome')
              }
             }}>
             <View>
              {this.state.age && <UL.ULListItem reverse={true} title="Age" subTitle={this.state.age} /> }
             </View>
            </TouchableHighlight>
          {this.state.height && <UL.ULListItem reverse={true} title="Height" subTitle={this.state.height} /> }
          {this.state.bmi && <UL.ULListItem reverse={true} title="BMI" subTitle={this.state.bmi} /> }
          {this.state.token && <UL.ULListItem reverse={true} title="UUID" subTitle={this.state.token} /> }
        </View>
      </ScrollView>
    )
  }
}
