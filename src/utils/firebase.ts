

import messaging from '@react-native-firebase/messaging';

/**
 * Request permission and get device FCM token
 */

// export const getFCMToken = async () => {
//   await messaging().requestPermission();
//   const token = await messaging().getToken();
//   console.log('FCM Token:', token);
//   return token;
// }


export const getFCMToken = async (): Promise<string | null> => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (!enabled) {
    console.log('FCM Permission denied');
    return null;
  }

  const token = await messaging().getToken();
  console.log('FCM Token:', token);
  return token;
};
