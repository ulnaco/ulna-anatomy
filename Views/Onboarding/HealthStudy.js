import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar,
  Alert
} from 'react-native';

import * as UL from 'ulna-ui'
import * as T from '../../Tools'

export class HealthStudy extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount() {
    T.Watchdog(this);
    this.setState({
      pg: {
        marginBottom: UL.ULStyleguide.spacing,
      }
    })
  }

  JoinStudy() {
    T.Track('event', 'Join Study')
    T.setStorage('HealthStudy', 'ok');
    const { navigate } = this.props.navigation;
    navigate('Inital')
  }

  render() {
    return (
      <ScrollView style={[UL.ULStyles.window, UL.ULStyles.backgroundAccent]}>
        <StatusBar barStyle="light-content" />
        <View style={{
            paddingHorizontal: UL.ULStyleguide.spacing*1.5,
          }}>
          <UL.ULSpace small={true} />
          <UL.ULTitle text="Health Study" lite={true} />
          <Text style={this.state.pg}>Data can be harnessed to create a better world. It will bring us closer together. It will change how we perceive ourselves. It will save lives.</Text>
          <Text style={this.state.pg}>The Ulna Health Study collects Anonymous health infomation and compares with other people from around the world. The The correlations and knowledge learned will be shared with the medical community.</Text>
          <Text style={this.state.pg}>For medical researchers, the first step to battling disease is understanding it. Ulna Health Study is helping researchers achieve that goal.</Text>
          <Text style={this.state.pg}>More participants mean more data. And more meaningful results. The biggest challenge medical researchers face is recruiting participants. Often just a handful of people are used in a study.</Text>
          <UL.ULSpace small={true} />
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               Alert.alert('Thanks, your amazing!', '', [{text: 'OK', onPress: () => this.JoinStudy()}], { cancelable: false })
             }}>
             <View>
              <UL.ULButton style="white" text="Join Anonymous Study" />
            </View>
          </TouchableHighlight>
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               Alert.alert('Are you sure?', '100% Anonymous and Free!',
               [
                 {
                   text: 'No',
                   onPress: () => {
                     const { navigate } = this.props.navigation;
                     navigate('Inital')
                   }
                 },
                 {
                   text: 'Join',
                   onPress: () => {
                     this.JoinStudy()
                   }
                 }
               ])
             }}>
            <View>
              <UL.ULButton style="accent" text="Maybe Later" />
            </View>
          </TouchableHighlight>
          <UL.ULSpace />
        </View>
      </ScrollView>
    )
  }
}
