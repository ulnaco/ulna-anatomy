import React, {Component} from 'react'
import { AppState, Text } from 'react-native'
import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import * as T from '../../Tools'

export function Watchdog(view) {
  if (view.props.navigation) {
    T.Track('view', view.props.navigation.state.routeName)
  }
}
