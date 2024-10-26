import React, { useContext, createContext, useState, useEffect } from "react";
import { Text, View, SafeAreaView, StyleSheet, ScrollView, StatusBar, Appearance } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Binder from './Binder';
import Settings from './Settings';
import themeParser from "../functions/themeParser";
import type { themeType } from '../functions/themeParser';

import { LightModeContext } from "./context/LightModeContext";

const WriteScreen = () => {
  return (
    <View style={styles.homeScreen}>
      <Text>Write</Text>
    </View>
  );
}

const Temp = () => {
  const [theme, setTheme] = useState<themeType>('light');
  const [parsedTheme, setParsedTheme] = useState('dark');
  const [activityMonitor, setActivityMonitor] = useState(0); // This is used to detect that settings have changed

  useEffect(() => {
    console.log(activityMonitor);
    setParsedTheme(themeParser(theme));
    if (theme == 'auto') {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setParsedTheme(colorScheme);
      });
      return () => subscription.remove();
    }
  }, [activityMonitor])

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

  return (
    <LightModeContext.Provider value={{ setTheme, theme, parsedTheme, setActivityMonitor }}>
      <NavigationContainer theme={parsedTheme == 'light' ? MyDefaultTheme : MyDarkTheme}>
        <StatusBar />
        <Tab.Navigator>
          <Tab.Screen name="Read" component={Binder} options={{
            headerShadowVisible: false,
          }} />
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
