import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import AppleHealthkit from 'rn-apple-healthkit';
import * as UL from 'ulna-ui'

import * as T from '../../Tools'

export class MyRating extends React.Component {

  constructor(props) {
    super(props);
    this.state = { };
  }

  componentWillMount() {
    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {

        // Steps
        let options = { }
        AppleHealthkit.getStepCount(options: Object, (err: string, results: Object) => {
          if (results) {
            this.setState({
              steps: T.thousand(results.value)
            })
          }
        });

        // BMI
        T.bmi((result) => {
          this.setState({
            bmi: result
          })
        })

        // Health Rating
        T.rating((result) => {
          this.setState({
            rating: result
          })
        });

      }
    });
  }

  render() {
    return (
      <ScrollView style={UL.ULStyles.window}>
        <View>
          <View style={{marginBottom: UL.ULStyleguide.spacing}}>
            { this.state.rating && <UL.ULListItem title="Health Rating" subTitle={this.state.rating} /> }
          </View>
          <View style={{marginBottom: UL.ULStyleguide.spacing}}>
            { this.state.bmi && <UL.ULListItem title="BMI" subTitle={this.state.bmi} /> }
            { this.state.steps && <UL.ULListItem title="Steps Today" subTitle={this.state.steps} /> }
          </View>
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('Profile')
             }}>
            <View>
              <UL.ULButton style="accent" text="Health Profile" />
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
}
