import btoa from 'base-64'
import DeviceInfo from 'react-native-device-info'
import UUID from 'uuid/v1'

import * as T from '../../Tools'

export function Track(event, properties=false) {
  const request = {
    event: event,
    properties: {
      "Phone": DeviceInfo.getModel(),
      "App Version": DeviceInfo.getVersion(),
      "System Version": DeviceInfo.getSystemVersion(),
      "token": "49c5f6717d062ca82db0f8d431b13ba5",
    }
  }
  if (typeof properties === 'object') {
    request.properties = Object.assign(request.properties, properties);
  }

  T.getStorage('Person', (uuid) => {
    if (uuid) {
      request.properties.distinct_id = uuid
    }
    console.log('Track', request)
    const requestMash = 'http://api.mixpanel.com/track/?data='+btoa.encode(JSON.stringify(request));
    fetch(requestMash)
  });
}

export function Person() {
  const uuid = UUID();
  T.setStorage('Person', uuid);
  let request = {
    "$token": "49c5f6717d062ca82db0f8d431b13ba5",
    "$distinct_id": uuid,
    "$set": {
      "UUID": uuid,
      "Device Locale": DeviceInfo.getDeviceLocale(),
      "App Version": DeviceInfo.getVersion(),
      "System Version": DeviceInfo.getSystemVersion(),
      "Phone": DeviceInfo.getModel(),
    }
}
  console.log('Person', request)
  const requestMash = 'http://api.mixpanel.com/engage/?data='+btoa.encode(JSON.stringify(request));
  console.log(requestMash)
  fetch(requestMash)
}
