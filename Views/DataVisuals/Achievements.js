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

      var badges = [];
      var key = 0;
      for (var i = 0; i < (Object.keys(results).length-2); i++) {
        badges.push(<Image key={key} style={{width: 65, height: 65, marginHorizontal: UI.UIStyleguide.spacing/3}} source={require('../../assets/achievement.png')} />);
        key++
      }

      for (var i = 0; i < (results.numberOfTest - (Object.keys(results).length-2)); i++) {
        badges.push(<Image key={key} style={{width: 75, height: 75, marginHorizontal: UI.UIStyleguide.spacing/3}} source={require('../../assets/achievement-muted.png')} />);
        key++
      }

      this.setState({
        badges: badges
      })
    });

  }

  render() {
    return (
      <ScrollView style={UI.UIStyles.window}>

        { this.state.loading &&
          <C.Loading />
        }

        { !this.state.loading &&
          <View style={{marginBottom: UI.UIStyleguide.spacing*2}}>

            <ScrollView style={{flex: 1, flexDirection: 'row', marginBottom: UI.UIStyleguide.spacing, paddingLeft: UI.UIStyleguide.spacing/2}} horizontal={true} showsHorizontalScrollIndicator={true}>
              {this.state.badges}
            </ScrollView>

            <View style={{marginBottom: UI.UIStyleguide.spacing}}>
              <UI.UISubTitle text="Steps" />
              <UI.UIListItem reverse={true} crossout={this.state.steps1} subTitle="7,000 steps in a day" title={this.state.steps1} />
              <UI.UIListItem reverse={true} crossout={this.state.steps2} subTitle="8,000 steps in a day" title={this.state.steps2} />
              <UI.UIListItem reverse={true} crossout={this.state.steps3} subTitle="9,000 steps in a day" title={this.state.steps3} />
              <UI.UIListItem reverse={true} crossout={this.state.steps4} subTitle="10,000 steps in a day" title={this.state.steps4} />
              <UI.UIListItem reverse={true} crossout={this.state.steps5} subTitle="20,000 steps in a day" title={this.state.steps5} />
              <UI.UIListItem reverse={true} crossout={this.state.steps6} subTitle="30,000 steps in a day" title={this.state.steps6} />
              <UI.UIListItem reverse={true} crossout={this.state.steps7} subTitle="40,000 steps in a day" title={this.state.steps7} />
            </View>

            <View style={{marginVertical: UI.UIStyleguide.spacing}}>
              <UI.UISubTitle text="Streaks" />
              <UI.UIListItem reverse={true} crossout={this.state.streak1} subTitle="8,000 steps x 2 Days" title={this.state.streak1} />
              <UI.UIListItem reverse={true} crossout={this.state.streak2} subTitle="9,000 steps x 2 Days" title={this.state.streak2} />
              <UI.UIListItem reverse={true} crossout={this.state.streak3} subTitle="10,000 steps x 2 Days" title={this.state.streak3} />
              <UI.UIListItem reverse={true} crossout={this.state.streak4} subTitle="8,000 steps x 3 Days" title={this.state.streak4} />
              <UI.UIListItem reverse={true} crossout={this.state.streak5} subTitle="9,000 steps x 3 Days" title={this.state.streak5} />
              <UI.UIListItem reverse={true} crossout={this.state.streak6} subTitle="10,000 steps x 3 Days" title={this.state.streak6} />
            </View>

          </View>
        }

      </ScrollView>
    )
  }
}
