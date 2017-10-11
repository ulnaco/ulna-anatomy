import React, {Component} from 'react'
import {
  AppState,
} from 'react-native'

import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';
import BackgroundFetch from "react-native-background-fetch";
import PushNotification from 'react-native-push-notification'

import * as T from '../../Tools'

export function Background(view) {

  BackgroundFetch.configure({
    stopOnTerminate: false,
  }, function() {
    SYNC()
    LOG('BackgroundFetch')
    BackgroundFetch.finish();
  })

  BackgroundFetch.status(function(status) {
    switch(status) {
      case BackgroundFetch.STATUS_RESTRICTED:
        LOG("BackgroundFetch restricted");
        break;
      case BackgroundFetch.STATUS_DENIED:
        LOG("BackgroundFetch denied");
        break;
      case BackgroundFetch.STATUS_AVAILABLE:
        SYNC()
        LOG("BackgroundFetch is enabled");
        break;
    }
  });

  function LOG(task) {
    T.getStorage('Log', (results) => {
      let log = []
      if (results) {
        log = JSON.parse(results)
      }
      log.push({
        task: task,
        time: moment().format(),
      })
      T.setStorage('Log', JSON.stringify(log));
    })
  }

  function SYNC() {
    T.getStorage('Healthkit', (results) => {
      fetch('https://h5ixokl4lk.execute-api.us-east-1.amazonaws.com/dev/event', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: results
      })
      .then((response) => response.text())
      .then((responseJson) => {
        console.log(responseJson)
        PushNotification.setApplicationIconBadgeNumber(0)
        PushNotification.localNotification({
          title: "Ulna Anatomy Notification",
          message: "Ulna Anatomy Notification"
        });
      })
    });
  }

}
