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
        AppleHealthkit.getLatestHeight(null, (err: string, results: Object) => {
          if (results) {
            this.setState({
              height: Math.floor(results.value / 12)+"'"
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

        // Weight (Pounds)
        let weightOpts = {
          unit: 'pound',
          startDate: moment().subtract(1, 'week').toISOString(),
          endDate: moment().toISOString()
        }
        AppleHealthkit.getWeightSamples(weightOpts: Object, (err: string, results: Object) => {
          if (results) {
            const weightDiff = (results[0].value - results[results.length-1].value);
            if (weightDiff > 0) {
              weightDiff = "+"+weightDiff+" "+weightOpts.unit+"s"
            }
            else {
              weightDiff = "-"+weightDiff+" "+weightOpts.unit+"s"
            }
            this.setState({
              thisWeek: results[0].value,
              lastWeek: results[results.length-1].value,
              weightDiff: weightDiff,
              chart: [results[results.length-1].value, results[0].value],
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
               { this.state.rating && <UL.ULListItem title="Health Rating" subTitle={this.state.rating} /> }
               </View>
            </TouchableHighlight>
            { this.state.bmi && <UL.ULListItem title="BMI" subTitle={this.state.bmi} /> }
            { this.state.age && <UL.ULListItem title="Age" subTitle={this.state.age} /> }
            { this.state.height && <UL.ULListItem title="Height" subTitle={this.state.height} /> }
            { this.state.steps && <UL.ULListItem title="Steps Today" subTitle={this.state.steps} /> }
          </View>
          <TouchableHighlight
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('Weight')
             }}>
               <View style={{marginBottom: UL.ULStyleguide.spacing}}>
                { this.state.chart &&  <T.BarVertical values={this.state.chart} /> }
                { this.state.thisWeek && <UL.ULListItem title="Weight" subTitle={this.state.weightDiff} /> }
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
