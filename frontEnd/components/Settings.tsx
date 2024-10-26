import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Button, Switch } from 'react-native';

import { LightModeContext } from "./context/LightModeContext";
import ThemeSelector from "./ThemeSelector";
import themeParser from "../functions/themeParser";

const Settings = () => {
  const { theme, setTheme } = useContext(LightModeContext);

  const textColor = theme == 'light' ? "black" : "white";

  const cycleTheme = () => {
    if (theme == 'light') { setTheme('auto'); };
    // if (theme == 'dark') { setTheme('auto'); };
    if (theme == 'auto') { setTheme('light'); };
  };

  return (
    <View style={styles.homeScreen}>
      <ThemeSelector values={{ theme, setTheme }} />
      <Text style={{ 'color': textColor, fontSize: 20 }}>Theme Settings</Text>
      <Text style={{ 'color': textColor }}>Auto set to Device Default</Text>
      <Switch
        onValueChange={cycleTheme}
        value={theme == 'light'}
      />
      <Text style={{ 'color': textColor }}>Manually Toggle Theme</Text>
      <Button
        title={`Using ${theme} Theme`}
        onPress={cycleTheme}
        disabled={false}
      />
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
