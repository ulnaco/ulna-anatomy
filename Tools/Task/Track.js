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

  // Test Project
  if (DeviceInfo.isEmulator()) request.properties['token'] = "829c5f8b01d383f87032473ae3343132"

  T.getStorage('Person', (uuid) => {
    if (uuid) request.properties.distinct_id = uuid;
    console.log('Event', request)
    const requestMash = 'http://api.mixpanel.com/track/?data='+btoa.encode(JSON.stringify(request));
    fetch(requestMash)
  });
}

export function Person(update) {
  let request = {
    "$token": "49c5f6717d062ca82db0f8d431b13ba5",
    "$set": {
      "Device Locale": DeviceInfo.getDeviceLocale(),
      "App Version": DeviceInfo.getVersion(),
      "System Version": DeviceInfo.getSystemVersion(),
      "Phone": DeviceInfo.getModel(),
    }
  }

  // Test Project
  if (DeviceInfo.isEmulator()) request['$token'] = "829c5f8b01d383f87032473ae3343132"

  // User Update
  if (update) {
    request['$set'] = Object.assign(request['$set'], update);
  }

  T.getStorage('Person', (uuid) => {
    if (uuid)  {
      request['$distinct_id'] = uuid
      request['$set']['UUID'] = uuid
    } else {
      request['$distinct_id'] = UUID()
      T.setStorage('Person', request['$distinct_id']);
      request['$set']['UUID'] = request['$distinct_id']
    }

    T.getStorage('HealthStudy', (study) => {
      if (study) request['$set'].HealthStudy = true;
      if (DeviceInfo.isEmulator()) request['$set']['$first_name'] = 'Simulator';
      console.log('Person', request)
      const requestMash = 'http://api.mixpanel.com/engage/?data='+btoa.encode(JSON.stringify(request));
      console.log(requestMash)
      fetch(requestMash)
    });
  })

}
