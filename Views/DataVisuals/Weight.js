import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';
import * as UL from 'ulna-ui'

import * as C from '../../Components'

export class Weight extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentWillMount() {
    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {

        // Weight (Pounds)
        let weightOpts = {
          unit: 'pound',
          startDate: moment().subtract(1, 'years').toISOString(),
          endDate: moment().toISOString()
        }
        AppleHealthkit.getWeightSamples(weightOpts: Object, (err: string, results: Object) => {
          var timeline = [];
          var lowest = { value: 1000, startDate: 0 };
          var heaviest = { value: 0, startDate: 0 };
          for (var i = 0; i < results.length; i++) {
            if (i == 0) {
              this.setState({
                currentWeight: results[i].value,
                currentWeightUpdated: "Last Updated "+moment(results[i].startDate).fromNow()
              })
            }
            else {
              timeline.push(<UL.ULListItem title={moment(results[i].startDate).fromNow()} subTitle={results[i].value} />);
            }

            if (lowest.value > results[i].value) lowest = results[i]
            if (heaviest.value < results[i].value) heaviest = results[i]

          }

          this.setState({
            weightTimeline: timeline,
            lowestWeight: lowest.value,
            lowestWeightDate: moment(lowest.startDate).fromNow(),
            heaviestWeight: heaviest.value,
            heaviestWeightDate: moment(heaviest.startDate).fromNow(),
          })
        });

      }
    });
  }

  render() {
    return (
      <ScrollView style={UL.ULStyles.window}>
        <View>
          <TouchableHighlight
             underlayColor='rgba(0,0,0,0,0.0)'
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('LogWeight')
             }}>
            <View>
              <UL.ULButton style="primary" text="Log Weight" />
            </View>
          </TouchableHighlight>
          { this.state.currentWeight &&
            <View style={{marginBottom: UL.ULStyleguide.spacing}}>
              <UL.ULListItem title="Weight" subTitle={this.state.currentWeight} subSubTitle={this.state.currentWeightUpdated} />
              <UL.ULListItem title="Lowest Weight" subTitle={this.state.lowestWeight} subSubTitle={this.state.lowestWeightDate}/>
              <UL.ULListItem title="Heaviest Weight" subTitle={this.state.heaviestWeight} subSubTitle={this.state.heaviestWeightDate}/>
            </View>
          }
          <View style={{marginBottom: UL.ULStyleguide.spacing}}>
            <C.VsLast />
          </View>
          <UL.ULSubTitle text="History" />
          <View style={{marginBottom: UL.ULStyleguide.spacing*2}}>
            {this.state.weightTimeline}
          </View>
        </View>
      </ScrollView>
    )
  }
}
