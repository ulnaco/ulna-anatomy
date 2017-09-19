import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar
} from 'react-native';

import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';
import * as UL from 'ulna-ui'

import * as T from '../../Tools'
import * as C from '../../Components'

export class Dash extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentWillMount() {
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
      <ScrollView style={[UL.ULStyles.window, {paddingTop: 0}]}>
        <StatusBar barStyle="dark-content" />
        <View style={{paddingBottom: UL.ULStyleguide.spacing}}>
          <View style={[UL.ULStyles.backgroundPrimary, {paddingVertical: UL.ULStyleguide.spacing*1.5, justifyContent: 'center'}]}>
            <Text style={[UL.ULStyles.largeTitle, {textAlign: 'center', fontWeight: 'bold', color: '#ffffff', marginBottom: 0}]}>{this.state.rating}</Text>
            <Text style={[UL.ULStyles.subTitle, {textAlign: 'center', color: '#ffffff'}]}>Health Rating</Text>
          </View>
          <View style={{marginBottom: UL.ULStyleguide.spacing}}>
            <TouchableHighlight
               underlayColor='transparent'
               onPress={() => {
                 const { navigate } = this.props.navigation;
                 navigate('MyRating')
               }}>
               <View>
               { this.state.rating && <UL.ULListItem title="Health Rating" subTitle={this.state.rating} /> }
               </View>
            </TouchableHighlight>
            { this.state.bmi && <UL.ULListItem title="BMI" subTitle={this.state.bmi} /> }
            { this.state.age && <UL.ULListItem title="Age" subTitle={this.state.age} /> }
            { this.state.height && <UL.ULListItem title="Height" subTitle={this.state.height} /> }
          </View>
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('LogWeight')
             }}>
            <View>
              <UL.ULButton style="primary" text="Log Weight" />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('Weight')
             }}>
             <View>
              <C.VsLast />
             </View>
          </TouchableHighlight>
          <TouchableHighlight
             underlayColor='transparent'
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
