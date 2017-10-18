import React, {Component} from 'react'
import { AppState, Text } from 'react-native'
import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import * as T from '../../Tools'

export function Watchdog(view) {
  T.Background(view);
  AppState.addEventListener('change', (nextAppState) => {
    T.Healthkit(() => {
      if (nextAppState == 'active') {
        T.Sync();
      }
    });
  })
}
