import React, {Component} from 'react'
import { AppState, Text } from 'react-native'
import PushNotification from 'react-native-push-notification';
import BackgroundTimer from 'react-native-background-timer';
import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import * as T from '../../Tools'

export function Background(view) {


  /**
   * Display Notification
   */
  function displayNotification(type) {
    console.log('testSteps()')
    PushNotification.localNotification({
      title: "U.Anatomy",
      message: T.Speech.notification[type],
    });
    T.setStorage(type, JSON.stringify({
      date: moment().format("MMM Do YY"),
    }))
    T.Track('notification', 'Halfway')
  }

  // Background Started
  AppState.addEventListener('change', (nextAppState) => {

      T.getStorage('Notifications', (results) => {

        if (results) {
          const intervalId = BackgroundTimer.setInterval(() => {
            console.log('RUN')

            AppleHealthkit.isAvailable((err: Object, available: boolean) => {
              if (available) {
                AppleHealthkit.getStepCount(null, (err: string, results: Object) => {
                  if (results) {

                    // Halfway
                    if (results.value > 4000) {
                      T.getStorage('Halfway', (results) => {
                        if (results) {
                          if (JSON.parse(results).date !== moment().format("MMM Do YY")) {
                            displayNotification('Halfway')
                          }
                        } else {
                          displayNotification('Halfway')
                        }

                      });
                    }

                    // Goal!
                    if (results.value > 8000) {
                      T.getStorage('Goal', (results) => {
                        if (results) {
                          if (JSON.parse(results).date !== moment().format("MMM Do YY")) {
                            displayNotification('Goal')
                          }
                        } else {
                          displayNotification('Goal')
                        }

                      });
                    }

                  }
                });
              }
            });

          }, 3600);
        }

      });

  });

}
