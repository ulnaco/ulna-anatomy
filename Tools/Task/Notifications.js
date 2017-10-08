import PushNotification from 'react-native-push-notification';

import * as T from '../../Tools'

export function Notifications() {
  PushNotification.configure({
    onRegister: function(token) {

      // Update Profile
      T.Person({
        'Notification Token': token.token,
      });

      T.setStorage('Token', token.token);
    },
    onNotification: function(notification) {
      console.log('NOTIFICATION:', notification);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
}
