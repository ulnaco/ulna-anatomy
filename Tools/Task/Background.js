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

     T.Track('notification', 'Started')

     // Background Fetch Event
     AppleHealthkit.isAvailable((err: Object, available: boolean) => {
        if (available) {
          AppleHealthkit.getStepCount(null, (err: string, results: Object) => {
             if (results) {
               PushNotification.localNotification({
                 title: "U.Anatomy",
                 message: results.value+' Steps Today',
               });
               T.Track('notification', 'Completed')
             }
           });
         }
      })
      // END: Background Fetch Event

   })

}
