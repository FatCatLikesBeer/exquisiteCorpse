import React from 'react';
import { Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import PocketBase from 'pocketbase';

import Temp from './components/Temp';

const URL = process.env.EXPO_PUBLIC_EC_API_URL;
const ADMIN_USERANME = process.env.EXPO_PUBLIC_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.EXPO_PUBLIC_ADMIN_PASSWORD;
const USER1_USERNAME = process.env.EXPO_PUBLIC_USER1_USERNAME;
const USER1_PASSWORD = process.env.EXPO_PUBLIC_USER1_PASSWORD;
const USER2_USERNAME = process.env.EXPO_PUBLIC_USER2_USERNAME;
const USER2_PASSWORD = process.env.EXPO_PUBLIC_USER2_PASSWORD;

const pb = new PocketBase(URL);

const App = () => {
  return (
    <Temp pb={pb} />
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  }
});

export default App;
