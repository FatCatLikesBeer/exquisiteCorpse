// ConfirmationButton.tsx

import React, { useState, useEffect, useContext } from "react";
import * as Haptics from 'expo-haptics';
import { View, Text, Keyboard, StyleSheet, ActivityIndicator } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import type PocketBase from "pocketbase";

import { LightModeContext } from "./context/LightModeContext";
import { collectionParser } from "../functions/fetchPromp";

const ConfirmationButton = ({ pb, toggleModal, userFold, disableSubmit, promptData }: ConfirmationButtonOptions) => {
  const unauthenticatedLabel: string = "Login or Signup";
  const authenticatedLabel: string = "Review";
  const paperTheme = useTheme();
  const { parsedTheme } = useContext(LightModeContext);
  const [buttonLabel, setButtonLabel] = useState<string>(unauthenticatedLabel);
  const [submittingFold, setSubmittingFold] = useState<boolean>(false);

  function authChecker() {
    setButtonLabel(pb.authStore.isValid ? authenticatedLabel : unauthenticatedLabel);
  }

  const submitFold = async () => {
    const payload = {
      content: userFold,
      parent: promptData.id,
      owner: pb.authStore.model?.id,
      collectionName: collectionParser(promptData.collectionName)
    };
    if (!promptData.collectionName) { delete payload.parent }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    console.log(payload);
    setSubmittingFold(!submittingFold);
  }

  useEffect(authChecker, []);

  const onSubmitFunction = () => {
    authChecker();
    toggleModal();
    Keyboard.dismiss();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    console.log("ConfirmationButton: On Press");
  }

  const onLongSubmitFunction = () => {
    submitFold();
  }

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
          onPress={onSubmitFunction}
          onLongPress={onLongSubmitFunction}
          disabled={buttonLabel == authenticatedLabel && disableSubmit}
        >
          {submittingFold ? <ActivityIndicator /> : buttonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
});

type ConfirmationButtonOptions = {
  pb: PocketBase;
  toggleModal: () => void;
  disableSubmit: boolean;
  userFold: string;
  promptData: any;
}

export default ConfirmationButton;

// (1) This props is here to force render of the component when paperTheme changes
