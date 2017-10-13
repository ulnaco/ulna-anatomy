import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  AppState
} from 'react-native';

import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import * as UI from '../../UI'
import * as C from '../../Components'
import * as T from '../../Tools'

export class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    T.Watchdog(this);

    // Localization
    T.getLocalization((results) => {
      this.setState({
        localization: results
      })
      this.Healthkit();
    })

    AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState == 'active') {
        this.Healthkit();
      }
    })

  }

  Healthkit() {

    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {

        T.Healthkit(() => {
          T.getStorage('Healthkit', (results) => {
            results = JSON.parse(results)
            this.setState({
              StepCount: T.thousand(results.StepCount),
              StepCountYesterday: results.StepCountYesterday,
              DistanceWalkingRunning: results.DistanceWalkingRunning,
              ActiveEnergyBurned: results.ActiveEnergyBurned,
              Rating: results.Rating,
              DistanceCycling: results.DistanceCycling,
            })

            // Steps Yesterday
            var yesterdayOpts = {
              date: moment().subtract(1, 'day').endOf('day').toISOString()
            }
            T.StepScore(yesterdayOpts.date, (score) => {
              this.setState({
                yesterday: T.thousand(results.StepCountYesterday),
                yesterdayScore: score
              })
            })

          });

          // Steps Over Time
          let stepsOverTimeOpts = {
            startDate: moment().subtract(1, 'years').toISOString(),
            endDate: moment().toISOString()
          }
          AppleHealthkit.getDailyStepCountSamples(stepsOverTimeOpts: Object, (err: string, results: Object) => {
            var timeline = [];
            var most = { value: 0, startDate: 0 };
            var most30 = { value: 0, startDate: 0 };
            for (var i = 0; i < results.length; i++) {
              if (most.value < results[i].value) most = results[i]
              if (i > 0) {
                if (i > 25) continue;
                var stepsFormat = T.thousand(results[i].value)
                timeline.push(<UI.UIListItem key={i} reverse={true} title={moment(results[i].startDate).fromNow()} subTitle={stepsFormat} />);
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
        });

      }
    });
  }

  render() {
    return (
      <ScrollView style={UI.UIStyles.window}>
        <View>
            <View style={{marginBottom: UI.UIStyleguide.spacing}}>
              { this.state.StepCount && this.state.DistanceWalkingRunning &&
                <View>
                  <UI.UIListItem title="Steps Today" subTitle={this.state.StepCount} />
                  <UI.UIListItem reverse={true} title="Distance Today" subTitle={this.state.DistanceWalkingRunning} />
                </View>
              }
              { this.state.ActiveEnergyBurned &&
                <View>
                  <UI.UIListItem title="Active Energy Burned Today" subTitle={this.state.ActiveEnergyBurned} subSubTitle="Active Energy includes walking slowly and household chores, as well as exercise such as biking and dancing." />
                </View>
              }

              { this.state.StepCountYesterday &&
                <View>
                  <UI.UIListItem small={true} title="Steps Yesterday" subTitle={this.state.StepCountYesterday} subSubTitle={this.state.yesterdayScore} />
                </View>
              }
              <UI.UIListItem small={true} title="Most Steps in a Day" subTitle={this.state.mostSteps} subSubTitle={this.state.mostStepsDate} />
              <UI.UIListItem small={true} title="30 Day High" subTitle={this.state.mostSteps30} subSubTitle={this.state.mostStepsDate30} />
            </View>
          {this.state.stepsTimeline &&
            <View>
              <UI.UISubTitle text="Last 30 Days" />
              <View style={{marginBottom: UI.UIStyleguide.spacing*2}}>
                {this.state.stepsTimeline}
              </View>
            </View>
          }
        </View>
      </ScrollView>
    )
  }
}
