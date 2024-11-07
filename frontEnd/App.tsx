import React, { createContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PocketBase from 'pocketbase';

import Temp from './components/Temp';

import PocketBaseContext from './components/context/PocketBaseContext';

const URL = process.env.EXPO_PUBLIC_EC_API_URL;
const ADMIN_USERNAME = process.env.EXPO_PUBLIC_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.EXPO_PUBLIC_ADMIN_PASSWORD;
const USER1_USERNAME = process.env.EXPO_PUBLIC_USER1_USERNAME;
const USER1_PASSWORD = process.env.EXPO_PUBLIC_USER1_PASSWORD;
const USER2_USERNAME = process.env.EXPO_PUBLIC_USER2_USERNAME;
const USER2_PASSWORD = process.env.EXPO_PUBLIC_USER2_PASSWORD;

const pb = new PocketBase(URL);
pb.admins.authWithPassword(ADMIN_USERNAME, ADMIN_PASSWORD);

const App = () => {
  return (
    <SafeAreaProvider>
      <PocketBaseContext.Provider value={pb}>
        <Temp />
      </PocketBaseContext.Provider>
    </SafeAreaProvider>
  );
}

export default App;
