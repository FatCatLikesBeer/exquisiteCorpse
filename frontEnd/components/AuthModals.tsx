// AuthModals.tsx
// TODO: Check out Expo's blur, maybe use it for the modals backdrop
// TODO: pressing return/enter on 'Confirm Password' will submit form
// TODO: create handle Submit function
// TODO: text input error checking: email availability
// TODO: Handle submit function need to handle errors: 400, 403, 408, 500
// TODO: make "Submit" button actually signup user

import React, { useState, useContext, useRef } from "react";
import { Modal, View, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'
import { Button, IconButton, TextInput, useTheme, ActivityIndicator, Snackbar, Portal } from 'react-native-paper';
import validate from 'email-validator';
import PocketBase from 'pocketbase';

import { LightModeContext } from "./context/LightModeContext";
const closeButtonIcon = require('../assets/close.png');

const ModalTemplate = ({ visible, toggle, children }: { visible: boolean; toggle: any; children: any }) => {
  const { parsedTheme } = useContext(LightModeContext);
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType='slide'
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : 'height'}
        style={{ flex: 1 }}
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
      </KeyboardAvoidingView>
    </Modal>
  );
}

const SignUpModal = ({ signUpVisible, toggle, pb }: { signUpVisible: boolean; toggle: any; pb: PocketBase }) => {
  const { parsedTheme } = useContext(LightModeContext);
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [firstPassword, setFirstPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordIsLongEnough, setPasswordIsLongEnough] = useState<boolean>(true);
  const [formIsSubmitting, setFormIsSubmitting] = useState<boolean>(false);
  const [snackBarVisible, setSnackBarVisible] = useState<boolean>(false);
  const [snackBarLabel, setSnackBarLabel] = useState<string>("There is an error in your Sign Up form ☹️");
  const paperTheme = useTheme();
  const emailRef = useRef<any>(null);
  const signUpFirstPassword = useRef<any>(null);
  const signUpSecondPassword = useRef<any>(null);
  const submitButton = useRef<any>(null);

  const clearForm = (): void => {
    setUserName("");
    setEmailIsValid(true);
    setPasswordsMatch(true);
    setEmail("");
    setFirstPassword("");
    setSecondPassword("");
    setPasswordVisible(false);
    setPasswordIsLongEnough(true);
    setFormIsSubmitting(false);
  }

  const closeButtonFunction = (): void => {
    toggle();
    clearForm();
  }

  const onDismissSnackBar = () => setSnackBarVisible(false);

  const handleSubmit = () => {
    if (signUpFormValidator(userName, email, firstPassword, secondPassword) === false) {
      setSnackBarVisible(true);
      clearForm();
      return;
    }

    const payload = { username: userName, email, password: firstPassword, passwordConfirm: secondPassword }

    setFormIsSubmitting(true);
    pb.collection('users').create({ ...payload, class: 'User' })
      .then((response) => {
        setSnackBarLabel(`Signup Successful, Welcome ${response.username}`);
        setSnackBarVisible(true);
        closeButtonFunction();
        // TODO: pb authstore goes here
        // TODO: Successful signup animation goes here
      })
      .catch((error) => {
        console.error("Error happened:", error.response);
        if (error.response.data?.username) { setSnackBarLabel(`❌ User Name: ${error.response.data.username.message}`) }
        if (error.response.data?.email) { setSnackBarLabel(`❌ Email: ${error.response.data.email.message}`) }
        if (error.response.data?.password) { setSnackBarLabel(`❌ Password: ${error.response.data?.password.message}`) }
        if (error.response.data?.passwordConfirm) { setSnackBarLabel(`❌ Confirm Password: ${error.response.data.passwordConfirm.message}`) }
        setSnackBarVisible(true);
      })
      .finally(() => setFormIsSubmitting(false));
  }

  return (
    <ModalTemplate visible={signUpVisible} toggle={closeButtonFunction}>
      <Text style={[{ color: parsedTheme.colors.text }, styles.modalHeader]}>Sign Up</Text>
      <TextInput
        accessibilityLabel="Sign Up User Name"
        value={userName}
        onChangeText={setUserName}
        label="User Name"
        autoComplete='username'
        onSubmitEditing={() => emailRef.current?.focus()}
        style={[{ color: parsedTheme.colors.text }, styles.inputField]}
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect={false}
        mode="outlined"
        theme={paperTheme}
      />
      <TextInput
        onBlur={() => {
          setEmailIsValid(emailValidator(email));
        }}
        accessibilityLabel="Sign Up Email"
        value={email}
        onChangeText={setEmail}
        label={emailIsValid ? "Email" : "Invalid Email"}
        autoComplete='email'
        ref={emailRef}
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
          accessibilityLabel="Show/Hide password text"
        />}
        onBlur={() => {
          setPasswordIsLongEnough(passwordLongerThanEight(firstPassword));
        }}
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
        onSubmitEditing={() => submitButton.current?.focus()}
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
          accessibilityLabel="Show/Hide password text"
        />}
      />
      <View style={styles.submitButton}>
        <Button
          accessibilityLabel="Submit Button"
          key={paperTheme.dark ? "force" : "re-render"} // See (1) below
          theme={paperTheme}
          mode="contained-tonal"
          contentStyle={{ paddingHorizontal: 12 }}
          disabled={!(passwordIsLongEnough && emailIsValid && passwordsMatch)}
          onPress={handleSubmit}
        >
          {formIsSubmitting ? <ActivityIndicator /> : (passwordIsLongEnough ? "Submit" : "Password Too Short")}
        </Button>
      </View>
      <Portal>
        <Snackbar
          duration={4000}
          theme={paperTheme}
          style={{ position: 'relative', bottom: 55 }}
          visible={snackBarVisible}
          onDismiss={onDismissSnackBar}
        >{snackBarLabel}</Snackbar>
      </Portal>
    </ModalTemplate>
  );
}

const LogInModal = ({ loginVisible, toggle, pb }: { loginVisible: boolean; toggle: any; pb: PocketBase }) => {
  const { parsedTheme } = useContext(LightModeContext);
  return (
    <ModalTemplate visible={loginVisible} toggle={toggle}>
      <Text style={[{ color: parsedTheme.colors.text }, styles.modalHeader]}>Login Modal</Text>
    </ModalTemplate>
  )
}

const styles = StyleSheet.create({
  inputField: {
    marginBottom: 12,
    width: "90%",
  },
  modalHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
  },
  submitButton: {
    marginTop: 4,
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
    marginBottom: -50,
    borderColor: 'rgb(120, 69, 172)',
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 18,
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

function passwordLongerThanEight(password: string): boolean {
  return password.length >= 8;
}

function signUpFormValidator(userName: string, email: string, firstPassword: string, secondPassword: string): boolean {
  let result: boolean = false;
  if (userName === "") { return result }
  if (emailValidator(email) == false) { return result }
  if (firstPassword == "") { return result }
  if (email == "") { return result }
  if (passwordLongerThanEight(firstPassword) == false) { return result }
  if (passwordCompairator(firstPassword, secondPassword) == false) { return result }
  result = true; // passed all the fail tests
  return result;
}

export { SignUpModal, LogInModal };
