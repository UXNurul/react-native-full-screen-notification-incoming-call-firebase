import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

messaging().onMessage(async remoteMessage => {
  console.log('Message handled in the onMessage!', remoteMessage);
  displayIncomingCallNotification(remoteMessage.data);
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  displayIncomingCallNotification(remoteMessage.data);
});

async function displayIncomingCallNotification(data) {
  await notifee.createChannel({
    id: 'call',
    name: 'Call Channel',
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
  });

  await notifee.displayNotification({
    title: data.title,
    body: data.body,
    android: {
      channelId: 'call',
      category: AndroidCategory.CALL,
      visibility: AndroidVisibility.PUBLIC,
      importance: AndroidImportance.HIGH,
      timestamp: Date.now(),
      showTimestamp: true,
      pressAction: {
        id: 'default',
        launchActivity: 'com.awesomeproject.FullScreenActivity',
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
        id: 'full_screen',
        launchActivity: 'com.awesomeproject.FullScreenActivity',
      },
    },
  });
}

AppRegistry.registerComponent(appName, () => App);

export default displayIncomingCallNotification;
