import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  Switch,
} from 'react-native';

import moment from 'moment'
import PushNotification from 'react-native-push-notification'
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

    // Fetch Healthkit
    T.getStorage('Healthkit', (results) => {
      results = JSON.parse(results)
      if (results.UUID == 'ff41da98ff7bc635cdd629e61333e8a8cf3b813e4e7d22a3af8ab5e87ae750e5') {
        this.setState({
          UUID: results.UUID,
        })
      }
    });

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
          for (var i = 0; i < 30; i++) {
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
      PushNotification.setApplicationIconBadgeNumber(0)
    } else {
      T.removeStorage('EnableBadges');
    }
    T.Sync();
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

          {/* Save Preferences */}
          <View style={{marginTop: 20}}>
            <TouchableHighlight
               underlayColor='transparent'
               onPress={() => {
                 const { navigate } = this.props.navigation;
                 navigate('Dash')
               }}>
               <View>
                <UI.UIButton style="accent" text="Update" />
              </View>
            </TouchableHighlight>
          </View>

          {/* Log */}
          {this.state.UUID &&
            <View style={{marginTop: 20}}>
              <UI.UISubTitle text="Log" />
              {this.state.log}
            </View>
          }

        </View>
      </ScrollView>
    )
  }
}
