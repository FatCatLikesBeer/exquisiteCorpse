import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Button, Switch } from 'react-native';

import { LightModeContext } from "./context/LightModeContext";
import ThemeSelector from "./ThemeSelector";

const Settings = () => {
  const { parsedTheme } = useContext(LightModeContext);

  return (
    <View style={styles.settingsScreen}>
      <Text style={[{ 'color': parsedTheme.colors.text, fontSize: 20 }, styles.text]}>Theme Settings</Text>
      <ThemeSelector />
    </View>
  );
}

const styles = StyleSheet.create({
  settingsScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginRight: 18,
    marginLeft: 18,
    marginTop: 14,
  },
  text: {
    margin: 12,
  }
});

export default Settings;
