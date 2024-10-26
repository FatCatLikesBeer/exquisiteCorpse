import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Button, Switch } from 'react-native';

import { LightModeContext } from "./context/LightModeContext";
import ThemeSelector from "./ThemeSelector";

const Settings = () => {
  const { parsedTheme } = useContext(LightModeContext);

  const textColor = parsedTheme == 'light' ? "black" : "white";

  return (
    <View style={styles.homeScreen}>
      <Text style={{ 'color': textColor, fontSize: 20 }}>Theme Settings</Text>
      <ThemeSelector />
    </View>
  );
}

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'grey',
  }
});

export default Settings;
