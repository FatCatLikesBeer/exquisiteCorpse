import React, { useContext } from "react";
import { Text, View, StyleSheet, ScrollView, Button, Switch } from 'react-native';

import { LightModeContext } from "./context/LightModeContext";
import ThemeSelector from "./ThemeSelector";
import SignUpLogInViaSettings from "./SignUpLoginViaSettings";

import PocketBaseContext from './context/PocketBaseContext';

const SettingsGroup = ({ children }: { children: any }) => {
  return (
    <View style={styles.settingsGroup}>
      {children}
    </View>
  );
}

const Settings = ({ navigation }: { navigation: any }) => {
  const { parsedTheme } = useContext(LightModeContext);
  const pb = useContext(PocketBaseContext);

  return (
    <ScrollView>
      <View style={styles.settingsScreen}>
        <SettingsGroup>
          <Text style={[{ 'color': parsedTheme.colors.text, fontSize: 20 }, styles.text]}>Authentication</Text>
          <SignUpLogInViaSettings />
        </SettingsGroup>
        <SettingsGroup>
          <Text style={[{ 'color': parsedTheme.colors.text, fontSize: 20 }, styles.text]}>Theme Settings</Text>
          <ThemeSelector />
        </SettingsGroup>
      </View>
    </ScrollView>
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
  settingsGroup: {
    marginBottom: 18,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  text: {
    margin: 12,
  }
});

export default Settings;
