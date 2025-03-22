// WriteContainer.tsx
// TODO: Implement bottomsheet modal https://youtu.be/oIEykI5oagI?si=SS2CGPX_Q61oMOnj&t=1590
// TODO: After bottom sheet modal: test backdrop blur
// TODO: tuck close buttons into component that houses the handle indicator
// TODO: Stop moving bottom sheet when InputText element gets selected

import React, { useState, useContext, useEffect, useCallback, useRef } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useTheme, Snackbar, Portal, Button } from "react-native-paper";
import * as Haptics from 'expo-haptics';
import { BottomSheetTextInput, BottomSheetView } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';

import { LightModeContext } from "./context/LightModeContext";
import { fetchPrompt } from "../functions/fetchPromp";
import PocketBaseContext from "./context/PocketBaseContext";
import ReviewModal from "./ReviewModal";
import ConfirmationButton from "./ConfirmationButton";

const WriteContainer = ({ closeSheet, focusKeyboardState }: { closeSheet: any; focusKeyboardState: boolean }) => {
  const [promptData, setPromptData] = useState({ content: "AwaitingResponse" });
  const [userFold, setUserFold] = useState<string>("");
  const { parsedTheme } = useContext(LightModeContext);
  const paperTheme = useTheme();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const pb = useContext(PocketBaseContext);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);
  const [snackBarVisible, setSnackBarVisible] = useState<boolean>(false);
  const [snackBarLabel, setSnackBarLabel] = useState<string>("Unable to fetch new prompt 😫");

  const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisible);
  const onDismissSnackBar = () => setSnackBarVisible(false);

  // Disables submit button if userInput is empty
  useEffect(() => {
    if (userFold.length <= 0) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [userFold]);

  const inputRef = useRef<any>(null);

  useEffect(() => {
    fetchPrompt(pb)
      .then((response) => {
        setPromptData(response);
      })
      .catch((error) => {
        console.error("WriteContainer.tsx useEffect: @root", error);
        onToggleSnackBar();
      });
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [focusKeyboardState]);

  const parsePromptAndUserFold = (text: string) => {
    const inputWithoutPrompt = text.slice(promptData.content?.length + 1);
    setUserFold(inputWithoutPrompt);
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPrompt(pb)
      .then((response) => {
        setPromptData(response);
        setUserFold("");
        setRefreshing(false);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      })
      .catch((error) => {
        console.error("WriteContainer.tsx useEffect: @root", error);
        onToggleSnackBar();
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      });
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  return (
    <BottomSheetView>
      <ScrollView refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={refreshing}
          colors={[paperTheme.colors.primary]}
          tintColor={paperTheme.colors.primary}
        />
      } style={styles.scroll_view}>
        <View style={styles.container}>
          {promptData.content == 'AwaitingResponse'
            ?
            <ActivityIndicator size="large" color={paperTheme.colors.primary} />
            :
            <View>
              <View style={styles.headerButtons}>
                <Button
                  style={styles.closeButton}
                  onPress={() => { onRefresh(); closeSheet(); }}
                  mode="text"
                  accessibilityLabel="Close Button"
                  key={paperTheme.dark ? "closeButton" : "closeButtonRerender"} // See (1) below
                  theme={paperTheme}
                  compact={true}
                >Close</Button>
              </View>
              <BottomSheetTextInput
                spellCheck={false}
                style={[styles.textInput, { color: parsedTheme.colors.text }]}
                value={(promptData.content == undefined ? "" : promptData.content + " ") + userFold}
                onChangeText={parsePromptAndUserFold}
                textAlignVertical="top"
                returnKeyType="done"
                blurOnSubmit={true}
                multiline
                scrollEnabled={true}
                ref={inputRef}
                maxLength={(promptData.content?.length + 401 || 400)}
                selection={{
                  start: (promptData.content?.length + 1 || 0) + userFold.length,
                  end: (promptData.content?.length + 1 || 0) + userFold.length
                }}
              />
              <ConfirmationButton
                pb={pb}
                toggleModal={toggleModal}
                userFold={userFold}
                disableSubmit={disableSubmit}
                promptData={promptData}
              />
              <Portal>
                <Snackbar
                  theme={paperTheme}
                  style={{ position: 'relative', bottom: 55 }}
                  visible={snackBarVisible}
                  onDismiss={onDismissSnackBar}
                  action={{
                    label: "Dismiss"
                  }}
                >{snackBarLabel}</Snackbar>
              </Portal>
            </View>
          }
        </View>
      </ScrollView>
      <ReviewModal userFold={userFold} promptData={promptData} modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </BottomSheetView>
  );
}

const styles = StyleSheet.create({
  headerButtons: {
    height: 20,
  },
  closeButton: {
    position: "absolute",
    left: 0,
    top: -18,
  },
  scroll_view: {
    height: 800,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
  },
  promptSubheading: {
    color: 'grey',
    fontSize: 8,
  },
  textInput: {
    width: Dimensions.get('window').width * .9,
    minHeight: 240,
    borderColor: 'rgb(120, 69, 172)',
    fontSize: 16,
  }
});

export default WriteContainer;
