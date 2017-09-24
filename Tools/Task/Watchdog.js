import React, {Component} from 'react'
import { AppState, Text } from 'react-native'

import * as T from '../../Tools'

export function Watchdog(view) {
  var Track = {
    Name: view.props.navigation.state.routeName
  }
  T.Track('View', Track)
  console.log(view.props)


      // Start a timer that runs continuous after X milliseconds
  // const intervalId = BackgroundTimer.setInterval(() => {
  // 	// this will be executed every 200 ms
  // 	// even when app is the the background
  // 	// console.log('tic');
  // }, 200);
  //
  // BackgroundTimer.start(1000);

  // Cancel the timer when you are done with it
  // BackgroundTimer.clearInterval(intervalId);


      // PushNotification.localNotificationSchedule({
      //     message: "My Schedule Notification Message", // (required)
      //     number: 3,
      //     date: new Date(Date.now()) // in 3 secs
      //   });

}
