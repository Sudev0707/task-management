# Task Manager App

A React Native CLI Task Management mobile application built with an offline-first architecture, using SQLite for local data storage and Redux Toolkit for centralized state management. Tasks are created, updated, and toggled locally.

The app supports Firebase Authentication for user login/signup with persistent sessions stored in SQLite. When online, tasks automatically sync to Firestore, keeping local and cloud data consistent. task reminders via notifications, pull-to-refresh, and  dark/light mode support.


---

## Table of Contents

- [Architecture](#architecture)
- [Features](#features)
- [Libraries Used](#libraries-used)
- [Installation & Running](#installation--running)
- [Known Limitations](#known-limitations)
- [Folder Structure](#folder-structure)

---

## Architecture

- **React Native** – Cross-platform mobile app framework.  
- **Redux Toolkit** – Centralized state management.  
- **SQLite** – Local database for offline-first functionality.  
- **Async Thunks** – Handle database operations (add, update, delete) and Redux store updates.  
- **Firestore (optional)** – Sync tasks to the cloud when online.  
- **Offline-first** – Tasks are stored locally first, then synced when online.

---

## Features

- Signup and Login with Firebase Auth.
- Add, edit, and delete tasks.
- Toggle task completion.  
- Pull-to-refresh tasks.  
- Pagination for task list.  
- Offline support with SQLite.  
- Cloud sync (Firestore) when online.  
- Loader and smooth UI for data operations.
- Task reminder with notification (notification appear after one minute of task creation).
- dark / light mode 

---

## Libraries Used

- `react-native` – Mobile framework.  
- `react-redux` & `@reduxjs/toolkit` – State management.  
- `react-native-sqlite-storage` – Local SQLite database.  
- `uuid` – Unique IDs for tasks.  
- `@react-native-firebase/app` – Firebase core integration.  
- `@react-native-firebase/auth` – Firebase authentication.  
- `@react-native-firebase/firestore` – Cloud Firestore database.  
- `@react-native-firebase/messaging` – Push notifications.  
- `@react-native-community/netinfo` – Network status detection.  
- `@notifee/react-native` – Advanced notifications.  
- `@react-navigation/native` – Navigation container for React Native.  
- `@react-navigation/native-stack` – Stack navigation.  
- `@react-navigation/stack` – Stack navigation (older version / backward compatibility).  
- `react-native-gesture-handler` – Gesture support for navigation and UI.  
- `react-native-reanimated` – Animation library.  
- `react-native-safe-area-context` – Safe area handling.  
- `react-native-screens` – Optimized screen management.  
- `@react-native/new-app-screen` – Default new app screen (RN 0.83).  
- `react-native-vector-icons` – UI icons (optional).  


---

## Installation & Running

### 1. Clone the repository

```bash
git clone https://github.com/Sudev0707/task-management.git
cd task-manager-app
git checkout dev 
npm install
```

### 2. Switch to the development branch
```bash
git checkout dev
```
### 3. Run on Android
```bash
npx react-native run-android
```
### 4. Run on iOS
```bash
npx react-native run-ios
```

## Known Limitations

- Firestore sync is **basic**; simultaneous updates on multiple devices may cause conflicts.  
- User sessions are persisted locally via SQLite, but **multi-user support is not implemented**.  
- Pagination is implemented locally; **very large task lists** may still impact performance.  
- Offline mode works, but **delayed sync** may cause temporary inconsistencies between local and cloud data.  
- Push notifications using Notifee/Firebase are **basic** and may require additional configuration for production.  
- Pull-to-refresh reloads tasks from local DB only; **no real-time cloud updates**.  
- UI does not include **advanced theming or dark mode**.  
- Error handling for database or network failures is **minimal**, so crashes may occur in rare edge cases.  
 
