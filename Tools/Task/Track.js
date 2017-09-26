import btoa from 'base-64'
import DeviceInfo from 'react-native-device-info'
import UUID from 'uuid/v1'

import * as T from '../../Tools'

export function Track(type, event, properties=false) {

  event = event.charAt(0).toUpperCase() + event.slice(1);

  if (type == 'view') event = `V/${event}`;
  if (type == 'event') event = `E/${event}`;
  if (type == 'state') event = `S/${event}`;
  if (type == 'initial') event = `I/${event}`;


  const request = {
    event: event,
    properties: {
      "Phone": DeviceInfo.getModel(),
      "App Version": DeviceInfo.getVersion(),
      "Build Number": DeviceInfo.getBuildNumber(),
      "System Version": DeviceInfo.getSystemVersion(),
      "token": "49c5f6717d062ca82db0f8d431b13ba5",
    }
  }
  if (typeof properties === 'object') {
    request.properties = Object.assign(request.properties, properties);
  }

  T.getStorage('Person', (uuid) => {
    if (uuid) request.properties.distinct_id = uuid;
    console.log('Event', request)
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

  T.getStorage('HealthStudy', (study) => {
    if (study) request['$set'].HealthStudy = true;
    if (DeviceInfo.isEmulator()) request['$set']['$first_name'] = 'Simulator';
    console.log('Person', request)
    const requestMash = 'http://api.mixpanel.com/engage/?data='+btoa.encode(JSON.stringify(request));
    console.log(requestMash)
    fetch(requestMash)
  });

}
