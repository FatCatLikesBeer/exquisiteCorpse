import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';

import Binder from './Binder';
import Menu from './Menu';

const Main = () => {
  return (
    <View style={styles.mainContainer}>
      <Menu />
      <Binder />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
  }
});

export default Main;
