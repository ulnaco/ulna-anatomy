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
  if (type == 'notification') event = `N/${event}`;

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
  T.setStorage('Person', UUID())
}
