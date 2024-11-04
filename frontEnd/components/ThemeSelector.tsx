import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { SegmentedButtons } from "react-native-paper";

import { LightModeContext } from "./context/LightModeContext";
import { useTheme } from 'react-native-paper';

const ThemeSelector = () => {
  const { userSelectedTheme, setUserSelectedTheme } = useContext(LightModeContext);
  const paperTheme = useTheme();

  return (
    <SafeAreaView style={[styles.container]}>
      <SegmentedButtons
        theme={paperTheme}
        value={userSelectedTheme}
        onValueChange={setUserSelectedTheme}
        buttons={[
          {
            value: 'light',
            label: 'Light',
            accessibilityLabel: 'Light Theme',
          },
          {
            value: 'dark',
            label: 'Dark',
            accessibilityLabel: 'Dark Theme',
          },
          {
            value: 'auto',
            label: 'Auto',
            accessibilityLabel: 'Auto/System Settings Theme',
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
