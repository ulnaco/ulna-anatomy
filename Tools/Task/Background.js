import React, {Component} from 'react'
import {
  AppState,
} from 'react-native'
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
    stopOnTerminate: false,
  }, function() {

    // Steps
    AppleHealthkit.initHealthKit({}: Object, (err: Object, results: Object) => {
      AppleHealthkit.isAvailable((err: Object, available: boolean) => {
        if (available) {
          AppleHealthkit.getStepCount(null, (err: string, results: Object) => {
            if (results) {
              T.Track('notification', 'BackgroundFetch2', {
                steps: results.value
              })
            }
          });
        }
      });
    });

    BackgroundFetch.finish();
  })


  BackgroundFetch.status(function(status) {
    switch(status) {
      case BackgroundFetch.STATUS_AVAILABLE:
        // Steps
        AppleHealthkit.initHealthKit({}: Object, (err: Object, results: Object) => {
          AppleHealthkit.isAvailable((err: Object, available: boolean) => {
            if (available) {
              AppleHealthkit.getStepCount(null, (err: string, results: Object) => {
                if (results) {
                  T.Track('notification', 'BackgroundFetch2', {
                    steps: results.value,
                    status: 'active'
                  })
                }
              });
            }
          });
        });
        break;
    }
  });

}
