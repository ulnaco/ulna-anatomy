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

    /**
     * Weight
     */
    let weightOpts = {
      unit: 'pound',
      startDate: moment().subtract(1, 'years').toISOString(),
      endDate: moment().toISOString()
    }
    AppleHealthkit.getWeightSamples(weightOpts: Object, (err: string, results: Object) => {
      if (results && results[0] && results[1]) {
        this.setState({
          weight: true
        })
      }
    });

  }

  Healthkit() {
    T.getStorage('Healthkit', (results) => {
      results = JSON.parse(results)
      this.setState({
        StepCount: T.thousand(results.StepCount),
        DistanceWalkingRunning: results.DistanceWalkingRunning,
        ActiveEnergyBurned: results.ActiveEnergyBurned,
        Rating: results.Rating,
      })
    });
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

                { this.state.ActiveEnergyBurned &&
                  <View>
                    <UI.UIListItem title="Active Energy Burned" subTitle={this.state.ActiveEnergyBurned} subSubTitle="Active Energy includes walking slowly and household chores, as well as exercise such as biking and dancing." />
                  </View>
                }
                <View style={{marginTop: UI.UIStyleguide.spacing}}>
                  <UI.UIButton style="accent" text="Activity Insights" />
                </View>
              </View>
          </TouchableHighlight>

          {/* Boby Measurements */}
          { this.state.weight &&
            <TouchableHighlight
               underlayColor='transparent'
               onPress={() => {
                 const { navigate } = this.props.navigation;
                 navigate('Weight')
               }}>
               <View>
                <C.VsLast />
                <UI.UIButton style="accent" text="Body Measurements" />
              </View>
            </TouchableHighlight>
          }

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

        </View>
      </ScrollView>
    )
  }
}
