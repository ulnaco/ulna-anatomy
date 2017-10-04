import React, {Component} from 'react'
import { AppState, Text } from 'react-native'
import PushNotification from 'react-native-push-notification';
import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';
import BackgroundFetch from "react-native-background-fetch";

import * as T from '../../Tools'

export function Background(view) {

  // Clear Badges
  PushNotification.setApplicationIconBadgeNumber(0)

  // Start Fetch
  BackgroundFetch.configure({
     stopOnTerminate: false
   }, function() {
     T.Track('notification', 'BackgroundFetch')
   })

}
