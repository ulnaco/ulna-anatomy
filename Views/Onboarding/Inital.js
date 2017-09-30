import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TextInput,
  StatusBar
} from 'react-native';

import moment from 'moment'
import Prompt from 'react-native-prompt';
import AppleHealthkit from 'rn-apple-healthkit';

import * as UI from '../../UI'
import * as T from '../../Tools'

export class InitalRating extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Analysing: true,
    };
  }

  componentWillMount() {
    T.Watchdog(this);
    AppleHealthkit.initHealthKit({}: Object, (err: Object, results: Object) => {});
    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {

        this.Height()

        // Steps
        let options = { }
        AppleHealthkit.getStepCount(options: Object, (err: string, results: Object) => {
          if (results) {
            this.setState({
              steps: T.thousand(results.value)
            })
          }
        });

        // BMI
        T.bmi((result) => {
          this.setState({
            bmi: result
          })
        })

        // Health Rating
        T.rating((result) => {

          // Update Person
          T.Person({
            'BMI': this.state.bmi,
            'Weight': this.state.weight,
            'InitalRating': result,
          });

          this.setState({
            rating: result
          })
        });

      }
    });
  }

  Height() {
    AppleHealthkit.getLatestHeight(null, (err: string, results: Object) => {
      if (err) {
        this.setState({
          needHealth: true,
          Analysing: false,
        })
      }
      else {
        this.setState({
          height: results.value,
        })
        this.Weight()
      }
    });
  }

  Weight() {
    let options = {
      unit: 'pound'
    };
    AppleHealthkit.getLatestWeight(null, (err: string, results: Object) => {
      if (err) {
        this.setState({
          needWeight: true,
          Analysing: false,
        })
      }
      else {
        this.setState({
          weight: results.value,
        })
        this.BMI()
      }
    });
  }

  BMI() {
    this.setState({
      Analysing: false,
    })
    T.bmi((result) => {
      T.Track('initial', 'BMI', { value: result })
      this.setState({
        bmi: result
      })
    })

    // Health Rating
    T.rating((result) => {

      // Update Person
      T.Person({
        'BMI': this.state.bmi,
        'Weight': this.state.weight,
        'InitalRating': result,
      });

      T.Track('initial', 'Health', { value: result })
      this.setState({
        rating: result
      })
    });
  }

  render() {
    return (
      <ScrollView style={[UI.UIStyles.window, UI.UIStyles.backgroundAccent]}>
        <StatusBar barStyle="light-content" />
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: UI.UIStyleguide.spacing*1.5,
          }}>
            <UI.UISpace />
            {this.state.Analysing &&
              <Text style={[UI.UIStyles.subTitle, {textAlign: 'center', color: '#ffffff', backgroundColor: 'transparent'}]}>Analysing..</Text>
            }

            {this.state.bmi &&
              <View>
                <Text style={[UI.UIStyles.largeTitle, {textAlign: 'center', fontSize: 100, fontWeight: 'bold', color: '#ffffff', marginBottom: 0, backgroundColor: 'transparent'}]}>{this.state.rating}</Text>
                <Text style={[UI.UIStyles.subTitle, {textAlign: 'center', color: '#ffffff', backgroundColor: 'transparent'}]}>Initial Rating</Text>
                <TouchableHighlight
                   underlayColor='transparent'
                   onPress={() => {
                     const { navigate } = this.props.navigation;
                     navigate('Notifications')
                   }}>
                  <View>
                    <UI.UIButton style="white" text="Next" />
                  </View>
                </TouchableHighlight>
              </View>
            }
            {this.state.needHealth &&
              <View>
                <Text style={[UI.UIStyles.subTitle, {textAlign: 'center', color: '#ffffff', backgroundColor: 'transparent'}]}>How tall are you? (Feet)</Text>
                <TextInput
                  style={UI.UIStyles.InputNumber}
                  onChangeText={(text) => this.setState({height: text})}
                  placeholder="6'0"
                  keyboardType="numbers-and-punctuation"
                  value={this.state.height}
                />
                <TouchableHighlight
                   underlayColor='transparent'
                   onPress={() => {
                     var feet = this.state.height.split("’")
                     if (!(feet[0].match(/^\d+$/)) || !(feet[1].match(/^\d+$/))) {
                       this.setState({height: ''})
                       return;
                     }
                     else {
                       this.setState({
                         needHealth: false,
                         Analysing: true
                       })
                     }
                     newHeight = (Number(feet[0])*12)+Number(feet[1])
                     var options = { value: newHeight }
                     AppleHealthkit.saveHeight(options: Object, (err: Object, results: Object) => {
                       this.Height();
                     });
                   }}>
                    <View>
                      <UI.UIButton style="white" text="Save" />
                    </View>
                </TouchableHighlight>
              </View>
            }

            {this.state.needWeight &&
              <View>
                <Text style={[UI.UIStyles.subTitle, {textAlign: 'center', color: '#ffffff', backgroundColor: 'transparent'}]}>How much do you weight? (Pounds)</Text>
                <TextInput
                  style={UI.UIStyles.InputNumber}
                  onChangeText={(text) => this.setState({weight: text})}
                  placeholder="160"
                  keyboardType="numeric"
                  value={this.state.weight}
                />
                <TouchableHighlight
                   underlayColor='transparent'
                   onPress={() => {
                     var weight = this.state.weight
                     if (!(weight.match(/^\d+$/))) {
                       this.setState({weight: ''})
                       return;
                     }
                     else {
                       this.setState({
                         needWeight: false,
                         Analysing: true
                       })
                     }
                     var options = { value: weight }
                     AppleHealthkit.saveWeight(options: Object, (err: Object, results: Object) => {
                       this.Weight();
                     });
                   }}>
                    <View>
                      <UI.UIButton style="white" text="Save" />
                    </View>
                </TouchableHighlight>
              </View>
            }

        </View>
      </ScrollView>
    )
  }
}
