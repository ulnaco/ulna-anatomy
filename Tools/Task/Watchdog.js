import React, {Component} from 'react'
import { AppState, Text } from 'react-native'
import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import * as T from '../../Tools'

export function Watchdog(view) {
  AppState.addEventListener('change', (nextAppState) => {
    T.Healthkit();
    T.Sync();
  })
}
