import React, { useContext } from "react";
import { View, Text, StyleSheet } from 'react-native';

import { LightModeContext } from "./context/LightModeContext";

const ThemeSelector = () => {
  const { theme, setTheme } = useContext(LightModeContext);

  // I've never seen this syntax before. Thanks chatGPT
  const themeSelection = (stuff) => () => {
    setTheme(stuff);
  };

  return (
    <View style={styles.constainer}>
      <Text onPress={themeSelection('light')} style={theme == 'light' && styles.option}>Light</Text>
      <Text onPress={themeSelection('dark')} style={theme == 'dark' && styles.option}>Dark</Text>
      <Text onPress={themeSelection('auto')} style={theme == 'auto' && styles.option}>Auto</Text>
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
    backgroundColor: 'black',
    color: 'pink',
  },
  selection: {
  }
});

export default ThemeSelector;
