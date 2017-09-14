import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar
} from 'react-native';

import AppleHealthkit from 'rn-apple-healthkit';
import * as UL from 'ulna-ui'

export class Dash extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
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
        AppleHealthkit.getLatestHeight(null, (err: string, results: Object) => {
          if (results) {
            this.setState({
              height: Math.floor(results.value / 12)+"'"
            })
          }
        });

      }
    });
  }

  render() {
    return (
      <ScrollView style={UL.ULStyles.window}>
        <StatusBar barStyle="dark-content" />
        <View>
          <TouchableHighlight
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('LogWeight')
             }}>
            <View>
              <UL.ULButton style="primary" text="Log Weight" />
            </View>
          </TouchableHighlight>
          <View style={{marginBottom: UL.ULStyleguide.spacing}}>
            <TouchableHighlight
               onPress={() => {
                 const { navigate } = this.props.navigation;
                 navigate('MyRating')
               }}>
               <View>
                <UL.ULListItem title="Health Rating" subTitle="A+" />
               </View>
            </TouchableHighlight>
            <UL.ULListItem title="BMI" subTitle="74" />
            { this.state.age && <UL.ULListItem title="Age" subTitle={this.state.age} /> }
            { this.state.height && <UL.ULListItem title="Height" subTitle={this.state.height} /> }
          </View>
          <TouchableHighlight
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('Weight')
             }}>
            <View>
              <UL.ULButton style="primary" text="DataVisuals : Weight" />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('MyRating')
             }}>
            <View>
              <UL.ULButton style="primary" text="My Rating" />
            </View>
          </TouchableHighlight>
        </View>
      </ScrollView>
    )
  }
}
