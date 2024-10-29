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

  // Get stored theme on load
  useEffect(() => {
    AsyncStorage.getItem(KEY_USER_STORED_THEME)
      .then((storedTheme: themeType) => {
        if (!storedTheme) { storedTheme = 'light'; }
        setUserSelectedTheme(storedTheme);
        setParsedTheme(themeParser(userSelectedTheme) == 'light' ? MyDefaultTheme : MyDarkTheme);
      }
    );
  }, []);

  // Handle theme AsyncStorage and parsing on change
  useEffect(() => {
    // Get stored theme from AsyncStorage and parse it
    storeSelectedTheme(userSelectedTheme);
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

async function storeSelectedTheme(theme: themeType) {
  try {
    await AsyncStorage.setItem(KEY_USER_STORED_THEME, theme);
  } catch (error) {
    console.error("Error storing user's prefered theme", error);
  }
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
