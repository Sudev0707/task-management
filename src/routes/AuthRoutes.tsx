import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Screens from './Screens';
const AuthRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Screens.LoginScreen} />
        <Stack.Screen name="Signup" component={Screens.SignUpScreen} />
      </Stack.Navigator>
    </>
  );
};

export default AuthRoutes;

const styles = StyleSheet.create({});
