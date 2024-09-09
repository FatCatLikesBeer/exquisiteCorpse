import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { A } from '@expo/html-elements';
import PocketBase from 'pocketbase';

const URL = process.env.EXPO_PUBLIC_EC_API_URL;
const pb = new PocketBase(URL);

const EmailAndDisplay = (props: any) => {
  return (
    <TextInput>
    </TextInput>
  );
}
const ConfirmDetails = (props: any) => {
  return (
    <TextInput>
    </TextInput>
  );
}

export const SignUp = (props: any) => {
  // const styles = props.styles
  const { styles, changeFormState } = props;
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    displayName: "",
    class: "User"
  });

  return (
    <View style={styles.formContainer}>
      <Text style={styles.h2}>Sign Up</Text>
      <Pressable style={[styles.input, { marginTop: 24 }, styles.buttonBackground]}><Text style={styles.buttonText}><A>Continue</A></Text></Pressable>
      <Text style={[styles.switch, { textAlign: "center" }]}><A onPress={changeFormState}>Click Here to Sign In</A></Text>
    </View>
  )
}
