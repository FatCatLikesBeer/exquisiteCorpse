// ReviewModal.tsx

import React, { useContext, useRef, useState } from 'react';
import {
  Modal,
  Text,
  View,
  Alert,
  StyleSheet,
} from 'react-native';
import { Button, IconButton, ActivityIndicator } from 'react-native-paper';
const closeButtonIcon = require('../assets/close.png');

import * as Haptics from 'expo-haptics';

import { LightModeContext } from './context/LightModeContext';
import PocketBaseContext from './context/PocketBaseContext';
import { collectionParser } from "../functions/fetchPromp";

const ReviewModal = ({ userFold, promptData, modalVisible, setModalVisible }) => {
  const { parsedTheme } = useContext(LightModeContext);
  const pb = useContext(PocketBaseContext);
  const [submittingFold, setSubmittingFold] = useState<boolean>(false);
  const modalRef = useRef(null);

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

  const closeModal = () => {
    setModalVisible(!modalVisible);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    setSubmittingFold(false);
  }

  return (
    <Modal
      ref={modalRef}
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
        Alert.alert('Modal has been closed!');
      }}
    >
      <View style={styles.centeredView}>
        <View style={[{ backgroundColor: parsedTheme.colors.background }, styles.modalView]}>
          <IconButton
            icon={closeButtonIcon}
            onPress={closeModal}
            style={styles.closeButton}
            mode="contained-tonal"
          />
          <Text style={[{ color: 'grey' }, styles.modalText]}>
            {promptData.content} <Text style={{ color: parsedTheme.colors.text }}>{userFold}</Text>
          </Text>
          <Button
            onPress={submitFold}
            mode='contained-tonal'
            style={styles.submitButton}
          >
            {submittingFold ? <ActivityIndicator /> : "Submit"}
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    position: 'absolute',
    bottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 30,
    width: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    height: 600,
    margin: 8,
    borderColor: 'rgb(120, 69, 172)',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 10,
    shadowRadius: 200,
    elevation: 500,
  },
  modalText: {
    marginBottom: 48,
    marginTop: 40,
    textAlign: 'left',
    fontSize: 18,
  },
});

export default ReviewModal;
