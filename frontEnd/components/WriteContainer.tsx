// WriteContainer.tsx
// TODO: review before submission (maybe radio button, check mark?)
// TODO: submit button will have a confirmation popup before actual submission
// TODO: Submit button will have a loading animation
// TODO: Submit button should actually work

import React, { useState, useContext, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Button, useTheme } from "react-native-paper";
import * as Haptics from 'expo-haptics';

import { LightModeContext } from "./context/LightModeContext";
import { fetchPrompt } from "../functions/fetchPromp";
import PocketBaseContext from "./context/PocketBaseContext";

const WriteContainer = () => {
  const [promptValue, setPromptValue] = useState<string>("AwaitingResponse");
  const [userFold, setUserFold] = useState<string>("");
  const { parsedTheme } = useContext(LightModeContext);
  const paperTheme = useTheme();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [submittingFold, setSubmittingFold] = useState<boolean>(false);
  const [inputFocused, setInputFocused] = useState<boolean>(true);
  const pb = useContext(PocketBaseContext);

  const inputRef = useRef(null);

  useEffect(() => {
    fetchPrompt(pb)
      .then((response) => {
        setPromptValue(response.content);
      })
      .catch((error) => {
        console.error("WriteContainer.tsx useEffect: @root", error);
      });

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);


  const PromptComponent = () => {
    return (
      <Text style={[styles.prompt, { color: parsedTheme.colors.text }, { backgroundColor: 'lightgrey' }]}>
        {promptValue == undefined ? "First Fold" : promptValue}
      </Text>
    );
  }

  const ConfirmationButton = () => {
    const unauthenticatedLabel: string = "Login or Signup";
    const authenticatedLabel: string = "Hold to Submit";
    const [buttonLabel, setButtonLabel] = useState<string>(unauthenticatedLabel);

    useEffect(() => {
      setButtonLabel(pb.authStore.isValid ? authenticatedLabel : unauthenticatedLabel);
    }, [inputFocused]);

    const submitFunction = () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      console.log("WriteContainer, ConfirmationButton, submitFunction: auth state:", pb.authStore.model);
    };

    return (
      <View style={{ flex: 1, paddingTop: 10 }}>
        {/* <View></View> TODO: Create a loading indicator here? */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
            <Text style={{ color: userFold.length < 350 ? parsedTheme.colors.text : 'red' }}>{userFold.length}/400</Text>
          </View>
          <Button
            theme={paperTheme}
            mode="contained-tonal"
            style={{ flex: 2 }}
            onPress={submitFunction}
          >
            {buttonLabel}
          </Button>
        </View>
      </View>
    );
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPrompt(pb)
      .then((response) => {
        setPromptValue(response.content);
      })
      .finally(() => {
        setUserFold("");
        setRefreshing(false);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      });
  }, []);

  const cycleInputFocused = () => {
    setInputFocused(!inputFocused);
  }

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} colors={[paperTheme.colors.primary]} tintColor={paperTheme.colors.primary} />
        <View style={styles.container}>
          {promptValue == 'AwaitingResponse'
            ?
            <ActivityIndicator size="large" color={paperTheme.colors.primary} />
            :
            <View>
              <PromptComponent />
              <TextInput
                style={[styles.textInput, { color: parsedTheme.colors.text }]}
                value={userFold}
                onChangeText={setUserFold}
                textAlignVertical="top"
                returnKeyType="done"
                blurOnSubmit={true}
                multiline
                maxLength={400}
                scrollEnabled={false}
                onFocus={cycleInputFocused}
                ref={inputRef}
              />
              <ConfirmationButton />
            </View>
          }
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll_view: {
    height: "100%",
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  prompt: {
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'salmon',
    padding: 8,
  },
  promptSubheading: {
    color: 'grey',
    fontSize: 8,
  },
  textInput: {
    minWidth: Dimensions.get('window').width * .9,
    height: 240,
    borderColor: 'rgb(120, 69, 172)',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 4,
  }
});

// Header: 64px
// Footer: 49px
// Window: 626px

export default WriteContainer;
