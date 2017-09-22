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
import * as UL from 'ulna-ui'
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'

import * as T from '../../Tools'
import * as C from '../../Components'

import PushNotification from 'react-native-push-notification';
import BackgroundTimer from 'react-native-background-timer';

export class Dash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: Dimensions.get('window').width
    };
  }

  componentDidMount() {
    T.Watchdog();
    this.Healthkit();

    AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState == 'active') {
        this.Healthkit();
      }
      console.log(nextAppState)
    })

    console.log(this.state.width)
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

        // Steps
        AppleHealthkit.getStepCount(null, (err: string, results: Object) => {
          if (results) {
            this.setState({
              steps: T.thousand(results.value)
            })
          }
        });

        // Distance
        AppleHealthkit.getDistanceWalkingRunning({ unit: 'mile' }, (err: Object, results: Object) => {
          if (results) {
            this.setState({
              distance: (results.value).toFixed(2)+' mi'
            })
          }
        });

        // Health Rating
        T.rating((result) => {
          console.log(result)
          this.setState({
            rating: result
          })
        });

      }
    });
  }

  render() {
    return (
      <ScrollView style={[UL.ULStyles.window, {paddingTop: 0}]}>
        <StatusBar barStyle="dark-content" />
        <View style={{paddingBottom: UL.ULStyleguide.spacing}}>
          <View style={{paddingVertical: UL.ULStyleguide.spacing*1.5, justifyContent: 'center'}}>
            <AnimatedLinearGradient customColors={UL.ULStyleguide.gradient} speed={4000}/>
            <Text style={[UL.ULStyles.largeTitle, {textAlign: 'center', fontWeight: 'bold', color: '#ffffff', marginBottom: 0, backgroundColor: 'transparent'}]}>{this.state.rating}</Text>
            <Text style={[UL.ULStyles.subTitle, {textAlign: 'center', color: '#ffffff', backgroundColor: 'transparent'}]}>Health Rating</Text>
              <TouchableHighlight
                 underlayColor='transparent'
                 onPress={() => {
                   const { navigate } = this.props.navigation;
                   navigate('MyRating')
                 }}>
                <View>
                  <UL.ULButton style="white" text="Learn More" />
                </View>
              </TouchableHighlight>
          </View>
          { this.state.steps && <UL.ULListItem title="Steps Today" subTitle={this.state.steps} /> }
          { this.state.distance && <UL.ULListItem title="Distance Today" subTitle={this.state.distance} /> }
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
            <View style={UL.ULStyles.ListItemInner}>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <TouchableHighlight
                     underlayColor='transparent'
                     onPress={() => {
                       const { navigate } = this.props.navigation;
                       navigate('Steps')
                     }}>
                    <View style={{marginRight: 10}}>
                      <UL.ULButton style="accent" text="Steps" />
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
                      <UL.ULButton style="accent" text={this.state.weightBtn} />
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
