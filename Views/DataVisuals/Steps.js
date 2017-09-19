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

export class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {

        // Distance
        AppleHealthkit.getDistanceWalkingRunning({ unit: 'mile' }, (err: Object, results: Object) => {
          if (results) {
            this.setState({
              distance: (results.value).toFixed(2)+' mi'
            })
          }
        });

        // Weight (Pounds)
        let weightOpts = {
          startDate: moment().subtract(1, 'years').toISOString(),
          endDate: moment().toISOString()
        }
        AppleHealthkit.getDailyStepCountSamples(weightOpts: Object, (err: string, results: Object) => {
          var timeline = [];
          var most = { value: 0, startDate: 0 };
          var most30 = { value: 0, startDate: 0 };
          for (var i = 0; i < results.length; i++) {
            if (most.value < results[i].value) most = results[i]
            if (i == 0) {
              this.setState({
                steps: T.thousand(results[i].value),
              })
            }
            else {
              if (i > 25) continue;
              var stepsFormat = T.thousand(results[i].value)
              timeline.push(<UL.ULListItem reverse={true} title={moment(results[i].startDate).fromNow()} subTitle={stepsFormat} />);
            }
            if (most30.value < results[i].value) most30 = results[i]

          }

          this.setState({
            mostSteps: T.thousand(most.value),
            mostStepsDate: moment(most.startDate).fromNow(),
            mostSteps30: T.thousand(most30.value),
            mostStepsDate30: moment(most30.startDate).fromNow(),
          })

          if (timeline.length > 0) {
            this.setState({
              stepsTimeline: timeline,
            })
          }

        });

      }
    });
  }

  render() {
    return (
      <ScrollView style={UL.ULStyles.window}>
        <View>
          { this.state.steps &&
            <View style={{marginBottom: UL.ULStyleguide.spacing}}>
              <UL.ULListItem title="Steps Today" subTitle={this.state.steps} />
              <UL.ULListItem reverse={true} title="Distance Today" subTitle={this.state.distance} />
              <UL.ULListItem small={true} title="Most Steps in a Day" subTitle={this.state.mostSteps} subSubTitle={this.state.mostStepsDate} />
              <UL.ULListItem small={true} title="30 Day High" subTitle={this.state.mostSteps30} subSubTitle={this.state.mostStepsDate30} />
            </View>
          }
          {this.state.stepsTimeline &&
            <View>
              <UL.ULSubTitle text="Last 30 Days" />
              <View style={{marginBottom: UL.ULStyleguide.spacing*2}}>
                {this.state.stepsTimeline}
              </View>
            </View>
          }
        </View>
      </ScrollView>
    )
  }
}
