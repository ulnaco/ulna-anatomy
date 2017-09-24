import React from 'react';
import {
  AsyncStorage
} from 'react-native';

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
