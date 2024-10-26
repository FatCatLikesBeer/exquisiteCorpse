import React, { useContext, createContext, useState, useEffect } from "react";
import { Text, View, SafeAreaView, StyleSheet, ScrollView, StatusBar, Appearance } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Binder from './Binder';
import Settings from './Settings';

import { LightModeContext } from "./context/LightModeContext";

const WriteScreen = () => {
  return (
    <View style={styles.homeScreen}>
      <Text>Write</Text>
    </View>
  );
}

const Temp = () => {
  const [theme, setTheme] = useState('auto');

  useEffect(() => {
    if (theme == 'auto') {
      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setTheme(colorScheme);
      });

      return () => subscription.remove();
    }
  }, [theme])

  // const toggleTheme = () => {
  //   if (theme == 'light') {
  //     setTheme('dark');
  //   } else if (theme == 'dark') {
  //     setTheme('light');
  //   }
  // }

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
    <LightModeContext.Provider value={{ theme, setTheme }}>
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
