import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const ThemeSelector = () => {
  return (
    <View style={styles.constainer}>
      <Text>Light</Text>
      <Text>Dark</Text>
      <Text>Auto</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  constainer: {
    height: 30,
    maxHeight: 30,
    width: '80%',
    maxWidth: 300,
    backgroundColor: 'salmon',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  option: {
  },
  selection: {
  }
});

export default ThemeSelector;
