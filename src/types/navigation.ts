import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStack = {
  Login: undefined;
  Signup: undefined;
  Dashboard: undefined;
};
export type AppStack = {
  Dashboard: undefined;
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthStack>;
export type AppNavigationProp = NativeStackNavigationProp<AppStack>;
