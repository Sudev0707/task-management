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
      console.log('Tasks loaded:', tasks);

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

function App() {
  const isDarkMode = useColorScheme() === 'dark';

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
