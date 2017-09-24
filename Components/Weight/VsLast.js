import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';
import * as UL from 'ulna-ui'

import * as T from '../../Tools'

export class VsLast extends React.Component {
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
          if (results && results[0] && results[1]) {
            const weightDiff = (results[0].value - results[1].value);
            if (weightDiff > 0) {
              weightDiff = T.Speech.ui['weight_gain'].replace('{var}', Math.round(weightDiff));
            }
            else {
              weightDiff = T.Speech.ui['weight_loss'].replace('{var}', Math.round(weightDiff));
            }
            if (weightDiff == 0) {
              return false
            }
            this.setState({
              thisWeek: results[0].value,
              lastWeek: results[1].value,
              weightDiff: weightDiff.replace('-', ''),
              chart: [results[1].value, results[0].value],
            })
          }
        });

      }
    });
  }

  render() {
    return (
      <View style={{marginBottom: UL.ULStyleguide.spacing}}>
       { this.state.weightDiff &&  <T.BarVertical values={this.state.chart} /> }
       { this.state.weightDiff && <UL.ULListItem title="Changes in Weight" subTitle={this.state.weightDiff} /> }
     </View>
    )
  }
}
