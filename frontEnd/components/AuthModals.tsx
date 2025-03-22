// AuthModals.tsx
// TODO: Create a (?) popup explanation next to Authentication title, explaining reason for vague auth reasoning
// TODO: Implement forgot password function

import React, { useState, useContext, useRef, Dispatch, SetStateAction } from "react";
import { Modal, View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { Button, IconButton, TextInput, useTheme, ActivityIndicator } from 'react-native-paper';
import { BlurView } from 'expo-blur';
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
      <BlurView intensity={20} style={{ width: "100%", height: "100%" }} experimentalBlurMethod="dimezisBlurView">
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
      </BlurView>
    </Modal>
  );
}

const SignUpModal = ({ signUpVisible, toggle, pb, setSnackBarLabel, setSnackBarVisible, setCurrentAuthStore }:
  {
    signUpVisible: boolean;
    toggle: any;
    pb: PocketBase;
    setSnackBarLabel: Dispatch<SetStateAction<string>>;
    setSnackBarVisible: Dispatch<SetStateAction<boolean>>;
    setCurrentAuthStore: Dispatch<SetStateAction<boolean>>;
  }) => {
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
  const paperTheme = useTheme();
  const emailRef = useRef<any>(null);
  const signUpFirstPassword = useRef<any>(null);
  const signUpSecondPassword = useRef<any>(null);

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
        pb.collection('users').authWithPassword(response.username, firstPassword)
          .then((response) => {
            setSnackBarLabel(`🟢 Signup Successful!\n Welcome ${response.record.username} 🙂`);
            setSnackBarVisible(true);
            closeButtonFunction();
            setCurrentAuthStore(true);
          })
      })
      .catch((error) => {
        console.error("Error happened:", error.response);
        if (error.response.data?.username) { setSnackBarLabel(`🔴 User Name: ${error.response.data.username.message}`) }
        if (error.response.data?.email) { setSnackBarLabel(`🔴 Email: ${error.response.data.email.message}`) }
        if (error.response.data?.password) { setSnackBarLabel(`🔴 Password: ${error.response.data?.password.message}`) }
        if (error.response.data?.passwordConfirm) { setSnackBarLabel(`🔴 Confirm Password: ${error.response.data.passwordConfirm.message}`) }
        setSnackBarVisible(true);
        closeButtonFunction();
      })
  }

  return (
    <ModalTemplate visible={signUpVisible} toggle={closeButtonFunction}>
      <Text style={[{ color: parsedTheme.colors.text }, styles.modalHeader]}>Sign Up</Text>
      <TextInput
        accessibilityLabel="Sign Up User Name"
        value={userName}
        onChangeText={setUserName}
        label="User Name"
        textContentType='username'
        autoComplete="username"
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
        textContentType='emailAddress'
        autoComplete="email"
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
        textContentType="newPassword"
        autoComplete="password-new"
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
        textContentType="newPassword"
        autoComplete="password-new"
        secureTextEntry={!passwordVisible}
        ref={signUpSecondPassword}
        onSubmitEditing={handleSubmit}
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
    </ModalTemplate>
  );
}

const LogInModal = ({ loginVisible, toggle, pb, setSnackBarLabel, setSnackBarVisible, setCurrentAuthStore }:
  {
    loginVisible: boolean;
    toggle: any;
    pb: PocketBase;
    setSnackBarLabel: Dispatch<SetStateAction<string>>;
    setSnackBarVisible: Dispatch<SetStateAction<boolean>>;
    setCurrentAuthStore: Dispatch<SetStateAction<boolean>>;
  }) => {
  const { parsedTheme } = useContext(LightModeContext);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordIsLongEnough, setPasswordIsLongEnough] = useState<boolean>(true);
  const [formIsSubmitting, setFormIsSubmitting] = useState<boolean>(false);
  const paperTheme = useTheme();
  const emailRef = useRef<any>(null);
  const loginPassword = useRef<any>(null);

  function resetForm() {
    setUserName("");
    setPassword("");
    setPasswordVisible(false);
    setPasswordIsLongEnough(true);
    setFormIsSubmitting(false);
  }

  function closeButtonFunction() {
    resetForm();
    toggle();
  }

  const handleSubmit = () => {
    if (userName == "") {
      setSnackBarLabel("User Name too short");
      setSnackBarVisible(true);
      closeButtonFunction();
      return;
    }
    if (password.length <= 7) {
      setSnackBarLabel("Password Error");
      setSnackBarVisible(true);
      closeButtonFunction();
      return;
    }

    setFormIsSubmitting(true);
    pb.collection('users').authWithPassword(userName, password)
      .then(response => {
        console.log(response);
        setCurrentAuthStore(pb.authStore.isValid);
        setSnackBarLabel(`🟢 Welcome back ${response.record.username} 🙂`);
      })
      .catch(() => {
        setSnackBarLabel(`🔴 Failed to authenticate`);
      })
      .finally(() => {
        closeButtonFunction();
        setSnackBarVisible(true);
        setFormIsSubmitting(false);
      });
  }

  return (
    <ModalTemplate visible={loginVisible} toggle={closeButtonFunction}>
      <Text style={[{ color: parsedTheme.colors.text }, styles.modalHeader]}>Login</Text>
      <TextInput
        ref={emailRef}
        accessibilityLabel="Email Address or User Name"
        value={userName}
        onChangeText={setUserName}
        label="Email Address or User Name"
        textContentType='emailAddress'
        autoComplete="email"
        onSubmitEditing={() => loginPassword.current?.focus()}
        style={[{ color: parsedTheme.colors.text }, styles.inputField]}
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect={false}
        mode="outlined"
        theme={paperTheme}
      />
      <TextInput
        accessibilityLabel="Login Password"
        value={password}
        onChangeText={setPassword}
        label={"Password"}
        textContentType="newPassword"
        autoComplete="password-new"
        secureTextEntry={!passwordVisible}
        ref={loginPassword}
        onSubmitEditing={handleSubmit}
        style={[{ color: parsedTheme.colors.text }, styles.inputField]}
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect={false}
        mode="outlined"
        theme={paperTheme}
        error={!passwordIsLongEnough}
        placeholder="8 Character Minimum"
        right={<TextInput.Icon
          icon={passwordVisible ? "eye-off-outline" : "eye"}
          onPress={() => { setPasswordVisible(!passwordVisible) }}
          accessibilityLabel="Show/Hide password text"
        />}
        onBlur={() => {
          setPasswordIsLongEnough(passwordLongerThanEight(password));
        }}
      />
      <View style={styles.submitButton}>
        <Button
          accessibilityLabel="Submit Button"
          key={paperTheme.dark ? "force" : "re-render"} // See (1) below
          theme={paperTheme}
          mode="contained-tonal"
          contentStyle={{ paddingHorizontal: 12 }}
          disabled={!passwordIsLongEnough}
          onPress={handleSubmit}
        >
          {formIsSubmitting ? <ActivityIndicator /> : "Submit"}
        </Button>
      </View>
      <Text style={[styles.forgotPassword, { color: parsedTheme.colors.text == "white" ? "lightgrey" : "darkgrey" }]} onPress={() => Alert.alert("Forgot password?!")}>Forgot Password</Text>
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
  forgotPassword: {
    marginTop: 14,
    fontSize: 12,
  }
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
