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

/**
 * Set Storage
 * @param  {string}   key
 * @param  {string}   value
 * @return
 */
export function setStorage(key, value) {
  AsyncStorage.setItem('@MySuperStore:'+key, value, () => {
    return true;
  });
}

/**
 * Remove Storage
 * @param  {string}   key
 * @return
 */
export function removeStorage(key) {
  AsyncStorage.removeItem('@MySuperStore:'+key, () => {
    return true;
  });
}
