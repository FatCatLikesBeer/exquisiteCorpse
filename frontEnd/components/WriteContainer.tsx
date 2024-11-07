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
  const [promptValue, setPromptValue] = useState<string>("NoValue");
  const [userFold, setUserFold] = useState<string>("");
  const { parsedTheme } = useContext(LightModeContext);
  const paperTheme = useTheme();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [submittingFold, setSubmittingFold] = useState<boolean>(false);
  const pb = useContext(PocketBaseContext);

  const inputRef = useRef(null);

  useEffect(() => {
    fetchPrompt(pb)
      .then((response) => {
        console.log(response);
        setPromptValue(response.content);
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
    const buttonLabel: string = "Hold to Submit";

    const submitFunction = () => {
      console.log("authStore:", pb.authStore.model);
      console.log("user fold:", userFold);
      Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 10 }}>
        <View></View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center' }}>
            <Text style={{ color: userFold.length < 350 ? parsedTheme.colors.text : 'red' }}>{userFold.length}/400</Text>
          </View>
          <Button
            theme={paperTheme}
            mode="contained-tonal"
            style={{ flex: 2 }}
            onLongPress={submitFunction}
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
        console.log(response);
        setPromptValue(response.content);
      })
      .finally(() => {
        setUserFold("");
        setRefreshing(false);
      });
  }, []);

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} colors={[paperTheme.colors.primary]} tintColor={paperTheme.colors.primary} />
        <View style={styles.container}>
          {promptValue == 'NoValue' ? <ActivityIndicator size="large" color={paperTheme.colors.primary} />
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
