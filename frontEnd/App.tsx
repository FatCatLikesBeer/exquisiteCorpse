import React from 'react';
import { Text, View, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import PocketBase from 'pocketbase';
import { PaperProvider } from 'react-native-paper';

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
    <PaperProvider>
      <Temp />
    </PaperProvider>
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

// Colors:
// #3A2E39    Darkgrey
// #1E555C    bluish
// linen    eggshell
// #EDB183    straw
// #F15152    persimin

// D7D6D4 cool light grey
// C2B59A dark tan
// 2E3F37 dark forest green
// 7E0D04 crimson
// 809D9F cold slate
