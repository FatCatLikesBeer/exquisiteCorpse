// ConfirmationButton.tsx

import React, { useState, useEffect, useContext } from "react";
import * as Haptics from 'expo-haptics';
import { View, Text, Keyboard, StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

import { LightModeContext } from "./context/LightModeContext";

const ConfirmationButton = ({ pb, toggleModal, userFold, disableSubmit }) => {
  const unauthenticatedLabel: string = "Login or Signup";
  const authenticatedLabel: string = "Review";
  const paperTheme = useTheme();
  const { parsedTheme } = useContext(LightModeContext);
  const [buttonLabel, setButtonLabel] = useState<string>(unauthenticatedLabel);

  function authChecker() {
    setButtonLabel(pb.authStore.isValid ? authenticatedLabel : unauthenticatedLabel);
  }

  useEffect(authChecker, []);

  const submitFunction = () => {
    authChecker();
    toggleModal();
    Keyboard.dismiss();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    console.log("WriteContainer, ConfirmationButton, submitFunction: auth state:", pb.authStore.model);
  };

  const wordCountColor = userFold.length < 350 ? parsedTheme.colors.text : userFold.length > 390 ? 'red' : 'orange';

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
          <Text style={{ color: wordCountColor }}>{userFold.length}/400</Text>
        </View>
        <Button
          accessibilityLabel="Review Button"
          key={paperTheme.dark ? "force" : "re-render"} // See (1) below
          theme={paperTheme}
          mode="contained-tonal"
          style={{ flex: 2 }}
          onPress={submitFunction}
          disabled={buttonLabel == authenticatedLabel && disableSubmit}
        >
          {buttonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wordCount: {
  }
})

export default ConfirmationButton;

// (1) This props is here to force render of the component when paperTheme changes
