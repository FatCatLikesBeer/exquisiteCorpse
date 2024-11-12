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
  Keyboard,
} from 'react-native';
import { Button, useTheme } from "react-native-paper";
import * as Haptics from 'expo-haptics';

import { LightModeContext } from "./context/LightModeContext";
import { fetchPrompt } from "../functions/fetchPromp";
import PocketBaseContext from "./context/PocketBaseContext";
import ReviewModal from "./ReviewModal";

const WriteContainer = () => {
  const [promptData, setPromptData] = useState({ content: "AwaitingResponse" });
  const [userFold, setUserFold] = useState<string>("");
  const { parsedTheme } = useContext(LightModeContext);
  const paperTheme = useTheme();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [submittingFold, setSubmittingFold] = useState<boolean>(false);
  const [inputFocused, setInputFocused] = useState<boolean>(true);
  const pb = useContext(PocketBaseContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const inputRef = useRef(null);

  useEffect(() => {
    fetchPrompt(pb)
      .then((response) => {
        setPromptData(response);
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
        {promptData.content == undefined ? "First Fold" : promptData.content}
      </Text>
    );
  }

  const ConfirmationButton = () => {
    const unauthenticatedLabel: string = "Login or Signup";
    const authenticatedLabel: string = "Review Fold";
    const [buttonLabel, setButtonLabel] = useState<string>(unauthenticatedLabel);

    useEffect(() => {
      setButtonLabel(pb.authStore.isValid ? authenticatedLabel : unauthenticatedLabel);
    }, [inputFocused]);

    const submitFunction = () => {
      setModalVisible(!modalVisible);
      Keyboard.dismiss();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      console.log("WriteContainer, ConfirmationButton, submitFunction: auth state:", pb.authStore.model);
    };

    return (
      <View style={{ flex: 1, paddingTop: 10 }}>
        {/* <View></View> TODO: Create a loading indicator here? */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
            <Text style={{ color: userFold.length < 350 ? parsedTheme.colors.text : userFold.length > 390 ? 'red' : 'orange' }}>{userFold.length}/400</Text>
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
        setPromptData(response);
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
    <KeyboardAvoidingView behavior="height">
      <ScrollView>
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} colors={[paperTheme.colors.primary]} tintColor={paperTheme.colors.primary} />
        <View style={styles.container}>
          {promptData.content == 'AwaitingResponse'
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
      <ReviewModal userFold={userFold} promptData={promptData} modalVisible={modalVisible} setModalVisible={setModalVisible} />
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
    fontSize: 16,
  },
  promptSubheading: {
    color: 'grey',
    fontSize: 8,
  },
  textInput: {
    minWidth: Dimensions.get('window').width * .9,
    minHeight: 240,
    borderColor: 'rgb(120, 69, 172)',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 4,
    fontSize: 16,
  }
});

export default WriteContainer;
