import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  displayIncomingCallNotification(remoteMessage);
});

async function displayIncomingCallNotification(remoteMessage) {
  await notifee.createChannel({
    id: 'call',
    name: 'Call Channel',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
  });

  await notifee.displayNotification({
    title: remoteMessage.notification.title,
    body: remoteMessage.notification.body,
    android: {
      channelId: 'call',
      category: AndroidCategory.CALL,
      visibility: AndroidVisibility.PUBLIC,
      importance: AndroidImportance.HIGH,
      timestamp: Date.now(),
      showTimestamp: true,
      pressAction: {
        id: 'default',
        launchActivity: 'com.awesomeproject.CustomActivity',
      },
      actions: [
        {
          title: 'Accept',
          pressAction: {
            id: 'accept',
            launchActivity: 'default',
          },
        },
        {
          title: 'Decline',
          pressAction: {
            id: 'reject',
          },
        },
      ],
      fullScreenAction: {
        id: 'default',
        launchActivity: 'com.awesomeproject.CustomActivity',
      },
    },
  });
}

export default displayIncomingCallNotification;
