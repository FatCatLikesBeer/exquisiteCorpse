import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from 'react-native';
import { Button, useTheme } from "react-native-paper";

import { LightModeContext } from "./context/LightModeContext";
import PocketBaseContext from './context/PocketBaseContext';
import { SignUpModal, LogInModal } from "./AuthModals";

const SignUpLogInViaSettings = () => {
  const { parsedTheme } = useContext(LightModeContext);
  const pb = useContext(PocketBaseContext);
  const paperTheme = useTheme();
  const [signUpVisible, setSignUpVisible] = useState<boolean>(false);
  const [loginVisible, setLoginVisible] = useState<boolean>(false);

  function toggleSignUpModal() {
    setSignUpVisible(!signUpVisible);
  }

  function toggleLoginModal() {
    setLoginVisible(!loginVisible);
  }

  return (
    <View>
      {pb.authStore.isValid ?
        <Text style={{ color: parsedTheme.colors.text }}>Logout</Text>
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
      <SignUpModal signUpVisible={signUpVisible} toggle={toggleSignUpModal} />
      <LogInModal loginVisible={loginVisible} toggle={toggleLoginModal} />
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
