import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Binder from './Binder';
import Menu from './Menu';

const Main = () => {
  return (
    <SafeAreaView style={styles.flexContainer}>
      <StatusBar style="auto" />
      <Menu />
      <Binder />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Main;
