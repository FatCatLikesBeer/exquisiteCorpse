import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

import { LightModeContext } from "./context/LightModeContext";

import type { themeType } from '../functions/themeParser';

const ThemeSelector = () => {
  const { userSelectedTheme, setUserSelectedTheme } = useContext(LightModeContext);

  // I've never seen this syntax before. Thanks chatGPT
  const themeSelection = (userSelection: themeType) => () => {
    setUserSelectedTheme(userSelection);
  };

  return (
    <View style={styles.selectorContainer}>
      <View style={[styles.optionContainer, userSelectedTheme == 'light' && styles.selectionContainer]}>
        <Text onPress={themeSelection('light')} style={[styles.options, userSelectedTheme == 'light' && styles.selection]}>Light</Text>
      </View>
      <View style={[styles.optionContainer, userSelectedTheme == 'dark' && styles.selectionContainer]}>
        <Text onPress={themeSelection('dark')} style={[styles.options, userSelectedTheme == 'dark' && styles.selection]}>Dark</Text>
      </View>
      <View style={[styles.optionContainer, userSelectedTheme == 'auto' && styles.selectionContainer]}>
        <Text onPress={themeSelection('auto')} style={[styles.options, userSelectedTheme == 'auto' && styles.selection]}>Auto</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectorContainer: {
    marginTop: 8,
    paddingTop: 10,
    maxHeight: 40,
    width: '80%',
    maxWidth: 300,
    backgroundColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    color: 'black',
    borderRadius: 12,
    flex: 1,
  },
  selectionContainer: {
    backgroundColor: 'darkgrey',
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: 1,
  },
  optionContainer: {
    paddingBottom: 2,
    maxHeight: 38,
    width: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  selection: {
    color: 'black',
  },
  options: {
    color: 'darkgrey',
    fontWeight: 600,
  }
});

export default ThemeSelector;
