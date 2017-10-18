import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  AppState,
  Image
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

  DisplayImage(status) {
    if (status) return require('../../assets/achievement.png')
    if (!status) return require('../../assets/achievement-muted.png')
  }

  render() {
    return (
      <ScrollView style={UI.UIStyles.window}>

        { this.state.loading &&
          <C.Loading />
        }

        { !this.state.loading &&
          <View>
            <View style={{marginTop: UI.UIStyleguide.spacing}}>
              <UI.UISubTitle text="Steps" />

              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', marginBottom: UI.UIStyleguide.spacing}}>
                <Image
                  style={{width: 50, height: 50, marginHorizontal: UI.UIStyleguide.spacing/3}}
                  source={this.DisplayImage(this.state.steps1)} />
                <Image
                  style={{width: 50, height: 50, marginHorizontal: UI.UIStyleguide.spacing/3}}
                  source={this.DisplayImage(this.state.steps2)} />
                <Image
                  style={{width: 50, height: 50, marginHorizontal: UI.UIStyleguide.spacing/3}}
                  source={this.DisplayImage(this.state.steps3)} />
                <Image
                  style={{width: 50, height: 50, marginHorizontal: UI.UIStyleguide.spacing/3}}
                  source={this.DisplayImage(this.state.steps4)} />
              </View>

              <UI.UIListItem reverse={true} crossout={this.state.steps1} subTitle="7,000 steps in a day" />
              <UI.UIListItem reverse={true} crossout={this.state.steps2} subTitle="8,000 steps in a day" />
              <UI.UIListItem reverse={true} crossout={this.state.steps3} subTitle="9,000 steps in a day" />
              <UI.UIListItem reverse={true} crossout={this.state.steps4} subTitle="10,000 steps in a day" />
            </View>
          </View>
        }

      </ScrollView>
    )
  }
}
