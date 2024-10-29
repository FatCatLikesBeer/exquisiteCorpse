import React, { useContext, useState, useEffect } from "react";
import { Text, View, SafeAreaView, StyleSheet, ScrollView, StatusBar, Appearance } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Binder from './Binder';
import Settings from './Settings';
import themeParser from "../functions/themeParser";
import type { themeType } from '../functions/themeParser';

import { LightModeContext } from "./context/LightModeContext";

const KEY_USER_STORED_THEME = 'userStoredTheme';

async function getStoredTheme() {
  const storedTheme = await AsyncStorage.getItem(KEY_USER_STORED_THEME);
  return storedTheme;
}

async function setStoredTheme() { }

const WriteScreen = () => {
  const { parsedTheme } = useContext(LightModeContext);
  return (
    <View style={styles.homeScreen}>
      <Text style={{ 'color': parsedTheme.colors.text }}>Write</Text>
    </View>
  );
}

const MyDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3A2E39',
    text: 'black',
  }
}

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#3A2E39',
    text: 'white',
  }
}

const Temp = () => {
  const [userSelectedTheme, setUserSelectedTheme] = useState<themeType>('light');
  const [parsedTheme, setParsedTheme] = useState(MyDefaultTheme);

  useEffect(() => {
    // Following line sets user selection immediately
    setParsedTheme(themeParser(userSelectedTheme) == 'light' ? MyDefaultTheme : MyDarkTheme);
    // Following block creates subscription if theme set to auto
    if (userSelectedTheme == 'auto') {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setParsedTheme(colorScheme == 'light' ? MyDefaultTheme : MyDarkTheme);
      });
      return () => subscription.remove();
    }
  }, [userSelectedTheme]);

  return (
    <LightModeContext.Provider value={{ setUserSelectedTheme, userSelectedTheme, parsedTheme }}>
      <NavigationContainer theme={parsedTheme}>
        <StatusBar />
        <Tab.Navigator>
          <Tab.Screen name="Read" component={Binder} />
          <Tab.Screen name="Write" component={WriteScreen} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </LightModeContext.Provider>
  );
}

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sheet: {
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
  }
});

export default Temp;
