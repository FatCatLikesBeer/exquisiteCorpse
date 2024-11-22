// AuthModals.tsx

import React, { useContext } from "react";
import { Modal, View, Text, StyleSheet, TextInput } from 'react-native'
import { Button, IconButton, ActivityIndicator } from 'react-native-paper';

import { LightModeContext } from "./context/LightModeContext";
const closeButtonIcon = require('../assets/close.png');

const ModalTemplate = (props) => {
  const { parsedTheme } = useContext(LightModeContext);
  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType='slide'
    >
      <View style={styles.centeredView}>
        <View style={[{ backgroundColor: parsedTheme.colors.background }, styles.modalView]}>
          <IconButton
            icon={closeButtonIcon}
            onPress={props.toggle}
            style={styles.closeButton}
            mode="contained-tonal"
          />
          {props.children}
        </View>
      </View>
    </Modal>
  )
}

const SignUpModal = ({ signUpVisible, toggle }) => {
  const { parsedTheme } = useContext(LightModeContext);
  return (
    <ModalTemplate visible={signUpVisible} toggle={toggle}>
      <Text style={[{ color: parsedTheme.colors.text }, styles.header]}>SignUp Modal</Text>
    </ModalTemplate>
  );
}

const LogInModal = ({ loginVisible, toggle }) => {
  const { parsedTheme } = useContext(LightModeContext);
  return (
    <ModalTemplate visible={loginVisible} toggle={toggle}>
      <Text style={[{ color: parsedTheme.colors.text }, styles.header]}>Login Modal</Text>
    </ModalTemplate>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontWeight: 'bold',
  },
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

export { SignUpModal, LogInModal };
