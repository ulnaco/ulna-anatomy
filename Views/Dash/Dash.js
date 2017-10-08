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
        AppleHealthkit.getDistanceWalkingRunning({ unit: this.state.localization.distance.unit }, (err: Object, results: Object) => {
          if (results) {
            let distance = (results.value).toFixed(2)
            if (this.state.localization.distance.unit == 'meter') {
              distance = (results.value/1000).toFixed(2)
            }
            this.setState({
              distance: distance+' '+this.state.localization.distance.display
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
              activeEnergyBurned: (results[0].value.toFixed(1))+' kcal'
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

          {/* Today */}
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               const { navigate } = this.props.navigation;
               navigate('Steps')
             }}>
             <View>
                { this.state.steps &&
                  <View style={{marginTop: UI.UIStyleguide.spacing}}>
                    <UI.UISubTitle text="Today" />
                    <UI.UIListItem title="Steps" subTitle={this.state.steps} subSubTitle={T.Speech.single.steps(this.state.steps)}/>
                  </View>
                }

                { this.state.distance && <UI.UIListItem title="Distance walked" subTitle={this.state.distance} /> }

                { this.state.activeEnergyBurned &&
                  <View>
                    <UI.UIListItem title="Active Energy Burned" subTitle={this.state.activeEnergyBurned} subSubTitle="Active Energy includes walking slowly and household chores, as well as exercise such as biking and dancing." />
                  </View>
                }
                <View style={{marginTop: UI.UIStyleguide.spacing}}>
                  <UI.UIButton style="accent" text="Activity Insights" />
                </View>
              </View>
          </TouchableHighlight>

          { this.state.weight &&
            <TouchableHighlight
               underlayColor='transparent'
               onPress={() => {
                 const { navigate } = this.props.navigation;
                 navigate('Weight')
               }}>
               <View>
                <C.VsLast />
                <UI.UIButton style="accent" text={this.state.weightBtn} />
              </View>
            </TouchableHighlight>
          }

        </View>
      </ScrollView>
    )
  }
}
