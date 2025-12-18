import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as Screens from './Screens';
const AuthRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Suspense
        fallback={
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="large" color="#070736ff" />
          </View>
        }
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
          <Stack.Screen name="Signup" component={Screens.SignUpScreen} />
        </Stack.Navigator>
      </Suspense>
    </>
  );
};

export default AuthRoutes;

const styles = StyleSheet.create({});
