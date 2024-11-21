import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PocketBase, { AsyncAuthStore } from "pocketbase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Temp from "./components/Temp"; // Temp should be 'Main' so don't delete it!

import PocketBaseContext from "./components/context/PocketBaseContext";

const URL = process.env.EXPO_PUBLIC_EC_API_URL;
const ADMIN_USERNAME = process.env.EXPO_PUBLIC_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.EXPO_PUBLIC_ADMIN_PASSWORD;
const USER1_USERNAME = process.env.EXPO_PUBLIC_USER1_USERNAME;
const USER1_PASSWORD = process.env.EXPO_PUBLIC_USER1_PASSWORD;
const USER2_USERNAME = process.env.EXPO_PUBLIC_USER2_USERNAME;
const USER2_PASSWORD = process.env.EXPO_PUBLIC_USER2_PASSWORD;

const store = new AsyncAuthStore({
  save: async (serialized) => AsyncStorage.setItem("pb_auth", serialized),
  initial: AsyncStorage.getItem("pb_auth"),
});
const pb = new PocketBase(URL, store);

const App = () => {
  return (
    <SafeAreaProvider>
      <PocketBaseContext.Provider value={pb}>
        <Temp />
      </PocketBaseContext.Provider>
    </SafeAreaProvider>
  );
};

export default App;

// TODO: Remove the navigation tabs. Profile & WriteComponents will be Navigation stacks/modals
// TODO: add an inline login / signup component every 3, 5, or 7 sheets
// TODO: Modal dissapears on successful submission
// TODO: Toast appears on successful/unsuccessful submission
//
// TODO: Signup/Login & Logiout via Settings Component
// TODO: Submit button will have a loading animation
// TODO: Submit button should actually work, send folds to back-end
// TODO: Create Signup/Login modal component
// TODO: Figure out why WriteComponent's <TextInput> element keeps occasionally resizing when inputing text iOS.
// TODO: Tutorial
// TODO: Upload images for pfp
// TODO: Google/Apple Authentication
