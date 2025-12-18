import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import AppRoutes from './Approutes';
import AuthRoutes from './AuthRoutes';
const Stack = createStackNavigator();
const Navigation = () => {
  const token = false;
  const user = useSelector((state: any)=> state.user.user)
  //   const token = useSelector(state => state.accessToken.token);
console.log("user loggedin", user);

  return <>{user ? <AppRoutes /> : <AuthRoutes />}</>;
};

export default Navigation;

const styles = StyleSheet.create({});
