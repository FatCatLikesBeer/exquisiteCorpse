// ConfirmationButton.tsx

import React, { useState, useEffect, useContext } from "react";
import * as Haptics from 'expo-haptics';
import { View, Text, Keyboard } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

import { LightModeContext } from "./context/LightModeContext";

const ConfirmationButton = ({ pb, toggleModal, paperTheme, userFold, disableSubmit }) => {
  const { parsedTheme } = useContext(LightModeContext);
  const unauthenticatedLabel: string = "Login or Signup";
  const authenticatedLabel: string = "Review Fold";
  const [buttonLabel, setButtonLabel] = useState<string>(unauthenticatedLabel);

  function authChecker() {
    setButtonLabel(pb.authStore.isValid ? authenticatedLabel : unauthenticatedLabel);
    console.log("rerendering?");
  }

  useEffect(authChecker, []);

  const submitFunction = () => {
    authChecker();
    toggleModal();
    Keyboard.dismiss();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    console.log("WriteContainer, ConfirmationButton, submitFunction: auth state:", pb.authStore.model);
  };

  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
          <Text style={{ color: userFold.length < 350 ? parsedTheme.colors.text : userFold.length > 390 ? 'red' : 'orange' }}>{userFold.length}/400</Text>
        </View>
        <Button
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

export default ConfirmationButton;
