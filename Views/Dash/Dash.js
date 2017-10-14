import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar,
  Dimensions,
  AppState
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
      width: Dimensions.get('window').width
    };
  }

  componentDidMount() {
    T.Watchdog(this);

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
        })
      });
    })
  }

  render() {
    return (
      <ScrollView style={[UI.UIStyles.window, {paddingTop: 0}]}>
        <StatusBar barStyle="dark-content" />
        <View style={{paddingBottom: UI.UIStyleguide.spacing}}>

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
                    <UI.UIListItem title="Active Energy Burned" subTitle={this.state.ActiveEnergyBurned} subSubTitle="Active Energy includes walking slowly and household chores, as well as exercise such as biking and dancing." />
                  </View>
                }

                { this.state.Weight && <UI.UIListItem title="Weight" subTitle={`${this.state.Weight} ${this.state.localization.weight.display}`} /> }

                <View style={{marginTop: UI.UIStyleguide.spacing}}>
                  <UI.UIButton style="accent" text="Activity Insights" />
                </View>
              </View>
          </TouchableHighlight>
          
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
      </ScrollView>
    )
  }
}
