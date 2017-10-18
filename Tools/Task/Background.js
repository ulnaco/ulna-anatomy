import React, {Component} from 'react'
import {
  AppState,
} from 'react-native'

import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';
import BackgroundFetch from "react-native-background-fetch";

import * as T from '../../Tools'

export function Background(view) {
  console.info('Started: Background Lookout')

  BackgroundFetch.configure({
    stopOnTerminate: false,
  }, function() {
    T.Sync()
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

}
