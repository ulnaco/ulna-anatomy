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

export class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: 0,
    };
  }

  componentWillMount() {
    T.Watchdog(this);
    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {

        // Log
        T.getStorage('Log', (results) => {
          var log = [];
          results = JSON.parse(results)
          results.reverse();
          for (var i = 0; i < results.length; i++) {
            log.push(<UI.UIListItem key={i} title={results[i].task} subTitle={moment(results[i].time).format('ddd, h:mm A')} />);
          }
          this.setState({
            log: log
          })
        })

      }
    });

  }

  render() {
    return (
      <ScrollView style={UI.UIStyles.window}>
        <View>

          {/* Log */}
          <View style={{marginTop: 20}}>
            <UI.UISubTitle text="Log" />
            {this.state.log}
          </View>

        </View>
      </ScrollView>
    )
  }
}
