import React, { useContext, useState, useEffect } from "react";
import { Text, View, SafeAreaView, StyleSheet, StatusBar, Appearance } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Binder from './Binder';
import Settings from './Settings';
import themeParser from "../functions/themeParser";
import type { themeType } from '../functions/themeParser';

import { LightModeContext } from "./context/LightModeContext";
import { FontFamilyContext, FontOptions } from "./context/FontFamilyContext";

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

const PaperLight = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: 'rgb(162, 61, 52)',
    primaryContainer: 'rgb(255, 218, 213)',
  },
};
const PaperDark = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: 'rgb(255, 180, 170)',
    primaryContainer: 'rgb(130, 38, 31)',
  }
};

const Temp = () => {
  const [loaded, error] = useFonts({
    "BodoniMada": require('../assets/fonts/BodoniModa-VariableFont_opsz,wght.ttf'),
    "NunitoSans": require('../assets/fonts/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf'),
    "Quicksand": require('../assets/fonts/Quicksand-VariableFont_wght.ttf'),
    "RobotoSerif": require('../assets/fonts/RobotoSerif-VariableFont_GRAD,opsz,wdth,wght.ttf'),
  });
  const [userSelectedTheme, setUserSelectedTheme] = useState<themeType>('light');
  const [parsedTheme, setParsedTheme] = useState(MyDefaultTheme);
  const [paperTheme, setPaperTheme] = useState(PaperLight);

  // Get stored theme on load
  useEffect(() => {
    AsyncStorage.getItem(KEY_USER_STORED_THEME)
      .then((storedTheme: themeType) => {
        if (!storedTheme) { storedTheme = 'light'; }
        setUserSelectedTheme(storedTheme);
        setParsedTheme(themeParser(userSelectedTheme) == 'light' ? MyDefaultTheme : MyDarkTheme);
      });
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

  useEffect(() => {
    setPaperTheme(parsedTheme.colors.text == 'black' ? PaperLight : PaperDark);
  }, [parsedTheme])

  return (
    <PaperProvider theme={paperTheme}>
      <LightModeContext.Provider value={{ setUserSelectedTheme, userSelectedTheme, parsedTheme }}>
        <FontFamilyContext.Provider value={""}>
          <NavigationContainer theme={parsedTheme}>
            <StatusBar />
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  const icons = {
                    Read: "book-open-page-variant",
                    Write: "file-edit",
                    Profile: "account",
                  };

                  return (
                    <MaterialCommunityIcons name={icons[route.name]} color={color} size={size} />
                  )
                }
              })}
            >
              <Tab.Screen name="Read" component={Binder} />
              <Tab.Screen name="Write" component={WriteScreen} />
              <Tab.Screen name="Profile" component={Settings} />
            </Tab.Navigator>
          </NavigationContainer>
        </FontFamilyContext.Provider>
      </LightModeContext.Provider >
    </PaperProvider>
  );
}

async function storeSelectedTheme(theme: themeType): Promise<void> {
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
