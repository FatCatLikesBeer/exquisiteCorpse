import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { SegmentedButtons } from "react-native-paper";

import { LightModeContext } from "./context/LightModeContext";

import type { themeType } from '../functions/themeParser';

const ThemeSelector = () => {
  const { userSelectedTheme, setUserSelectedTheme } = useContext(LightModeContext);

  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={userSelectedTheme}
        onValueChange={setUserSelectedTheme}
        buttons={[
          {
            value: 'light',
            label: 'Light',
          },
          {
            value: 'dark',
            label: 'Dark',
          },
          {
            value: 'auto',
            label: 'Auto',
          }
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
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
});

export default ThemeSelector;
