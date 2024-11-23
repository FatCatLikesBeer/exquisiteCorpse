// AuthModals.tsx
// TODO: text input error checking: email format, email available, password confirmation
// TODO: Make signup modal avoid keyboard
// TODO: pressing return/enter on 'Confirm Password' will submit form
// TODO: create handle Submit function
// TODO: Handle submit function need to handle errors: 400, 403, 408, 500
// TODO: make "Submit" button actually signup user

import React, { useState, useContext, useRef } from "react";
import { Modal, View, Text, StyleSheet } from 'react-native'
import { Button, IconButton, TextInput, useTheme } from 'react-native-paper';
import validate from 'email-validator';

import { LightModeContext } from "./context/LightModeContext";
const closeButtonIcon = require('../assets/close.png');

const ModalTemplate = ({ visible, toggle, children }) => {
  const { parsedTheme } = useContext(LightModeContext);
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='slide'
    >
      <View style={styles.centeredView}>
        <View style={[{ backgroundColor: parsedTheme.colors.background }, styles.modalView]}>
          <IconButton
            icon={closeButtonIcon}
            onPress={toggle}
            style={styles.closeButton}
            mode="contained-tonal"
          />
          {children}
        </View>
      </View>
    </Modal>
  );
}

const SignUpModal = ({ signUpVisible, toggle }) => {
  const { parsedTheme } = useContext(LightModeContext);
  const [email, setEmail] = useState<string>("");
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [firstPassword, setFirstPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const paperTheme = useTheme();
  const signUpFirstPassword = useRef<any>(null);
  const signUpSecondPassword = useRef<any>(null);

  const closeButtonFunction = (): void => {
    toggle();
    setEmailIsValid(true);
    setPasswordsMatch(true);
    setEmail("");
    setFirstPassword("");
    setSecondPassword("");
    setPasswordVisible(false);
  }

  return (
    <ModalTemplate visible={signUpVisible} toggle={closeButtonFunction}>
      <Text style={[{ color: parsedTheme.colors.text }, styles.modalHeader]}>SignUp</Text>
      <TextInput
        onBlur={() => { setEmailIsValid(emailValidator(email)) }}
        accessibilityLabel="Sign Up Email"
        autoFocus={true}
        value={email}
        onChangeText={setEmail}
        label={emailIsValid ? "Email" : "Invalid Email"}
        autoComplete='email'
        onSubmitEditing={() => signUpFirstPassword.current?.focus()}
        style={[{ color: parsedTheme.colors.text }, styles.inputField]}
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect={false}
        mode="outlined"
        error={!emailIsValid ? true : false}
        keyboardType="email-address"
        theme={paperTheme}
      />
      <TextInput
        accessibilityLabel="Sign Up Password"
        value={firstPassword}
        onChangeText={setFirstPassword}
        label={passwordsMatch ? "Password" : "Password Mismatch"}
        autoComplete="password"
        secureTextEntry={!passwordVisible}
        ref={signUpFirstPassword}
        onSubmitEditing={() => signUpSecondPassword.current?.focus()}
        style={[{ color: parsedTheme.colors.text }, styles.inputField]}
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect={false}
        mode="outlined"
        theme={paperTheme}
        error={!passwordsMatch}
        placeholder="8 Character Minimum"
        right={<TextInput.Icon
          icon={passwordVisible ? "eye-off-outline" : "eye"}
          onPress={() => { setPasswordVisible(!passwordVisible) }}
        />}
      />
      <TextInput
        accessibilityLabel="Confirm Sign Up Password"
        value={secondPassword}
        onChangeText={setSecondPassword}
        label={passwordsMatch ? "Confirm Password" : "Password Mismatch"}
        onBlur={() => { setPasswordsMatch(passwordCompairator(firstPassword, secondPassword)) }}
        autoComplete="password"
        secureTextEntry={!passwordVisible}
        ref={signUpSecondPassword}
        style={[{ color: parsedTheme.colors.text }, styles.inputField]}
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect={false}
        mode="outlined"
        theme={paperTheme}
        error={!passwordsMatch}
        placeholder="Confirm Password"
        right={<TextInput.Icon
          icon={passwordVisible ? "eye-off-outline" : "eye"}
          onPress={() => { setPasswordVisible(!passwordVisible) }}
        />}
      />
      <View style={styles.submitButton}>
        <Button
          accessibilityLabel="Submit Button"
          key={paperTheme.dark ? "force" : "re-render"} // See (1) below
          theme={paperTheme}
          mode="contained-tonal"
        >Submit</Button>
      </View>
    </ModalTemplate>
  );
}

const LogInModal = ({ loginVisible, toggle }) => {
  const { parsedTheme } = useContext(LightModeContext);
  return (
    <ModalTemplate visible={loginVisible} toggle={toggle}>
      <Text style={[{ color: parsedTheme.colors.text }, styles.modalHeader]}>Login Modal</Text>
    </ModalTemplate>
  )
}

const styles = StyleSheet.create({
  inputField: {
    marginTop: 8,
    marginBottom: 8,
    width: "90%",
  },
  modalHeader: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 30,
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
    margin: 8,
    borderColor: 'rgb(120, 69, 172)',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
    paddingBottom: 40,
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

function emailValidator(email: string): boolean {
  return validate.validate(email);
}

function passwordCompairator(password1: string, password2: string): boolean {
  return password1 === password2;
}

function passwordLengthChecker(password: string): boolean {
  return password.length >= 8;
}

export { SignUpModal, LogInModal };
