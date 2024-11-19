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
        <Button
          key={paperTheme.dark ? "force-sign" : "re-render-sign"} // See (1) below
          mode="contained-tonal"
          onPress={() => alert("SignUpLogInViaSettings: Signup Pressed!")}
        > Sign Up </Button>
      </View>
      <View style={styles.button}>
        <Button
          key={paperTheme.dark ? "force-log" : "re-render-log"} // See (1) below
          mode="contained-tonal"
          onPress={() => alert("SignUpLogInViaSettings: Login Pressed!")}
        > Login </Button>
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

// (1) This props is here to force render of the component when paperTheme changes
