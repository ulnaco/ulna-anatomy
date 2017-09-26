import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  StatusBar,
  Alert
} from 'react-native';

import * as UI from '../../UI'
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
        marginBottom: UI.UIStyleguide.spacing,
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
      <ScrollView style={[UI.UIStyles.window, UI.UIStyles.backgroundAccent]}>
        <StatusBar barStyle="light-content" />
        <View style={{
            paddingHorizontal: UI.UIStyleguide.spacing*1.5,
          }}>
          <UI.UISpace small={true} />
          <UI.UITitle text="Health Study" lite={true} />
          <Text style={this.state.pg}>Data can be harnessed to create a better world. It will bring us closer together. It will change how we perceive ourselves. It will save lives.</Text>
          <Text style={this.state.pg}>The Ulna Health Study collects Anonymous health infomation and compares with other people from around the world. The The correlations and knowledge learned will be shared with the medical community.</Text>
          <Text style={this.state.pg}>For medical researchers, the first step to battling disease is understanding it. Ulna Health Study is helping researchers achieve that goal.</Text>
          <Text style={this.state.pg}>More participants mean more data. And more meaningful results. The biggest challenge medical researchers face is recruiting participants. Often just a handful of people are used in a study.</Text>
          <UI.UISpace small={true} />
          <TouchableHighlight
             underlayColor='transparent'
             onPress={() => {
               Alert.alert('Thanks, your amazing!', '', [{text: 'OK', onPress: () => this.JoinStudy()}], { cancelable: false })
             }}>
             <View>
              <UI.UIButton style="white" text="Join Anonymous Study" />
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
              <UI.UIButton style="accent" text="Maybe Later" />
            </View>
          </TouchableHighlight>
          <UI.UISpace />
        </View>
      </ScrollView>
    )
  }
}
