import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Button, Switch } from 'react-native';

import { LightModeContext } from "./context/LightModeContext";
import ThemeSelector from "./ThemeSelector";

const Settings = () => {
  const { theme, toggleTheme } = useContext(LightModeContext);

  const textColor = theme == 'light' ? "black" : "white";

  return (
    <View style={styles.homeScreen}>
      <ThemeSelector />
      <Text style={{ 'color': textColor, fontSize: 20 }}>Theme Settings</Text>
      <Text style={{ 'color': textColor }}>Auto set to Device Default</Text>
      <Switch
        onValueChange={toggleTheme}
        value={theme == 'light'}
      />
      <Text style={{ 'color': textColor }}>Manually Toggle Theme</Text>
      <Button
        title={`Use ${theme == "light" ? 'Dark' : 'Light'} Theme`}
        onPress={toggleTheme}
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
