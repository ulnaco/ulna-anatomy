import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import * as UL from 'ulna-ui'
import * as T from '../../Tools'

export class MyRating extends React.Component {

  constructor(props) {
    super(props);
    this.state = { };
  }

  componentWillMount() {

    // Health Rating
    T.rating((result) => {
      this.setState({
        rating: result
      })
    });

    // BMI
    T.bmi((result) => {
      this.setState({
        bmi: result
      })
    })
  }

  render() {
    return (
      <ScrollView style={UL.ULStyles.window}>
        <View>
          { this.state.rating && <UL.ULListItem title="Health Rating" subTitle={this.state.rating} /> }
          { this.state.bmi && <UL.ULListItem title="BMI" subTitle={this.state.bmi} /> }
        </View>
      </ScrollView>
    )
  }
}
