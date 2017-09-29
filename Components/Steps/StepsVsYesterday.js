import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import * as UI from '../../UI'
import * as T from '../../Tools'

export class StepsVsYesterday extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentWillMount() {
    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {

        // Steps
        AppleHealthkit.getStepCount(null, (err: string, results: Object) => {
          if (results) {
            this.setState({
              steps: results.value
            })

            // Steps Yesterday
            var yesterdayOpts = {
              date: moment().subtract(1, 'day').endOf('day').toISOString()
            }
            AppleHealthkit.getStepCount(yesterdayOpts, (err: string, results: Object) => {
              if (results) {
                this.setState({
                  yesterday: results.value,
                })
                this.stepsDiff(this.state.steps, this.state.yesterday);
              }
            });

          }
        });


      }
    });
  }

  stepsDiff(today, yesterday) {
    var subLabel = 'Less steps Today';
    if (today > yesterday) {
      subLabel = 'More steps Today';
    }

    var diff = (today - yesterday)
    label = (T.thousand(diff)+" step difference").replace('-', '')

    this.setState({
      label: label,
      subLabel: subLabel,
      numbers: [yesterday, today]
    })
  }

  render() {
    return (
      <View style={{marginBottom: UI.UIStyleguide.spacing}}>
       { this.state.steps && this.state.yesterday && this.state.numbers && <T.BarVertical values={this.state.numbers} /> }
       { this.state.steps && this.state.yesterday && <UI.UIListItem title={this.state.label} subTitle={this.state.subLabel} /> }
     </View>
    )
  }
}
