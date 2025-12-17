import React from 'react';
import { StatusBar, useColorScheme, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AppRoutes from './src/routes/Approutes';
import Navigation from './src/routes/Navigation';
import auth from '@react-native-firebase/auth';
console.log('Firebase Auth loaded:', auth);

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      {/* <Provider> */}
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
      {/* </Provider> */}
    </>
  );
}

export default App;
