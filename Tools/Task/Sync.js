import PushNotification from 'react-native-push-notification'

import * as T from '../../Tools'

export function Sync() {
  T.getStorage('Healthkit', (results) => {
    fetch('https://h5ixokl4lk.execute-api.us-east-1.amazonaws.com/dev/event', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: results
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson)
      if (responseJson.badge) PushNotification.setApplicationIconBadgeNumber(Number(responseJson.badge))
      if (responseJson.message) {
        PushNotification.localNotification({
          title: responseJson.title,
          message: responseJson.message
        });
      }
    })
  });
}
