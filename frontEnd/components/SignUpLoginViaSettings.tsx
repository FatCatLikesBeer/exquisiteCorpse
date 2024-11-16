import React, { useContext } from "react";
import { View, StyleSheet, Text } from 'react-native';
import { Button, useTheme } from "react-native-paper";

import { LightModeContext } from "./context/LightModeContext";
import PocketBaseContext from './context/PocketBaseContext';

const SignUpLogInViaSettings = () => {
  const { parsedTheme } = useContext(LightModeContext);
  const pb = useContext(PocketBaseContext);
  const paperTheme = useTheme();

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.button}>
        <Button theme={paperTheme} mode="contained-tonal">Sign Up</Button>
      </View>
      <View style={styles.button}>
        <Button theme={paperTheme} mode="contained-tonal">Login</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 8,
    marginRight: 8,
  },
});

export default SignUpLogInViaSettings;
