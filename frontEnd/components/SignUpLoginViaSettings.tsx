import React, { useState, useContext, useRef } from "react";
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Button, useTheme, Snackbar, Portal } from "react-native-paper";

import { LightModeContext } from "./context/LightModeContext";
import PocketBaseContext from './context/PocketBaseContext';
import { SignUpModal, LogInModal } from "./AuthModals";

const SignUpLogInViaSettings = () => {
  const { parsedTheme } = useContext(LightModeContext);
  const pb = useContext(PocketBaseContext);
  const paperTheme = useTheme();
  const [signUpVisible, setSignUpVisible] = useState<boolean>(false);
  const [loginVisible, setLoginVisible] = useState<boolean>(false);
  const [snackBarVisible, setSnackBarVisible] = useState<boolean>(false);
  const [snackBarLabel, setSnackBarLabel] = useState<string>("There is an error in your Sign Up form ☹️");
  const [currentAuthStore, setCurrentAuthStore] = useState<boolean>(pb.authStore.isValid);

  function toggleSignUpModal() {
    setSignUpVisible(!signUpVisible);
  }

  function toggleLoginModal() {
    setLoginVisible(!loginVisible);
  }

  function logOut() {
    pb.authStore.clear();
    setCurrentAuthStore(pb.authStore.isValid);
  }

  function preLogoutCheck() {
    Alert.alert(
      "Logout?",
      "You sure 🧐?",
      [
        {
          text: "Cancel",
        },
        {
          text: "Logout",
          onPress: logOut,
          isPreferred: true,
        },
      ],
      {
        cancelable: true,
        userInterfaceStyle: parsedTheme,
      }
    );
  }

  const onDismissSnackBar = () => setSnackBarVisible(false);

  return (
    <View>
      {currentAuthStore ?
        <View style={styles.button}>
          <Button
            key={paperTheme.dark ? "force-out" : "re-render-out"} // See (1) below
            mode="contained-tonal"
            onPress={preLogoutCheck}
          > Logout - {pb.authStore.model?.username} </Button>
        </View>
        :
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.button}>
            <Button
              key={paperTheme.dark ? "force-sign" : "re-render-sign"} // See (1) below
              mode="contained-tonal"
              onPress={toggleSignUpModal}
            > Sign Up </Button>
          </View>
          <View style={styles.button}>
            <Button
              key={paperTheme.dark ? "force-log" : "re-render-log"} // See (1) below
              mode="contained-tonal"
              onPress={toggleLoginModal}
            > Login </Button>
          </View>
        </View>
      }
      <SignUpModal
        signUpVisible={signUpVisible}
        toggle={toggleSignUpModal}
        setSnackBarLabel={setSnackBarLabel}
        setSnackBarVisible={setSnackBarVisible}
        setCurrentAuthStore={setCurrentAuthStore}
        pb={pb}
      />
      <LogInModal
        loginVisible={loginVisible}
        toggle={toggleLoginModal}
        setSnackBarLabel={setSnackBarLabel}
        setSnackBarVisible={setSnackBarVisible}
        setCurrentAuthStore={setCurrentAuthStore}
        pb={pb}
      />
      <Portal>
        <Snackbar
          duration={4000}
          theme={paperTheme}
          style={{ position: 'relative', bottom: 55 }}
          visible={snackBarVisible}
          onDismiss={onDismissSnackBar}
          action={{
            label: "Dismiss",
            onPress: onDismissSnackBar
          }}
        >{snackBarLabel}</Snackbar>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 8,
    marginRight: 8,
  },
});

export default SignUpLogInViaSettings;

// (1) This props is here to force render of the component when paperTheme changes
