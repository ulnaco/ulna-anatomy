import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar,
  AppState,
  Image
} from 'react-native';

import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';
import AnimatedLinearGradient, { presetColors } from 'react-native-animated-linear-gradient'

import * as T from '../../Tools'
import * as C from '../../Components'
import * as UI from '../../UI'

export class Dash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {

    // Localization
    T.getLocalization((results) => {
      this.setState({
        localization: results
      })
      this.Healthkit();
    })

    // Update on AppState chnage
    AppState.addEventListener('change', (nextAppState) => {
      this.Healthkit();
    })

  }

  Healthkit() {
    setTimeout(() => {
      T.Healthkit(() => {
        T.getStorage('Healthkit', (results) => {
          results = JSON.parse(results)
          this.setState({
            StepCount: T.thousand(results.StepCount),
            DistanceWalkingRunning: results.DistanceWalkingRunning,
            ActiveEnergyBurned: results.ActiveEnergyBurned,
            Rating: results.Rating,
            Weight: results.Weight,
            DistanceCycling: results.DistanceCycling,
            loading: false,
          })
        });
      })
    }, 1000)

    T.Badges((results) => {
      this.setState({
        achievements: (Object.keys(results).length-2)+' of '+results.numberOfTest+' Achievements'
      })

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
      <ScrollView style={[UI.UIStyles.window, {paddingTop: 0}]}>
        <StatusBar barStyle="dark-content" />
        <View style={{paddingBottom: UI.UIStyleguide.spacing}}>

          { this.state.loading &&
            <C.Loading />
          }

          { !this.state.loading &&
            <View>
              {/* Rating Header */}
              <View style={{paddingVertical: UI.UIStyleguide.spacing*1.5, justifyContent: 'center'}}>
                <AnimatedLinearGradient customColors={UI.UIStyleguide.gradient} speed={4000}/>
                <Text style={[UI.UIStyles.largeTitle, {textAlign: 'center', fontWeight: 'bold', color: '#ffffff', marginBottom: 0, backgroundColor: 'transparent'}]}>{this.state.Rating}</Text>
                <Text style={[UI.UIStyles.subTitle, {textAlign: 'center', color: '#ffffff', backgroundColor: 'transparent'}]}>Health Rating</Text>
                <TouchableHighlight
                   underlayColor='transparent'
                   onPress={() => {
                     const { navigate } = this.props.navigation;
                     navigate('MyRating')
                   }}>
                  <View>
                    <UI.UIButton style="white" text="Explanation" />
                  </View>
                </TouchableHighlight>
              </View>

              {/* Activity */}
              <TouchableHighlight
                 underlayColor='transparent'
                 onPress={() => {
                   const { navigate } = this.props.navigation;
                   navigate('Steps')
                 }}>
                 <View>
                    { this.state.StepCount &&
                      <View style={{marginTop: UI.UIStyleguide.spacing}}>
                        <UI.UISubTitle text="Today" />
                        <UI.UIListItem title="Steps" subTitle={this.state.StepCount} subSubTitle={T.Speech.single.steps(this.state.StepCount)}/>
                      </View>
                    }

                    { this.state.DistanceWalkingRunning && <UI.UIListItem title="Distance walked" subTitle={this.state.DistanceWalkingRunning} /> }

                    { this.state.DistanceCycling && <UI.UIListItem title="Distance Cycling" subTitle={this.state.DistanceCycling} subSubTitle="Cycling improves joint mobility, posture, coordination, and decreases stress levels!" /> }

                    { this.state.ActiveEnergyBurned &&
                      <View>
                        <UI.UIListItem title="Active Energy Burned" subTitle={this.state.ActiveEnergyBurned} subSubTitle="Active Energy includes walking slowly and household chores, as well as exercise such as running, biking and dancing." />
                      </View>
                    }

                    { this.state.Weight && <UI.UIListItem title="Weight" subTitle={`${this.state.Weight} ${this.state.localization.weight.display}`} /> }

                    <View style={{marginTop: UI.UIStyleguide.spacing}}>
                      <UI.UIButton style="accent" text="Activity Insights" />
                    </View>
                  </View>
              </TouchableHighlight>


              {/* Achievements */}
              <View style={{marginTop: UI.UIStyleguide.spacing}}>
                <UI.UISubTitle text="Achievements" />
                <ScrollView style={{flex: 1, flexDirection: 'row', marginBottom: UI.UIStyleguide.spacing, paddingLeft: UI.UIStyleguide.spacing/2}} horizontal={true} showsHorizontalScrollIndicator={true}>
                  {this.state.badges}
                </ScrollView>
                <TouchableHighlight
                   underlayColor='transparent'
                   onPress={() => {
                     const { navigate } = this.props.navigation;
                     navigate('Achievements')
                   }}>
                   <View>
                    <UI.UIListItem subTitle={this.state.achievements} />
                    <View style={{marginTop: UI.UIStyleguide.spacing}}>
                      <UI.UIButton style="accent" text="Explore Achievements" />
                    </View>
                  </View>
                </TouchableHighlight>
              </View>

              {/* Log Weight */}
              <TouchableHighlight
                 underlayColor='transparent'
                 onPress={() => {
                   const { navigate } = this.props.navigation;
                   navigate('LogWeight')
                 }}>
                 <View>
                  <UI.UIButton style="primary" text="Log Weight" />
                </View>
              </TouchableHighlight>

              {/* Preferences */}
              <TouchableHighlight
                 underlayColor='transparent'
                 onPress={() => {
                   const { navigate } = this.props.navigation;
                   navigate('Preferences')
                 }}>
                 <View>
                  <UI.UIButton style="primary" text="Preferences" />
                </View>
              </TouchableHighlight>
            </View>
          }

        </View>
      </ScrollView>
    )
  }
}
