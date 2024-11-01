import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Button, Switch } from 'react-native';

import { LightModeContext } from "./context/LightModeContext";
import ThemeSelector from "./ThemeSelector";

const Settings = () => {
  const { parsedTheme } = useContext(LightModeContext);

  return (
    <View style={styles.homeScreen}>
      <Text style={[{ fontFamily: "Times New Roman" }, { 'color': parsedTheme.colors.text, fontSize: 20 }]}>Theme Settings</Text>
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
