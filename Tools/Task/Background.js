import React, {Component} from 'react'
import { AppState, Text } from 'react-native'
import PushNotification from 'react-native-push-notification';
import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';
import BackgroundFetch from "react-native-background-fetch";

import * as T from '../../Tools'

export function Background(view) {

  // Clear Badges
  // PushNotification.setApplicationIconBadgeNumber(0)
  //
  // BackgroundFetch.configure({
  //    stopOnTerminate: false
  //  }, function() {
  //  })

 //
 //  // Clear Badges
 //  PushNotification.setApplicationIconBadgeNumber(0)
 //
 //  /**
 //  * Display Notification
 //  */
 // // function displayNotification(type) {
 // //   console.log('testSteps()')
 // //   PushNotification.localNotification({
 // //     title: "U.Anatomy",
 // //     message: T.Speech.notification[type],
 // //   });
 // //   T.setStorage(type, JSON.stringify({
 // //     date: moment().format("MMM Do YY"),
 // //   }))
 // //   T.Track('notification', 'Halfway')
 // // }
 //
 //  BackgroundFetch.configure({
 //    stopOnTerminate: false
 //  }, function() {
 //
 //    // PushNotification.localNotification({
 //    //   title: "U.Anatomy",
 //    //   message: 'react-native-background-fetch (event) '+moment().format('HHmm'),
 //    // });
 //    // T.Track('event', 'react-native-background-fetch (event) '+moment().format('HHmm'))
 //
 //    // console.log("[js] Received background-fetch event");
 //    // PushNotification.setApplicationIconBadgeNumber(Number())
 //
 //    // AppleHealthkit.isAvailable((err: Object, available: boolean) => {
 //    //   if (available) {
 //    //
 //    //     // Today
 //    //     AppleHealthkit.getStepCount(null, (err: string, results: Object) => {
 //    //       if (results) {
 //    //
 //    //         // Halfway
 //    //         if (results.value > 4000) {
 //    //           T.getStorage('Halfway', (results) => {
 //    //             if (results) {
 //    //               if (JSON.parse(results).date !== moment().format("MMM Do YY")) {
 //    //                 displayNotification('Halfway')
 //    //               }
 //    //             } else {
 //    //               displayNotification('Halfway')
 //    //             }
 //    //
 //    //           });
 //    //         }
 //    //
 //    //         // Goal!
 //    //         if (results.value > 8000) {
 //    //           T.getStorage('Goal', (results) => {
 //    //             if (results) {
 //    //               if (JSON.parse(results).date !== moment().format("MMM Do YY")) {
 //    //                 displayNotification('Goal')
 //    //               }
 //    //             } else {
 //    //               displayNotification('Goal')
 //    //             }
 //    //
 //    //           });
 //    //         }
 //    //
 //    //       }
 //    //     });
 //    //   }
 //    // });
 //
 //    // To signal completion of your task to iOS, you must call #finish!
 //    // If you fail to do this, iOS can kill your app.
 //    BackgroundFetch.finish();
 //  }, function(error) {
 //    console.log("[js] RNBackgroundFetch failed to start");
 //  });
 //
 //  BackgroundFetch.status(function(status) {
 //    // PushNotification.localNotification({
 //    //   title: "U.Anatomy",
 //    //   message: 'react-native-background-fetch (enabled) '+moment().format('HHmm'),
 //    // });
 //      console.log(status)
 //      switch(status) {
 //        case BackgroundFetch.STATUS_RESTRICTED:
 //          // PushNotification.localNotification({
 //          //   title: "U.Anatomy",
 //          //   message: 'react-native-background-fetch (restricted) '+moment().format('HHmm'),
 //          // });
 //          // T.Track('event', 'react-native-background-fetch (restricted) '+moment().format('HHmm'))
 //          break;
 //        case BackgroundFetch.STATUS_DENIED:
 //          // PushNotification.localNotification({
 //          //   title: "U.Anatomy",
 //          //   message: 'react-native-background-fetch (denied) '+moment().format('HHmm'),
 //          // });
 //          // T.Track('event', 'react-native-background-fetch (denied) '+moment().format('HHmm'))
 //          break;
 //        case BackgroundFetch.STATUS_AVAILABLE:
 //          // PushNotification.localNotification({
 //          //   title: "U.Anatomy",
 //          //   message: 'react-native-background-fetch (enabled) '+moment().format('HHmm'),
 //          // });
 //          // T.Track('event', 'react-native-background-fetch (enabled) '+moment().format('HHmm'))
 //          break;
 //      }
 //    });
 //
 //  //
 //  // BackgroundTask.define(async () => {
 //  //   T.Track('BackgroundTask')
 //  //   console.log('BackgroundTask')
 //  //
 //  //   // Remember to call finish()
 //  //   BackgroundTask.finish()
 //  // })
 //  //
 //  // BackgroundTask.schedule({
 //  //   period: 100, // Aim to run every 30 mins - more conservative on battery
 //  // })
 //
 //  // /**
 //  //  * Display Notification
 //  //  */
 //  // function displayNotification(type) {
 //  //   console.log('testSteps()')
 //  //   PushNotification.localNotification({
 //  //     title: "U.Anatomy",
 //  //     message: T.Speech.notification[type],
 //  //   });
 //  //   T.setStorage(type, JSON.stringify({
 //  //     date: moment().format("MMM Do YY"),
 //  //   }))
 //  //   T.Track('notification', 'Halfway')
 //  // }
 //  //
 //  // // Background Started
 //  // AppState.addEventListener('change', (nextAppState) => {
 //  //
 //  //     T.getStorage('Notifications', (results) => {
 //  //
 //  //       if (results) {
 //  //         const intervalId = BackgroundTimer.setInterval(() => {
 //  //           console.log('RUN')
 //  //
 //  //           AppleHealthkit.isAvailable((err: Object, available: boolean) => {
 //  //             if (available) {
 //  //
 //  //               // Today
 //  //               AppleHealthkit.getStepCount(null, (err: string, results: Object) => {
 //  //                 if (results) {
 //  //
 //  //                   // Halfway
 //  //                   if (results.value > 4000) {
 //  //                     T.getStorage('Halfway', (results) => {
 //  //                       if (results) {
 //  //                         if (JSON.parse(results).date !== moment().format("MMM Do YY")) {
 //  //                           displayNotification('Halfway')
 //  //                         }
 //  //                       } else {
 //  //                         displayNotification('Halfway')
 //  //                       }
 //  //
 //  //                     });
 //  //                   }
 //  //
 //  //                   // Goal!
 //  //                   if (results.value > 8000) {
 //  //                     T.getStorage('Goal', (results) => {
 //  //                       if (results) {
 //  //                         if (JSON.parse(results).date !== moment().format("MMM Do YY")) {
 //  //                           displayNotification('Goal')
 //  //                         }
 //  //                       } else {
 //  //                         displayNotification('Goal')
 //  //                       }
 //  //
 //  //                     });
 //  //                   }
 //  //
 //  //                 }
 //  //               });
 //  //             }
 //  //           });
 //  //
 //  //         }, 3600);
 //  //       }
 //  //
 //  //     });
 //  //
 //  // });

}
