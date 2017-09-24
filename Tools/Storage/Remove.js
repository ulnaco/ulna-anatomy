import React from 'react';
import {
  AsyncStorage
} from 'react-native';

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
