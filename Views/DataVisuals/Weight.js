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

export class Weight extends React.Component {
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
      this.Healthkit()
    })

  }

  Healthkit() {
    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {

        // Weight (Pounds)
        let weightOpts = {
          unit: this.state.localization.weight.unit,
          startDate: moment().subtract(1, 'years').toISOString(),
          endDate: moment().toISOString()
        }
        AppleHealthkit.getWeightSamples(weightOpts: Object, (err: string, results: Object) => {
          var timeline = [];
          var lowest = { value: 1000, startDate: 0 };
          var heaviest = { value: 0, startDate: 0 };
          for (var i = 0; i < results.length; i++) {
            let weight = results[i].value.toFixed(1);
            if (this.state.localization.weight.unit == 'gram') {
              weight = Number(weight/1000).toFixed(1)
            }
            let weightTitle = `${weight} ${this.state.localization.weight.display}`
            if (i > 30) break;
            if (i == 0) {
              this.setState({
                currentWeight: weight+' '+this.state.localization.weight.display,
                currentWeightUpdated: "Last Updated "+moment(results[i].startDate).fromNow()
              })
            }
            else {
              timeline.push(<UI.UIListItem key={i} reverse={true} title={moment(results[i].startDate).fromNow()} subTitle={weightTitle} />);
            }

            if (lowest.value > weight) lowest = results[i]
            if (heaviest.value < weight) heaviest = results[i]

          }

          if (this.state.localization.weight.unit == 'gram') {
            this.setState({
              lowestWeight: Number(lowest.value/1000).toFixed(1)+' '+this.state.localization.weight.display,
              heaviestWeight: Number(heaviest.value/1000).toFixed(1)+' '+this.state.localization.weight.display,
            })
          } else {
            this.setState({
              lowestWeight: lowest.value+' '+this.state.localization.weight.display,
              heaviestWeight: heaviest.value+' '+this.state.localization.weight.display,
            })
          }

          this.setState({
            lowestWeightDate: moment(lowest.startDate).fromNow(),
            heaviestWeightDate: moment(heaviest.startDate).fromNow(),
          })

          if (timeline.length > 0) {
            this.setState({
              weightTimeline: timeline,
            })
          }
        });

      }
    });
  }

  render() {
    return (
      <ScrollView style={UI.UIStyles.window}>
        <View>
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('LogWeight')
             }}>
            <View>
              <UI.UIButton style="accent" text="Log Weight" />
            </View>
          </TouchableHighlight>
          { this.state.currentWeight &&
            <View style={{marginBottom: UI.UIStyleguide.spacing}}>
              <UI.UIListItem title="Current Weight" subTitle={this.state.currentWeight} subSubTitle={this.state.currentWeightUpdated} />
              <UI.UIListItem small={true} title="Lowest Weight" subTitle={this.state.lowestWeight} subSubTitle={this.state.lowestWeightDate}/>
              <UI.UIListItem small={true} title="Heaviest Weight" subTitle={this.state.heaviestWeight} subSubTitle={this.state.heaviestWeightDate}/>
            </View>
          }
          <View style={{marginBottom: UI.UIStyleguide.spacing}}>
            <C.VsLast />
          </View>
          {this.state.weightTimeline &&
            <View>
              <UI.UISubTitle text="Last 30 Records" />
              <View style={{marginBottom: UI.UIStyleguide.spacing*2}}>
                {this.state.weightTimeline}
              </View>
            </View>
          }
        </View>
      </ScrollView>
    )
  }
}
