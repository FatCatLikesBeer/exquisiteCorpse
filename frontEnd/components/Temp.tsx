import React, { useState, useEffect } from "react";
import { StyleSheet, StatusBar, Appearance } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { PaperProvider, MD3DarkTheme, MD3LightTheme, Button } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Binder from './Binder';
import Settings from './Settings';
import themeParser from "../functions/themeParser";
import type { themeType } from '../functions/themeParser';

import { LightModeContext } from "./context/LightModeContext";
import { FontFamilyContext, FontOptions } from "./context/FontFamilyContext";

const KEY_USER_STORED_THEME = 'userStoredTheme';

const MyDefaultTheme = {  // React Navigation
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(120, 69, 172)',
    text: 'black',
  }
}

const MyDarkTheme = {  // React Navigation
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'white',
    text: 'white',
  }
}

const PaperLight = {  // React Native Paper
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // primary: 'salmon',
    primary: 'rgb(120, 69, 172)',
    primaryContainer: 'rgb(240, 219, 255)',
  },
};
const PaperDark = {  // React Native Paper
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: 'rgb(220, 184, 255)',
    primaryContainer: 'rgb(95, 43, 146)',
  }
};

const Stack = createNativeStackNavigator();

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
      .then((storedTheme: string | null) => {
        const themeFromAsyncStorage: themeType = (storedTheme as themeType) || 'light';
        setUserSelectedTheme(themeFromAsyncStorage);
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
            <Stack.Navigator>
              <Stack.Screen name="FourFolds" component={Binder} options={({ navigation }) => ({
                headerRight: () => {
                  return (
                    <Button
                      onPress={() => navigation.navigate('Settings')}
                      children={"Account"}
                      theme={paperTheme}
                      accessibilityLabel="Account Prefrences and Settings"
                    />
                  );
                }
              })} />
              <Stack.Screen name="Settings" component={Settings} />
            </Stack.Navigator>
            {/* <Tab.Navigator */}
            {/*   screenOptions={({ route }) => ({ */}
            {/*     tabBarHideOnKeyboard: true, */}
            {/*     tabBarIcon: ({ color, size }) => { */}
            {/*       const icons = { */}
            {/*         Read: "book-open-page-variant", */}
            {/*         Write: "file-edit", */}
            {/*         Profile: "account", */}
            {/*       }; */}
            {/**/}
            {/*       return ( */}
            {/*         <MaterialCommunityIcons name={icons[route.name]} color={color} size={size} /> */}
            {/*       ) */}
            {/*     } */}
            {/*   })} */}
            {/* > */}
            {/*   <Tab.Screen name="Write" component={WriteContainer} /> */}
            {/*   <Tab.Screen name="Read" component={Binder} options={{ */}
            {/*     headerRight: () => { */}
            {/*       return ( */}
            {/*         <Button */}
            {/*           onPress={() => alert("header button pressed!")} */}
            {/*           // icon='account' */}
            {/*           theme={paperTheme} */}
            {/*           children={"Profile"} */}
            {/*           accessibilityLabel="Profile Button" */}
            {/*         /> */}
            {/*       ) */}
            {/*     } */}
            {/*   }} /> */}
            {/*   <Tab.Screen name="Profile Settings" component={Settings} /> */}
            {/* </Tab.Navigator> */}
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
