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
      analysing: true,
    };
  }

  async componentWillMount() {
    T.Watchdog(this);
    this.verify();

    // Localization
    T.getLocalization((results) => {
      this.setState({
        localization: results
      })
      this.checkWeight();
    })

  }

  // Verify Done with Initial Rating
  verify() {
    T.rating((results) => {
      if (results) {
        this.setState({
          needHealth: false,
          needWeight: false,
          analysing: false,
        })
        this.bodyMeasurement();
      }
    });
  }

  // Check Weight
  checkWeight() {
    let options = {
      unit: this.state.localization.weight.unit
    };
    AppleHealthkit.getLatestWeight(null, (err: string, results: Object) => {
      if (err) {
        this.setState({
          needWeight: true,
          analysing: false,
        })
      }
      else {
        this.setState({
          weight: results.value,
        })
        this.checkHeight();
      }
    });
  }

  // Check Height
  checkHeight() {
    AppleHealthkit.getLatestHeight(null, (err: string, results: Object) => {
      if (err) {
        this.setState({
          needHealth: true,
          analysing: false,
        })
      }
      else {
        this.setState({
          height: results.value,
        })
        this.verify()
      }
    });
  }

  bodyMeasurement() {
    T.bodyMeasurement((results) => {

      const explanations = [
        <UI.UIListItem key={99} onboarding="true" text={`Body Mass Index ${results.bmi}`} />
      ]
      for (var i = 0; i < results.explanations.length; i++) {
        explanations.push(<UI.UIListItem key={i} onboarding="true" text={results.explanations[i].text} />);
      }

      this.setState({
        body_measurement: true,
        body_measurement_rating: results.score,
        body_measurement_explanations: explanations
      })

    })
  }

  activityMeasurement() {
    T.activityMeasurement((results) => {

      const explanations = [
        <UI.UIListItem key={99} onboarding="true" text={`Average Steps ${T.thousand(results.stepAverage)}`} />
      ]
      for (var i = 0; i < results.explanations.length; i++) {
        explanations.push(<UI.UIListItem key={i} onboarding="true" text={results.explanations[i].text} />);
      }

      this.setState({
        body_measurement: false,
        activity_measurement: true,
        activity_rating: results.score,
        activity_explanations: explanations
      })

    })
  }

  rating() {
    T.rating((result) => {
      this.setState({
        rating: result
      })
    });
  }

  render() {
    return (
      <View style={[UI.UIStyles.window, UI.UIStyles.backgroundPrimary]}>
        <StatusBar barStyle="light-content" />
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: UI.UIStyleguide.spacing*1.5,
          }}>

            {/* Analysing */}
            {this.state.analysing &&
              <Text style={[UI.UIStyles.subTitle, {textAlign: 'center', color: '#ffffff', backgroundColor: 'transparent'}]}>Analysing..</Text>
            }

            {/* Done */}
            {this.state.done &&
              <View>
                <Text style={[UI.UIStyles.largeTitle, {textAlign: 'center', fontSize: 100, fontWeight: 'bold', color: '#ffffff', marginBottom: 0, backgroundColor: 'transparent'}]}>{this.state.rating}</Text>
                <Text style={[UI.UIStyles.subTitle, {textAlign: 'center', color: '#ffffff', backgroundColor: 'transparent'}]}>Overall Health Rating</Text>
                <TouchableHighlight
                   underlayColor='transparent'
                   onPress={() => {
                     T.setStorage('O/Inital', 'yes');
                     const { navigate } = this.props.navigation;
                     navigate('Notifications')
                   }}>
                  <View>
                    <UI.UIButton style="white" text="Next" />
                  </View>
                </TouchableHighlight>
              </View>
            }

            {/* Weight */}
            {this.state.needWeight &&
              <View>
                <Text style={[UI.UIStyles.subTitle, {textAlign: 'center', color: '#ffffff', backgroundColor: 'transparent'}]}>How much do you weight? ({this.state.localization.weight.display})</Text>
                <TextInput
                  style={UI.UIStyles.InputNumber}
                  onChangeText={(text) => this.setState({weight: text})}
                  placeholder={this.state.localization.weight.placeholder}
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
                     var options = {
                       unit: this.state.localization.weight.unit,
                       value: weight,
                     }
                     if (this.state.localization.weight.unit == 'gram') options.value = weight*1000;
                     AppleHealthkit.saveWeight(options: Object, (err: Object, results: Object) => {
                       this.checkHeight();
                     });
                   }}>
                    <View>
                      <UI.UIButton style="white" text="Save" />
                    </View>
                </TouchableHighlight>
              </View>
            }

            {/* Height */}
            {this.state.needHealth &&
              <View>
                <Text style={[UI.UIStyles.subTitle, {textAlign: 'center', color: '#ffffff', backgroundColor: 'transparent'}]}>How tall are you? ({this.state.localization.height.display})</Text>
                <TextInput
                  style={UI.UIStyles.InputNumber}
                  onChangeText={(text) => this.setState({height: text})}
                  placeholder={this.state.localization.height.placeholder}
                  keyboardType="numbers-and-punctuation"
                  value={this.state.height}
                />
                <TouchableHighlight
                   underlayColor='transparent'
                   onPress={() => {
                     let newHeight = '';
                     let newHeightUnit = '';

                     // US
                     if (this.state.localization.height.unit == 'feet') {
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
                       newHeightUnit = 'inch';
                     }

                     // Metric
                     if (this.state.localization.height.unit == 'cm') {
                       newHeight = this.state.height / 100,
                       newHeightUnit = 'meter';
                     }

                     // Save
                     var options = {
                       value: newHeight,
                       unit: newHeightUnit,
                     }
                     AppleHealthkit.saveHeight(options: Object, (err: Object, results: Object) => {
                       this.verify();
                     });

                   }}>
                    <View>
                      <UI.UIButton style="white" text="Save" />
                    </View>
                </TouchableHighlight>
              </View>
            }

            {/* Body Measurements */}
            {this.state.body_measurement &&
              <View>
                <Text style={[UI.UIStyles.largeTitle, {textAlign: 'center', fontSize: 100, fontWeight: 'bold', color: '#ffffff', marginBottom: 0, backgroundColor: 'transparent'}]}>{this.state.body_measurement_rating}</Text>
                <Text style={[UI.UIStyles.subTitle, {textAlign: 'center', color: '#ffffff', backgroundColor: 'transparent'}]}>Body Measurement Rating</Text>

                <View style={{marginBottom: UI.UIStyleguide.spacing/2}}>
                  {this.state.body_measurement_explanations}
                </View>

                <TouchableHighlight
                   underlayColor='transparent'
                   onPress={() => {
                     this.activityMeasurement();
                   }}>
                  <View>
                    <UI.UIButton style="white" text="Next" />
                  </View>
                </TouchableHighlight>
              </View>
            }

            {/* Activity Measurement */}
            {this.state.activity_measurement &&
              <View>
                <Text style={[UI.UIStyles.largeTitle, {textAlign: 'center', fontSize: 100, fontWeight: 'bold', color: '#ffffff', marginBottom: 0, backgroundColor: 'transparent'}]}>{this.state.activity_rating}</Text>
                <Text style={[UI.UIStyles.subTitle, {textAlign: 'center', color: '#ffffff', backgroundColor: 'transparent'}]}>Activity Measurement Rating</Text>

                <View style={{marginBottom: UI.UIStyleguide.spacing/2}}>
                  {this.state.activity_explanations}
                </View>

                <TouchableHighlight
                   underlayColor='transparent'
                   onPress={() => {
                     this.setState({
                       done: true,
                       activity_measurement: false,
                     });
                     this.rating();
                   }}>
                  <View>
                    <UI.UIButton style="white" text="Next" />
                  </View>
                </TouchableHighlight>
              </View>
            }

        </View>
      </View>
    )
  }
}
