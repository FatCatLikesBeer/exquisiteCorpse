import React, { useContext, createContext, useState, useEffect } from "react";
import { Text, View, SafeAreaView, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Binder from './Binder';

const WriteScreen = () => {
  return (
    <View style={styles.homeScreen}>
      <Text>Write</Text>
    </View>
  );
}

const SettingsScreen = () => {
  return (
    <View style={styles.homeScreen}>
      <Text>Settings</Text>
    </View>
  )
}

const ReadScreen = () => {
  return (
    <View style={styles.homeScreen}>
      <Text>ReadScreen</Text>
    </View>
  )
}

const Temp = () => {
  const MyDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3A2E39',
    }
  }

  const MyDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: '#3A2E39',
    }
  }

  return (
    <NavigationContainer theme={MyDarkTheme}>
      <StatusBar />
      <Tab.Navigator>
        <Tab.Screen name="Read" component={Binder} options={{
          headerShadowVisible: false,
        }} />
        <Tab.Screen name="Write" component={WriteScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
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
