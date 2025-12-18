import React from 'react';

// export { default as LoginScreen } from '../screens/auth/LoginScreen';
// export { default as SignUpScreen } from '../screens/auth/SignupScreen';
// export { default as DashBoard } from '../screens/task/TaskDashboard';
// export { default as EditTask } from '../screens/task/EditTask';
// export { default as AddTask } from '../screens/task/AddTask';

export const LoginScreen = React.lazy(() => import('../screens/auth/LoginScreen'));
export const SignUpScreen = React.lazy(() => import('../screens/auth/SignupScreen'));
export const DashBoard = React.lazy(() => import('../screens/task/TaskDashboard'));
export const EditTask = React.lazy(() => import('../screens/task/EditTask'));
export const AddTask = React.lazy(() => import('../screens/task/AddTask'));





