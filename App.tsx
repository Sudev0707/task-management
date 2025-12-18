import React, { useEffect } from 'react';
import { StatusBar, useColorScheme, View, Text } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './src/routes/Approutes';
import Navigation from './src/routes/Navigation';
import auth from '@react-native-firebase/auth';
import { store } from './src/redux/store';
import { clearUser, storeUser } from './src/redux/slice';
import { getTasksFromDB, getUserFromDB, initDB } from './src/sqlite/database';
import { syncTasksToFirestore } from './src/utils/firestoresync';
import { requestNotificationPermission } from './src/utils/notifications';
import { getFCMToken } from './src/utils/firebase';
import { getMessaging } from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';

console.log('Firebase Auth loaded:', auth);

// const AuthState = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const authCheck = auth().onAuthStateChanged(user => {
//       if (user) {
//         dispatch(storeUser({ uid: user.uid, email: user.email }));
//       } else {
//         dispatch(clearUser());
//       }
//     });

//     return authCheck;
//   }, []);

//   return <Navigation />;
// };

// sqlite session
// const SessionLoadDB = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const loadSession = async () => {
//       await initDB();
//       const user = await getUserFromDB();
//       if (user) {
//         dispatch(storeUser(user));
//       }
//     };
//     loadSession();
//   }, []);

//   return <Navigation />;
// };

const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initApp = async () => {
      await initDB();

      // Load user from SQLite
      const user = await getUserFromDB();
      if (user) dispatch(storeUser(user));

      const tasks = await getTasksFromDB();
      const syncTasks = await getTasksFromDB();
      console.log('Tasks loaded:', syncTasks);

      // Sync unsynced tasks to Firestore
      await syncTasksToFirestore();
    };

    initApp();

    const unsubscribeAuth = auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        dispatch(
          storeUser({ uid: firebaseUser.uid, email: firebaseUser.email }),
        );
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribeAuth();
  }, [dispatch]);

  return <Navigation />;
};

// Background message handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('FCM Background Message:', remoteMessage);
});

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  // useEffect(() => {
  //   requestNotificationPermission();
  // }, []);

  //--------

  useEffect(() => {
    const initNotifications = async () => {
      // Local notifications permission
      await requestNotificationPermission();

      // FCM permission and token
      const token = await getFCMToken();
      console.log('FCM Token:', token);

      // Listen for foreground messages
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('FCM Message received:', remoteMessage);
        // Show local notification if you want
      });

      return unsubscribe; // cleanup
    };

    const unsubscribePromise = initNotifications();

    // 
    return () => {
      unsubscribePromise.then(unsub => unsub && unsub());
    };
  }, []);

  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          {/* <AuthState /> */}
          {/* <SessionLoadDB /> */}
          <AppInitializer />
        </NavigationContainer>
      </Provider>
    </>
  );
}

export default App;
