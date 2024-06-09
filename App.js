import {View, Text, Button} from 'react-native';
import React, {useEffect} from 'react';
import notifee, {
  AndroidCategory,
  AndroidColor,
  AndroidImportance,
  AndroidVisibility,
  EventType,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  const gettoken = async () => {
    const token = await messaging().getToken();

    console.log('token', token);
  };

  useEffect(() => {
    gettoken();

    return () => gettoken();
  }, []);

  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   console.log('Message handled in the background!', remoteMessage);
  //   onDisplayNotification(remoteMessage);
  // });

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    // await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default9',
      name: 'Default Channel9',
      sound: 'default',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'remoteMessage.notification.title',
      body: 'remoteMessage.notification.body',
      subtitle: '&#129395;',
      android: {
        channelId,
        category: AndroidCategory.CALL,
        visibility: AndroidVisibility.PUBLIC,
        importance: AndroidImportance.HIGH,
        color: '#4caf50',
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
      },
    });
  }

  return (
    <View>
      <Text>App</Text>
      <Button title="Display Notification" onPress={onDisplayNotification} />
    </View>
  );
}
