import React, { useContext, createContext, useState, useEffect } from "react";
import { Text, View, SafeAreaView, StyleSheet, ScrollView, StatusBar, Appearance } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Binder from './Binder';
import Settings from './Settings';

import { LightModeContext } from "./context/LightModeContext";

const AUTO_THEME_SETTING_KEY = 'auto_theme_setting';
const AUTO_THEME_LIGHT_MODE_KEY = 'auto_theme_light_mode';
const MANUAL_THEME_LIGHT_MODE_KEY = 'manual_theme_light_mode';

const WriteScreen = () => {
  return (
    <View style={styles.homeScreen}>
      <Text>Write</Text>
    </View>
  );
}

const Temp = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [useAutoThemeSetting, setUseAutoThemeSetting] = useState(false);
  const [useAutoLightMode, setUseAutoLightMode] = useState(true);
  const [useManualLightMode, setUseManualLightMode] = useState(true);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    if (theme == 'light') {
      setTheme('dark');
    } else if (theme == 'dark') {
      setTheme('light');
    }
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

  const loadThemeSettingsFromAsyncStorage = async () => {
    try {
      const storedAutoThemeSetting = JSON.parse(await AsyncStorage.getItem(AUTO_THEME_SETTING_KEY));
      const storedAutoThemeLightMode = JSON.parse(await AsyncStorage.getItem(AUTO_THEME_LIGHT_MODE_KEY));
      const storedManualThemeLightMode = JSON.parse(await AsyncStorage.getItem(MANUAL_THEME_LIGHT_MODE_KEY));

      if (storedAutoThemeSetting) {
        setUseAutoThemeSetting(storedAutoThemeSetting);
      }

      if (storedAutoThemeLightMode) {
        setUseAutoLightMode(storedAutoThemeLightMode);
      }

      if (storedManualThemeLightMode) {
        setUseManualLightMode(storedManualThemeLightMode);
      }

      console.log('auto theme setting', storedAutoThemeSetting);
      console.log('auto theme light mode', storedAutoThemeLightMode);
      console.log('manual theme light mode', storedManualThemeLightMode);
    } catch (error) {
      console.error('Failed to load theme values from AsyncStorage', error);
    }
  }

  const saveAutoThemeSetting = async (autoThemeSettingValue: boolean) => {
    try {
      await AsyncStorage.setItem(AUTO_THEME_SETTING_KEY, JSON.stringify(autoThemeSettingValue))
    } catch (error) {
      console.error('Failed to save auto theme setting:', error);
    }
  }

  const saveAutoThemeLightMode = async (autoThemeLightMode: boolean) => {
    try {
      await AsyncStorage.setItem(AUTO_THEME_LIGHT_MODE_KEY, JSON.stringify(autoThemeLightMode))
    } catch (error) {
      console.error('Failed to save auto theme setting:', error);
    }
  }

  const saveManualThemeLightMode = async (manualThemeLightMode: boolean) => {
    try {
      await AsyncStorage.setItem(MANUAL_THEME_LIGHT_MODE_KEY, JSON.stringify(manualThemeLightMode))
    } catch (error) {
      console.error('Failed to save auto theme setting:', error);
    }
  }

  const saveSettingsBundle = { saveAutoThemeSetting, saveAutoThemeLightMode, saveManualThemeLightMode };

  useEffect(() => {
    loadThemeSettingsFromAsyncStorage();
  }, []);

  return (
    <LightModeContext.Provider value={{ theme, toggleTheme }}>
      <NavigationContainer theme={theme == 'light' ? MyDefaultTheme : MyDarkTheme}>
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
