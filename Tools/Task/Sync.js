import DeviceInfo from 'react-native-device-info'

import * as T from '../../Tools'

export function Sync() {
  console.info('Started: Sync')
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

    T.getStorage('EnableBadges', (Badges) => {
      if (Badges) {
        results.Badges = 1
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
      })
    });

  });
}
