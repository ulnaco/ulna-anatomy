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
    healthData.StepCountYesterday = await getStepCountYesterday(localization);
    healthData.DistanceWalkingRunning = await getDistanceWalkingRunning(localization);
    healthData.ActiveEnergyBurned = await getActiveEnergyBurned(localization);
    healthData.Weight = await getLatestWeight(localization);
    healthData.Age = await getDateOfBirth();
    healthData.DistanceCycling = await getDistanceCycling(localization);
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
      if (fn) fn()

    });

  }

  /**
   * Steps
   */
  function getStepCount(localization) {
    return new Promise((resolve, reject) => {
      AppleHealthkit.getStepCount(null, (err: string, results: Object) => {
        if (err) resolve(false);
        if (results) resolve(results.value.toFixed(0))
      });
    });
  }

  /**
   * Steps Yesterday
   */
  function getStepCountYesterday(localization) {
    return new Promise((resolve, reject) => {
      var yesterdayOpts = {
        date: moment().subtract(1, 'day').endOf('day').toISOString()
      }
      AppleHealthkit.getStepCount(yesterdayOpts, (err: string, results: Object) => {
        if (err) resolve(false);
        if (results) resolve(results.value.toFixed(0))
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
   * DistanceCycling
   */
  function getDistanceCycling(localization) {
    return new Promise((resolve, reject) => {
      AppleHealthkit.getDistanceCycling({ unit: localization.distance.unit }, (err: Object, results: Object) => {
        if (err) resolve(false);
        if (results) {
          console.log(results)
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
  function getActiveEnergyBurned() {
    return new Promise((resolve, reject) => {
      var energyBurnedOpts = {
        startDate: moment().startOf('hour').toISOString()
      }
      AppleHealthkit.getActiveEnergyBurned(energyBurnedOpts, (err: Object, results: Object) => {
        if (err) resolve(false);
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
    * Weight
    */
    function getLatestWeight(localization) {
      return new Promise((resolve, reject) => {
        AppleHealthkit.getLatestWeight({ unit: localization.weight.unit }, (err: string, results: Object) => {
          if (results) {
            resolve(results.value.toFixed(1))
          } else {
            resolve(false)
          }
        });
      });
    }

   /**
    * UUID
    */
   function UUID() {
     return new Promise((resolve, reject) => {
       T.getStorage('Token', (uuid) => {
         if (uuid) {
           resolve(uuid);
         } else {
           resolve(false)
         }
       })
     });
   }

}
