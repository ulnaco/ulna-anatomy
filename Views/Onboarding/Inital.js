import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  TextInput
} from 'react-native';

import Prompt from 'react-native-prompt';
import AppleHealthkit from 'rn-apple-healthkit';
import * as UL from 'ulna-ui'

import * as T from '../../Tools'

export class InitalRating extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Analysing: true,
    };
  }

  componentWillMount() {
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
      this.setState({
        bmi: result
      })
    })
    // Health Rating
    T.rating((result) => {
      this.setState({
        rating: result
      })
    });
  }

  render() {
    return (
      <ScrollView style={[UL.ULStyles.window, {flex: 1}]}>
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: UL.ULStyleguide.spacing*1.5,
          }}>
            <UL.ULSpace />
            {this.state.Analysing &&
              <Text>Analysing..</Text>
            }

            {this.state.bmi &&
              <View>
                <Text>Rating {this.state.rating}</Text>
                <Text>BMI {this.state.bmi}</Text>
              </View>
            }
            {this.state.needHealth &&
              <View>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
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
                       console.log(err)
                       this.Height();
                     });
                   }}>
                    <View>
                      <UL.ULButton style="primary" text="Save" />
                    </View>
                </TouchableHighlight>
              </View>
            }

            {this.state.needWeight &&
              <View>
                <TextInput
                  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
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
                       console.log(err)
                       this.Weight();
                     });
                   }}>
                    <View>
                      <UL.ULButton style="primary" text="Save" />
                    </View>
                </TouchableHighlight>
              </View>
            }

        </View>
      </ScrollView>
    )
  }
}
