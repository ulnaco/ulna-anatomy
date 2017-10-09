import React from 'react';
import {
  AsyncStorage
} from 'react-native';

import moment from 'moment'
import AppleHealthkit from 'rn-apple-healthkit';

import * as T from '../../Tools'

export function Healthkit(fn) {

  /**
   * INIT
   */
  AppleHealthkit.initHealthKit({}: Object, (err: Object, results: Object) => {
    AppleHealthkit.isAvailable((err: Object, available: boolean) => {
      if (available) {
        T.getLocalization((results) => {
          sync(results);
        })
      }
    });
  });

  /**
   * Start Sync
   */
  async function sync(localization) {
    const healthData = {}
    healthData.StepCount = await getStepCount(localization);
    healthData.DistanceWalkingRunning = await getDistanceWalkingRunning(localization);
    healthData.ActiveEnergyBurned = await getActiveEnergyBurned(localization);
    healthData.Age = await getDateOfBirth();
    healthData.BMI = await BMI();
    healthData.UUID = await UUID();

    /**
     * Health Rating
     */
    T.rating((result) => {
      var RatingsArray = []
      RatingsArray[moment().format('YYYY/WW')] = result;
      T.setStorage('Ratings', JSON.stringify(RatingsArray))
      healthData.Rating = result;
      T.Person({
        'Rating': result,
      });
      T.setStorage('Healthkit', JSON.stringify(healthData))

      // Done
      fn()

    });


  }

  /**
   * Steps
   */
  function getStepCount(localization) {
    return new Promise((resolve, reject) => {
      AppleHealthkit.getStepCount(null, (err: string, results: Object) => {
        if (err) resolve(false);
        if (results) resolve(results.value)
      });
    });
  }

  /**
   * DistanceWalkingRunning
   */
  function getDistanceWalkingRunning(localization) {
    return new Promise((resolve, reject) => {
      AppleHealthkit.getDistanceWalkingRunning({ unit: localization.distance.unit }, (err: Object, results: Object) => {
        if (err) resolve(false);
        if (results) {
          let distance = (results.value).toFixed(2)
          if (localization.distance.unit == 'meter') {
            distance = (results.value/1000).toFixed(2)
          }
          resolve(distance+' '+localization.distance.display)
        }
      });
    });
  }

  /**
   * ActiveEnergyBurned
   */
  function getActiveEnergyBurned(localization) {
    return new Promise((resolve, reject) => {
      var energyBurnedOpts = {
        startDate: moment().startOf('hour').toISOString()
      }
      AppleHealthkit.getActiveEnergyBurned(energyBurnedOpts, (err: Object, results: Object) => {
        if (err) resolve(false);
        console.log(results)
        if (results && results.length > 0) {
          resolve(results[0].value.toFixed(1)+' kcal')
        } else {
          resolve(false);
        }
      })
    });
  }

  /**
   * Age
   */
  function getDateOfBirth() {
    return new Promise((resolve, reject) => {
      AppleHealthkit.getDateOfBirth(null, (err: string, results: Object) => {
        if (results.age) {
          resolve(results.age)
        } else {
          resolve(false);
        }
      });
    });
  }

  /**
   * BMI
   */
   function BMI() {
     return new Promise((resolve, reject) => {
       T.bmi((result) => {
         resolve(result);
       })
     });
   }

   /**
    * UUID
    */
   function UUID() {
     return new Promise((resolve, reject) => {
       T.getStorage('Person', (uuid) => {
         resolve(uuid);
       })
     });
   }


}
