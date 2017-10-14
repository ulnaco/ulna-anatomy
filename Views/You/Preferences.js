import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  Switch,
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

    T.getStorage('EnableBadges', (results) => {
      if (results) {
        this.setState({toggleBadges: true})
      } else {
        this.setState({toggleBadges: false})
      }
    });

    T.getStorage('Localization', (results) => {
      if (results == 'Imperial') {
        this.setState({toggleLocalization: true})
      } else {
        this.setState({toggleLocalization: false})
      }
    });

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

  /**
   * Badges
   */
  toggleNotifications = (value) => {
    this.setState({toggleBadges: value})
    if (value) {
      T.setStorage('EnableBadges','yes');
    } else {
      T.removeStorage('EnableBadges');
    }
  }

  /**
   * Localization
   */
  toggleMetrics = (value) => {
    if (this.state.toggleLocalization) {
      this.setState({toggleLocalization: false})
      T.setStorage('Localization', 'Metric');
    } else {
      this.setState({toggleLocalization: true})
      T.setStorage('Localization', 'Imperial');
    }
  }

  render() {
    return (
      <ScrollView style={UI.UIStyles.window}>
        <View>

          {/* Toggle Badges */}
          <View style={UI.UIStyles.ListItem}>
            <View style={[UI.UIStyles.ListItemInner, {flexDirection: 'row'}]}>
              <Switch
                onValueChange={this.toggleNotifications}
                value={this.state.toggleBadges} />
              <Text style={[UI.UIStyles.ListItemSubTitle, {fontSize: 17, paddingTop: 5, marginLeft: 20, fontWeight: 'normal'}]}>Toggle Badges</Text>
            </View>
          </View>

          <View style={{marginTop: 20}}>
            <UI.UISubTitle text="Localization" />

            {/* Toggle US Localization */}
            <View style={UI.UIStyles.ListItem}>
              <View style={[UI.UIStyles.ListItemInner, {flexDirection: 'row'}]}>
                <Switch
                  onValueChange={this.toggleMetrics}
                  value={this.state.toggleLocalization} />
                <Text style={[UI.UIStyles.ListItemSubTitle, {fontSize: 17, paddingTop: 5, marginLeft: 20, fontWeight: 'normal'}]}>{T.Speech.onboarding.localization_imperial}</Text>
              </View>
            </View>

            {/* Toggle non-US Localization */}
            <View style={UI.UIStyles.ListItem}>
              <View style={[UI.UIStyles.ListItemInner, {flexDirection: 'row'}]}>
                <Switch
                  onValueChange={this.toggleMetrics}
                  value={!this.state.toggleLocalization} />
                <Text style={[UI.UIStyles.ListItemSubTitle, {fontSize: 17, paddingTop: 5, marginLeft: 20, fontWeight: 'normal'}]}>{T.Speech.onboarding.localization_metric}</Text>
              </View>
            </View>

          </View>

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
