import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';

import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import * as UI from '../../UI'
import * as T from '../../Tools'

export class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    return (
      <View style={{marginTop: UI.UIStyleguide.spacing*2, justifyContent: 'center', flexDirection: 'row'}}>
        <Image
          style={{width: 200, height: 200}}
          source={require('../../assets/loading.gif')}
        />
      </View>
    )
  }
}
