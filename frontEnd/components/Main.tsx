import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Binder from './Binder';
import Menu from './Menu';

const Main = () => {
  return (
    <SafeAreaView style={[styles.flexContainer]}>
      <StatusBar style="auto" />
      <Menu />
      <Binder />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
  },
  menu: {
    position: 'absolute',
    bottom: 0,
  }
});

export default Main;
