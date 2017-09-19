import React from 'react';
import {
  AsyncStorage
} from 'react-native';

/**
 * Get Storage
 * @param  {string}   key
 * @param  {Function} fn
 * @return
 */
export function getStorage(key, fn) {
  try {
    AsyncStorage.getItem('@MySuperStore:'+key, (err, result) => {
      return fn(result);
    })
  } catch (error) {
    return fn(false)
  }
}
