import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: (notification) => {
    console.log('NOTIFICATION:', notification);
  }
});

const Notification = {
  localNotification: (msg) => {
    PushNotification.localNotification(msg);
  },
  setApplicationIconBadgeNumber: (count) => {
    PushNotification.setApplicationIconBadgeNumber(count);
  }
};

export default Notification;
