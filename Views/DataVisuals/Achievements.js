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

export class Achievements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentWillMount() {
    T.Badges((results) => {
      this.setState(results)
    });
  }

  render() {
    return (
      <ScrollView style={UI.UIStyles.window}>

        { this.state.loading &&
          <C.Loading />
        }
        <View style={{marginTop: UI.UIStyleguide.spacing}}>
          <UI.UISubTitle text="Steps" />
          <UI.UIListItem reverse={true} crossout={this.state.steps1} subTitle="7,000 steps in a day" />
          <UI.UIListItem reverse={true} crossout={this.state.steps2} subTitle="8,000 steps in a day" />
          <UI.UIListItem reverse={true} crossout={this.state.steps3} subTitle="9,000 steps in a day" />
          <UI.UIListItem reverse={true} crossout={this.state.steps4} subTitle="10,000 steps in a day" />
        </View>

      </ScrollView>
    )
  }
}
