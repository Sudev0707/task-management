import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
//
import * as Screens from './Screens';
const Stack = createStackNavigator();
export default function AppRoutes() {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="DashBoard" component={Screens.DashBoard} />
        {/* <Stack.Screen name="AddTask" component={Screens.AddTask} />
        <Stack.Screen name="EditTask" component={Screens.EditTask} /> */}
      </Stack.Navigator>
    </>
  );
}
