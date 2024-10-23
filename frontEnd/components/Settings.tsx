import React, { useEffect, useState, useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Button } from 'react-native';

import { LightModeContext } from "./context/LightModeContext";

const Settings = () => {
  const { theme, toggleTheme } = useContext(LightModeContext);

  const textColor = theme == 'light' ? "black" : "white";

  return (
    <View style={styles.homeScreen}>
      <Text style={{ 'color': textColor }}>Settings go here</Text>
      <Button
        title={theme == 'light' ? "Switch to Dark Theme" : "Switch to Light Theme"}
        onPress={toggleTheme}
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
