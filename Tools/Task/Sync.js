import PushNotification from 'react-native-push-notification'
import DeviceInfo from 'react-native-device-info'

import * as T from '../../Tools'

export function Sync() {
  T.getStorage('Healthkit', (results) => {
    results = JSON.parse(results)
    if (!results.UUID && !DeviceInfo.isEmulator()) return;

    // Device Details
    const device = {
      "Phone": DeviceInfo.getModel(),
      "App Version": DeviceInfo.getVersion(),
      "Build Number": DeviceInfo.getBuildNumber(),
      "System Version": DeviceInfo.getSystemVersion(),
    }

    // Emulator
    if (DeviceInfo.isEmulator()) {
      results.UUID = "123abc";
    }

    // Payload
    const payload = JSON.stringify(Object.assign(results, device));
    console.log(payload)

    // Request
    fetch('https://h5ixokl4lk.execute-api.us-east-1.amazonaws.com/dev/event', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: payload
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)

      // Local Notifications Badge
      T.getStorage('EnableBadges', (results) => {
        if (results) {
          PushNotification.setApplicationIconBadgeNumber(Number(responseJson.badge))
        } else {
          PushNotification.setApplicationIconBadgeNumber(0)
        }
      });

      // Local Notifications Alert
      if (!responseJson.notifications) return
      if (responseJson.message) {
        PushNotification.localNotification({
          title: responseJson.title,
          message: responseJson.message
        });
      }

    })
  });
}
