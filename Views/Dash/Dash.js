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
    this.Healthkit();

    // Update on AppState chnage
    AppState.addEventListener('change', (nextAppState) => {
      this.Healthkit();
    })

    if (this.state.width > 374) {
      this.state.weightBtn = 'Weight Insights'
    }
    else {
      this.state.weightBtn = 'Weight'
    }
  }

  Healthkit() {
    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {

        /**
         * Steps
         */
        AppleHealthkit.getStepCount(null, (err: string, results: Object) => {
          if (results) {
            this.setState({
              steps: T.thousand(results.value)
            })
          }
        });

        /**
         * Distance Walked
         */
        AppleHealthkit.getDistanceWalkingRunning({ unit: 'mile' }, (err: Object, results: Object) => {
          if (results) {
            this.setState({
              distance: (results.value).toFixed(2)+' mi'
            })
          }
        });

        /**
         * Active Energy Burned
         */
         var energyBurnedOpts = {
           startDate: moment().startOf('hour').toISOString()
         }
        AppleHealthkit.getActiveEnergyBurned(energyBurnedOpts, (err: Object, results: Object) => {
          if (err) return;
          if (results && results.length > 0) {
            this.setState({
              activeEnergyBurned: (results[0].value.toFixed(2))+' kcal'
            })
          }
        })

        /**
         * Health Rating
         */
        T.rating((result) => {

          var RatingsArray = []
          RatingsArray[moment().format('YYYY/WW')] = result;
          T.setStorage('Ratings', JSON.stringify(RatingsArray))

          T.Person({
            'Rating': result,
          });

          this.setState({
            rating: result
          })
        });

      }
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
            <Text style={[UI.UIStyles.largeTitle, {textAlign: 'center', fontWeight: 'bold', color: '#ffffff', marginBottom: 0, backgroundColor: 'transparent'}]}>{this.state.rating}</Text>
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

          { this.state.steps &&
            <View>
              <UI.UIListItem title="Steps Today" subTitle={this.state.steps} />
              <UI.UIListItem justtext={true} text={T.Speech.single.steps(this.state.steps)} />
            </View>
          }
          { this.state.activeEnergyBurned &&
            <View>
              <UI.UIListItem small={true} title="Active Energy Burned Today" subTitle={this.state.activeEnergyBurned} subSubTitle="Active Energy includes walking slowly and household chores." />
            </View>
          }
          { this.state.distance && <UI.UIListItem title="Distance Today" subTitle={this.state.distance} /> }

          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('Steps')
             }}>
             <View>
              <C.StepsVsYesterday />
             </View>
          </TouchableHighlight>

          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('Weight')
             }}>
             <View>
              <C.VsLast />
             </View>
          </TouchableHighlight>

          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={UI.UIStyles.ListItemInner}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <TouchableHighlight
                     underlayColor='transparent'
                     onPress={() => {
                       const { navigate } = this.props.navigation;
                       navigate('Steps')
                     }}>
                    <View style={{marginRight: 10}}>
                      <UI.UIButton style="accent" text="Steps" />
                    </View>
                  </TouchableHighlight>
                </View>
                <View>
                  <TouchableHighlight
                     underlayColor='transparent'
                     onPress={() => {
                       const { navigate } = this.props.navigation;
                       navigate('Weight')
                     }}>
                    <View>
                      <UI.UIButton style="accent" text={this.state.weightBtn} />
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}
