import React, {Component} from 'react'
import {
  AppState,
} from 'react-native'
import AppleHealthkit from 'rn-apple-healthkit';
import BackgroundFetch from "react-native-background-fetch";

import * as T from '../../Tools'

export function Background(view) {

  // Start Fetch
  BackgroundFetch.configure({
    stopOnTerminate: false,
  }, function() {
    T.Track('notification', 'BackgroundFetch3')
    BackgroundFetch.finish();
  })

}
